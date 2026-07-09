import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSlider = ({ destinations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [destinations.length]);

  if (!destinations || destinations.length === 0) return null;

  const current = destinations[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  };

  return (
    <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
      {/* Background */}
      <div className={`w-full h-full bg-gradient-to-br ${getGradient(current.id)} relative`}>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <span className="inline-block bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            {current.category || 'Destination'}
          </span>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
            {current.name}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            {current.country}
          </p>
          
          <p className="text-sm text-white/80 max-w-2xl mb-6">
            {current.description?.substring(0, 120)}...
          </p>

          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-1.5">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              <span className="text-lg font-semibold">{current.rating || 0}</span>
              <span className="text-white/60">({current.reviews || 0} reviews)</span>
            </div>
            <div className="text-white/60">|</div>
            <div>
              <span className="text-sm text-white/60">From</span>
              <span className="text-2xl font-bold ml-1">${current.price_per_night || 0}</span>
              <span className="text-sm text-white/60">/night</span>
            </div>
          </div>

          <button
            onClick={() => {
              const bookingData = {
                name: current.name,
                location: current.country,
                price: current.price_per_night,
                type: 'Destination',
                id: current.id
              };
              localStorage.setItem('bookingItem', JSON.stringify(bookingData));
              navigate('/booking');
            }}
            className="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Book This Destination
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {destinations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-10 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const getGradient = (id) => {
  const gradients = [
    'from-blue-600 to-indigo-700',
    'from-purple-600 to-pink-700',
    'from-emerald-600 to-teal-700',
    'from-orange-600 to-red-700',
    'from-cyan-600 to-blue-700',
    'from-rose-600 to-pink-700',
  ];
  return gradients[id % gradients.length] || gradients[0];
};

export default HeroSlider;
