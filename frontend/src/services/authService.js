import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userProfile');
      
      // If you have a backend logout endpoint
      // const response = await axios.post(`${API_URL}/auth/logout`);
      // return response.data;
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser: async () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      throw error;
    }
  },

  isAuthenticated: () => {
    return localStorage.getItem('isLoggedIn') === 'true';
  },
};

export default authService;
