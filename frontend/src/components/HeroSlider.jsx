import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: 'Discover Paradise in Maldives',
      description: 'Overwater bungalows, crystal clear waters, and unforgettable sunsets.',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1920&h=600&fit=crop',
      destination: 'Maldives',
      price: '$780',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Experience the Magic of Dubai',
      description: 'From the Burj Khalifa to desert safaris, Dubai has it all.',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&h=600&fit=crop',
      destination: 'Dubai',
      price: '$420',
      rating: 4.8
    },
    {
      id: 3,
      title: 'Explore the Beauty of Bali',
      description: 'Rice terraces, volcanic mountains, and pristine beaches.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&h=600&fit=crop',
      destination: 'Bali',
      price: '$350',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Romance in Paris',
      description: 'The City of Love awaits with its iconic landmarks and charming streets.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&h=600&fit=crop',
      destination: 'Paris',
      price: '$520',
      rating: 4.9
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-2xl text-white">
                <div className="flex items-center gap-2 text-sm text-yellow-400 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  <span>{slide.rating}</span>
                  <span className="text-white/50">|</span>
                  <MapPin className="w-4 h-4" />
                  <span>{slide.destination}</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg text-white/80 mb-6">{slide.description}</p>
                <div className="flex items-center gap-4">
                  <Link
                    to={`/destinations`}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Explore Now
                  </Link>
                  <span className="text-2xl font-bold text-white">
                    From {slide.price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? 'w-8 bg-white'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
