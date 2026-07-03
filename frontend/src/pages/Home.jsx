import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plane, Hotel, Package, Compass, Car, Calendar, Users,
  ChevronDown, ArrowRight, Star, Heart, MapPin, Shield,
  Headphones, CreditCard, Award, Clock, CheckCircle, Search
} from 'lucide-react';

import HeroSlider from '../components/HeroSlider';
import TravelQuiz from '../components/TravelQuiz';
import WeatherWidget from '../components/WeatherWidget';

// ==================== DATA ====================
const DESTINATIONS = [
  { id: 1, name: 'Dubai', location: 'UAE', image: '/images/destinations/dubai.png', price: 420, rating: 4.8 },
  { id: 2, name: 'Istanbul', location: 'Turkey', image: '/images/destinations/istabul.png', price: 410, rating: 4.6 },
  { id: 3, name: 'Madrid', location: 'Spain', image: '/images/destinations/madrid.png', price: 450, rating: 4.7 },
  { id: 4, name: 'Makkah', location: 'Saudi Arabia', image: '/images/destinations/makkah.png', price: 380, rating: 4.9 },
  { id: 5, name: 'Moscow', location: 'Russia', image: '/images/destinations/moscow.png', price: 430, rating: 4.5 },
  { id: 6, name: 'Paris', location: 'France', image: '/images/destinations/paris.png', price: 520, rating: 4.9 },
  { id: 7, name: 'Tokyo', location: 'Japan', image: '/images/destinations/tokyo.png', price: 550, rating: 4.8 },
];

const PACKAGES = [
  {
    id: 1,
    name: 'Maldives Escape',
    location: 'Maldives',
    image: '/images/tours/tour_1.png',
    price: 780,
    duration: '4 Days / 3 Nights',
    includes: 'Flight + Hotel + Transfer',
    badge: 'BEST SELLER',
    badgeColor: 'bg-green-500'
  },
  {
    id: 2,
    name: 'Kenya Safari Adventure',
    location: 'Kenya',
    image: '/images/tours/tour_2.png',
    price: 950,
    duration: '5 Days / 4 Nights',
    includes: 'Safari + Hotel + Meals',
    badge: 'FAMILY PACKAGE',
    badgeColor: 'bg-blue-500'
  },
  {
    id: 3,
    name: 'Greece Romantic Getaway',
    location: 'Greece',
    image: '/images/tours/tour_3.png',
    price: 1120,
    duration: '6 Days / 5 Nights',
    includes: 'Flight + Hotel + Breakfast',
    badge: 'ROMANTIC',
    badgeColor: 'bg-pink-500'
  },
  {
    id: 4,
    name: 'Dubai City Break',
    location: 'Dubai',
    image: '/images/tours/tour_4.png',
    price: 420,
    duration: '3 Days / 2 Nights',
    includes: 'Flight + Hotel + City Tour',
    badge: 'CITY BREAK',
    badgeColor: 'bg-yellow-500'
  },
];

const BLOG_POSTS = [
  {
    title: '10 Best Beaches in the World',
    date: 'May 15, 2024',
    author: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop',
    excerpt: 'Discover the most stunning beaches for your next tropical getaway.'
  },
  {
    title: 'How to Travel on a Budget',
    date: 'May 12, 2024',
    author: 'Michael Chen',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=250&fit=crop',
    excerpt: 'Smart tips and tricks to explore the world without breaking the bank.'
  },
  {
    title: 'Top 5 Hidden Gems in Europe',
    date: 'May 10, 2024',
    author: 'Emma Wilson',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=250&fit=crop',
    excerpt: 'Off-the-beaten-path destinations you need to visit in Europe.'
  },
];

const FEATURES = [
  { icon: Award, title: 'Best Price', description: 'We offer the best prices guaranteed.' },
  { icon: Compass, title: 'Expert Guidance', description: 'Get advice from travel experts.' },
  { icon: Headphones, title: '24/7 Support', description: "We're here for you anytime, anywhere." },
  { icon: CreditCard, title: 'Easy Booking', description: 'Book in minutes with a smooth process.' },
];

