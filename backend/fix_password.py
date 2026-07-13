import sqlite3
import bcrypt

# Connect to database
conn = sqlite3.connect('database/database.db')
cursor = conn.cursor()

# Hash the password "123456" using bcrypt
password = "123456"
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()

# Update admin user (id=1) password
cursor.execute("UPDATE users SET password = ? WHERE id = 1", (hashed,))
conn.commit()
conn.close()

print("✅ Admin password updated to bcrypt hash of '123456'")
print(f"New hash: {hashed}")
