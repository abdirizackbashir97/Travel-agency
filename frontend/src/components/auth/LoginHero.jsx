import React from 'react';

const LoginHero = () => {
  const heroImage = '/images/air/image.png'; // replace with your image

  return (
    <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-gradient-to-br from-blue-900/80 to-blue-600/30">
      <img
        src={heroImage}
        alt="Travel"
        className="w-full h-full object-cover absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="relative z-10 flex flex-col justify-end p-12 pb-16 text-white h-full">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold leading-tight">Welcome Back</h1>
          <p className="text-lg text-white/80 max-w-sm">
            Continue your journey with SkyRoute. Explore amazing destinations, book flights, hotels, and unforgettable adventures.
          </p>
        </div>
        <div className="mt-8 flex gap-8">
          <div>
            <p className="text-2xl font-bold">Top</p>
            <p className="text-sm text-white/60">Destinations</p>
          </div>
          <div>
            <p className="text-2xl font-bold">Secure</p>
            <p className="text-sm text-white/60">Booking</p>
          </div>
          <div>
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-sm text-white/60">Support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHero;
