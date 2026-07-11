import React, { useState } from 'react';
import { FaSearch, FaCheck, FaTimes, FaEye } from 'react-icons/fa';

const AdminBookings = () => {
  const [bookings, setBookings] = useState([
    { id: '#BK1258', customer: 'John Smith', destination: 'Paris', status: 'Confirmed', amount: '$1,250', date: '2025-07-10' },
    { id: '#BK1257', customer: 'Emily Johnson', destination: 'Bali', status: 'Pending', amount: '$980', date: '2025-07-09' },
    { id: '#BK1256', customer: 'Michael Brown', destination: 'Dubai', status: 'Cancelled', amount: '$1,890', date: '2025-07-09' },
  ]);
  const [search, setSearch] = useState('');

  const filtered = bookings.filter(b =>
    b.customer.toLowerCase().includes(search.toLowerCase()) ||
    b.id.includes(search)
  );

  const updateStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Bookings Management</h2>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-sm text-gray-500">Total: {filtered.length} bookings</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Customer</th>
                <th className="px-4 py-3 text-left">Destination</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Amount</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{b.id}</td>
                  <td className="px-4 py-3">{b.customer}</td>
                  <td className="px-4 py-3">{b.destination}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      b.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      b.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{b.amount}</td>
                  <td className="px-4 py-3 text-gray-500">{b.date}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => updateStatus(b.id, 'Confirmed')} className="text-green-600 hover:text-green-800" title="Approve"><FaCheck /></button>
                    <button onClick={() => updateStatus(b.id, 'Cancelled')} className="text-red-600 hover:text-red-800" title="Cancel"><FaTimes /></button>
                    <button className="text-blue-600 hover:text-blue-800" title="View"><FaEye /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
