import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plane, Hotel, MapPin, ArrowRight, Clock, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

const Bookings = () => {
  const [filter, setFilter] = useState('all');

  const bookings = [
    {
      id: 'BK-2024-001',
      type: 'Flight',
      destination: 'Dubai, UAE',
      date: 'Dec 25, 2024',
      amount: '$599.00',
      status: 'Confirmed',
      image: '/images/destinations/dubai.png'
    },
    {
      id: 'BK-2024-002',
      type: 'Hotel',
      destination: 'Paris, France',
      date: 'Jan 15, 2025',
      amount: '$849.00',
      status: 'Pending',
      image: '/images/destinations/paris.png'
    },
    {
      id: 'BK-2024-003',
      type: 'Tour',
      destination: 'Maldives',
      date: 'Feb 10, 2025',
      amount: '$349.00',
      status: 'Completed',
      image: '/images/destinations/maldives.png'
    },
    {
      id: 'BK-2024-004',
      type: 'Flight',
      destination: 'London, UK',
      date: 'Mar 5, 2025',
      amount: '$450.00',
      status: 'Cancelled',
      image: '/images/destinations/london.png'
    },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Completed': return 'bg-blue-100 text-blue-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Flight': return <Plane className="w-4 h-4" />;
      case 'Hotel': return <Hotel className="w-4 h-4" />;
      case 'Tour': return <MapPin className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status.toLowerCase() === filter);

  const stats = [
    { label: 'Total', value: bookings.length, color: 'text-gray-600' },
    { label: 'Upcoming', value: bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending').length, color: 'text-blue-600' },
    { label: 'Completed', value: bookings.filter(b => b.status === 'Completed').length, color: 'text-green-600' },
    { label: 'Cancelled', value: bookings.filter(b => b.status === 'Cancelled').length, color: 'text-red-600' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="text-gray-500 mt-1">Manage all your travel bookings in one place</p>
        </div>
        <Link to="/" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Book New Trip
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold ${stat.color}">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((filterOption) => (
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

      {/* Bookings List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredBookings.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No bookings found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={booking.image}
                      alt={booking.destination}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{booking.destination}</h3>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            {getTypeIcon(booking.type)}
                            {booking.type}
                          </span>
                          <span className="text-gray-300">|</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {booking.date}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-600">{booking.amount}</p>
                        <p className="text-xs text-gray-400">{booking.id}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/booking/${booking.id}`}
                    className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
