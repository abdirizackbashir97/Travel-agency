import sqlite3
import requests
import base64
import json
from datetime import datetime
from config.database import get_db_connection, dict_factory

class MpesaService:
    def __init__(self):
        # ... (your existing init code) ...
        pass

    def get_transactions(self):
        """Fetch transactions with user names from users table."""
        conn = get_db_connection()
        conn.row_factory = dict_factory
        cursor = conn.cursor()
        cursor.execute('''
            SELECT 
                t.id,
                t.phone_number,
                t.amount,
                t.status,
                t.user_id,
                t.created_at,
                u.first_name || ' ' || u.second_name AS user_name
            FROM transactions t
            LEFT JOIN users u ON t.user_id = u.id
            ORDER BY t.created_at DESC
            LIMIT 10
        ''')
        transactions = cursor.fetchall()
        conn.close()
        return transactions

    # ... other methods (initiate_payment, query_status, etc.) ...
