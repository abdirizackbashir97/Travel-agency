import sqlite3
from config.database import get_db_connection, dict_factory

class DestinationService:
    def __init__(self):
        self.create_destination_table()

    def create_destination_table(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("PRAGMA table_info(destinations)")
        columns = [row[1] for row in cursor.fetchall()]
        if 'is_active' not in columns:
            cursor.execute("ALTER TABLE destinations ADD COLUMN is_active INTEGER DEFAULT 1")
            conn.commit()
        conn.close()

    def get_all_destinations(self):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, name, country, category, rating, reviews,
                   price_per_night, description, attractions, best_time, city,
                   is_active
            FROM destinations
            ORDER BY rating DESC
        ''')
        return cursor.fetchall()

    def get_destination_by_id(self, dest_id):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, name, country, category, rating, reviews,
                   price_per_night, description, attractions, best_time, city,
                   is_active
            FROM destinations WHERE id = ?
        ''', (dest_id,))
        return cursor.fetchone()

    def create_destination(self, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO destinations (
                name, country, category, rating, reviews,
                price_per_night, description, attractions, best_time, city,
                is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            data['name'], data['country'], data['category'],
            data['rating'], data['reviews'], data['price_per_night'],
            data['description'], data['attractions'], data['best_time'],
            data['city'], data.get('is_active', 1)
        ))
        dest_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return self.get_destination_by_id(dest_id)

    def update_destination(self, dest_id, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        updates = []
        values = []
        allowed = ['name', 'country', 'category', 'rating', 'reviews',
                   'price_per_night', 'description', 'attractions', 'best_time', 'city',
                   'is_active']
        for field in allowed:
            if field in data:
                updates.append(f"{field} = ?")
                values.append(data[field])
        if not updates:
            conn.close()
            return {'success': False, 'message': 'No fields to update'}
        values.append(dest_id)
        query = f"UPDATE destinations SET {', '.join(updates)} WHERE id = ?"
        cursor.execute(query, values)
        conn.commit()
        conn.close()
        return {'success': True, 'message': 'Destination updated'}

    def delete_destination(self, dest_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM destinations WHERE id = ?", (dest_id,))
        conn.commit()
        conn.close()
        return {'success': True, 'message': 'Destination deleted'}
