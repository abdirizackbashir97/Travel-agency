from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from config import config
import os

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
bcrypt = Bcrypt()
cors = CORS()
mail = Mail()

def create_app(config_name='default'):
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
    
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    bcrypt.init_app(app)
    cors.init_app(app, origins=app.config['CORS_ORIGINS'])
    mail.init_app(app)
    
    # Register blueprints
    from app.api.auth import auth_bp
    from app.api.bookings import bookings_bp
    from app.api.destinations import destinations_bp
    from app.api.flights import flights_bp
    from app.api.hotels import hotels_bp
    from app.api.tours import tours_bp
    from app.api.users import users_bp
    from app.api.payments import payments_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(bookings_bp, url_prefix='/api/bookings')
    app.register_blueprint(destinations_bp, url_prefix='/api/destinations')
    app.register_blueprint(flights_bp, url_prefix='/api/flights')
    app.register_blueprint(hotels_bp, url_prefix='/api/hotels')
    app.register_blueprint(tours_bp, url_prefix='/api/tours')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(payments_bp, url_prefix='/api/payments')
    
    @app.route('/')
    def index():
        return {
            'message': 'Welcome to Travel Agency API',
            'version': '1.0.0',
            'status': 'running',
            'endpoints': {
                'auth': '/api/auth',
                'destinations': '/api/destinations',
                'flights': '/api/flights',
                'hotels': '/api/hotels',
                'tours': '/api/tours',
                'bookings': '/api/bookings',
                'users': '/api/users',
                'payments': '/api/payments'
            }
        }
    
    @app.route('/health')
    def health():
        return {
            'status': 'healthy',
            'message': 'API is running',
            'database': 'connected' if db.engine else 'disconnected'
        }
    
    @app.errorhandler(404)
    def not_found(error):
        return {'message': 'Resource not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {'message': 'Internal server error'}, 500
    
    return app
