import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FaHome,
  FaUsers,
  FaPlane,
  FaHotel,
  FaMapMarkerAlt,
  FaSuitcase,
  FaBook,
  FaCreditCard,
  FaStar,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import logo from '../../assets/logo/logo.png';

const Sidebar = ({ isOpen = true, setIsOpen }) => {
  const navItems = [
    { name: 'Dashboard', icon: FaHome, path: '/admin/dashboard' },
    { name: 'Users', icon: FaUsers, path: '/admin/users' },
    { name: 'Bookings', icon: FaBook, path: '/admin/bookings' },
    { name: 'Destinations', icon: FaMapMarkerAlt, path: '/admin/destinations' },
    { name: 'Flights', icon: FaPlane, path: '/admin/flights' },
    { name: 'Hotels', icon: FaHotel, path: '/admin/hotels' },
    { name: 'Tours', icon: FaSuitcase, path: '/admin/tours' },
    { name: 'Payments', icon: FaCreditCard, path: '/admin/payments' },
    { name: 'Reviews', icon: FaStar, path: '/admin/reviews' },
    { name: 'Reports', icon: FaFileAlt, path: '/admin/reports' },
    { name: 'Settings', icon: FaCog, path: '/admin/settings' },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 text-gray-800 h-screen fixed left-0 top-0 z-50 flex flex-col shadow-sm transition-all duration-300 ${
        isOpen ? 'w-44' : 'w-16'
      }`}
    >
      <div className="p-3 flex items-center gap-2 border-b border-gray-200 flex-shrink-0 h-14">
        <img src={logo} alt="SkyRoute" className="h-7 w-auto" />
        {isOpen && <span className="text-base font-bold tracking-wider text-gray-800">SkyRoute</span>}
      </div>
      <nav className="flex-1 overflow-y-auto py-2 px-2 pb-3 min-h-0">
        {isOpen && <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">Menu</p>}
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.path} to={item.path} end={item.path === '/admin/dashboard'}>
              {({ isActive }) => (
                <div
                  className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  } ${!isOpen ? 'justify-center' : ''}`}
                >
                  <Icon className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  {isOpen && <span className="truncate">{item.name}</span>}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t border-gray-200 p-3 flex-shrink-0">
        <NavLink to="/login">
          {({ isActive }) => (
            <div
              className={`flex items-center gap-3 px-2 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              } ${!isOpen ? 'justify-center' : ''}`}
            >
              <FaSignOutAlt className={`w-4.5 h-4.5 flex-shrink-0 ${isActive ? 'text-white' : 'text-gray-500'}`} />
              {isOpen && <span>Logout</span>}
            </div>
          )}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
