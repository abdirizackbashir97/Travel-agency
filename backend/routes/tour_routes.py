from flask import request, jsonify
from services.tour_service import TourService

tour_service = TourService()

def register_tour_routes(app):

    @app.route('/api/tours', methods=['GET'])
    def get_all_tours():
        tours = tour_service.get_all_tours()
        return jsonify({'success': True, 'data': tours, 'count': len(tours)}), 200

    @app.route('/api/tours/<int:tour_id>', methods=['GET'])
    def get_tour(tour_id):
        tour = tour_service.get_tour_by_id(tour_id)
        if not tour:
            return jsonify({'success': False, 'message': 'Tour not found'}), 404
        return jsonify({'success': True, 'data': tour}), 200

    @app.route('/api/tours', methods=['POST'])
    def create_tour():
        data = request.get_json()
        required = ['tour_name', 'location', 'country', 'rating',
                    'duration_days', 'price_per_person', 'description']
        missing = [f for f in required if f not in data]
        if missing:
            return jsonify({'success': False, 'message': f'Missing: {missing}'}), 400
        tour = tour_service.create_tour(data)
        return jsonify({'success': True, 'message': 'Tour created', 'data': tour}), 201

    @app.route('/api/tours/<int:tour_id>', methods=['PUT'])
    def update_tour(tour_id):
        data = request.get_json()
        result = tour_service.update_tour(tour_id, data)
        if result['success']:
            tour = tour_service.get_tour_by_id(tour_id)
            return jsonify({'success': True, 'message': 'Tour updated', 'data': tour}), 200
        return jsonify(result), 400

    @app.route('/api/tours/<int:tour_id>', methods=['DELETE'])
    def delete_tour(tour_id):
        result = tour_service.delete_tour(tour_id)
        return jsonify(result), 200

    print("✅ Tour routes registered")
