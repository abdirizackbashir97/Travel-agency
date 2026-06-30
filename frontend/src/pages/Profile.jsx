import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Phone, MapPin, Camera, Edit, Save, X, 
  Calendar, LogOut, Shield, Lock, Key, CheckCircle, 
  Heart, Award, Globe, Briefcase, Star, Clock,
  AlertCircle, Upload, Image as ImageIcon
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    memberSince: '',
    role: 'Member',
    profileImage: null,
    preferences: {
      notifications: true,
      emailUpdates: true,
      darkMode: false,
    }
  });

  const [tempProfile, setTempProfile] = useState({ ...profile });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordErrors, setPasswordErrors] = useState({});

  // Load user profile based on logged-in user
  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = () => {
    // Get current logged-in user
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    try {
      const user = JSON.parse(userData);
      setCurrentUser(user);
      
      // Get user's unique profile key
      const profileKey = `profile_${user.email}`;
      const savedProfile = localStorage.getItem(profileKey);
      
      if (savedProfile) {
        // Load user's saved profile
        const parsed = JSON.parse(savedProfile);
        setProfile({
          ...parsed,
          firstName: parsed.firstName || user.firstName || '',
          lastName: parsed.lastName || user.lastName || '',
          email: user.email,
          memberSince: parsed.memberSince || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        });
        setTempProfile({
          ...parsed,
          firstName: parsed.firstName || user.firstName || '',
          lastName: parsed.lastName || user.lastName || '',
          email: user.email,
          memberSince: parsed.memberSince || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        });
      } else {
        // Initialize profile with user data
        const newProfile = {
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email,
          phone: '',
          location: '',
          bio: '',
          memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
          role: user.role === 'admin' ? 'Administrator' : 'Member',
          profileImage: null,
          preferences: {
            notifications: true,
            emailUpdates: true,
            darkMode: false,
          }
        };
        setProfile(newProfile);
        setTempProfile(newProfile);
        // Save initial profile
        localStorage.setItem(`profile_${user.email}`, JSON.stringify(newProfile));
      }

      // Load profile image
      const imageKey = `profileImage_${user.email}`;
      const savedImage = localStorage.getItem(imageKey);
      if (savedImage) {
        setProfile(prev => ({ ...prev, profileImage: savedImage }));
        setTempProfile(prev => ({ ...prev, profileImage: savedImage }));
      }

    } catch (e) {
      console.error('Error loading profile:', e);
      navigate('/login');
    }
  };

  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current?.click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && currentUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setTempProfile({
          ...tempProfile,
          profileImage: imageData
        });
        // Save to user-specific storage
        localStorage.setItem(`profileImage_${currentUser.email}`, imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setTempProfile({ ...profile });
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSaveSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setTempProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: checked
      }
    }));
  };

  const handleSave = () => {
    if (!currentUser) return;
    
    setLoading(true);
    
    // Update profile
    const updatedProfile = {
      firstName: tempProfile.firstName || currentUser.firstName || '',
      lastName: tempProfile.lastName || currentUser.lastName || '',
      email: currentUser.email,
      phone: tempProfile.phone || '',
      location: tempProfile.location || '',
      bio: tempProfile.bio || '',
      memberSince: profile.memberSince,
      role: currentUser.role === 'admin' ? 'Administrator' : 'Member',
      profileImage: tempProfile.profileImage || profile.profileImage,
      preferences: tempProfile.preferences || profile.preferences,
    };
    
    setProfile(updatedProfile);
    
    // Save to user-specific storage
    localStorage.setItem(`profile_${currentUser.email}`, JSON.stringify(updatedProfile));
    
    // Update user in localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        parsed.firstName = tempProfile.firstName || currentUser.firstName || '';
        parsed.lastName = tempProfile.lastName || currentUser.lastName || '';
        localStorage.setItem('user', JSON.stringify(parsed));
      } catch (e) {
        console.error('Error updating user:', e);
      }
    }
    
    setLoading(false);
    setIsEditing(false);
    setSaveSuccess(true);
    
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
    if (passwordErrors[e.target.name]) {
      setPasswordErrors({
        ...passwordErrors,
        [e.target.name]: null
      });
    }
  };

  const validatePassword = () => {
    const errors = {};
    if (!passwordData.currentPassword) errors.currentPassword = 'Current password is required';
    if (!passwordData.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = 'Password must be at least 6 characters';
    }
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    alert('Password changed successfully! 🔐');
    setShowPasswordModal(false);
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setPasswordErrors({});
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const getInitials = () => {
    const first = profile.firstName?.charAt(0) || '';
    const last = profile.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || 'U';
  };

  const getCurrentImage = () => {
    if (isEditing && tempProfile.profileImage) {
      return tempProfile.profileImage;
    }
    if (!isEditing && profile.profileImage) {
      return profile.profileImage;
    }
    return null;
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      {saveSuccess && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700 animate-fade-in">
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Profile updated successfully!</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and preferences</p>
        </div>
        {!isEditing ? (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
            {/* Profile Image */}
            <div 
              className={`relative w-32 h-32 mx-auto mb-4 ${isEditing ? 'cursor-pointer group' : ''}`}
              onClick={handleImageClick}
            >
              {getCurrentImage() ? (
                <img 
                  src={getCurrentImage()} 
                  alt="Profile" 
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-blue-100 flex items-center justify-center text-4xl text-blue-600 font-semibold border-4 border-gray-200 mx-auto">
                  {getInitials()}
                </div>
              )}
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={!isEditing}
              />
              {isEditing && (
                <p className="text-xs text-gray-400 mt-2">Click to change photo</p>
              )}
            </div>

            {/* Name & Role */}
            <h2 className="text-xl font-bold text-gray-900">
              {profile.firstName} {profile.lastName}
            </h2>
            <div className="flex items-center justify-center gap-2 mt-1">
              <Shield className="w-4 h-4 text-blue-600" />
              <p className="text-sm text-blue-600 font-medium">{profile.role}</p>
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <Heart className="w-4 h-4 text-red-500 mx-auto" />
                <p className="text-xs text-gray-500">Wishlist</p>
                <p className="text-sm font-semibold text-gray-900">8</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <Star className="w-4 h-4 text-yellow-500 mx-auto" />
                <p className="text-xs text-gray-500">Rating</p>
                <p className="text-sm font-semibold text-gray-900">4.8</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <Calendar className="w-4 h-4 text-blue-500 mx-auto" />
                <p className="text-xs text-gray-500">Bookings</p>
                <p className="text-sm font-semibold text-gray-900">12</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="mt-6 space-y-3 text-sm text-left">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="break-all">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>{profile.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>{profile.location || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>Member since {profile.memberSince}</span>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
              </div>
            )}

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full mt-6 py-2.5 border border-red-200 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={isEditing ? tempProfile.firstName : profile.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={isEditing ? tempProfile.lastName : profile.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={isEditing ? tempProfile.phone : profile.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                <input
                  type="text"
                  name="location"
                  value={isEditing ? tempProfile.location : profile.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                <textarea
                  name="bio"
                  value={isEditing ? tempProfile.bio : profile.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="3"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-gray-50 disabled:text-gray-500"
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Preferences */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Preferences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                      <p className="text-xs text-gray-400">Receive updates about your bookings</p>
                    </div>
                    <input
                      type="checkbox"
                      name="emailUpdates"
                      checked={isEditing ? tempProfile.preferences?.emailUpdates : profile.preferences?.emailUpdates}
                      onChange={handlePreferenceChange}
                      disabled={!isEditing}
                      className="w-10 h-5 rounded-full bg-gray-300 checked:bg-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                      <p className="text-xs text-gray-400">Get real-time updates on your trips</p>
                    </div>
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={isEditing ? tempProfile.preferences?.notifications : profile.preferences?.notifications}
                      onChange={handlePreferenceChange}
                      disabled={!isEditing}
                      className="w-10 h-5 rounded-full bg-gray-300 checked:bg-blue-600 focus:ring-blue-500 disabled:opacity-50"
                    />
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                  <p>💡 Tip: Click on the profile image to upload a photo</p>
                </div>
              )}
            </div>
          </div>

          {/* Change Password Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Ensure your account is using a secure password
                </p>
              </div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      passwordErrors.currentPassword ? 'border-red-500' : 'border-gray-200'
                    }`}
                    required
                  />
                </div>
                {passwordErrors.currentPassword && (
                  <p className="text-xs text-red-500 mt-1">{passwordErrors.currentPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      passwordErrors.newPassword ? 'border-red-500' : 'border-gray-200'
                    }`}
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
                {passwordErrors.newPassword && (
                  <p className="text-xs text-red-500 mt-1">{passwordErrors.newPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm New Password</label>
                <div className="relative">
                  <CheckCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      passwordErrors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                    }`}
                    required
                  />
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="text-xs text-red-500 mt-1">{passwordErrors.confirmPassword}</p>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
