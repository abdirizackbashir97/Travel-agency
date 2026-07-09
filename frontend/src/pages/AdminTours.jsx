import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AdminTours = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    tour_name: '',
    location: '',
    country: '',
    rating: '',
    duration_days: '',
    price_per_person: '',
    description: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tours');
      const data = await response.json();
      setTours(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast.error('Failed to load tours');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.tour_name || !formData.location || !formData.country || !formData.duration_days || !formData.price_per_person) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          tour_name: formData.tour_name,
          location: formData.location,
          country: formData.country,
          rating: parseFloat(formData.rating) || 0,
          duration_days: parseInt(formData.duration_days),
          price_per_person: parseFloat(formData.price_per_person),
          description: formData.description || ''
        })
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('✅ Tour added successfully!');
        setFormData({
          tour_name: '',
          location: '',
          country: '',
          rating: '',
          duration_days: '',
          price_per_person: '',
          description: ''
        });
        setShowForm(false);
        fetchTours();
      } else {
        toast.error(data.error || 'Failed to add tour');
      }
    } catch (error) {
      console.error('Error adding tour:', error);
      toast.error('Network error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this tour?')) return;
    
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:5000/api/tours/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        toast.success('Tour deleted successfully');
        fetchTours();
      } else {
        toast.error('Failed to delete tour');
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
      toast.error('Network error');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">🧳 Manage Tours</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {showForm ? 'Cancel' : '+ Add Tour'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Tour</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="tour_name"
                placeholder="Tour Name *"
                value={formData.tour_name}
                onChange={(e) => setFormData({...formData, tour_name: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location *"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                name="country"
                placeholder="Country *"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                value={formData.rating}
                onChange={(e) => setFormData({...formData, rating: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                step="0.1"
                min="0"
                max="5"
              />
              <input
                type="number"
                name="duration_days"
                placeholder="Duration (days) *"
                value={formData.duration_days}
                onChange={(e) => setFormData({...formData, duration_days: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="number"
                name="price_per_person"
                placeholder="Price per person *"
                value={formData.price_per_person}
                onChange={(e) => setFormData({...formData, price_per_person: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                required
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="col-span-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                rows="3"
              />
              <button
                type="submit"
                className="col-span-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Tour
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tour Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {tours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-900">{tour.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{tour.tour_name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{tour.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{tour.country}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{tour.duration_days}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">${tour.price_per_person}</td>
                    <td className="px-6 py-4 text-sm space-x-2">
                      <button
                        onClick={() => handleDelete(tour.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTours;
