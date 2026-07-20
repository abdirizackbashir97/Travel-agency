import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Compass, User, Mail, Phone, Calendar, MapPin, CheckCircle, XCircle, Clock as ClockIcon, Eye, Users } from 'lucide-react';

export default function AdminTourBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/admin/tour-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setBookings(response.data.bookings || []);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tour bookings:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">🌍 Tour Bookings</h1>
          <p className="text-sm text-gray-500">Manage all tour bookings and excursions</p>
        </div>
        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {bookings.length} bookings
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Compass size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No tour bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="font-bold text-gray-800 text-lg">#{booking.id}</span>
                    <span className={`px-3 py-1 text-xs rounded-full border ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-700 border-green-200' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-700 border-red-200' :
                      'bg-yellow-100 text-yellow-700 border-yellow-200'
                    }`}>
                      {booking.status || 'Pending'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50/50 rounded-xl p-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Tour</p>
                      <p className="font-semibold text-gray-800">{booking.tour_name}</p>
                      <p className="text-sm text-gray-600">{booking.destination}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Guide</p>
                      <p className="font-semibold text-gray-800">{booking.guide || 'TBA'}</p>
                      <p className="text-sm text-gray-600">{booking.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Travelers</p>
                      <p className="font-semibold text-gray-800">{booking.number_of_travelers || 1} persons</p>
                      <p className="text-sm text-gray-600">${booking.total_price}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-gray-400" />
                      <span className="font-medium text-gray-700">{booking.first_name} {booking.second_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={14} className="text-gray-400" />
                      <span className="text-gray-600 truncate">{booking.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={14} className="text-gray-400" />
                      <span className="text-gray-600">{booking.phone || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-gray-400" />
                      <span className="text-gray-600">{booking.travel_date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                    <Eye size={16} /> Manage
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
