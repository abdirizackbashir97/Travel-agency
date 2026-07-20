import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Plane, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Clock, 
  MapPin,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Eye,
  CreditCard,
  Shield,
  Ticket,
  Download,
  Send
} from 'lucide-react';

export default function AdminFlightBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    seat_number: '',
    visa_verified: false,
    visa_number: '',
    passport_number: '',
    status: 'pending',
    payment_status: 'pending'
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/admin/flight-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setBookings(response.data.bookings || []);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching flight bookings:', err);
      setLoading(false);
    }
  };

  const handleUpdate = async (bookingId) => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:5000/api/admin/flight-booking/${bookingId}/status`,
        {
          status: formData.status,
          seat_number: formData.seat_number,
          visa_verified: formData.visa_verified ? 1 : 0
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ Booking updated successfully!');
      setShowModal(false);
      fetchBookings();
    } catch (err) {
      console.error('Error updating booking:', err);
      alert('❌ Failed to update booking');
    }
    setUpdating(false);
  };

  const handleMpesaPayment = async (bookingId, phone, amount) => {
    if (!window.confirm(`Process M-Pesa payment of $${amount} for booking #${bookingId}?`)) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      await axios.post(
        'http://localhost:5000/api/payment/mpesa',
        {
          booking_id: bookingId,
          phone_number: phone,
          amount: amount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('✅ M-Pesa payment processed successfully!');
      fetchBookings();
    } catch (err) {
      console.error('Payment error:', err);
      alert('❌ Payment failed');
    }
  };

  const openModal = (booking) => {
    setSelectedBooking(booking);
    setFormData({
      seat_number: booking.seat_number || '',
      visa_verified: booking.visa_verified || false,
      visa_number: booking.visa_number || '',
      passport_number: booking.passport_number || '',
      status: booking.status || 'pending',
      payment_status: booking.payment_status || 'pending'
    });
    setShowModal(true);
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
      default: return <ClockIcon size={16} className="text-yellow-600" />;
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
          <h1 className="text-2xl font-bold text-gray-800">✈️ Flight Bookings</h1>
          <p className="text-sm text-gray-500">Manage all flight bookings, verify visas, and process payments</p>
        </div>
        <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
          {bookings.length} bookings
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Plane size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No flight bookings found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="font-bold text-gray-800 text-lg">#{booking.id}</span>
                    <span className={`px-3 py-1 text-xs rounded-full border ${getStatusBadge(booking.status)} flex items-center gap-1`}>
                      {getStatusIcon(booking.status)}
                      {booking.status || 'Pending'}
                    </span>
                    <span className={`px-3 py-1 text-xs rounded-full border ${
                      booking.payment_status === 'paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                    }`}>
                      {booking.payment_status === 'paid' ? '✅ Paid' : '⏳ Pending Payment'}
                    </span>
                  </div>

                  {/* Flight Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-blue-50/50 rounded-xl p-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500">Airline</p>
                      <p className="font-semibold text-gray-800">{booking.airline}</p>
                      <p className="text-sm text-gray-600">Flight #{booking.flight_number}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Route</p>
                      <p className="font-semibold text-gray-800">{booking.departure_city} → {booking.arrival_city}</p>
                      <p className="text-sm text-gray-600">{booking.departure_time}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Seat / Visa</p>
                      <p className="font-semibold text-gray-800">
                        {booking.seat_number || 'Not assigned'} 
                        {booking.visa_verified && <span className="ml-2 text-green-600 text-sm">✅ Visa Verified</span>}
                      </p>
                    </div>
                  </div>

                  {/* User Details */}
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

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => openModal(booking)}
                    className="flex items-center gap-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                  >
                    <Eye size={16} /> Manage
                  </button>
                  {booking.payment_status !== 'paid' && (
                    <button
                      onClick={() => handleMpesaPayment(booking.id, booking.phone, booking.total_price)}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition"
                    >
                      <CreditCard size={16} /> M-Pesa
                    </button>
                  )}
                  {booking.seat_number && (
                    <button
                      onClick={() => alert(`Ticket for #${booking.id} downloaded`)}
                      className="flex items-center gap-1 px-3 py-2 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition"
                    >
                      <Download size={16} /> Ticket
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-bold text-gray-800">✈️ Manage Booking #{selectedBooking.id}</h2>
                <p className="text-sm text-gray-500">{selectedBooking.airline} - {selectedBooking.flight_number}</p>
              </div>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* User Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-700 mb-2">👤 Passenger Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-500">Name:</span> {selectedBooking.first_name} {selectedBooking.second_name}</div>
                  <div><span className="text-gray-500">Email:</span> {selectedBooking.email}</div>
                  <div><span className="text-gray-500">Phone:</span> {selectedBooking.phone || 'N/A'}</div>
                  <div><span className="text-gray-500">Travel Date:</span> {selectedBooking.travel_date}</div>
                </div>
              </div>

              {/* Flight Info */}
              <div className="bg-blue-50 rounded-xl p-4">
                <h3 className="font-semibold text-gray-700 mb-2">✈️ Flight Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div><span className="text-gray-500">Airline:</span> {selectedBooking.airline}</div>
                  <div><span className="text-gray-500">Flight:</span> {selectedBooking.flight_number}</div>
                  <div><span className="text-gray-500">From:</span> {selectedBooking.departure_city}</div>
                  <div><span className="text-gray-500">To:</span> {selectedBooking.arrival_city}</div>
                  <div><span className="text-gray-500">Departure:</span> {selectedBooking.departure_time}</div>
                  <div><span className="text-gray-500">Arrival:</span> {selectedBooking.arrival_time}</div>
                </div>
              </div>

              {/* Management Form */}
              <div className="border-t border-gray-100 pt-4">
                <h3 className="font-semibold text-gray-700 mb-3">📋 Booking Management</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seat Number</label>
                    <input
                      type="text"
                      value={formData.seat_number}
                      onChange={(e) => setFormData({...formData, seat_number: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                      placeholder="e.g., 12A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    >
                      <option value="pending">⏳ Pending</option>
                      <option value="confirmed">✅ Confirm</option>
                      <option value="cancelled">❌ Cancel</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.visa_verified}
                      onChange={(e) => setFormData({...formData, visa_verified: e.target.checked})}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Visa Verified
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={formData.payment_status === 'paid'}
                      onChange={(e) => setFormData({
                        ...formData, 
                        payment_status: e.target.checked ? 'paid' : 'pending'
                      })}
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    Payment Received
                  </label>
                </div>
                <button
                  onClick={() => handleUpdate(selectedBooking.id)}
                  disabled={updating}
                  className="mt-4 w-full bg-blue-600 text-white py-2.5 rounded-xl hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                >
                  {updating ? '⏳ Updating...' : '💾 Update Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
