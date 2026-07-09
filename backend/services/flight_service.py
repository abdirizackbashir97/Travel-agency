import sqlite3
from datetime import datetime
from config.database import get_db_connection, dict_factory

class FlightService:
    def __init__(self):
        pass
    
    def get_all_flights(self):
        """Get all flights"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, airline, flight_number, departure_airport, departure_city, 
                   departure_time, arrival_airport, arrival_city, arrival_time, 
                   duration, flight_type, baggage_allowance, travel_date, price
            FROM flights 
            ORDER BY travel_date ASC, departure_time ASC
        ''')
        flights = cursor.fetchall()
        conn.close()
        
        return flights
    
    def get_flight_by_id(self, flight_id):
        """Get a flight by ID"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, airline, flight_number, departure_airport, departure_city, 
                   departure_time, arrival_airport, arrival_city, arrival_time, 
                   duration, flight_type, baggage_allowance, travel_date, price
            FROM flights 
            WHERE id = ?
        ''', (flight_id,))
        flight = cursor.fetchone()
        conn.close()
        
        return flight
    
    def search_flights(self, origin=None, destination=None, date=None):
        """Search flights by origin, destination, and date"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        query = '''
            SELECT id, airline, flight_number, departure_airport, departure_city, 
                   departure_time, arrival_airport, arrival_city, arrival_time, 
                   duration, flight_type, baggage_allowance, travel_date, price
            FROM flights 
            WHERE 1=1
        '''
        params = []
        
        if origin:
            query += " AND (departure_airport = ? OR departure_city = ?)"
            params.extend([origin, origin])
        if destination:
            query += " AND (arrival_airport = ? OR arrival_city = ?)"
            params.extend([destination, destination])
        if date:
            query += " AND travel_date = ?"
            params.append(date)
        
        query += " ORDER BY price ASC"
        
        cursor.execute(query, params)
        flights = cursor.fetchall()
        conn.close()
        
        return flights
    
    def get_flights_by_origin(self, origin):
        """Get flights by origin city or airport"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, airline, flight_number, departure_airport, departure_city, 
                   departure_time, arrival_airport, arrival_city, arrival_time, 
                   duration, flight_type, baggage_allowance, travel_date, price
            FROM flights 
            WHERE departure_airport = ? OR departure_city = ?
            ORDER BY price ASC
        ''', (origin, origin))
        flights = cursor.fetchall()
        conn.close()
        
        return flights
    
    def get_flights_by_destination(self, destination):
        """Get flights by destination city or airport"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, airline, flight_number, departure_airport, departure_city, 
                   departure_time, arrival_airport, arrival_city, arrival_time, 
                   duration, flight_type, baggage_allowance, travel_date, price
            FROM flights 
            WHERE arrival_airport = ? OR arrival_city = ?
            ORDER BY price ASC
        ''', (destination, destination))
        flights = cursor.fetchall()
        conn.close()
        
        return flights
    
    def get_flights_by_date(self, date):
        """Get flights by travel date"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, airline, flight_number, departure_airport, departure_city, 
                   departure_time, arrival_airport, arrival_city, arrival_time, 
                   duration, flight_type, baggage_allowance, travel_date, price
            FROM flights 
            WHERE travel_date = ?
            ORDER BY departure_time ASC
        ''', (date,))
        flights = cursor.fetchall()
        conn.close()
        
        return flights
    
    def get_flights_by_type(self, flight_type):
        """Get flights by type (Domestic, International, etc.)"""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT id, airline, flight_number, departure_airport, departure_city, 
                   departure_time, arrival_airport, arrival_city, arrival_time, 
                   duration, flight_type, baggage_allowance, travel_date, price
            FROM flights 
            WHERE flight_type = ?
            ORDER BY price ASC
        ''', (flight_type,))
        flights = cursor.fetchall()
        conn.close()
        
        return flights
