import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const SocialLogin = () => {
  return (
    <div className="mt-6">
      <div className="relative flex items-center">
        <div className="flex-1 border-t border-gray-200" />
        <span className="px-4 text-sm text-gray-400 bg-white">OR</span>
        <div className="flex-1 border-t border-gray-200" />
      </div>

      <div className="mt-6 space-y-3">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
        >
          <FaGoogle className="w-5 h-5 text-red-500" />
          <span className="text-sm font-medium text-gray-700">Continue with Google</span>
        </button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
        >
          <FaFacebook className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">Continue with Facebook</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
