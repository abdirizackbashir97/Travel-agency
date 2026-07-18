import React from 'react';

export default function UserTrips() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">✈️ My Trips</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">You have no upcoming trips.</p>
        <Link to="/flights" className="text-indigo-600 hover:underline mt-2 inline-block">Book a trip</Link>
      </div>
    </div>
  );
}
