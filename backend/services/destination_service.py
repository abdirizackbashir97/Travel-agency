import sqlite3
from datetime import datetime
from config.database import get_db_connection, dict_factory

class DestinationService:
    def __init__(self):
        pass
    
    def create_destination(self, name, country, category, rating, reviews, 
                           price_per_night, description, attractions, best_time, city):
        """Create a new destination"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO destinations 
            (name, country, category, rating, reviews, price_per_night, 
             description, attractions, best_time, city)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (name, country, category, rating, reviews, price_per_night, 
              description, attractions, best_time, city))
        
        destination_id = cursor.lastrowid
        conn.commit()
        conn.close()
        
        return self.get_destination_by_id(destination_id)
    
    def get_all_destinations(self):
        """Get all destinations"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, country, category, rating, reviews, price_per_night, 
                   description, attractions, best_time, city
            FROM destinations 
            ORDER BY rating DESC
        ''')
        destinations = cursor.fetchall()
        conn.close()
        
        return destinations
    
    def get_destination_by_id(self, destination_id):
        """Get a destination by ID"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, country, category, rating, reviews, price_per_night, 
                   description, attractions, best_time, city
            FROM destinations 
            WHERE id = ?
        ''', (destination_id,))
        destination = cursor.fetchone()
        conn.close()
        
        return destination
    
    def get_destinations_by_country(self, country):
        """Get destinations by country"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, country, category, rating, reviews, price_per_night, 
                   description, attractions, best_time, city
            FROM destinations 
            WHERE country = ?
            ORDER BY rating DESC
        ''', (country,))
        destinations = cursor.fetchall()
        conn.close()
        
        return destinations
    
    def get_destinations_by_category(self, category):
        """Get destinations by category"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, country, category, rating, reviews, price_per_night, 
                   description, attractions, best_time, city
            FROM destinations 
            WHERE category = ?
            ORDER BY rating DESC
        ''', (category,))
        destinations = cursor.fetchall()
        conn.close()
        
        return destinations
    
    def search_destinations(self, query):
        """Search destinations by name, country, city, or category"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        search_term = f"%{query}%"
        cursor.execute('''
            SELECT id, name, country, category, rating, reviews, price_per_night, 
                   description, attractions, best_time, city
            FROM destinations 
            WHERE name LIKE ? OR country LIKE ? OR city LIKE ? OR category LIKE ?
            ORDER BY rating DESC
        ''', (search_term, search_term, search_term, search_term))
        destinations = cursor.fetchall()
        conn.close()
        
        return destinations
    
    def update_destination(self, destination_id, data):
        """Update a destination"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        updates = []
        values = []
        
        if 'name' in data:
            updates.append('name = ?')
            values.append(data['name'])
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
        if 'attractions' in data:
            updates.append('attractions = ?')
            values.append(data['attractions'])
        if 'best_time' in data:
            updates.append('best_time = ?')
            values.append(data['best_time'])
        if 'city' in data:
            updates.append('city = ?')
            values.append(data['city'])
        
        if not updates:
            conn.close()
            return {'success': False, 'message': 'No fields to update'}
        
        values.append(destination_id)
        
        query = f"UPDATE destinations SET {', '.join(updates)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()
        conn.close()
        
        return {'success': True, 'message': 'Destination updated successfully'}
    
    def delete_destination(self, destination_id):
        """Delete a destination"""
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute('DELETE FROM destinations WHERE id = ?', (destination_id,))
        conn.commit()
        conn.close()
        
        return {'success': True, 'message': 'Destination deleted successfully'}
    
    def get_top_destinations(self, limit=5):
        """Get top rated destinations"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, name, country, category, rating, reviews, price_per_night, 
                   description, attractions, best_time, city
            FROM destinations 
            ORDER BY rating DESC, reviews DESC
            LIMIT ?
        ''', (limit,))
        destinations = cursor.fetchall()
        conn.close()
        
        return destinations
