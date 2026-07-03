import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Booking = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [flights, setFlights] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookingType, setBookingType] = useState('Destination');
  const [selectedItem, setSelectedItem] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [destRes, hotelRes, flightRes, tourRes] = await Promise.all([
        fetch('http://localhost:5002/api/destinations'),
        fetch('http://localhost:5002/api/hotels'),
        fetch('http://localhost:5002/api/flights'),
        fetch('http://localhost:5002/api/tours')
      ]);
      
      const destinations = await destRes.json();
      const hotels = await hotelRes.json();
      const flights = await flightRes.json();
      const tours = await tourRes.json();
      
      setDestinations(destinations || []);
      setHotels(hotels || []);
      setFlights(flights || []);
      setTours(tours || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load booking data');
    } finally {
      setLoading(false);
    }
  };

  const getItems = () => {
    switch(bookingType) {
      case 'Destination':
        return destinations;
      case 'Hotel':
        return hotels;
      case 'Flight':
        return flights;
      case 'Tour':
        return tours;
      default:
        return [];
    }
  };

  const getItemPrice = (item) => {
    switch(bookingType) {
      case 'Destination':
        return item.price_per_night || 0;
      case 'Hotel':
        return item.price_per_night || 0;
      case 'Flight':
        return item.price || 0;
      case 'Tour':
        return item.price_per_person || 0;
      default:
        return 0;
    }
  };

  const getItemName = (item) => {
    switch(bookingType) {
      case 'Destination':
        return item.name || '';
      case 'Hotel':
        return item.hotel_name || '';
      case 'Flight':
        return `${item.airline || ''} ${item.flight_number || ''}`;
      case 'Tour':
        return item.tour_name || '';
      default:
        return '';
    }
  };

  useEffect(() => {
    if (selectedItem) {
      const items = getItems();
      const item = items.find(i => i.id === parseInt(selectedItem));
      if (item) {
        const price = getItemPrice(item);
        setTotalPrice(price * numberOfPeople);
      }
    }
  }, [selectedItem, numberOfPeople, bookingType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedItem) {
      toast.error('Please select an item');
      return;
    }

    if (!travelDate) {
      toast.error('Please select a travel date');
      return;
    }

    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setIsProcessing(true);

    const items = getItems();
    const item = items.find(i => i.id === parseInt(selectedItem));
    const itemName = getItemName(item);

    try {
      const response = await fetch('http://localhost:5002/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          booking_type: bookingType,
          booking_item: itemName,
          travel_date: travelDate,
          return_date: returnDate,
          number_of_people: numberOfPeople,
          total_price: totalPrice,
          payment_method: 'mpesa',
          payment_status: 'Paid',
          phone_number: phoneNumber
        })
      });

      const data = await response.json();

      if (response.ok) {
        setBookingId(data.booking.id);
        setBookingData(data.booking);
        setBookingConfirmed(true);
        toast.success('✅ Booking confirmed successfully!');
      } else {
        toast.error(data.error || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading booking options...</p>
        </div>
      </div>
    );
  }

  // Confirmation Page
  if (bookingConfirmed) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <Toaster position="top-right" />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your booking has been successfully confirmed.</p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6 text-left">
              <h3 className="font-semibold text-green-800 mb-3">Booking Details:</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium text-gray-600">Booking ID:</span> <span className="text-gray-800">#{bookingId}</span></p>
                <p><span className="font-medium text-gray-600">Type:</span> <span className="text-gray-800">{bookingData?.booking_type}</span></p>
                <p><span className="font-medium text-gray-600">Item:</span> <span className="text-gray-800">{bookingData?.booking_item}</span></p>
                <p><span className="font-medium text-gray-600">Travel Date:</span> <span className="text-gray-800">{bookingData?.travel_date}</span></p>
                <p><span className="font-medium text-gray-600">People:</span> <span className="text-gray-800">{bookingData?.number_of_people}</span></p>
                <p><span className="font-medium text-gray-600">Total Price:</span> <span className="text-xl font-bold text-indigo-600">${bookingData?.total_price}</span></p>
                <p><span className="font-medium text-gray-600">Status:</span> <span className="text-green-600 font-semibold">Paid ✅</span></p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Booking Form
  return (
    <div className="min-h-screen bg-gray-50">
      
      <Toaster position="top-right" />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <span className="text-4xl">📅</span>
            Complete Your Booking
          </h1>
          <p className="text-gray-500 mb-6">Fill in your details to confirm your reservation</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Booking Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Booking Type *</label>
              <select
                value={bookingType}
                onChange={(e) => {
                  setBookingType(e.target.value);
                  setSelectedItem('');
                  setTotalPrice(0);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Destination">Destination</option>
                <option value="Hotel">Hotel</option>
                <option value="Flight">Flight</option>
                <option value="Tour">Tour</option>
              </select>
            </div>

            {/* Select Item */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select {bookingType} *</label>
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select a {bookingType}</option>
                {getItems().map((item) => (
                  <option key={item.id} value={item.id}>
                    {getItemName(item)} - ${getItemPrice(item)}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date *</label>
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Return Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={travelDate || new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of People *</label>
              <input
                type="number"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                min="1"
                max="20"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">📱 Phone Number *</label>
              <input
                type="tel"
                placeholder="0712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Enter your phone number for booking reference</p>
            </div>

            {/* Price Summary */}
            {totalPrice > 0 && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700">Total Price:</span>
                  <span className="text-2xl font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  For {numberOfPeople} person(s)
                </p>
                <p className="text-sm text-green-600 mt-1">
                  ✅ Payment will be processed immediately
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
