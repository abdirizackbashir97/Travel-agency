import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Tours = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTours();
  }, []);

  useEffect(() => {
    filterTours();
  }, [tours, searchTerm]);

  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tours');
      const data = await response.json();
      console.log('Tours API Response:', data);
      
      let tourData = [];
      if (data && data.data) {
        tourData = data.data;
      } else if (data && data.tours) {
        tourData = data.tours;
      } else if (Array.isArray(data)) {
        tourData = data;
      }
      
      setTours(tourData);
      setFilteredTours(tourData);
      
      if (tourData.length > 0) {
        toast.success(`Found ${tourData.length} tours!`);
      } else {
        toast.error('No tours found');
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast.error('Failed to load tours');
    } finally {
      setLoading(false);
    }
  };

  const filterTours = () => {
    let filtered = [...tours];
    
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t => 
        t.tour_name?.toLowerCase().includes(term) ||
        t.location?.toLowerCase().includes(term) ||
        t.country?.toLowerCase().includes(term) ||
        t.description?.toLowerCase().includes(term)
      );
    }
    
    setFilteredTours(filtered);
  };

  const handleBookNow = (tour) => {
    const bookingData = {
      name: tour.tour_name,
      location: tour.location,
      price: tour.price_per_person,
      type: 'Tour',
      id: tour.id
    };
    localStorage.setItem('bookingItem', JSON.stringify(bookingData));
    navigate('/booking');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Our Tours</h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Discover amazing tour packages and adventures around the world.
          </p>
          <p className="text-xs text-blue-200 mt-2">
            {tours.length} tours available
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search tours by name, location, or country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            Showing {filteredTours.length} of {tours.length} tours
          </div>
        </div>
      </div>

      {/* Tours Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredTours.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-2xl font-semibold text-gray-400 mb-2">No tours found</p>
            <p className="text-gray-500">Try adjusting your search</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden border border-gray-100 group">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800 group-hover:text-indigo-600 transition flex-1">
                      {tour.tour_name}
                    </h3>
                    <span className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg ml-2">
                      <span className="text-yellow-500">⭐</span>
                      <span className="text-sm font-semibold">{tour.rating || 0}</span>
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">
                    📍 {tour.location}, {tour.country}
                  </p>
                  
                  <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
                    <span>📅 {tour.duration_days} days</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                    {tour.description || 'Amazing tour experience waiting for you.'}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">per person</p>
                      <p className="text-xl font-bold text-indigo-600">${tour.price_per_person || 0}</p>
                    </div>
                    <button
                      onClick={() => handleBookNow(tour)}
                      className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
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

export default Tours;
