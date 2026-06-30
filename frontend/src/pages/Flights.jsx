import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Plane, Calendar, MapPin, Users, Search, Clock } from 'lucide-react';

const Flights = () => {
  const location = useLocation();
  const [tripType, setTripType] = useState('roundtrip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  // Get search params from URL on page load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const fromParam = params.get('from');
    const toParam = params.get('to');
    
    if (fromParam) {
      setFrom(decodeURIComponent(fromParam));
    }
    if (toParam) {
      setTo(decodeURIComponent(toParam));
    }
  }, [location.search]);

  const flights = [
    {
      id: 'EK721',
      airline: 'Emirates',
      logo: '/images/flights/flight_1.png',
      from: { code: 'NBO', city: 'Nairobi', time: '08:00', terminal: '1A' },
      to: { code: 'DXB', city: 'Dubai', time: '14:30', terminal: '3' },
      price: 520,
      duration: '4h 30m',
      stops: 0,
      date: '25 May 2025',
      baggage: '30kg',
      class: 'Economy'
    },
    {
      id: 'QR1342',
      airline: 'Qatar Airways',
      logo: '/images/flights/flight_2.png',
      from: { code: 'NBO', city: 'Nairobi', time: '11:15', terminal: '1B' },
      to: { code: 'DOH', city: 'Doha', time: '16:45', terminal: '2' },
      price: 480,
      duration: '5h 30m',
      stops: 0,
      date: '25 May 2025',
      baggage: '25kg',
      class: 'Economy'
    },
    {
      id: 'TK607',
      airline: 'Turkish Airlines',
      logo: '/images/flights/flight_3.png',
      from: { code: 'NBO', city: 'Nairobi', time: '22:30', terminal: '1A' },
      to: { code: 'IST', city: 'Istanbul', time: '06:45', terminal: '1' },
      price: 450,
      duration: '6h 15m',
      stops: 0,
      date: '25 May 2025',
      baggage: '25kg',
      class: 'Economy'
    },
    {
      id: 'ET805',
      airline: 'Ethiopian Airlines',
      logo: '/images/flights/flight_4.png',
      from: { code: 'NBO', city: 'Nairobi', time: '14:00', terminal: '1A' },
      to: { code: 'ADD', city: 'Addis Ababa', time: '16:30', terminal: '2' },
      price: 350,
      duration: '2h 30m',
      stops: 0,
      date: '25 May 2025',
      baggage: '23kg',
      class: 'Economy'
    },
    {
      id: 'KQ112',
      airline: 'Kenya Airways',
      logo: '/images/flights/flight_5.png',
      from: { code: 'NBO', city: 'Nairobi', time: '07:45', terminal: '1A' },
      to: { code: 'LHR', city: 'London', time: '14:30', terminal: '5' },
      price: 680,
      duration: '8h 45m',
      stops: 0,
      date: '25 May 2025',
      baggage: '30kg',
      class: 'Economy'
    },
  ];

  // Filter flights based on search
  const filteredFlights = flights.filter(flight => {
    let match = true;
    
    if (from) {
      const fromLower = from.toLowerCase();
      const fromCityLower = flight.from.city.toLowerCase();
      const fromCodeLower = flight.from.code.toLowerCase();
      if (!fromCityLower.includes(fromLower) && !fromCodeLower.includes(fromLower)) {
        match = false;
      }
    }
    
    if (to) {
      const toLower = to.toLowerCase();
      const toCityLower = flight.to.city.toLowerCase();
      const toCodeLower = flight.to.code.toLowerCase();
      if (!toCityLower.includes(toLower) && !toCodeLower.includes(toLower)) {
        match = false;
      }
    }
    
    return match;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Navigate with search params
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    window.location.href = `/flights?${params.toString()}`;
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Flights</h1>
        <p className="text-gray-500 mb-8">Book flights to your dream destinations</p>

        {/* Search Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
          <div className="flex gap-3 mb-6">
            {['Round Trip', 'One Way', 'Multi City'].map((type) => (
              <button
                key={type}
                onClick={() => setTripType(type.toLowerCase().replace(' ', ''))}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  tripType === type.toLowerCase().replace(' ', '')
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">From</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    placeholder="City or Airport"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">To</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    placeholder="City or Airport"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Depart</label>
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              {tripType === 'roundtrip' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Return</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Travelers</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white">
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3 Passengers</option>
                  <option>4 Passengers</option>
                  <option>5 Passengers</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Class</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 appearance-none bg-white">
                  <option>Economy</option>
                  <option>Premium Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  Search Flights
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-gray-500">
            {filteredFlights.length} flights found
            {from && to && ` for ${from} to ${to}`}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Sort by:</span>
            <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600">
              <option>Cheapest</option>
              <option>Fastest</option>
              <option>Best</option>
              <option>Earliest</option>
              <option>Latest</option>
            </select>
          </div>
        </div>

        {/* Flight Cards */}
        <div className="space-y-4">
          {filteredFlights.map((flight) => (
            <div key={flight.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-600 transition-all hover:shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Airline Logo */}
                <div className="flex items-center gap-3 min-w-[140px]">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={flight.logo}
                      alt={flight.airline}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{flight.airline}</p>
                    <p className="text-xs text-gray-500">{flight.id}</p>
                    <span className="text-xs text-green-600 font-medium">Direct</span>
                  </div>
                </div>

                {/* Route */}
                <div className="flex-1 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{flight.from.code}</p>
                    <p className="text-sm text-gray-500">{flight.from.city}</p>
                    <p className="text-xs text-gray-400">{flight.from.time}</p>
                  </div>

                  <div className="flex-1 flex flex-col items-center px-4">
                    <div className="text-xs text-gray-500">{flight.duration}</div>
                    <div className="relative w-full flex items-center">
                      <div className="flex-1 h-px bg-gray-300" />
                      <Plane className="w-4 h-4 text-blue-600 mx-2" />
                      <div className="flex-1 h-px bg-gray-300" />
                    </div>
                    {flight.stops === 0 ? (
                      <span className="text-xs text-green-600 font-medium">Direct</span>
                    ) : (
                      <span className="text-xs text-gray-400">{flight.stops} stop</span>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">{flight.to.code}</p>
                    <p className="text-sm text-gray-500">{flight.to.city}</p>
                    <p className="text-xs text-gray-400">{flight.to.time}</p>
                  </div>
                </div>

                {/* Date & Baggage */}
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-center">
                    <Calendar className="w-4 h-4 text-gray-400 mx-auto" />
                    <p className="text-xs text-gray-600">{flight.date}</p>
                  </div>
                  <div className="h-8 w-px bg-gray-200" />
                  <div className="text-center">
                    <div className="text-xs text-gray-500">Baggage</div>
                    <p className="text-xs font-medium text-gray-700">{flight.baggage}</p>
                  </div>
                </div>

                {/* Price & Book */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-end">
                  <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                    <p className="text-xs text-gray-400">per person</p>
                  </div>
                  <Link
                    to="/booking"
                    className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredFlights.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Plane className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No flights found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
            <Link to="/" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Flights;
