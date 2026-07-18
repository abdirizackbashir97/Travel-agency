import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Star, 
  ThumbsUp, 
  Eye, 
  MessageCircle, 
  Hotel, 
  Compass, 
  MapPin,
  Calendar,
  Edit,
  Trash2
} from 'lucide-react';

export default function UserReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalReviews: 0,
    helpfulVotes: 24,
    totalViews: 356,
    averageRating: 4.6
  });
  const [categoryStats, setCategoryStats] = useState({
    hotels: 6,
    tours: 4,
    destinations: 2
  });
  const [ratingDistribution, setRatingDistribution] = useState({
    '5': 7,
    '4': 3,
    '3': 1,
    '2': 1,
    '1': 0
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/user/reviews', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setReviews(response.data.reviews || []);
        setStats(prev => ({
          ...prev,
          totalReviews: response.data.reviews?.length || 0
        }));
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'hotel':
        return <Hotel size={16} className="text-indigo-500" />;
      case 'tour':
        return <Compass size={16} className="text-green-500" />;
      case 'destination':
        return <MapPin size={16} className="text-orange-500" />;
      default:
        return <MapPin size={16} className="text-gray-500" />;
    }
  };

  const statCards = [
    { 
      icon: MessageCircle, 
      title: 'Total Reviews', 
      value: stats.totalReviews, 
      iconColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50'
    },
    { 
      icon: ThumbsUp, 
      title: 'Helpful Votes', 
      value: stats.helpfulVotes, 
      iconColor: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      icon: Eye, 
      title: 'Total Views', 
      value: stats.totalViews, 
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    { 
      icon: Star, 
      title: 'Avg Rating', 
      value: stats.averageRating.toFixed(1), 
      iconColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-24 bg-gray-200 rounded-2xl"></div>
            ))}
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">⭐ My Reviews</h1>
        <p className="text-gray-500 text-sm">Share your experience and help other travelers</p>
      </div>

      {/* Stats Cards - White Cards with Colored Icons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl ${card.bgColor}`}>
                  <Icon size={20} className={card.iconColor} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
              <p className="text-sm text-gray-500 mt-1">{card.title}</p>
            </div>
          );
        })}
      </div>

      {/* Rating Breakdown & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Rating Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">⭐ Rating Breakdown</h3>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-bold text-gray-800">{stats.averageRating.toFixed(1)}</span>
            <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
          </div>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = ratingDistribution[star.toString()] || 0;
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600 w-6">{star}★</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        star >= 4 ? 'bg-green-500' : 
                        star >= 3 ? 'bg-yellow-500' : 
                        'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 mb-4">📂 Most Reviewed Categories</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Hotel size={20} className="text-indigo-500" />
                <span className="font-medium text-gray-700">Hotels</span>
              </div>
              <span className="text-sm font-bold text-indigo-600">{categoryStats.hotels} reviews</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Compass size={20} className="text-green-500" />
                <span className="font-medium text-gray-700">Tours & Activities</span>
              </div>
              <span className="text-sm font-bold text-green-600">{categoryStats.tours} reviews</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-orange-500" />
                <span className="font-medium text-gray-700">Destinations</span>
              </div>
              <span className="text-sm font-bold text-orange-600">{categoryStats.destinations} reviews</span>
            </div>
          </div>
        </div>
      </div>

      {/* Your Reviews List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">📝 Your Reviews</h3>
          <span className="text-sm text-gray-500">{reviews.length} reviews written</span>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">You haven't written any reviews yet</p>
            <Link to="/bookings" className="text-indigo-600 hover:underline text-sm mt-2 inline-block">
              Start exploring and share your experience
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div key={index} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      {getCategoryIcon(review.booking_type)}
                      <h4 className="font-semibold text-gray-800">{review.item_name || 'Review'}</h4>
                      <span className="text-xs text-gray-400">{review.location || ''}</span>
                    </div>
                    <div className="flex items-center gap-3 mb-2">
                      {renderStars(review.rating || 5)}
                      <span className="text-xs text-gray-400">
                        <Calendar size={12} className="inline mr-1" />
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{review.comment || 'Great experience!'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-indigo-600 transition">
                      <Edit size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Message */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Your reviews help other travelers make better decisions ✨</p>
      </div>
    </div>
  );
}
