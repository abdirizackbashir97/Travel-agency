import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Plane, Hotel, MapPin, Calendar, CreditCard,
  Star, ArrowRight, TrendingUp, TrendingDown,
  DollarSign, Package, Download,
  BarChart, Globe, Briefcase, Award, Clock, Zap
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');

  const revenueData = [
    { month: 'Jan', revenue: 4200, bookings: 45 },
    { month: 'Feb', revenue: 5800, bookings: 52 },
    { month: 'Mar', revenue: 4900, bookings: 48 },
    { month: 'Apr', revenue: 7200, bookings: 68 },
    { month: 'May', revenue: 8900, bookings: 82 },
    { month: 'Jun', revenue: 6500, bookings: 60 },
    { month: 'Jul', revenue: 9400, bookings: 88 },
    { month: 'Aug', revenue: 8200, bookings: 76 },
    { month: 'Sep', revenue: 7100, bookings: 65 },
    { month: 'Oct', revenue: 9600, bookings: 92 },
    { month: 'Nov', revenue: 10500, bookings: 98 },
    { month: 'Dec', revenue: 11200, bookings: 105 },
  ];

  const destinationData = [
    { name: 'Dubai', value: 320, color: '#2563EB' },
    { name: 'Paris', value: 245, color: '#10B981' },
    { name: 'Tokyo', value: 210, color: '#F59E0B' },
    { name: 'Maldives', value: 185, color: '#8B5CF6' },
    { name: 'Zanzibar', value: 145, color: '#EC4899' },
  ];

  const stats = [
    { 
      title: 'Total Bookings', 
      value: '1,254', 
      change: '+12%',
      icon: Calendar,
      color: '#2563EB'
    },
    { 
      title: 'Revenue', 
      value: '$89,420', 
      change: '+18%',
      icon: DollarSign,
      color: '#10B981'
    },
    { 
      title: 'Customers', 
      value: '2,350', 
      change: '+8%',
      icon: Users,
      color: '#8B5CF6'
    },
    { 
      title: 'Active Packages', 
      value: '145', 
      change: '+5%',
      icon: Package,
      color: '#F59E0B'
    },
  ];

  const quickLinks = [
    { title: 'Destinations', icon: MapPin, link: '/admin/destinations' },
    { title: 'Flights', icon: Plane, link: '/admin/flights' },
    { title: 'Tours', icon: Package, link: '/admin/tours' },
    { title: 'Hotels', icon: Hotel, link: '/admin/hotels' },
  ];

  const recentBookings = [
    { id: 'BK-1254', customer: 'Sarah Johnson', destination: 'Dubai, UAE', date: 'May 1, 2024', amount: '$1,250', status: 'Completed' },
    { id: 'BK-1253', customer: 'Michael Brown', destination: 'Paris, France', date: 'May 20, 2024', amount: '$950', status: 'Pending' },
    { id: 'BK-1252', customer: 'Emily Davis', destination: 'Maldives', date: 'May 19, 2024', amount: '$2,150', status: 'Completed' },
    { id: 'BK-1251', customer: 'David Wilson', destination: 'Dubai, UAE', date: 'May 19, 2024', amount: '$1,100', status: 'Cancelled' },
    { id: 'BK-1250', customer: 'Jessica Lee', destination: 'Swiss Alps', date: 'May 18, 2024', amount: '$1,780', status: 'Cancelled' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'text-green-600 bg-green-50';
      case 'Pending': return 'text-yellow-600 bg-yellow-50';
      case 'Cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">Revenue: ${payload[0].value}</p>
          {payload[1] && (
            <p className="text-sm text-green-600">Bookings: {payload[1].value}</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen -m-8 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin! 🎉</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-white transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Stats - Clean without boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                <Icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <span className="text-xs text-green-600">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Links - Clean navigation */}
      <div className="mb-10">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <BarChart className="w-4 h-4" />
          <span>Quick Access</span>
        </div>
        <div className="flex items-center gap-8 flex-wrap">
          {quickLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.link}
                className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <Icon className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Revenue
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                Bookings
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} />
              <YAxis yAxisId="left" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#2563EB"
                strokeWidth={2}
                fill="url(#colorRevenue)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bookings"
                stroke="#10B981"
                strokeWidth={2}
                dot={{ fill: '#10B981', strokeWidth: 1, r: 4 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-gray-900">Top Destinations</h3>
            <Link to="/admin/destinations" className="text-xs text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={destinationData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {destinationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{payload[0].name}</p>
                        <p className="text-sm text-gray-600">{payload[0].value} bookings</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {destinationData.map((item, index) => (
              <span key={index} className="flex items-center gap-1 text-xs text-gray-600">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Bookings - Clean table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Recent Bookings</h3>
          <Link to="/admin/bookings" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Booking</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.customer}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.destination}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{booking.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600">{booking.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats - Clean grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
        <div>
          <p className="text-sm text-gray-400">Average Booking</p>
          <p className="text-2xl font-bold text-gray-900">$712</p>
          <span className="text-xs text-green-600">+8.2%</span>
        </div>
        <div>
          <p className="text-sm text-gray-400">Satisfaction</p>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">4.8</span>
            <span className="text-sm text-gray-400">/ 5.0</span>
          </div>
          <span className="text-xs text-green-600">★ Excellent</span>
        </div>
        <div>
          <p className="text-sm text-gray-400">Total Revenue</p>
          <p className="text-2xl font-bold text-gray-900">$89,420</p>
          <span className="text-xs text-green-600">+18.5%</span>
        </div>
        <div>
          <p className="text-sm text-gray-400">Growth Rate</p>
          <p className="text-2xl font-bold text-green-600">+5.1%</p>
          <span className="text-xs text-gray-400">vs last quarter</span>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
