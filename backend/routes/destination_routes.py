from flask import request, jsonify
from services.destination_service import DestinationService

dest_service = DestinationService()

def register_destination_routes(app):

    @app.route('/api/destinations', methods=['GET'])
    def get_all_destinations():
        destinations = dest_service.get_all_destinations()
        return jsonify({'success': True, 'data': destinations, 'count': len(destinations)}), 200

    @app.route('/api/destinations/<int:dest_id>', methods=['GET'])
    def get_destination(dest_id):
        dest = dest_service.get_destination_by_id(dest_id)
        if not dest:
            return jsonify({'success': False, 'message': 'Destination not found'}), 404
        return jsonify({'success': True, 'data': dest}), 200

    @app.route('/api/destinations', methods=['POST'])
    def create_destination():
        data = request.get_json()
        required = ['name', 'country', 'category', 'rating', 'reviews',
                    'price_per_night', 'description', 'attractions', 'best_time', 'city']
        missing = [f for f in required if f not in data]
        if missing:
            return jsonify({'success': False, 'message': f'Missing: {missing}'}), 400
        dest = dest_service.create_destination(data)
        return jsonify({'success': True, 'message': 'Destination created', 'data': dest}), 201

    @app.route('/api/destinations/<int:dest_id>', methods=['PUT'])
    def update_destination(dest_id):
        data = request.get_json()
        result = dest_service.update_destination(dest_id, data)
        if result['success']:
            dest = dest_service.get_destination_by_id(dest_id)
            return jsonify({'success': True, 'message': 'Destination updated', 'data': dest}), 200
        return jsonify(result), 400

    @app.route('/api/destinations/<int:dest_id>', methods=['DELETE'])
    def delete_destination(dest_id):
        result = dest_service.delete_destination(dest_id)
        return jsonify(result), 200

    print("✅ Destination routes registered")
