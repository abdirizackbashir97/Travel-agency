import React, { useState } from 'react';
import { FaUserEdit, FaLock, FaBell, FaGlobe, FaCreditCard, FaPalette, FaDatabase, FaTrashAlt, FaSignOutAlt } from 'react-icons/fa';

const AdminSettings = () => {
  const [toggles, setToggles] = useState({
    notifications: true,
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    maintenanceMode: false,
    twoFactor: false,
    onlineBookings: true,
    hotelBookings: true,
    flightBookings: true,
    tourBookings: true,
    autoConfirm: false,
    visa: true,
    mastercard: true,
    paypal: false,
    stripe: true,
    mobileMoney: true,
    newBookingAlerts: true,
    paymentAlerts: true,
    userRegistrationAlerts: true,
    reviewAlerts: false,
  });

  const toggleSwitch = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const Switch = ({ label, key }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <span className="text-gray-700">{label}</span>
      <button onClick={() => toggleSwitch(key)} className={`w-12 h-6 rounded-full transition ${toggles[key] ? 'bg-blue-600' : 'bg-gray-300'} relative`}>
        <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${toggles[key] ? 'translate-x-6' : ''}`} />
      </button>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><FaUserEdit /> Profile Settings</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700">Profile Photo</label><input type="file" className="mt-1 w-full border border-gray-300 rounded-lg p-2" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Name</label><input type="text" defaultValue="Admin User" className="w-full border border-gray-300 rounded-lg p-2" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Email</label><input type="email" defaultValue="admin@skyroute.com" className="w-full border border-gray-300 rounded-lg p-2" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Phone</label><input type="tel" defaultValue="+254 700 123 456" className="w-full border border-gray-300 rounded-lg p-2" /></div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Update Profile</button>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><FaLock /> Security</h3>
          <div className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700">Current Password</label><input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg p-2" /></div>
            <div><label className="block text-sm font-medium text-gray-700">New Password</label><input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg p-2" /></div>
            <div><label className="block text-sm font-medium text-gray-700">Confirm Password</label><input type="password" placeholder="••••••••" className="w-full border border-gray-300 rounded-lg p-2" /></div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Change Password</button>
          </div>
        </div>

        {/* Account Settings (Toggles) */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><FaBell /> Account Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Switch label="Enable Notifications" key="notifications" />
            <Switch label="Email Notifications" key="emailNotifications" />
            <Switch label="SMS Notifications" key="smsNotifications" />
            <Switch label="Dark Mode" key="darkMode" />
            <Switch label="Maintenance Mode" key="maintenanceMode" />
            <Switch label="Two-Factor Authentication" key="twoFactor" />
          </div>
        </div>

        {/* Booking Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Switch label="Online Bookings" key="onlineBookings" />
            <Switch label="Hotel Bookings" key="hotelBookings" />
            <Switch label="Flight Bookings" key="flightBookings" />
            <Switch label="Tour Bookings" key="tourBookings" />
            <Switch label="Auto-Confirm Bookings" key="autoConfirm" />
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2"><FaCreditCard /> Payment Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Switch label="Visa" key="visa" />
            <Switch label="Mastercard" key="mastercard" />
            <Switch label="PayPal" key="paypal" />
            <Switch label="Stripe" key="stripe" />
            <Switch label="Mobile Money" key="mobileMoney" />
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 rounded-xl shadow-sm p-6 border border-red-200 lg:col-span-2">
          <h3 className="text-lg font-semibold text-red-600 mb-4 flex items-center gap-2"><FaTrashAlt /> Danger Zone</h3>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Delete Account</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"><FaSignOutAlt /> Logout</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">Reset Dashboard Settings</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
