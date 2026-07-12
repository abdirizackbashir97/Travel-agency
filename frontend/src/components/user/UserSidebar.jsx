import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  MapPin,
  Heart,
  Plane,
  Hotel,
  Package,
  CreditCard,
  Bell,
  Star,
  User,
  Settings,
  HelpCircle,
  LogOut,
  PlaneTakeoff,
  Gift,
} from 'lucide-react';
import logo from '../../assets/logo/logo.png';

const UserSidebar = ({ isOpen = true, setIsOpen }) => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'My Bookings', icon: BookOpen, path: '/dashboard/bookings' },
    { name: 'My Trips', icon: MapPin, path: '/dashboard/trips' },
    { name: 'Saved Destinations', icon: Heart, path: '/dashboard/saved' },
    { name: 'Wishlist', icon: Heart, path: '/dashboard/wishlist' },
    { name: 'Flights', icon: Plane, path: '/dashboard/flights' },
    { name: 'Hotels', icon: Hotel, path: '/dashboard/hotels' },
    { name: 'Tours', icon: Package, path: '/dashboard/tours' },
    { name: 'Payments', icon: CreditCard, path: '/dashboard/payments' },
    { name: 'Notifications', icon: Bell, path: '/dashboard/notifications', badge: 3 },
    { name: 'Reviews', icon: Star, path: '/dashboard/reviews' },
    { name: 'Profile', icon: User, path: '/dashboard/profile' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
    { name: 'Help Center', icon: HelpCircle, path: '/dashboard/help' },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 text-gray-800 h-screen fixed left-0 top-0 z-50 flex flex-col shadow-sm transition-all duration-300 ease-in-out ${
        isOpen ? 'w-60' : 'w-16'
      }`}
    >
      <div className="p-4 flex items-center gap-2 border-b border-gray-200 flex-shrink-0 h-16">
        <img src={logo} alt="SkyRoute Travel" className="h-8 w-auto" />
        {isOpen && (
          <div>
            <span className="text-lg font-bold tracking-wider text-gray-800">SkyRoute</span>
            <span className="block text-[10px] text-blue-600">Travel</span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 pb-6 min-h-0">
        {isOpen && <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-2">Menu</p>}
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.path} to={item.path} end={item.path === '/dashboard'}>
              {({ isActive }) => (
                <div
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  } ${!isOpen ? 'justify-center' : ''}`}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                  {isOpen && <span className="truncate">{item.name}</span>}
                  {isOpen && item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-3 flex-shrink-0">
        {isOpen ? (
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5" />
              <span className="text-sm font-semibold">Get 10% OFF</span>
            </div>
            <p className="text-xs text-blue-100 mb-3">on your next booking</p>
            <button className="w-full text-xs bg-white/20 backdrop-blur-sm py-1.5 rounded-lg hover:bg-white/30 transition">
              Explore Offers
            </button>
          </div>
        ) : (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
            <Gift className="w-4 h-4 text-white" />
          </div>
        )}
        <div className="mt-2">
          <NavLink to="/login">
            {({ isActive }) => (
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
                  isActive ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:text-gray-900'
                } ${!isOpen ? 'justify-center' : ''}`}
              >
                <LogOut className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-red-600' : 'text-gray-500'}`} />
                {isOpen && <span>Logout</span>}
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default UserSidebar;
