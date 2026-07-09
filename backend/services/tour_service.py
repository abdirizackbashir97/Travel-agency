import sqlite3
from datetime import datetime
from config.database import get_db_connection, dict_factory

class TourService:
    def __init__(self):
        pass
    
    def get_all_tours(self):
        """Get all tours"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, tour_name, location, country, rating, duration_days, 
                   price_per_person, description
            FROM tours 
            ORDER BY rating DESC
        ''')
        tours = cursor.fetchall()
        conn.close()
        
        return tours
    
    def get_tour_by_id(self, tour_id):
        """Get a tour by ID"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, tour_name, location, country, rating, duration_days, 
                   price_per_person, description
            FROM tours 
            WHERE id = ?
        ''', (tour_id,))
        tour = cursor.fetchone()
        conn.close()
        
        return tour
    
    def search_tours(self, query):
        """Search tours by name, location, or country"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        search_term = f"%{query}%"
        cursor.execute('''
            SELECT id, tour_name, location, country, rating, duration_days, 
                   price_per_person, description
            FROM tours 
            WHERE tour_name LIKE ? OR location LIKE ? OR country LIKE ? OR description LIKE ?
            ORDER BY rating DESC
        ''', (search_term, search_term, search_term, search_term))
        tours = cursor.fetchall()
        conn.close()
        
        return tours
    
    def get_tours_by_country(self, country):
        """Get tours by country"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, tour_name, location, country, rating, duration_days, 
                   price_per_person, description
            FROM tours 
            WHERE country = ?
            ORDER BY rating DESC
        ''', (country,))
        tours = cursor.fetchall()
        conn.close()
        
        return tours
    
    def get_tours_by_location(self, location):
        """Get tours by location"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, tour_name, location, country, rating, duration_days, 
                   price_per_person, description
            FROM tours 
            WHERE location = ?
            ORDER BY rating DESC
        ''', (location,))
        tours = cursor.fetchall()
        conn.close()
        
        return tours
    
    def get_top_tours(self, limit=5):
        """Get top rated tours"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, tour_name, location, country, rating, duration_days, 
                   price_per_person, description
            FROM tours 
            ORDER BY rating DESC
            LIMIT ?
        ''', (limit,))
        tours = cursor.fetchall()
        conn.close()
        
        return tours
