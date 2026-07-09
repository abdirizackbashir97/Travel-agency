import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Plane, Hotel, Package, Star, TrendingUp, 
  Calendar, Users, ChevronRight, Globe, 
  Award, Headphones, Lock, Heart, MapPin, Clock,
  Shield
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchType, setSearchType] = useState('flights');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [depart, setDepart] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState('2 Adults, 1 Child');

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/destinations');
      const data = await response.json();
      let destData = data.data || data.destinations || [];
      setDestinations(Array.isArray(destData) ? destData.slice(0, 6) : []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchType === 'flights') {
      navigate('/flights');
    } else if (searchType === 'hotels') {
      navigate('/hotels');
    } else {
      navigate('/tours');
    }
  };

  // Popular destinations with gradients and emojis
  const popularDestinations = [
    { 
      name: 'Thailand', 
      city: 'Phuket', 
      price: '$699', 
      emoji: '🏝️',
      gradient: 'from-emerald-500 to-teal-600',
      shape: 'rounded-tl-3xl rounded-br-3xl',
      bg: 'bg-emerald-100'
    },
    { 
      name: 'France', 
      city: 'Paris', 
      price: '$799', 
      emoji: '🗼',
      gradient: 'from-rose-500 to-pink-600',
      shape: 'rounded-tr-3xl rounded-bl-3xl',
      bg: 'bg-rose-100'
    },
  ];

  const trendingDestinations = [
    { 
      name: 'Bali, Indonesia', 
      city: 'Ubud', 
      price: '$599', 
      emoji: '🌺',
      gradient: 'from-orange-500 to-amber-600',
      shape: 'rounded-tl-3xl rounded-br-3xl',
      bg: 'bg-orange-100'
    },
    { 
      name: 'Dubai, UAE', 
      city: 'Dubai', 
      price: '$899', 
      emoji: '🏙️',
      gradient: 'from-yellow-500 to-orange-600',
      shape: 'rounded-tr-3xl rounded-bl-3xl',
      bg: 'bg-yellow-100'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Decorative Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Discover Amazing Places with Us
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
              Find the best tours, hotels and flights: everything you need for the perfect trip.
            </p>
            <button
              onClick={() => navigate('/destinations')}
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              Explore Now
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Search Tabs */}
          <div className="mt-12 bg-white rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto">
            <div className="flex border-b border-gray-200 bg-gray-50">
              {['flights', 'hotels', 'packages'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSearchType(type)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition flex items-center justify-center gap-2 ${
                    searchType === type
                      ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {type === 'flights' && <Plane className="w-4 h-4" />}
                  {type === 'hotels' && <Hotel className="w-4 h-4" />}
                  {type === 'packages' && <Package className="w-4 h-4" />}
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">From</label>
                  <input
                    type="text"
                    placeholder={searchType === 'flights' ? 'New York (NYC)' : 'Where to?'}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">To</label>
                  <input
                    type="text"
                    placeholder={searchType === 'flights' ? 'Where to?' : 'Where to?'}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Depart</label>
                  <input
                    type="date"
                    value={depart}
                    onChange={(e) => setDepart(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Return</label>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Travelers</label>
                  <input
                    type="text"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center gap-2 mt-6"
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition text-center group hover:bg-blue-50">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Best Price Guarantee</h3>
            <p className="text-sm text-gray-500">We ensure you get the best deals always.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition text-center group hover:bg-green-50">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition">
              <Headphones className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">24/7 Customer Support</h3>
            <p className="text-sm text-gray-500">We're here to help you anytime, anywhere.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition text-center group hover:bg-purple-50">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition">
              <Lock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Secure Bookings</h3>
            <p className="text-sm text-gray-500">Your data and payments are 100% safe with us.</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition text-center group hover:bg-orange-50">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Handpicked Experiences</h3>
            <p className="text-sm text-gray-500">Curated tours and hotels for unforgettable trips.</p>
          </div>
        </div>
      </div>

      {/* Popular & Trending Destinations */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Popular Destinations */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-xl">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Popular Destinations</h2>
                <p className="text-sm text-gray-500">Most loved destinations by travelers</p>
              </div>
            </div>
            <div className="space-y-4">
              {popularDestinations.map((dest, index) => (
                <div 
                  key={index} 
                  className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden border-2 border-transparent hover:border-emerald-400"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 ${dest.bg} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 ${dest.shape}`}>
                        {dest.emoji}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg">{dest.name}</h4>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {dest.city}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Starting from</p>
                      <p className="text-xl font-bold text-blue-600">{dest.price}</p>
                      <button 
                        onClick={() => navigate('/destinations')}
                        className="mt-1 text-xs text-blue-600 font-medium hover:underline"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Destinations */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Trending Now</h2>
                <p className="text-sm text-gray-500">Hottest destinations this season</p>
              </div>
            </div>
            <div className="space-y-4">
              {trendingDestinations.map((dest, index) => (
                <div 
                  key={index} 
                  className="group bg-gradient-to-r from-orange-500 to-amber-600 p-0.5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="bg-white rounded-2xl p-4 m-0.5 hover:bg-transparent transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 ${dest.bg} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 ${dest.shape}`}>
                          {dest.emoji}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 text-lg">{dest.name}</h4>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {dest.city}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400">Starting from</p>
                        <p className="text-xl font-bold text-blue-600">{dest.price}</p>
                        <button 
                          onClick={() => navigate('/destinations')}
                          className="mt-1 text-xs text-blue-600 font-medium hover:underline"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose <span className="text-blue-600">SKYROUTE</span>?</h2>
            <p className="text-gray-500 mt-2">We make travel easy, affordable, and unforgettable</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 group-hover:scale-110 transition-all duration-300">
                <Globe className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-lg">Wide Range of Choices</h4>
              <p className="text-sm text-gray-500 mt-1">Choose from thousands of flights, hotels and tours worldwide.</p>
            </div>
            <div className="group text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 group-hover:scale-110 transition-all duration-300">
                <Calendar className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-lg">Flexible & Easy Booking</h4>
              <p className="text-sm text-gray-500 mt-1">Book with ease and adjust your plans if needed.</p>
            </div>
            <div className="group text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 group-hover:scale-110 transition-all duration-300">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-lg">Trusted by Travelers</h4>
              <p className="text-sm text-gray-500 mt-1">Join millions of happy travelers around the world.</p>
            </div>
            <div className="group text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 group-hover:scale-110 transition-all duration-300">
                <Star className="w-10 h-10 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-800 text-lg">Exclusive Deals</h4>
              <p className="text-sm text-gray-500 mt-1">Get access to exclusive discounts and special offers.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Your Next Adventure Awaits!</h2>
          <p className="text-lg text-blue-100 mb-8">Discover breathtaking places and create unforgettable memories.</p>
          <button
            onClick={() => navigate('/destinations')}
            className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            Plan Your Trip
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-gray-500 mb-6">Get the latest travel deals and inspiration straight to your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
