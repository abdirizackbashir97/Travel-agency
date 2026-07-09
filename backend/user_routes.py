from flask import request, jsonify
from services.user_service import UserService

user_service = UserService()

def register_user_routes(app):
    
    @app.route('/api/users', methods=['GET'])
    def get_all_users():
        """Get all users"""
        users = user_service.get_all_users()
        return jsonify({
            'success': True,
            'users': users,
            'count': len(users)
        }), 200
    
    @app.route('/api/users/<int:user_id>', methods=['GET'])
    def get_user(user_id):
        """Get user by ID"""
        user = user_service.get_user_by_id(user_id)
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        return jsonify({
            'success': True,
            'user': user
        }), 200
    
    @app.route('/api/users/<int:user_id>', methods=['PUT'])
    def update_user(user_id):
        """Update user"""
        data = request.get_json()
        result = user_service.update_user(user_id, data)
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 400
    
    @app.route('/api/users/<int:user_id>', methods=['DELETE'])
    def delete_user(user_id):
        """Delete user"""
        result = user_service.delete_user(user_id)
        return jsonify(result), 200
    
    @app.route('/api/users/email/<email>', methods=['GET'])
    def get_user_by_email(email):
        """Get user by email"""
        user = user_service.get_user_by_email(email)
        if not user:
            return jsonify({
                'success': False,
                'message': 'User not found'
            }), 404
        
        return jsonify({
            'success': True,
            'user': user
        }), 200
    
    print("✅ User routes registered")
