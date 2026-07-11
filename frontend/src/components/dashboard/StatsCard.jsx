import React from 'react';
import { FaEllipsisV } from 'react-icons/fa';

const StatsCard = ({ title, value, icon: Icon, color, growth }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-lg ${color.bg}`}>
          <Icon className={`w-6 h-6 ${color.text}`} />
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <FaEllipsisV className="w-4 h-4" />
        </button>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        <p className="text-xs text-green-500 mt-2">↑ {growth}% vs last month</p>
      </div>
    </div>
  );
};

export default StatsCard;
