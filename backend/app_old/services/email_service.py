from flask_mail import Message
from flask import render_template_string
import os

def send_email(mail, to, subject, body, html=None):
    """Send email using Flask-Mail"""
    try:
        msg = Message(
            subject=subject,
            recipients=[to],
            body=body,
            html=html
        )
        mail.send(msg)
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False

def send_welcome_email(mail, user):
    """Send welcome email to new user"""
    subject = "Welcome to TravelAgency! 🎉"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }}
            .header {{ background: linear-gradient(135deg, #2563EB, #3B82F6); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ padding: 20px; }}
            .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee; }}
            .btn {{ display: inline-block; background: #2563EB; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✈️ TravelAgency</h1>
                <p>Your journey begins here</p>
            </div>
            <div class="content">
                <h2>Welcome {user.first_name} {user.last_name}! 🎉</h2>
                <p>We are thrilled to have you on board! Your decision to join TravelAgency is the first step towards a world of unforgettable adventures.</p>
                
                <h3>🌟 Why Trust TravelAgency?</h3>
                <ul>
                    <li>✅ 10,000+ Happy Travelers</li>
                    <li>✅ Best Price Guarantee</li>
                    <li>✅ 24/7 Expert Support</li>
                    <li>✅ Secure & Trusted</li>
                </ul>
                
                <h3>❤️ What We Do For You</h3>
                <ul>
                    <li>✈️ Flight Bookings - Best deals worldwide</li>
                    <li>🏨 Hotel Reservations - Luxury stays at affordable prices</li>
                    <li>🗺️ Custom Tours - Tailored experiences just for you</li>
                    <li>💰 Best Prices - Exclusive deals and discounts</li>
                </ul>
                
                <div style="background: #f0fdf4; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <p style="color: #166534; font-weight: bold;">🌟 As a valued member, you now have access to exclusive travel deals and premium support!</p>
                </div>
                
                <p style="text-align: center; font-size: 18px; font-weight: bold; color: #2563EB;">
                    Thank You, {user.first_name}! 🙏
                </p>
            </div>
            <div class="footer">
                <p>Safe · Secure · Trusted</p>
                <p>© 2024 TravelAgency. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    text_content = f"""
    Welcome to TravelAgency! 🎉
    
    Dear {user.first_name} {user.last_name},
    
    We are thrilled to have you on board! Your decision to join TravelAgency is the first step towards a world of unforgettable adventures.
    
    Why Trust TravelAgency?
    - 10,000+ Happy Travelers
    - Best Price Guarantee
    - 24/7 Expert Support
    - Secure & Trusted
    
    What We Do For You:
    - Flight Bookings - Best deals worldwide
    - Hotel Reservations - Luxury stays at affordable prices
    - Custom Tours - Tailored experiences just for you
    - Best Prices - Exclusive deals and discounts
    
    🌟 As a valued member, you now have access to exclusive travel deals and premium support!
    
    Thank You, {user.first_name}! 🙏
    
    Safe · Secure · Trusted
    © 2024 TravelAgency. All rights reserved.
    """
    
    return send_email(mail, user.email, subject, text_content, html_content)

def send_payment_confirmation_email(mail, user, payment, booking):
    """Send payment confirmation email"""
    subject = "Payment Confirmed! ✅ TravelAgency"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }}
            .header {{ background: linear-gradient(135deg, #059669, #10B981); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ padding: 20px; }}
            .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>✅ Payment Confirmed!</h1>
                <p>Your booking is now confirmed</p>
            </div>
            <div class="content">
                <h2>Dear {user.first_name} {user.last_name},</h2>
                <p>Your payment of <strong>${payment.amount}</strong> has been confirmed successfully!</p>
                
                <div style="background: #f0fdf4; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <p><strong>Transaction ID:</strong> {payment.transaction_id}</p>
                    <p><strong>Booking ID:</strong> {booking.booking_id}</p>
                    <p><strong>Destination:</strong> {booking.destination}</p>
                    <p><strong>Amount:</strong> ${payment.amount}</p>
                </div>
                
                <p>Your journey begins now! We wish you a wonderful trip.</p>
                <p style="text-align: center; font-size: 18px; font-weight: bold; color: #059669;">
                    Safe Travels! ✈️
                </p>
            </div>
            <div class="footer">
                <p>Safe · Secure · Trusted</p>
                <p>© 2024 TravelAgency. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    text_content = f"""
    Payment Confirmed! ✅
    
    Dear {user.first_name} {user.last_name},
    
    Your payment of ${payment.amount} has been confirmed successfully!
    
    Transaction ID: {payment.transaction_id}
    Booking ID: {booking.booking_id}
    Destination: {booking.destination}
    Amount: ${payment.amount}
    
    Your journey begins now! We wish you a wonderful trip.
    
    Safe Travels! ✈️
    """
    
    return send_email(mail, user.email, subject, text_content, html_content)

def send_booking_confirmation_email(mail, user, booking):
    """Send booking confirmation email"""
    subject = "Booking Confirmed! 🎉 TravelAgency"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }}
            .container {{ max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; }}
            .header {{ background: linear-gradient(135deg, #2563EB, #3B82F6); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }}
            .content {{ padding: 20px; }}
            .footer {{ text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #eee; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 Booking Confirmed!</h1>
                <p>Your adventure awaits</p>
            </div>
            <div class="content">
                <h2>Dear {user.first_name} {user.last_name},</h2>
                <p>Your booking has been confirmed successfully!</p>
                
                <div style="background: #f0fdf4; padding: 15px; border-radius: 10px; margin: 20px 0;">
                    <p><strong>Booking ID:</strong> {booking.booking_id}</p>
                    <p><strong>Destination:</strong> {booking.destination}</p>
                    <p><strong>Check-in:</strong> {booking.check_in}</p>
                    <p><strong>Check-out:</strong> {booking.check_out}</p>
                    <p><strong>Guests:</strong> {booking.guests}</p>
                </div>
                
                <p style="text-align: center; font-size: 18px; font-weight: bold; color: #2563EB;">
                    Have a wonderful trip! ✈️
                </p>
            </div>
            <div class="footer">
                <p>Safe · Secure · Trusted</p>
                <p>© 2024 TravelAgency. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    
    text_content = f"""
    Booking Confirmed! 🎉
    
    Dear {user.first_name} {user.last_name},
    
    Your booking has been confirmed successfully!
    
    Booking ID: {booking.booking_id}
    Destination: {booking.destination}
    Check-in: {booking.check_in}
    Check-out: {booking.check_out}
    Guests: {booking.guests}
    
    Have a wonderful trip! ✈️
    """
    
    return send_email(mail, user.email, subject, text_content, html_content)
