import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Confirmed', value: 420 },
  { name: 'Pending', value: 180 },
  { name: 'Cancelled', value: 90 },
];

const COLORS = ['#2563EB', '#F59E0B', '#EF4444'];

const BookingStatusChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Status</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-4 mt-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
            <span className="text-sm text-gray-600">{item.name} ({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingStatusChart;
