import sqlite3
from datetime import datetime
from config.database import get_db_connection, dict_factory

class BookingService:
    def __init__(self):
        pass
    
    def create_booking(self, user_id, booking_type, booking_item, travel_date, 
                       total_price, number_of_people=1, return_date=None, 
                       payment_method=None, special_requests=None, phone_number=None, image_url=None):
        """Create a new booking"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        booking_date = datetime.now().strftime('%Y-%m-%d')
        
        cursor.execute('''
            INSERT INTO bookings 
            (user_id, booking_type, booking_item, booking_date, travel_date, 
             return_date, number_of_people, total_price, payment_method, 
             payment_status, booking_status, special_requests, phone_number, image_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (user_id, booking_type, booking_item, booking_date, travel_date,
              return_date, number_of_people, total_price, payment_method,
              'pending', 'confirmed', special_requests, phone_number, image_url))
        
        booking_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return self.get_booking_by_id(booking_id)
    
    def get_all_bookings(self):
        """Get all bookings"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT b.*, u.first_name, u.second_name, u.email
            FROM bookings b
            LEFT JOIN users u ON b.user_id = u.id
            ORDER BY b.created_at DESC
        ''')
        bookings = cursor.fetchall()
        conn.close()
        
        return bookings
    
    def get_booking_by_id(self, booking_id):
        """Get a booking by ID"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT b.*, u.first_name, u.second_name, u.email
            FROM bookings b
            LEFT JOIN users u ON b.user_id = u.id
            WHERE b.id = ?
        ''', (booking_id,))
        booking = cursor.fetchone()
        conn.close()
        
        return booking
    
    def get_user_bookings(self, user_id):
        """Get all bookings for a specific user"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT b.*, u.first_name, u.second_name, u.email
            FROM bookings b
            LEFT JOIN users u ON b.user_id = u.id
            WHERE b.user_id = ?
            ORDER BY b.created_at DESC
        ''', (user_id,))
        bookings = cursor.fetchall()
        conn.close()
        
        return bookings
    
    def get_bookings_by_type(self, booking_type):
        """Get bookings by type"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT b.*, u.first_name, u.second_name, u.email
            FROM bookings b
            LEFT JOIN users u ON b.user_id = u.id
            WHERE b.booking_type = ?
            ORDER BY b.created_at DESC
        ''', (booking_type,))
        bookings = cursor.fetchall()
        conn.close()
        
        return bookings
    
    def get_bookings_by_status(self, booking_status):
        """Get bookings by status"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT b.*, u.first_name, u.second_name, u.email
            FROM bookings b
            LEFT JOIN users u ON b.user_id = u.id
            WHERE b.booking_status = ?
            ORDER BY b.created_at DESC
        ''', (booking_status,))
        bookings = cursor.fetchall()
        conn.close()
        
        return bookings
    
    def update_booking_status(self, booking_id, booking_status):
        """Update booking status"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE bookings 
            SET booking_status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (booking_status, booking_id))
        conn.commit()
        conn.close()
        
        return {'success': True, 'message': 'Booking status updated successfully'}
    
    def update_payment_status(self, booking_id, payment_status):
        """Update payment status"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE bookings 
            SET payment_status = ?, updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (payment_status, booking_id))
        conn.commit()
        conn.close()
        
        return {'success': True, 'message': 'Payment status updated successfully'}
    
    def update_booking(self, booking_id, data):
        """Update booking details"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        updates = []
        values = []
        
        if 'booking_item' in data:
            updates.append('booking_item = ?')
            values.append(data['booking_item'])
        if 'travel_date' in data:
            updates.append('travel_date = ?')
            values.append(data['travel_date'])
        if 'return_date' in data:
            updates.append('return_date = ?')
            values.append(data['return_date'])
        if 'number_of_people' in data:
            updates.append('number_of_people = ?')
            values.append(data['number_of_people'])
        if 'total_price' in data:
            updates.append('total_price = ?')
            values.append(data['total_price'])
        if 'payment_method' in data:
            updates.append('payment_method = ?')
            values.append(data['payment_method'])
        if 'special_requests' in data:
            updates.append('special_requests = ?')
            values.append(data['special_requests'])
        if 'phone_number' in data:
            updates.append('phone_number = ?')
            values.append(data['phone_number'])
        if 'image_url' in data:
            updates.append('image_url = ?')
            values.append(data['image_url'])
        
        if not updates:
            conn.close()
            return {'success': False, 'message': 'No fields to update'}
        
        updates.append('updated_at = CURRENT_TIMESTAMP')
        values.append(booking_id)
        
        query = f"UPDATE bookings SET {', '.join(updates)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()
        conn.close()
        
        return {'success': True, 'message': 'Booking updated successfully'}
    
    def cancel_booking(self, booking_id):
        """Cancel a booking"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            UPDATE bookings 
            SET booking_status = 'cancelled', updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (booking_id,))
        conn.commit()
        conn.close()
        
        return {'success': True, 'message': 'Booking cancelled successfully'}
    
    def get_booking_stats(self):
        """Get booking statistics"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT 
                COUNT(*) as total_bookings,
                SUM(CASE WHEN booking_status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
                SUM(CASE WHEN booking_status = 'completed' THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN booking_status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
                SUM(CASE WHEN payment_status = 'paid' THEN 1 ELSE 0 END) as paid,
                SUM(CASE WHEN payment_status = 'pending' THEN 1 ELSE 0 END) as pending_payments,
                SUM(total_price) as total_revenue,
                SUM(CASE WHEN payment_status = 'paid' THEN total_price ELSE 0 END) as paid_revenue
            FROM bookings
        ''')
        stats = cursor.fetchone()
        conn.close()
        
        return stats
    
    def delete_booking(self, booking_id):
        """Delete a booking"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM bookings WHERE id = ?', (booking_id,))
        conn.commit()
        conn.close()
        
        return {'success': True, 'message': 'Booking deleted successfully'}
