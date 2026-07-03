from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Destination, db
import json

destinations_bp = Blueprint('destinations', __name__)

@destinations_bp.route('/', methods=['GET'])
def get_all_destinations():
    destinations = Destination.query.filter_by(is_active=True).all()
    return jsonify([d.to_dict() for d in destinations]), 200

@destinations_bp.route('/<int:id>', methods=['GET'])
def get_destination(id):
    destination = Destination.query.get_or_404(id)
    return jsonify(destination.to_dict()), 200

@destinations_bp.route('/', methods=['POST'])
@jwt_required()
def create_destination():
    data = request.get_json()
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    destination = Destination(
        name=data['name'],
        country=data['country'],
        description=data.get('description'),
        price=data['price'],
        rating=data.get('rating', 0),
        image=data.get('image'),
        category=data.get('category'),
        highlights=','.join(data.get('highlights', [])) if data.get('highlights') else None,
        best_time=data.get('bestTime'),
        vibe=data.get('vibe')
    )
    
    db.session.add(destination)
    db.session.commit()
    
    return jsonify(destination.to_dict()), 201

@destinations_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_destination(id):
    data = request.get_json()
    destination = Destination.query.get_or_404(id)
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    destination.name = data.get('name', destination.name)
    destination.country = data.get('country', destination.country)
    destination.description = data.get('description', destination.description)
    destination.price = data.get('price', destination.price)
    destination.rating = data.get('rating', destination.rating)
    destination.image = data.get('image', destination.image)
    destination.category = data.get('category', destination.category)
    destination.highlights = ','.join(data.get('highlights', [])) if data.get('highlights') else destination.highlights
    destination.best_time = data.get('bestTime', destination.best_time)
    destination.vibe = data.get('vibe', destination.vibe)
    
    db.session.commit()
    
    return jsonify(destination.to_dict()), 200

@destinations_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_destination(id):
    destination = Destination.query.get_or_404(id)
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    destination.is_active = False
    db.session.commit()
    
    return jsonify({'message': 'Destination deleted successfully'}), 200
