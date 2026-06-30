import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Star, Trash2, ShoppingCart, X } from 'lucide-react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      type: 'Destination',
      name: 'Dubai, UAE',
      image: '/images/destinations/dubai.png',
      price: 420,
      rating: 4.8,
      location: 'United Arab Emirates'
    },
    {
      id: 2,
      type: 'Hotel',
      name: 'Burj Al Arab',
      image: '/images/hotels/hotel_2.png',
      price: 750,
      rating: 4.9,
      location: 'Dubai, UAE'
    },
    {
      id: 3,
      type: 'Tour',
      name: 'Dubai Desert Safari',
      image: '/images/tours/tour_1.png',
      price: 150,
      rating: 4.7,
      location: 'Dubai, UAE'
    },
    {
      id: 4,
      type: 'Tour',
      name: 'Kenya Safari Adventure',
      image: '/images/tours/tour_2.png',
      price: 950,
      rating: 4.9,
      location: 'Kenya'
    },
    {
      id: 5,
      type: 'Tour',
      name: 'Greece Romantic Getaway',
      image: '/images/tours/tour_3.png',
      price: 1120,
      rating: 4.8,
      location: 'Greece'
    },
    {
      id: 6,
      type: 'Destination',
      name: 'Paris, France',
      image: '/images/destinations/paris.png',
      price: 520,
      rating: 4.9,
      location: 'France'
    },
  ]);

  const removeFromWishlist = (id) => {
    if (window.confirm('Remove this item from your wishlist?')) {
      setWishlistItems(wishlistItems.filter(item => item.id !== id));
    }
  };

  const handleBookNow = (item) => {
    localStorage.setItem('bookingItem', JSON.stringify({
      name: item.name,
      location: item.location,
      price: item.price,
      type: item.type,
      image: item.image
    }));
    window.location.href = '/booking';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-gray-500 mt-1">Your saved destinations, hotels, and tours</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">{wishlistItems.length} items</span>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 mb-6">Start exploring and saving your favorite destinations</p>
          <Link to="/destinations" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Explore Destinations
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = '/placeholder.svg';
                  }}
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-red-50 transition-colors group"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                </button>
                <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span>{item.rating}</span>
                </div>
                <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg">
                  {item.type}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">${item.price}</div>
                    <div className="text-xs text-gray-400">{item.type === 'Tour' ? 'per person' : 'per night'}</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleBookNow(item)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
