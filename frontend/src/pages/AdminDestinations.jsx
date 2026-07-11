import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaTimes } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDest, setEditingDest] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    category: '',
    rating: '',
    reviews: '',
    price_per_night: '',
    description: '',
    attractions: '',
    best_time: '',
    city: '',
  });

  const fetchDestinations = async () => {
    try {
      const res = await fetch(`${API_BASE}/destinations`);
      const data = await res.json();
      setDestinations(data.data || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditingDest(null);
    setFormData({
      name: '',
      country: '',
      category: '',
      rating: '',
      reviews: '',
      price_per_night: '',
      description: '',
      attractions: '',
      best_time: '',
      city: '',
    });
    setShowModal(true);
  };

  const openEditModal = (dest) => {
    setEditingDest(dest);
    setFormData({
      name: dest.name || '',
      country: dest.country || '',
      category: dest.category || '',
      rating: dest.rating || '',
      reviews: dest.reviews || '',
      price_per_night: dest.price_per_night || '',
      description: dest.description || '',
      attractions: dest.attractions || '',
      best_time: dest.best_time || '',
      city: dest.city || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingDest
      ? `${API_BASE}/destinations/${editingDest.id}`
      : `${API_BASE}/destinations`;
    const method = editingDest ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchDestinations();
        setShowModal(false);
        setEditingDest(null);
      } else {
        const error = await res.json();
        alert('Error: ' + (error.message || 'Operation failed'));
      }
    } catch (error) {
      console.error('Error saving destination:', error);
      alert('Network error');
    }
  };

  const deleteDestination = async (id) => {
    if (!window.confirm('Delete this destination?')) return;
    try {
      const res = await fetch(`${API_BASE}/destinations/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchDestinations();
      } else {
        alert('Failed to delete destination');
      }
    } catch (error) {
      console.error('Error deleting destination:', error);
    }
  };

  const toggleStatus = async (dest) => {
    const newStatus = dest.is_active === 1 ? 0 : 1;
    try {
      const res = await fetch(`${API_BASE}/destinations/${dest.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: newStatus }),
      });
      if (res.ok) {
        fetchDestinations();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filtered = destinations.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase()) ||
    d.country?.toLowerCase().includes(search.toLowerCase()) ||
    d.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-gray-500">Loading destinations...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Destinations Management</h2>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FaPlus /> Add Destination
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search destinations..."
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
                <th className="px-4 py-3 text-left">Country</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr key={d.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{d.name}</td>
                  <td className="px-4 py-3">{d.country}</td>
                  <td className="px-4 py-3">{d.category}</td>
                  <td className="px-4 py-3">{d.rating} ⭐</td>
                  <td className="px-4 py-3">${d.price_per_night}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      d.is_active === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {d.is_active === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(d)} className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button onClick={() => deleteDestination(d.id)} className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                      <button onClick={() => toggleStatus(d)} className="text-gray-600 hover:text-gray-800">
                        {d.is_active === 1 ? (
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
              {editingDest ? 'Edit Destination' : 'Add New Destination'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Country</label>
                  <input name="country" value={formData.country} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">City</label>
                  <input name="city" value={formData.city} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Rating</label>
                  <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Reviews</label>
                  <input type="number" name="reviews" value={formData.reviews} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price per Night ($)</label>
                  <input type="number" step="0.01" name="price_per_night" value={formData.price_per_night} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Best Time</label>
                  <input name="best_time" value={formData.best_time} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="2" className="w-full border rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Attractions (comma separated)</label>
                <input name="attractions" value={formData.attractions} onChange={handleChange} className="w-full border rounded-lg p-2" required />
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  {editingDest ? 'Update' : 'Create'}
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

export default AdminDestinations;
