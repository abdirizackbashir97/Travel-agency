import sqlite3
from config.database import get_db_connection, dict_factory

class FlightService:
    def __init__(self):
        self.create_flight_table()

    def create_flight_table(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("PRAGMA table_info(flights)")
        columns = [row[1] for row in cursor.fetchall()]
        if 'is_active' not in columns:
            cursor.execute("ALTER TABLE flights ADD COLUMN is_active INTEGER DEFAULT 1")
            conn.commit()
        conn.close()

    def get_all_flights(self):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, airline, flight_number, departure_airport, departure_city,
                   departure_time, arrival_airport, arrival_city, arrival_time,
                   duration, flight_type, baggage_allowance, travel_date, price,
                   is_active
            FROM flights
            ORDER BY travel_date ASC, departure_time ASC
        ''')
        return cursor.fetchall()

    def get_flight_by_id(self, flight_id):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, airline, flight_number, departure_airport, departure_city,
                   departure_time, arrival_airport, arrival_city, arrival_time,
                   duration, flight_type, baggage_allowance, travel_date, price,
                   is_active
            FROM flights WHERE id = ?
        ''', (flight_id,))
        return cursor.fetchone()

    def create_flight(self, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO flights (
                airline, flight_number, departure_airport, departure_city,
                departure_time, arrival_airport, arrival_city, arrival_time,
                duration, flight_type, baggage_allowance, travel_date, price,
                is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['airline'], data['flight_number'], data['departure_airport'],
            data['departure_city'], data['departure_time'], data['arrival_airport'],
            data['arrival_city'], data['arrival_time'], data['duration'],
            data['flight_type'], data['baggage_allowance'], data['travel_date'],
            data['price'], data.get('is_active', 1)
        ))
        flight_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return self.get_flight_by_id(flight_id)

    def update_flight(self, flight_id, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        updates = []
        values = []
        allowed = ['airline', 'flight_number', 'departure_airport', 'departure_city',
                   'departure_time', 'arrival_airport', 'arrival_city', 'arrival_time',
                   'duration', 'flight_type', 'baggage_allowance', 'travel_date', 'price',
                   'is_active']
        for field in allowed:
            if field in data:
                updates.append(f"{field} = ?")
                values.append(data[field])
        if not updates:
            conn.close()
            return {'success': False, 'message': 'No fields to update'}
        values.append(flight_id)
        query = f"UPDATE flights SET {', '.join(updates)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()
        conn.close()
        return {'success': True, 'message': 'Flight updated successfully'}

    def delete_flight(self, flight_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM flights WHERE id = ?", (flight_id,))
        conn.commit()
        conn.close()
        return {'success': True, 'message': 'Flight deleted successfully'}

    def search_flights(self, origin=None, destination=None, date=None):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        query = '''
            SELECT id, airline, flight_number, departure_airport, departure_city,
                   departure_time, arrival_airport, arrival_city, arrival_time,
                   duration, flight_type, baggage_allowance, travel_date, price,
                   is_active
            FROM flights WHERE 1=1
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
        return cursor.fetchall()
