import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, Search, 
  Save, X, MapPin,
  Star, CheckCircle,
  AlertCircle, RefreshCw, Image
} from 'lucide-react';

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    price: '',
    rating: '',
    description: '',
    category: 'city',
    image: '',
    highlights: [],
    bestTime: '',
    vibe: ''
  });
  const [highlightInput, setHighlightInput] = useState('');

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = () => {
    setLoading(true);
    const saved = localStorage.getItem('adminDestinations');
    if (saved) {
      setDestinations(JSON.parse(saved));
    } else {
      const defaultDestinations = [
        {
          id: 1,
          name: 'Dubai',
          country: 'UAE',
          price: 420,
          rating: 4.8,
          description: 'Experience luxury, adventure, and culture in the heart of the desert.',
          category: 'city',
          image: '/images/destinations/dubai.png',
          highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Palm Jumeirah'],
          bestTime: 'November to March',
          vibe: 'Luxury & Adventure'
        },
        {
          id: 2,
          name: 'Paris',
          country: 'France',
          price: 520,
          rating: 4.9,
          description: 'The City of Light - romance, art, and elegance at every corner.',
          category: 'city',
          image: '/images/destinations/paris.png',
          highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées'],
          bestTime: 'April to June, September to November',
          vibe: 'Romance & Art'
        },
        {
          id: 3,
          name: 'Zanzibar',
          country: 'Tanzania',
          price: 350,
          rating: 4.7,
          description: 'Spice Island paradise with pristine white sand beaches.',
          category: 'beach',
          image: '/images/destinations/beach_1.png',
          highlights: ['Nungwi Beach', 'Stone Town', 'Prison Island', 'Spice Tours'],
          bestTime: 'June to October, December to February',
          vibe: 'Tropical Paradise'
        }
      ];
      setDestinations(defaultDestinations);
      localStorage.setItem('adminDestinations', JSON.stringify(defaultDestinations));
    }
    setLoading(false);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdd = () => {
    setEditingDestination(null);
    setFormData({
      name: '',
      country: '',
      price: '',
      rating: '',
      description: '',
      category: 'city',
      image: '',
      highlights: [],
      bestTime: '',
      vibe: ''
    });
    setHighlightInput('');
    setIsModalOpen(true);
  };

  const handleEdit = (destination) => {
    setEditingDestination(destination);
    setFormData({
      name: destination.name,
      country: destination.country,
      price: destination.price,
      rating: destination.rating,
      description: destination.description,
      category: destination.category,
      image: destination.image,
      highlights: [...destination.highlights],
      bestTime: destination.bestTime,
      vibe: destination.vibe
    });
    setHighlightInput('');
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this destination?')) {
      const updated = destinations.filter(d => d.id !== id);
      setDestinations(updated);
      localStorage.setItem('adminDestinations', JSON.stringify(updated));
      showNotification('Destination deleted successfully!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.country || !formData.price || !formData.image) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    if (editingDestination) {
      const updated = destinations.map(d => 
        d.id === editingDestination.id 
          ? { ...formData, id: d.id, price: parseFloat(formData.price), rating: parseFloat(formData.rating) || 4.5 }
          : d
      );
      setDestinations(updated);
      localStorage.setItem('adminDestinations', JSON.stringify(updated));
      showNotification('Destination updated successfully!');
    } else {
      const newDestination = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating) || 4.5
      };
      const updated = [...destinations, newDestination];
      setDestinations(updated);
      localStorage.setItem('adminDestinations', JSON.stringify(updated));
      showNotification('New destination added successfully!');
    }
    setIsModalOpen(false);
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData({
        ...formData,
        highlights: [...formData.highlights, highlightInput.trim()]
      });
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (index) => {
    const updated = formData.highlights.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      highlights: updated
    });
  };

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryEmoji = (category) => {
    switch(category) {
      case 'city': return '🏙️';
      case 'beach': return '🏖️';
      case 'mountain': return '⛰️';
      case 'religious': return '🕌';
      default: return '🌍';
    }
  };

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
            <span className="text-gray-900 font-medium">Destinations</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Destinations</h1>
          <p className="text-gray-500 mt-1">Add, edit, and delete destinations</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Destination
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">Total: <strong className="text-gray-900">{destinations.length}</strong></span>
            <button onClick={loadDestinations} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : filteredDestinations.length === 0 ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No destinations found</td></tr>
              ) : (
                filteredDestinations.map((destination) => (
                  <tr key={destination.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={destination.image || '/placeholder.svg'}
                        alt={destination.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        onError={(e) => { e.target.src = '/placeholder.svg'; }}
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{destination.name}</td>
                    <td className="px-6 py-4 text-gray-600">{destination.country}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        {getCategoryEmoji(destination.category)} {destination.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-blue-600">${destination.price}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {destination.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(destination)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(destination.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingDestination ? 'Edit Destination' : 'Add New Destination'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="https://example.com/image.jpg or /images/destinations/dubai.png"
                    required
                  />
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Preview" className="h-24 w-full object-contain rounded-lg border border-gray-200 bg-gray-50" onError={(e) => { e.target.src = '/placeholder.svg'; }} />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) <span className="text-red-500">*</span></label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input type="number" step="0.1" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="4.5" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                  <option value="city">City</option>
                  <option value="beach">Beach</option>
                  <option value="mountain">Mountain</option>
                  <option value="religious">Religious</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Visit</label>
                <input type="text" value={formData.bestTime} onChange={(e) => setFormData({ ...formData, bestTime: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="November to March" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vibe</label>
                <input type="text" value={formData.vibe} onChange={(e) => setFormData({ ...formData, vibe: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Luxury & Adventure" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Highlights</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="Add a highlight..."
                  />
                  <button
                    type="button"
                    onClick={handleAddHighlight}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.highlights.map((highlight, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {highlight}
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(index)}
                        className="text-blue-500 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button type="submit" className="flex-1 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  {editingDestination ? 'Update Destination' : 'Add Destination'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors">
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
