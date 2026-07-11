import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaTimes } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [formData, setFormData] = useState({
    tour_name: '',
    location: '',
    country: '',
    rating: '',
    duration_days: '',
    price_per_person: '',
    description: '',
  });

  const fetchTours = async () => {
    try {
      const res = await fetch(`${API_BASE}/tours`);
      const data = await res.json();
      setTours(data.data || []);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditingTour(null);
    setFormData({
      tour_name: '',
      location: '',
      country: '',
      rating: '',
      duration_days: '',
      price_per_person: '',
      description: '',
    });
    setShowModal(true);
  };

  const openEditModal = (tour) => {
    setEditingTour(tour);
    setFormData({
      tour_name: tour.tour_name || '',
      location: tour.location || '',
      country: tour.country || '',
      rating: tour.rating || '',
      duration_days: tour.duration_days || '',
      price_per_person: tour.price_per_person || '',
      description: tour.description || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingTour
      ? `${API_BASE}/tours/${editingTour.id}`
      : `${API_BASE}/tours`;
    const method = editingTour ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchTours();
        setShowModal(false);
        setEditingTour(null);
      } else {
        const error = await res.json();
        alert('Error: ' + (error.message || 'Operation failed'));
      }
    } catch (error) {
      console.error('Error saving tour:', error);
      alert('Network error');
    }
  };

  const deleteTour = async (id) => {
    if (!window.confirm('Delete this tour?')) return;
    try {
      const res = await fetch(`${API_BASE}/tours/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchTours();
      } else {
        alert('Failed to delete tour');
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  const toggleStatus = async (tour) => {
    const newStatus = tour.is_active === 1 ? 0 : 1;
    try {
      const res = await fetch(`${API_BASE}/tours/${tour.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: newStatus }),
      });
      if (res.ok) {
        fetchTours();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filtered = tours.filter(t =>
    t.tour_name?.toLowerCase().includes(search.toLowerCase()) ||
    t.location?.toLowerCase().includes(search.toLowerCase()) ||
    t.country?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-gray-500">Loading tours...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tours Management</h2>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FaPlus /> Add Tour
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tours..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-sm text-gray-500">Total: {filtered.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Country</th>
                <th className="px-4 py-3 text-left">Duration</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{t.tour_name}</td>
                  <td className="px-4 py-3">{t.location}</td>
                  <td className="px-4 py-3">{t.country}</td>
                  <td className="px-4 py-3">{t.duration_days} days</td>
                  <td className="px-4 py-3">${t.price_per_person}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      t.is_active === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {t.is_active === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(t)} className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button onClick={() => deleteTour(t.id)} className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                      <button onClick={() => toggleStatus(t)} className="text-gray-600 hover:text-gray-800">
                        {t.is_active === 1 ? (
                          <FaToggleOn className="text-green-600" />
                        ) : (
                          <FaToggleOff className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingTour ? 'Edit Tour' : 'Add New Tour'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tour Name</label>
                  <input name="tour_name" value={formData.tour_name} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input name="country" value={formData.country} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration (days)</label>
                  <input type="number" name="duration_days" value={formData.duration_days} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price per Person ($)</label>
                  <input type="number" step="0.01" name="price_per_person" value={formData.price_per_person} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="w-full border rounded-lg p-2" required />
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  {editingTour ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
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

export default AdminTours;
