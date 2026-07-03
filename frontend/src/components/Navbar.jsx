import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const token = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Public links - shown to everyone
  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/hotels', label: 'Hotels' },
    { path: '/flights', label: 'Flights' },
    { path: '/tours', label: 'Tours' },
  ];

  // Admin only links
  const adminLinks = [
    { path: '/admin/dashboard', label: 'Admin Dashboard' },
    { path: '/admin/destinations', label: 'Manage Destinations' },
    { path: '/admin/hotels', label: 'Manage Hotels' },
    { path: '/admin/flights', label: 'Manage Flights' },
    { path: '/admin/tours', label: 'Manage Tours' },
    { path: '/admin/bookings', label: 'Manage Bookings' },
    { path: '/admin/users', label: 'Manage Users' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg border-b border-gray-200' : 'bg-white/95 backdrop-blur-sm border-b border-gray-100'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-xl sm:text-2xl">✈️</span>
              <span className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                SkyRoute
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {/* Show public links for everyone */}
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-2 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Show admin links only for admin users */}
            {isAdmin && token && (
              <>
                <span className="text-gray-300">|</span>
                <Link
                  to="/admin/dashboard"
                  className={`px-2 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors ${
                    isActive('/admin/dashboard')
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Admin
                </Link>
              </>
            )}
          </div>

          {/* Right side - Auth buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {token ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <span>👤 {user?.firstName || 'Dashboard'}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="hidden sm:flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-1.5 sm:p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {isOpen ? (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-3 sm:py-4 border-t border-gray-200">
            <div className="flex flex-col gap-0.5">
              {/* Public links */}
              {publicLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Admin links in mobile menu */}
              {isAdmin && token && (
                <>
                  <div className="h-px bg-gray-200 my-1" />
                  <Link
                    to="/admin/dashboard"
                    className="px-3 py-2.5 text-sm font-medium text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    🔒 Admin Dashboard
                  </Link>
                </>
              )}
              
              <div className="h-px bg-gray-200 my-1" />
              {token ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
