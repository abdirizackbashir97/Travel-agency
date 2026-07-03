import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Tours = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/tours');
      const data = await response.json();
      setTours(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching tours:', error);
      toast.error('Failed to load tours');
    } finally {
      setLoading(false);
    }
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

  const filteredTours = tours.filter(tour => {
    const search = searchTerm.toLowerCase();
    return tour.tour_name?.toLowerCase().includes(search) ||
           tour.location?.toLowerCase().includes(search) ||
           tour.country?.toLowerCase().includes(search) ||
           tour.description?.toLowerCase().includes(search);
  });

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
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Discover Amazing Tours</h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Explore the world with our curated tour experiences. From adventure to culture, find your perfect trip.
          </p>
          <p className="text-xs text-blue-200 mt-2">
            {tours.length} tours available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <input
          type="text"
          placeholder="Search tours..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {filteredTours.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No tours found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{tour.tour_name}</h3>
                    <span className="text-yellow-400 text-xs">⭐</span>
                  </div>
                  <p className="text-xs text-gray-600 truncate">{tour.location}, {tour.country}</p>
                  
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-semibold text-gray-700">{tour.rating || 0}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{tour.duration_days} Days</span>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{tour.description}</p>
                  
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
                    <div>
                      <p className="text-[10px] text-gray-500">/person</p>
                      <p className="text-base font-bold text-indigo-600">${tour.price_per_person || 0}</p>
                    </div>
                    <button
                      onClick={() => handleBookNow(tour)}
                      className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-medium rounded-lg hover:shadow-lg transition"
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
    </div>
  );
};

export default Tours;
