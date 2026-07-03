from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Hotel, db

hotels_bp = Blueprint('hotels', __name__)

@hotels_bp.route('/', methods=['GET'])
def get_all_hotels():
    hotels = Hotel.query.filter_by(is_active=True).all()
    return jsonify([h.to_dict() for h in hotels]), 200

@hotels_bp.route('/<int:id>', methods=['GET'])
def get_hotel(id):
    hotel = Hotel.query.get_or_404(id)
    return jsonify(hotel.to_dict()), 200

@hotels_bp.route('/', methods=['POST'])
@jwt_required()
def create_hotel():
    data = request.get_json()
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    hotel = Hotel(
        name=data['name'],
        location=data['location'],
        price=data['price'],
        rating=data.get('rating', 0),
        description=data.get('description'),
        category=data.get('category'),
        vibe=data.get('vibe'),
        image=data.get('image'),
        amenities=','.join(data.get('amenities', [])) if data.get('amenities') else None,
        highlights=','.join(data.get('highlights', [])) if data.get('highlights') else None
    )
    
    db.session.add(hotel)
    db.session.commit()
    
    return jsonify(hotel.to_dict()), 201

@hotels_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_hotel(id):
    data = request.get_json()
    hotel = Hotel.query.get_or_404(id)
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    hotel.name = data.get('name', hotel.name)
    hotel.location = data.get('location', hotel.location)
    hotel.price = data.get('price', hotel.price)
    hotel.rating = data.get('rating', hotel.rating)
    hotel.description = data.get('description', hotel.description)
    hotel.category = data.get('category', hotel.category)
    hotel.vibe = data.get('vibe', hotel.vibe)
    hotel.image = data.get('image', hotel.image)
    hotel.amenities = ','.join(data.get('amenities', [])) if data.get('amenities') else hotel.amenities
    hotel.highlights = ','.join(data.get('highlights', [])) if data.get('highlights') else hotel.highlights
    
    db.session.commit()
    
    return jsonify(hotel.to_dict()), 200

@hotels_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_hotel(id):
    hotel = Hotel.query.get_or_404(id)
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    hotel.is_active = False
    db.session.commit()
    
    return jsonify({'message': 'Hotel deleted successfully'}), 200
