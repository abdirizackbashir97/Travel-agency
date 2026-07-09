import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Flights = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    fetchFlights();
  }, []);

  useEffect(() => {
    filterFlights();
  }, [flights, searchTerm, origin, destination, date]);

  const fetchFlights = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/flights');
      const data = await response.json();
      console.log('Flights API Response:', data);
      
      // Handle different response formats
      let flightData = [];
      if (data && data.data) {
        flightData = data.data;
      } else if (data && data.flights) {
        flightData = data.flights;
      } else if (Array.isArray(data)) {
        flightData = data;
      }
      
      setFlights(flightData);
      setFilteredFlights(flightData);
      
      if (flightData.length > 0) {
        toast.success(`Found ${flightData.length} flights!`);
      } else {
        toast.error('No flights found');
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      toast.error('Failed to load flights');
    } finally {
      setLoading(false);
    }
  };

  const filterFlights = () => {
    let filtered = [...flights];

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(f => 
        f.airline?.toLowerCase().includes(term) ||
        f.flight_number?.toLowerCase().includes(term) ||
        f.departure_city?.toLowerCase().includes(term) ||
        f.arrival_city?.toLowerCase().includes(term) ||
        f.departure_airport?.toLowerCase().includes(term) ||
        f.arrival_airport?.toLowerCase().includes(term)
      );
    }

    // Filter by origin
    if (origin.trim() !== '') {
      filtered = filtered.filter(f => 
        f.departure_city?.toLowerCase().includes(origin.toLowerCase()) ||
        f.departure_airport?.toLowerCase().includes(origin.toLowerCase())
      );
    }

    // Filter by destination
    if (destination.trim() !== '') {
      filtered = filtered.filter(f => 
        f.arrival_city?.toLowerCase().includes(destination.toLowerCase()) ||
        f.arrival_airport?.toLowerCase().includes(destination.toLowerCase())
      );
    }

    // Filter by date
    if (date.trim() !== '') {
      filtered = filtered.filter(f => f.travel_date === date);
    }

    setFilteredFlights(filtered);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading flights...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Book Your Flight</h1>
          <p className="text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
            Find and book the best flights to your dream destinations.
          </p>
          <p className="text-xs text-blue-200 mt-2">
            {flights.length} flights available
          </p>
        </div>
      </div>

      {/* Search Filters */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search airline, city, airport..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
            <input
              type="text"
              placeholder="From (city or airport)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
            <input
              type="text"
              placeholder="To (city or airport)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
            />
          </div>
          <div className="mt-3 text-sm text-gray-500">
            Showing {filteredFlights.length} of {flights.length} flights
          </div>
        </div>
      </div>

      {/* Flights Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredFlights.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl">
            <p className="text-xl font-semibold text-gray-400">No flights found</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search filters</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setOrigin('');
                setDestination('');
                setDate('');
              }}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFlights.map((flight) => (
              <div key={flight.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden border border-gray-100">
                <div className="p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                        {flight.airline?.charAt(0) || '✈'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{flight.airline}</h3>
                        <p className="text-xs text-gray-500">{flight.flight_number}</p>
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="font-bold text-lg">{flight.departure_time}</p>
                      <p className="text-xs text-gray-500">{flight.departure_city} ({flight.departure_airport})</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-xs text-gray-400">Duration</p>
                      <p className="text-sm font-medium">{flight.duration}</p>
                      <p className="text-xs text-gray-400">✈ Direct</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="font-bold text-lg">{flight.arrival_time}</p>
                      <p className="text-xs text-gray-500">{flight.arrival_city} ({flight.arrival_airport})</p>
                    </div>

                    <div className="flex flex-col items-center">
                      <p className="text-xs text-gray-500">{flight.travel_date}</p>
                      <p className="text-xs text-gray-500">{flight.baggage_allowance}</p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">${flight.price}</p>
                      <button
                        onClick={() => handleBookNow(flight)}
                        className="mt-1 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition"
                      >
                        Book Now
                      </button>
                    </div>
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

export default Flights;
