import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Plane,
  Hotel,
  Package,
  CreditCard,
  Bell,
  MapPin,
  Star,
  Gift,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import UserLayout from '../components/user/UserLayout';

const API_BASE = 'http://localhost:5000/api';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('Guest');
  const [notifications, setNotifications] = useState([]);
  const [loadingNotif, setLoadingNotif] = useState(true);

  // ... (dummy data unchanged) ...

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser && storedUser.id) {
      setUser(storedUser);
      setFirstName(storedUser.first_name || 'Guest');
      fetchNotifications(storedUser.id);
    } else {
      setFirstName('Admin');
      fetchNotifications(1);
    }
  }, []);

  const fetchNotifications = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/notifications?user_id=${userId}&limit=5`);
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoadingNotif(false);
    }
  };

  const handleNotificationClick = (notif) => {
    // Navigate to bookings page (or specific booking if we have a detail page)
    navigate('/dashboard/bookings');
    // Optionally, we could mark as read here
    // markAsRead(notif.id);
  };

  // ... (rest of the component)

  return (
    <UserLayout>
      {/* ... (everything above notifications unchanged) ... */}

      {/* Notifications – clickable */}
      <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Notifications</h3>
        {loadingNotif ? (
          <p className="text-sm text-gray-500">Loading...</p>
        ) : notifications.length === 0 ? (
          <p className="text-sm text-gray-500">No notifications</p>
        ) : (
          <div className="space-y-3">
            {notifications.slice(0, 5).map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className="flex items-start gap-3 border-b last:border-0 pb-2 last:pb-0 cursor-pointer hover:bg-gray-50 rounded-lg transition p-2"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Bell className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{notif.message}</p>
                  <p className="text-xs text-gray-400">
                    {notif.created_at ? new Date(notif.created_at).toLocaleDateString() : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default UserDashboard;
