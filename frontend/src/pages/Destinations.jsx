import React, { useState, useEffect, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import CategoryFilter from '../components/CategoryFilter';
import DestinationCard from '../components/DestinationCard';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(destinations.map(d => d.category).filter(Boolean))];
    return cats;
  }, [destinations]);

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [destinations, selectedCategory, searchTerm]);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/destinations');
      const data = await response.json();
      console.log('API Response:', data);
      
      let destData = [];
      if (data && data.data) {
        destData = data.data;
      } else if (data && data.destinations) {
        destData = data.destinations;
      } else if (Array.isArray(data)) {
        destData = data;
      }
      
      setDestinations(destData);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDestinations = () => {
    let filtered = [...destinations];

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(d => d.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(d => 
        d.name?.toLowerCase().includes(term) ||
        d.country?.toLowerCase().includes(term) ||
        d.city?.toLowerCase().includes(term) ||
        d.description?.toLowerCase().includes(term)
      );
    }

    setFilteredDestinations(filtered);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Close filter menu on mobile after selection
    setShowFilters(false);
  };

  const getCategoryCount = (category) => {
    if (category === 'All') return destinations.length;
    return destinations.filter(d => d.category === category).length;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600">Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" />

      {/* Hero Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Amazing Destinations</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Discover breathtaking places around the world and plan your next adventure.
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="text-sm text-blue-200">
              {destinations.length} destinations available
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search by name, country, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden px-5 py-3 bg-gray-100 rounded-xl font-medium text-gray-700 hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              Categories ({categories.length - 1})
            </button>
          </div>

          {/* Category Filters - Desktop */}
          <div className="hidden md:block mt-6">
            <CategoryFilter 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelectCategory={handleCategorySelect} 
            />
          </div>

          {/* Category Filters - Mobile Dropdown */}
          {showFilters && (
            <div className="md:hidden mt-4 animate-slide-down">
              <CategoryFilter 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onSelectCategory={handleCategorySelect} 
              />
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-500 border-t border-gray-100 pt-4">
            Showing {filteredDestinations.length} of {destinations.length} destinations
            {selectedCategory !== 'All' && (
              <span className="ml-1">in <span className="font-semibold text-gray-700">{selectedCategory}</span></span>
            )}
            {searchTerm && (
              <span className="ml-1">matching "<span className="font-semibold text-gray-700">{searchTerm}</span>"</span>
            )}
          </div>
        </div>
      </div>

      {/* Destination Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <p className="text-2xl font-semibold text-gray-400 mb-2">No destinations found</p>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        )}
      </div>

      {/* Back to Top */}
      {filteredDestinations.length > 0 && (
        <div className="text-center pb-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition text-sm"
          >
            ↑ Back to Top
          </button>
        </div>
      )}
    </>
  );
};

export default Destinations;
