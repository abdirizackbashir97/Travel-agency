import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const users = [
  { name: 'John Smith', email: 'johnsmith@gmail.com', joined: 'Jul 10, 2025', status: 'Active' },
  { name: 'Emily Johnson', email: 'emilyjohnson@gmail.com', joined: 'Jul 09, 2025', status: 'Active' },
  { name: 'Michael Brown', email: 'michaelbrown@gmail.com', joined: 'Jul 09, 2025', status: 'Active' },
  { name: 'Sarah Davis', email: 'sarahdavis@gmail.com', joined: 'Jul 08, 2025', status: 'Inactive' },
  { name: 'David Wilson', email: 'davidwilson@gmail.com', joined: 'Jul 07, 2025', status: 'Active' },
];

const RecentUsers = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Users</h3>
      <div className="space-y-4">
        {users.map((user, idx) => (
          <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <div className="flex items-center gap-3">
              <FaUserCircle className="w-10 h-10 text-gray-400" />
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">{user.joined}</p>
              <span className={`text-xs font-medium ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                {user.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUsers;
