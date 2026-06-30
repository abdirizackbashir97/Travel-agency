import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Lock, Bell, Globe,
  CreditCard, Shield, Moon, Sun, Save, X,
  CheckCircle, AlertCircle, Camera, Edit,
  LogOut, Smartphone, Eye, EyeOff, Languages,
  DollarSign, Clock, Calendar, FileText
} from 'lucide-react';

const Settings = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    language: 'English',
    currency: 'USD',
    timezone: 'UTC+3',
    notifications: true,
    emailUpdates: true,
    darkMode: false,
  });

  const [tempProfile, setTempProfile] = useState({ ...profileData });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
        setProfileData(prev => ({
          ...prev,
          firstName: parsed.firstName || '',
          lastName: parsed.lastName || '',
          email: parsed.email || '',
        }));
        setTempProfile(prev => ({
          ...prev,
          firstName: parsed.firstName || '',
          lastName: parsed.lastName || '',
          email: parsed.email || '',
        }));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const handleEdit = () => {
    setTempProfile({ ...profileData });
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTempProfile({
      ...tempProfile,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
    setProfileData({ ...tempProfile });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/login';
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  const getInitials = () => {
    const first = profileData.firstName?.charAt(0) || '';
    const last = profileData.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'U';
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and settings</p>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 animate-fade-in">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Settings saved successfully!</span>
        </div>
      )}

      {/* Settings Layout */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="md:w-64 bg-gray-50/50 p-4 border-r border-gray-100">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                {getInitials()}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {profileData.firstName || 'User'}
                </p>
                <p className="text-xs text-gray-400">Premium Member</p>
              </div>
            </div>

            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === 'profile' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                  {!isEditing ? (
                    <button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={isEditing ? tempProfile.firstName : profileData.firstName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={isEditing ? tempProfile.lastName : profileData.lastName}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={isEditing ? tempProfile.email : profileData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={isEditing ? tempProfile.phone : profileData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={isEditing ? tempProfile.location : profileData.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      name="bio"
                      value={isEditing ? tempProfile.bio : profileData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows="3"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Change Password</h4>
                        <p className="text-sm text-gray-500">Update your password regularly to stay secure</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                        Change
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        Enable
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Sessions</h4>
                        <p className="text-sm text-gray-500">Manage your active sessions</p>
                      </div>
                      <button className="px-4 py-2 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Push Notifications</h4>
                      <p className="text-sm text-gray-500">Receive notifications on your device</p>
                    </div>
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={isEditing ? tempProfile.notifications : profileData.notifications}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-10 h-5 rounded-full bg-gray-300 checked:bg-blue-600 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Email Updates</h4>
                      <p className="text-sm text-gray-500">Receive travel deals and updates via email</p>
                    </div>
                    <input
                      type="checkbox"
                      name="emailUpdates"
                      checked={isEditing ? tempProfile.emailUpdates : profileData.emailUpdates}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-10 h-5 rounded-full bg-gray-300 checked:bg-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                )}
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">App Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                    <select
                      name="language"
                      value={isEditing ? tempProfile.language : profileData.language}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50"
                    >
                      <option>English</option>
                      <option>French</option>
                      <option>Spanish</option>
                      <option>Arabic</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                    <select
                      name="currency"
                      value={isEditing ? tempProfile.currency : profileData.currency}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50"
                    >
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                      <option>KES</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
                    <select
                      name="timezone"
                      value={isEditing ? tempProfile.timezone : profileData.timezone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50"
                    >
                      <option>UTC+0</option>
                      <option>UTC+1</option>
                      <option>UTC+3</option>
                      <option>UTC+5</option>
                      <option>UTC-5</option>
                      <option>UTC-8</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h4 className="font-medium text-gray-900">Dark Mode</h4>
                      <p className="text-sm text-gray-500">Switch between light and dark theme</p>
                    </div>
                    <input
                      type="checkbox"
                      name="darkMode"
                      checked={isEditing ? tempProfile.darkMode : profileData.darkMode}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-10 h-5 rounded-full bg-gray-300 checked:bg-blue-600 focus:ring-blue-500"
                    />
                  </div>
                </div>
                {isEditing && (
                  <button
                    onClick={handleSave}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Preferences
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-xs text-gray-400">
        <span className="text-blue-600 font-medium">Secure</span> · 
        <span className="text-green-600 font-medium">Encrypted</span> · 
        <span className="text-purple-600 font-medium">Protected</span>
      </div>
    </div>
  );
};

export default Settings;
