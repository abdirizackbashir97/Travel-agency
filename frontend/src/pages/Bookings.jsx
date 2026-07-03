import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Calendar, MapPin, Eye } from 'lucide-react';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Please login to view bookings');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5002/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        toast.error('Failed to load bookings');
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'confirmed':
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'flight':
        return '✈️';
      case 'hotel':
        return '🏨';
      case 'destination':
        return '🌍';
      case 'tour':
        return '🧳';
      default:
        return '📋';
    }
  };

  const getImageForBooking = (item) => {
    const itemLower = item?.toLowerCase() || '';
    
    // Dubai images
    if (itemLower.includes('dubai') || itemLower.includes('emirates')) {
      return 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&h=150&fit=crop';
    }
    // Paris images
    if (itemLower.includes('paris') || itemLower.includes('eiffel')) {
      return 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=200&h=150&fit=crop';
    }
    // Maldives images
    if (itemLower.includes('maldives')) {
      return 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=200&h=150&fit=crop';
    }
    // London images
    if (itemLower.includes('london') || itemLower.includes('uk')) {
      return 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=200&h=150&fit=crop';
    }
    // Zanzibar images
    if (itemLower.includes('zanzibar')) {
      return 'https://images.unsplash.com/photo-1546184000-e29e2e5e4ad6?w=200&h=150&fit=crop';
    }
    // Bali images
    if (itemLower.includes('bali')) {
      return 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=200&h=150&fit=crop';
    }
    // Kenya / Safari images
    if (itemLower.includes('kenya') || itemLower.includes('safari') || itemLower.includes('maasai')) {
      return 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=200&h=150&fit=crop';
    }
    // Cape Town images
    if (itemLower.includes('cape town') || itemLower.includes('south africa')) {
      return 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=200&h=150&fit=crop';
    }
    // Default images by type
    if (itemLower.includes('flight')) {
      return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=150&fit=crop';
    }
    if (itemLower.includes('hotel')) {
      return 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=150&fit=crop';
    }
    // Default fallback
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Bookings</h1>
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="text-6xl mb-4">📅</div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Bookings Yet</h2>
          <p className="text-gray-500 mb-6">Start planning your next adventure!</p>
          <Link
            to="/destinations"
            className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Toaster position="top-right" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <span className="text-sm text-gray-500">{bookings.length} bookings</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
            {/* Image */}
            <div className="w-full h-32 overflow-hidden">
              <img
                src={getImageForBooking(booking.booking_item)}
                alt={booking.booking_item}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop';
                }}
              />
            </div>
            
            <div className="p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-800 truncate">{booking.booking_item}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{booking.destination_name || booking.location || 'N/A'}</span>
                  </p>
                </div>
                <span className="text-sm ml-2">{getTypeIcon(booking.booking_type)}</span>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${getStatusColor(booking.payment_status)}`}>
                  {booking.payment_status || 'Pending'}
                </span>
                <span className="text-[10px] text-gray-400">•</span>
                <span className="text-[10px] text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {booking.travel_date}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                <span className="text-sm font-bold text-indigo-600">${booking.total_price}</span>
                <Link
                  to={`/booking/${booking.id}`}
                  className="text-indigo-600 hover:text-indigo-800 text-xs font-medium flex items-center gap-1"
                >
                  <Eye className="w-3 h-3" />
                  View
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bookings;
