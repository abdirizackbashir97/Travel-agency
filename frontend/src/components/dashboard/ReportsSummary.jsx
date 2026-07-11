import React from 'react';

const reports = [
  { label: 'Total Revenue', value: '$245,860', growth: '+12.5%' },
  { label: 'Total Flights', value: '1,428', growth: '+8.2%' },
  { label: 'Total Hotels', value: '2,356', growth: '+5.1%' },
  { label: 'Total Tours', value: '1,120', growth: '+4.8%' },
  { label: 'Total Users', value: '12,450', growth: '+10.3%' },
];

const ReportsSummary = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Reports Summary</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {reports.map((item, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-3 text-center">
            <p className="text-sm text-gray-500">{item.label}</p>
            <p className="text-xl font-bold text-gray-800 mt-1">{item.value}</p>
            <p className="text-xs text-green-500">{item.growth}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsSummary;
