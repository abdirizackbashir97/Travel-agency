from flask import request, jsonify
from services.hotel_service import HotelService

hotel_service = HotelService()

def register_hotel_routes(app):
    
    @app.route('/api/hotels', methods=['GET'])
    def get_all_hotels():
        """Get all hotels"""
        hotels = hotel_service.get_all_hotels()
        return jsonify({
            'success': True,
            'data': hotels,
            'hotels': hotels,
            'count': len(hotels)
        }), 200
    
    @app.route('/api/hotels/top', methods=['GET'])
    def get_top_hotels():
        """Get top rated hotels"""
        limit = request.args.get('limit', 5, type=int)
        hotels = hotel_service.get_top_hotels(limit)
        return jsonify({
            'success': True,
            'data': hotels,
            'hotels': hotels,
            'count': len(hotels)
        }), 200
    
    @app.route('/api/hotels/search', methods=['GET'])
    def search_hotels():
        """Search hotels"""
        query = request.args.get('q', '')
        if not query:
            return jsonify({
                'success': False,
                'message': 'Search query is required'
            }), 400
        
        hotels = hotel_service.search_hotels(query)
        return jsonify({
            'success': True,
            'data': hotels,
            'hotels': hotels,
            'count': len(hotels)
        }), 200
    
    @app.route('/api/hotels/country/<country>', methods=['GET'])
    def get_hotels_by_country(country):
        """Get hotels by country"""
        hotels = hotel_service.get_hotels_by_country(country)
        return jsonify({
            'success': True,
            'data': hotels,
            'hotels': hotels,
            'count': len(hotels)
        }), 200
    
    @app.route('/api/hotels/category/<category>', methods=['GET'])
    def get_hotels_by_category(category):
        """Get hotels by category"""
        hotels = hotel_service.get_hotels_by_category(category)
        return jsonify({
            'success': True,
            'data': hotels,
            'hotels': hotels,
            'count': len(hotels)
        }), 200
    
    @app.route('/api/hotels/<int:hotel_id>', methods=['GET'])
    def get_hotel(hotel_id):
        """Get a hotel by ID"""
        hotel = hotel_service.get_hotel_by_id(hotel_id)
        if not hotel:
            return jsonify({
                'success': False,
                'message': 'Hotel not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': hotel,
            'hotel': hotel
        }), 200
    
    @app.route('/api/hotels', methods=['POST'])
    def create_hotel():
        """Create a new hotel"""
        data = request.get_json()
        
        required = ['hotel_name', 'location', 'country', 'category', 'rating', 'reviews', 
                   'price_per_night', 'description', 'amenities', 'highlights', 'tagline']
        for field in required:
            if data.get(field) is None:
                return jsonify({
                    'success': False,
                    'message': f'{field} is required'
                }), 400
        
        hotel = hotel_service.create_hotel(
            hotel_name=data['hotel_name'],
            location=data['location'],
            country=data['country'],
            category=data['category'],
            rating=data['rating'],
            reviews=data['reviews'],
            price_per_night=data['price_per_night'],
            description=data['description'],
            amenities=data['amenities'],
            highlights=data['highlights'],
            tagline=data['tagline']
        )
        
        return jsonify({
            'success': True,
            'message': 'Hotel created successfully',
            'data': hotel,
            'hotel': hotel
        }), 201
    
    @app.route('/api/hotels/<int:hotel_id>', methods=['PUT'])
    def update_hotel(hotel_id):
        """Update a hotel"""
        data = request.get_json()
        result = hotel_service.update_hotel(hotel_id, data)
        
        if result['success']:
            hotel = hotel_service.get_hotel_by_id(hotel_id)
            return jsonify({
                'success': True,
                'message': 'Hotel updated successfully',
                'data': hotel,
                'hotel': hotel
            }), 200
        else:
            return jsonify(result), 400
    
    @app.route('/api/hotels/<int:hotel_id>', methods=['DELETE'])
    def delete_hotel(hotel_id):
        """Delete a hotel"""
        result = hotel_service.delete_hotel(hotel_id)
        return jsonify(result), 200
    
    print("✅ Hotel routes registered")
