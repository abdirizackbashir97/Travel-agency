const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Auth endpoints
  login: (data) => fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  
  register: (data) => fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  
  // Destinations
  getDestinations: () => fetch(`${API_BASE_URL}/destinations`),
  
  // Hotels
  getHotels: () => fetch(`${API_BASE_URL}/hotels`),
  
  // Flights
  getFlights: () => fetch(`${API_BASE_URL}/flights`),
  
  // Tours
  getTours: () => fetch(`${API_BASE_URL}/tours`),
  
  // Bookings
  createBooking: (data) => fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  
  getBookings: () => fetch(`${API_BASE_URL}/bookings`),
};

export default api;
