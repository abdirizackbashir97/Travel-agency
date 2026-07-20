import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plane, Hotel, Compass, CheckCircle, XCircle, Clock, 
  Eye, User, Mail, Phone, Calendar, DollarSign, 
  ChevronDown, ChevronUp 
} from 'lucide-react';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [expandedUser, setExpandedUser] = useState(null);

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
      const response = await axios.put(
        `http://localhost:5000/api/admin/bookings/${bookingId}/status`,
        { status: newStatus },
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );
      
      if (response.data.success) {
        alert(`✅ Booking ${newStatus} successfully!`);
        fetchBookings();
      } else {
        alert(`❌ ${response.data.message || 'Failed to update booking status'}`);
      }
    } catch (err) {
      console.error('❌ Error updating booking:', err);
      alert('❌ Failed to update booking status.');
    }
    setUpdating(false);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'confirmed': 'bg-green-100 text-green-700 border-green-200',
      'pending': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'cancelled': 'bg-red-100 text-red-700 border-red-200'
    };
    return badges[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'confirmed': return <CheckCircle size={16} className="text-green-600" />;
      case 'cancelled': return <XCircle size={16} className="text-red-600" />;
      default: return <Clock size={16} className="text-yellow-600" />;
    }
  };

  // Group bookings by user
  const groupedBookings = bookings.reduce((acc, booking) => {
    const key = booking.email || booking.user_id;
    if (!acc[key]) {
      acc[key] = {
        user: {
          id: booking.user_id,
          first_name: booking.first_name,
          second_name: booking.second_name,
          email: booking.email,
          phone: booking.phone
        },
        bookings: []
      };
    }
    acc[key].bookings.push(booking);
    return acc;
  }, {});

  const toggleUser = (email) => {
    setExpandedUser(expandedUser === email ? null : email);
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
          <h1 className="text-2xl font-bold text-gray-800">📋 Booking Management</h1>
          <p className="text-sm text-gray-500">Manage all user bookings - confirm, pending, or cancel user requests</p>
        </div>
        <span className="text-sm bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
          {bookings.length} bookings
        </span>
      </div>

      {Object.keys(groupedBookings).length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.values(groupedBookings).map((group) => (
            <div key={group.user.email} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* User Header - Clickable */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition"
                onClick={() => toggleUser(group.user.email)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                    {group.user.first_name?.[0]}{group.user.second_name?.[0]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {group.user.first_name} {group.user.second_name}
                    </h3>
                    <p className="text-sm text-gray-500">{group.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{group.bookings.length} bookings</span>
                  {expandedUser === group.user.email ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Bookings List - Expandable */}
              {expandedUser === group.user.email && (
                <div className="border-t border-gray-100">
                  {group.bookings.map((booking) => (
                    <div key={booking.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="font-medium text-gray-800">#{booking.id}</span>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(booking.status)} flex items-center gap-1`}>
                              {getStatusIcon(booking.status)}
                              {booking.status || 'Pending'}
                            </span>
                            <span className="text-xs text-gray-400">
                              {booking.booking_type || 'Unknown'}
                            </span>
                            <span className="text-xs text-gray-400">
                              {booking.travel_date || 'N/A'}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600">{booking.item_name || 'Booking'}</span>
                            <span className="text-gray-400">|</span>
                            <span className="text-gray-600">${booking.total_price || 0}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {booking.status === 'pending' && (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, 'confirmed'); }}
                                disabled={updating}
                                className="px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition disabled:opacity-50"
                              >
                                ✅ Confirm
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, 'pending'); }}
                                disabled={updating}
                                className="px-3 py-1.5 text-xs bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition disabled:opacity-50"
                              >
                                ⏳ Pending
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, 'cancelled'); }}
                                disabled={updating}
                                className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
                              >
                                ❌ Cancel
                              </button>
                            </>
                          )}
                          {booking.status === 'confirmed' && (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, 'pending'); }}
                                disabled={updating}
                                className="px-3 py-1.5 text-xs bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition disabled:opacity-50"
                              >
                                ⏳ Pending
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, 'cancelled'); }}
                                disabled={updating}
                                className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition disabled:opacity-50"
                              >
                                ❌ Cancel
                              </button>
                            </>
                          )}
                          {booking.status === 'cancelled' && (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, 'pending'); }}
                                disabled={updating}
                                className="px-3 py-1.5 text-xs bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition disabled:opacity-50"
                              >
                                ⏳ Pending
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); updateStatus(booking.id, 'confirmed'); }}
                                disabled={updating}
                                className="px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition disabled:opacity-50"
                              >
                                ✅ Confirm
                              </button>
                            </>
                          )}
                          <button
                            onClick={(e) => { e.stopPropagation(); setSelectedBooking(booking); setShowModal(true); }}
                            className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                          >
                            <Eye size={14} /> View
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for booking details */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">📋 Booking Details</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* User Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-700 mb-2">👤 User Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-500">Name:</span> {selectedBooking.first_name} {selectedBooking.second_name}</div>
                  <div><span className="text-gray-500">Email:</span> {selectedBooking.email}</div>
                  <div><span className="text-gray-500">Phone:</span> {selectedBooking.phone || 'N/A'}</div>
                  <div><span className="text-gray-500">Booking Date:</span> {new Date(selectedBooking.booking_date).toLocaleDateString()}</div>
                </div>
              </div>

              {/* Booking Info */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-700 mb-2">📋 Booking Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-500">Booking ID:</span> #{selectedBooking.id}</div>
                  <div><span className="text-gray-500">Type:</span> {selectedBooking.booking_type}</div>
                  <div><span className="text-gray-500">Item:</span> {selectedBooking.item_name || 'N/A'}</div>
                  <div><span className="text-gray-500">Travel Date:</span> {selectedBooking.travel_date}</div>
                  <div><span className="text-gray-500">Total Price:</span> ${selectedBooking.total_price || 0}</div>
                  <div><span className="text-gray-500">Status:</span> {selectedBooking.status}</div>
                  <div><span className="text-gray-500">Payment:</span> {selectedBooking.payment_status || 'Pending'}</div>
                  <div><span className="text-gray-500">Travelers:</span> {selectedBooking.number_of_travelers || 1}</div>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-semibold text-gray-700 mb-3">⚡ Actions</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedBooking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                      >
                        ✅ Confirm Booking
                      </button>
                      <button
                        onClick={() => updateStatus(selectedBooking.id, 'pending')}
                        className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"
                      >
                        ⏳ Mark as Pending
                      </button>
                      <button
                        onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                      >
                        ❌ Cancel Booking
                      </button>
                    </>
                  )}
                  {selectedBooking.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => updateStatus(selectedBooking.id, 'pending')}
                        className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"
                      >
                        ⏳ Mark as Pending
                      </button>
                      <button
                        onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                      >
                        ❌ Cancel Booking
                      </button>
                    </>
                  )}
                  {selectedBooking.status === 'cancelled' && (
                    <>
                      <button
                        onClick={() => updateStatus(selectedBooking.id, 'pending')}
                        className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"
                      >
                        ⏳ Mark as Pending
                      </button>
                      <button
                        onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                      >
                        ✅ Confirm Booking
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
