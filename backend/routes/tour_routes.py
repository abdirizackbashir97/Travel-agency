from flask import request, jsonify
from services.tour_service import TourService

tour_service = TourService()

def register_tour_routes(app):
    
    @app.route('/api/tours', methods=['GET'])
    def get_all_tours():
        """Get all tours"""
        tours = tour_service.get_all_tours()
        return jsonify({
            'success': True,
            'data': tours,
            'tours': tours,
            'count': len(tours)
        }), 200
    
    @app.route('/api/tours/top', methods=['GET'])
    def get_top_tours():
        """Get top rated tours"""
        limit = request.args.get('limit', 5, type=int)
        tours = tour_service.get_top_tours(limit)
        return jsonify({
            'success': True,
            'data': tours,
            'tours': tours,
            'count': len(tours)
        }), 200
    
    @app.route('/api/tours/search', methods=['GET'])
    def search_tours():
        """Search tours"""
        query = request.args.get('q', '')
        if not query:
            return jsonify({
                'success': False,
                'message': 'Search query is required'
            }), 400
        
        tours = tour_service.search_tours(query)
        return jsonify({
            'success': True,
            'data': tours,
            'tours': tours,
            'count': len(tours)
        }), 200
    
    @app.route('/api/tours/country/<country>', methods=['GET'])
    def get_tours_by_country(country):
        """Get tours by country"""
        tours = tour_service.get_tours_by_country(country)
        return jsonify({
            'success': True,
            'data': tours,
            'tours': tours,
            'count': len(tours)
        }), 200
    
    @app.route('/api/tours/location/<location>', methods=['GET'])
    def get_tours_by_location(location):
        """Get tours by location"""
        tours = tour_service.get_tours_by_location(location)
        return jsonify({
            'success': True,
            'data': tours,
            'tours': tours,
            'count': len(tours)
        }), 200
    
    @app.route('/api/tours/<int:tour_id>', methods=['GET'])
    def get_tour(tour_id):
        """Get a tour by ID"""
        tour = tour_service.get_tour_by_id(tour_id)
        if not tour:
            return jsonify({
                'success': False,
                'message': 'Tour not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': tour,
            'tour': tour
        }), 200
    
    print("✅ Tour routes registered")
