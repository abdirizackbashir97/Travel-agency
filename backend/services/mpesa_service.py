import requests
import os
import base64
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

class MpesaService:
    def __init__(self):
        self.consumer_key = os.getenv('CONSUMER_KEY')
        self.consumer_secret = os.getenv('CONSUMER_SECRET')
        self.passkey = os.getenv('PASSKEY')
        self.shortcode = os.getenv('SHORTCODE', '174379')
        self.base_url = os.getenv('BASE_URL', 'https://sandbox.safaricom.co.ke')
    
    def get_access_token(self):
        auth = base64.b64encode(
            f"{self.consumer_key}:{self.consumer_secret}".encode()
        ).decode()
        
        url = f"{self.base_url}/oauth/v1/generate?grant_type=client_credentials"
        headers = {'Authorization': f'Basic {auth}'}
        
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            return response.json().get('access_token')
        except Exception as e:
            print(f"Error getting access token: {e}")
            raise
    
    def generate_password(self):
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        password_str = f"{self.shortcode}{self.passkey}{timestamp}"
        password = base64.b64encode(password_str.encode()).decode()
        return password, timestamp
    
    def format_phone_number(self, phone):
        cleaned = ''.join(filter(str.isdigit, phone))
        if cleaned.startswith('0'):
            cleaned = '254' + cleaned[1:]
        elif not cleaned.startswith('254'):
            cleaned = '254' + cleaned
        return cleaned
    
    def initiate_payment(self, phone_number, amount, account_reference, booking_details=None):
        try:
            formatted_phone = self.format_phone_number(phone_number)
            token = self.get_access_token()
            password, timestamp = self.generate_password()
            
            url = f"{self.base_url}/mpesa/stkpush/v1/processrequest"
            headers = {
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json'
            }
            
            data = {
                'BusinessShortCode': self.shortcode,
                'Password': password,
                'Timestamp': timestamp,
                'TransactionType': 'CustomerPayBillOnline',
                'Amount': amount,
                'PartyA': formatted_phone,
                'PartyB': self.shortcode,
                'PhoneNumber': formatted_phone,
                'CallBackURL': os.getenv('CALLBACK_URL'),
                'AccountReference': account_reference or 'TravelBooking',
                'TransactionDesc': f"Booking payment"
            }
            
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            result = response.json()
            
            from config.database import get_db_connection
            import json
            
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO transactions 
                (merchant_request_id, checkout_request_id, phone_number, amount, 
                 account_reference, booking_details, status)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            ''', (
                result.get('MerchantRequestID'),
                result.get('CheckoutRequestID'),
                formatted_phone,
                amount,
                account_reference or 'TravelBooking',
                json.dumps(booking_details or {}),
                'pending'
            ))
            conn.commit()
            transaction_id = cursor.lastrowid
            
            cursor.execute('SELECT * FROM transactions WHERE id = ?', (transaction_id,))
            transaction = cursor.fetchone()
            conn.close()
            
            return {
                'success': True,
                'message': 'Payment initiated. Enter your M-Pesa PIN to complete.',
                'checkout_request_id': result.get('CheckoutRequestID'),
                'merchant_request_id': result.get('MerchantRequestID'),
                'transaction': dict(transaction) if transaction else None
            }
            
        except Exception as e:
            print(f"Error initiating payment: {e}")
            return {
                'success': False,
                'message': 'Failed to initiate payment',
                'error': str(e)
            }
    
    def query_status(self, checkout_request_id):
        try:
            token = self.get_access_token()
            password, timestamp = self.generate_password()
            
            url = f"{self.base_url}/mpesa/stkpushquery/v1/query"
            headers = {
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json'
            }
            
            data = {
                'BusinessShortCode': self.shortcode,
                'Password': password,
                'Timestamp': timestamp,
                'CheckoutRequestID': checkout_request_id
            }
            
            response = requests.post(url, json=data, headers=headers)
            response.raise_for_status()
            result = response.json()
            
            from config.database import get_db_connection
            
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute('''
                UPDATE transactions 
                SET status = ?, result_code = ?, result_desc = ?, updated_at = CURRENT_TIMESTAMP
                WHERE checkout_request_id = ?
            ''', (
                'completed' if result.get('ResultCode') == '0' else 'failed',
                result.get('ResultCode'),
                result.get('ResultDesc'),
                checkout_request_id
            ))
            conn.commit()
            conn.close()
            
            return {
                'success': True,
                'status': 'completed' if result.get('ResultCode') == '0' else 'failed',
                'data': result
            }
            
        except Exception as e:
            print(f"Error querying status: {e}")
            return {
                'success': False,
                'message': 'Failed to query status',
                'error': str(e)
            }
    
    def handle_callback(self, callback_data):
        try:
            body = callback_data.get('Body', {})
            stk_callback = body.get('stkCallback', {})
            
            checkout_request_id = stk_callback.get('CheckoutRequestID')
            result_code = stk_callback.get('ResultCode')
            result_desc = stk_callback.get('ResultDesc')
            
            from config.database import get_db_connection
            import json
            
            conn = get_db_connection()
            cursor = conn.cursor()
            
            status = 'completed' if result_code == '0' else 'failed'
            receipt_number = None
            
            if result_code == '0':
                callback_metadata = stk_callback.get('CallbackMetadata', {}).get('Item', [])
                for item in callback_metadata:
                    if item.get('Name') == 'MpesaReceiptNumber':
                        receipt_number = item.get('Value')
            
            cursor.execute('''
                UPDATE transactions 
                SET status = ?, result_code = ?, result_desc = ?, receipt_number = ?, updated_at = CURRENT_TIMESTAMP
                WHERE checkout_request_id = ?
            ''', (
                status,
                result_code,
                result_desc,
                receipt_number,
                checkout_request_id
            ))
            conn.commit()
            conn.close()
            
            return {
                'success': True,
                'message': 'Callback processed successfully',
                'checkout_request_id': checkout_request_id,
                'status': status
            }
            
        except Exception as e:
            print(f"Error handling callback: {e}")
            return {
                'success': False,
                'message': 'Failed to process callback',
                'error': str(e)
            }
