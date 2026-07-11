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
import AdminLayout from '../components/dashboard/AdminLayout';

const API_BASE = 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/users`);
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

  const pieData = [
    { name: 'Card', value: 400 },
    { name: 'M-Pesa', value: 300 },
    { name: 'PayPal', value: 200 },
    { name: 'Bank', value: 100 },
  ];
  const COLORS = ['#2563EB', '#8B5CF6', '#F59E0B', '#10B981'];

  const popularDestinations = [
    { name: 'Paris', visitors: 12000 },
    { name: 'Dubai', visitors: 9000 },
    { name: 'Tokyo', visitors: 8000 },
    { name: 'Bali', visitors: 7000 },
    { name: 'New York', visitors: 6000 },
  ];

  const recentBookings = [
    { id: '#BK1258', customer: 'John Smith', destination: 'Paris, France', status: 'Confirmed', amount: '$1,250', date: 'Jul 10' },
    { id: '#BK1257', customer: 'Emily Johnson', destination: 'Bali, Indonesia', status: 'Pending', amount: '$980', date: 'Jul 09' },
    { id: '#BK1256', customer: 'Michael Brown', destination: 'Dubai, UAE', status: 'Confirmed', amount: '$1,890', date: 'Jul 09' },
    { id: '#BK1255', customer: 'Sarah Davis', destination: 'Tokyo, Japan', status: 'Cancelled', amount: '$750', date: 'Jul 08' },
  ];

  const StatCard = ({ title, value, icon: Icon, color, change, trend }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-lg bg-${color}-50 text-${color}-600`}>
          <Icon className="w-6 h-6" />
        </div>
        <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
          {trend === 'up' ? <FaArrowUp className="w-3.5 h-3.5" /> : <FaArrowDown className="w-3.5 h-3.5" />}
          {change}%
        </span>
      </div>
      <div className="mt-2">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
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
    <AdminLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard title="Total Users" value={stats.totalUsers.toLocaleString()} icon={FaUsers} color="blue" change="12.5" trend="up" />
        <StatCard title="Total Bookings" value={stats.totalBookings.toLocaleString()} icon={FaBook} color="green" change="8.2" trend="up" />
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={FaDollarSign} color="purple" change="15.3" trend="up" />
        <StatCard title="Active Tours" value={stats.activeTours.toLocaleString()} icon={FaSuitcase} color="orange" change="5.1" trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} />
              <YAxis stroke="#9ca3af" fontSize={11} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Booking Trends</h3>
          <ResponsiveContainer width="100%" height={220}>
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
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 lg:col-span-2">
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
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Recent Bookings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-gray-500 border-b">
                <tr>
                  <th className="py-2 text-left">ID</th>
                  <th className="py-2 text-left">Customer</th>
                  <th className="py-2 text-left">Destination</th>
                  <th className="py-2 text-left">Status</th>
                  <th className="py-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-2 font-medium text-gray-800">{b.id}</td>
                    <td className="py-2">{b.customer}</td>
                    <td className="py-2">{b.destination}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="py-2 font-medium text-gray-800">{b.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Recent Users</h3>
          {loading ? (
            <div className="text-center py-4 text-gray-500 text-sm">Loading users...</div>
          ) : (
            <div className="space-y-3">
              {recentUsers.map((u, idx) => (
                <div key={idx} className="flex items-center justify-between border-b last:border-0 pb-2">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">
                      {u.first_name} {u.second_name || ''}
                    </p>
                    <p className="text-xs text-gray-500">{u.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">
                      {u.created_at ? new Date(u.created_at).toLocaleDateString() : ''}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.is_active === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {u.is_active === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 text-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full mx-auto flex items-center justify-center text-blue-600 text-base">+</div>
          <p className="mt-1 text-xs font-medium text-gray-700">Add Destination</p>
        </button>
        <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-full mx-auto flex items-center justify-center text-green-600 text-base">+</div>
          <p className="mt-1 text-xs font-medium text-gray-700">Add Flight</p>
        </button>
        <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 text-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full mx-auto flex items-center justify-center text-purple-600 text-base">+</div>
          <p className="mt-1 text-xs font-medium text-gray-700">Add Hotel</p>
        </button>
        <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 text-center">
          <div className="w-10 h-10 bg-orange-100 rounded-full mx-auto flex items-center justify-center text-orange-600 text-base">+</div>
          <p className="mt-1 text-xs font-medium text-gray-700">Add Tour</p>
        </button>
        <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 text-center">
          <div className="w-10 h-10 bg-red-100 rounded-full mx-auto flex items-center justify-center text-red-600 text-base">+</div>
          <p className="mt-1 text-xs font-medium text-gray-700">Add Booking</p>
        </button>
        <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition border border-gray-100 text-center">
          <div className="w-10 h-10 bg-yellow-100 rounded-full mx-auto flex items-center justify-center text-yellow-600 text-base">+</div>
          <p className="mt-1 text-xs font-medium text-gray-700">Add User</p>
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
