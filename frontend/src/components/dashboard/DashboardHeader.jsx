import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const DashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between border-b border-gray-200">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin! 👋</h1>
        <p className="text-sm text-gray-500 mt-1">Here's what's happening with your travel business today.</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 relative">
          <FaBell className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">3</span>
        </button>
        <FaUserCircle className="w-8 h-8 text-gray-400" />
      </div>
    </header>
  );
};

export default DashboardHeader;
