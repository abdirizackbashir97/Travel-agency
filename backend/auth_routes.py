from flask import request, jsonify
from services.user_service import UserService

user_service = UserService()

def register_auth_routes(app):

    @app.route('/api/auth/register', methods=['POST'])
    def register():
        data = request.get_json()
        required = ['first_name', 'second_name', 'email', 'password', 'age']
        for field in required:
            if not data.get(field):
                return jsonify({
                    'success': False,
                    'message': f'{field} is required'
                }), 400

        result = user_service.register_user(
            first_name=data['first_name'],
            second_name=data['second_name'],
            email=data['email'],
            password=data['password'],
            age=data['age'],
            phone=data.get('phone')
        )

        if result['success']:
            return jsonify(result), 201
        else:
            return jsonify(result), 400

    @app.route('/api/auth/login', methods=['POST'])
    def login():
        data = request.get_json()
        print("🔐 Login attempt:", data.get("email"), data.get("password"))

        if not data.get('email') or not data.get('password'):
            return jsonify({
                'success': False,
                'message': 'Email and password are required'
            }), 400

        result = user_service.login_user(
            email=data['email'],
            password=data['password']
        )

        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 401

    @app.route('/api/auth/me', methods=['GET'])
    def get_current_user():
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({
                'success': False,
                'message': 'Authorization token required'
            }), 401

        token = auth_header.split(' ')[1]
        user = user_service.get_current_user(token)

        if not user:
            return jsonify({
                'success': False,
                'message': 'Invalid or expired token'
            }), 401

        return jsonify({
            'success': True,
            'user': user
        }), 200

    print("✅ Auth routes registered")
