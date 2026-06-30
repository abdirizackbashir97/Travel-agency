from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Booking, db
import random
import string

bookings_bp = Blueprint('bookings', __name__)

def generate_booking_id():
    """Generate a unique booking ID"""
    prefix = 'BK'
    numbers = ''.join(random.choices(string.digits, k=6))
    return f"{prefix}-{numbers}"

@bookings_bp.route('/', methods=['GET'])
@jwt_required()
def get_user_bookings():
    user_id = get_jwt_identity()
    bookings = Booking.query.filter_by(user_id=user_id).all()
    return jsonify([b.to_dict() for b in bookings]), 200

@bookings_bp.route('/all', methods=['GET'])
@jwt_required()
def get_all_bookings():
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    bookings = Booking.query.all()
    return jsonify([b.to_dict() for b in bookings]), 200

@bookings_bp.route('/', methods=['POST'])
@jwt_required()
def create_booking():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    if not data.get('destination'):
        return jsonify({'message': 'Destination is required'}), 400
    
    booking = Booking(
        booking_id=generate_booking_id(),
        user_id=user_id,
        destination=data['destination'],
        check_in=data.get('checkIn'),
        check_out=data.get('checkOut'),
        guests=data.get('guests', 1),
        total_amount=data.get('totalAmount', 0),
        status='pending',
        payment_status='pending',
        payment_method=data.get('paymentMethod'),
        special_requests=data.get('specialRequests')
    )
    
    db.session.add(booking)
    db.session.commit()
    
    return jsonify(booking.to_dict()), 201

@bookings_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_booking(id):
    user_id = get_jwt_identity()
    booking = Booking.query.get_or_404(id)
    
    # Check if user owns this booking or is admin
    from app.models import User
    user = User.query.get(user_id)
    if booking.user_id != user_id and user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    return jsonify(booking.to_dict()), 200

@bookings_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_booking(id):
    user_id = get_jwt_identity()
    booking = Booking.query.get_or_404(id)
    data = request.get_json()
    
    # Check if user owns this booking or is admin
    from app.models import User
    user = User.query.get(user_id)
    if booking.user_id != user_id and user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    booking.destination = data.get('destination', booking.destination)
    booking.check_in = data.get('checkIn', booking.check_in)
    booking.check_out = data.get('checkOut', booking.check_out)
    booking.guests = data.get('guests', booking.guests)
    booking.total_amount = data.get('totalAmount', booking.total_amount)
    booking.status = data.get('status', booking.status)
    booking.payment_status = data.get('paymentStatus', booking.payment_status)
    booking.special_requests = data.get('specialRequests', booking.special_requests)
    
    db.session.commit()
    
    return jsonify(booking.to_dict()), 200

@bookings_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_booking(id):
    user_id = get_jwt_identity()
    booking = Booking.query.get_or_404(id)
    
    # Check if user owns this booking or is admin
    from app.models import User
    user = User.query.get(user_id)
    if booking.user_id != user_id and user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    db.session.delete(booking)
    db.session.commit()
    
    return jsonify({'message': 'Booking deleted successfully'}), 200
