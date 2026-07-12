from flask import request, jsonify
from services.booking_service import BookingService
from services.notification_service import NotificationService

booking_service = BookingService()

def register_booking_routes(app):

    @app.route('/api/bookings', methods=['POST'])
    def create_booking():
        data = request.get_json()

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

        # Create notification for admin with booking_id
        NotificationService().create_notification(
            user_id=data['user_id'],
            title='New Booking',
            message=f"New booking for {data['booking_item']} by user {data['user_id']}",
            booking_id=booking.get('id')
        )

        return jsonify({
            'success': True,
            'message': 'Booking created successfully',
            'data': booking,
            'booking': booking
        }), 201

    @app.route('/api/bookings', methods=['GET'])
    def get_all_bookings():
        bookings = booking_service.get_all_bookings()
        return jsonify({
            'success': True,
            'data': bookings,
            'bookings': bookings,
            'count': len(bookings)
        }), 200

    @app.route('/api/bookings/user/<int:user_id>', methods=['GET'])
    def get_user_bookings(user_id):
        bookings = booking_service.get_user_bookings(user_id)
        return jsonify({
            'success': True,
            'data': bookings,
            'bookings': bookings,
            'count': len(bookings)
        }), 200

    @app.route('/api/bookings/type/<booking_type>', methods=['GET'])
    def get_bookings_by_type(booking_type):
        bookings = booking_service.get_bookings_by_type(booking_type)
        return jsonify({
            'success': True,
            'data': bookings,
            'bookings': bookings,
            'count': len(bookings)
        }), 200

    @app.route('/api/bookings/status/<booking_status>', methods=['GET'])
    def get_bookings_by_status(booking_status):
        bookings = booking_service.get_bookings_by_status(booking_status)
        return jsonify({
            'success': True,
            'data': bookings,
            'bookings': bookings,
            'count': len(bookings)
        }), 200

    @app.route('/api/bookings/<int:booking_id>', methods=['GET'])
    def get_booking(booking_id):
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
        result = booking_service.cancel_booking(booking_id)
        return jsonify(result), 200

    @app.route('/api/bookings/stats', methods=['GET'])
    def get_booking_stats():
        stats = booking_service.get_booking_stats()
        return jsonify({
            'success': True,
            'stats': stats
        }), 200

    @app.route('/api/bookings/<int:booking_id>', methods=['DELETE'])
    def delete_booking(booking_id):
        result = booking_service.delete_booking(booking_id)
        return jsonify(result), 200

    print("✅ Booking routes registered")
