import sqlite3
from config.database import get_db_connection, dict_factory

class ReviewService:
    def __init__(self):
        pass

    def get_all_reviews(self):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT 
                r.id, 
                r.user_id,
                u.first_name || ' ' || u.second_name AS user_name,
                r.item_type,
                r.item_id,
                r.item_name,
                r.rating,
                r.comment,
                r.created_at AS date
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            ORDER BY r.created_at DESC
        ''')
        return cursor.fetchall()

    def get_review_by_id(self, review_id):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT 
                r.id, 
                r.user_id,
                u.first_name || ' ' || u.second_name AS user_name,
                r.item_type,
                r.item_id,
                r.item_name,
                r.rating,
                r.comment,
                r.created_at AS date
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE r.id = ?
        ''', (review_id,))
        return cursor.fetchone()

    def create_review(self, data):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO reviews (user_id, item_type, item_id, item_name, rating, comment)
            VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            data['user_id'],
            data['item_type'],
            data['item_id'],
            data['item_name'],
            data['rating'],
            data.get('comment', '')
        ))
        review_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return self.get_review_by_id(review_id)

    def delete_review(self, review_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM reviews WHERE id = ?", (review_id,))
        conn.commit()
        conn.close()
        return {'success': True, 'message': 'Review deleted'}

    def get_reviews_by_item(self, item_type, item_id):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT 
                r.id, 
                r.user_id,
                u.first_name || ' ' || u.second_name AS user_name,
                r.item_type,
                r.item_id,
                r.item_name,
                r.rating,
                r.comment,
                r.created_at AS date
            FROM reviews r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE r.item_type = ? AND r.item_id = ?
            ORDER BY r.created_at DESC
        ''', (item_type, item_id))
        return cursor.fetchall()
