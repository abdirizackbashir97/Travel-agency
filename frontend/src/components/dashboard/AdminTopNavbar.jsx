import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, X, User, LogOut, Search } from 'lucide-react';
import axios from 'axios';

const AdminTopNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('Admin');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.success) {
        setNotifications(response.data.notifications || []);
      }
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/notifications/unread', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.success) {
        setUnreadCount(response.data.count || 0);
      }
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem('accessToken');
      await axios.put(
        `http://localhost:5000/api/notifications/${notificationId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotifications();
      fetchUnreadCount();
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const getInitials = () => {
    return userName ? userName.charAt(0).toUpperCase() : 'A';
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-40 border-b border-gray-200">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-indigo-600 focus:outline-none p-1"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="text-xl font-bold text-indigo-600 hidden md:block">✈️ SkyRoute</span>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full hidden md:inline">Admin</span>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-600 hover:text-indigo-600 relative p-1"
          >
            <Bell size={22} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <Link 
                  to="/admin/notifications" 
                  className="text-xs text-indigo-600 hover:underline"
                  onClick={() => setShowNotifications(false)}
                >
                  View all
                </Link>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">No notifications</p>
                  </div>
                ) : (
                  notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer ${!notif.is_read ? 'bg-indigo-50/50' : ''}`}
                      onClick={() => !notif.is_read && markAsRead(notif.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-1.5 ${!notif.is_read ? 'bg-indigo-500' : 'bg-gray-300'}`} />
                        <div>
                          <p className="font-medium text-sm text-gray-800">{notif.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-2">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {notif.created_at ? new Date(notif.created_at).toLocaleDateString() : 'Recently'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
            {getInitials()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-800">Welcome, {userName}</p>
            <p className="text-xs text-indigo-600">✨ Premium Member</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-500 transition p-1"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default AdminTopNavbar;
