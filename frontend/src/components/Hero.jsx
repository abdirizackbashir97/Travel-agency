import React from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-primary-700 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="container relative py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
            Discover Your Next
            <span className="block text-primary-200">Adventure</span>
          </h1>
          <p className="text-lg text-primary-100 mb-8 max-w-xl">
            Explore the world's most beautiful destinations with our curated travel experiences.
            Book flights, hotels, and tours in one place.
          </p>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Check in - Check out"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent appearance-none bg-white">
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                </select>
              </div>
              <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          <div className="flex gap-8 mt-8 text-white">
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-sm text-primary-200">Destinations</div>
            </div>
            <div>
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm text-primary-200">Happy Travelers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-sm text-primary-200">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;