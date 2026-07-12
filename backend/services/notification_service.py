import sqlite3
from datetime import datetime
from config.database import get_db_connection, dict_factory

class NotificationService:
    def __init__(self):
        pass

    def create_notification(self, user_id, title, message, type='booking', booking_id=None):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO notifications (user_id, title, message, type, booking_id)
            VALUES (?, ?, ?, ?, ?)
        ''', (user_id, title, message, type, booking_id))
        notif_id = cursor.lastrowid
        conn.commit()
        conn.close()
        return self.get_notification_by_id(notif_id)

    def get_notifications(self, limit=20):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT n.*, u.first_name || ' ' || u.second_name AS user_name
            FROM notifications n
            LEFT JOIN users u ON n.user_id = u.id
            ORDER BY n.created_at DESC
            LIMIT ?
        ''', (limit,))
        notifications = cursor.fetchall()
        conn.close()
        return notifications

    def get_unread_count(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT COUNT(*) FROM notifications WHERE is_read = 0')
        count = cursor.fetchone()[0]
        conn.close()
        return count

    def mark_as_read(self, notif_id):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('UPDATE notifications SET is_read = 1 WHERE id = ?', (notif_id,))
        conn.commit()
        conn.close()
        return {'success': True}

    def mark_all_as_read(self):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('UPDATE notifications SET is_read = 1')
        conn.commit()
        conn.close()
        return {'success': True}

    def get_notification_by_id(self, notif_id):
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM notifications WHERE id = ?', (notif_id,))
        notif = cursor.fetchone()
        conn.close()
        return notif
