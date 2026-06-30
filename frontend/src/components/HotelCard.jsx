import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaWifi, FaCar, FaSwimmingPool } from 'react-icons/fa';

const HotelCard = ({ hotel }) => {
  const { id, name, location, image, price, rating, amenities } = hotel || {};

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: FaWifi,
      parking: FaCar,
      pool: FaSwimmingPool,
    };
    return icons[amenity] || null;
  };

  return (
    <Link to={`/hotels/${id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-blue-600 transition-all">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image || '/placeholder.svg'}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <button 
            className="absolute top-3 right-3 p-2 bg-white rounded-full hover:bg-gray-50 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Added to wishlist:', id);
            }}
          >
            <FaHeart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
          </button>
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium flex items-center gap-1">
            <FaStar className="w-3 h-3 text-yellow-500" />
            <span>{rating || '4.5'}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{name}</h3>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-blue-600">${price}</div>
              <div className="text-xs text-gray-400">/ night</div>
            </div>
          </div>
          {amenities && amenities.length > 0 && (
            <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
              {amenities.slice(0, 3).map((amenity, index) => {
                const Icon = getAmenityIcon(amenity);
                return Icon ? (
                  <span key={index} className="flex items-center gap-1">
                    <Icon className="w-3 h-3" />
                    {amenity}
                  </span>
                ) : null;
              })}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
