// frontend/src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getFlights = async (searchParams = {}) => {
  const { from = '', to = '', date = '' } = searchParams;
  try {
    const response = await axios.get(`${API_URL}/flights`, {
      params: { from, to, date },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    return [];
  }
};

export const createFlight = async (flightData) => {
  try {
    const response = await axios.post(`${API_URL}/flights`, flightData, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error creating flight:', error);
    return null;
  }
};
