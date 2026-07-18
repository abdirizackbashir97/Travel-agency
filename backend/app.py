from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os
import sqlite3
import jwt
from datetime import datetime, timedelta
from functools import wraps

load_dotenv()

app = Flask(__name__)

# CORS - Configure properly
CORS(app, 
     origins=["http://localhost:5173"], 
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

def get_db():
    conn = sqlite3.connect('database/database.db')
    conn.row_factory = sqlite3.Row
    return conn

JWT_SECRET = os.getenv('JWT_SECRET', 'your-super-secret-key')

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Missing token'}), 401
        token = auth_header.split(' ')[1]
        try:
            data = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            user_id = data['user_id']
        except:
            return jsonify({'error': 'Invalid token'}), 401
        
        conn = get_db()
        user = conn.execute("SELECT * FROM users WHERE id = ?", (user_id,)).fetchone()
        conn.close()
        if not user:
            return jsonify({'error': 'User not found'}), 401
        request.user = user
        return f(*args, **kwargs)
    return decorated

# ---------- NOTIFICATIONS API (with optional auth) ----------
@app.route('/api/notifications', methods=['GET'])
def get_notifications():
    # Try to get user from token, but don't fail if not present
    user_id = 1  # Default to admin for testing
    
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        try:
            token = auth_header.split(' ')[1]
            data = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            user_id = data['user_id']
        except:
            pass
    
    conn = get_db()
    notifications = conn.execute('''
        SELECT * FROM notifications 
        WHERE user_id = ? 
        ORDER BY created_at DESC 
        LIMIT 50
    ''', (user_id,)).fetchall()
    conn.close()
    return jsonify({'success': True, 'notifications': [dict(n) for n in notifications]})

@app.route('/api/notifications/unread', methods=['GET'])
def get_unread_notifications():
    user_id = 1  # Default to admin for testing
    
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        try:
            token = auth_header.split(' ')[1]
            data = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
            user_id = data['user_id']
        except:
            pass
    
    conn = get_db()
    count = conn.execute('''
        SELECT COUNT(*) as count FROM notifications 
        WHERE user_id = ? AND is_read = 0
    ''', (user_id,)).fetchone()
    conn.close()
    return jsonify({'success': True, 'count': count['count']})

# ---------- LOGIN ----------
@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    conn = get_db()
    user = conn.execute("SELECT * FROM users WHERE email = ?", (email,)).fetchone()
    conn.close()
    
    if not user:
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    
    token = jwt.encode({'user_id': user['id'], 'exp': datetime.utcnow() + timedelta(hours=24)}, JWT_SECRET, algorithm='HS256')
    
    return jsonify({
        'success': True,
        'access_token': token,
        'user': dict(user)
    })

# ---------- ADMIN BOOKINGS ----------
@app.route('/api/admin/bookings', methods=['GET'])
def admin_get_all_bookings():
    conn = get_db()
    bookings = conn.execute('''
        SELECT b.*, u.first_name, u.second_name, u.email 
        FROM bookings b 
        JOIN users u ON b.user_id = u.id 
        ORDER BY b.booking_date DESC
    ''').fetchall()
    conn.close()
    return jsonify({'success': True, 'bookings': [dict(b) for b in bookings]})

# ---------- ADMIN UPDATE STATUS ----------
@app.route('/api/admin/bookings/<int:booking_id>/status', methods=['PUT'])
def admin_update_booking_status(booking_id):
    data = request.get_json()
    new_status = data.get('status')
    
    conn = get_db()
    conn.execute("UPDATE bookings SET status = ? WHERE id = ?", (new_status, booking_id))
    conn.commit()
    conn.close()
    
    return jsonify({'success': True, 'message': f'Booking {new_status}'})

# ---------- FLIGHTS ----------
@app.route('/api/flights', methods=['GET'])
def get_flights():
    conn = get_db()
    flights = conn.execute("SELECT * FROM flights WHERE is_active = 1").fetchall()
    conn.close()
    return jsonify({'success': True, 'flights': [dict(f) for f in flights]})

# ---------- HOTELS ----------
@app.route('/api/hotels', methods=['GET'])
def get_hotels():
    conn = get_db()
    hotels = conn.execute("SELECT * FROM hotels WHERE is_active = 1").fetchall()
    conn.close()
    return jsonify({'success': True, 'hotels': [dict(h) for h in hotels]})

# ---------- TOURS ----------
@app.route('/api/tours', methods=['GET'])
def get_tours():
    conn = get_db()
    tours = conn.execute("SELECT * FROM tours WHERE is_active = 1").fetchall()
    conn.close()
    return jsonify({'success': True, 'tours': [dict(t) for t in tours]})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
