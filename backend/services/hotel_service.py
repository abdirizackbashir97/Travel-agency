import sqlite3
from config.database import get_db_connection, dict_factory

class HotelService:
    def __init__(self):
        self.create_hotel_table()

    def create_hotel_table(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        # Ensure is_active column exists
        cursor.execute("PRAGMA table_info(hotels)")
        columns = [row[1] for row in cursor.fetchall()]
        if 'is_active' not in columns:
            cursor.execute("ALTER TABLE hotels ADD COLUMN is_active INTEGER DEFAULT 1")
            conn.commit()
        conn.close()

    def get_all_hotels(self):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, hotel_name, location, country, category, rating, reviews,
                   price_per_night, description, amenities, highlights, tagline,
                   is_active
            FROM hotels
            ORDER BY rating DESC
        ''')
        return cursor.fetchall()

    def get_hotel_by_id(self, hotel_id):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, hotel_name, location, country, category, rating, reviews,
                   price_per_night, description, amenities, highlights, tagline,
                   is_active
            FROM hotels WHERE id = ?
        ''', (hotel_id,))
        return cursor.fetchone()

    def create_hotel(self, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO hotels (
                hotel_name, location, country, category, rating, reviews,
                price_per_night, description, amenities, highlights, tagline,
                is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['hotel_name'], data['location'], data['country'], data['category'],
            data['rating'], data['reviews'], data['price_per_night'],
            data['description'], data['amenities'], data['highlights'],
            data['tagline'], data.get('is_active', 1)
        ))
        hotel_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return self.get_hotel_by_id(hotel_id)

    def update_hotel(self, hotel_id, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        updates = []
        values = []
        allowed = [
            'hotel_name', 'location', 'country', 'category', 'rating', 'reviews',
            'price_per_night', 'description', 'amenities', 'highlights', 'tagline',
            'is_active'
        ]
        for field in allowed:
            if field in data:
                updates.append(f"{field} = ?")
                values.append(data[field])
        if not updates:
            conn.close()
            return {'success': False, 'message': 'No fields to update'}
        values.append(hotel_id)
        query = f"UPDATE hotels SET {', '.join(updates)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()
        conn.close()
        return {'success': True, 'message': 'Hotel updated successfully'}

    def delete_hotel(self, hotel_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM hotels WHERE id = ?", (hotel_id,))
        conn.commit()
        conn.close()
        return {'success': True, 'message': 'Hotel deleted successfully'}
