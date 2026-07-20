import React from 'react';

const SignupHero = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-600 to-indigo-700 min-h-screen">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 text-center w-full">
        <div className="text-8xl mb-6">✈️</div>
        <h1 className="text-5xl font-bold mb-4">Join SkyRoute</h1>
        <p className="text-xl text-blue-100 mb-8 max-w-md">
          Create your account and start your journey around the world with amazing travel experiences.
        </p>
        <div className="grid grid-cols-2 gap-4 max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
            <div className="text-3xl mb-1">🌍</div>
            <div className="text-sm font-medium">Top Destinations</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
            <div className="text-3xl mb-1">🔒</div>
            <div className="text-sm font-medium">Secure Booking</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
            <div className="text-3xl mb-1">🏨</div>
            <div className="text-sm font-medium">Best Hotels</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
            <div className="text-3xl mb-1">🎧</div>
            <div className="text-sm font-medium">24/7 Support</div>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-2 text-sm text-blue-200">
          <span>✨ Trusted by 10,000+ travelers</span>
        </div>
      </div>
    </div>
  );
};

export default SignupHero;
