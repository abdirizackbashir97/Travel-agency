import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import TourCard from '../components/TourCard';

const Tours = () => {
  const [duration, setDuration] = useState('all');

  const tours = [
    { 
      id: 1, 
      name: 'Dubai Desert Safari', 
      location: 'Dubai, UAE', 
      image: '/images/tours/tour_1.png', 
      price: 150, 
      duration: '1 day', 
      rating: 4.7,
      description: 'Experience the thrill of dune bashing, camel riding, and a traditional Bedouin dinner under the stars.'
    },
    { 
      id: 2, 
      name: 'Kenya Safari Adventure', 
      location: 'Kenya', 
      image: '/images/tours/tour_2.png', 
      price: 950, 
      duration: '5 days', 
      rating: 4.9,
      description: 'Witness the Great Migration, spot the Big Five, and experience the magic of the African savannah.'
    },
    { 
      id: 3, 
      name: 'Greece Romantic Getaway', 
      location: 'Greece', 
      image: '/images/tours/tour_3.png', 
      price: 1120, 
      duration: '6 days', 
      rating: 4.8,
      description: 'Explore the stunning islands of Santorini and Mykonos with beautiful sunsets and crystal clear waters.'
    },
    { 
      id: 4, 
      name: 'Maldives Escape', 
      location: 'Maldives', 
      image: '/images/tours/tour_4.png', 
      price: 780, 
      duration: '4 days', 
      rating: 4.9,
      description: 'Overwater bungalows, pristine beaches, and unforgettable underwater experiences.'
    },
    { 
      id: 5, 
      name: 'Istanbul City Tour', 
      location: 'Istanbul, Turkey', 
      image: '/images/tours/tour_5.png', 
      price: 410, 
      duration: '3 days', 
      rating: 4.6,
      description: 'Explore the rich history of Istanbul visiting the Blue Mosque, Hagia Sophia, and the Grand Bazaar.'
    },
  ];

  const durationFilters = [
    { id: 'all', label: 'All Tours' },
    { id: '1', label: '1 Day' },
    { id: '3', label: '3 Days' },
    { id: '4', label: '4 Days' },
    { id: '5', label: '5 Days' },
    { id: '6', label: '6 Days' },
  ];

  const filteredTours = duration === 'all' 
    ? tours 
    : tours.filter(t => t.duration.startsWith(duration));

  return (
    <div className="py-12">
      <div className="container">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Tour Packages</h1>
        <p className="text-gray-500 mb-8">Curated experiences for every traveler</p>

        <div className="mb-8">
          <SearchBar placeholder="Search tours..." />
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {durationFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setDuration(filter.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                duration === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tours found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tours;
