import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Plane,
  Hotel,
  Package,
  CreditCard,
  Bell,
  MapPin,
  Star,
  Gift,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import UserLayout from '../components/user/UserLayout';

// Dummy data (will be replaced with API calls later)
const statsData = [
  { title: 'Total Bookings', value: '24', change: '+12%', icon: Calendar, color: 'blue' },
  { title: 'Upcoming Trips', value: '3', change: '+8%', icon: Plane, color: 'emerald' },
  { title: 'Completed Trips', value: '12', change: '+18%', icon: MapPin, color: 'purple' },
  { title: 'Total Spent', value: '$8,450', change: '+15%', icon: CreditCard, color: 'orange' },
];

const upcomingTrips = [
  {
    id: 1,
    destination: 'Bali, Indonesia',
    flag: '🇮🇩',
    dates: '12 – 18 Aug 2025',
    flight: 'Flight - 2 Adults',
    countdown: { days: 5, hours: 14, minutes: 32 },
  },
  {
    id: 2,
    destination: 'Dubai, UAE',
    flag: '🇦🇪',
    dates: '25 Aug – 02 Sep 2025',
    flight: 'Flight - 2 Adults',
    countdown: { days: 18, hours: 10, minutes: 45 },
  },
  {
    id: 3,
    destination: 'Paris, France',
    flag: '🇫🇷',
    dates: '10 – 16 Sep 2025',
    flight: 'Flight - 1 Adult',
    countdown: { days: 34, hours: 9, minutes: 15 },
  },
];

const bookingStatus = {
  confirmed: 12,
  pending: 6,
  completed: 4,
  cancelled: 2,
};
const totalBookings = Object.values(bookingStatus).reduce((a, b) => a + b, 0);

const statusColors = ['#2563EB', '#F59E0B', '#10B981', '#EF4444'];
const statusData = Object.keys(bookingStatus).map((key) => ({
  name: key.charAt(0).toUpperCase() + key.slice(1),
  value: bookingStatus[key],
}));

const recentBookings = [
  { id: 1, title: 'Hotel in Maldives', date: '12 – 18 Aug 2025', status: 'Confirmed', amount: '$1,250' },
  { id: 2, title: 'Flight to Dubai', date: '25 Aug 2025', status: 'Confirmed', amount: '$720' },
  { id: 3, title: 'Hotel in Bali', date: '12 Aug 2025', status: 'Cancelled', amount: '$450' },
];

const monthlyBookings = [
  { month: 'Jan', bookings: 10 },
  { month: 'Feb', bookings: 15 },
  { month: 'Mar', bookings: 20 },
  { month: 'Apr', bookings: 18 },
  { month: 'May', bookings: 25 },
  { month: 'Jun', bookings: 30 },
  { month: 'Jul', bookings: 28 },
  { month: 'Aug', bookings: 34 },
  { month: 'Sep', bookings: 32 },
  { month: 'Oct', bookings: 28 },
  { month: 'Nov', bookings: 22 },
  { month: 'Dec', bookings: 19 },
];

const popularDestinations = [
  { name: 'Bali, Indonesia', bookings: '120+', flag: '🇮🇩' },
  { name: 'Dubai, UAE', bookings: '98+', flag: '🇦🇪' },
  { name: 'Paris, France', bookings: '86+', flag: '🇫🇷' },
  { name: 'Maldives', bookings: '75+', flag: '🇲🇻' },
];

const quickActions = [
  { label: 'Book Flight', icon: Plane, color: 'blue' },
  { label: 'Book Hotel', icon: Hotel, color: 'green' },
  { label: 'Book Tour', icon: Package, color: 'purple' },
  { label: 'Explore', icon: MapPin, color: 'orange' },
  { label: 'My Tickets', icon: CreditCard, color: 'red' },
  { label: 'Contact Support', icon: Bell, color: 'pink' },
];

const recentPayments = [
  { title: 'Hotel in Maldives', date: '12 Aug 2025', amount: '$1,250', status: 'Paid' },
  { title: 'Flight to Dubai', date: '25 Jul 2025', amount: '$720', status: 'Paid' },
  { title: 'Tour in Paris', date: '10 Jul 2025', amount: '$450', status: 'Paid' },
];

