import React from 'react';

export default function UserWishlist() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">❤️ Wishlist</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">Your wishlist is empty.</p>
        <Link to="/destinations" className="text-indigo-600 hover:underline mt-2 inline-block">Start exploring</Link>
      </div>
    </div>
  );
}
