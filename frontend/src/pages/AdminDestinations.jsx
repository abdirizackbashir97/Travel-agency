import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AdminDestinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    category: '',
    description: '',
    price_per_night: '',
    rating: '',
    attractions: '',
    best_time: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (user.role !== 'admin') {
      navigate('/dashboard');
      return;
    }
    
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/destinations');
      const data = await response.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast.error('Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.country || !formData.category || !formData.price_per_night) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      console.log('Adding destination:', formData);
      
      const response = await fetch('http://localhost:5000/api/destinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          country: formData.country,
          city: formData.city || '',
          category: formData.category,
          description: formData.description || '',
          price_per_night: parseFloat(formData.price_per_night),
          rating: parseFloat(formData.rating) || 0,
          attractions: formData.attractions || '',
          best_time: formData.best_time || ''
        })
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        toast.success('✅ Destination added successfully!');
        setFormData({
          name: '',
          country: '',
          city: '',
          category: '',
          description: '',
          price_per_night: '',
          rating: '',
          attractions: '',
          best_time: ''
        });
        setShowForm(false);
        fetchDestinations();
      } else {
        toast.error(data.error || 'Failed to add destination');
      }
    } catch (error) {
      console.error('Error adding destination:', error);
      toast.error('Network error. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this destination?')) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:5000/api/destinations/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Destination deleted successfully');
        fetchDestinations();
      } else {
        toast.error('Failed to delete destination');
      }
    } catch (error) {
      console.error('Error deleting destination:', error);
      toast.error('Network error');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">🌍 Manage Destinations</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {showForm ? 'Cancel' : '+ Add Destination'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Destination</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Destination Name *"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country *"
                value={formData.country}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="category"
                placeholder="Category (Beach, City, Mountain, Safari, Cultural) *"
                value={formData.category}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="number"
                name="price_per_night"
                placeholder="Price per night *"
                value={formData.price_per_night}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
                step="0.01"
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                value={formData.rating}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                step="0.1"
                min="0"
                max="5"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                rows="3"
              />
              <textarea
                name="attractions"
                placeholder="Attractions (comma separated)"
                value={formData.attractions}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                rows="3"
              />
              <input
                type="text"
                name="best_time"
                placeholder="Best Time to Visit"
                value={formData.best_time}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="col-span-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Destination
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price/Night</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {destinations.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No destinations found
                    </td>
                  </tr>
                ) : (
                  destinations.map((dest) => (
                    <tr key={dest.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900">{dest.id}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{dest.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dest.country}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize
                          ${dest.category?.toLowerCase() === 'beach' ? 'bg-blue-100 text-blue-700' : ''}
                          ${dest.category?.toLowerCase() === 'mountain' ? 'bg-green-100 text-green-700' : ''}
                          ${dest.category?.toLowerCase() === 'city' ? 'bg-yellow-100 text-yellow-700' : ''}
                          ${dest.category?.toLowerCase() === 'safari' ? 'bg-orange-100 text-orange-700' : ''}
                          ${dest.category?.toLowerCase() === 'cultural' ? 'bg-purple-100 text-purple-700' : ''}
                          ${dest.category?.toLowerCase() === 'religious' ? 'bg-red-100 text-red-700' : ''}
                        `}>
                          {dest.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">${dest.price_per_night}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dest.rating || 0}</td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => handleDelete(dest.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDestinations;
