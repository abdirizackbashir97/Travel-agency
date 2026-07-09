import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Bookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');

    if (!token) {
      navigate('/login');
      return;
    }

    setUser(userData);
    fetchBookings(userData.id);
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/user/${userId}`);
      const data = await response.json();
      console.log('Bookings response:', data);
      
      let bookingData = [];
      if (data && data.data) {
        bookingData = data.data;
      } else if (data && data.bookings) {
        bookingData = data.bookings;
      } else if (Array.isArray(data)) {
        bookingData = data;
      }
      
      setBookings(bookingData);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'paid': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/cancel`, {
        method: 'POST'
      });
      const data = await response.json();
      
      if (data.success) {
        toast.success('Booking cancelled successfully');
        if (user) {
          fetchBookings(user.id);
        }
      } else {
        toast.error(data.message || 'Failed to cancel booking');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
            <p className="text-gray-500">View and manage all your bookings</p>
          </div>
          <button
            onClick={() => navigate('/destinations')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            + New Booking
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-2xl font-semibold text-gray-400 mb-2">No bookings yet</p>
            <p className="text-gray-500">Start your adventure by booking a destination, hotel, flight, or tour!</p>
            <button
              onClick={() => navigate('/destinations')}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Explore Now
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.booking_status)}`}>
                          {booking.booking_status || 'pending'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(booking.payment_status)}`}>
                          {booking.payment_status || 'pending'}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {booking.booking_type}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-800">{booking.booking_item}</h3>
                      <p className="text-sm text-gray-600">
                        📅 Travel: {booking.travel_date} {booking.return_date && `→ Return: ${booking.return_date}`}
                      </p>
                      <p className="text-sm text-gray-600">👤 {booking.number_of_people} people</p>
                      {booking.special_requests && (
                        <p className="text-sm text-gray-500 mt-1">💬 {booking.special_requests}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">📱 {booking.phone_number}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">${booking.total_price}</p>
                      <p className="text-xs text-gray-500">Total</p>
                      {booking.booking_status?.toLowerCase() !== 'cancelled' && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="mt-2 px-4 py-1.5 bg-red-100 text-red-600 text-sm font-medium rounded-lg hover:bg-red-200 transition"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Bookings;
