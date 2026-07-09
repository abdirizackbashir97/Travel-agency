from flask import request, jsonify
from services.flight_service import FlightService

flight_service = FlightService()

def register_flight_routes(app):
    
    @app.route('/api/flights', methods=['GET'])
    def get_all_flights():
        """Get all flights"""
        flights = flight_service.get_all_flights()
        return jsonify({
            'success': True,
            'data': flights,
            'flights': flights,
            'count': len(flights)
        }), 200
    
    @app.route('/api/flights/search', methods=['GET'])
    def search_flights():
        """Search flights"""
        origin = request.args.get('origin')
        destination = request.args.get('destination')
        date = request.args.get('date')
        
        flights = flight_service.search_flights(origin, destination, date)
        return jsonify({
            'success': True,
            'data': flights,
            'flights': flights,
            'count': len(flights)
        }), 200
    
    @app.route('/api/flights/origin/<origin>', methods=['GET'])
    def get_flights_by_origin(origin):
        """Get flights by origin"""
        flights = flight_service.get_flights_by_origin(origin)
        return jsonify({
            'success': True,
            'data': flights,
            'flights': flights,
            'count': len(flights)
        }), 200
    
    @app.route('/api/flights/destination/<destination>', methods=['GET'])
    def get_flights_by_destination(destination):
        """Get flights by destination"""
        flights = flight_service.get_flights_by_destination(destination)
        return jsonify({
            'success': True,
            'data': flights,
            'flights': flights,
            'count': len(flights)
        }), 200
    
    @app.route('/api/flights/date/<date>', methods=['GET'])
    def get_flights_by_date(date):
        """Get flights by date"""
        flights = flight_service.get_flights_by_date(date)
        return jsonify({
            'success': True,
            'data': flights,
            'flights': flights,
            'count': len(flights)
        }), 200
    
    @app.route('/api/flights/type/<flight_type>', methods=['GET'])
    def get_flights_by_type(flight_type):
        """Get flights by type"""
        flights = flight_service.get_flights_by_type(flight_type)
        return jsonify({
            'success': True,
            'data': flights,
            'flights': flights,
            'count': len(flights)
        }), 200
    
    @app.route('/api/flights/<int:flight_id>', methods=['GET'])
    def get_flight(flight_id):
        """Get a flight by ID"""
        flight = flight_service.get_flight_by_id(flight_id)
        if not flight:
            return jsonify({
                'success': False,
                'message': 'Flight not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': flight,
            'flight': flight
        }), 200
    
    print("✅ Flight routes registered")
