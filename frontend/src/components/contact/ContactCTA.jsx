import React from 'react';
import { Link } from 'react-router-dom';

const ContactCTA = () => {
  return (
    <div className="relative mt-16 rounded-2xl overflow-hidden shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 z-10"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/cta-bg.jpg)' }}
      ></div>
      <div className="relative z-20 p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready for Your Next Adventure?</h2>
        <p className="text-blue-100 max-w-2xl mx-auto mb-6">
          Start planning your dream vacation with SkyRoute. Explore our exclusive packages and book today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/booking"
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:shadow-xl transition duration-200 transform hover:scale-105"
          >
            Book Now
          </Link>
          <Link
            to="/destinations"
            className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition duration-200"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactCTA;
