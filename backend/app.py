from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import sqlite3
import datetime
import hashlib
import os
from contextlib import contextmanager

app = Flask(__name__)
app.config['SECRET_KEY'] = 'dev-secret-key'
app.config['JWT_SECRET_KEY'] = 'dev-jwt-secret'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(hours=24)

CORS(app, supports_credentials=True)
jwt = JWTManager(app)

DATABASE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'database', 'database.db')

@contextmanager
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def serialize_row(row):
    if row is None:
        return None
    return dict(row)

def serialize_rows(rows):
    return [serialize_row(row) for row in rows]

# ============================================
# AUTH ROUTES
# ============================================

@app.route('/api/auth/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.json
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({'error': 'Email and password required'}), 400
    hashed_password = hash_password(password)
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
        user = cursor.fetchone()
        if not user:
            return jsonify({'error': 'Invalid email or password'}), 401
        if user['password'] != hashed_password:
            return jsonify({'error': 'Invalid email or password'}), 401
        is_admin = user['role'] == 'admin' or email == 'admin@gmail.com'
        access_token = create_access_token(
            identity=email,
            additional_claims={
                'user_id': user['id'],
                'first_name': user['first_name'],
                'role': 'admin' if is_admin else 'user'
            }
        )
        return jsonify({
            'accessToken': access_token,
            'message': 'Login successful',
            'user': {
                'id': user['id'],
                'firstName': user['first_name'],
                'secondName': user['second_name'],
                'email': user['email'],
                'phone': user['phone'],
                'age': user['age'],
                'role': 'admin' if is_admin else 'user'
            }
        }), 200

@app.route('/api/auth/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        return '', 200
    data = request.json
    required = ['first_name', 'email', 'password']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(*) as count FROM users WHERE email = ?', (data['email'],))
        if cursor.fetchone()['count'] > 0:
            return jsonify({'error': 'Email already registered'}), 409
        hashed_password = hash_password(data['password'])
        cursor.execute('''
            INSERT INTO users (first_name, second_name, email, password, phone, age, role, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
        ''', (
            data['first_name'],
            data.get('second_name', ''),
            data['email'],
            hashed_password,
            data.get('phone', ''),
            data.get('age', 0),
            'user'
        ))
        user_id = cursor.lastrowid
        conn.commit()
        cursor.execute('SELECT * FROM users WHERE id = ?', (user_id,))
        user = cursor.fetchone()
        return jsonify({
            'message': 'Registration successful!',
            'user': serialize_row(user)
        }), 201

# ============================================
# DESTINATION ROUTES
# ============================================

@app.route('/api/destinations', methods=['GET'])
def get_destinations():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM destinations ORDER BY id')
        rows = cursor.fetchall()
        return jsonify(serialize_rows(rows)), 200

@app.route('/api/destinations', methods=['POST'])
@jwt_required()
def create_destination():
    data = request.json
    required = ['name', 'country', 'category', 'price_per_night']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO destinations (name, country, city, category, description, price_per_night, rating, reviews, attractions, best_time)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['name'],
            data['country'],
            data.get('city', ''),
            data['category'],
            data.get('description', ''),
            float(data['price_per_night']),
            float(data.get('rating', 0)),
            int(data.get('reviews', 0)),
            data.get('attractions', ''),
            data.get('best_time', '')
        ))
        destination_id = cursor.lastrowid
        conn.commit()
        cursor.execute('SELECT * FROM destinations WHERE id = ?', (destination_id,))
        destination = cursor.fetchone()
        return jsonify({
            'message': 'Destination created successfully!',
            'destination': serialize_row(destination)
        }), 201

@app.route('/api/destinations/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_destination(id):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM destinations WHERE id = ?', (id,))
        conn.commit()
        return jsonify({'message': 'Destination deleted!'}), 200

# ============================================
# TOUR ROUTES
# ============================================

