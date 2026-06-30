import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaPlane } from 'react-icons/fa';

const FlightDetails = () => {
  const { id } = useParams();
  
  const flight = {
    id: 'AF123',
    airline: 'Air France',
    origin: { code: 'JFK', city: 'New York', time: '08:00' },
    destination: { code: 'CDG', city: 'Paris', time: '20:00' },
    price: 599,
    duration: '7h',
  };

  return (
    <div className="container py-12">
      <Link to="/flights" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6">
        <FaArrowLeft className="w-4 h-4" />
        Back to Flights
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 font-bold">
                  {flight.airline.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{flight.airline}</div>
                  <div className="text-sm text-gray-500">{flight.id}</div>
                </div>
              </div>
              <div className="text-2xl font-bold text-primary-600">${flight.price}</div>
            </div>

            <div className="flex items-center justify-between py-6 border-y border-gray-200">
              <div>
                <div className="text-2xl font-bold text-gray-900">{flight.origin.code}</div>
                <div className="text-sm text-gray-500">{flight.origin.city}</div>
                <div className="text-xs text-gray-400">{flight.origin.time}</div>
              </div>
              <div className="flex-1 flex flex-col items-center px-4">
                <div className="text-xs text-gray-500">{flight.duration}</div>
                <div className="relative w-full flex items-center my-2">
                  <div className="flex-1 h-px bg-gray-200" />
                  <FaPlane className="w-5 h-5 text-primary-600 mx-2" />
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{flight.destination.code}</div>
                <div className="text-sm text-gray-500">{flight.destination.city}</div>
                <div className="text-xs text-gray-400">{flight.destination.time}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
            <h3 className="font-semibold text-gray-900 mb-4">Book This Flight</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Passengers</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600">
                  <option>1 Passenger</option>
                  <option>2 Passengers</option>
                  <option>3 Passengers</option>
                </select>
              </div>
              <Link to="/booking" className="block w-full text-center py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700">
                Continue to Booking
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightDetails;
