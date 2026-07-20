import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Calendar, Users, Plane, Hotel, Compass, CreditCard, 
  Star, Search, Heart, DollarSign, Award,
  ChevronRight, ChevronUp, ArrowRight,
  TrendingUp, TrendingDown, BarChart3, Activity, ThumbsUp, Shield
} from 'lucide-react';

export default function AdminDashboard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [stats, setStats] = useState({
    total_bookings: 0,
    total_users: 0,
    total_flights: 0,
    total_hotels: 0,
    revenue: 0,
    total_reviews: 0
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      
      const statsResponse = await axios.get('http://localhost:5000/api/admin/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (statsResponse.data.success) {
        setStats(statsResponse.data.stats);
      }

      const bookingsResponse = await axios.get('http://localhost:5000/api/admin/recent-bookings', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (bookingsResponse.data.success) {
        setRecentBookings(bookingsResponse.data.bookings || []);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setLoading(false);
    }
  };

  const statCards = [
    { icon: Calendar, title: 'Total Bookings', value: stats.total_bookings, change: '+12%', iconColor: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { icon: Users, title: 'Total Users', value: stats.total_users, change: '+8%', iconColor: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: Plane, title: 'Flights', value: stats.total_flights, change: '+5%', iconColor: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: Hotel, title: 'Hotels', value: stats.total_hotels, change: '+3%', iconColor: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: DollarSign, title: 'Revenue', value: `$${stats.revenue.toLocaleString()}`, change: '+15%', iconColor: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { icon: Award, title: 'Reviews', value: stats.total_reviews, change: '+22%', iconColor: 'text-pink-600', bgColor: 'bg-pink-50' },
  ];

  // Trust metrics cards (white)
  const trustMetrics = [
    { icon: ThumbsUp, title: 'Satisfaction Score', value: '92%', subtitle: 'Very satisfied users', iconColor: 'text-green-600', bgColor: 'bg-green-50' },
    { icon: Shield, title: 'Trust Score', value: '88%', subtitle: 'Users trust SkyRoute', iconColor: 'text-blue-600', bgColor: 'bg-blue-50' },
    { icon: Users, title: 'Active Users', value: '78', subtitle: 'Last 30 days', iconColor: 'text-purple-600', bgColor: 'bg-purple-50' },
    { icon: TrendingUp, title: 'User Growth', value: '+23%', subtitle: 'This month', iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { icon: Activity, title: 'Engagement Rate', value: '76%', subtitle: 'Users actively engaging', iconColor: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const primaryActions = [
    { icon: Search, label: 'Search Flights', path: '/flights' },
    { icon: Hotel, label: 'Find Hotels', path: '/hotels' },
    { icon: Compass, label: 'Explore Tours', path: '/tours' },
  ];

  const secondaryActions = [
    { icon: Calendar, label: 'My Bookings', path: '/dashboard/bookings' },
    { icon: CreditCard, label: 'Make Payment', path: '/dashboard/payments' },
    { icon: Star, label: 'Contact Support', path: '/dashboard/help' },
  ];

  const destinations = [
    { name: 'Bali', country: 'Indonesia', rating: 4.8, price: 450, image: '🏝️' },
    { name: 'Paris', country: 'France', rating: 4.7, price: 480, image: '🗼' },
    { name: 'Dubai', country: 'UAE', rating: 4.6, price: 580, image: '🌆' },
    { name: 'Santorini', country: 'Greece', rating: 4.9, price: 380, image: '🌅' },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">📊 Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Cards - ALL WHITE */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition">
              <div className="p-2 rounded-lg w-fit mb-2" style={{ backgroundColor: stat.bgColor.replace('bg-', '').replace('-50', '') + '10' }}>
                <Icon size={16} className={stat.iconColor} />
              </div>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.title}</p>
              <span className="text-xs text-green-600 font-medium">{stat.change}</span>
            </div>
          );
        })}
      </div>

      {/* Trust Metrics - ALL WHITE CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {trustMetrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-3 mb-1">
                <div className={`p-1.5 ${metric.bgColor} rounded-lg`}>
                  <Icon size={14} className={metric.iconColor} />
                </div>
                <span className="text-[10px] font-medium text-green-600">{metric.change || ''}</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{metric.value}</p>
              <p className="text-xs text-gray-500">{metric.title}</p>
              <p className="text-[10px] text-gray-400 mt-0.5">{metric.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">📋 Recent Bookings</h2>
          <Link to="/admin/bookings" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {recentBookings.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent bookings</p>
        ) : (
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div>
                  <p className="font-medium text-gray-800">
                    {booking.first_name} {booking.second_name}
                  </p>
                  <p className="text-sm text-gray-500">{booking.booking_type || 'Booking'} - {booking.travel_date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    {booking.status || 'Pending'}
                  </span>
                  <span className="text-sm font-semibold text-gray-700">${booking.total_price || 0}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 mb-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">⚡ Quick Actions</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition"
          >
            {isExpanded ? 'Show Less' : 'See More'}
            {isExpanded ? <ChevronUp size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {primaryActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <Link
                key={i}
                to={action.path}
                className="group bg-white border border-gray-200 rounded-xl p-3.5 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
                    <Icon size={18} className="text-blue-600 group-hover:text-blue-700" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-32 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-gray-100">
            {secondaryActions.map((action, i) => {
              const Icon = action.icon;
              return (
                <Link
                  key={i}
                  to={action.path}
                  className="group bg-white border border-gray-200 rounded-xl p-3.5 hover:border-blue-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
                      <Icon size={18} className="text-blue-600 group-hover:text-blue-700" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">{action.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-900">📍 Popular Destinations</h2>
          <Link to="/destinations" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {destinations.map((dest, i) => (
            <div key={i} className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-4xl flex-shrink-0">
                {dest.image}
              </div>
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{dest.name}</h3>
                      <p className="text-xs text-gray-500">{dest.country}</p>
                    </div>
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                      <Heart size={16} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium">{dest.rating}</span>
                  </div>
                  <p className="text-sm font-bold text-blue-600">${dest.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
