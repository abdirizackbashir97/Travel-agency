from flask import request, jsonify
from services.booking_service import BookingService

booking_service = BookingService()

def register_booking_routes(app):
    
    @app.route('/api/bookings', methods=['POST'])
    def create_booking():
        """Create a new booking"""
        data = request.get_json()
        
        # Validate required fields
        required = ['user_id', 'booking_type', 'booking_item', 'travel_date', 'total_price']
        for field in required:
            if data.get(field) is None:
                return jsonify({
                    'success': False,
                    'message': f'{field} is required'
                }), 400
        
        booking = booking_service.create_booking(
            user_id=data['user_id'],
            booking_type=data['booking_type'],
            booking_item=data['booking_item'],
            travel_date=data['travel_date'],
            total_price=data['total_price'],
            number_of_people=data.get('number_of_people', 1),
            return_date=data.get('return_date'),
            payment_method=data.get('payment_method'),
            special_requests=data.get('special_requests'),
            phone_number=data.get('phone_number'),
            image_url=data.get('image_url')
        )
        
        return jsonify({
            'success': True,
            'message': 'Booking created successfully',
            'data': booking,
            'booking': booking
        }), 201
    
    @app.route('/api/bookings', methods=['GET'])
    def get_all_bookings():
        """Get all bookings"""
        bookings = booking_service.get_all_bookings()
        return jsonify({
            'success': True,
            'data': bookings,
            'bookings': bookings,
            'count': len(bookings)
        }), 200
    
    @app.route('/api/bookings/user/<int:user_id>', methods=['GET'])
    def get_user_bookings(user_id):
        """Get bookings for a specific user"""
        bookings = booking_service.get_user_bookings(user_id)
        return jsonify({
            'success': True,
            'data': bookings,
            'bookings': bookings,
            'count': len(bookings)
        }), 200
    
    @app.route('/api/bookings/type/<booking_type>', methods=['GET'])
    def get_bookings_by_type(booking_type):
        """Get bookings by type"""
        bookings = booking_service.get_bookings_by_type(booking_type)
        return jsonify({
            'success': True,
            'data': bookings,
            'bookings': bookings,
            'count': len(bookings)
        }), 200
    
    @app.route('/api/bookings/status/<booking_status>', methods=['GET'])
    def get_bookings_by_status(booking_status):
        """Get bookings by status"""
        bookings = booking_service.get_bookings_by_status(booking_status)
        return jsonify({
            'success': True,
            'data': bookings,
            'bookings': bookings,
            'count': len(bookings)
        }), 200
    
    @app.route('/api/bookings/<int:booking_id>', methods=['GET'])
    def get_booking(booking_id):
        """Get a booking by ID"""
        booking = booking_service.get_booking_by_id(booking_id)
        if not booking:
            return jsonify({
                'success': False,
                'message': 'Booking not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': booking,
            'booking': booking
        }), 200
    
    @app.route('/api/bookings/<int:booking_id>', methods=['PUT'])
    def update_booking(booking_id):
        """Update a booking"""
        data = request.get_json()
        result = booking_service.update_booking(booking_id, data)
        
        if result['success']:
            booking = booking_service.get_booking_by_id(booking_id)
            return jsonify({
                'success': True,
                'message': 'Booking updated successfully',
                'data': booking,
                'booking': booking
            }), 200
        else:
            return jsonify(result), 400
    
    @app.route('/api/bookings/<int:booking_id>/status', methods=['PUT'])
    def update_booking_status(booking_id):
        """Update booking status"""
        data = request.get_json()
        booking_status = data.get('booking_status')
        
        if not booking_status:
            return jsonify({
                'success': False,
                'message': 'Booking status is required'
            }), 400
        
        result = booking_service.update_booking_status(booking_id, booking_status)
        return jsonify(result), 200
    
    @app.route('/api/bookings/<int:booking_id>/payment', methods=['PUT'])
    def update_payment_status(booking_id):
        """Update payment status"""
        data = request.get_json()
        payment_status = data.get('payment_status')
        
        if not payment_status:
            return jsonify({
                'success': False,
                'message': 'Payment status is required'
            }), 400
        
        result = booking_service.update_payment_status(booking_id, payment_status)
        return jsonify(result), 200
    
    @app.route('/api/bookings/<int:booking_id>/cancel', methods=['POST'])
    def cancel_booking(booking_id):
        """Cancel a booking"""
        result = booking_service.cancel_booking(booking_id)
        return jsonify(result), 200
    
    @app.route('/api/bookings/stats', methods=['GET'])
    def get_booking_stats():
        """Get booking statistics"""
        stats = booking_service.get_booking_stats()
        return jsonify({
            'success': True,
            'stats': stats
        }), 200
    
    @app.route('/api/bookings/<int:booking_id>', methods=['DELETE'])
    def delete_booking(booking_id):
        """Delete a booking"""
        result = booking_service.delete_booking(booking_id)
        return jsonify(result), 200
    
    print("✅ Booking routes registered")
