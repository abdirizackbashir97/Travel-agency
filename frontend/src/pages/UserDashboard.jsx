import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Plane, Hotel, Calendar, Heart, Bell, 
  ArrowRight, User, LogOut, Settings,
  CreditCard, MapPin, Star, Clock,
  CheckCircle, AlertCircle, Car, Shield,
  Tag, TrendingUp, Award, Compass
} from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleBookTrip = () => {
    // Navigate to booking page
    navigate('/booking');
  };

  const upcomingTrips = [
    { id: 1, destination: 'Bali, Indonesia', date: '20 Jun - 27 Jun, 2026', travelers: '2 Adults', status: 'Confirmed' },
    { id: 2, destination: 'Paris, France', date: '15 Jul - 22 Jul, 2026', travelers: '2 Adults', status: 'Pending' },
    { id: 3, destination: 'Dubai, UAE', date: '10 Aug - 15 Aug, 2026', travelers: '3 Adults', status: 'Confirmed' },
    { id: 4, destination: 'Maldives', date: '05 Sep - 12 Sep, 2026', travelers: '2 Adults', status: 'Cancelled' },
  ];

  const popularDestinations = [
    { name: 'Santorini', country: 'Greece', rating: 4.8, price: 599, image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=300&h=200&fit=crop' },
    { name: 'Switzerland', country: 'Switzerland', rating: 4.9, price: 799, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=300&h=200&fit=crop' },
    { name: 'Kyoto', country: 'Japan', rating: 4.7, price: 699, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=300&h=200&fit=crop' },
    { name: 'New York', country: 'USA', rating: 4.6, price: 499, image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=300&h=200&fit=crop' },
  ];

  const recentActivities = [
    { action: 'Flight booked to Bali, Indonesia', date: '2 May 2026, 10:30 AM' },
    { action: 'Payment of $1,200 completed', date: '2 May 2026, 09:15 AM' },
    { action: 'Hotel reserved in Bali', date: '1 May 2026, 04:45 PM' },
    { action: 'Trip to Singapore completed', date: '28 Apr 2026, 11:20 AM' },
  ];

  const quickActions = [
    { icon: Plane, label: 'Book Flight', color: 'text-blue-500' },
    { icon: Hotel, label: 'Book Hotel', color: 'text-green-500' },
    { icon: Car, label: 'Rent Car', color: 'text-purple-500' },
    { icon: Shield, label: 'Insurance', color: 'text-orange-500' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'text-green-600 bg-green-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      case 'Cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-2xl p-8 mb-8 text-white">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.firstName || 'Halima'}!</h1>
            <p className="text-blue-50 mt-1 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Premium Member
            </p>
            <p className="text-blue-100 mt-3">Discover your next adventure with exclusive travel offers.</p>
            <button 
              onClick={handleBookTrip}
              className="mt-4 px-6 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Book Your Trip
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleLogout}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Trips */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Upcoming Trips</h3>
              <Link to="/bookings" className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium">Destination</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Travelers</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {upcomingTrips.map((trip) => (
                    <tr key={trip.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-medium text-gray-900">{trip.destination}</td>
                      <td className="py-3 text-gray-500">{trip.date}</td>
                      <td className="py-3 text-gray-500">{trip.travelers}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusColor(trip.status)}`}>
                          {trip.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Popular Destinations */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Popular Destinations</h3>
              <Link to="/destinations" className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {popularDestinations.map((dest, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50 transition-colors group">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{dest.name}</h4>
                    <p className="text-sm text-gray-400">{dest.country}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-yellow-500 flex items-center gap-0.5">
                        <Star className="w-3 h-3 fill-yellow-500" />
                        {dest.rating}
                      </span>
                      <span className="text-xs font-medium text-blue-600">From ${dest.price}</span>
                    </div>
                  </div>
                  <button className="text-xs text-blue-500 hover:text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="lg:col-span-1 space-y-6">
          {/* Travel Progress */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">Travel Progress</h3>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    className="text-gray-100"
                    strokeWidth="8"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                  />
                  <circle
                    className="text-blue-500"
                    strokeWidth="8"
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="56"
                    cx="64"
                    cy="64"
                    strokeDasharray={`${(72 / 100) * 352} 352`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-blue-600">72%</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">Annual Travel Goal</p>
              <p className="text-xs text-gray-400 mt-1">Keep exploring the world!</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center group"
                    onClick={() => {
                      if (action.label === 'Book Flight') {
                        navigate('/booking');
                      } else if (action.label === 'Book Hotel') {
                        navigate('/hotels');
                      }
                    }}
                  >
                    <Icon className={`w-6 h-6 ${action.color} mx-auto mb-1 group-hover:scale-110 transition-transform`} />
                    <span className="text-xs text-gray-600">{action.label}</span>
                  </button>
                );
              })}
              <button className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center group col-span-2">
                <span className="text-xs text-gray-600">Contact Support</span>
              </button>
            </div>
          </div>

          {/* Summer Deal */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl p-5 text-white">
            <Tag className="w-6 h-6 mb-2" />
            <h4 className="font-bold text-lg">Summer Vacation Deals</h4>
            <p className="text-2xl font-bold">Up to <span className="text-yellow-300">40% OFF</span></p>
            <button className="mt-3 px-4 py-1.5 bg-white text-blue-600 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1">
              Explore Deals <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity - Full Width */}
      <div className="mt-6 bg-white rounded-xl border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Recent Activity</h3>
          <span className="text-xs text-gray-400">Your latest travel actions</span>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm text-gray-700">{activity.action}</span>
              </div>
              <span className="text-xs text-gray-400">{activity.date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-gray-400 border-t border-gray-200 pt-4">
        <span className="text-blue-600 font-medium">Safe</span> · 
        <span className="text-green-600 font-medium">Secure</span> · 
        <span className="text-purple-600 font-medium">Trusted</span>
      </div>
    </div>
  );
};

export default UserDashboard;
