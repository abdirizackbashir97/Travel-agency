@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'success': True,
        'access_token': access_token,
        'user': {
            'id': user.id,
            'first_name': user.first_name,
            'second_name': user.second_name,
            'email': user.email,
            'phone': user.phone,
            'role': user.role  # ← Add this line
        }
    }), 200
