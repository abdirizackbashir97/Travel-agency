import API_BASE_URL from '../config/api';

export const getDestinations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`);
    if (!response.ok) {
      throw new Error('Failed to fetch destinations');
    }
    const data = await response.json();
    console.log('Destinations API response:', data);
    return data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

export const getDestinationById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch destination');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destination:', error);
    throw error;
  }
};

export const searchDestinations = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/search?q=${query}`);
    if (!response.ok) {
      throw new Error('Failed to search destinations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error searching destinations:', error);
    throw error;
  }
};

export const getDestinationsByCountry = async (country) => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/country/${country}`);
    if (!response.ok) {
      throw new Error('Failed to fetch destinations by country');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destinations by country:', error);
    throw error;
  }
};

export const getDestinationsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/category/${category}`);
    if (!response.ok) {
      throw new Error('Failed to fetch destinations by category');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching destinations by category:', error);
    throw error;
  }
};

export const getTopDestinations = async (limit = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/top?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Failed to fetch top destinations');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching top destinations:', error);
    throw error;
  }
};

export const createDestination = async (destinationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(destinationData),
    });
    if (!response.ok) {
      throw new Error('Failed to create destination');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating destination:', error);
    throw error;
  }
};

export const updateDestination = async (id, destinationData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(destinationData),
    });
    if (!response.ok) {
      throw new Error('Failed to update destination');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating destination:', error);
    throw error;
  }
};

export const deleteDestination = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/destinations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete destination');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting destination:', error);
    throw error;
  }
};

export default {
  getDestinations,
  getDestinationById,
  searchDestinations,
  getDestinationsByCountry,
  getDestinationsByCategory,
  getTopDestinations,
  createDestination,
  updateDestination,
  deleteDestination,
};