@app.route('/api/tours', methods=['GET'])
def get_tours():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM tours ORDER BY id')
        rows = cursor.fetchall()
        return jsonify(serialize_rows(rows)), 200

@app.route('/api/tours', methods=['POST'])
@jwt_required()
def create_tour():
    data = request.json
    required = ['tour_name', 'location', 'country', 'duration_days', 'price_per_person']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO tours (tour_name, location, country, rating, duration_days, price_per_person, description)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['tour_name'],
            data['location'],
            data['country'],
            float(data.get('rating', 0)),
            int(data['duration_days']),
            float(data['price_per_person']),
            data.get('description', '')
        ))
        tour_id = cursor.lastrowid
        conn.commit()
        cursor.execute('SELECT * FROM tours WHERE id = ?', (tour_id,))
        tour = cursor.fetchone()
        return jsonify({
            'message': 'Tour created successfully!',
            'tour': serialize_row(tour)
        }), 201

@app.route('/api/tours/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_tour(id):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM tours WHERE id = ?', (id,))
        conn.commit()
        return jsonify({'message': 'Tour deleted!'}), 200

# ============================================
# HOTEL ROUTES
# ============================================

@app.route('/api/hotels', methods=['GET'])
def get_hotels():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM hotels ORDER BY id')
        rows = cursor.fetchall()
        return jsonify(serialize_rows(rows)), 200

@app.route('/api/hotels', methods=['POST'])
@jwt_required()
def create_hotel():
    data = request.json
    required = ['hotel_name', 'location', 'country', 'price_per_night']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO hotels (hotel_name, location, country, category, rating, reviews, price_per_night, description, amenities, highlights, tagline)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['hotel_name'],
            data['location'],
            data['country'],
            data.get('category', 'Hotel'),
            float(data.get('rating', 0)),
            int(data.get('reviews', 0)),
            float(data['price_per_night']),
            data.get('description', ''),
            data.get('amenities', ''),
            data.get('highlights', ''),
            data.get('tagline', '')
        ))
        hotel_id = cursor.lastrowid
        conn.commit()
        cursor.execute('SELECT * FROM hotels WHERE id = ?', (hotel_id,))
        hotel = cursor.fetchone()
        return jsonify({
            'message': 'Hotel created successfully!',
            'hotel': serialize_row(hotel)
        }), 201

@app.route('/api/hotels/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_hotel(id):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM hotels WHERE id = ?', (id,))
        conn.commit()
        return jsonify({'message': 'Hotel deleted!'}), 200

# ============================================
# FLIGHT ROUTES
# ============================================

@app.route('/api/flights', methods=['GET'])
def get_flights():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM flights ORDER BY id')
        rows = cursor.fetchall()
        return jsonify(serialize_rows(rows)), 200

@app.route('/api/flights', methods=['POST'])
@jwt_required()
def create_flight():
    data = request.json
    required = ['airline', 'flight_number', 'departure_city', 'arrival_city', 'price']
    for field in required:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO flights (airline, flight_number, departure_airport, departure_city, departure_time, arrival_airport, arrival_city, arrival_time, duration, flight_type, baggage_allowance, travel_date, price)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['airline'],
            data['flight_number'],
            data.get('departure_airport', ''),
            data['departure_city'],
            data.get('departure_time', ''),
            data.get('arrival_airport', ''),
            data['arrival_city'],
            data.get('arrival_time', ''),
            data.get('duration', ''),
            data.get('flight_type', 'Direct'),
            data.get('baggage_allowance', '20kg'),
            data.get('travel_date', ''),
            float(data['price'])
        ))
        flight_id = cursor.lastrowid
        conn.commit()
        cursor.execute('SELECT * FROM flights WHERE id = ?', (flight_id,))
        flight = cursor.fetchone()
        return jsonify({
            'message': 'Flight created successfully!',
            'flight': serialize_row(flight)
        }), 201

@app.route('/api/flights/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_flight(id):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM flights WHERE id = ?', (id,))
        conn.commit()
        return jsonify({'message': 'Flight deleted!'}), 200

