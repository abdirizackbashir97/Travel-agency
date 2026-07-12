import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaUndo, FaUserEdit, FaKey } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

const AdminProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    second_name: '',
    email: '',
    phone: '',
  });
  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser && storedUser.id) {
      fetchUserProfile(storedUser.id);
    } else {
      fetchUserProfile(1);
    }
  }, []);

  const fetchUserProfile = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/users/${userId}`);
      const data = await res.json();
      if (data.success && data.user) {
        const userData = data.user;
        setUser(userData);
        setFormData({
          first_name: userData.first_name || '',
          second_name: userData.second_name || '',
          email: userData.email || '',
          phone: userData.phone || '',
        });
      } else {
        setMessage({ text: 'Failed to load profile', type: 'error' });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ text: 'Error loading profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch(`${API_BASE}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...storedUser, ...formData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        fetchUserProfile(user.id);
      } else {
        setMessage({ text: data.message || 'Update failed', type: 'error' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ text: 'Error updating profile', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.new_password !== passwordData.confirm_password) {
      setMessage({ text: 'New passwords do not match', type: 'error' });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordData.new_password }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage({ text: 'Password changed successfully!', type: 'success' });
        setPasswordData({ current_password: '', new_password: '', confirm_password: '' });
      } else {
        setMessage({ text: data.message || 'Password change failed', type: 'error' });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage({ text: 'Error changing password', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-2">My Profile</h1>
      <p className="text-gray-500 text-sm mb-6">View and edit your personal information</p>

      {message.text && (
        <div className={`p-4 rounded-lg mb-4 ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <FaUserEdit className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Edit Profile</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Second Name</label>
              <input
                type="text"
                name="second_name"
                value={formData.second_name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <FaSave className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="reset"
                onClick={() => {
                  if (user) {
                    setFormData({
                      first_name: user.first_name || '',
                      second_name: user.second_name || '',
                      email: user.email || '',
                      phone: user.phone || '',
                    });
                  }
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
              >
                <FaUndo className="w-4 h-4" /> Reset
              </button>
            </div>
          </form>
        </div>

        {/* Change Password */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4">
            <FaKey className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Change Password</h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
              <input
                type="password"
                name="current_password"
                value={passwordData.current_password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                name="new_password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                name="confirm_password"
                value={passwordData.confirm_password}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
            >
              <FaKey className="w-4 h-4" />
              {saving ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
