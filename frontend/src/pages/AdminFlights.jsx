import React, { useState, useEffect } from 'react';
import { FaSearch, FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaTimes } from 'react-icons/fa';

const API_BASE = 'http://localhost:5000/api';

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [formData, setFormData] = useState({
    airline: '',
    flight_number: '',
    departure_airport: '',
    departure_city: '',
    departure_time: '',
    arrival_airport: '',
    arrival_city: '',
    arrival_time: '',
    duration: '',
    flight_type: '',
    baggage_allowance: '',
    travel_date: '',
    price: '',
  });

  const fetchFlights = async () => {
    try {
      const res = await fetch(`${API_BASE}/flights`);
      const data = await res.json();
      setFlights(data.data || []);
    } catch (error) {
      console.error('Error fetching flights:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setEditingFlight(null);
    setFormData({
      airline: '',
      flight_number: '',
      departure_airport: '',
      departure_city: '',
      departure_time: '',
      arrival_airport: '',
      arrival_city: '',
      arrival_time: '',
      duration: '',
      flight_type: '',
      baggage_allowance: '',
      travel_date: '',
      price: '',
    });
    setShowModal(true);
  };

  const openEditModal = (flight) => {
    setEditingFlight(flight);
    setFormData({
      airline: flight.airline || '',
      flight_number: flight.flight_number || '',
      departure_airport: flight.departure_airport || '',
      departure_city: flight.departure_city || '',
      departure_time: flight.departure_time || '',
      arrival_airport: flight.arrival_airport || '',
      arrival_city: flight.arrival_city || '',
      arrival_time: flight.arrival_time || '',
      duration: flight.duration || '',
      flight_type: flight.flight_type || '',
      baggage_allowance: flight.baggage_allowance || '',
      travel_date: flight.travel_date || '',
      price: flight.price || '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingFlight
      ? `${API_BASE}/flights/${editingFlight.id}`
      : `${API_BASE}/flights`;
    const method = editingFlight ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        fetchFlights();
        setShowModal(false);
        setEditingFlight(null);
      } else {
        const error = await res.json();
        alert('Error: ' + (error.message || 'Operation failed'));
      }
    } catch (error) {
      console.error('Error saving flight:', error);
      alert('Network error');
    }
  };

  const deleteFlight = async (id) => {
    if (!window.confirm('Delete this flight?')) return;
    try {
      const res = await fetch(`${API_BASE}/flights/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchFlights();
      } else {
        alert('Failed to delete flight');
      }
    } catch (error) {
      console.error('Error deleting flight:', error);
    }
  };

  const toggleStatus = async (flight) => {
    const newStatus = flight.is_active === 1 ? 0 : 1;
    try {
      const res = await fetch(`${API_BASE}/flights/${flight.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: newStatus }),
      });
      if (res.ok) {
        fetchFlights();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filtered = flights.filter(f =>
    f.airline?.toLowerCase().includes(search.toLowerCase()) ||
    f.flight_number?.toLowerCase().includes(search.toLowerCase()) ||
    f.departure_city?.toLowerCase().includes(search.toLowerCase()) ||
    f.arrival_city?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="p-6 text-gray-500">Loading flights...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Flights Management</h2>
        <button
          onClick={openAddModal}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <FaPlus /> Add Flight
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search flights..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <span className="text-sm text-gray-500">Total: {filtered.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Airline</th>
                <th className="px-4 py-3 text-left">Flight</th>
                <th className="px-4 py-3 text-left">Origin</th>
                <th className="px-4 py-3 text-left">Destination</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id} className="border-t border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">{f.airline}</td>
                  <td className="px-4 py-3 font-medium">{f.flight_number}</td>
                  <td className="px-4 py-3">{f.departure_city} ({f.departure_airport})</td>
                  <td className="px-4 py-3">{f.arrival_city} ({f.arrival_airport})</td>
                  <td className="px-4 py-3">{f.travel_date}</td>
                  <td className="px-4 py-3">${f.price}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      f.is_active === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {f.is_active === 1 ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEditModal(f)} className="text-blue-600 hover:text-blue-800">
                        <FaEdit />
                      </button>
                      <button onClick={() => deleteFlight(f.id)} className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                      <button onClick={() => toggleStatus(f)} className="text-gray-600 hover:text-gray-800">
                        {f.is_active === 1 ? (
                          <FaToggleOn className="text-green-600" />
                        ) : (
                          <FaToggleOff className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 overflow-y-auto py-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <FaTimes />
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {editingFlight ? 'Edit Flight' : 'Add New Flight'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Airline</label>
                  <input name="airline" value={formData.airline} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Flight Number</label>
                  <input name="flight_number" value={formData.flight_number} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Departure Airport</label>
                  <input name="departure_airport" value={formData.departure_airport} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Departure City</label>
                  <input name="departure_city" value={formData.departure_city} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Departure Time</label>
                  <input type="time" name="departure_time" value={formData.departure_time} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Arrival Airport</label>
                  <input name="arrival_airport" value={formData.arrival_airport} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Arrival City</label>
                  <input name="arrival_city" value={formData.arrival_city} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Arrival Time</label>
                  <input type="time" name="arrival_time" value={formData.arrival_time} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Duration</label>
                  <input name="duration" value={formData.duration} onChange={handleChange} placeholder="e.g. 3h 30m" className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Flight Type</label>
                  <input name="flight_type" value={formData.flight_type} onChange={handleChange} placeholder="Direct / One-stop" className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Baggage Allowance</label>
                  <input name="baggage_allowance" value={formData.baggage_allowance} onChange={handleChange} placeholder="e.g. 30kg" className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Travel Date</label>
                  <input type="date" name="travel_date" value={formData.travel_date} onChange={handleChange} className="w-full border rounded-lg p-2" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} step="0.01" className="w-full border rounded-lg p-2" required />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button type="submit" className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  {editingFlight ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminFlights;
