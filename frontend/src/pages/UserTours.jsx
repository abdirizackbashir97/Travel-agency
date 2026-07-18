import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Compass, Star, MapPin, Users, Search, Clock } from 'lucide-react';
import BookingModal from '../components/BookingModal';

export default function UserTours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedTour, setSelectedTour] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    fetchTours();
  }, [refetch]);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (destination) params.append('destination', destination);
      
      const response = await axios.get(`http://localhost:5000/api/tours?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setTours(response.data.tours || []);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tours:', err);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchTours();
  };

  const handleBookClick = (tour) => {
    setSelectedTour(tour);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🌍 Tours</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            placeholder="Search tours..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
          >
            <Search size={18} /> Search Tours
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tours.length === 0 ? (
          <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <Compass size={48} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No tours available</p>
          </div>
        ) : (
          tours.map((tour) => (
            <div key={tour.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="relative h-48 bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-6xl">
                🌍
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800">{tour.tour_name}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={14} /> {tour.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{tour.rating || 4.7}</span>
                  </div>
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Clock size={14} /> {tour.duration_days || tour.duration} days
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <Users size={14} /> {tour.available_seats || 10} seats
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xl font-bold text-indigo-600">${tour.price_per_person || tour.price}</p>
                    <p className="text-xs text-gray-400">per person</p>
                  </div>
                  <button
                    onClick={() => handleBookClick(tour)}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <BookingModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        item={selectedTour}
        itemType="tour"
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}
