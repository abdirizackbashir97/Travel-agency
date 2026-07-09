import sqlite3
from datetime import datetime
from config.database import get_db_connection, dict_factory

class HotelService:
    def __init__(self):
        pass
    
    def create_hotel(self, hotel_name, location, country, category, rating, reviews, 
                     price_per_night, description, amenities, highlights, tagline):
        """Create a new hotel"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO hotels 
            (hotel_name, location, country, category, rating, reviews, 
             price_per_night, description, amenities, highlights, tagline)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (hotel_name, location, country, category, rating, reviews, 
              price_per_night, description, amenities, highlights, tagline))
        
        hotel_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return self.get_hotel_by_id(hotel_id)
    
    def get_all_hotels(self):
        """Get all hotels"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, hotel_name, location, country, category, rating, reviews, 
                   price_per_night, description, amenities, highlights, tagline
            FROM hotels 
            ORDER BY rating DESC
        ''')
        hotels = cursor.fetchall()
        conn.close()
        
        return hotels
    
    def get_hotel_by_id(self, hotel_id):
        """Get a hotel by ID"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, hotel_name, location, country, category, rating, reviews, 
                   price_per_night, description, amenities, highlights, tagline
            FROM hotels 
            WHERE id = ?
        ''', (hotel_id,))
        hotel = cursor.fetchone()
        conn.close()
        
        return hotel
    
    def get_hotels_by_country(self, country):
        """Get hotels by country"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, hotel_name, location, country, category, rating, reviews, 
                   price_per_night, description, amenities, highlights, tagline
            FROM hotels 
            WHERE country = ?
            ORDER BY rating DESC
        ''', (country,))
        hotels = cursor.fetchall()
        conn.close()
        
        return hotels
    
    def get_hotels_by_category(self, category):
        """Get hotels by category"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, hotel_name, location, country, category, rating, reviews, 
                   price_per_night, description, amenities, highlights, tagline
            FROM hotels 
            WHERE category = ?
            ORDER BY rating DESC
        ''', (category,))
        hotels = cursor.fetchall()
        conn.close()
        
        return hotels
    
    def search_hotels(self, query):
        """Search hotels by name, location, or country"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        search_term = f"%{query}%"
        cursor.execute('''
            SELECT id, hotel_name, location, country, category, rating, reviews, 
                   price_per_night, description, amenities, highlights, tagline
            FROM hotels 
            WHERE hotel_name LIKE ? OR location LIKE ? OR country LIKE ? OR description LIKE ?
            ORDER BY rating DESC
        ''', (search_term, search_term, search_term, search_term))
        hotels = cursor.fetchall()
        conn.close()
        
        return hotels
    
    def update_hotel(self, hotel_id, data):
        """Update a hotel"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        updates = []
        values = []
        
        if 'hotel_name' in data:
            updates.append('hotel_name = ?')
            values.append(data['hotel_name'])
        if 'location' in data:
            updates.append('location = ?')
            values.append(data['location'])
        if 'country' in data:
            updates.append('country = ?')
            values.append(data['country'])
        if 'category' in data:
            updates.append('category = ?')
            values.append(data['category'])
        if 'rating' in data:
            updates.append('rating = ?')
            values.append(data['rating'])
        if 'reviews' in data:
            updates.append('reviews = ?')
            values.append(data['reviews'])
        if 'price_per_night' in data:
            updates.append('price_per_night = ?')
            values.append(data['price_per_night'])
        if 'description' in data:
            updates.append('description = ?')
            values.append(data['description'])
        if 'amenities' in data:
            updates.append('amenities = ?')
            values.append(data['amenities'])
        if 'highlights' in data:
            updates.append('highlights = ?')
            values.append(data['highlights'])
        if 'tagline' in data:
            updates.append('tagline = ?')
            values.append(data['tagline'])
        
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
        """Delete a hotel"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM hotels WHERE id = ?', (hotel_id,))
        conn.commit()
        conn.close()
        
        return {'success': True, 'message': 'Hotel deleted successfully'}
    
    def get_top_hotels(self, limit=5):
        """Get top rated hotels"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, hotel_name, location, country, category, rating, reviews, 
                   price_per_night, description, amenities, highlights, tagline
            FROM hotels 
            ORDER BY rating DESC, reviews DESC
            LIMIT ?
        ''', (limit,))
        hotels = cursor.fetchall()
        conn.close()
        
        return hotels
