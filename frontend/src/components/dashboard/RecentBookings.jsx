import React from 'react';

const bookings = [
  { id: '#BK1258', customer: 'John Smith', destination: 'Paris, France', flight: 'SV 245', hotel: 'Hilton Paris', date: 'Jul 10, 2025', status: 'Confirmed', amount: '$1,250' },
  { id: '#BK1257', customer: 'Emily Johnson', destination: 'Bali, Indonesia', flight: 'GA 628', hotel: 'The Apurva', date: 'Jul 09, 2025', status: 'Pending', amount: '$980' },
  { id: '#BK1256', customer: 'Michael Brown', destination: 'Dubai, UAE', flight: 'EK 203', hotel: 'Burj Al Arab', date: 'Jul 09, 2025', status: 'Confirmed', amount: '$1,890' },
  { id: '#BK1255', customer: 'Sarah Davis', destination: 'Tokyo, Japan', flight: 'NH 684', hotel: 'Park Hyatt', date: 'Jul 08, 2025', status: 'Cancelled', amount: '$750' },
  { id: '#BK1254', customer: 'David Wilson', destination: 'New York, USA', flight: 'AA 100', hotel: 'Marriott NYC', date: 'Jul 08, 2025', status: 'Confirmed', amount: '$1,120' },
];

const RecentBookings = () => {
  const getStatusColor = (status) => {
    const colors = {
      Confirmed: 'bg-green-100 text-green-800',
      Pending: 'bg-yellow-100 text-yellow-800',
      Cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 col-span-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Bookings</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Destination</th>
              <th className="px-4 py-3 text-left">Flight</th>
              <th className="px-4 py-3 text-left">Hotel</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, idx) => (
              <tr key={idx} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-800 font-medium">{booking.id}</td>
                <td className="px-4 py-3 text-gray-700">{booking.customer}</td>
                <td className="px-4 py-3 text-gray-700">{booking.destination}</td>
                <td className="px-4 py-3 text-gray-700">{booking.flight}</td>
                <td className="px-4 py-3 text-gray-700">{booking.hotel}</td>
                <td className="px-4 py-3 text-gray-500">{booking.date}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700 font-medium">{booking.amount}</td>
                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:text-blue-800">☑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookings;
