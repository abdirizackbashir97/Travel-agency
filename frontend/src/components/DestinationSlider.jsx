import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DestinationSlider = ({ destinations, title = "Popular Destinations" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const sliderRef = useRef(null);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalSlides = Math.ceil(destinations.length / itemsPerView);
  const maxIndex = Math.max(0, totalSlides - 1);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const visibleDestinations = destinations.slice(
    currentIndex * itemsPerView,
    (currentIndex + 1) * itemsPerView
  );

  if (!destinations || destinations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No destinations available</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <p className="text-gray-500 text-sm">Discover amazing places around the world</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition shadow-sm"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-white border border-gray-200 hover:bg-gray-50 transition shadow-sm"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 transition-all duration-300"
        >
          {visibleDestinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Image placeholder with gradient */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-white text-center p-4">
                  <h3 className="text-lg font-bold truncate">{dest.name}</h3>
                  <p className="text-sm text-blue-100 truncate">{dest.country}</p>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-gray-700">
                  ⭐ {dest.rating || 0}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {dest.category || 'Destination'}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">{dest.reviews || 0} reviews</span>
                </div>

                <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                  {dest.description?.substring(0, 80)}...
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Starting from</p>
                    <p className="text-lg font-bold text-indigo-600">${dest.price_per_night || 0}</p>
                    <p className="text-xs text-gray-400">/ night</p>
                  </div>
                  <button
                    onClick={() => {
                      const bookingData = {
                        name: dest.name,
                        location: dest.country,
                        price: dest.price_per_night,
                        type: 'Destination',
                        id: dest.id
                      };
                      localStorage.setItem('bookingItem', JSON.stringify(bookingData));
                      window.location.href = '/booking';
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg transition"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {totalSlides > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? 'w-8 h-2 bg-indigo-600'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationSlider;
