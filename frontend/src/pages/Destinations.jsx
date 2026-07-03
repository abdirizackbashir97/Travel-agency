import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Destinations = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/destinations');
      const data = await response.json();
      setDestinations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast.error('Failed to load destinations');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (dest) => {
    const bookingData = {
      name: dest.name,
      location: dest.country,
      price: dest.price_per_night,
      type: 'Destination',
      id: dest.id
    };
    localStorage.setItem('bookingItem', JSON.stringify(bookingData));
    navigate('/booking');
  };

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dest.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          dest.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(destinations.map(d => d.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Amazing Destinations</h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Discover breathtaking places around the world and plan your next adventure.
          </p>
          <p className="text-xs text-blue-200 mt-2">
            {destinations.length} destinations available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search destinations..."
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
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm">No destinations found</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {filteredDestinations.map((dest) => (
              <div key={dest.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
                <div className="p-2">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-semibold text-gray-800 text-[11px] sm:text-xs truncate max-w-[60px]">{dest.name}</h3>
                    <span className="text-yellow-400 text-[10px]">⭐</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 truncate">{dest.country}</p>
                  
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-700">{dest.rating || 0}</span>
                    <span className="text-[9px] text-gray-400">•</span>
                    <span className="text-[8px] sm:text-[10px] bg-blue-100 text-blue-700 px-1 py-0.5 rounded-full">{dest.category || 'Destination'}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-gray-100">
                    <div>
                      <p className="text-[8px] text-gray-500">/night</p>
                      <p className="text-xs sm:text-sm font-bold text-indigo-600">${dest.price_per_night || 0}</p>
                    </div>
                    <button
                      onClick={() => handleBookNow(dest)}
                      className="px-2 py-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-[9px] sm:text-[10px] font-medium rounded hover:shadow-lg transition"
                    >
                      Book
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

export default Destinations;
