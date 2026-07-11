import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaSearch,
  FaBell,
  FaEnvelope,
  FaExpand,
  FaCompress,
  FaUserCircle,
  FaUser,
  FaKey,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from 'react-icons/fa';
import logo from '../../assets/logo/logo.png';

const AdminTopNavbar = ({ toggleSidebar }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <FaBars className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center gap-2">
          <img src={logo} alt="SkyRoute" className="h-8 w-auto" />
          <span className="text-sm font-bold text-gray-800">Admin</span>
        </div>
        <div className="relative hidden md:block">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-9 pr-4 py-1.5 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-blue-400 transition w-48 lg:w-64 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 relative"
          >
            <FaBell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100 font-medium text-gray-700">Notifications</div>
              <div className="max-h-60 overflow-y-auto">
                <div className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600">New booking from John Smith</div>
                <div className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600">Payment received $1,250</div>
                <div className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600">User registered: Emily Johnson</div>
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-500">
          <FaEnvelope className="w-5 h-5" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hidden lg:block"
        >
          {isFullscreen ? <FaCompress className="w-5 h-5" /> : <FaExpand className="w-5 h-5" />}
        </button>

        {/* Admin Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition"
          >
            <FaUserCircle className="w-8 h-8 text-gray-600" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">Admin</p>
                <p className="text-xs text-gray-500">admin@skyroute.com</p>
              </div>
              <Link to="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <FaUser className="w-4 h-4" /> My Profile
              </Link>
              <Link to="/admin/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <FaKey className="w-4 h-4" /> Change Password
              </Link>
              <Link to="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                <FaCog className="w-4 h-4" /> Settings
              </Link>
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3"
                >
                  <FaSignOutAlt className="w-4 h-4" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminTopNavbar;
