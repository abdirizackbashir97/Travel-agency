import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaTimes } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

const AdminHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [formData, setFormData] = useState({
    hotel_name: '',
    location: '',
    country: '',
    category: '',
    rating: '',
    reviews: '',
    price_per_night: '',
    description: '',
    amenities: '',
    highlights: '',
    tagline: '',
  });

  const fetchHotels = async () => {
    try {
      const res = await fetch(`${API_BASE}/hotels`);
      const data = await res.json();
      setHotels(data.data || []);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditingHotel(null);
    setFormData({
      hotel_name: '',
      location: '',
      country: '',
      category: '',
      rating: '',
      reviews: '',
      price_per_night: '',
      description: '',
      amenities: '',
      highlights: '',
      tagline: '',
    });
    setShowModal(true);
  };

  const openEditModal = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      hotel_name: hotel.hotel_name || '',
      location: hotel.location || '',
      country: hotel.country || '',
      category: hotel.category || '',
      rating: hotel.rating || '',
      reviews: hotel.reviews || '',
      price_per_night: hotel.price_per_night || '',
      description: hotel.description || '',
      amenities: hotel.amenities || '',
      highlights: hotel.highlights || '',
      tagline: hotel.tagline || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingHotel
      ? `${API_BASE}/hotels/${editingHotel.id}`
      : `${API_BASE}/hotels`;
    const method = editingHotel ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchHotels();
        setShowModal(false);
        setEditingHotel(null);
      } else {
        const error = await res.json();
        alert('Error: ' + (error.message || 'Operation failed'));
      }
    } catch (error) {
      console.error('Error saving hotel:', error);
      alert('Network error');
    }
  };

  const deleteHotel = async (id) => {
    if (!window.confirm('Delete this hotel?')) return;
    try {
      const res = await fetch(`${API_BASE}/hotels/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchHotels();
      } else {
        alert('Failed to delete hotel');
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
    }
  };

  const toggleStatus = async (hotel) => {
    const newStatus = hotel.is_active === 1 ? 0 : 1;
    try {
      const res = await fetch(`${API_BASE}/hotels/${hotel.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: newStatus }),
      });
      if (res.ok) {
        fetchHotels();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filtered = hotels.filter(h =>
    h.hotel_name?.toLowerCase().includes(search.toLowerCase()) ||
    h.location?.toLowerCase().includes(search.toLowerCase()) ||
    h.country?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-gray-500">Loading hotels...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Hotels Management</h2>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FaPlus /> Add Hotel
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search hotels..."
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
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((h) => (
                <tr key={h.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{h.hotel_name}</td>
                  <td className="px-4 py-3">{h.location}</td>
                  <td className="px-4 py-3">{h.country}</td>
                  <td className="px-4 py-3">{h.category}</td>
                  <td className="px-4 py-3">{h.rating} ⭐</td>
                  <td className="px-4 py-3">${h.price_per_night}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      h.is_active === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {h.is_active === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(h)} className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button onClick={() => deleteHotel(h.id)} className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                      <button onClick={() => toggleStatus(h)} className="text-gray-600 hover:text-gray-800">
                        {h.is_active === 1 ? (
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
              {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
                  <input name="hotel_name" value={formData.hotel_name} onChange={handleChange} className="w-full border rounded-lg p-2" required />
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
                  <label className="block text-sm font-medium text-gray-700">Category</label>
                  <input name="category" value={formData.category} onChange={handleChange} className="w-full border rounded-lg p-2" required />
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
                  <label className="block text-sm font-medium text-gray-700">Tagline</label>
                  <input name="tagline" value={formData.tagline} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="2" className="w-full border rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amenities (comma separated)</label>
                <input name="amenities" value={formData.amenities} onChange={handleChange} className="w-full border rounded-lg p-2" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Highlights (comma separated)</label>
                <input name="highlights" value={formData.highlights} onChange={handleChange} className="w-full border rounded-lg p-2" required />
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  {editingHotel ? 'Update' : 'Create'}
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

export default AdminHotels;
