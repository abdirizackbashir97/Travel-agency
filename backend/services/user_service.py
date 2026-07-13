import sqlite3
import bcrypt
import jwt
import os
from datetime import datetime, timedelta
from config.database import get_db_connection, dict_factory

class UserService:
    def __init__(self):
        self.secret_key = os.getenv('JWT_SECRET_KEY', 'your-secret-key-here')
    
    def hash_password(self, password):
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    def check_password(self, password, password_hash):
        if not password_hash:
            return False
        return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
    
    def generate_token(self, user_id):
        payload = {
            'user_id': user_id,
            'exp': datetime.utcnow() + timedelta(hours=24)
        }
        return jwt.encode(payload, self.secret_key, algorithm='HS256')
    
    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
    
    def register_user(self, first_name, second_name, email, password, age, phone=None):
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('SELECT id FROM users WHERE email = ?', (email,))
        if cursor.fetchone():
            conn.close()
            return {'success': False, 'message': 'Email already exists'}
        
        password_hash = self.hash_password(password) if password else None
        
        cursor.execute('''
            INSERT INTO users (first_name, second_name, email, password, age, phone, role)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (first_name, second_name, email, password_hash, age, phone, 'user'))
        
        user_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        token = self.generate_token(user_id)
        user_data = self.get_user_by_id(user_id)
        
        return {
            'success': True,
            'message': 'User registered successfully',
            'user': user_data,
            'access_token': token
        }
    
    def login_user(self, email, password):
        print(f"🔍 Login_user called with: {email}")
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()
        print(f"📦 User found: {user is not None}")
        conn.close()
        
        if not user:
            return {'success': False, 'message': 'Invalid email or password'}
        
        password_match = self.check_password(password, user.get('password'))
        print(f"🔑 Password check result: {password_match}")
        
        if not password_match:
            return {'success': False, 'message': 'Invalid email or password'}
        
        token = self.generate_token(user['id'])
        if 'password' in user:
            del user['password']
        
        return {
            'success': True,
            'message': 'Login successful',
            'user': user,
            'access_token': token
        }
    
    def get_user_by_id(self, user_id):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('SELECT id, first_name, second_name, email, age, phone, role, created_at FROM users WHERE id = ?', (user_id,))
        user = cursor.fetchone()
        conn.close()
        return user
    
    def get_user_by_email(self, email):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('SELECT id, first_name, second_name, email, age, phone, role, created_at FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()
        conn.close()
        return user
    
    def get_all_users(self):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('SELECT id, first_name, second_name, email, age, phone, role, created_at FROM users ORDER BY created_at DESC')
        users = cursor.fetchall()
        conn.close()
        return users
    
    def update_user(self, user_id, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        updates = []
        values = []
        
        if 'first_name' in data:
            updates.append('first_name = ?')
            values.append(data['first_name'])
        if 'second_name' in data:
            updates.append('second_name = ?')
            values.append(data['second_name'])
        if 'phone' in data:
            updates.append('phone = ?')
            values.append(data['phone'])
        if 'age' in data:
            updates.append('age = ?')
            values.append(data['age'])
        if 'email' in data:
            cursor.execute('SELECT id FROM users WHERE email = ? AND id != ?', (data['email'], user_id))
            if cursor.fetchone():
                conn.close()
                return {'success': False, 'message': 'Email already in use'}
            updates.append('email = ?')
            values.append(data['email'])
        if 'password' in data and data['password']:
            password_hash = self.hash_password(data['password'])
            updates.append('password = ?')
            values.append(password_hash)
        if 'role' in data:
            updates.append('role = ?')
            values.append(data['role'])
        if 'is_active' in data:
            updates.append('is_active = ?')
            values.append(data['is_active'])
        
        if not updates:
            conn.close()
            return {'success': False, 'message': 'No fields to update'}
        
        values.append(user_id)
        query = f"UPDATE users SET {', '.join(updates)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()
        conn.close()
        
        return {'success': True, 'message': 'User updated successfully'}
    
    def delete_user(self, user_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('DELETE FROM users WHERE id = ?', (user_id,))
        conn.commit()
        conn.close()
        return {'success': True, 'message': 'User deleted successfully'}
    
    def get_current_user(self, token):
        payload = self.decode_token(token)
        if not payload:
            return None
        return self.get_user_by_id(payload['user_id'])
