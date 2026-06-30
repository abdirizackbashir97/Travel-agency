import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, Edit, Trash2, Search, Save, X, 
  Plane, Calendar, Users, MapPin, DollarSign, 
  CheckCircle, AlertCircle, RefreshCw, Image
} from 'lucide-react';

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [notification, setNotification] = useState(null);
  const [formData, setFormData] = useState({
    airline: '',
    flightNumber: '',
    from: '',
    to: '',
    departure: '',
    arrival: '',
    price: '',
    duration: '',
    stops: '0',
    date: '',
    baggage: '',
    class: 'Economy',
    image: ''
  });

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = () => {
    setLoading(true);
    const saved = localStorage.getItem('adminFlights');
    if (saved) {
      setFlights(JSON.parse(saved));
    } else {
      const defaultFlights = [
        {
          id: 1,
          airline: 'Emirates',
          flightNumber: 'EK721',
          from: 'Nairobi',
          to: 'Dubai',
          departure: '08:00',
          arrival: '14:30',
          price: 520,
          duration: '4h 30m',
          stops: 0,
          date: '25 May 2025',
          baggage: '30kg',
          class: 'Economy',
          image: '/images/flights/flight_1.png'
        },
        {
          id: 2,
          airline: 'Qatar Airways',
          flightNumber: 'QR1342',
          from: 'Nairobi',
          to: 'Doha',
          departure: '11:15',
          arrival: '16:45',
          price: 480,
          duration: '5h 30m',
          stops: 0,
          date: '25 May 2025',
          baggage: '25kg',
          class: 'Economy',
          image: '/images/flights/flight_2.png'
        }
      ];
      setFlights(defaultFlights);
      localStorage.setItem('adminFlights', JSON.stringify(defaultFlights));
    }
    setLoading(false);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAdd = () => {
    setEditingFlight(null);
    setFormData({
      airline: '',
      flightNumber: '',
      from: '',
      to: '',
      departure: '',
      arrival: '',
      price: '',
      duration: '',
      stops: '0',
      date: '',
      baggage: '',
      class: 'Economy',
      image: ''
    });
    setIsModalOpen(true);
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setFormData({
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      from: flight.from,
      to: flight.to,
      departure: flight.departure,
      arrival: flight.arrival,
      price: flight.price,
      duration: flight.duration,
      stops: flight.stops,
      date: flight.date,
      baggage: flight.baggage,
      class: flight.class,
      image: flight.image || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      const updated = flights.filter(f => f.id !== id);
      setFlights(updated);
      localStorage.setItem('adminFlights', JSON.stringify(updated));
      showNotification('Flight deleted successfully!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.airline || !formData.flightNumber || !formData.from || !formData.to || !formData.price || !formData.image) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    if (editingFlight) {
      const updated = flights.map(f => 
        f.id === editingFlight.id 
          ? { ...formData, id: f.id, price: parseFloat(formData.price), stops: parseInt(formData.stops) }
          : f
      );
      setFlights(updated);
      localStorage.setItem('adminFlights', JSON.stringify(updated));
      showNotification('Flight updated successfully!');
    } else {
      const newFlight = {
        ...formData,
        id: Date.now(),
        price: parseFloat(formData.price),
        stops: parseInt(formData.stops)
      };
      const updated = [...flights, newFlight];
      setFlights(updated);
      localStorage.setItem('adminFlights', JSON.stringify(updated));
      showNotification('New flight added successfully!');
    }
    setIsModalOpen(false);
  };

  const filteredFlights = flights.filter(f => 
    f.airline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.flightNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.to.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {notification.message}
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link to="/admin" className="hover:text-gray-700">Dashboard</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">Flights</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Flights</h1>
          <p className="text-gray-500 mt-1">Add, edit, and delete flights</p>
        </div>
        <button onClick={handleAdd} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Flight
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Search flights..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-gray-500">Total: <strong className="text-gray-900">{flights.length}</strong></span>
            <button onClick={loadFlights} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Airline</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
              ) : filteredFlights.length === 0 ? (
                <tr><td colSpan="7" className="px-6 py-8 text-center text-gray-500">No flights found</td></tr>
              ) : (
                filteredFlights.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <img src={flight.image || '/placeholder.svg'} alt={flight.airline} className="w-12 h-12 rounded-lg object-cover border border-gray-200" onError={(e) => { e.target.src = '/placeholder.svg'; }} />
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{flight.airline}</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">{flight.flightNumber}</td>
                    <td className="px-6 py-4 text-gray-600">{flight.from}</td>
                    <td className="px-6 py-4 text-gray-600">{flight.to}</td>
                    <td className="px-6 py-4 font-medium text-blue-600">${flight.price}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(flight)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(flight.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingFlight ? 'Edit Flight' : 'Add New Flight'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL <span className="text-red-500">*</span></label>
                <div className="relative">
                  <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="url" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="https://example.com/flight.jpg" required />
                </div>
                {formData.image && (
                  <div className="mt-2">
                    <img src={formData.image} alt="Preview" className="h-24 w-full object-contain rounded-lg border border-gray-200 bg-gray-50" onError={(e) => { e.target.src = '/placeholder.svg'; }} />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Airline <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.airline} onChange={(e) => setFormData({ ...formData, airline: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.flightNumber} onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.from} onChange={(e) => setFormData({ ...formData, from: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To <span className="text-red-500">*</span></label>
                  <input type="text" value={formData.to} onChange={(e) => setFormData({ ...formData, to: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) <span className="text-red-500">*</span></label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
                  <input type="time" value={formData.departure} onChange={(e) => setFormData({ ...formData, departure: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Arrival</label>
                  <input type="time" value={formData.arrival} onChange={(e) => setFormData({ ...formData, arrival: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="4h 30m" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stops</label>
                  <select value={formData.stops} onChange={(e) => setFormData({ ...formData, stops: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
                    <option value="0">Direct</option>
                    <option value="1">1 Stop</option>
                    <option value="2">2 Stops</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="25 May 2025" />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button type="submit" className="flex-1 px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  {editingFlight ? 'Update Flight' : 'Add Flight'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors">
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
