from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import db, Payment, Booking, Notification, User
import random
import string
from datetime import datetime

payments_bp = Blueprint('payments', __name__)

def generate_payment_id():
    prefix = 'PAY'
    numbers = ''.join(random.choices(string.digits, k=8))
    return f"{prefix}-{numbers}"

def generate_transaction_id():
    prefix = 'MPESA'
    numbers = ''.join(random.choices(string.digits, k=10))
    return f"{prefix}{numbers}"

def create_notification(user_id, title, message, type='info', link=None):
    notification = Notification(
        user_id=user_id,
        title=title,
        message=message,
        type=type,
        link=link
    )
    db.session.add(notification)
    db.session.commit()
    return notification

@payments_bp.route('/request', methods=['POST'])
@jwt_required()
def request_payment():
    """User requests M-Pesa payment"""
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data.get('bookingId'):
        return jsonify({'message': 'Booking ID is required'}), 400
    
    if not data.get('phoneNumber'):
        return jsonify({'message': 'Phone number is required'}), 400
    
    booking = Booking.query.filter_by(booking_id=data['bookingId']).first()
    if not booking:
        return jsonify({'message': 'Booking not found'}), 404
    
    if booking.user_id != user_id:
        return jsonify({'message': 'Unauthorized'}), 403
    
    # Check if payment already exists
    existing_payment = Payment.query.filter_by(booking_id=booking.id).first()
    if existing_payment:
        return jsonify({'message': 'Payment already requested for this booking'}), 400
    
    # Create payment record
    payment = Payment(
        payment_id=generate_payment_id(),
        booking_id=booking.id,
        user_id=user_id,
        amount=booking.total_amount,
        phone_number=data['phoneNumber'],
        status='pending'
    )
    
    db.session.add(payment)
    
    # Update booking payment status
    booking.payment_status = 'pending'
    
    # Create notification for admin
    admin = User.query.filter_by(role='admin').first()
    if admin:
        create_notification(
            admin.id,
            'New Payment Request',
            f'User {user_id} has requested payment of ${booking.total_amount} for booking {booking.booking_id}',
            'info',
            f'/admin/payments/{payment.id}'
        )
    
    # Create notification for user
    create_notification(
        user_id,
        'Payment Request Sent',
        f'Your payment request of ${booking.total_amount} has been sent. Please wait for admin confirmation.',
        'info',
        f'/payments/{payment.id}'
    )
    
    db.session.commit()
    
    return jsonify({
        'message': 'Payment request sent successfully',
        'payment': payment.to_dict()
    }), 201

@payments_bp.route('/confirm', methods=['POST'])
@jwt_required()
def confirm_payment():
    """Admin confirms payment"""
    admin_id = get_jwt_identity()
    admin = User.query.get(admin_id)
    
    if admin.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    data = request.get_json()
    
    if not data.get('paymentId'):
        return jsonify({'message': 'Payment ID is required'}), 400
    
    payment = Payment.query.filter_by(payment_id=data['paymentId']).first()
    if not payment:
        return jsonify({'message': 'Payment not found'}), 404
    
    # Update payment status
    payment.status = 'completed'
    payment.transaction_id = generate_transaction_id()
    payment.mpesa_receipt = data.get('mpesaReceipt', f'MPESA-{datetime.now().strftime("%Y%m%d%H%M%S")}')
    payment.confirmed_by = admin_id
    payment.confirmed_at = datetime.utcnow()
    payment.notes = data.get('notes', 'Payment confirmed by admin')
    
    # Update booking
    booking = Booking.query.get(payment.booking_id)
    if booking:
        booking.payment_status = 'completed'
        booking.status = 'confirmed'
    
    # Create notification for user
    create_notification(
        payment.user_id,
        'Payment Confirmed! ✅',
        f'Your payment of ${payment.amount} has been confirmed. Transaction ID: {payment.transaction_id}',
        'success',
        f'/bookings/{booking.booking_id}'
    )
    
    # Create notification for admin
    create_notification(
        admin_id,
        'Payment Confirmed',
        f'Payment {payment.payment_id} confirmed successfully',
        'success'
    )
    
    db.session.commit()
    
    return jsonify({
        'message': 'Payment confirmed successfully',
        'payment': payment.to_dict()
    }), 200

@payments_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user_payments():
    """Get current user's payments"""
    user_id = get_jwt_identity()
    payments = Payment.query.filter_by(user_id=user_id).order_by(Payment.created_at.desc()).all()
    return jsonify([p.to_dict() for p in payments]), 200

@payments_bp.route('/admin/all', methods=['GET'])
@jwt_required()
def get_all_payments():
    """Admin gets all payments"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    payments = Payment.query.order_by(Payment.created_at.desc()).all()
    return jsonify([p.to_dict() for p in payments]), 200

@payments_bp.route('/admin/pending', methods=['GET'])
@jwt_required()
def get_pending_payments():
    """Admin gets pending payments"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    payments = Payment.query.filter_by(status='pending').order_by(Payment.created_at.desc()).all()
    return jsonify([p.to_dict() for p in payments]), 200

@payments_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_payment(id):
    """Get payment details"""
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    payment = Payment.query.get_or_404(id)
    
    if payment.user_id != user_id and user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    return jsonify(payment.to_dict()), 200
