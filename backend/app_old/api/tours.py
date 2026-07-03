from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Tour, db

tours_bp = Blueprint('tours', __name__)

@tours_bp.route('/', methods=['GET'])
def get_all_tours():
    tours = Tour.query.filter_by(is_active=True).all()
    return jsonify([t.to_dict() for t in tours]), 200

@tours_bp.route('/<int:id>', methods=['GET'])
def get_tour(id):
    tour = Tour.query.get_or_404(id)
    return jsonify(tour.to_dict()), 200

@tours_bp.route('/', methods=['POST'])
@jwt_required()
def create_tour():
    data = request.get_json()
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    tour = Tour(
        name=data['name'],
        location=data['location'],
        price=data['price'],
        duration=data.get('duration'),
        rating=data.get('rating', 0),
        description=data.get('description'),
        includes=data.get('includes'),
        badge=data.get('badge'),
        badge_color=data.get('badgeColor', 'bg-green-500'),
        image=data.get('image')
    )
    
    db.session.add(tour)
    db.session.commit()
    
    return jsonify(tour.to_dict()), 201

@tours_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_tour(id):
    data = request.get_json()
    tour = Tour.query.get_or_404(id)
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    tour.name = data.get('name', tour.name)
    tour.location = data.get('location', tour.location)
    tour.price = data.get('price', tour.price)
    tour.duration = data.get('duration', tour.duration)
    tour.rating = data.get('rating', tour.rating)
    tour.description = data.get('description', tour.description)
    tour.includes = data.get('includes', tour.includes)
    tour.badge = data.get('badge', tour.badge)
    tour.badge_color = data.get('badgeColor', tour.badge_color)
    tour.image = data.get('image', tour.image)
    
    db.session.commit()
    
    return jsonify(tour.to_dict()), 200

@tours_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_tour(id):
    tour = Tour.query.get_or_404(id)
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    tour.is_active = False
    db.session.commit()
    
    return jsonify({'message': 'Tour deleted successfully'}), 200
