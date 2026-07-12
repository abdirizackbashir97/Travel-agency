import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, MapPin } from 'lucide-react';
import UserLayout from '../components/user/UserLayout';

const continents = {
  Africa: ['Kenya', 'Tanzania', 'South Africa', 'Egypt', 'Morocco', 'Nigeria', 'Ghana', 'Ethiopia'],
  Europe: ['France', 'Italy', 'Spain', 'Germany', 'UK', 'Switzerland', 'Greece', 'Portugal'],
  Asia: ['Japan', 'China', 'India', 'Thailand', 'UAE', 'Singapore', 'Malaysia', 'Indonesia'],
  'North America': ['USA', 'Canada', 'Mexico', 'Costa Rica', 'Jamaica', 'Cuba'],
  'South America': ['Brazil', 'Argentina', 'Peru', 'Colombia', 'Chile', 'Ecuador'],
  Australia: ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea'],
};

const UserExplore = () => {
  const [selectedContinent, setSelectedContinent] = useState(null);

  return (
    <UserLayout>
      <div className="mb-6 flex items-center gap-4">
        <Link to="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg transition">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Explore Countries</h1>
      </div>
      <div className="flex gap-3 mb-6 flex-wrap">
        {Object.keys(continents).map((c) => (
          <button key={c} onClick={() => setSelectedContinent(c === selectedContinent ? null : c)} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedContinent === c ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>{c}</button>
        ))}
      </div>
      {selectedContinent && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2"><Globe className="w-5 h-5 text-blue-600" /> {selectedContinent}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {continents[selectedContinent].map((country) => (
              <div key={country} className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 hover:shadow-md transition flex items-center gap-2 cursor-pointer">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-gray-700">{country}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {!selectedContinent && (
        <div className="bg-gray-50 rounded-xl p-8 text-center text-gray-500">
          <Globe className="w-12 h-12 mx-auto text-gray-300 mb-2" />
          <p>Select a continent to explore countries</p>
        </div>
      )}
    </UserLayout>
  );
};

export default UserExplore;
