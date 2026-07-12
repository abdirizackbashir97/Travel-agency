import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const RecentBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${API_BASE}/bookings`);
        const data = await res.json();
        // data.data contains bookings with user_name from join
        setBookings(data.data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Recent Bookings</h3>
        <p className="text-gray-500 text-sm">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-gray-800 mb-3">Recent Bookings</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-gray-500 border-b">
            <tr>
              <th className="py-2 text-left">ID</th>
              <th className="py-2 text-left">Customer</th>
              <th className="py-2 text-left">Item</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bookings.slice(0, 5).map((b) => (
              <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-2 font-medium text-gray-800">#{b.id}</td>
                <td className="py-2">{b.user_name || 'Unknown'}</td>
                <td className="py-2">{b.booking_item || '-'}</td>
                <td className="py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(b.booking_status)}`}>
                    {b.booking_status || 'pending'}
                  </span>
                </td>
                <td className="py-2 font-medium text-gray-800">${b.total_price || 0}</td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