# ============================================
# BOOKING ROUTES
# ============================================

@app.route('/api/bookings', methods=['GET'])
@jwt_required()
def get_user_bookings():
    current_user = get_jwt_identity()
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id FROM users WHERE email = ?', (current_user,))
        user = cursor.fetchone()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        cursor.execute('''
            SELECT b.*, u.first_name, u.email 
            FROM bookings b
            JOIN users u ON b.user_id = u.id
            WHERE b.user_id = ?
            ORDER BY b.id DESC
        ''', (user['id'],))
        rows = cursor.fetchall()
        return jsonify(serialize_rows(rows)), 200

@app.route('/api/bookings', methods=['POST'])
@jwt_required()
def create_booking():
    data = request.json
    current_user = get_jwt_identity()
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT id FROM users WHERE email = ?', (current_user,))
        user = cursor.fetchone()
        if not user:
            return jsonify({'error': 'User not found'}), 404
        cursor.execute('''
            INSERT INTO bookings (user_id, booking_type, booking_item, booking_date, travel_date, return_date, number_of_people, total_price, payment_method, payment_status, phone_number, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        ''', (
            user['id'],
            data.get('booking_type', ''),
            data.get('booking_item', ''),
            datetime.datetime.now().date().isoformat(),
            data.get('travel_date', ''),
            data.get('return_date', ''),
            data.get('number_of_people', 1),
            data.get('total_price', 0),
            data.get('payment_method', ''),
            data.get('payment_status', 'pending'),
            data.get('phone_number', '')
        ))
        booking_id = cursor.lastrowid
        conn.commit()
        cursor.execute('''
            SELECT b.*, u.first_name, u.email 
            FROM bookings b
            JOIN users u ON b.user_id = u.id
            WHERE b.id = ?
        ''', (booking_id,))
        booking = cursor.fetchone()
        return jsonify({'message': 'Booking created!', 'booking': serialize_row(booking)}), 201

# ============================================
# STATS ROUTE
# ============================================

@app.route('/api/stats', methods=['GET'])
def get_stats():
    with get_db() as conn:
        cursor = conn.cursor()
        stats = {}
        cursor.execute('SELECT COUNT(*) as count FROM destinations')
        stats['total_destinations'] = cursor.fetchone()['count']
        cursor.execute('SELECT COUNT(*) as count FROM tours')
        stats['total_tours'] = cursor.fetchone()['count']
        cursor.execute('SELECT COUNT(*) as count FROM hotels')
        stats['total_hotels'] = cursor.fetchone()['count']
        cursor.execute('SELECT COUNT(*) as count FROM flights')
        stats['total_flights'] = cursor.fetchone()['count']
        cursor.execute('SELECT COUNT(*) as count FROM users')
        stats['total_users'] = cursor.fetchone()['count']
        cursor.execute('SELECT COUNT(*) as count FROM bookings')
        stats['total_bookings'] = cursor.fetchone()['count']
        return jsonify(stats), 200

# ============================================
# HEALTH CHECK
# ============================================

@app.route('/health', methods=['GET'])
def health_check():
    try:
        with get_db() as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT 1')
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'message': 'API is running'
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print('🚀 Starting Travel Agency Backend...')
    print('📍 Server running at: http://localhost:5002')
    print('🔑 Admin: admin@gmail.com / admin')
    print('📚 API Endpoints:')
    print('   GET  /api/destinations')
    print('   POST /api/destinations')
    print('   GET  /api/tours')
    print('   POST /api/tours')
    print('   GET  /api/hotels')
    print('   POST /api/hotels')
    print('   GET  /api/flights')
    print('   POST /api/flights')
    print('   GET  /api/bookings')
    print('   POST /api/bookings')
    print('   GET  /api/stats')
    print('--------------------------------------------------')
    app.run(debug=True, host='0.0.0.0', port=5002)
