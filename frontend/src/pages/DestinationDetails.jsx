import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';

const DestinationDetails = () => {
  const { id } = useParams();
  
  const destination = {
    id: 1,
    name: 'Paris',
    location: 'France',
    description: 'The City of Light captivates visitors with its iconic landmarks, world-class museums, romantic atmosphere, and exquisite cuisine.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=500&fit=crop',
    price: 299,
    rating: 4.8,
    reviews: 1247,
  };

  return (
    <div>
      <div className="relative h-[400px] bg-gray-200">
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="container">
            <Link to="/destinations" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
              <FaArrowLeft className="w-4 h-4" />
              Back to Destinations
            </Link>
            <h1 className="text-5xl font-bold mb-2">{destination.name}</h1>
            <p className="text-xl text-white/80 flex items-center gap-2">
              <FaMapMarkerAlt className="w-5 h-5" />
              {destination.location}
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-yellow-500">
                <FaStar className="w-5 h-5" />
                <span className="font-semibold text-gray-900">{destination.rating}</span>
              </div>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">{destination.reviews} reviews</span>
            </div>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{destination.description}</p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
              <div className="text-3xl font-bold text-primary-600">${destination.price}</div>
              <div className="text-sm text-gray-400 mb-4">per night</div>
              <Link to="/booking" className="block w-full text-center py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
