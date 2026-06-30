import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, User, Calendar, Heart, CreditCard, Settings, LogOut,
  MapPin, Plane, Package, Users, BarChart, Hotel
} from 'lucide-react';
import authService from '../services/authService';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');

  const userMenuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/profile', label: 'Profile', icon: User },
    { path: '/bookings', label: 'My Bookings', icon: Calendar },
    { path: '/wishlist', label: 'Wishlist', icon: Heart },
    { path: '/payments', label: 'Payments', icon: CreditCard },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  const adminMenuItems = [
    { path: '/admin', label: 'Dashboard', icon: BarChart },
    { path: '/admin/destinations', label: 'Destinations', icon: MapPin },
    { path: '/admin/flights', label: 'Flights', icon: Plane },
    { path: '/admin/tours', label: 'Tours', icon: Package },
    { path: '/admin/hotels', label: 'Hotels', icon: Hotel },
    { path: '/admin/bookings', label: 'Bookings', icon: Calendar },
    { path: '/admin/users', label: 'Users', icon: Users },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.clear();
      navigate('/login');
    }
  };

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex-shrink-0 sticky top-0 h-screen overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TA</span>
          </div>
          <span className="text-lg font-bold text-gray-900">TravelAgency</span>
        </Link>
        {isAdmin && (
          <span className="text-xs text-blue-600 font-medium mt-1 block">Admin Panel</span>
        )}
      </div>

      <nav className="p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                  isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2.5 w-full text-sm font-medium text-gray-600 rounded-lg hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 text-gray-400" />
            Sign Out
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
