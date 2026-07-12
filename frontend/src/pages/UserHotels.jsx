import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Hotel, Star } from 'lucide-react';
import UserLayout from '../components/user/UserLayout';

const hotels = [
  { id: 1, name: 'Hilton Nairobi', location: 'Nairobi, Kenya', singlePrice: 150, doublePrice: 250, stars: 5, image: '🏨' },
  { id: 2, name: 'Ritz-Carlton Dubai', location: 'Dubai, UAE', singlePrice: 450, doublePrice: 650, stars: 5, image: '🏩' },
  { id: 3, name: 'Four Seasons Maldives', location: 'Maldives', singlePrice: 580, doublePrice: 880, stars: 5, image: '🏝️' },
  { id: 4, name: 'Safari Lodge', location: 'Maasai Mara, Kenya', singlePrice: 350, doublePrice: 550, stars: 4, image: '🏕️' },
];

const UserHotels = () => {
  const [view, setView] = useState('all');

  const filtered = hotels.filter(h => {
    if (view === 'single') return true;
    if (view === 'double') return true;
    if (view === 'five-star') return h.stars === 5;
    return true;
  });

  return (
    <UserLayout>
      <div className="mb-6 flex items-center gap-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Book Hotels</h1>
      </div>
      <div className="flex gap-3 mb-6 flex-wrap">
        <button onClick={() => setView('all')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${view === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>All Hotels</button>
        <button onClick={() => setView('single')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${view === 'single' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Single Room</button>
        <button onClick={() => setView('double')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${view === 'double' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>Double Room</button>
        <button onClick={() => setView('five-star')} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${view === 'five-star' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>5-Star Hotels</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hotels.map((h) => (
          <div key={h.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
            <div className="flex items-start gap-4">
              <div className="text-4xl">{h.image}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{h.name}</h3>
                <p className="text-sm text-gray-500">{h.location}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(h.stars)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-gray-50 p-2 rounded-lg text-center"><p className="text-gray-500">Single Room</p><p className="font-bold text-gray-800">${h.singlePrice}/night</p></div>
                  <div className="bg-gray-50 p-2 rounded-lg text-center"><p className="text-gray-500">Double Room</p><p className="font-bold text-gray-800">${h.doublePrice}/night</p></div>
                </div>
                <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">Book Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default UserHotels;
