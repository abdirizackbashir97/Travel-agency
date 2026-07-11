import React from 'react';
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

const AdminReports = () => {
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

  const statusData = [
    { name: 'Confirmed', value: 420 },
    { name: 'Pending', value: 180 },
    { name: 'Cancelled', value: 90 },
  ];
  const COLORS = ['#2563EB', '#F59E0B', '#EF4444'];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Reports & Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Bookings Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={bookingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip />
              <Bar dataKey="bookings" fill="#2563EB" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Total Revenue</p><p className="text-2xl font-bold">$245,860</p><p className="text-green-500 text-sm">↑ 12.5%</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Total Bookings</p><p className="text-2xl font-bold">5,284</p><p className="text-green-500 text-sm">↑ 8.2%</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Active Users</p><p className="text-2xl font-bold">12,450</p><p className="text-green-500 text-sm">↑ 10.3%</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Conversion Rate</p><p className="text-2xl font-bold">34.6%</p><p className="text-green-500 text-sm">↑ 2.1%</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Avg Booking Value</p><p className="text-2xl font-bold">$245</p><p className="text-green-500 text-sm">↑ 5.4%</p></div>
            <div className="bg-gray-50 p-4 rounded-lg"><p className="text-sm text-gray-500">Cancellation Rate</p><p className="text-2xl font-bold">8.2%</p><p className="text-red-500 text-sm">↑ 1.2%</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
