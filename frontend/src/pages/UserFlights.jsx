import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plane, Clock, Calendar as CalIcon } from 'lucide-react';
import UserLayout from '../components/user/UserLayout';

const flights = [
  { id: 1, airline: 'Kenya Airways', flight: 'KQ100', origin: 'NBO', destination: 'DUB', departure: '2026-07-20 08:00', arrival: '2026-07-20 14:00', price: 850, status: 'upcoming' },
  { id: 2, airline: 'Emirates', flight: 'EK720', origin: 'NBO', destination: 'DXB', departure: '2026-07-20 10:00', arrival: '2026-07-20 18:30', price: 720, status: 'upcoming' },
  { id: 3, airline: 'Qatar Airways', flight: 'QR1335', origin: 'NBO', destination: 'DOH', departure: '2026-07-21 12:00', arrival: '2026-07-21 20:00', price: 680, status: 'ongoing' },
  { id: 4, airline: 'Ethiopian Airlines', flight: 'ET811', origin: 'NBO', destination: 'ADD', departure: '2026-07-21 07:00', arrival: '2026-07-21 09:00', price: 350, status: 'recently-left' },
];

const UserFlights = () => {
  const ongoing = flights.filter(f => f.status === 'ongoing');
  const upcoming = flights.filter(f => f.status === 'upcoming');
  const recent = flights.filter(f => f.status === 'recently-left');

  return (
    <UserLayout>
      <div className="mb-6 flex items-center gap-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Book Flights</h1>
      </div>
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Plane className="w-5 h-5 text-blue-600" /> Ongoing Flights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ongoing.map((f) => <FlightCard key={f.id} flight={f} />)}
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <CalIcon className="w-5 h-5 text-green-600" /> Upcoming Flights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((f) => <FlightCard key={f.id} flight={f} />)}
          </div>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" /> Recently Left
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recent.map((f) => <FlightCard key={f.id} flight={f} />)}
          </div>
        </section>
      </div>
    </UserLayout>
  );
};

const FlightCard = ({ flight }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-semibold text-gray-800">{flight.airline}</p>
        <p className="text-sm text-gray-500">{flight.flight}</p>
        <p className="text-sm text-gray-700 mt-1">{flight.origin} → {flight.destination}</p>
        <p className="text-xs text-gray-500">Depart: {flight.departure} | Arrive: {flight.arrival}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-blue-600">${flight.price}</p>
        <button className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">Book Now</button>
      </div>
    </div>
  </div>
);

export default UserFlights;
