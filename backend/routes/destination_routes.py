from flask import request, jsonify
from services.destination_service import DestinationService

destination_service = DestinationService()

def register_destination_routes(app):
    
    @app.route('/api/destinations', methods=['GET'])
    def get_all_destinations():
        """Get all destinations"""
        destinations = destination_service.get_all_destinations()
        return jsonify({
            'success': True,
            'destinations': destinations,
            'count': len(destinations)
        }), 200
    
    @app.route('/api/destinations/top', methods=['GET'])
    def get_top_destinations():
        """Get top rated destinations"""
        limit = request.args.get('limit', 5, type=int)
        destinations = destination_service.get_top_destinations(limit)
        return jsonify({
            'success': True,
            'destinations': destinations,
            'count': len(destinations)
        }), 200
    
    @app.route('/api/destinations/search', methods=['GET'])
    def search_destinations():
        """Search destinations"""
        query = request.args.get('q', '')
        if not query:
            return jsonify({
                'success': False,
                'message': 'Search query is required'
            }), 400
        
        destinations = destination_service.search_destinations(query)
        return jsonify({
            'success': True,
            'destinations': destinations,
            'count': len(destinations)
        }), 200
    
    @app.route('/api/destinations/country/<country>', methods=['GET'])
    def get_destinations_by_country(country):
        """Get destinations by country"""
        destinations = destination_service.get_destinations_by_country(country)
        return jsonify({
            'success': True,
            'destinations': destinations,
            'count': len(destinations)
        }), 200
    
    @app.route('/api/destinations/category/<category>', methods=['GET'])
    def get_destinations_by_category(category):
        """Get destinations by category"""
        destinations = destination_service.get_destinations_by_category(category)
        return jsonify({
            'success': True,
            'destinations': destinations,
            'count': len(destinations)
        }), 200
    
    @app.route('/api/destinations/<int:destination_id>', methods=['GET'])
    def get_destination(destination_id):
        """Get a destination by ID"""
        destination = destination_service.get_destination_by_id(destination_id)
        if not destination:
            return jsonify({
                'success': False,
                'message': 'Destination not found'
            }), 404
        
        return jsonify({
            'success': True,
            'destination': destination
        }), 200
    
    @app.route('/api/destinations', methods=['POST'])
    def create_destination():
        """Create a new destination"""
        data = request.get_json()
        
        # Validate required fields
        required = ['name', 'country', 'category', 'rating', 'reviews', 
                   'price_per_night', 'description', 'attractions', 'best_time', 'city']
        for field in required:
            if data.get(field) is None:
                return jsonify({
                    'success': False,
                    'message': f'{field} is required'
                }), 400
        
        destination = destination_service.create_destination(
            name=data['name'],
            country=data['country'],
            category=data['category'],
            rating=data['rating'],
            reviews=data['reviews'],
            price_per_night=data['price_per_night'],
            description=data['description'],
            attractions=data['attractions'],
            best_time=data['best_time'],
            city=data['city']
        )
        
        return jsonify({
            'success': True,
            'message': 'Destination created successfully',
            'destination': destination
        }), 201
    
    @app.route('/api/destinations/<int:destination_id>', methods=['PUT'])
    def update_destination(destination_id):
        """Update a destination"""
        data = request.get_json()
        result = destination_service.update_destination(destination_id, data)
        
        if result['success']:
            destination = destination_service.get_destination_by_id(destination_id)
            return jsonify({
                'success': True,
                'message': 'Destination updated successfully',
                'destination': destination
            }), 200
        else:
            return jsonify(result), 400
    
    @app.route('/api/destinations/<int:destination_id>', methods=['DELETE'])
    def delete_destination(destination_id):
        """Delete a destination"""
        result = destination_service.delete_destination(destination_id)
        return jsonify(result), 200
    
    print("✅ Destination routes registered")
