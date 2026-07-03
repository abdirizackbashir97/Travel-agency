import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Flights = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/flights');
      const data = await response.json();
      setFlights(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching flights:', error);
      toast.error('Failed to load flights');
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = (flight) => {
    const bookingData = {
      name: `${flight.airline} - ${flight.flight_number}`,
      location: `${flight.departure_city} → ${flight.arrival_city}`,
      price: flight.price,
      type: 'Flight',
      id: flight.id
    };
    localStorage.setItem('bookingItem', JSON.stringify(bookingData));
    navigate('/booking');
  };

  const filteredFlights = flights.filter(flight => {
    const search = searchTerm.toLowerCase();
    return flight.airline?.toLowerCase().includes(search) ||
           flight.flight_number?.toLowerCase().includes(search) ||
           flight.departure_city?.toLowerCase().includes(search) ||
           flight.arrival_city?.toLowerCase().includes(search);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading flights...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">Book Your Flights</h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Find the best deals on flights to your dream destinations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <input
          type="text"
          placeholder="Search flights..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {filteredFlights.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm sm:text-base">No flights found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {filteredFlights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden border border-gray-100">
                <div className="p-2 sm:p-3">
                  <div className="flex justify-between items-start mb-0.5">
                    <h3 className="font-semibold text-gray-800 text-[11px] sm:text-xs truncate">{flight.airline}</h3>
                    <span className="text-xs text-indigo-600">✈️</span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5">Flight: {flight.flight_number}</p>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-600 mb-0.5">
                    <span className="truncate">{flight.departure_city}</span>
                    <span className="text-gray-400">→</span>
                    <span className="truncate">{flight.arrival_city}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-[8px] sm:text-[10px] bg-blue-100 text-blue-700 px-1 py-0.5 rounded-full">{flight.flight_type || 'Direct'}</span>
                    <span className="text-[8px] sm:text-[10px] text-gray-500">{flight.duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-gray-100">
                    <div>
                      <p className="text-[8px] text-gray-500">Price</p>
                      <p className="text-xs sm:text-sm font-bold text-indigo-600">${flight.price || 0}</p>
                    </div>
                    <button
                      onClick={() => handleBookNow(flight)}
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
    </div>
  );
};

export default Flights;
