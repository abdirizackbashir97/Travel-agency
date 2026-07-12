import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

const RecentUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_BASE}/users`);
        const data = await res.json();
        const userList = data.users || data.data || [];
        // Sort by created_at descending and take latest 5
        const sorted = userList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setUsers(sorted.slice(0, 5));
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Recent Users</h3>
        <p className="text-gray-500 text-sm">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-gray-800 mb-3">Recent Users</h3>
      <div className="space-y-3">
        {users.map((u, idx) => (
          <div key={idx} className="flex items-center justify-between border-b last:border-0 pb-2">
            <div className="flex items-center gap-3">
              <FaUserCircle className="w-10 h-10 text-gray-400" />
              <div>
                <p className="font-medium text-gray-800 text-sm">
                  {u.first_name} {u.second_name || ''}
                </p>
                <p className="text-xs text-gray-500">{u.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">
                {u.created_at ? new Date(u.created_at).toLocaleDateString() : ''}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${u.is_active === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {u.is_active === 1 ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">No users found</div>
        )}
      </div>
    </div>
  );
};

export default RecentUsers;
