import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, MapPin, Star, Heart, Wifi, Car, 
  Utensils, Dumbbell, Sparkles, 
  Filter, ArrowRight, Calendar, Users, 
  ChevronDown, Grid3x3, LayoutGrid,
  Coffee, Tv, Snowflake, Wind, Camera,
  Award, Shield, Clock, CheckCircle,
  Sun, Moon, Cloud, Umbrella, TreePine,
  Waves
} from 'lucide-react';

// Custom Pool/Swimming icon
const PoolIcon = ({ className }) => (
  <svg 
    className={className}
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2m4-7a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v3zm0 0v6a2 2 0 01-2 2H6a2 2 0 01-2-2V9m14 0h-4M6 9h4" />
  </svg>
);

const Hotels = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');

  const hotels = [
    {
      id: 1,
      name: 'Emirates Palace',
      location: 'Abu Dhabi, UAE',
      image: '/images/hotels/hotel_1.png',
      price: 450,
      rating: 4.9,
      reviews: 234,
      amenities: ['wifi', 'parking', 'pool', 'spa', 'restaurant'],
      description: 'Luxury beachfront resort with stunning Arabian architecture and world-class service.',
      highlights: ['Private Beach', 'Michelin Restaurant', 'Luxury Spa', 'Marina View'],
      category: 'luxury',
      vibe: 'Ultimate Luxury'
    },
    {
      id: 2,
      name: 'Burj Al Arab',
      location: 'Dubai, UAE',
      image: '/images/hotels/hotel_2.png',
      price: 750,
      rating: 4.9,
      reviews: 189,
      amenities: ['wifi', 'parking', 'pool', 'spa', 'restaurant', 'fitness'],
      description: 'Iconic sail-shaped hotel offering ultimate luxury and personalized service.',
      highlights: ['Helipad', 'Underwater Restaurant', 'Butler Service', 'Royal Suite'],
      category: 'luxury',
      vibe: '7-Star Luxury'
    },
    {
      id: 3,
      name: 'Four Seasons Resort',
      location: 'Maldives',
      image: '/images/hotels/hotel_3.png',
      price: 580,
      rating: 4.8,
      reviews: 156,
      amenities: ['wifi', 'pool', 'spa', 'restaurant'],
      description: 'Overwater villas with breathtaking ocean views and pristine private beaches.',
      highlights: ['Overwater Villas', 'Private Pool', 'Sunset Cruises', 'Diving'],
      category: 'resort',
      vibe: 'Tropical Paradise'
    },
    {
      id: 4,
      name: 'The Ritz-Carlton',
      location: 'Paris, France',
      image: '/images/hotels/hotel_4.png',
      price: 520,
      rating: 4.8,
      reviews: 312,
      amenities: ['wifi', 'parking', 'pool', 'spa', 'restaurant'],
      description: 'Elegant luxury in the heart of Paris with stunning views of the Eiffel Tower.',
      highlights: ['Eiffel Tower View', 'Michelin Dining', 'Spa', 'Historic Location'],
      category: 'luxury',
      vibe: 'Parisian Elegance'
    },
    {
      id: 5,
      name: 'Mandarin Oriental',
      location: 'Bangkok, Thailand',
      image: '/images/hotels/hotel_5.png',
      price: 380,
      rating: 4.7,
      reviews: 278,
      amenities: ['wifi', 'pool', 'spa', 'restaurant'],
      description: 'Luxury hotel with stunning river views and world-class Thai hospitality.',
      highlights: ['River Views', 'Thai Cuisine', 'Spa', 'City Center'],
      category: 'luxury',
      vibe: 'Asian Elegance'
    },
    {
      id: 6,
      name: 'The Plaza Hotel',
      location: 'New York, USA',
      image: '/images/hotels/hotel_6.png',
      price: 490,
      rating: 4.7,
      reviews: 198,
      amenities: ['wifi', 'parking', 'restaurant', 'fitness'],
      description: 'Iconic luxury hotel overlooking Central Park with timeless elegance.',
      highlights: ['Central Park View', 'Afternoon Tea', 'Historic Building', 'Shopping'],
      category: 'luxury',
      vibe: 'NYC Classic'
    },
    {
      id: 7,
      name: 'Safari Lodge',
      location: 'Maasai Mara, Kenya',
      image: '/images/hotels/hotel_7.png',
      price: 650,
      rating: 4.9,
      reviews: 145,
      amenities: ['wifi', 'pool', 'restaurant'],
      description: 'Luxury tented camp in the heart of Maasai Mara with incredible wildlife views.',
      highlights: ['Game Drives', 'Wildlife Viewing', 'Sundowners', 'Bush Dinners'],
      category: 'safari',
      vibe: 'Wilderness Adventure'
    },
    {
      id: 8,
      name: 'Feynan Eco-Lodge',
      location: 'Jordan',
      image: '/images/hotels/hotel_8.png',
      price: 320,
      rating: 4.6,
      reviews: 89,
      amenities: ['wifi', 'restaurant'],
      description: 'Off-grid eco-lodge in a remote desert canyon with candlelit dining.',
      highlights: ['Desert Views', 'Stargazing', 'Hiking', 'Sustainability'],
      category: 'eco',
      vibe: 'Off-Grid Escape'
    },
  ];

  const categories = [
    { id: 'all', label: 'All Hotels' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'resort', label: 'Resort' },
    { id: 'safari', label: 'Safari' },
    { id: 'eco', label: 'Eco-Lodge' },
  ];

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  const getAmenityIcon = (amenity) => {
    const icons = {
      wifi: Wifi,
      parking: Car,
      pool: PoolIcon,
      spa: Sparkles,
      restaurant: Utensils,
      fitness: Dumbbell,
    };
    return icons[amenity] || null;
  };

  const getAmenityLabel = (amenity) => {
    const labels = {
      wifi: 'Free WiFi',
      parking: 'Parking',
      pool: 'Pool',
      spa: 'Spa',
      restaurant: 'Restaurant',
      fitness: 'Gym',
    };
    return labels[amenity] || amenity;
  };

  const getCategoryBadge = (category) => {
    const badges = {
      luxury: '🌟 Luxury',
      resort: '🏖️ Resort',
      safari: '🦁 Safari',
      eco: '🌿 Eco-Lodge',
    };
    return badges[category] || category;
  };

  const filteredHotels = hotels.filter(hotel => {
    const matchesFilter = filter === 'all' || hotel.category === filter;
    const matchesSearch = hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hotel.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openModal = (hotel) => {
    setSelectedHotel(hotel);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
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
              <span className="text-white font-medium">Hotels</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              Find Your Perfect Stay
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-xl">
              Discover the world's finest hotels, resorts, and unique accommodations tailored to your style.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-white flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>{hotels.length} Premium Hotels</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-white flex items-center gap-2">
                <Star className="w-5 h-5" />
                <span>4.8 Avg Rating</span>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-6 py-3 text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                <span>Verified Quality</span>
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
                placeholder="Search hotels by name, location, or experience..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
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
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredHotels.length} Hotels Found
              </h2>
              <p className="text-gray-500 text-sm">Luxury stays curated for you</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
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
            {filteredHotels.map((hotel) => (
              <div 
                key={hotel.id} 
                className={`group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                  viewMode === 'list' ? 'flex items-center' : ''
                }`}
                onClick={() => openModal(hotel)}
              >
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-[4/3]'}`}>
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <button 
                    className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('Added to wishlist:', hotel.id);
                    }}
                  >
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
                  </button>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {hotel.rating}
                    </span>
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-medium text-gray-600">
                      {hotel.reviews} reviews
                    </span>
                  </div>
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-blue-600/90 backdrop-blur-sm text-white text-xs font-medium rounded-lg">
                      {getCategoryBadge(hotel.category)}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs">
                    ${hotel.price}/night
                  </div>
                </div>
                <div className={`p-5 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3" />
                        {hotel.location}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{hotel.description}</p>
                  
                  {/* Amenities */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {hotel.amenities.slice(0, 4).map((amenity, index) => {
                      const Icon = getAmenityIcon(amenity);
                      return Icon ? (
                        <span key={index} className="flex items-center gap-1 text-xs text-gray-500">
                          {React.createElement(Icon, { className: "w-3 h-3" })}
                          <span>{getAmenityLabel(amenity)}</span>
                        </span>
                      ) : null;
                    })}
                    {hotel.amenities.length > 4 && (
                      <span className="text-xs text-gray-400">+{hotel.amenities.length - 4} more</span>
                    )}
                  </div>

                  {/* Highlights */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    {hotel.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">
                        {highlight}
                      </span>
                    ))}
                    {hotel.highlights.length > 3 && (
                      <span className="text-xs text-gray-400">+{hotel.highlights.length - 3}</span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-500">{hotel.vibe}</span>
                    </div>
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(hotel);
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

          {filteredHotels.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-12 h-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No hotels found</h3>
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
      {isModalOpen && selectedHotel && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-80">
              <img src={selectedHotel.image} alt={selectedHotel.name} className="w-full h-full object-cover" />
              <button 
                onClick={closeModal}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <h2 className="text-3xl font-bold text-white">{selectedHotel.name}</h2>
                <p className="text-white/80 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {selectedHotel.location}
                </p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-5 h-5 fill-yellow-500" />
                  <span className="font-bold text-gray-900">{selectedHotel.rating}</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">{selectedHotel.reviews} reviews</span>
                <span className="text-gray-400">|</span>
                <span className="text-blue-600 font-medium">{selectedHotel.vibe}</span>
                <span className="text-gray-400">|</span>
                <span className="text-green-600 font-medium">{getCategoryBadge(selectedHotel.category)}</span>
              </div>
              <p className="text-gray-600 mb-6">{selectedHotel.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">✨ Highlights</h4>
                  <ul className="space-y-1.5">
                    {selectedHotel.highlights.map((highlight, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">🏨 Amenities</h4>
                  <ul className="space-y-1.5">
                    {selectedHotel.amenities.map((amenity, idx) => {
                      const Icon = getAmenityIcon(amenity);
                      return (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          {Icon && React.createElement(Icon, { className: "w-4 h-4 text-blue-500" })}
                          {getAmenityLabel(amenity)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm text-gray-500">Price per night</p>
                  <p className="text-3xl font-bold text-blue-600">${selectedHotel.price}</p>
                </div>
                <Link to="/booking" className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </Link>
              </div>
              <button 
                onClick={closeModal}
                className="w-full px-6 py-2 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotels;
