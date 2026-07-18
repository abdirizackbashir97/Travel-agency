import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Calendar, Plane, Hotel, Compass, Download, Eye, X, Headphones, CheckCircle, Clock } from 'lucide-react';

export default function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/user/bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setBookings(response.data.bookings || []);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getBookingIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'flight':
        return <Plane size={20} className="text-indigo-500" />;
      case 'hotel':
        return <Hotel size={20} className="text-indigo-500" />;
      case 'tour':
        return <Compass size={20} className="text-indigo-500" />;
      default:
        return <Calendar size={20} className="text-indigo-500" />;
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📋 My Bookings</h1>
        <span className="text-sm text-gray-500">{bookings.length} bookings found</span>
      </div>
      
      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Calendar size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">You have no bookings yet.</p>
          <Link to="/flights" className="text-indigo-600 hover:underline mt-2 inline-block">Start exploring</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getBookingIcon(booking.booking_type)}
                    <h3 className="font-semibold text-gray-800">
                      {booking.item_name || booking.booking_type || 'Booking'}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status || 'Pending'}
                    </span>
                  </div>
                  {booking.item_location && (
                    <p className="text-sm text-gray-500 mb-2">📍 {booking.item_location}</p>
                  )}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">Booking ID</p>
                      <p className="font-medium text-gray-700">#{booking.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Travel Date</p>
                      <p className="font-medium text-gray-700">{new Date(booking.travel_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Total</p>
                      <p className="font-medium text-gray-700">${booking.total_price || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Payment</p>
                      <p className={`font-medium ${booking.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {booking.payment_status || 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition">
                    <Eye size={16} /> View
                  </button>
                  {booking.status?.toLowerCase() === 'confirmed' && (
                    <button className="flex items-center gap-1 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition">
                      <Download size={16} /> Ticket
                    </button>
                  )}
                  {booking.status?.toLowerCase() === 'pending' && (
                    <button className="flex items-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
                      <X size={16} /> Cancel
                    </button>
                  )}
                  <button className="flex items-center gap-1 px-3 py-2 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition">
                    <Headphones size={16} /> Support
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
