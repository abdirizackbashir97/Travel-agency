import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Home, Compass, Hotel, Plane, Package, Info, Phone } from 'lucide-react';
import logo from '../assets/logo/logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Hide on admin or dashboard routes
  if (location.pathname.startsWith('/admin') || location.pathname.startsWith('/dashboard')) {
    return null;
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    setIsLoggedIn(!!token);
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/destinations', label: 'Destinations', icon: Compass },
    { path: '/hotels', label: 'Hotels', icon: Hotel },
    { path: '/flights', label: 'Flights', icon: Plane },
    { path: '/tours', label: 'Tours', icon: Package },
    { path: '/about', label: 'About', icon: Info },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="SkyRoute" className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-800">SkyRoute</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-600 hover:text-indigo-600 transition font-medium text-sm flex items-center gap-1"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-indigo-50 px-3 py-2 rounded-full hover:bg-indigo-100 transition"
                >
                  <User className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">{user?.first_name || user?.username || 'User'}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 border border-gray-100">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center gap-2">
                      <User className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center gap-2">
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 flex items-center gap-2">
                      <Package className="w-4 h-4" /> My Bookings
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition text-sm font-medium">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="block px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition flex items-center gap-2">
                <User className="w-4 h-4" /> Dashboard
              </Link>
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <div className="px-4 py-2 flex flex-col gap-2">
              <Link to="/login" className="text-center text-gray-600 hover:text-indigo-600 transition font-medium">
                Login
              </Link>
              <Link
                to="/signup"
                className="text-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-lg transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
