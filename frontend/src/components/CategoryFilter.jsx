import React from 'react';
import { 
  Mountain, 
  Umbrella, 
  Building2, 
  Church, 
  Compass,
  MapPin,
  Sun,
  Trees,
  Sparkles,
  Globe
} from 'lucide-react';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  // Map categories to icons and colors
  const categoryConfig = {
    'All': { icon: Globe, color: 'from-indigo-600 to-purple-600', bg: 'bg-indigo-50' },
    'Mountain': { icon: Mountain, color: 'from-emerald-600 to-teal-600', bg: 'bg-emerald-50' },
    'Beach': { icon: Umbrella, color: 'from-cyan-600 to-blue-600', bg: 'bg-cyan-50' },
    'City': { icon: Building2, color: 'from-rose-600 to-pink-600', bg: 'bg-rose-50' },
    'Religious': { icon: Church, color: 'from-purple-600 to-violet-600', bg: 'bg-purple-50' },
    'Cultural': { icon: Compass, color: 'from-orange-600 to-amber-600', bg: 'bg-orange-50' },
    'Safari': { icon: Trees, color: 'from-green-600 to-emerald-600', bg: 'bg-green-50' },
    'Adventure': { icon: Mountain, color: 'from-red-600 to-orange-600', bg: 'bg-red-50' },
    'Luxury': { icon: Sparkles, color: 'from-yellow-600 to-amber-600', bg: 'bg-yellow-50' },
    'Nature': { icon: Sun, color: 'from-lime-600 to-green-600', bg: 'bg-lime-50' },
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => {
        const config = categoryConfig[category] || categoryConfig['All'];
        const Icon = config.icon;
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`
              group relative px-5 py-3 rounded-2xl font-medium text-sm
              transition-all duration-300 transform hover:scale-105
              flex items-center gap-2
              ${isSelected 
                ? `bg-gradient-to-r ${config.color} text-white shadow-lg scale-105` 
                : `${config.bg} text-gray-700 hover:shadow-md`
              }
            `}
          >
            <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
            <span>{category}</span>
            {isSelected && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
