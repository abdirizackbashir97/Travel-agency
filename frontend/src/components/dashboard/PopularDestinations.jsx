import React from 'react';
import { FaStar } from 'react-icons/fa';

const destinations = [
  { name: 'Paris, France', bookings: '12,450', rating: 4.8, growth: '+12.5%' },
  { name: 'Dubai, UAE', bookings: '1,032', rating: 4.8, growth: '+8.2%' },
  { name: 'Tokyo, Japan', bookings: '987', rating: 4.7, growth: '+5.1%' },
];

const PopularDestinations = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Destinations</h3>
      <div className="space-y-4">
        {destinations.map((dest, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">{dest.name}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>{dest.bookings} bookings</span>
                <span className="flex items-center gap-1">
                  <FaStar className="w-3 h-3 text-yellow-400" />
                  {dest.rating}
                </span>
              </div>
            </div>
            <span className="text-green-500 text-sm font-medium">{dest.growth}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
