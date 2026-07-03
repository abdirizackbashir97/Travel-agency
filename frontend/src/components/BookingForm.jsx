import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FaCalendar, FaUsers, FaPlane, FaHotel, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';

const BookingForm = ({ onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    destination: '',
    travelDate: '',
    returnDate: '',
    adults: 1,
    children: 0,
    accommodation: 'hotel',
    flight: 'economy',
    specialRequests: '',
    paymentMethod: 'credit_card'
  });

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('http://localhost:5002/api/destinations');
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
      toast.error('Failed to load destinations');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      const bookingData = {
        customer_name: user.firstName + ' ' + user.lastName,
        customer_email: user.email,
        destination_id: parseInt(formData.destination),
        travel_date: formData.travelDate,
        return_date: formData.returnDate,
        number_of_adults: parseInt(formData.adults),
        number_of_children: parseInt(formData.children),
        accommodation: formData.accommodation,
        flight_type: formData.flight,
        special_requests: formData.specialRequests,
        payment_method: formData.paymentMethod,
        total_price: totalPrice
      };

      const response = await fetch('http://localhost:5002/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify(bookingData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('✅ Booking confirmed! Check your email.');
        setFormData({
          destination: '',
          travelDate: '',
          returnDate: '',
          adults: 1,
          children: 0,
          accommodation: 'hotel',
          flight: 'economy',
          specialRequests: '',
          paymentMethod: 'credit_card'
        });
        setTotalPrice(0);
        if (onBookingSuccess) onBookingSuccess();
      } else {
        toast.error(data.error || 'Booking failed');
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate price when destination or options change
  useEffect(() => {
    if (formData.destination) {
      const selectedDest = destinations.find(d => d.id === parseInt(formData.destination));
      if (selectedDest) {
        let price = selectedDest.price;
        
        // Add accommodation cost
        if (formData.accommodation === 'hotel') price += 50;
        else if (formData.accommodation === 'resort') price += 100;
        else if (formData.accommodation === 'villa') price += 150;
        
        // Add flight cost
        if (formData.flight === 'business') price += 200;
        else if (formData.flight === 'first_class') price += 400;
        
        // Multiply by number of adults
        price = price * parseInt(formData.adults || 1);
        
        // Add children (half price)
        if (formData.children) {
          price += (price / 2) * parseInt(formData.children);
        }
        
        setTotalPrice(price);
      }
    }
  }, [formData.destination, formData.adults, formData.children, formData.accommodation, formData.flight, destinations]);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FaPlane className="text-indigo-600" />
        Book Your Travel
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaMapMarkerAlt className="inline mr-1" /> Destination *
            </label>
            <select
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            >
              <option value="">Select Destination</option>
              {destinations.map(dest => (
                <option key={dest.id} value={dest.id}>
                  {dest.name}, {dest.country} - ${dest.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaUsers className="inline mr-1" /> Number of Adults *
            </label>
            <input
              type="number"
              name="adults"
              value={formData.adults}
              onChange={handleChange}
              min="1"
              max="10"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCalendar className="inline mr-1" /> Travel Date *
            </label>
            <input
              type="date"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCalendar className="inline mr-1" /> Return Date
            </label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              min={formData.travelDate || new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Accommodation & Flight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaHotel className="inline mr-1" /> Accommodation
            </label>
            <select
              name="accommodation"
              value={formData.accommodation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="hotel">Hotel (+$50)</option>
              <option value="resort">Resort (+$100)</option>
              <option value="villa">Villa (+$150)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaPlane className="inline mr-1" /> Flight Class
            </label>
            <select
              name="flight"
              value={formData.flight}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="economy">Economy</option>
              <option value="business">Business (+$200)</option>
              <option value="first_class">First Class (+$400)</option>
            </select>
          </div>
        </div>

        {/* Children */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaUsers className="inline mr-1" /> Number of Children
          </label>
          <input
            type="number"
            name="children"
            value={formData.children}
            onChange={handleChange}
            min="0"
            max="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests
          </label>
          <textarea
            name="specialRequests"
            value={formData.specialRequests}
            onChange={handleChange}
            rows="3"
            placeholder="Any special requirements (dietary, accessibility, etc.)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <FaCreditCard className="inline mr-1" /> Payment Method
          </label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="credit_card">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="mpesa">M-Pesa</option>
          </select>
        </div>

        {/* Price Summary */}
        {totalPrice > 0 && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-700">Total Price:</span>
              <span className="text-2xl font-bold text-indigo-600">${totalPrice.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Includes accommodation and flight for {formData.adults} adult(s)
              {formData.children > 0 && ` and ${formData.children} child(ren)`}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.destination || !formData.travelDate}
          className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
