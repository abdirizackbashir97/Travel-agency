import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AdminHotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
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
    tagline: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/hotels');
      const data = await response.json();
      setHotels(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5002/api/hotels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          hotel_name: formData.hotel_name,
          location: formData.location,
          country: formData.country,
          category: formData.category || 'Hotel',
          rating: parseFloat(formData.rating) || 0,
          reviews: parseInt(formData.reviews) || 0,
          price_per_night: parseFloat(formData.price_per_night),
          description: formData.description || '',
          amenities: formData.amenities || '',
          highlights: formData.highlights || '',
          tagline: formData.tagline || ''
        })
      });

      const data = await response.json();
      if (response.ok) {
        toast.success('✅ Hotel added!');
        setFormData({ hotel_name: '', location: '', country: '', category: '', rating: '', reviews: '', price_per_night: '', description: '', amenities: '', highlights: '', tagline: '' });
        setShowForm(false);
        fetchHotels();
      } else {
        toast.error(data.error || 'Failed to add');
      }
    } catch (error) {
      toast.error('Network error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this hotel?')) return;
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`http://localhost:5002/api/hotels/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Deleted');
      fetchHotels();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">🏨 Manage Hotels</h1>
          <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            {showForm ? 'Cancel' : '+ Add Hotel'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Add Hotel</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="hotel_name" placeholder="Hotel Name *" value={formData.hotel_name} onChange={(e) => setFormData({...formData, hotel_name: e.target.value})} className="p-2 border rounded" required />
              <input name="location" placeholder="Location *" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="p-2 border rounded" required />
              <input name="country" placeholder="Country *" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="p-2 border rounded" required />
              <input name="category" placeholder="Category" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="p-2 border rounded" />
              <input name="rating" type="number" step="0.1" placeholder="Rating" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} className="p-2 border rounded" />
              <input name="reviews" type="number" placeholder="Reviews" value={formData.reviews} onChange={(e) => setFormData({...formData, reviews: e.target.value})} className="p-2 border rounded" />
              <input name="price_per_night" type="number" step="0.01" placeholder="Price *" value={formData.price_per_night} onChange={(e) => setFormData({...formData, price_per_night: e.target.value})} className="p-2 border rounded" required />
              <input name="tagline" placeholder="Tagline" value={formData.tagline} onChange={(e) => setFormData({...formData, tagline: e.target.value})} className="p-2 border rounded" />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="p-2 border rounded col-span-2" rows="2" />
              <textarea name="amenities" placeholder="Amenities" value={formData.amenities} onChange={(e) => setFormData({...formData, amenities: e.target.value})} className="p-2 border rounded col-span-2" rows="2" />
              <textarea name="highlights" placeholder="Highlights" value={formData.highlights} onChange={(e) => setFormData({...formData, highlights: e.target.value})} className="p-2 border rounded col-span-2" rows="2" />
              <button type="submit" className="col-span-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Add Hotel</button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Hotel</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 text-sm">{hotel.id}</td>
                  <td className="p-3 text-sm font-medium">{hotel.hotel_name}</td>
                  <td className="p-3 text-sm">{hotel.location}</td>
                  <td className="p-3 text-sm">{hotel.country}</td>
                  <td className="p-3 text-sm font-bold text-indigo-600">${hotel.price_per_night}</td>
                  <td className="p-3 text-sm"><button onClick={() => handleDelete(hotel.id)} className="text-red-600 hover:text-red-800">Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHotels;
