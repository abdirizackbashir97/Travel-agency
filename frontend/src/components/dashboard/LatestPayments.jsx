import React from 'react';

const payments = [
  { customer: 'John Smith', amount: '$1,250', method: 'Card', status: 'Completed', date: 'Jul 10, 2025' },
  { customer: 'Emily Johnson', amount: '$980', method: 'PayPal', status: 'Pending', date: 'Jul 09, 2025' },
  { customer: 'Michael Brown', amount: '$1,890', method: 'Card', status: 'Completed', date: 'Jul 09, 2025' },
  { customer: 'Sarah Davis', amount: '$750', method: 'Bank', status: 'Failed', date: 'Jul 08, 2025' },
];

const LatestPayments = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Latest Payments</h3>
      <div className="space-y-3">
        {payments.map((payment, idx) => (
          <div key={idx} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <div>
              <p className="font-medium text-gray-800">{payment.customer}</p>
              <p className="text-sm text-gray-500">{payment.method}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-800">{payment.amount}</p>
              <p className={`text-xs font-medium ${
                payment.status === 'Completed' ? 'text-green-600' :
                payment.status === 'Pending' ? 'text-yellow-600' : 'text-red-600'
              }`}>{payment.status}</p>
              <p className="text-xs text-gray-400">{payment.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPayments;