const TESTIMONIALS = [
  {
    name: 'Sarah Wanjiku',
    location: 'Nairobi, Kenya',
    text: 'SkyRoute made my Dubai trip stress-free and amazing. The service was top-notch!',
    rating: 5
  },
  {
    name: 'John Otieno',
    location: 'Mombasa, Kenya',
    text: 'The safari package was beyond my expectations. Great value for money!',
    rating: 5
  },
  {
    name: 'Aisha Mohamed',
    location: 'Kampala, Uganda',
    text: 'Fast booking, friendly support, and unforgettable memories. Highly recommended!',
    rating: 5
  },
];

const PARTNERS = ['Emirates', 'Qatar Airways', 'Turkish Airlines', 'Ethiopian Airlines', 'Kenya Airways'];
const TRAVEL_TABS = ['Flights', 'Hotels', 'Packages', 'Tours', 'Car Hire'];
const TRAVELER_OPTIONS = [
  '1 Passenger, Economy',
  '2 Passengers, Economy',
  '3 Passengers, Economy',
  '4 Passengers, Economy',
  '1 Passenger, Business',
  '2 Passengers, Business'
];

// ==================== COMPONENTS ====================
const SearchBar = ({ tripType, searchData, onTabChange, onSearchChange, onSearchSubmit }) => (
  <section className="py-8 bg-gray-50 border-b border-gray-200">
    <div className="container">
      <form onSubmit={onSearchSubmit} className="bg-white rounded-2xl p-6 shadow-sm max-w-4xl mx-auto">
        <div className="flex gap-2 mb-4 flex-wrap">
          {TRAVEL_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab.toLowerCase())}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                tripType === tab.toLowerCase()
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="from"
                value={searchData.from}
                onChange={onSearchChange}
                placeholder="Nairobi (NBO)"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                name="to"
                value={searchData.to}
                onChange={onSearchChange}
                placeholder="Dubai (DXB)"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Depart</label>
            <input
              type="date"
              name="depart"
              value={searchData.depart}
              onChange={onSearchChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Travelers</label>
            <select
              name="travelers"
              value={searchData.travelers}
              onChange={onSearchChange}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent appearance-none bg-white"
            >
              {TRAVELER_OPTIONS.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          Search Flights
        </button>
      </form>
    </div>
  </section>
);

const DestinationCard = ({ destination }) => (
  <div className="group cursor-pointer">
    <Link to={`/destinations/${destination.id}`}>
      <div className="relative rounded-xl overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-semibold text-lg">{destination.name}</h3>
          <p className="text-sm text-white/80">{destination.location}</p>
          <p className="text-sm font-bold mt-1">From ${destination.price}</p>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
          <span>{destination.rating}</span>
        </div>
        <button className="absolute top-3 left-3 p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors">
          <Heart className="w-4 h-4 text-gray-400 hover:text-red-500 transition-colors" />
        </button>
      </div>
    </Link>
    <div className="mt-2">
      <WeatherWidget destination={destination.name} />
    </div>
  </div>
);

const PackageCard = ({ pkg }) => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all group">
    <div className="relative h-56 overflow-hidden">
      <img
        src={pkg.image}
        alt={pkg.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-lg ${pkg.badgeColor}`}>
        {pkg.badge}
      </span>
      <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-white text-xs">
        <Clock className="w-3 h-3 inline mr-1" />
        {pkg.duration}
      </div>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{pkg.name}</h3>
      <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
        <MapPin className="w-3 h-3" />
        {pkg.location}
      </p>
      <div className="mt-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span>{pkg.includes}</span>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <span className="text-xl font-bold text-blue-600">${pkg.price}</span>
          <span className="text-xs text-gray-400 ml-1">/person</span>
        </div>
        <Link to="/booking" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Book Now
        </Link>
      </div>
    </div>
  </div>
);

const BlogCard = ({ post }) => (
  <Link to="/blog" className="group">
    <div className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{post.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>
        <span className="inline-block mt-3 text-sm text-blue-600 font-medium group-hover:underline">Read More →</span>
      </div>
    </div>
  </Link>
);

const SectionHeader = ({ title, subtitle, linkTo, linkText }) => (
  <div className="flex items-center justify-between mb-8">
    <div>
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-gray-500 mt-1">{subtitle}</p>}
    </div>
    {linkTo && (
      <Link to={linkTo} className="text-blue-600 hover:text-blue-700 flex items-center gap-2 text-sm font-medium">
        {linkText} <ArrowRight className="w-4 h-4" />
      </Link>
    )}
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-xl border border-gray-200 p-6">
    <div className="flex gap-1 text-yellow-500 mb-3">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-500" />
      ))}
    </div>
    <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
    <div>
      <p className="font-semibold text-gray-900">{testimonial.name}</p>
      <p className="text-sm text-gray-500">{testimonial.location}</p>
    </div>
  </div>
);

const Newsletter = () => (
  <section className="py-16 bg-blue-600">
    <div className="container text-center">
      <h2 className="text-3xl font-bold text-white mb-2">Subscribe to our newsletter</h2>
      <p className="text-blue-100 mb-6">Get the best travel deals and offers straight to your inbox.</p>
      <div className="max-w-md mx-auto flex gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors">
          Subscribe
        </button>
      </div>
    </div>
  </section>
);

// ==================== MAIN COMPONENT ====================
const Home = () => {
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('flights');
  const [searchData, setSearchData] = useState({
    from: '',
    to: '',
    depart: '',
    travelers: '1 Passenger, Economy'
  });

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (!searchData.from || !searchData.to) {
      alert('Please fill in both "From" and "To" fields');
      return;
    }

    localStorage.setItem('flightSearch', JSON.stringify(searchData));
    navigate(`/flights?from=${searchData.from}&to=${searchData.to}`);
  };

  return (
    <div>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Search Bar */}
      <SearchBar
        tripType={tripType}
        searchData={searchData}
        onTabChange={setTripType}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* Popular Destinations */}
      <section className="py-16">
        <div className="container">
          <SectionHeader
            title="Popular Destinations"
            subtitle="Most sought-after destinations"
            linkTo="/destinations"
            linkText="View All"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {DESTINATIONS.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Holiday Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <SectionHeader
            title="Featured Holiday Packages"
            subtitle="Curated experiences for every traveler"
            linkTo="/tours"
            linkText="View All"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PACKAGES.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Travel Quiz Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Destination</h2>
              <p className="text-gray-500 mb-6">
                Not sure where to go? Take our quick quiz and discover the perfect destination
                tailored to your travel preferences!
              </p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 font-bold text-sm">
                    JD
                  </div>
                  <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-green-600 font-bold text-sm">
                    SM
                  </div>
                  <div className="w-10 h-10 rounded-full bg-purple-100 border-2 border-white flex items-center justify-center text-purple-600 font-bold text-sm">
                    AK
                  </div>
                </div>
                <span className="text-sm text-gray-500">1,200+ travelers found their dream destination</span>
              </div>
            </div>
            <div>
              <TravelQuiz />
            </div>
          </div>
        </div>
      </section>

      {/* Travel Blog */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <SectionHeader
            title="Travel Blog"
            subtitle="Latest travel stories and tips"
            linkTo="/blog"
            linkText="View All"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, index) => (
              <BlogCard key={index} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose SkyRoute?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">What Our Travelers Say</h2>
          <p className="text-gray-500 text-center mb-12">Real experiences from real people</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 border-b border-gray-200">
        <div className="container">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider text-center mb-8">
            Our Trusted Partners
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {PARTNERS.map((partner, index) => (
              <span key={index} className="text-lg font-semibold text-gray-700 hover:text-blue-600 transition-colors">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
};

export default Home;