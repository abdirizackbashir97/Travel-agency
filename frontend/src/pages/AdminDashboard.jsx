import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Plane, Hotel, Compass, CreditCard, Star, Settings, Bell, HelpCircle } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { icon: Calendar, label: 'Total Bookings', value: '24', change: '+12%', color: 'from-indigo-500 to-indigo-600' },
    { icon: Users, label: 'Total Users', value: '156', change: '+8%', color: 'from-blue-500 to-blue-600' },
    { icon: Plane, label: 'Flights', value: '45', change: '+5%', color: 'from-purple-500 to-purple-600' },
    { icon: Hotel, label: 'Hotels', value: '32', change: '+3%', color: 'from-green-500 to-green-600' },
  ];

  const quickLinks = [
    { icon: Calendar, label: 'All Bookings', path: '/admin/bookings' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Plane, label: 'Flights', path: '/admin/flights' },
    { icon: Hotel, label: 'Hotels', path: '/admin/hotels' },
    { icon: Compass, label: 'Tours', path: '/admin/tours' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: Star, label: 'Reviews', path: '/admin/reviews' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📊 Admin Dashboard</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here's what's happening with your platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className={`bg-gradient-to-br ${stat.color} text-white p-5 rounded-2xl shadow-lg`}>
              <Icon size={24} className="opacity-80 mb-3" />
              <p className="text-xs font-medium opacity-80">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <p className="text-xs font-medium mt-2 opacity-80">{stat.change}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                to={link.path}
                className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 border border-transparent transition"
              >
                <Icon size={20} className="text-indigo-500" />
                <span className="text-sm font-medium text-gray-700">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
