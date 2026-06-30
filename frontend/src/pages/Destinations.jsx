import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, MapPin, Star, Heart, 
  Grid3x3, LayoutGrid,
  ArrowRight, Calendar,
  Compass, Globe, Mountain,
  CheckCircle
} from 'lucide-react';

const Destinations = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const destinations = [
    // CITY DESTINATIONS
    {
      id: 1,
      name: 'Dubai',
      country: 'UAE',
      image: '/images/destinations/dubai.png',
      price: 420,
      rating: 4.8,
      reviews: 1247,
      category: 'city',
      description: 'Experience luxury, adventure, and culture in the heart of the desert.',
      highlights: ['Burj Khalifa', 'Desert Safari', 'Dubai Mall', 'Palm Jumeirah'],
      bestTime: 'November to March',
      vibe: 'Luxury & Adventure'
    },
    {
      id: 2,
      name: 'Istanbul',
      country: 'Turkey',
      image: '/images/destinations/istabul.png',
      price: 410,
      rating: 4.6,
      reviews: 856,
      category: 'city',
      description: 'Where East meets West - a city rich in history, culture, and cuisine.',
      highlights: ['Hagia Sophia', 'Blue Mosque', 'Grand Bazaar', 'Bosphorus Cruise'],
      bestTime: 'April to October',
      vibe: 'Culture & History'
    },
    {
      id: 3,
      name: 'Madrid',
      country: 'Spain',
      image: '/images/destinations/madrid.png',
      price: 450,
      rating: 4.7,
      reviews: 932,
      category: 'city',
      description: 'Vibrant capital city known for art, food, and passionate culture.',
      highlights: ['Prado Museum', 'Royal Palace', 'Plaza Mayor', 'Retiro Park'],
      bestTime: 'May to September',
      vibe: 'Art & Culture'
    },
    {
      id: 4,
      name: 'Makkah',
      country: 'Saudi Arabia',
      image: '/images/destinations/makkah.png',
      price: 380,
      rating: 4.9,
      reviews: 2156,
      category: 'religious',
      description: 'The holiest city in Islam, welcoming millions of pilgrims each year.',
      highlights: ['Masjid Al-Haram', 'Kaaba', 'Mount Arafat', 'Mina Valley'],
      bestTime: 'Throughout the year',
      vibe: 'Spiritual & Peaceful'
    },
    {
      id: 5,
      name: 'Moscow',
      country: 'Russia',
      image: '/images/destinations/moscow.png',
      price: 430,
      rating: 4.5,
      reviews: 678,
      category: 'city',
      description: 'A city of grandeur, history, and stunning architecture.',
      highlights: ['Red Square', 'Kremlin', 'St. Basil\'s Cathedral', 'Bolshoi Theatre'],
      bestTime: 'May to September',
      vibe: 'History & Grandeur'
    },
    {
      id: 6,
      name: 'Paris',
      country: 'France',
      image: '/images/destinations/paris.png',
      price: 520,
      rating: 4.9,
      reviews: 3421,
      category: 'city',
      description: 'The City of Light - romance, art, and elegance at every corner.',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame', 'Champs-Élysées'],
      bestTime: 'April to June, September to November',
      vibe: 'Romance & Art'
    },
    {
      id: 7,
      name: 'Tokyo',
      country: 'Japan',
      image: '/images/destinations/tokyo.png',
      price: 550,
      rating: 4.8,
      reviews: 1897,
      category: 'city',
      description: 'A mesmerizing blend of ultra-modern and traditional Japanese culture.',
      highlights: ['Shibuya Crossing', 'Senso-ji Temple', 'Tokyo Skytree', 'Akihabara'],
      bestTime: 'March to May, September to November',
      vibe: 'Modern & Traditional'
    },
    // BEACH DESTINATIONS - Using your beach images
    {
      id: 8,
      name: 'Zanzibar',
      country: 'Tanzania',
      image: '/images/destinations/beach_1.png',
      price: 350,
      rating: 4.7,
      reviews: 1456,
      category: 'beach',
      description: 'Spice Island paradise with pristine white sand beaches and turquoise waters.',
      highlights: ['Nungwi Beach', 'Stone Town', 'Prison Island', 'Spice Tours'],
      bestTime: 'June to October, December to February',
      vibe: 'Tropical Paradise'
    },
    {
      id: 9,
      name: 'Maldives',
      country: 'Maldives',
      image: '/images/destinations/beach_2.png',
      price: 780,
      rating: 4.9,
      reviews: 2345,
      category: 'beach',
      description: 'Luxury overwater bungalows and crystal clear waters in the Indian Ocean.',
      highlights: ['Overwater Villas', 'Snorkeling', 'Diving', 'Sunset Cruises'],
      bestTime: 'November to April',
      vibe: 'Luxury Island'
    },
    {
      id: 10,
      name: 'Diani Beach',
      country: 'Kenya',
      image: '/images/destinations/beach_3.png',
      price: 280,
      rating: 4.6,
      reviews: 987,
      category: 'beach',
      description: "Kenya's premier beach destination with powdery white sand and warm waters.",
      highlights: ['Coral Reefs', 'Water Sports', 'Marine Life', 'Beach Resorts'],
      bestTime: 'July to March',
      vibe: 'Coastal Paradise'
    },
    {
      id: 11,
      name: 'Bali',
      country: 'Indonesia',
      image: '/images/destinations/beach_4.png',
      price: 450,
      rating: 4.8,
      reviews: 2876,
      category: 'beach',
      description: 'Island of Gods with stunning beaches, vibrant culture, and lush rice terraces.',
      highlights: ['Kuta Beach', 'Ubud', 'Tanah Lot', 'Rice Terraces'],
      bestTime: 'April to October',
      vibe: 'Cultural Island'
    },
    // MOUNTAIN DESTINATIONS - Using sample images (you can replace these)
    {
      id: 12,
      name: 'Swiss Alps',
      country: 'Switzerland',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&h=400&fit=crop',
      price: 680,
      rating: 4.9,
      reviews: 2103,
      category: 'mountain',
      description: 'Breathtaking alpine peaks, world-class skiing, and charming villages in the heart of Europe.',
      highlights: ['Matterhorn', 'Jungfraujoch', 'Skiing', 'Scenic Trains'],
      bestTime: 'December to April, June to September',
      vibe: 'Alpine Adventure'
    },
    {
      id: 13,
      name: 'Mount Kilimanjaro',
      country: 'Tanzania',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
      price: 1200,
      rating: 4.8,
      reviews: 1567,
      category: 'mountain',
      description: "Africa's highest peak - an epic trekking adventure through diverse ecosystems.",
      highlights: ['Summit Trek', 'Rainforest', 'Savannah Views', 'Wildlife'],
      bestTime: 'January to February, June to October',
      vibe: 'Epic Adventure'
    },
    {
      id: 14,
      name: 'Rocky Mountains',
      country: 'Canada',
      image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=400&fit=crop',
      price: 590,
      rating: 4.7,
      reviews: 1345,
      category: 'mountain',
      description: 'Majestic mountains, crystal clear lakes, and endless wilderness in Canada.',
      highlights: ['Banff', 'Lake Louise', 'Hiking', 'Wildlife Viewing'],
      bestTime: 'June to September, December to March',
      vibe: 'Wilderness Escape'
    },
    {
      id: 15,
      name: 'Mount Everest',
      country: 'Nepal',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop',
      price: 1500,
      rating: 4.9,
      reviews: 876,
      category: 'mountain',
      description: "The world's highest peak - the ultimate mountain challenge for adventurers.",
      highlights: ['Everest Base Camp', 'Sherpa Culture', 'Himalayan Views', 'Trekking'],
      bestTime: 'March to May, September to November',
      vibe: 'Ultimate Challenge'
    },
  ];

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'city', label: 'City' },
    { id: 'beach', label: 'Beach' },
    { id: 'mountain', label: 'Mountain' },
    { id: 'religious', label: 'Religious' },
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesFilter = filter === 'all' || dest.category === filter;
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openModal = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'city': return 'bg-blue-100 text-blue-700';
      case 'beach': return 'bg-cyan-100 text-cyan-700';
      case 'mountain': return 'bg-emerald-100 text-emerald-700';
      case 'religious': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryEmoji = (category) => {
    switch(category) {
      case 'city': return '🏙️';
      case 'beach': return '🏖️';
      case 'mountain': return '⛰️';
      case 'religious': return '🕌';
      default: return '🌍';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-blue-200 text-sm mb-4">
              <span>Home</span>
              <span className="text-blue-300">›</span>
              <span className="text-white font-medium">Destinations</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Explore the World
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-xl">
              Discover your next adventure with our curated selection of the world's most incredible destinations.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-white flex items-center gap-2">
                <Compass className="w-5 h-5" />
                <span>{destinations.length} Amazing Destinations</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span>120+ Countries</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-white flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>4.8 Avg Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEARCH & FILTERS ===== */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-20 shadow-sm">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations, countries, or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                    filter === cat.id
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESULTS ===== */}
      <section className="py-12">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredDestinations.length} Destinations Found
              </h2>
              <p className="text-gray-500 text-sm">Discover your perfect getaway</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {filteredDestinations.map((destination) => (
              <div 
                key={destination.id} 
                className={`group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                  viewMode === 'list' ? 'flex items-center' : ''
                }`}
                onClick={() => openModal(destination)}
              >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-[4/3]'}`}>
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <button 
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Added to wishlist:', destination.id);
                    }}
                  >
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                  </button>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {destination.rating}
                    </span>
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-600">
                      {destination.reviews} reviews
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-lg ${getCategoryColor(destination.category)}`}>
                      {getCategoryEmoji(destination.category)} {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className={`p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {destination.name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {destination.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-blue-600">${destination.price}</p>
                      <p className="text-xs text-gray-400">per night</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{destination.description}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {destination.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
                        {highlight}
                      </span>
                    ))}
                    {destination.highlights.length > 3 && (
                      <span className="text-xs text-gray-400">+{destination.highlights.length - 3} more</span>
                    )}
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Best: {destination.bestTime}
                    </span>
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(destination);
                      }}
                    >
                      View Details
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No destinations found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              <button 
                onClick={() => { setSearchQuery(''); setFilter('all'); }}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== MODAL ===== */}
      {isModalOpen && selectedDestination && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-80">
              <img src={selectedDestination.image} alt={selectedDestination.name} className="w-full h-full object-cover" />
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h2 className="text-3xl font-bold text-white">{selectedDestination.name}</h2>
                <p className="text-white/80 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {selectedDestination.country}
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <span className="font-bold text-gray-900">{selectedDestination.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{selectedDestination.reviews} reviews</span>
                <span className="text-gray-400">|</span>
                <span className="text-blue-600 font-medium">{selectedDestination.vibe}</span>
              </div>
              <p className="text-gray-600 mb-6">{selectedDestination.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">✨ Highlights</h4>
                  <ul className="space-y-1.5">
                    {selectedDestination.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">📅 Best Time to Visit</h4>
                  <p className="text-sm text-gray-600">{selectedDestination.bestTime}</p>
                  <div className="mt-4">
                    <p className="font-semibold text-gray-900">💰 Price</p>
                    <p className="text-2xl font-bold text-blue-600">${selectedDestination.price}</p>
                    <p className="text-xs text-gray-400">per night</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Link to="/booking" className="flex-1 px-6 py-3 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </Link>
                <button 
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Destinations;
