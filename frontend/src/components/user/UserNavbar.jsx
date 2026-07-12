import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, Globe, Bell, User, ChevronDown, Menu } from 'lucide-react';

const UserNavbar = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userInitial, setUserInitial] = useState('U');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData && userData.first_name) {
      setUserName(`${userData.first_name} ${userData.second_name || ''}`);
      setUserInitial(userData.first_name.charAt(0).toUpperCase());
    }
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search destinations, hotels, flights, tours..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition hidden md:block"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="flex items-center gap-1 text-sm text-gray-600 hidden md:flex">
          <Globe className="w-4 h-4" />
          <span>EN</span>
          <ChevronDown className="w-3 h-3" />
        </div>

        <div className="hidden md:flex items-center gap-1 text-sm text-gray-600">
          <span>USD</span>
          <ChevronDown className="w-3 h-3" />
        </div>

        <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition relative">
          <Bell className="w-5 h-5" />
        </button>

        <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {userInitial}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">{userName}</p>
            <p className="text-[10px] text-blue-600 font-semibold">Premium Member</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
