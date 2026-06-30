from app import create_app
from app.models import db
import os

app = create_app(os.environ.get('FLASK_ENV') or 'default')

with app.app_context():
    db.create_all()
    print("✅ Database tables created successfully!")

if __name__ == '__main__':
    print("🚀 Starting Travel Agency Backend Server...")
    print("📍 Server running at: http://localhost:5002")
    print("📚 API Documentation: http://localhost:5002")
    print("🔧 Debug mode: ON")
    print("-" * 50)
    
    app.run(
        host='0.0.0.0',
        port=5002,  # Changed to 5002
        debug=True
    )
