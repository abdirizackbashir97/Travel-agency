import React, { useState, useEffect } from 'react';
import {
  FaUsers,
  FaBook,
  FaDollarSign,
  FaSuitcase,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import RecentBookings from '../components/dashboard/RecentBookings';
import RecentUsers from '../components/dashboard/RecentUsers';
import LatestPayments from '../components/dashboard/LatestPayments';
import PopularDestinations from '../components/dashboard/PopularDestinations';

const AdminDashboard = () => {
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();
        const users = data.users || data.data || [];
        const sorted = users.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setRecentUsers(sorted.slice(0, 5));
      } catch (error) {
        console.error('Error fetching users:', error);
        setRecentUsers([
          { first_name: 'John', second_name: 'Smith', email: 'john@gmail.com', created_at: '2025-07-10', is_active: 1 },
          { first_name: 'Emily', second_name: 'Johnson', email: 'emily@gmail.com', created_at: '2025-07-09', is_active: 1 },
          { first_name: 'Michael', second_name: 'Brown', email: 'michael@gmail.com', created_at: '2025-07-09', is_active: 1 },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentUsers();
  }, []);

  const stats = {
    totalUsers: 12450,
    totalBookings: 5284,
    totalRevenue: 245860,
    activeTours: 1120,
  };

  const revenueData = [
    { month: 'Jan', revenue: 4000 },
    { month: 'Feb', revenue: 3000 },
    { month: 'Mar', revenue: 5000 },
    { month: 'Apr', revenue: 2780 },
    { month: 'May', revenue: 1890 },
    { month: 'Jun', revenue: 2390 },
    { month: 'Jul', revenue: 3490 },
  ];

  const bookingData = [
    { day: 'Mon', bookings: 120 },
    { day: 'Tue', bookings: 150 },
    { day: 'Wed', bookings: 180 },
    { day: 'Thu', bookings: 220 },
    { day: 'Fri', bookings: 250 },
    { day: 'Sat', bookings: 210 },
    { day: 'Sun', bookings: 190 },
  ];

  const paymentData = [
    { name: 'Credit Card', value: 45 },
    { name: 'PayPal', value: 30 },
    { name: 'Bank Transfer', value: 20 },
    { name: 'Crypto', value: 5 },
  ];
  const PAYMENT_COLORS = ['#2563EB', '#8B5CF6', '#F59E0B', '#10B981'];

  const popularDestinations = [
    { name: 'Paris', visitors: 12000 },
    { name: 'Dubai', visitors: 9000 },
    { name: 'Tokyo', visitors: 8000 },
    { name: 'Bali', visitors: 7000 },
    { name: 'New York', visitors: 6000 },
  ];

  const StatCard = ({ title, value, icon: Icon, color, change, trend }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group">
      <div className="flex items-start justify-between">
        <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600 group-hover:scale-110 transition-transform duration-200`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {trend === 'up' ? <FaArrowUp className="w-3 h-3" /> : <FaArrowDown className="w-3 h-3" />}
          {change}%
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-400 mt-1">Compared to last month</p>
      </div>
    </div>
  );

  const statusColors = {
    Confirmed: 'bg-green-100 text-green-800',
    Pending: 'bg-yellow-100 text-yellow-800',
    Cancelled: 'bg-red-100 text-red-800',
    Active: 'bg-green-100 text-green-800',
    Inactive: 'bg-red-100 text-red-800',
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
        <StatCard title="Total Users" value={stats.totalUsers.toLocaleString()} icon={FaUsers} color="blue" change="12.5" trend="up" />
        <StatCard title="Total Bookings" value={stats.totalBookings.toLocaleString()} icon={FaBook} color="green" change="8.2" trend="up" />
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={FaDollarSign} color="purple" change="15.3" trend="up" />
        <StatCard title="Active Tours" value={stats.activeTours.toLocaleString()} icon={FaSuitcase} color="orange" change="5.1" trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={11} domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Booking Trends</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={11} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={paymentData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {paymentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PAYMENT_COLORS[index % PAYMENT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Popular Destinations</h3>
          <div className="space-y-3">
            {popularDestinations.map((dest, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{dest.name}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(dest.visitors / 12000) * 100}%` }} />
                  </div>
                  <span className="text-sm text-gray-500">{dest.visitors.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RecentBookings />
        <RecentUsers />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <LatestPayments />
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition text-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-blue-600 text-lg">+</div>
              <p className="mt-1 text-xs font-medium text-gray-700">Add Destination</p>
            </button>
            <button className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition text-center">
              <div className="w-10 h-10 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-600 text-lg">+</div>
              <p className="mt-1 text-xs font-medium text-gray-700">Add Flight</p>
            </button>
            <button className="p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition text-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full mx-auto flex items-center justify-center text-purple-600 text-lg">+</div>
              <p className="mt-1 text-xs font-medium text-gray-700">Add Hotel</p>
            </button>
            <button className="p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition text-center">
              <div className="w-10 h-10 bg-orange-100 rounded-full mx-auto flex items-center justify-center text-orange-600 text-lg">+</div>
              <p className="mt-1 text-xs font-medium text-gray-700">Add Tour</p>
            </button>
            <button className="p-3 bg-red-50 rounded-lg hover:bg-red-100 transition text-center">
              <div className="w-10 h-10 bg-red-100 rounded-full mx-auto flex items-center justify-center text-red-600 text-lg">+</div>
              <p className="mt-1 text-xs font-medium text-gray-700">Create Booking</p>
            </button>
            <button className="p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition text-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full mx-auto flex items-center justify-center text-yellow-600 text-lg">+</div>
              <p className="mt-1 text-xs font-medium text-gray-700">Add User</p>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Monthly Revenue Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500">Total Revenue</p>
            <p className="text-xl font-bold text-gray-800">$245,860</p>
            <p className="text-xs text-green-600">↑ 12.5%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500">Avg per Month</p>
            <p className="text-xl font-bold text-gray-800">$35,123</p>
            <p className="text-xs text-green-600">↑ 8.2%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500">Total Flights</p>
            <p className="text-xl font-bold text-gray-800">1,428</p>
            <p className="text-xs text-green-600">↑ 5.1%</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <p className="text-xs text-gray-500">Total Hotels</p>
            <p className="text-xl font-bold text-gray-800">2,356</p>
            <p className="text-xs text-green-600">↑ 4.8%</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
