import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [specialRequests, setSpecialRequests] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState(null);

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
        fetch('http://localhost:5000/api/destinations'),
        fetch('http://localhost:5000/api/hotels'),
        fetch('http://localhost:5000/api/flights'),
        fetch('http://localhost:5000/api/tours')
      ]);

      let destData = await destRes.json();
      let hotelData = await hotelRes.json();
      let flightData = await flightRes.json();
      let tourData = await tourRes.json();

      // Handle different response formats
      destData = destData.data || destData.destinations || destData;
      hotelData = hotelData.data || hotelData.hotels || hotelData;
      flightData = flightData.data || flightData.flights || flightData;
      tourData = tourData.data || tourData.tours || tourData;

      setDestinations(Array.isArray(destData) ? destData : []);
      setHotels(Array.isArray(hotelData) ? hotelData : []);
      setFlights(Array.isArray(flightData) ? flightData : []);
      setTours(Array.isArray(tourData) ? tourData : []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load booking data');
    } finally {
      setLoading(false);
    }
  };

  const getItems = () => {
    switch (bookingType) {
      case 'Destination':
        return destinations.map(item => ({ id: item.id, name: item.name, price: item.price_per_night || item.price || 0 }));
      case 'Hotel':
        return hotels.map(item => ({ id: item.id, name: item.hotel_name || item.name, price: item.price_per_night || item.price || 0 }));
      case 'Flight':
        return flights.map(item => ({ id: item.id, name: `${item.airline} - ${item.flight_number} (${item.departure_city} → ${item.arrival_city})`, price: item.price || 0 }));
      case 'Tour':
        return tours.map(item => ({ id: item.id, name: item.tour_name || item.name, price: item.price_per_person || item.price || 0 }));
      default:
        return [];
    }
  };

  const handleItemSelect = (e) => {
    const itemId = e.target.value;
    setSelectedItem(itemId);
    const items = getItems();
    const item = items.find(i => i.id.toString() === itemId);
    if (item) {
      setTotalPrice(item.price * numberOfPeople);
    }
  };

  const handlePeopleChange = (e) => {
    const people = parseInt(e.target.value) || 1;
    setNumberOfPeople(people);
    const items = getItems();
    const item = items.find(i => i.id.toString() === selectedItem);
    if (item) {
      setTotalPrice(item.price * people);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!selectedItem) {
        toast.error('Please select an item to book');
        setIsProcessing(false);
        return;
      }

      if (!travelDate) {
        toast.error('Please select a travel date');
        setIsProcessing(false);
        return;
      }

      const items = getItems();
      const selected = items.find(i => i.id.toString() === selectedItem);
      
      if (!selected) {
        toast.error('Selected item not found');
        setIsProcessing(false);
        return;
      }

      const bookingData = {
        user_id: user.id || 1,
        booking_type: bookingType,
        booking_item: selected.name,
        travel_date: travelDate,
        return_date: returnDate || null,
        number_of_people: numberOfPeople,
        total_price: totalPrice,
        payment_method: 'M-Pesa',
        special_requests: specialRequests,
        phone_number: phoneNumber || user.phone || '',
        image_url: ''
      };

      console.log('Sending booking data:', bookingData);

      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      console.log('Booking response:', data);

      if (data.success) {
        setBookingId(data.booking?.id || data.data?.id);
        setBookingData(data.booking || data.data);
        setBookingConfirmed(true);
        toast.success('Booking confirmed successfully!');
      } else {
        toast.error(data.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading booking data...</p>
        </div>
      </div>
    );
  }

  if (bookingConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed! 🎉</h2>
          <p className="text-gray-600 mb-4">Your booking has been successfully confirmed.</p>
          {bookingId && (
            <p className="text-sm text-gray-500 mb-6">Booking ID: #{bookingId}</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/bookings')}
              className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Your Adventure</h1>
        <p className="text-gray-500 mb-8">Fill in the details below to confirm your booking</p>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            {/* Booking Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Booking Type *
                </label>
                <select
                  value={bookingType}
                  onChange={(e) => {
                    setBookingType(e.target.value);
                    setSelectedItem('');
                    setTotalPrice(0);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                >
                  <option value="Destination">Destination</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Flight">Flight</option>
                  <option value="Tour">Tour</option>
                </select>
              </div>

              {/* Select Item */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select {bookingType} *
                </label>
                <select
                  value={selectedItem}
                  onChange={handleItemSelect}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                >
                  <option value="">Select {bookingType}</option>
                  {getItems().map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} - ${item.price}
                    </option>
                  ))}
                </select>
              </div>

              {/* Travel Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Date *
                </label>
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Return Date (Optional)
                </label>
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>

              {/* Number of People */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of People *
                </label>
                <input
                  type="number"
                  value={numberOfPeople}
                  onChange={handlePeopleChange}
                  min="1"
                  max="20"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Total Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Total Price ($)
                </label>
                <input
                  type="text"
                  value={`$${totalPrice.toFixed(2)}`}
                  readOnly
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold"
                />
              </div>

              {/* Phone Number */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+254712345678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Special Requests */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows="3"
                  placeholder="Any special requests or requirements..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                type="submit"
                disabled={isProcessing}
                className={`flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition ${
                  isProcessing ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Confirm Booking'
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Booking;
