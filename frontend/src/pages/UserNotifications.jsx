import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';

export default function UserNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('notifications') || '[]');
    setNotifications(saved);
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <Bell size={28} className="text-indigo-600" />
        <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        {notifications.length > 0 && (
          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {notifications.length} new
          </span>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
          <Bell size={48} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No notifications yet</p>
          <p className="text-sm text-gray-400">We'll notify you when something happens</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
              <p className="text-gray-700">{notif.message}</p>
              <p className="text-xs text-gray-400 mt-1">{notif.date || new Date().toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
