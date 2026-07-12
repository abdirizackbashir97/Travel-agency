from flask import request, jsonify
from services.notification_service import NotificationService

notification_service = NotificationService()

def register_notification_routes(app):

    @app.route('/api/notifications', methods=['GET'])
    def get_notifications():
        limit = request.args.get('limit', 20, type=int)
        notifications = notification_service.get_notifications(limit)
        return jsonify({'success': True, 'data': notifications}), 200

    @app.route('/api/notifications/unread', methods=['GET'])
    def get_unread_count():
        count = notification_service.get_unread_count()
        return jsonify({'success': True, 'count': count}), 200

    @app.route('/api/notifications/<int:notif_id>/read', methods=['PUT'])
    def mark_as_read(notif_id):
        result = notification_service.mark_as_read(notif_id)
        return jsonify(result), 200

    @app.route('/api/notifications/mark-all-read', methods=['PUT'])
    def mark_all_read():
        result = notification_service.mark_all_as_read()
        return jsonify(result), 200

    print("✅ Notification routes registered")
