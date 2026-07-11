import sqlite3
from config.database import get_db_connection, dict_factory

class TourService:
    def __init__(self):
        self.create_tour_table()

    def create_tour_table(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("PRAGMA table_info(tours)")
        columns = [row[1] for row in cursor.fetchall()]
        if 'is_active' not in columns:
            cursor.execute("ALTER TABLE tours ADD COLUMN is_active INTEGER DEFAULT 1")
            conn.commit()
        conn.close()

    def get_all_tours(self):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, tour_name, location, country, rating, duration_days,
                   price_per_person, description, is_active
            FROM tours
            ORDER BY rating DESC
        ''')
        return cursor.fetchall()

    def get_tour_by_id(self, tour_id):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, tour_name, location, country, rating, duration_days,
                   price_per_person, description, is_active
            FROM tours WHERE id = ?
        ''', (tour_id,))
        return cursor.fetchone()

    def create_tour(self, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO tours (
                tour_name, location, country, rating, duration_days,
                price_per_person, description, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['tour_name'], data['location'], data['country'],
            data['rating'], data['duration_days'], data['price_per_person'],
            data['description'], data.get('is_active', 1)
        ))
        tour_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return self.get_tour_by_id(tour_id)

    def update_tour(self, tour_id, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        updates = []
        values = []
        allowed = ['tour_name', 'location', 'country', 'rating', 'duration_days',
                   'price_per_person', 'description', 'is_active']
        for field in allowed:
            if field in data:
                updates.append(f"{field} = ?")
                values.append(data[field])
        if not updates:
            conn.close()
            return {'success': False, 'message': 'No fields to update'}
        values.append(tour_id)
        query = f"UPDATE tours SET {', '.join(updates)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()
        conn.close()
        return {'success': True, 'message': 'Tour updated'}

    def delete_tour(self, tour_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM tours WHERE id = ?", (tour_id,))
        conn.commit()
        conn.close()
        return {'success': True, 'message': 'Tour deleted'}
