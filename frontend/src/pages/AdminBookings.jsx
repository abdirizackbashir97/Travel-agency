import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Plane, Hotel, Compass, CheckCircle, XCircle, Clock, Eye, User, Phone, Mail } from 'lucide-react';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/admin/bookings', {
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

  const updateStatus = async (bookingId, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) return;
    
    setUpdating(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:5000/api/admin/bookings/${bookingId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`✅ Booking ${newStatus} successfully!`);
      fetchBookings();
    } catch (err) {
      console.error('Error updating booking:', err);
      alert('❌ Failed to update booking status.');
    }
    setUpdating(false);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'confirmed': 'bg-green-100 text-green-700',
      'pending': 'bg-yellow-100 text-yellow-700',
      'cancelled': 'bg-red-100 text-red-700'
    };
    return badges[status] || 'bg-gray-100 text-gray-700';
  };

  const getBookingIcon = (type) => {
    const icons = {
      'flight': <Plane size={20} className="text-indigo-500" />,
      'hotel': <Hotel size={20} className="text-indigo-500" />,
      'tour': <Compass size={20} className="text-indigo-500" />
    };
    return icons[type] || <Calendar size={20} className="text-indigo-500" />;
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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📋 All Bookings</h1>
          <p className="text-sm text-gray-500">Manage all user bookings and update their status</p>
        </div>
        <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
          {bookings.length} bookings
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Calendar size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getBookingIcon(booking.booking_type)}
                    <h3 className="font-semibold text-gray-800">{booking.item_name || 'Booking'}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(booking.status)}`}>
                      {booking.status || 'Pending'}
                    </span>
                  </div>
                  
                  {/* User Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm mb-2">
                    <div>
                      <p className="text-gray-400">Booking ID</p>
                      <p className="font-medium text-gray-700">#{booking.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">User</p>
                      <p className="font-medium text-gray-700">{booking.first_name} {booking.second_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="font-medium text-gray-700 text-sm">{booking.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="font-medium text-gray-700">{booking.phone || 'N/A'}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <p className="text-gray-400">Travel Date</p>
                      <p className="font-medium text-gray-700">{new Date(booking.travel_date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Total Price</p>
                      <p className="font-medium text-gray-700">${booking.total_price || 0}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Travelers</p>
                      <p className="font-medium text-gray-700">{booking.number_of_travelers || 1}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Payment</p>
                      <p className={`font-medium ${booking.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {booking.payment_status || 'Pending'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(booking.id, 'confirmed')}
                        disabled={updating}
                        className="flex items-center gap-1 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition disabled:opacity-50"
                      >
                        <CheckCircle size={16} /> Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, 'cancelled')}
                        disabled={updating}
                        className="flex items-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
                      >
                        <XCircle size={16} /> Cancel
                      </button>
                    </>
                  )}
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(booking.id, 'cancelled')}
                      disabled={updating}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
                    >
                      <XCircle size={16} /> Cancel
                    </button>
                  )}
                  {booking.status === 'cancelled' && (
                    <button
                      onClick={() => updateStatus(booking.id, 'pending')}
                      disabled={updating}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition disabled:opacity-50"
                    >
                      <Clock size={16} /> Reopen
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowModal(true);
                    }}
                    className="flex items-center gap-1 px-3 py-2 text-sm bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition"
                  >
                    <Eye size={16} /> Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for booking details */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full mx-4 p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {getBookingIcon(selectedBooking.booking_type)}
                <span className="font-semibold">{selectedBooking.item_name}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(selectedBooking.status)}`}>
                  {selectedBooking.status}
                </span>
              </div>
              
              <div className="border-t border-gray-100 pt-3">
                <h3 className="font-semibold text-gray-700 mb-2">User Information</h3>
                <div className="space-y-1 text-sm">
                  <p className="flex items-center gap-2"><User size={16} className="text-gray-400" /> {selectedBooking.first_name} {selectedBooking.second_name}</p>
                  <p className="flex items-center gap-2"><Mail size={16} className="text-gray-400" /> {selectedBooking.email}</p>
                  <p className="flex items-center gap-2"><Phone size={16} className="text-gray-400" /> {selectedBooking.phone || 'N/A'}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-3">
                <h3 className="font-semibold text-gray-700 mb-2">Booking Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-400">Booking ID:</span> #{selectedBooking.id}</div>
                  <div><span className="text-gray-400">Travel Date:</span> {new Date(selectedBooking.travel_date).toLocaleDateString()}</div>
                  <div><span className="text-gray-400">Total Price:</span> ${selectedBooking.total_price}</div>
                  <div><span className="text-gray-400">Travelers:</span> {selectedBooking.number_of_travelers || 1}</div>
                  <div><span className="text-gray-400">Payment:</span> {selectedBooking.payment_status || 'Pending'}</div>
                  <div><span className="text-gray-400">Booking Date:</span> {new Date(selectedBooking.booking_date).toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
