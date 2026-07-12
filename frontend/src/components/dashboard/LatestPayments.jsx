import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:5000/api';

const LatestPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        // Use the transactions endpoint (or create a dedicated payments endpoint)
        const res = await fetch(`${API_BASE}/payments/transactions`);
        const data = await res.json();
        setPayments(data.transactions || []);
      } catch (error) {
        console.error('Error fetching payments:', error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-base font-semibold text-gray-800 mb-3">Latest Payments</h3>
        <p className="text-gray-500 text-sm">Loading payments...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-base font-semibold text-gray-800 mb-3">Latest Payments</h3>
      <div className="space-y-3">
        {payments.slice(0, 5).map((p, idx) => (
          <div key={idx} className="flex items-center justify-between border-b last:border-0 pb-2">
            <div>
              <p className="font-medium text-gray-800 text-sm">{p.phone_number || 'Unknown'}</p>
              <p className="text-xs text-gray-500">{p.payment_method || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">${p.amount || 0}</p>
              <p className={`text-xs font-medium ${p.status === 'Completed' ? 'text-green-600' : p.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                {p.status || 'pending'}
              </p>
              <p className="text-xs text-gray-400">{p.created_at ? new Date(p.created_at).toLocaleDateString() : ''}</p>
            </div>
          </div>
        ))}
        {payments.length === 0 && (
          <div className="text-center py-4 text-gray-500 text-sm">No payments found</div>
        )}
      </div>
    </div>
  );
};

export default LatestPayments;
