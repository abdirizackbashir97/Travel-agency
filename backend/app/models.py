from app import db
from datetime import datetime
from flask_bcrypt import generate_password_hash, check_password_hash
import json

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(20))
    location = db.Column(db.String(100))
    bio = db.Column(db.Text)
    role = db.Column(db.String(20), default='user')
    profile_image = db.Column(db.String(200))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships with foreign_keys specified
    bookings = db.relationship('Booking', backref='user', lazy=True, foreign_keys='Booking.user_id')
    payments_as_user = db.relationship('Payment', backref='user', lazy=True, foreign_keys='Payment.user_id')
    payments_confirmed = db.relationship('Payment', backref='confirming_admin', lazy=True, foreign_keys='Payment.confirmed_by')
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'email': self.email,
            'phone': self.phone,
            'location': self.location,
            'bio': self.bio,
            'role': self.role,
            'profileImage': self.profile_image,
            'isActive': self.is_active,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class Booking(db.Model):
    __tablename__ = 'bookings'
    
    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.String(20), unique=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    destination = db.Column(db.String(100), nullable=False)
    check_in = db.Column(db.String(20))
    check_out = db.Column(db.String(20))
    guests = db.Column(db.Integer, default=1)
    total_amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')
    payment_status = db.Column(db.String(20), default='pending')
    payment_method = db.Column(db.String(50))
    special_requests = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    payment = db.relationship('Payment', backref='booking', uselist=False, foreign_keys='Payment.booking_id')
    
    def to_dict(self):
        return {
            'id': self.id,
            'bookingId': self.booking_id,
            'userId': self.user_id,
            'destination': self.destination,
            'checkIn': self.check_in,
            'checkOut': self.check_out,
            'guests': self.guests,
            'totalAmount': self.total_amount,
            'status': self.status,
            'paymentStatus': self.payment_status,
            'paymentMethod': self.payment_method,
            'specialRequests': self.special_requests,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class Payment(db.Model):
    __tablename__ = 'payments'
    
    id = db.Column(db.Integer, primary_key=True)
    payment_id = db.Column(db.String(30), unique=True, nullable=False)
    booking_id = db.Column(db.Integer, db.ForeignKey('bookings.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    status = db.Column(db.String(20), default='pending')
    transaction_id = db.Column(db.String(50))
    mpesa_receipt = db.Column(db.String(50))
    payment_date = db.Column(db.DateTime, default=datetime.utcnow)
    confirmed_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    confirmed_at = db.Column(db.DateTime)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'paymentId': self.payment_id,
            'bookingId': self.booking_id,
            'userId': self.user_id,
            'amount': self.amount,
            'phoneNumber': self.phone_number,
            'status': self.status,
            'transactionId': self.transaction_id,
            'mpesaReceipt': self.mpesa_receipt,
            'paymentDate': self.payment_date.isoformat() if self.payment_date else None,
            'confirmedBy': self.confirmed_by,
            'confirmedAt': self.confirmed_at.isoformat() if self.confirmed_at else None,
            'notes': self.notes,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class Notification(db.Model):
    __tablename__ = 'notifications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    type = db.Column(db.String(50), default='info')
    is_read = db.Column(db.Boolean, default=False)
    link = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'title': self.title,
            'message': self.message,
            'type': self.type,
            'isRead': self.is_read,
            'link': self.link,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }

class Destination(db.Model):
    __tablename__ = 'destinations'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Float, default=0)
    image = db.Column(db.String(200))
    category = db.Column(db.String(50))
    highlights = db.Column(db.Text)
    best_time = db.Column(db.String(100))
    vibe = db.Column(db.String(100))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'country': self.country,
            'description': self.description,
            'price': self.price,
            'rating': self.rating,
            'image': self.image,
            'category': self.category,
            'highlights': self.highlights.split(',') if self.highlights else [],
            'bestTime': self.best_time,
            'vibe': self.vibe,
            'isActive': self.is_active
        }

class Flight(db.Model):
    __tablename__ = 'flights'
    
    id = db.Column(db.Integer, primary_key=True)
    airline = db.Column(db.String(100), nullable=False)
    flight_number = db.Column(db.String(20), nullable=False)
    from_city = db.Column(db.String(100), nullable=False)
    to_city = db.Column(db.String(100), nullable=False)
    departure = db.Column(db.String(10))
    arrival = db.Column(db.String(10))
    price = db.Column(db.Float, nullable=False)
    duration = db.Column(db.String(20))
    stops = db.Column(db.Integer, default=0)
    date = db.Column(db.String(20))
    baggage = db.Column(db.String(20))
    class_type = db.Column(db.String(20), default='Economy')
    image = db.Column(db.String(200))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'airline': self.airline,
            'flightNumber': self.flight_number,
            'from': self.from_city,
            'to': self.to_city,
            'departure': self.departure,
            'arrival': self.arrival,
            'price': self.price,
            'duration': self.duration,
            'stops': self.stops,
            'date': self.date,
            'baggage': self.baggage,
            'class': self.class_type,
            'image': self.image,
            'isActive': self.is_active
        }

class Hotel(db.Model):
    __tablename__ = 'hotels'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    rating = db.Column(db.Float, default=0)
    description = db.Column(db.Text)
    category = db.Column(db.String(50))
    vibe = db.Column(db.String(100))
    image = db.Column(db.String(200))
    amenities = db.Column(db.Text)
    highlights = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'price': self.price,
            'rating': self.rating,
            'description': self.description,
            'category': self.category,
            'vibe': self.vibe,
            'image': self.image,
            'amenities': self.amenities.split(',') if self.amenities else [],
            'highlights': self.highlights.split(',') if self.highlights else [],
            'isActive': self.is_active
        }

class Tour(db.Model):
    __tablename__ = 'tours'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float, nullable=False)
    duration = db.Column(db.String(50))
    rating = db.Column(db.Float, default=0)
    description = db.Column(db.Text)
    includes = db.Column(db.String(200))
    badge = db.Column(db.String(50))
    badge_color = db.Column(db.String(50), default='bg-green-500')
    image = db.Column(db.String(200))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'price': self.price,
            'duration': self.duration,
            'rating': self.rating,
            'description': self.description,
            'includes': self.includes,
            'badge': self.badge,
            'badgeColor': self.badge_color,
            'image': self.image,
            'isActive': self.is_active
        }
