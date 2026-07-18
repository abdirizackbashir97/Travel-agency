import React from 'react';

export default function UserPayments() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">💰 Payments</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">No payment history.</p>
      </div>
    </div>
  );
}
