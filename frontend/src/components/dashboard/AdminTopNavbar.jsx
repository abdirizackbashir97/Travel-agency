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
  FaCheck,
  FaTimes,
  FaClock,
} from 'react-icons/fa';
import logo from '../../assets/logo/logo.png';

const API_BASE = 'http://localhost:5000/api';

const AdminTopNavbar = ({ toggleSidebar }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loadingNotifs, setLoadingNotifs] = useState(false);
  const [actionModal, setActionModal] = useState(null); // { notification, action }
  const [reason, setReason] = useState('');
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await fetch(`${API_BASE}/notifications`);
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

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch(`${API_BASE}/notifications/unread`);
      const data = await res.json();
      if (data.success) {
        setUnreadCount(data.count);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const markAsRead = async (notifId) => {
    try {
      await fetch(`${API_BASE}/notifications/${notifId}/read`, { method: 'PUT' });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch(`${API_BASE}/notifications/mark-all-read`, { method: 'PUT' });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking all as read:', error);
    }
  };

  const handleBookingAction = async (notification, action) => {
    const bookingId = notification.booking_id;
    if (!bookingId) {
      alert('No booking associated with this notification');
      return;
    }

    let status = '';
    let title = '';
    let message = '';
    if (action === 'confirm') { status = 'confirmed'; title = 'Booking Confirmed'; message = `Your booking has been confirmed.`; }
    else if (action === 'cancel') { status = 'cancelled'; title = 'Booking Cancelled'; message = `Your booking has been cancelled. Reason: ${reason || 'No reason provided'}`; }
    else if (action === 'pending') { status = 'pending'; title = 'Booking Pending'; message = `Your booking is pending review. Reason: ${reason || 'Awaiting confirmation'}`; }

    try {
      const res = await fetch(`${API_BASE}/bookings/${bookingId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ booking_status: status }),
      });
      if (res.ok) {
        await markAsRead(notification.id);
        // Send notification to user
        alert(`Booking ${status} successfully`);
        fetchNotifications();
        setActionModal(null);
        setReason('');
      } else {
        alert('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('Error updating booking');
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
    const interval = setInterval(() => {
      fetchNotifications();
      fetchUnreadCount();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

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
    <>
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
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setNotifOpen(!notifOpen);
                if (!notifOpen) fetchNotifications();
              }}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 relative transition"
            >
              <FaBell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50 max-h-[70vh] overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-100 flex justify-between items-center">
                  <span className="font-medium text-gray-700">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 hover:text-blue-800"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
                <div className="divide-y divide-gray-100">
                  {notifications.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-gray-500 text-center">No notifications</div>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif.id} className={`px-4 py-3 ${notif.is_read ? '' : 'bg-blue-50'}`}>
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-800">{notif.title}</p>
                            <p className="text-xs text-gray-600 mt-0.5">
                              <span className="font-semibold">{notif.user_name || 'Unknown'}</span> – {notif.message}
                            </p>
                            <p className="text-[10px] text-gray-400 mt-1">
                              {notif.created_at ? new Date(notif.created_at).toLocaleString() : ''}
                            </p>
                            {notif.booking_id && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                <button
                                  onClick={() => setActionModal({ notification: notif, action: 'confirm' })}
                                  className="px-2.5 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setActionModal({ notification: notif, action: 'pending' })}
                                  className="px-2.5 py-1 text-xs bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition"
                                >
                                  Pending
                                </button>
                                <button
                                  onClick={() => setActionModal({ notification: notif, action: 'cancel' })}
                                  className="px-2.5 py-1 text-xs bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </div>
                          {!notif.is_read && (
                            <button
                              onClick={() => markAsRead(notif.id)}
                              className="text-xs text-blue-500 hover:text-blue-700 ml-2"
                            >
                              Mark read
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 relative transition">
            <FaEnvelope className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition hidden lg:block"
          >
            {isFullscreen ? <FaCompress className="w-5 h-5" /> : <FaExpand className="w-5 h-5" />}
          </button>

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

      {/* Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {actionModal.action === 'confirm' && 'Confirm Booking'}
              {actionModal.action === 'cancel' && 'Cancel Booking'}
              {actionModal.action === 'pending' && 'Mark as Pending'}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Are you sure you want to <span className="font-medium text-gray-700">{actionModal.action}</span> this booking?
            </p>
            {actionModal.action !== 'confirm' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason (optional)</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows="2"
                  placeholder="Why are you cancelling or putting this on pending?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={() => handleBookingAction(actionModal.notification, actionModal.action)}
                className={`flex-1 py-2 text-white rounded-lg transition ${
                  actionModal.action === 'confirm' ? 'bg-green-600 hover:bg-green-700' :
                  actionModal.action === 'cancel' ? 'bg-red-600 hover:bg-red-700' :
                  'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                Confirm {actionModal.action}
              </button>
              <button
                onClick={() => { setActionModal(null); setReason(''); }}
                className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminTopNavbar;
