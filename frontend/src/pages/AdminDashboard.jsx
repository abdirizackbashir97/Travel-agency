import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total_destinations: 0,
    total_hotels: 0,
    total_flights: 0,
    total_tours: 0,
    total_bookings: 0,
    total_users: 0
  });
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (userData.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    
    setUser(userData);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsRes = await fetch('http://localhost:5002/api/stats');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // Fetch destinations
      const destRes = await fetch('http://localhost:5002/api/destinations');
      if (destRes.ok) {
        const destData = await destRes.json();
        setDestinations(Array.isArray(destData) ? destData : []);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: 'Destinations', value: stats.total_destinations || 0, icon: '🌍', color: 'from-blue-500 to-blue-600' },
    { title: 'Hotels', value: stats.total_hotels || 0, icon: '🏨', color: 'from-green-500 to-green-600' },
    { title: 'Flights', value: stats.total_flights || 0, icon: '✈️', color: 'from-purple-500 to-purple-600' },
    { title: 'Tours', value: stats.total_tours || 0, icon: '🧳', color: 'from-orange-500 to-orange-600' },
    { title: 'Bookings', value: stats.total_bookings || 0, icon: '📅', color: 'from-pink-500 to-pink-600' },
    { title: 'Users', value: stats.total_users || 0, icon: '👤', color: 'from-indigo-500 to-indigo-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <span className="text-2xl">✈️</span>
              <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, <span className="font-semibold">{user?.firstName || 'Admin'}</span>
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-r ${stat.color} rounded-xl p-4 text-white shadow-lg`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-90">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <Link to="/admin/destinations" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center border border-gray-100">
            <div className="text-2xl mb-1">🌍</div>
            <p className="text-xs font-medium text-gray-700">Destinations</p>
          </Link>
          <Link to="/admin/hotels" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center border border-gray-100">
            <div className="text-2xl mb-1">🏨</div>
            <p className="text-xs font-medium text-gray-700">Hotels</p>
          </Link>
          <Link to="/admin/flights" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center border border-gray-100">
            <div className="text-2xl mb-1">✈️</div>
            <p className="text-xs font-medium text-gray-700">Flights</p>
          </Link>
          <Link to="/admin/tours" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center border border-gray-100">
            <div className="text-2xl mb-1">🧳</div>
            <p className="text-xs font-medium text-gray-700">Tours</p>
          </Link>
          <Link to="/admin/bookings" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center border border-gray-100">
            <div className="text-2xl mb-1">📅</div>
            <p className="text-xs font-medium text-gray-700">Bookings</p>
          </Link>
          <Link to="/admin/users" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition text-center border border-gray-100">
            <div className="text-2xl mb-1">👤</div>
            <p className="text-xs font-medium text-gray-700">Users</p>
          </Link>
        </div>
      </div>

      {/* Recent Destinations */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-800">Recent Destinations</h3>
            <Link
              to="/admin/destinations"
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
            >
              + Add Destination
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {destinations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No destinations found. Add your first destination!
                    </td>
                  </tr>
                ) : (
                  destinations.slice(0, 10).map((dest) => (
                    <tr key={dest.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900">{dest.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{dest.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dest.country}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-700">
                          {dest.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">${dest.price_per_night}</td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button className="text-indigo-600 hover:text-indigo-800 font-medium">Edit</button>
                        <button className="text-red-600 hover:text-red-800 font-medium">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
