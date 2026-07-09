import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Hotels = () => {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hotels');
      const data = await response.json();
      console.log('Hotels API Response:', data);
      
      // Get hotels from the response
      const hotelData = data.data || data.hotels || [];
      console.log('Hotels found:', hotelData.length);
      
      setHotels(hotelData);
      if (hotelData.length === 0) {
        toast.error('No hotels found');
      } else {
        toast.success(`Found ${hotelData.length} hotels!`);
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      toast.error('Failed to load hotels');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (hotel) => {
    const bookingData = {
      name: hotel.hotel_name,
      location: hotel.location,
      price: hotel.price_per_night,
      type: 'Hotel',
      id: hotel.id
    };
    localStorage.setItem('bookingItem', JSON.stringify(bookingData));
    navigate('/booking');
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesSearch = hotel.hotel_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hotel.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          hotel.country?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || hotel.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(hotels.map(h => h.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading hotels...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Your Perfect Stay</h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Discover the world's finest hotels, resorts, and unique accommodations.
          </p>
          <p className="text-xs text-blue-200 mt-2">
            {hotels.length} hotels available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search hotels by name, location, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {filteredHotels.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No hotels found</p>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{hotel.hotel_name}</h3>
                    <span className="text-yellow-400 text-xs">⭐ {hotel.rating || 0}</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{hotel.location}, {hotel.country}</p>

                  <div className="flex items-center gap-1 mt-1.5">
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{hotel.category || 'Hotel'}</span>
                    <span className="text-[10px] text-gray-400">•</span>
                    <span className="text-[10px] text-gray-500">{hotel.reviews || 0} reviews</span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-[10px] text-gray-500">/night</p>
                      <p className="text-sm font-bold text-indigo-600">${hotel.price_per_night || 0}</p>
                    </div>
                    <button
                      onClick={() => handleBookNow(hotel)}
                      className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium rounded-lg hover:shadow-lg transition"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Hotels;
