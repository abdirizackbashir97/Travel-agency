import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../axiosConfig';
import { Calendar, Globe, DollarSign, Plane, Star, Search, Hotel, Compass, CreditCard, Headphones, MessageCircle, Phone, Heart, TrendingUp, TrendingDown } from 'lucide-react';

export default function UserDashboard() {
  const [userName, setUserName] = useState('Halima');
  const [stats, setStats] = useState({
    totalBookings: 10,
    countriesVisited: 8,
    totalSpent: 4200,
    upcomingTrips: 6,
    points: 1250
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        
        if (!token) {
          console.error('❌ No token found! Please login again.');
          setLoading(false);
          return;
        }
        
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        if (userData.first_name) setUserName(userData.first_name);
        
        const response = await api.get('/api/user/bookings');
        
        if (response.data.success) {
          const bookings = response.data.bookings || [];
          setRecentBookings(bookings.slice(0, 5));
          setStats({
            totalBookings: bookings.length || 10,
            countriesVisited: 8,
            totalSpent: bookings.reduce((sum, b) => sum + (b.total_price || 0), 0) || 4200,
            upcomingTrips: bookings.filter(b => b.status === 'pending').length || 6,
            points: 1250
          });
        }
        setLoading(false);
      } catch (err) {
        console.error('❌ Error fetching dashboard data:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { 
      icon: Calendar, 
      title: 'Total Bookings', 
      value: stats.totalBookings, 
      change: '+20%', 
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    { 
      icon: Globe, 
      title: 'Countries Visited', 
      value: stats.countriesVisited, 
      change: '+12%', 
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      icon: DollarSign, 
      title: 'Total Spent', 
      value: `$${stats.totalSpent.toLocaleString()}`, 
      change: '+18%', 
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      icon: Plane, 
      title: 'Upcoming Trips', 
      value: stats.upcomingTrips, 
      change: 'View details', 
      iconColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    { 
      icon: Star, 
      title: 'SkyRoute Points', 
      value: stats.points, 
      change: '+5%', 
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
  ];

  const quickActions = [
    { icon: Search, label: 'Search Flights', color: 'bg-blue-500', path: '/flights' },
    { icon: Hotel, label: 'Find Hotels', color: 'bg-green-500', path: '/hotels' },
    { icon: Compass, label: 'Explore Tours', color: 'bg-purple-500', path: '/tours' },
    { icon: Calendar, label: 'My Bookings', color: 'bg-orange-500', path: '/dashboard/bookings' },
    { icon: CreditCard, label: 'Make Payment', color: 'bg-indigo-500', path: '/dashboard/payments' },
    { icon: Headphones, label: 'Contact Support', color: 'bg-pink-500', path: '/dashboard/help' },
  ];

  const popularDestinations = [
    { name: 'Bali', country: 'Indonesia', rating: 4.8, price: 450, image: '🏝️' },
    { name: 'Paris', country: 'France', rating: 4.7, price: 580, image: '🗼' },
    { name: 'Dubai', country: 'UAE', rating: 4.6, price: 380, image: '🌆' },
    { name: 'Santorini', country: 'Greece', rating: 4.9, price: 520, image: '🌅' },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-64"></div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome Back, {userName}! 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your travels.</p>
      </div>

      {/* Stats Cards - White Cards with Colored Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${card.bgColor}`}>
                  <Icon size={20} className={card.iconColor} />
                </div>
                <span className="text-xs font-medium text-green-600">{card.change}</span>
              </div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500 mt-1">{card.title}</p>
            </div>
          );
        })}
      </div>

      {/* Upcoming Trip Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Trip</h2>
              <p className="text-sm text-gray-500">In 12 days</p>
            </div>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm rounded-full font-medium">
              🛫 Direct
            </span>
          </div>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center text-2xl">
                🌅
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Santorini, Greece</h3>
                <p className="text-sm text-gray-500">25 May – 01 Jun 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-6 ml-auto">
              <div className="text-center">
                <p className="text-xs text-gray-400">From</p>
                <p className="font-semibold text-gray-800">JFK</p>
                <p className="text-xs text-gray-500">New York</p>
                <p className="text-sm font-bold text-indigo-600">10:30 AM</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">⏱️</p>
                <p className="text-sm font-medium text-gray-600">8h 20m</p>
                <p className="text-xs text-gray-500">Direct</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-400">To</p>
                <p className="font-semibold text-gray-800">JTR</p>
                <p className="text-xs text-gray-500">Santorini</p>
                <p className="text-sm font-bold text-indigo-600">01:50 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Bookings</h2>
          <Link to="/dashboard/bookings" className="text-sm text-indigo-600 hover:underline">View all</Link>
        </div>
        <div className="space-y-3">
          {recentBookings.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No bookings yet. Start your journey!</p>
          ) : (
            recentBookings.map((booking, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div>
                  <p className="font-medium text-gray-800">{booking.item_name || 'Booking'}</p>
                  <p className="text-sm text-gray-500">{new Date(booking.booking_date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {booking.status || 'Pending'}
                  </span>
                  <button className="text-sm text-indigo-600 hover:underline">View Details</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.path}
              className={`${action.color} text-white p-4 rounded-2xl text-center hover:scale-105 transition-transform shadow-lg`}
            >
              <Icon size={28} className="mx-auto mb-2" />
              <p className="text-sm font-medium">{action.label}</p>
            </Link>
          );
        })}
      </div>

      {/* Popular Destinations */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularDestinations.map((dest, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition group cursor-pointer">
              <div className="relative h-40 bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-6xl group-hover:scale-105 transition">
                {dest.image}
                <button className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white transition">
                  <Heart size={16} className="text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{dest.name}</h3>
                <p className="text-sm text-gray-500">{dest.country}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{dest.rating}</span>
                  </div>
                  <p className="text-sm font-bold text-indigo-600">${dest.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Need Help */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🆘</div>
            <div>
              <h3 className="font-semibold text-gray-800">Need Help?</h3>
              <p className="text-sm text-gray-500">Our support team is here for you 24/7</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <MessageCircle size={18} className="text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Live Chat</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Email Support</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <Phone size={18} className="text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Phone Support</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
