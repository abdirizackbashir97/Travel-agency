import sqlite3
import bcrypt

# Map each user ID to a unique 4‑digit password
# You can change these numbers as you like
passwords = {
    1: "1234",   # Admin
    2: "2345",   # Halima
    3: "3456",   # Abdirizack
    4: "4567",   # Fatuma
    5: "5678",   # Amina
    6: "6789",   # Safia
    7: "7890",   # Yahye
    8: "8901",   # Farhiya
    9: "9012",   # Halimo
}

conn = sqlite3.connect('database/database.db')
cursor = conn.cursor()

for uid, pwd in passwords.items():
    # Hash the 4‑digit code using bcrypt
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(pwd.encode('utf-8'), salt).decode('utf-8')
    cursor.execute("UPDATE users SET password = ? WHERE id = ?", (hashed, uid))
    print(f"User ID {uid} → password: {pwd}")

conn.commit()
conn.close()
print("\n✅ All passwords have been updated to 4‑digit codes.")
