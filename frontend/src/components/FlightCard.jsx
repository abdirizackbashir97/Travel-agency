import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, ChevronRight } from 'lucide-react';

const FlightCard = ({ flight }) => {
  const { id, airline, origin, destination, departure, arrival, price, duration, stops } = flight || {};

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:border-primary-600 transition-all">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3 min-w-[120px]">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-700">
            {airline?.charAt(0) || 'A'}
          </div>
          <div>
            <div className="font-medium text-gray-900">{airline}</div>
            <div className="text-xs text-gray-500">Flight {id}</div>
          </div>
        </div>

        <div className="flex-1 flex items-center gap-4">
          <div>
            <div className="font-semibold text-gray-900">{origin?.code || 'NYC'}</div>
            <div className="text-xs text-gray-500">{origin?.city || 'New York'}</div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="text-xs text-gray-500">{duration || '2h 30m'}</div>
            <div className="relative w-full flex items-center">
              <div className="flex-1 h-px bg-gray-200" />
              <Plane className="w-4 h-4 text-primary-600 mx-2" />
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            {stops > 0 && (
              <div className="text-xs text-gray-400">{stops} stop{stops > 1 ? 's' : ''}</div>
            )}
          </div>
          <div className="text-right">
            <div className="font-semibold text-gray-900">{destination?.code || 'LAX'}</div>
            <div className="text-xs text-gray-500">{destination?.city || 'Los Angeles'}</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div>
            <div className="text-gray-600">{departure || '08:00'}</div>
            <div className="text-xs text-gray-400">Depart</div>
          </div>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <div>
            <div className="text-gray-600">{arrival || '10:30'}</div>
            <div className="text-xs text-gray-400">Arrive</div>
          </div>
        </div>

        <div className="flex items-center gap-4 md:flex-col md:items-end">
          <div>
            <div className="text-xl font-bold text-primary-600">${price}</div>
            <div className="text-xs text-gray-400">per person</div>
          </div>
          <Link
            to={`/flights/${id}`}
            className="px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors whitespace-nowrap"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;