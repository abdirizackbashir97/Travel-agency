import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Plane,
  Hotel,
  Compass,
  CreditCard,
  Bell,
  Star,
  Settings,
  HelpCircle,
  User,
  LogOut,
  Users,
  BarChart3,
  X,
  ClipboardList
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen, userRole }) => {
  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/booking-management', label: 'Booking', icon: ClipboardList },
    { path: '/admin/bookings', label: 'Bookings', icon: Calendar },
    { path: '/admin/flights-bookings', label: 'Flight Bkgs', icon: Plane },
    { path: '/admin/hotels-bookings', label: 'Hotel Bkgs', icon: Hotel },
    { path: '/admin/tours-bookings', label: 'Tour Bkgs', icon: Compass },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/flights', label: 'Flights', icon: Plane },
    { path: '/admin/hotels', label: 'Hotels', icon: Hotel },
    { path: '/admin/tours', label: 'Tours', icon: Compass },
    { path: '/admin/payments', label: 'Payments', icon: CreditCard },
    { path: '/admin/notifications', label: 'Alerts', icon: Bell },
    { path: '/admin/reviews', label: 'Reviews', icon: Star },
    { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
    { path: '/admin/help', label: 'Help', icon: HelpCircle },
    { path: '/admin/profile', label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    window.location.href = '/login';
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 flex flex-col transition-transform duration-300 ${
        isOpen ? 'w-32' : 'w-0 lg:w-32'
      } overflow-hidden`}>
        {/* Logo */}
        <div className="p-1 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-0.5">
              <span className="text-xs">✈️</span>
              <span className="text-[9px] font-bold text-gray-800 truncate">SkyRoute</span>
            </div>
            <button
              className="lg:hidden text-gray-400 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <X size={12} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-0.5">
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 px-1 py-1 rounded-lg transition text-[9px] ${
                        isActive
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon size={12} />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Promo Card */}
        <div className="flex-shrink-0 p-0.5 m-0.5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg text-white">
          <div className="text-center">
            <div className="text-xs mb-0">🎁</div>
            <h3 className="font-bold text-[7px]">10% OFF</h3>
            <p className="text-[6px] text-purple-100">next booking</p>
            <button className="px-1 py-0.5 bg-white/20 backdrop-blur-sm rounded-lg text-[6px] font-medium hover:bg-white/30 transition">
              Explore
            </button>
          </div>
        </div>

        {/* Logout */}
        <div className="flex-shrink-0 p-1 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 w-full px-1 py-1 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 transition text-[9px]"
          >
            <LogOut size={12} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