const notifications = [
  { message: 'Your booking to Bali is confirmed', time: '2 minutes ago', type: 'confirm' },
  { message: 'Check-in for your flight to Dubai is open.', time: '1 hour ago', type: 'flight' },
  { message: 'Special offer: Get 20% off on hotel booking!', time: '3 hours ago', type: 'offer' },
];

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('Guest');

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser && storedUser.first_name) {
      setUser(storedUser);
      setFirstName(storedUser.first_name);
    }
  }, []);

  return (
    <UserLayout>
      {/* Welcome Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {firstName}! 👋</h1>
        <p className="text-gray-500 text-sm">Here's what's happening with your travel plans</p>
      </div>

      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsData.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-green-600 flex items-center gap-0.5">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Row: Upcoming Trips | Booking Status | Profile Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Trips */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Upcoming Trips</h3>
            <div className="space-y-4">
              {upcomingTrips.map((trip) => (
                <div key={trip.id} className="border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {trip.flag}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 text-sm">{trip.destination}</p>
                      <p className="text-xs text-gray-500">{trip.dates}</p>
                      <p className="text-xs text-gray-500">{trip.flight}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                    <span>{trip.countdown.days}d</span>
                    <span>{trip.countdown.hours}h</span>
                    <span>{trip.countdown.minutes}m</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Status (Pie Chart) */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-2">Booking Status</h3>
            <div className="flex justify-center items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={statusColors[index % statusColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2 text-xs">
              {statusData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColors[idx] }} />
                  <span>{item.name}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm font-bold text-gray-700 mt-2">Total: {totalBookings}</p>
          </div>

          {/* Profile Overview */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Profile Overview</h3>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {firstName.charAt(0).toUpperCase()}
              </div>
              <span className="mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Premium Member</span>
              <h4 className="text-lg font-bold text-gray-800 mt-1">{firstName}</h4>
              <p className="text-sm text-gray-500">{user?.email || 'user@email.com'}</p>
              <div className="flex items-center gap-4 mt-3 text-sm">
                <div>
                  <p className="text-gray-500">Loyalty Points</p>
                  <p className="font-bold text-gray-800">2,450</p>
                </div>
                <div>
                  <p className="text-gray-500">Member Since</p>
                  <p className="font-bold text-gray-800">Jan 2024</p>
                </div>
              </div>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Second Row: Recent Bookings | Monthly Bookings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Recent Bookings</h3>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{booking.title}</p>
                    <p className="text-xs text-gray-500">{booking.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {booking.status}
                    </span>
                    <span className="font-bold text-gray-800 text-sm">{booking.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Bookings Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Monthly Bookings</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={monthlyBookings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={11} />
                <YAxis stroke="#9ca3af" fontSize={11} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Third Row: Popular Destinations | Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Popular Destinations */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Popular Destinations</h3>
            <div className="space-y-3">
              {popularDestinations.map((dest, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{dest.flag}</span>
                    <span className="text-sm text-gray-700">{dest.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600">{dest.bookings}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-3 gap-3">
              {quickActions.map((action, idx) => {
                const Icon = action.icon;
                const colorMap = {
                  blue: 'bg-blue-50 text-blue-600',
                  green: 'bg-green-50 text-green-600',
                  purple: 'bg-purple-50 text-purple-600',
                  orange: 'bg-orange-50 text-orange-600',
                  red: 'bg-red-50 text-red-600',
                  pink: 'bg-pink-50 text-pink-600',
                };
                return (
                  <button
                    key={idx}
                    className={`p-3 rounded-lg text-center hover:shadow-md transition ${colorMap[action.color]}`}
                  >
                    <Icon className="w-6 h-6 mx-auto" />
                    <p className="text-[10px] font-medium mt-1 text-gray-700">{action.label}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Fourth Row: Special Offer Banner | Recent Payments | Notifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Special Offer Banner */}
          <div className="lg:col-span-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden min-h-[180px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mt-8 -mr-8"></div>
            <div>
              <p className="text-sm font-semibold text-blue-200">Special Offer for You!</p>
              <h4 className="text-2xl font-bold mt-1">Get up to 30% OFF</h4>
              <p className="text-blue-100 text-sm mt-1">on selected destinations</p>
            </div>
            <button className="mt-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition self-start">
              Explore Offers
            </button>
          </div>

          {/* Recent Payments */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Recent Payments</h3>
            <div className="space-y-3">
              {recentPayments.map((payment, idx) => (
                <div key={idx} className="flex items-center justify-between border-b last:border-0 pb-2 last:pb-0">
                  <div>
                    <p className="font-medium text-gray-800 text-sm">{payment.title}</p>
                    <p className="text-xs text-gray-500">{payment.date}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 text-xs font-medium">{payment.status}</span>
                    <span className="font-bold text-gray-800 text-sm">{payment.amount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-base font-semibold text-gray-800 mb-4">Notifications</h3>
            <div className="space-y-3">
              {notifications.map((notif, idx) => (
                <div key={idx} className="flex items-start gap-3 border-b last:border-0 pb-2 last:pb-0">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Bell className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700">{notif.message}</p>
                    <p className="text-xs text-gray-400">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
