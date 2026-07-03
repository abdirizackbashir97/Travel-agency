import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('book');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    setUser(userData);
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/bookings', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await response.json();
      setBookings(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold">Welcome back, {user?.firstName}! 👋</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Link
            to="/booking"
            className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition text-center border-2 border-blue-100 hover:border-blue-300"
          >
            <div className="text-3xl sm:text-4xl mb-2">✈️</div>
            <h3 className="font-semibold text-sm sm:text-base">Book Travel</h3>
            <p className="text-xs sm:text-sm text-gray-500">Plan your next trip</p>
          </Link>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
            <div className="text-3xl sm:text-4xl mb-2">📅</div>
            <h3 className="font-semibold text-sm sm:text-base">My Bookings</h3>
            <p className="text-xs sm:text-sm text-gray-500">{bookings.length} bookings</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
            <div className="text-3xl sm:text-4xl mb-2">👤</div>
            <h3 className="font-semibold text-sm sm:text-base">My Profile</h3>
            <p className="text-xs sm:text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">My Bookings</h2>
          
          {bookings.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <span className="text-5xl sm:text-6xl">📅</span>
              <p className="text-gray-500 mt-4 text-sm sm:text-base">No bookings yet</p>
              <Link
                to="/booking"
                className="inline-block mt-4 px-4 sm:px-6 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
              >
                Book Now
              </Link>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {booking.booking_type}: {booking.booking_item}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">Travel Date: {booking.travel_date}</p>
                      <p className="text-xs sm:text-sm text-gray-600">People: {booking.number_of_people}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base sm:text-lg font-bold text-indigo-600">
                        ${booking.total_price}
                      </span>
                      <div>
                        <span className={`inline-block px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold ${
                          booking.payment_status === 'paid' 
                            ? 'bg-green-100 text-green-700' 
                            : booking.payment_status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.payment_status || 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
