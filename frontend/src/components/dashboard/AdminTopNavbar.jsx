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
  FaCheckCircle,
} from 'react-icons/fa';
import logo from '../../assets/logo/logo.png';

const AdminTopNavbar = ({ toggleSidebar }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
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

  const fetchNotifications = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notifications');
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data || []);
        const unread = data.data.filter(n => n.is_read === 0).length;
        setUnreadCount(unread);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/notifications/${id}/read`, {
        method: 'PUT',
      });
      if (res.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllRead = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/notifications/mark-all-read', {
        method: 'PUT',
      });
      if (res.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

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
    <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition"
        >
          <FaBars className="w-5 h-5" />
        </button>
        <div className="hidden md:flex items-center gap-2">
          <img src={logo} alt="SkyRoute" className="h-8 w-auto" />
          <span className="text-sm font-bold text-gray-800">Admin</span>
        </div>
        <div className="relative flex-1 max-w-md hidden md:block">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 relative transition"
          >
            <FaBell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100">
                <span className="font-medium text-gray-700">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">No notifications</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`px-4 py-2 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer transition ${
                        n.is_read === 0 ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => markAsRead(n.id)}
                    >
                      <p className="text-sm font-medium text-gray-800">{n.title}</p>
                      <p className="text-xs text-gray-600">{n.message}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {n.created_at ? new Date(n.created_at).toLocaleString() : ''}
                      </p>
                      {n.is_read === 0 && (
                        <span className="text-xs text-blue-600">New</span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Messages */}
        <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 relative transition">
          <FaEnvelope className="w-5 h-5" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition hidden lg:block"
        >
          {isFullscreen ? <FaCompress className="w-5 h-5" /> : <FaExpand className="w-5 h-5" />}
        </button>

        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition"
          >
            <FaUserCircle className="w-8 h-8 text-gray-600" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">Admin</p>
                <p className="text-xs text-gray-500">admin@skyroute.com</p>
              </div>
              <Link to="/admin/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition">
                <FaUser className="w-4 h-4" /> My Profile
              </Link>
              <Link to="/admin/change-password" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition">
                <FaKey className="w-4 h-4" /> Change Password
              </Link>
              <Link to="/admin/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition">
                <FaCog className="w-4 h-4" /> Settings
              </Link>
              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 transition"
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
