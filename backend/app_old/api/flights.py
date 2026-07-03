from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Flight, db

flights_bp = Blueprint('flights', __name__)

@flights_bp.route('/', methods=['GET'])
def get_all_flights():
    flights = Flight.query.filter_by(is_active=True).all()
    return jsonify([f.to_dict() for f in flights]), 200

@flights_bp.route('/<int:id>', methods=['GET'])
def get_flight(id):
    flight = Flight.query.get_or_404(id)
    return jsonify(flight.to_dict()), 200

@flights_bp.route('/', methods=['POST'])
@jwt_required()
def create_flight():
    data = request.get_json()
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    flight = Flight(
        airline=data['airline'],
        flight_number=data['flightNumber'],
        from_city=data['from'],
        to_city=data['to'],
        departure=data.get('departure'),
        arrival=data.get('arrival'),
        price=data['price'],
        duration=data.get('duration'),
        stops=data.get('stops', 0),
        date=data.get('date'),
        baggage=data.get('baggage'),
        class_type=data.get('class', 'Economy'),
        image=data.get('image')
    )
    
    db.session.add(flight)
    db.session.commit()
    
    return jsonify(flight.to_dict()), 201

@flights_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_flight(id):
    data = request.get_json()
    flight = Flight.query.get_or_404(id)
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    flight.airline = data.get('airline', flight.airline)
    flight.flight_number = data.get('flightNumber', flight.flight_number)
    flight.from_city = data.get('from', flight.from_city)
    flight.to_city = data.get('to', flight.to_city)
    flight.departure = data.get('departure', flight.departure)
    flight.arrival = data.get('arrival', flight.arrival)
    flight.price = data.get('price', flight.price)
    flight.duration = data.get('duration', flight.duration)
    flight.stops = data.get('stops', flight.stops)
    flight.date = data.get('date', flight.date)
    flight.baggage = data.get('baggage', flight.baggage)
    flight.class_type = data.get('class', flight.class_type)
    flight.image = data.get('image', flight.image)
    
    db.session.commit()
    
    return jsonify(flight.to_dict()), 200

@flights_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_flight(id):
    flight = Flight.query.get_or_404(id)
    
    # Check if admin
    user_id = get_jwt_identity()
    from app.models import User
    user = User.query.get(user_id)
    if user.role != 'admin':
        return jsonify({'message': 'Admin access required'}), 403
    
    flight.is_active = False
    db.session.commit()
    
    return jsonify({'message': 'Flight deleted successfully'}), 200
