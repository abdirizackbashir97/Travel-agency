from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from app.models import User, db
from app.services.email_service import send_welcome_email
from app import mail

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    required_fields = ['firstName', 'lastName', 'email', 'password']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'message': f'{field} is required'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User already exists'}), 409
    
    user = User(
        first_name=data['firstName'],
        last_name=data['lastName'],
        email=data['email'],
        phone=data.get('phone'),
        location=data.get('location'),
        role=data.get('role', 'user')
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    # Send welcome email
    try:
        send_welcome_email(mail, user)
        print(f"✅ Welcome email sent to {user.email}")
    except Exception as e:
        print(f"❌ Failed to send welcome email: {e}")
    
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    
    return jsonify({
        'message': 'User created successfully',
        'user': user.to_dict(),
        'accessToken': access_token,
        'refreshToken': refresh_token
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    if not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password required'}), 400
    
    user = User.query.filter_by(email=data['email']).first()
    
    if not user or not user.check_password(data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity=user.id)
    refresh_token = create_refresh_token(identity=user.id)
    
    return jsonify({
        'message': 'Login successful',
        'user': user.to_dict(),
        'accessToken': access_token,
        'refreshToken': refresh_token
    }), 200

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    access_token = create_access_token(identity=current_user_id)
    return jsonify({'accessToken': access_token}), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404
    return jsonify(user.to_dict()), 200

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    return jsonify({'message': 'Logged out successfully'}), 200
