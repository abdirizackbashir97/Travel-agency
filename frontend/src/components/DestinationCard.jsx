import React from 'react';
import { Heart, MapPin, Star, Calendar, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DestinationCard = ({ destination, featured = false }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    const bookingData = {
      name: destination.name,
      location: destination.country,
      price: destination.price_per_night,
      type: 'Destination',
      id: destination.id
    };
    localStorage.setItem('bookingItem', JSON.stringify(bookingData));
    navigate('/booking');
  };

  return (
    <div 
      className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${
        featured ? 'md:col-span-2 row-span-2' : ''
      }`}
    >
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <div className={`w-full h-full bg-gradient-to-br ${getGradient(destination.id)} flex items-center justify-center`}>
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-500"></div>
          <div className="relative z-10 text-white text-center p-6">
            <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
            <p className="text-sm text-white/80 flex items-center justify-center gap-1">
              <MapPin className="w-3 h-3" />
              {destination.country}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-lg">
            {destination.category || 'Destination'}
          </span>
          {destination.rating >= 4.8 && (
            <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
              ⭐ Top Rated
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition shadow-lg group/heart">
          <Heart className="w-5 h-5 text-gray-600 group-hover/heart:text-red-500 transition" />
        </button>

        {/* Rating */}
        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-white font-semibold text-sm">{destination.rating || 0}</span>
          <span className="text-white/60 text-xs">({destination.reviews || 0} reviews)</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <p className="text-xs text-gray-500 mb-0.5">{destination.country}</p>
            <h4 className="text-lg font-bold text-gray-800 truncate">{destination.name}</h4>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Starting from</p>
            <p className="text-xl font-bold text-indigo-600">${destination.price_per_night || 0}</p>
            <p className="text-xs text-gray-400">/ night</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {destination.description || 'Beautiful destination waiting to be explored.'}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Best: {destination.best_time || 'Year round'}
            </span>
          </div>
          <button
            onClick={handleBookNow}
            className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to generate gradient based on ID
const getGradient = (id) => {
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-emerald-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
    'from-rose-500 to-pink-600',
    'from-amber-500 to-orange-600',
    'from-violet-500 to-purple-600',
    'from-fuchsia-500 to-pink-600',
    'from-sky-500 to-indigo-600',
  ];
  return gradients[id % gradients.length] || gradients[0];
};

export default DestinationCard;
