import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

const InteractiveMap = () => {
  const [hoveredPin, setHoveredPin] = useState(null);

  const destinations = [
    { name: 'Dubai', x: 85, y: 42, color: 'blue' },
    { name: 'Paris', x: 48, y: 25, color: 'red' },
    { name: 'Tokyo', x: 95, y: 42, color: 'red' },
    { name: 'Nairobi', x: 52, y: 55, color: 'green' },
    { name: 'New York', x: 15, y: 30, color: 'blue' },
    { name: 'Sydney', x: 95, y: 75, color: 'yellow' },
  ];

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-xl overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path d="M20,25 L30,20 L40,22 L50,18 L60,20 L70,15 L80,18 L90,22" stroke="#2563EB" strokeWidth="0.5" fill="none" />
          <path d="M25,30 L35,28 L45,32 L55,28 L65,30 L75,26 L85,30" stroke="#2563EB" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Destination Pins */}
      {destinations.map((dest, index) => (
        <div
          key={index}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
            hoveredPin === index ? 'scale-150 z-10' : 'scale-100'
          }`}
          style={{ left: `${dest.x}%`, top: `${dest.y}%` }}
          onMouseEnter={() => setHoveredPin(index)}
          onMouseLeave={() => setHoveredPin(null)}
        >
          <div className={`p-2 rounded-full ${
            dest.color === 'blue' ? 'bg-blue-500' :
            dest.color === 'red' ? 'bg-red-500' :
            dest.color === 'green' ? 'bg-green-500' :
            'bg-yellow-500'
          } shadow-lg`}>
            <MapPin className="w-4 h-4 text-white" />
          </div>
          {hoveredPin === index && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-3 py-1 rounded-lg shadow-lg text-sm whitespace-nowrap">
              {dest.name}
            </div>
          )}
        </div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 text-xs text-gray-600 dark:text-gray-300">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Top Destinations</span>
      </div>
    </div>
  );
};

export default InteractiveMap;
