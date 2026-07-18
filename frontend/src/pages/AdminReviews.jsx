import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Star, 
  Users, 
  ThumbsUp, 
  TrendingUp, 
  Calendar, 
  MessageCircle,
  Award,
  Heart,
  BarChart3,
  PieChart as PieChartIcon,
  Activity
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    totalUsers: 0,
    satisfactionScore: 0,
    trustScore: 0,
    totalBookings: 0,
    activeUsers: 0
  });

  // Sample data - will be replaced with real API data
  const ratingDistribution = [
    { rating: '⭐ 5', count: 45 },
    { rating: '⭐ 4', count: 32 },
    { rating: '⭐ 3', count: 15 },
    { rating: '⭐ 2', count: 6 },
    { rating: '⭐ 1', count: 2 },
  ];

  const monthlyReviews = [
    { month: 'Jan', reviews: 12, bookings: 8, users: 5 },
    { month: 'Feb', reviews: 18, bookings: 12, users: 7 },
    { month: 'Mar', reviews: 15, bookings: 10, users: 6 },
    { month: 'Apr', reviews: 22, bookings: 18, users: 10 },
    { month: 'May', reviews: 28, bookings: 22, users: 14 },
    { month: 'Jun', reviews: 20, bookings: 15, users: 9 },
    { month: 'Jul', reviews: 30, bookings: 25, users: 16 },
  ];

  const userActivity = [
    { day: 'Mon', active: 45, new: 12, returning: 33 },
    { day: 'Tue', active: 52, new: 15, returning: 37 },
    { day: 'Wed', active: 48, new: 10, returning: 38 },
    { day: 'Thu', active: 60, new: 18, returning: 42 },
    { day: 'Fri', active: 55, new: 14, returning: 41 },
    { day: 'Sat', active: 38, new: 8, returning: 30 },
    { day: 'Sun', active: 42, new: 11, returning: 31 },
  ];

  const COLORS = ['#10B981', '#34D399', '#6EE7B7', '#FCD34D', '#F59E0B', '#EF4444'];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      // You can replace these with real API calls
      const response = await axios.get('http://localhost:5000/api/admin/reviews', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setReviews(response.data.reviews || []);
      }
      
      // Set stats (in production, fetch from API)
      setStats({
        totalReviews: 120,
        averageRating: 4.6,
        totalUsers: 156,
        satisfactionScore: 92,
        trustScore: 88,
        totalBookings: 245,
        activeUsers: 78
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className={`bg-gradient-to-br ${color} text-white p-6 rounded-2xl shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs opacity-70 mt-1">{subtitle}</p>
        </div>
        <Icon size={32} className="opacity-60" />
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">⭐ Reviews & Analytics</h1>
        <p className="text-gray-500 text-sm">Track user trust, satisfaction, and engagement metrics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          icon={Star}
          title="Average Rating"
          value="4.8"
          subtitle="Based on 120 reviews"
          color="from-yellow-500 to-orange-500"
        />
        <StatCard 
          icon={ThumbsUp}
          title="Satisfaction Score"
          value="92%"
          subtitle="Very satisfied users"
          color="from-green-500 to-emerald-500"
        />
        <StatCard 
          icon={Award}
          title="Trust Score"
          value="88%"
          subtitle="Users trust SkyRoute"
          color="from-blue-500 to-indigo-500"
        />
        <StatCard 
          icon={Users}
          title="Active Users"
          value="78"
          subtitle="Last 30 days"
          color="from-purple-500 to-pink-500"
        />
      </div>

      {/* Trust Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="text-red-500" size={24} />
            <h3 className="font-semibold text-gray-800">User Trust Index</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-800">94%</span>
            <span className="text-sm text-green-500">↑ 12%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Based on user reviews and ratings</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-blue-500" size={24} />
            <h3 className="font-semibold text-gray-800">User Growth</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-800">+23%</span>
            <span className="text-sm text-green-500">↑ This month</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">156 total users registered</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="text-purple-500" size={24} />
            <h3 className="font-semibold text-gray-800">Engagement Rate</h3>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-4xl font-bold text-gray-800">76%</span>
            <span className="text-sm text-green-500">↑ 8%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full" style={{ width: '76%' }}></div>
          </div>
          <p className="text-xs text-gray-500 mt-2">Users actively engaging</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Rating Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">📊 Rating Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ratingDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8B5CF6">
                  {ratingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">📈 Monthly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyReviews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="reviews" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                <Area type="monotone" dataKey="bookings" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* User Activity Trend */}
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">📊 User Activity Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="active" stroke="#8B5CF6" strokeWidth={3} />
                <Line type="monotone" dataKey="new" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="returning" stroke="#F59E0B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">📝 Recent Reviews</h3>
          <span className="text-sm text-gray-500">Showing latest feedback</span>
        </div>
        <div className="space-y-3">
          {reviews.length === 0 ? (
            <p className="text-gray-500 text-center py-6">No reviews yet</p>
          ) : (
            reviews.slice(0, 5).map((review, index) => (
              <div key={index} className="flex items-start gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-800">{review.user_name || 'User'}</span>
                    <span className="flex items-center gap-1 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
                      ))}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{review.comment || 'Great experience!'}</p>
                  <p className="text-xs text-gray-400 mt-1">{new Date(review.created_at).toLocaleDateString()}</p>
                </div>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Verified</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
