import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Calendar, Users, Phone, MessageSquare, CreditCard, Plane, Hotel, MapPin, Package, ArrowLeft } from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

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
        fetch(`${API_BASE}/destinations`),
        fetch(`${API_BASE}/hotels`),
        fetch(`${API_BASE}/flights`),
        fetch(`${API_BASE}/tours`)
      ]);

      let destData = await destRes.json();
      let hotelData = await hotelRes.json();
      let flightData = await flightRes.json();
      let tourData = await tourRes.json();

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

      if (!phoneNumber) {
        toast.error('Please enter your phone number');
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

      const finalPrice = Number(totalPrice);
      const userId = user?.id || 1;

      const payload = {
        user_id: userId,
        booking_type: bookingType,
        booking_item: selected.name,
        travel_date: travelDate,
        return_date: returnDate || null,
        number_of_people: Number(numberOfPeople),
        total_price: finalPrice,
        payment_method: 'M-Pesa',
        special_requests: specialRequests || '',
        phone_number: phoneNumber || user?.phone || '',
        image_url: ''
      };

      console.log('📤 Sending booking payload:', JSON.stringify(payload, null, 2));

      const response = await fetch(`${API_BASE}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log('📥 Booking response:', data);

      if (response.ok && data.success) {
        setBookingId(data.booking?.id || data.data?.id);
        setBookingConfirmed(true);
        toast.success('Booking confirmed successfully!');
      } else {
        // Show the exact error from the backend
        const errorMsg = data.message || data.error || 'Failed to create booking';
        toast.error(errorMsg);
        console.error('❌ Booking error details:', data);
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      toast.error('Network error – please check your connection');
    } finally {
      setIsProcessing(false);
    }
  };

  const typeIcons = {
    Destination: MapPin,
    Hotel: Hotel,
    Flight: Plane,
    Tour: Package,
  };
  const TypeIcon = typeIcons[bookingType] || MapPin;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 font-medium">Loading booking data...</p>
        </div>
      </div>
    );
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 px-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed! 🎉</h2>
          <p className="text-gray-500 mb-1">Your booking has been successfully confirmed.</p>
          {bookingId && (
            <p className="text-sm text-gray-400 mb-6">Booking ID: <span className="font-mono font-semibold">#{bookingId}</span></p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            <button
              onClick={() => navigate('/dashboard/bookings')}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 font-medium"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-white rounded-xl transition shadow-sm"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Book Your Adventure</h1>
              <p className="text-gray-500 mt-0.5">Fill in the details to confirm your booking</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <form onSubmit={handleSubmit}>
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-white">
                    <TypeIcon className="w-5 h-5" />
                    <span className="font-semibold">Booking Type:</span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {['Destination', 'Hotel', 'Flight', 'Tour'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setBookingType(type);
                          setSelectedItem('');
                          setTotalPrice(0);
                        }}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                          bookingType === type
                            ? 'bg-white text-indigo-700 shadow-lg'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Select {bookingType} *
                    </label>
                    <select
                      value={selectedItem}
                      onChange={handleItemSelect}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white"
                      required
                    >
                      <option value="">Choose a {bookingType.toLowerCase()}</option>
                      {getItems().map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name} – KES {item.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Travel Date *</label>
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Return Date (Optional)</label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Number of People *
                    </label>
                    <input
                      type="number"
                      value={numberOfPeople}
                      onChange={handlePeopleChange}
                      min="1"
                      max="20"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      <CreditCard className="w-4 h-4 inline mr-1" />
                      Total Price (KES)
                    </label>
                    <div className="w-full px-4 py-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-700 font-bold text-lg flex items-center">
                      KES {totalPrice.toFixed(2)}
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+254 712 345 678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Special Requests
                    </label>
                    <textarea
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows="3"
                      placeholder="Any special requests or requirements..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-100">
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition duration-200 ${
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Booking;
