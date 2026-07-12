import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Printer, Download, CheckCircle } from 'lucide-react';
import UserLayout from '../components/user/UserLayout';

const tickets = [
  { id: 1, booking: 'Hotel in Maldives', date: '12 – 18 Aug 2025', amount: '$1,250', status: 'Confirmed', reference: 'SKY-2025-001' },
  { id: 2, booking: 'Flight to Dubai', date: '25 Aug 2025', amount: '$720', status: 'Confirmed', reference: 'SKY-2025-002' },
  { id: 3, booking: 'Tour in Paris', date: '10 Jul 2025', amount: '$450', status: 'Pending', reference: 'SKY-2025-003' },
];

const UserTickets = () => {
  const printRef = useRef();

  const handlePrint = () => window.print();
  const handleDownload = (ticket) => {
    const dataStr = JSON.stringify(ticket, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${ticket.reference}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <UserLayout>
      <div className="mb-6 flex items-center gap-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">My Tickets</h1>
      </div>
      <div ref={printRef} className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-800">{ticket.booking}</h3>
                <p className="text-sm text-gray-500">{ticket.date}</p>
                <p className="text-xs text-gray-400 mt-1">Ref: {ticket.reference}</p>
                <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${ticket.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{ticket.status}</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">{ticket.amount}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={handlePrint} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition" title="Print Ticket"><Printer className="w-4 h-4 text-gray-600" /></button>
                  <button onClick={() => handleDownload(ticket)} className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition" title="Download Ticket"><Download className="w-4 h-4 text-gray-600" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {tickets.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
          <CheckCircle className="w-12 h-12 mx-auto text-gray-300 mb-2" />
          <p>No tickets available yet</p>
          <p className="text-sm">Book a trip to get your ticket here</p>
        </div>
      )}
    </UserLayout>
  );
};

export default UserTickets;
