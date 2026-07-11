import React from 'react';
import { FaAward, FaLock, FaHeadset } from 'react-icons/fa';
import flightHero from '../../assets/images/flights/flight_2.png';

const SignupHero = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative min-h-screen overflow-hidden">
      <img
        src={flightHero}
        alt="Travel"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/70 via-blue-900/40 to-transparent" />
      <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 h-full w-full">
        {/* Logo removed */}
        <div className="flex items-center gap-2">
          {/* Logo removed, just a placeholder or nothing */}
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
            Your Journey Starts Here
          </h1>
          <p className="text-lg text-white/80 max-w-md leading-relaxed">
            Create your account and unlock amazing travel experiences, exclusive offers, and seamless booking with SkyRoute.
          </p>
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600/30 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0 backdrop-blur-sm border border-blue-400/20">
                <FaAward className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Best Price Guarantee</h4>
                <p className="text-sm text-white/60">Get the best travel deals at unbeatable prices.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600/30 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0 backdrop-blur-sm border border-blue-400/20">
                <FaLock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">Secure Booking</h4>
                <p className="text-sm text-white/60">Your personal information and bookings are always protected.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600/30 rounded-2xl flex items-center justify-center text-blue-400 flex-shrink-0 backdrop-blur-sm border border-blue-400/20">
                <FaHeadset className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-white">24/7 Customer Support</h4>
                <p className="text-sm text-white/60">Our travel experts are available anytime you need assistance.</p>
              </div>
            </div>
          </div>
        </div>
        <div />
      </div>
    </div>
  );
};

export default SignupHero;
