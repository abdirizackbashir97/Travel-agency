import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, Search, Save, X, 
  Hotel, MapPin, Star, DollarSign, 
  CheckCircle, AlertCircle, RefreshCw, 
  Link as LinkIcon, Wifi, Car, Utensils, Dumbbell, Sparkles, Waves
} from 'lucide-react';

const AdminHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    rating: '',
    description: '',
    category: 'luxury',
    vibe: '',
    image: '',
    amenities: [],
    highlights: []
  });
  const [amenityInput, setAmenityInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');

  const imageExamples = [
    '/images/hotels/hotel_1.png',
    '/images/hotels/hotel_2.png',
    '/images/hotels/hotel_3.png',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
  ];

  const amenityOptions = ['wifi', 'parking', 'pool', 'spa', 'restaurant', 'fitness'];
  const categoryOptions = ['luxury', 'resort', 'safari', 'eco', 'boutique'];
  const vibeOptions = ['Ultimate Luxury', 'Tropical Paradise', 'Parisian Elegance', 'Asian Elegance', 'NYC Classic', 'Wilderness Adventure', 'Off-Grid Escape'];

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = () => {
    setLoading(true);
    const saved = localStorage.getItem('adminHotels');
    if (saved) {
      setHotels(JSON.parse(saved));
    } else {
      const defaultHotels = [
        {
          id: 1,
          name: 'Emirates Palace',
          location: 'Abu Dhabi, UAE',
          price: 450,
          rating: 4.9,
          description: 'Luxury beachfront resort with stunning Arabian architecture.',
          category: 'luxury',
          vibe: 'Ultimate Luxury',
          image: '/images/hotels/hotel_1.png',
          amenities: ['wifi', 'parking', 'pool', 'spa', 'restaurant'],
          highlights: ['Private Beach', 'Michelin Restaurant', 'Luxury Spa']
        },
        {
          id: 2,
          name: 'Burj Al Arab',
          location: 'Dubai, UAE',
          price: 750,
          rating: 4.9,
          description: 'Iconic sail-shaped hotel offering ultimate luxury.',
          category: 'luxury',
          vibe: '7-Star Luxury',
          image: '/images/hotels/hotel_2.png',
          amenities: ['wifi', 'parking', 'pool', 'spa', 'restaurant', 'fitness'],
          highlights: ['Helipad', 'Underwater Restaurant', 'Butler Service']
        },
        {
          id: 3,
          name: 'Four Seasons Resort',
          location: 'Maldives',
          price: 580,
          rating: 4.8,
          description: 'Overwater villas with breathtaking ocean views.',
          category: 'resort',
          vibe: 'Tropical Paradise',
          image: '/images/hotels/hotel_3.png',
          amenities: ['wifi', 'pool', 'spa', 'restaurant'],
          highlights: ['Overwater Villas', 'Private Pool', 'Sunset Cruises']
        }
      ];
      setHotels(defaultHotels);
      localStorage.setItem('adminHotels', JSON.stringify(defaultHotels));
    }
    setLoading(false);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdd = () => {
    setEditingHotel(null);
    setFormData({
      name: '',
      location: '',
      price: '',
      rating: '',
      description: '',
      category: 'luxury',
      vibe: '',
      image: '',
      amenities: [],
      highlights: []
    });
    setAmenityInput('');
    setHighlightInput('');
    setIsModalOpen(true);
  };

  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData({
      name: hotel.name,
      location: hotel.location,
      price: hotel.price,
      rating: hotel.rating,
      description: hotel.description,
      category: hotel.category,
      vibe: hotel.vibe,
      image: hotel.image || '',
      amenities: [...hotel.amenities],
      highlights: [...hotel.highlights]
    });
    setAmenityInput('');
    setHighlightInput('');
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      const updated = hotels.filter(h => h.id !== id);
      setHotels(updated);
      localStorage.setItem('adminHotels', JSON.stringify(updated));
      showNotification('Hotel deleted successfully!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.price) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    if (editingHotel) {
      const updated = hotels.map(h => 
        h.id === editingHotel.id 
          ? { ...formData, id: h.id, price: parseFloat(formData.price), rating: parseFloat(formData.rating) || 4.5 }
          : h
      );
      setHotels(updated);
      localStorage.setItem('adminHotels', JSON.stringify(updated));
      showNotification('Hotel updated successfully!');
    } else {
      const newHotel = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating) || 4.5
      };
      const updated = [...hotels, newHotel];
      setHotels(updated);
      localStorage.setItem('adminHotels', JSON.stringify(updated));
      showNotification('New hotel added successfully!');
    }
    setIsModalOpen(false);
  };

  const handleAddAmenity = () => {
    if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, amenityInput.trim()]
      });
      setAmenityInput('');
    }
  };

  const handleRemoveAmenity = (index) => {
    const updated = formData.amenities.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      amenities: updated
    });
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

  const filteredHotels = hotels.filter(h => 
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryEmoji = (category) => {
    switch(category) {
      case 'luxury': return '🌟';
      case 'resort': return '🏖️';
      case 'safari': return '🦁';
      case 'eco': return '🌿';
      case 'boutique': return '🏨';
      default: return '🏨';
    }
  };

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: Wifi,
      parking: Car,
      pool: Waves,
      spa: Sparkles,
      restaurant: Utensils,
      fitness: Dumbbell,
    };
    return icons[amenity] || null;
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
            <span className="text-gray-900 font-medium">Hotels</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Hotels</h1>
          <p className="text-gray-500 mt-1">Add, edit, and delete hotels</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Hotel
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search hotels..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">Total: <strong className="text-gray-900">{hotels.length}</strong></span>
            <button onClick={loadHotels} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : filteredHotels.length === 0 ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No hotels found</td></tr>
              ) : (
                filteredHotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img
                        src={hotel.image || '/placeholder.svg'}
                        alt={hotel.name}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        onError={(e) => { e.target.src = '/placeholder.svg'; }}
                      />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{hotel.name}</td>
                    <td className="px-6 py-4 text-gray-600">{hotel.location}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                        {getCategoryEmoji(hotel.category)} {hotel.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-blue-600">${hotel.price}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {hotel.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(hotel)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(hotel.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                {editingHotel ? 'Edit Hotel' : 'Add New Hotel'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                  <span className="text-xs text-gray-400 ml-2">(Paste an image link)</span>
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    placeholder="https://example.com/hotel.jpg or /images/hotels/hotel_1.png"
                  />
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Preview" className="h-24 w-full object-contain rounded-lg border border-gray-200 bg-gray-50" onError={(e) => { e.target.src = '/placeholder.svg'; }} />
                  </div>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                  {imageExamples.map((url, index) => (
                    <button key={index} type="button" onClick={() => setFormData({ ...formData, image: url })} className="text-xs text-blue-600 hover:text-blue-800 underline bg-blue-50 px-2 py-0.5 rounded">
                      Example {index + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hotel Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input type="number" step="0.1" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="4.5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Vibe</label>
                  <select value={formData.vibe} onChange={(e) => setFormData({ ...formData, vibe: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="">Select Vibe</option>
                    {vibeOptions.map((vibe) => (
                      <option key={vibe} value={vibe}>{vibe}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                <div className="flex gap-2 mb-2">
                  <select
                    value={amenityInput}
                    onChange={(e) => setAmenityInput(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Select an amenity...</option>
                    {amenityOptions.map((amenity) => (
                      <option key={amenity} value={amenity}>{amenity}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={handleAddAmenity}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                    >
                      {amenity}
                      <button
                        type="button"
                        onClick={() => handleRemoveAmenity(index)}
                        className="text-blue-500 hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
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
                      className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                    >
                      {highlight}
                      <button
                        type="button"
                        onClick={() => handleRemoveHighlight(index)}
                        className="text-green-500 hover:text-red-500 transition-colors"
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
                  {editingHotel ? 'Update Hotel' : 'Add Hotel'}
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

export default AdminHotels;
