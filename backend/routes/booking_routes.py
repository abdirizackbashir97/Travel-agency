from flask import request, jsonify
from services.booking_service import BookingService
from services.notification_service import NotificationService

booking_service = BookingService()
notification_service = NotificationService()

def register_booking_routes(app):

    @app.route('/api/bookings', methods=['POST'])
    def create_booking():
        data = request.get_json()
        required = ['user_id', 'booking_type', 'booking_item', 'travel_date', 'total_price']
        for field in required:
            if data.get(field) is None:
                return jsonify({'success': False, 'message': f'{field} is required'}), 400

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

        # Admin notification
        notification_service.create_notification(
            user_id=data['user_id'],
            title='New Booking',
            message=f"New booking for {data['booking_item']}",
            booking_id=booking.get('id')
        )

        return jsonify({'success': True, 'message': 'Booking created', 'data': booking}), 201

    @app.route('/api/bookings/<int:booking_id>/status', methods=['PUT'])
    def update_booking_status(booking_id):
        data = request.get_json()
        status = data.get('booking_status')
        if not status:
            return jsonify({'success': False, 'message': 'Status required'}), 400

        result = booking_service.update_booking_status(booking_id, status)
        if result['success']:
            booking = booking_service.get_booking_by_id(booking_id)
            if booking:
                # User notification with friendly message
                if status == 'confirmed':
                    msg = f"🎉 Your booking for {booking['booking_item']} has been confirmed! We're excited for your trip."
                elif status == 'cancelled':
                    msg = f"❌ Your booking for {booking['booking_item']} has been cancelled. Please contact support if you have questions."
                elif status == 'pending':
                    msg = f"⏳ Your booking for {booking['booking_item']} is pending further verification. We'll update you soon."
                else:
                    msg = f"Your booking for {booking['booking_item']} has been {status}."

                notification_service.create_notification(
                    user_id=booking['user_id'],
                    title='Booking Status Update',
                    message=msg,
                    booking_id=booking_id
                )
            return jsonify(result), 200
        return jsonify(result), 400

    # ... other routes (GET, PUT, DELETE) ...
