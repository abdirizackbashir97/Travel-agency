import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Calendar, Users, MapPin, User, Mail, Phone, 
  Smartphone, CheckCircle, AlertCircle, Loader, Clock, 
  MessageSquare, Send, CreditCard
} from 'lucide-react';

const Booking = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    destination: '',
    location: '',
    price: 0,
    type: '',
    image: '',
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });

  const [paymentData, setPaymentData] = useState({
    phoneNumber: '',
    amount: '',
  });

  const [errors, setErrors] = useState({});
  const [paymentErrors, setPaymentErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [showInstructions, setShowInstructions] = useState(false);
  const [smsSent, setSmsSent] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const savedItem = localStorage.getItem('bookingItem');
    if (savedItem) {
      try {
        const item = JSON.parse(savedItem);
        const price = item.price || 0;
        setBookingData({
          destination: item.name || '',
          location: item.location || '',
          price: price,
          type: item.type || '',
          image: item.image || '',
        });
        setPaymentData(prev => ({
          ...prev,
          amount: price.toString()
        }));
      } catch (e) {
        console.error('Error loading booking data:', e);
      }
    }
  }, []);

  // Countdown timer for SMS expiry
  useEffect(() => {
    let timer;
    if (smsSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [smsSent, countdown]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
    }
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    // Format phone number - only allow digits
    if (name === 'phoneNumber') {
      const cleaned = value.replace(/\D/g, '');
      setPaymentData({
        ...paymentData,
        [name]: cleaned
      });
    } else {
      setPaymentData({
        ...paymentData,
        [name]: value
      });
    }
    if (paymentErrors[name]) {
      setPaymentErrors({
        ...paymentErrors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.checkIn) newErrors.checkIn = 'Check-in date is required';
    if (!formData.checkOut) newErrors.checkOut = 'Check-out date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = () => {
    const newErrors = {};
    
    if (!paymentData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (paymentData.phoneNumber.length < 10) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    }
    
    if (!paymentData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(paymentData.amount) || parseFloat(paymentData.amount) <= 0) {
      newErrors.amount = 'Enter a valid amount';
    }
    
    setPaymentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const completeBooking = {
      ...formData,
      ...bookingData,
      bookingDate: new Date().toISOString(),
      bookingId: `BK-${Date.now()}`,
    };
    
    localStorage.setItem('bookingDetails', JSON.stringify(completeBooking));
    setStep(2);
  };

  const sendPaymentRequest = (e) => {
    e.preventDefault();
    
    if (!validatePayment()) {
      return;
    }

    // Show instructions to user - real SMS sent to their phone
    setShowInstructions(true);
    setSmsSent(true);
    setCountdown(60);
    setIsProcessing(true);
    setPaymentStatus('sending');

    // Simulate SMS being sent
    setTimeout(() => {
      setPaymentStatus('sent');
      setIsProcessing(false);
    }, 2000);
  };

  const confirmPayment = () => {
    setPaymentStatus('processing');
    setIsProcessing(true);
    
    // Simulate payment confirmation after user enters PIN on phone
    setTimeout(() => {
      setPaymentStatus('confirmed');
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      localStorage.setItem('paymentData', JSON.stringify({
        ...paymentData,
        status: 'completed',
        transactionId: `MPESA-${Date.now()}`,
        timestamp: new Date().toISOString()
      }));
    }, 3000);
  };

  const resendSms = () => {
    setCountdown(60);
    setPaymentStatus('sending');
    // Simulate resending SMS
    setTimeout(() => {
      setPaymentStatus('sent');
    }, 1500);
  };

  const totalAmount = bookingData.price * formData.guests || 0;

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-500 mb-8">Fill in your details to confirm your reservation</p>

          {/* Booking Summary */}
          {bookingData.destination && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center gap-4">
              {bookingData.image && (
                <img 
                  src={bookingData.image} 
                  alt={bookingData.destination}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{bookingData.destination}</h3>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {bookingData.location}
                </p>
                <p className="text-sm font-bold text-blue-600">${bookingData.price} / night</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold text-blue-600">${totalAmount}</p>
              </div>
            </div>
          )}

          {/* Steps */}
          <div className="flex items-center gap-4 mb-8">
            <div className={`flex-1 flex items-center gap-3 ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                1
              </div>
              <span className="text-sm font-medium">Details</span>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
            <div className={`flex-1 flex items-center gap-3 ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                2
              </div>
              <span className="text-sm font-medium">Payment</span>
            </div>
            <div className="flex-1 h-px bg-gray-200" />
            <div className={`flex-1 flex items-center gap-3 ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                3
              </div>
              <span className="text-sm font-medium">Confirm</span>
            </div>
          </div>

          {step === 1 && (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        errors.firstName ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter your last name"
                    required
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        errors.email ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        errors.phone ? 'border-red-500' : 'border-gray-200'
                      }`}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Check-in Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="date"
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        errors.checkIn ? 'border-red-500' : 'border-gray-200'
                      }`}
                      required
                    />
                  </div>
                  {errors.checkIn && (
                    <p className="text-xs text-red-500 mt-1">{errors.checkIn}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Check-out Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="date"
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleChange}
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                        errors.checkOut ? 'border-red-500' : 'border-gray-200'
                      }`}
                      required
                    />
                  </div>
                  {errors.checkOut && (
                    <p className="text-xs text-red-500 mt-1">{errors.checkOut}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Guests</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between">
                <Link to="/" className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div>
              {paymentSuccess ? (
                // Success Screen
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful! ✅</h2>
                  <p className="text-gray-500 mb-2">Your booking has been confirmed.</p>
                  <p className="text-sm text-gray-400 mb-6">
                    Transaction ID: {localStorage.getItem('paymentData') ? JSON.parse(localStorage.getItem('paymentData')).transactionId : 'MPESA-' + Date.now()}
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm text-gray-600"><strong>Destination:</strong> {bookingData.destination}</p>
                    <p className="text-sm text-gray-600"><strong>Amount:</strong> ${totalAmount}</p>
                    <p className="text-sm text-gray-600"><strong>Guest:</strong> {formData.firstName} {formData.lastName}</p>
                    <p className="text-sm text-gray-600"><strong>Check-in:</strong> {formData.checkIn}</p>
                    <p className="text-sm text-gray-600"><strong>Check-out:</strong> {formData.checkOut}</p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Link to="/dashboard" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                      Go to Dashboard
                    </Link>
                    <Link to="/" className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      Back to Home
                    </Link>
                  </div>
                </div>
              ) : showInstructions ? (
                // M-Pesa Instructions - User sees this on their screen
                <div className="text-center py-6">
                  <div className="bg-green-50 border-2 border-green-300 rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Smartphone className="w-10 h-10 text-green-600 animate-pulse" />
                      <span className="text-lg font-bold text-gray-900">📱 Check Your Phone</span>
                    </div>
                    <div className="bg-white rounded-lg p-4 mb-4 text-left border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Phone Number</p>
                          <p className="text-lg font-bold text-gray-900">{paymentData.phoneNumber}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Amount</p>
                          <p className="text-lg font-bold text-blue-600">${paymentData.amount}</p>
                        </div>
                      </div>
                    </div>
                    
                    {paymentStatus === 'sending' && (
                      <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 justify-center">
                          <Loader className="w-4 h-4 text-yellow-600 animate-spin" />
                          <span className="text-sm text-yellow-700">Sending payment request to your phone...</span>
                        </div>
                      </div>
                    )}

                    {paymentStatus === 'sent' && (
                      <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-700">✅ Payment request sent! Check your phone.</span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 text-left">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Open your phone</p>
                          <p className="text-xs text-gray-500">Check the M-Pesa STK Push message you received</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Enter your M-Pesa PIN</p>
                          <p className="text-xs text-gray-500">On your phone, enter your PIN to authorize payment</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">Confirm payment</p>
                          <p className="text-xs text-gray-500">Wait for confirmation, then click "I've Paid" below</p>
                        </div>
                      </div>
                    </div>

                    {paymentStatus === 'sent' && (
                      <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-amber-600" />
                            <span className="text-sm text-amber-700">Request expires in: <strong>{countdown}s</strong></span>
                          </div>
                          {countdown === 0 && (
                            <button
                              onClick={resendSms}
                              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Resend SMS
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {paymentStatus === 'processing' && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 justify-center">
                          <Loader className="w-4 h-4 text-yellow-600 animate-spin" />
                          <span className="text-sm text-yellow-700">Verifying payment... Please wait.</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => {
                        setShowInstructions(false);
                        setSmsSent(false);
                        setIsProcessing(false);
                        setPaymentStatus('');
                        setCountdown(60);
                      }}
                      className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={confirmPayment}
                      disabled={paymentStatus === 'processing' || paymentStatus === 'sending'}
                      className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <CheckCircle className="w-4 h-4" />
                      I've Paid
                    </button>
                  </div>
                </div>
              ) : (
                // Payment Form
                <form onSubmit={sendPaymentRequest}>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Booking Summary</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <p className="text-gray-600"><strong>Destination:</strong> {bookingData.destination || 'N/A'}</p>
                      <p className="text-gray-600"><strong>Guests:</strong> {formData.guests}</p>
                      <p className="text-gray-600"><strong>Check-in:</strong> {formData.checkIn || 'N/A'}</p>
                      <p className="text-gray-600"><strong>Check-out:</strong> {formData.checkOut || 'N/A'}</p>
                      <p className="text-gray-600 col-span-2"><strong>Total:</strong> <span className="text-blue-600 font-bold">${totalAmount}</span></p>
                    </div>
                  </div>

                  {/* M-Pesa Payment */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Smartphone className="w-6 h-6 text-green-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Pay with M-Pesa</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-4">
                      Enter your M-Pesa phone number. You'll receive a payment request via SMS on your phone.
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">M-Pesa Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={paymentData.phoneNumber}
                            onChange={handlePaymentChange}
                            placeholder="0712345678"
                            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                              paymentErrors.phoneNumber ? 'border-red-500' : 'border-gray-200'
                            }`}
                            required
                          />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Enter your Safaricom M-Pesa registered number</p>
                        {paymentErrors.phoneNumber && (
                          <p className="text-xs text-red-500 mt-1">{paymentErrors.phoneNumber}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Amount ($)</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                          <input
                            type="number"
                            name="amount"
                            value={paymentData.amount}
                            onChange={handlePaymentChange}
                            className={`w-full pl-8 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 ${
                              paymentErrors.amount ? 'border-red-500' : 'border-gray-200'
                            }`}
                            required
                          />
                        </div>
                        {paymentErrors.amount && (
                          <p className="text-xs text-red-500 mt-1">{paymentErrors.amount}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-8 border-t border-gray-200 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Payment Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
