from flask import request, jsonify
import bcrypt
import jwt
import sqlite3
from datetime import datetime, timedelta
from functools import wraps
import os

from config.database import get_db_connection, dict_factory

JWT_SECRET = os.getenv('JWT_SECRET', 'your-super-secret-key-change-me')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Missing or invalid token'}), 401
        token = auth_header.split(' ')[1]
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            user_id = data['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        conn = get_db_connection()
        conn.row_factory = dict_factory
        cur = conn.cursor()
        cur.execute("SELECT id, first_name, second_name, email, role FROM users WHERE id = ?", (user_id,))
        user = cur.fetchone()
        conn.close()
        if not user:
            return jsonify({'error': 'User not found'}), 401
        request.user = user
        return f(*args, **kwargs)
    return decorated

def register_auth_routes(app):
    
    @app.route('/api/auth/register', methods=['POST'])
    def register():
        try:
            data = request.get_json()
            print(f"📝 Registration request received: {data}")
            
            # Validate required fields
            required_fields = ['first_name', 'second_name', 'email', 'password']
            for field in required_fields:
                if not data.get(field):
                    return jsonify({'success': False, 'message': f'{field} is required'}), 400
            
            # Password length validation
            password = data.get('password')
            if len(password) < 4:
                return jsonify({
                    'success': False,
                    'message': 'Password must be at least 4 characters long'
                }), 400
            
            # Hash the password using bcrypt
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            
            conn = get_db_connection()
            cur = conn.cursor()
            
            try:
                cur.execute('''
                    INSERT INTO users (first_name, second_name, email, password, age, phone, role)
                    VALUES (?, ?, ?, ?, ?, ?, 'user')
                ''', (
                    data['first_name'], 
                    data['second_name'], 
                    data['email'].strip().lower(), 
                    hashed_password, 
                    data.get('age', 18), 
                    data.get('phone', ''),
                ))
                conn.commit()
                
                # Get the new user
                user_id = cur.lastrowid
                cur.execute('SELECT * FROM users WHERE id = ?', (user_id,))
                user = cur.fetchone()
                conn.close()
                
                print(f"✅ User registered successfully: {user['email']}")
                
                # Generate JWT token
                token = jwt.encode({
                    'user_id': user['id'],
                    'exp': datetime.utcnow() + timedelta(hours=24)
                }, JWT_SECRET, algorithm='HS256')
                
                return jsonify({
                    'success': True,
                    'message': 'User registered successfully',
                    'access_token': token,
                    'user': dict(user)
                })
                
            except sqlite3.IntegrityError:
                conn.close()
                print(f"❌ Email already exists: {data['email']}")
                return jsonify({'success': False, 'message': 'Email already exists'}), 400
            except Exception as e:
                conn.close()
                print(f"❌ Registration error: {e}")
                return jsonify({'success': False, 'message': str(e)}), 500
                
        except Exception as e:
            print(f"❌ Registration error: {e}")
            return jsonify({'success': False, 'message': str(e)}), 500
    
    @app.route('/api/auth/login', methods=['POST'])
    def login():
        try:
            data = request.get_json()
            print(f"📝 Login request for: {data.get('email')}")
            
            email = data.get('email')
            password = data.get('password')
            
            if not email or not password:
                return jsonify({
                    'success': False,
                    'message': 'Email and password are required'
                }), 400
            
            conn = get_db_connection()
            conn.row_factory = dict_factory
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE email = ?", (email.strip().lower(),))
            user = cur.fetchone()
            conn.close()
            
            if not user:
                print(f"❌ User not found: {email}")
                return jsonify({
                    'success': False,
                    'message': 'Invalid email or password'
                }), 401
            
            # Verify password using bcrypt
            try:
                password_match = bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8'))
            except Exception as e:
                print(f"❌ Password check error: {e}")
                return jsonify({
                    'success': False,
                    'message': 'Invalid email or password'
                }), 401
            
            if not password_match:
                print(f"❌ Password mismatch for: {email}")
                return jsonify({
                    'success': False,
                    'message': 'Invalid email or password'
                }), 401
            
            # Generate JWT token
            token = jwt.encode({
                'user_id': user['id'],
                'exp': datetime.utcnow() + timedelta(hours=24)
            }, JWT_SECRET, algorithm='HS256')
            
            print(f"✅ User logged in: {user['email']}")
            
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'access_token': token,
                'user': dict(user)
            })
        except Exception as e:
            print(f"❌ Login error: {e}")
            return jsonify({'success': False, 'message': str(e)}), 500
    
    @app.route('/api/auth/logout', methods=['POST'])
    @token_required
    def logout():
        return jsonify({
            'success': True,
            'message': 'Logged out successfully'
        })
    
    @app.route('/api/auth/me', methods=['GET'])
    @token_required
    def get_current_user():
        user = request.user
        return jsonify({
            'id': user['id'],
            'first_name': user['first_name'],
            'second_name': user['second_name'],
            'email': user['email'],
            'role': user['role']
        })
    
    print("✅ Auth routes registered")
