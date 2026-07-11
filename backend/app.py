from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import json

from config.database import init_db, get_db_connection, dict_factory
from services.mpesa_service import MpesaService
from auth_routes import register_auth_routes
from user_routes import register_user_routes
from routes.destination_routes import register_destination_routes
from routes.hotel_routes import register_hotel_routes
from routes.flight_routes import register_flight_routes
from routes.tour_routes import register_tour_routes
from routes.review_routes import register_review_routes
from routes.booking_routes import register_booking_routes

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize database
init_db()

# Initialize M-Pesa service
mpesa_service = MpesaService()

# Register auth routes
register_auth_routes(app)

# Register user routes
register_user_routes(app)

# Register destination routes
register_destination_routes(app)

# Register hotel routes
register_hotel_routes(app)

# Register flight routes
register_flight_routes(app)

# Register tour routes
register_tour_routes(app)
register_review_routes(app)

# Register booking routes
register_booking_routes(app)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        'status': 'OK',
        'message': 'Travel Agency Server is running',
        'database': 'SQLite3'
    })

@app.route('/api/payments/initiate', methods=['POST'])
def initiate_payment():
    try:
        data = request.json
        phone_number = data.get('phoneNumber')
        amount = data.get('amount')
        booking_details = data.get('bookingDetails', {})
        
        if not phone_number or not amount:
            return jsonify({
                'success': False,
                'message': 'Phone number and amount are required'
            }), 400
        
        if amount <= 0:
            return jsonify({
                'success': False,
                'message': 'Amount must be greater than 0'
            }), 400
        
        import time
        account_reference = f"BOOK-{int(time.time() * 1000)}"
        
        result = mpesa_service.initiate_payment(
            phone_number,
            amount,
            account_reference,
            booking_details
        )
        
        return jsonify(result), 200 if result['success'] else 500
        
    except Exception as e:
        print(f"Payment initiation error: {e}")
        return jsonify({
            'success': False,
            'message': 'Failed to initiate payment',
            'error': str(e)
        }), 500

@app.route('/api/payments/status/<checkout_request_id>', methods=['GET'])
def query_payment_status(checkout_request_id):
    try:
        result = mpesa_service.query_status(checkout_request_id)
        return jsonify(result), 200 if result['success'] else 500
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to query payment status',
            'error': str(e)
        }), 500

@app.route('/api/payments/callback', methods=['POST'])
def handle_callback():
    try:
        callback_data = request.json
        result = mpesa_service.handle_callback(callback_data)
        return jsonify(result), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to process callback',
            'error': str(e)
        }), 500

@app.route('/api/payments/transactions', methods=['GET'])
def get_transactions():
    try:
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT * FROM transactions 
            ORDER BY created_at DESC 
            LIMIT 100
        ''')
        transactions = cursor.fetchall()
        conn.close()
        
        return jsonify({
            'success': True,
            'transactions': transactions
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to fetch transactions',
            'error': str(e)
        }), 500

@app.route('/api/payments/transaction/<int:id>', methods=['GET'])
def get_transaction_by_id(id):
    try:
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM transactions WHERE id = ?', (id,))
        transaction = cursor.fetchone()
        conn.close()
        
        if not transaction:
            return jsonify({
                'success': False,
                'message': 'Transaction not found'
            }), 404
        
        return jsonify({
            'success': True,
            'transaction': transaction
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to fetch transaction',
            'error': str(e)
        }), 500

@app.route('/api/payments/transaction/checkout/<checkout_request_id>', methods=['GET'])
def get_transaction_by_checkout_id(checkout_request_id):
    try:
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM transactions WHERE checkout_request_id = ?', (checkout_request_id,))
        transaction = cursor.fetchone()
        conn.close()
        
        if not transaction:
            return jsonify({
                'success': False,
                'message': 'Transaction not found'
            }), 404
        
        return jsonify({
            'success': True,
            'transaction': transaction
        })
        
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'Failed to fetch transaction',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
