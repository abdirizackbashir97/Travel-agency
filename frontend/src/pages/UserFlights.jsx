import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plane, Search } from 'lucide-react';
import BookingModal from '../components/BookingModal';

export default function UserFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [date, setDate] = useState('');
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetchFlights();
  }, [refetch]);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (departure) params.append('departure', departure);
      if (arrival) params.append('arrival', arrival);
      if (date) params.append('departure_date', date);
      
      const response = await axios.get(`http://localhost:5000/api/flights?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        let flightsData = response.data.flights || [];
        setFlights(flightsData);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching flights:', err);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  const handleBookClick = (flight) => {
    setSelectedFlight(flight);
    setShowModal(true);
  };

  const handleBookingSuccess = () => {
    setRefetch(!refetch);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-gray-200 rounded w-48"></div>
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">✈️ Flights</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            placeholder="Search flights..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          <input
            type="text"
            placeholder="From"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          <input
            type="text"
            placeholder="To"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <Search size={18} />
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        {flights.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <Plane size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No flights available</p>
            <p className="text-sm text-gray-400">Try adjusting your search criteria</p>
          </div>
        ) : (
          flights.map((flight) => (
            <div key={flight.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-2xl">
                    ✈️
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{flight.airline || 'Airline'}</h3>
                    <p className="text-sm text-gray-500">Flight #{flight.flight_number}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">From</p>
                    <p className="font-semibold text-gray-800">{flight.departure_city}</p>
                    <p className="text-xs text-gray-500">{flight.departure_time}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">⏱️</p>
                    <p className="text-sm font-medium text-gray-600">{flight.duration}</p>
                    <p className="text-xs text-gray-400">{flight.flight_type}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">To</p>
                    <p className="font-semibold text-gray-800">{flight.arrival_city}</p>
                    <p className="text-xs text-gray-500">{flight.arrival_time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-indigo-600">${flight.price}</p>
                  <button
                    onClick={() => handleBookClick(flight)}
                    className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={selectedFlight}
        itemType="flight"
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}
