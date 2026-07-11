from flask import request, jsonify
from services.flight_service import FlightService

flight_service = FlightService()

def register_flight_routes(app):

    @app.route('/api/flights', methods=['GET'])
    def get_all_flights():
        flights = flight_service.get_all_flights()
        return jsonify({'success': True, 'data': flights, 'count': len(flights)}), 200

    @app.route('/api/flights/<int:flight_id>', methods=['GET'])
    def get_flight(flight_id):
        flight = flight_service.get_flight_by_id(flight_id)
        if not flight:
            return jsonify({'success': False, 'message': 'Flight not found'}), 404
        return jsonify({'success': True, 'data': flight}), 200

    @app.route('/api/flights', methods=['POST'])
    def create_flight():
        data = request.get_json()
        required = ['airline', 'flight_number', 'departure_airport', 'departure_city',
                    'departure_time', 'arrival_airport', 'arrival_city', 'arrival_time',
                    'duration', 'flight_type', 'baggage_allowance', 'travel_date', 'price']
        missing = [f for f in required if f not in data]
        if missing:
            return jsonify({'success': False, 'message': f'Missing fields: {missing}'}), 400
        flight = flight_service.create_flight(data)
        return jsonify({'success': True, 'message': 'Flight created', 'data': flight}), 201

    @app.route('/api/flights/<int:flight_id>', methods=['PUT'])
    def update_flight(flight_id):
        data = request.get_json()
        result = flight_service.update_flight(flight_id, data)
        if result['success']:
            flight = flight_service.get_flight_by_id(flight_id)
            return jsonify({'success': True, 'message': 'Flight updated', 'data': flight}), 200
        return jsonify(result), 400

    @app.route('/api/flights/<int:flight_id>', methods=['DELETE'])
    def delete_flight(flight_id):
        result = flight_service.delete_flight(flight_id)
        return jsonify(result), 200

    print("✅ Flight routes registered (PUT included)")
