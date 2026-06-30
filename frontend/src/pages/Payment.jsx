import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, Lock, Shield } from 'lucide-react';

const Payment = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    const savedBooking = localStorage.getItem('bookingDetails');
    if (savedBooking) {
      try {
        setBookingDetails(JSON.parse(savedBooking));
      } catch (e) {
        console.error('Error loading booking details:', e);
      }
    }
  }, []);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cardNumber') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length <= 10) {
        setPaymentData({
          ...paymentData,
          [name]: cleaned
        });
      }
    } else {
      setPaymentData({
        ...paymentData,
        [name]: value
      });
    }
  };

  const handlePayment = (e) => {
    e.preventDefault();
    
    if (!paymentData.cardNumber || paymentData.cardNumber.length < 1) {
      alert('Please enter a card number (1-10 digits)');
      return;
    }
    if (!paymentData.expiryDate) {
      alert('Please enter expiry date');
      return;
    }
    if (!paymentData.cvv) {
      alert('Please enter CVV');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      localStorage.removeItem('bookingDetails');
      localStorage.removeItem('bookingItem');
      localStorage.removeItem('paymentData');
    }, 2000);
  };

  if (isComplete) {
    return (
      <div className="py-20 bg-gray-50 min-h-screen">
        <div className="container max-w-2xl">
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-500 mb-6">Your booking has been confirmed. Check your email for details.</p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Booking Reference: <span className="font-medium text-gray-900">BK-{Date.now().toString().slice(-6)}</span></p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                Go to Dashboard
              </Link>
              <Link to="/" className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container max-w-4xl">
        <Link to="/booking" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Booking
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Secure Payment</h2>
              </div>

              <form onSubmit={handlePayment}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                        paymentMethod === 'card'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <CreditCard className={`w-6 h-6 ${
                        paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <span className="text-sm font-medium">Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                        paymentMethod === 'paypal'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg font-bold text-blue-600">P</span>
                      <span className="text-sm font-medium">PayPal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple')}
                      className={`p-3 border rounded-lg flex flex-col items-center gap-2 transition-colors ${
                        paymentMethod === 'apple'
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg font-bold text-gray-800"></span>
                      <span className="text-sm font-medium">Apple Pay</span>
                    </button>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        placeholder="Enter 1-10 digits"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                      <p className="text-xs text-gray-400 mt-1">Enter any number between 1-10 digits for testing</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          placeholder="MM/YY"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">CVV</label>
                        <input
                          type="password"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">You will be redirected to PayPal to complete your payment.</p>
                  </div>
                )}

                {paymentMethod === 'apple' && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Pay securely with Apple Pay.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  {isProcessing ? 'Processing...' : 'Pay Now'}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
              <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
              {bookingDetails ? (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Destination</span>
                    <span className="text-gray-900">{bookingDetails.destination || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Type</span>
                    <span className="text-gray-900">{bookingDetails.type || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Guests</span>
                    <span className="text-gray-900">{bookingDetails.guests || 1}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Check-in</span>
                    <span className="text-gray-900">{bookingDetails.checkIn || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Check-out</span>
                    <span className="text-gray-900">{bookingDetails.checkOut || 'N/A'}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-blue-600">${(bookingDetails.price || 0) * (bookingDetails.guests || 1)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No booking details found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
