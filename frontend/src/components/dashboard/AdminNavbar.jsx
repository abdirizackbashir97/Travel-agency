import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Menu, X, LogOut } from 'lucide-react';

const AdminNavbar = ({ toggleSidebar, isSidebarOpen }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData && userData.first_name) {
      setUserName(userData.first_name);
      setUserRole(userData.role || 'user');
    } else {
      // Fallback
      const name = localStorage.getItem('userName');
      if (name) setUserName(name);
    }
    
    // Load notifications
    const savedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(savedNotifications);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const hasUnreadNotifications = notifications.length > 0;

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left side - Menu toggle + Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="text-gray-600 hover:text-indigo-600 focus:outline-none"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-600">✈️ SkyRoute</span>
        </Link>
      </div>

      {/* Right side - Notifications + User + Logout */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-gray-600 hover:text-indigo-600 relative"
          >
            <Bell size={20} />
            {hasUnreadNotifications && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
              </div>
              <div className="p-2">
                {notifications.length === 0 ? (
                  <p className="text-sm text-gray-500 p-2">No notifications</p>
                ) : (
                  notifications.map((notif, index) => (
                    <div key={index} className="p-2 hover:bg-gray-50 rounded-lg border-b border-gray-100">
                      <p className="text-sm text-gray-700">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.date}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Name */}
        <span className="text-sm font-medium text-gray-700">
          👋 {userName || 'User'}
        </span>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-600 transition"
          title="Logout"
        >
          <LogOut size={20} />
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
