// API Configuration
const API_BASE_URL = 'http://localhost:5002';

export const API_URL = API_BASE_URL;

export const endpoints = {
  // Auth
  register: `${API_BASE_URL}/api/auth/register`,
  login: `${API_BASE_URL}/api/auth/login`,
  logout: `${API_BASE_URL}/api/auth/logout`,
  me: `${API_BASE_URL}/api/auth/me`,
  
  // Destinations
  destinations: `${API_BASE_URL}/api/destinations`,
  
  // Stats
  stats: `${API_BASE_URL}/api/stats`,
  
  // Health
  health: `${API_BASE_URL}/health`
};

export default API_URL;
