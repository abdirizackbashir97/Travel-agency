from app import create_app, db
from app.models import User, Booking, Payment, Notification, Destination, Flight, Hotel, Tour
from sqlalchemy import inspect

# Create app context
app = create_app()
with app.app_context():
    # Drop all tables (if they exist)
    db.drop_all()
    
    # Create all tables
    db.create_all()
    
    print("✅ Database tables created successfully!")
    
    # Get table names using inspector
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    print("📊 Tables created:")
    for table in tables:
        print(f"  - {table}")
    
    # Create admin user
    admin = User(
        first_name='Admin',
        last_name='User',
        email='admin@travelagency.com',
        role='admin',
        phone='+254 700 123 456',
        location='Nairobi, Kenya'
    )
    admin.set_password('admin123')
    db.session.add(admin)
    db.session.commit()
    print(f"✅ Admin user created: {admin.email}")
    
    # Create a test user
    user = User(
        first_name='Test',
        last_name='User',
        email='test@example.com',
        role='user',
        phone='+254 712 345 678',
        location='Mombasa, Kenya'
    )
    user.set_password('test123')
    db.session.add(user)
    db.session.commit()
    print(f"✅ Test user created: {user.email}")
    
    print("\n🎉 Database setup complete!")
    print("📧 Admin: admin@travelagency.com / admin123")
    print("📧 Test User: test@example.com / test123")
