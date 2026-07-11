import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 150 },
  { month: 'Mar', users: 200 },
  { month: 'Apr', users: 280 },
  { month: 'May', users: 350 },
  { month: 'Jun', users: 420 },
  { month: 'Jul', users: 500 },
];

const UserGrowthChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip />
          <Area type="monotone" dataKey="users" stroke="#2563EB" fill="#2563EB" fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserGrowthChart;
