import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, Plane, Hotel, Compass, User, Mail, Phone,
  CheckCircle, XCircle, Clock, Eye, Edit, RefreshCw,
  Search, Filter, ChevronLeft, ChevronRight
} from 'lucide-react';

export default function AdminBookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

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
      setShowModal(false);
    } catch (err) {
      console.error('Error updating booking:', err);
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

  const getBookingTypeIcon = (type) => {
    switch(type) {
      case 'flight': return <Plane size={18} className="text-blue-500" />;
      case 'hotel': return <Hotel size={18} className="text-green-500" />;
      case 'tour': return <Compass size={18} className="text-purple-500" />;
      default: return <Calendar size={18} className="text-gray-500" />;
    }
  };

  const getStatusActions = (booking) => {
    if (booking.status === 'pending') {
      return (
        <>
          <button
            onClick={() => updateStatus(booking.id, 'confirmed')}
            disabled={updating}
            className="px-3 py-1.5 text-xs bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition disabled:opacity-50 flex items-center gap-1"
          >
            <CheckCircle size={14} /> Confirm
          </button>
          <button
            onClick={() => updateStatus(booking.id, 'cancelled')}
            disabled={updating}
            className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition disabled:opacity-50 flex items-center gap-1"
          >
            <XCircle size={14} /> Cancel
          </button>
        </>
      );
    }
    if (booking.status === 'confirmed') {
      return (
        <button
          onClick={() => updateStatus(booking.id, 'cancelled')}
          disabled={updating}
          className="px-3 py-1.5 text-xs bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition disabled:opacity-50 flex items-center gap-1"
        >
          <XCircle size={14} /> Cancel
        </button>
      );
    }
    if (booking.status === 'cancelled') {
      return (
        <button
          onClick={() => updateStatus(booking.id, 'pending')}
          disabled={updating}
          className="px-3 py-1.5 text-xs bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition disabled:opacity-50 flex items-center gap-1"
        >
          <RefreshCw size={14} /> Reopen
        </button>
      );
    }
    return null;
  };

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.second_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.id?.toString().includes(searchTerm);
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);

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
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">📋 Booking Management</h1>
          <p className="text-sm text-gray-500">Manage all bookings, confirm or cancel user requests</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            {filteredBookings.length} bookings
          </span>
          <button
            onClick={fetchBookings}
            className="px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex-1 min-w-[200px] relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or booking ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">All Status</option>
          <option value="pending">⏳ Pending</option>
          <option value="confirmed">✅ Confirmed</option>
          <option value="cancelled">❌ Cancelled</option>
        </select>
      </div>

      {/* Bookings Table */}
      {currentBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Calendar size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No bookings found</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getBookingTypeIcon(booking.booking_type)}
                        <div>
                          <p className="font-medium text-gray-800">#{booking.id}</p>
                          <p className="text-xs text-gray-400">{new Date(booking.booking_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-800">{booking.first_name} {booking.second_name}</p>
                        <p className="text-xs text-gray-400">{booking.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm text-gray-700">{booking.item_name || 'Booking'}</p>
                        <p className="text-xs text-gray-400">${booking.total_price || 0}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusBadge(booking.status)} flex items-center gap-1 w-fit`}>
                        {getStatusIcon(booking.status)}
                        {booking.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {getStatusActions(booking)}
                        <button
                          onClick={() => {
                            setSelectedBooking(booking);
                            setShowModal(true);
                          }}
                          className="px-3 py-1.5 text-xs bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition flex items-center gap-1"
                        >
                          <Eye size={14} /> View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Showing {indexOfFirstBooking + 1} to {Math.min(indexOfLastBooking, filteredBookings.length)} of {filteredBookings.length}
              </p>
              <div className="flex gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={16} />
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-lg text-sm ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal for booking details */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
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
                  <div><span className="text-gray-500">Travel Date:</span> {selectedBooking.travel_date}</div>
                  <div><span className="text-gray-500">Total Price:</span> ${selectedBooking.total_price || 0}</div>
                  <div><span className="text-gray-500">Status:</span> {selectedBooking.status}</div>
                  <div><span className="text-gray-500">Payment:</span> {selectedBooking.payment_status || 'Pending'}</div>
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
                        onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                      >
                        ❌ Cancel Booking
                      </button>
                    </>
                  )}
                  {selectedBooking.status === 'confirmed' && (
                    <button
                      onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                      className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                    >
                      ❌ Cancel Booking
                    </button>
                  )}
                  {selectedBooking.status === 'cancelled' && (
                    <button
                      onClick={() => updateStatus(selectedBooking.id, 'pending')}
                      className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition font-medium"
                    >
                      🔄 Reopen Booking
                    </button>
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
