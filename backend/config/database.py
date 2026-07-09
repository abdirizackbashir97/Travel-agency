import sqlite3
import json
from datetime import datetime
import os

# Database path - point to the database folder
DATABASE_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'database', 'database.db')

def get_db_connection():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            merchant_request_id TEXT NOT NULL,
            checkout_request_id TEXT NOT NULL UNIQUE,
            phone_number TEXT NOT NULL,
            amount REAL NOT NULL,
            account_reference TEXT NOT NULL,
            booking_details TEXT,
            status TEXT DEFAULT 'pending',
            result_code TEXT,
            result_desc TEXT,
            receipt_number TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Create users table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            full_name TEXT,
            phone_number TEXT,
            is_active INTEGER DEFAULT 1,
            is_admin INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    conn.commit()
    conn.close()
    print("✅ Database initialized successfully")
    print(f"📁 Database location: {DATABASE_PATH}")

def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d
