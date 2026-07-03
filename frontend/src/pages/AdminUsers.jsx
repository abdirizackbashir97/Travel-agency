import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, Search, Plus, Edit, Trash2, Eye,
  User, Mail, Phone, MapPin, Calendar,
  Star, Shield, CheckCircle, XCircle,
  AlertCircle, RefreshCw, Filter,
  Clock, Award, CreditCard, Plane, X,
  Save, HelpCircle, Lightbulb
} from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    role: 'user',
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState({});

  const helpNotes = [
    {
      icon: <Users className="w-5 h-5 text-blue-500" />,
      title: 'Manage Your Travelers',
      description: 'Add and manage all your travelers in one place. Track their bookings and preferences.'
    },
    {
      icon: <Plane className="w-5 h-5 text-green-500" />,
      title: 'Track Bookings',
      description: 'Easily see how many trips each user has booked and their activity level.'
    },
    {
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      title: 'Monitor Satisfaction',
      description: 'Keep track of user ratings to ensure quality service and address any concerns.'
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-500" />,
      title: 'Manage Access',
      description: 'Control user permissions and roles to maintain security and proper access levels.'
    },
  ];

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    setLoading(true);
    const saved = localStorage.getItem('adminUsers');
    if (saved) {
      setUsers(JSON.parse(saved));
    } else {
      const defaultUsers = [
        {
          id: 1,
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@travelagency.com',
          phone: '+254 700 123 456',
          location: 'Nairobi, Kenya',
          role: 'admin',
          status: 'active',
          memberSince: 'January 2024',
          bookings: 45,
          rating: 4.9,
          avatar: null
        },
        {
          id: 2,
          firstName: 'Sarah',
          lastName: 'Johnson',
          email: 'sarah.j@email.com',
          phone: '+254 712 345 678',
          location: 'Mombasa, Kenya',
          role: 'user',
          status: 'active',
          memberSince: 'March 2024',
          bookings: 12,
          rating: 4.7,
          avatar: null
        }
      ];
      setUsers(defaultUsers);
      localStorage.setItem('adminUsers', JSON.stringify(defaultUsers));
    }
    setLoading(false);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddUser = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      role: 'user',
      status: 'active',
    });
    setFormErrors({});
    setIsAddModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.location.trim()) errors.location = 'Location is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newUser = {
      id: Date.now(),
      ...formData,
      memberSince: new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }),
      bookings: 0,
      rating: 0,
      avatar: null
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));
    showNotification('User added successfully!');
    setIsAddModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      localStorage.setItem('adminUsers', JSON.stringify(updated));
      showNotification('User deleted successfully!');
    }
  };

  const toggleStatus = (id) => {
    const updated = users.map(u => 
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    );
    setUsers(updated);
    localStorage.setItem('adminUsers', JSON.stringify(updated));
    showNotification('User status updated!');
  };

  const viewUser = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">Administrator</span>;
    }
    return <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">User</span>;
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700 flex items-center gap-1">
        <CheckCircle className="w-3 h-3" /> Active
      </span>;
    }
    return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700 flex items-center gap-1">
      <XCircle className="w-3 h-3" /> Inactive
    </span>;
  };

  const getInitials = (firstName, lastName) => {
    return (firstName?.charAt(0) || '') + (lastName?.charAt(0) || '');
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return 'N/A';
    if (phone.startsWith('+')) return phone;
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
    if (cleaned.length === 9) {
      return `0${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 9)}`;
    }
    if (cleaned.length === 12 && cleaned.startsWith('254')) {
      return `+254 ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 12)}`;
    }
    return phone;
  };

  const stats = [
    { label: 'Total Users', value: users.length, color: 'text-blue-600' },
    { label: 'Active Users', value: users.filter(u => u.status === 'active').length, color: 'text-green-600' },
    { label: 'Administrators', value: users.filter(u => u.role === 'admin').length, color: 'text-purple-600' },
    { label: 'Avg Rating', value: (users.reduce((acc, u) => acc + u.rating, 0) / users.length || 0).toFixed(1), color: 'text-yellow-600' },
  ];

  return (
    <div>
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {notification.message}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link to="/admin" className="hover:text-gray-700">Dashboard</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Users</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="text-gray-500 mt-1">View and manage all registered users</p>
        </div>
        <button
          onClick={handleAddUser}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      {/* Help Notes Section */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">How User Management Helps Your Travel Agency</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {helpNotes.map((note, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100">
              <div className="flex-shrink-0 mt-0.5">{note.icon}</div>
              <div>
                <p className="text-sm font-medium text-gray-800">{note.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{note.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
          >
            <option value="all">All Roles</option>
            <option value="admin">Administrators</option>
            <option value="user">Users</option>
          </select>
          <button onClick={loadUsers} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : filteredUsers.length === 0 ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No users found</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                          {getInitials(user.firstName, user.lastName)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {user.memberSince}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium">
                      {formatPhoneNumber(user.phone)}
                    </td>
                    <td className="px-6 py-4">{getRoleBadge(user.role)}</td>
                    <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.bookings}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => viewUser(user)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleStatus(user.id)}
                          className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                          title="Toggle Status"
                        >
                          <Shield className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                  {getInitials(selectedUser.firstName, selectedUser.lastName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedUser.firstName} {selectedUser.lastName}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {selectedUser.email}
                  </p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {formatPhoneNumber(selectedUser.phone)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {selectedUser.location}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium text-gray-900 flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    {selectedUser.memberSince}
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Total Bookings</p>
                  <p className="font-medium text-gray-900 flex items-center gap-1">
                    <Plane className="w-4 h-4 text-blue-500" />
                    {selectedUser.bookings} bookings
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Rating</p>
                  <p className="font-medium text-gray-900 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    {selectedUser.rating} / 5.0
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => toggleStatus(selectedUser.id)}
                  className={`flex-1 px-4 py-2 text-white font-medium rounded-lg transition-colors ${
                    selectedUser.status === 'active'
                      ? 'bg-yellow-600 hover:bg-yellow-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {selectedUser.status === 'active' ? 'Deactivate User' : 'Activate User'}
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedUser.id);
                    setIsModalOpen(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete User
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal - All fields empty */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Add New User</h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmitUser} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      formErrors.firstName ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter first name"
                  />
                  {formErrors.firstName && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                      formErrors.lastName ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter last name"
                  />
                  {formErrors.lastName && (
                    <p className="text-xs text-red-500 mt-1">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.email ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Enter email address"
                />
                {formErrors.email && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.phone ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="+254 700 123 456"
                />
                {formErrors.phone && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleFormChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                    formErrors.location ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="City, Country"
                />
                {formErrors.location && (
                  <p className="text-xs text-red-500 mt-1">{formErrors.location}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="user">User</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  className="flex-1 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Add User
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
