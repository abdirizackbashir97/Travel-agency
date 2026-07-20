import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plane, Plus, Edit, Trash2, Eye, Search, X, Check, AlertCircle } from 'lucide-react';

export default function AdminFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    airline: '',
    flight_number: '',
    departure_city: '',
    arrival_city: '',
    departure_time: '',
    arrival_time: '',
    duration: '',
    price: '',
    flight_type: 'Direct',
    baggage_allowance: '23kg',
    travel_date: '',
    is_active: 1
  });

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:5000/api/flights', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setFlights(response.data.flights || []);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching flights:', err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken');
      const url = editingFlight 
        ? `http://localhost:5000/api/admin/flights/${editingFlight.id}`
        : 'http://localhost:5000/api/admin/flights';
      const method = editingFlight ? 'put' : 'post';
      
      const response = await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        alert(editingFlight ? '✅ Flight updated!' : '✅ Flight added!');
        setShowModal(false);
        setEditingFlight(null);
        resetForm();
        fetchFlights();
      }
    } catch (err) {
      console.error('Error saving flight:', err);
      alert('❌ Failed to save flight');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this flight?')) return;
    try {
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:5000/api/admin/flights/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('✅ Flight deleted!');
      fetchFlights();
    } catch (err) {
      console.error('Error deleting flight:', err);
      alert('❌ Failed to delete flight');
    }
  };

  const openEditModal = (flight) => {
    setEditingFlight(flight);
    setFormData({
      airline: flight.airline || '',
      flight_number: flight.flight_number || '',
      departure_city: flight.departure_city || '',
      arrival_city: flight.arrival_city || '',
      departure_time: flight.departure_time || '',
      arrival_time: flight.arrival_time || '',
      duration: flight.duration || '',
      price: flight.price || '',
      flight_type: flight.flight_type || 'Direct',
      baggage_allowance: flight.baggage_allowance || '23kg',
      travel_date: flight.travel_date || '',
      is_active: flight.is_active !== undefined ? flight.is_active : 1
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      airline: '',
      flight_number: '',
      departure_city: '',
      arrival_city: '',
      departure_time: '',
      arrival_time: '',
      duration: '',
      price: '',
      flight_type: 'Direct',
      baggage_allowance: '23kg',
      travel_date: '',
      is_active: 1
    });
  };

  const filteredFlights = flights.filter(f => 
    f.airline?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.flight_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.departure_city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.arrival_city?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-48"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">✈️ Manage Flights</h1>
          <p className="text-sm text-gray-500">Add, edit, or remove flights</p>
        </div>
        <button
          onClick={() => { setEditingFlight(null); resetForm(); setShowModal(true); }}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
        >
          <Plus size={18} /> Add Flight
        </button>
      </div>

      {/* Search */}
      <div className="mb-4 relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search flights..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Airline</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flight #</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredFlights.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-6 text-center text-gray-500">No flights found</td>
                </tr>
              ) : (
                filteredFlights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-medium text-gray-800">{flight.airline}</td>
                    <td className="px-4 py-3 text-gray-600">{flight.flight_number}</td>
                    <td className="px-4 py-3 text-gray-600">{flight.departure_city} → {flight.arrival_city}</td>
                    <td className="px-4 py-3 text-gray-600">${flight.price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${flight.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {flight.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(flight)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(flight.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">
                {editingFlight ? '✈️ Edit Flight' : '✈️ Add New Flight'}
              </h2>
              <button onClick={() => { setShowModal(false); setEditingFlight(null); }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Airline *</label>
                  <input
                    type="text"
                    value={formData.airline}
                    onChange={(e) => setFormData({...formData, airline: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number *</label>
                  <input
                    type="text"
                    value={formData.flight_number}
                    onChange={(e) => setFormData({...formData, flight_number: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departure City *</label>
                  <input
                    type="text"
                    value={formData.departure_city}
                    onChange={(e) => setFormData({...formData, departure_city: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Arrival City *</label>
                  <input
                    type="text"
                    value={formData.arrival_city}
                    onChange={(e) => setFormData({...formData, arrival_city: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
                  <input
                    type="time"
                    value={formData.departure_time}
                    onChange={(e) => setFormData({...formData, departure_time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
                  <input
                    type="time"
                    value={formData.arrival_time}
                    onChange={(e) => setFormData({...formData, arrival_time: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({...formData, duration: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g., 2h 30m"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flight Type</label>
                  <select
                    value={formData.flight_type}
                    onChange={(e) => setFormData({...formData, flight_type: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="Direct">Direct</option>
                    <option value="Connecting">Connecting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: parseInt(e.target.value)})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-semibold"
              >
                {editingFlight ? '💾 Update Flight' : '✈️ Add Flight'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
