import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Users } from 'lucide-react';
import UserLayout from '../components/user/UserLayout';

const tours = [
  { id: 1, name: 'Maasai Mara Safari', location: 'Maasai Mara, Kenya', duration: '5 days', price: 950, status: 'ongoing' },
  { id: 2, name: 'Dubai Desert Safari', location: 'Dubai, UAE', duration: '1 day', price: 150, status: 'upcoming' },
  { id: 3, name: 'Greece Romantic Getaway', location: 'Santorini & Mykonos', duration: '6 days', price: 1120, status: 'recently-left' },
  { id: 4, name: 'Maldives Escape', location: 'Maldives', duration: '4 days', price: 780, status: 'ongoing' },
];

const UserTours = () => {
  const ongoing = tours.filter(t => t.status === 'ongoing');
  const upcoming = tours.filter(t => t.status === 'upcoming');
  const recent = tours.filter(t => t.status === 'recently-left');

  return (
    <UserLayout>
      <div className="mb-6 flex items-center gap-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Book Tours</h1>
      </div>
      <div className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-blue-600" /> Ongoing Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{ongoing.map((t) => <TourCard key={t.id} tour={t} />)}</div>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2"><Calendar className="w-5 h-5 text-green-600" /> Upcoming Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{upcoming.map((t) => <TourCard key={t.id} tour={t} />)}</div>
        </section>
        <section>
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2"><Clock className="w-5 h-5 text-orange-600" /> Recently Left Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{recent.map((t) => <TourCard key={t.id} tour={t} />)}</div>
        </section>
      </div>
    </UserLayout>
  );
};

const TourCard = ({ tour }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition">
    <div className="flex justify-between items-start">
      <div>
        <p className="font-semibold text-gray-800">{tour.name}</p>
        <p className="text-sm text-gray-500">{tour.location}</p>
        <p className="text-xs text-gray-500 mt-1">Duration: {tour.duration}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-blue-600">${tour.price}</p>
        <button className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition">Book Now</button>
      </div>
    </div>
  </div>
);

export default UserTours;
