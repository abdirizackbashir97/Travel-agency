import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, Search, Save, X, 
  Package, MapPin, Clock, DollarSign, 
  CheckCircle, AlertCircle, RefreshCw, Star, Image
} from 'lucide-react';

const AdminTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    duration: '',
    rating: '',
    description: '',
    includes: '',
    badge: '',
    badgeColor: 'bg-green-500',
    image: ''
  });

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = () => {
    setLoading(true);
    const saved = localStorage.getItem('adminTours');
    if (saved) {
      setTours(JSON.parse(saved));
    } else {
      const defaultTours = [
        {
          id: 1,
          name: 'Maldives Escape',
          location: 'Maldives',
          price: 780,
          duration: '4 Days / 3 Nights',
          rating: 4.9,
          description: 'Overwater bungalows and crystal clear waters.',
          includes: 'Flight + Hotel + Transfer',
          badge: 'BEST SELLER',
          badgeColor: 'bg-green-500',
          image: '/images/tours/tour_1.png'
        },
        {
          id: 2,
          name: 'Kenya Safari Adventure',
          location: 'Kenya',
          price: 950,
          duration: '5 Days / 4 Nights',
          rating: 4.8,
          description: 'Witness the Great Migration and spot the Big Five.',
          includes: 'Safari + Hotel + Meals',
          badge: 'FAMILY PACKAGE',
          badgeColor: 'bg-blue-500',
          image: '/images/tours/tour_2.png'
        }
      ];
      setTours(defaultTours);
      localStorage.setItem('adminTours', JSON.stringify(defaultTours));
    }
    setLoading(false);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdd = () => {
    setEditingTour(null);
    setFormData({
      name: '',
      location: '',
      price: '',
      duration: '',
      rating: '',
      description: '',
      includes: '',
      badge: '',
      badgeColor: 'bg-green-500',
      image: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    setFormData({
      name: tour.name,
      location: tour.location,
      price: tour.price,
      duration: tour.duration,
      rating: tour.rating,
      description: tour.description,
      includes: tour.includes,
      badge: tour.badge,
      badgeColor: tour.badgeColor,
      image: tour.image || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      const updated = tours.filter(t => t.id !== id);
      setTours(updated);
      localStorage.setItem('adminTours', JSON.stringify(updated));
      showNotification('Tour deleted successfully!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.location || !formData.price || !formData.image) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    if (editingTour) {
      const updated = tours.map(t => 
        t.id === editingTour.id 
          ? { ...formData, id: t.id, price: parseFloat(formData.price), rating: parseFloat(formData.rating) || 4.5 }
          : t
      );
      setTours(updated);
      localStorage.setItem('adminTours', JSON.stringify(updated));
      showNotification('Tour updated successfully!');
    } else {
      const newTour = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating) || 4.5
      };
      const updated = [...tours, newTour];
      setTours(updated);
      localStorage.setItem('adminTours', JSON.stringify(updated));
      showNotification('New tour added successfully!');
    }
    setIsModalOpen(false);
  };

  const filteredTours = tours.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const badgeOptions = [
    { value: 'bg-green-500', label: 'Green' },
    { value: 'bg-blue-500', label: 'Blue' },
    { value: 'bg-pink-500', label: 'Pink' },
    { value: 'bg-yellow-500', label: 'Yellow' },
    { value: 'bg-purple-500', label: 'Purple' },
    { value: 'bg-red-500', label: 'Red' },
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
            <span className="text-gray-900 font-medium">Tours</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Tours</h1>
          <p className="text-gray-500 mt-1">Add, edit, and delete tour packages</p>
        </div>
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Tour
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search tours..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">Total: <strong className="text-gray-900">{tours.length}</strong></span>
            <button onClick={loadTours} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : filteredTours.length === 0 ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No tours found</td></tr>
              ) : (
                filteredTours.map((tour) => (
                  <tr key={tour.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img src={tour.image || '/placeholder.svg'} alt={tour.name} className="w-12 h-12 rounded-lg object-cover border border-gray-200" onError={(e) => { e.target.src = '/placeholder.svg'; }} />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{tour.name}</td>
                    <td className="px-6 py-4 text-gray-600">{tour.location}</td>
                    <td className="px-6 py-4 font-medium text-blue-600">${tour.price}</td>
                    <td className="px-6 py-4 text-gray-600">{tour.duration}</td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        {tour.rating}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(tour)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(tour.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                {editingTour ? 'Edit Tour' : 'Add New Tour'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="https://example.com/tour.jpg" required />
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Preview" className="h-24 w-full object-contain rounded-lg border border-gray-200 bg-gray-50" onError={(e) => { e.target.src = '/placeholder.svg'; }} />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tour Name <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) <span className="text-red-500">*</span></label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="4 Days / 3 Nights" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <input type="number" step="0.1" value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="4.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Badge</label>
                  <input type="text" value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="BEST SELLER" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Badge Color</label>
                <select value={formData.badgeColor} onChange={(e) => setFormData({ ...formData, badgeColor: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                  {badgeOptions.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Includes</label>
                <input type="text" value={formData.includes} onChange={(e) => setFormData({ ...formData, includes: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Flight + Hotel + Transfer" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows="3" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button type="submit" className="flex-1 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  {editingTour ? 'Update Tour' : 'Add Tour'}
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

export default AdminTours;
