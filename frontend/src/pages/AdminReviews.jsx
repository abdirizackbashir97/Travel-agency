import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaTrash, FaStar, FaStarHalfAlt, FaRegStar, FaSync } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/reviews`);
      const data = await res.json();
      setReviews(data.data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const deleteReview = async (id) => {
    if (!window.confirm('Delete this review?')) return;
    try {
      const res = await fetch(`${API_BASE}/reviews/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchReviews();
      } else {
        alert('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  const filtered = reviews.filter(r =>
    r.user_name?.toLowerCase().includes(search.toLowerCase()) ||
    r.item_name?.toLowerCase().includes(search.toLowerCase()) ||
    r.comment?.toLowerCase().includes(search.toLowerCase()) ||
    r.item_type?.toLowerCase().includes(search.toLowerCase())
  );

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : 0;
  const fiveStar = reviews.filter(r => r.rating === 5).length;
  const fourStar = reviews.filter(r => r.rating === 4).length;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300" />);
      }
    }
    return stars;
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading reviews...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Reviews Management</h2>
        <button
          onClick={fetchReviews}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition flex items-center gap-2"
        >
          <FaSync className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500">Total Reviews</p>
          <p className="text-3xl font-bold text-gray-800">{totalReviews}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500">Average Rating</p>
          <p className="text-3xl font-bold text-gray-800">{avgRating} ⭐</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500">5-Star Reviews</p>
          <p className="text-3xl font-bold text-green-600">{fiveStar}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <p className="text-sm text-gray-500">4-Star Reviews</p>
          <p className="text-3xl font-bold text-blue-600">{fourStar}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-sm text-gray-500">Showing {filtered.length} of {totalReviews}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Item</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Rating</th>
                <th className="px-4 py-3 text-left">Comment</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{r.user_name || 'Unknown'}</td>
                  <td className="px-4 py-3">{r.item_name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      r.item_type === 'Destination' ? 'bg-blue-100 text-blue-800' :
                      r.item_type === 'Hotel' ? 'bg-green-100 text-green-800' :
                      r.item_type === 'Flight' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {r.item_type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1">
                      {renderStars(r.rating)}
                      <span className="ml-1 text-gray-600">({r.rating})</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-xs truncate">{r.comment}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {r.date ? new Date(r.date).toLocaleDateString() : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 transition" title="View Details">
                        <FaEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteReview(r.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        title="Delete Review"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr className="border-t border-gray-100">
                  <td colSpan="7" className="px-4 py-6 text-center text-gray-500">
                    No reviews found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminReviews;
