import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AdminFlights = () => {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    airline: '',
    flight_number: '',
    departure_city: '',
    arrival_city: '',
    price: '',
    departure_time: '',
    arrival_time: '',
    duration: '',
    flight_type: 'Direct',
    baggage_allowance: '20kg',
    travel_date: '',
    departure_airport: '',
    arrival_airport: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/flights');
      const data = await response.json();
      setFlights(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching flights:', error);
      toast.error('Failed to load flights');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('accessToken');
      
      const flightData = {
        airline: formData.airline,
        flight_number: formData.flight_number,
        departure_city: formData.departure_city,
        arrival_city: formData.arrival_city,
        price: parseFloat(formData.price),
        departure_time: formData.departure_time,
        arrival_time: formData.arrival_time,
        duration: formData.duration,
        flight_type: formData.flight_type || 'Direct',
        baggage_allowance: formData.baggage_allowance || '20kg',
        travel_date: formData.travel_date,
        departure_airport: formData.departure_airport || formData.departure_city,
        arrival_airport: formData.arrival_airport || formData.arrival_city
      };

      console.log('Submitting flight:', flightData);

      const response = await fetch('http://localhost:5000/api/flights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(flightData)
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok) {
        toast.success('✅ Flight added successfully!');
        setFormData({
          airline: '',
          flight_number: '',
          departure_city: '',
          arrival_city: '',
          price: '',
          departure_time: '',
          arrival_time: '',
          duration: '',
          flight_type: 'Direct',
          baggage_allowance: '20kg',
          travel_date: '',
          departure_airport: '',
          arrival_airport: ''
        });
        setShowForm(false);
        fetchFlights();
      } else {
        toast.error(data.error || 'Failed to add flight');
      }
    } catch (error) {
      console.error('Error adding flight:', error);
      toast.error('Network error');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this flight?')) return;
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`http://localhost:5000/api/flights/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      toast.success('Flight deleted');
      fetchFlights();
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">✈️ Manage Flights</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            {showForm ? 'Cancel' : '+ Add Flight'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Add New Flight</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Airline *</label>
                <input
                  name="airline"
                  placeholder="e.g., Emirates"
                  value={formData.airline}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number *</label>
                <input
                  name="flight_number"
                  placeholder="e.g., EK721"
                  value={formData.flight_number}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From (Departure City) *</label>
                <input
                  name="departure_city"
                  placeholder="e.g., Nairobi"
                  value={formData.departure_city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To (Arrival City) *</label>
                <input
                  name="arrival_city"
                  placeholder="e.g., Dubai"
                  value={formData.arrival_city}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                <input
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="e.g., 520"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  name="duration"
                  placeholder="e.g., 4h 30m"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                <input
                  name="departure_time"
                  type="time"
                  value={formData.departure_time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
                <input
                  name="arrival_time"
                  type="time"
                  value={formData.arrival_time}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure Airport</label>
                <input
                  name="departure_airport"
                  placeholder="e.g., NBO"
                  value={formData.departure_airport}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Airport</label>
                <input
                  name="arrival_airport"
                  placeholder="e.g., DXB"
                  value={formData.arrival_airport}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Flight Type</label>
                <select
                  name="flight_type"
                  value={formData.flight_type}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Direct">Direct</option>
                  <option value="Connecting">Connecting</option>
                  <option value="Stopover">Stopover</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Baggage Allowance</label>
                <input
                  name="baggage_allowance"
                  placeholder="e.g., 30kg"
                  value={formData.baggage_allowance}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
                <input
                  name="travel_date"
                  type="date"
                  value={formData.travel_date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="md:col-span-2 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add Flight
              </button>
            </form>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Airline</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Flight</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {flights.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-6 text-center text-gray-500">No flights found</td>
                </tr>
              ) : (
                flights.map((flight) => (
                  <tr key={flight.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 text-sm">{flight.id}</td>
                    <td className="p-3 text-sm font-medium">{flight.airline}</td>
                    <td className="p-3 text-sm">{flight.flight_number}</td>
                    <td className="p-3 text-sm">{flight.departure_city}</td>
                    <td className="p-3 text-sm">{flight.arrival_city}</td>
                    <td className="p-3 text-sm font-bold text-indigo-600">${flight.price}</td>
                    <td className="p-3 text-sm">
                      <button onClick={() => handleDelete(flight.id)} className="text-red-600 hover:text-red-800">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminFlights;
