import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Calendar, CheckCircle, XCircle, Download, Filter, Search, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';

const Payments = () => {
  const [filter, setFilter] = useState('all');

  const payments = [
    {
      id: 'PAY-2024-001',
      bookingId: 'BK-2024-001',
      destination: 'Dubai, UAE',
      amount: 599.00,
      date: 'Dec 20, 2024',
      status: 'Completed',
      method: 'Credit Card',
      type: 'Flight'
    },
    {
      id: 'PAY-2024-002',
      bookingId: 'BK-2024-002',
      destination: 'Paris, France',
      amount: 849.00,
      date: 'Jan 10, 2025',
      status: 'Pending',
      method: 'PayPal',
      type: 'Hotel'
    },
    {
      id: 'PAY-2024-003',
      bookingId: 'BK-2024-003',
      destination: 'Maldives',
      amount: 349.00,
      date: 'Feb 5, 2025',
      status: 'Completed',
      method: 'Credit Card',
      type: 'Tour'
    },
    {
      id: 'PAY-2024-004',
      bookingId: 'BK-2024-004',
      destination: 'London, UK',
      amount: 450.00,
      date: 'Mar 1, 2025',
      status: 'Refunded',
      method: 'Credit Card',
      type: 'Flight'
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Refunded': return 'bg-blue-100 text-blue-700';
      case 'Failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <CheckCircle className="w-4 h-4" />;
      case 'Pending': return <Clock className="w-4 h-4" />;
      case 'Refunded': return <ArrowUpRight className="w-4 h-4" />;
      case 'Failed': return <XCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredPayments = filter === 'all' 
    ? payments 
    : payments.filter(p => p.status.toLowerCase() === filter);

  const totalSpent = payments
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalRefunded = payments
    .filter(p => p.status === 'Refunded')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-500 mt-1">Track and manage all your transactions</p>
        </div>
        <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Spent</p>
          <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
          <p className="text-xs text-gray-400">Across all completed bookings</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Refunded</p>
          <p className="text-2xl font-bold text-gray-900">${totalRefunded.toFixed(2)}</p>
          <p className="text-xs text-gray-400">Refunded transactions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <p className="text-sm text-gray-500">Total Payments</p>
          <p className="text-2xl font-bold text-gray-900">{payments.length}</p>
          <p className="text-xs text-gray-400">All transactions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <div className="flex gap-2">
          {['all', 'completed', 'pending', 'refunded', 'failed'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                filter === filterOption
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex-1"></div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search payments..."
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Payments List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.bookingId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.destination}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">${payment.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 w-fit ${getStatusColor(payment.status)}`}>
                      {getStatusIcon(payment.status)}
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPayments.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <p>No payments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payments;
