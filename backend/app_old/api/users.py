from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import User, db

users_bp = Blueprint('users', __name__)

@users_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_users():
    # Check if admin
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    users = User.query.all()
    return jsonify([u.to_dict() for u in users]), 200

@users_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_user(id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    # Allow users to view their own profile or admin to view any
    if user_id != id and user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    target_user = User.query.get_or_404(id)
    return jsonify(target_user.to_dict()), 200

@users_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_user(id):
    user_id = get_jwt_identity()
    current_user = User.query.get(user_id)
    
    # Allow users to update their own profile or admin to update any
    if user_id != id and current_user.role != 'admin':
        return jsonify({'message': 'Unauthorized'}), 403
    
    user = User.query.get_or_404(id)
    data = request.get_json()
    
    user.first_name = data.get('firstName', user.first_name)
    user.last_name = data.get('lastName', user.last_name)
    user.phone = data.get('phone', user.phone)
    user.location = data.get('location', user.location)
    user.bio = data.get('bio', user.bio)
    user.profile_image = data.get('profileImage', user.profile_image)
    
    if data.get('password'):
        user.set_password(data['password'])
    
    db.session.commit()
    
    return jsonify(user.to_dict()), 200

@users_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    # Check if admin
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    target_user = User.query.get_or_404(id)
    target_user.is_active = False
    db.session.commit()
    
    return jsonify({'message': 'User deleted successfully'}), 200
