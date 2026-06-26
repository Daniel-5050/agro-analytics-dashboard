import axios from 'axios';

const WEATHER_BASE_URL = 'http://localhost:5000/api/weather';

export const fetchWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `${WEATHER_BASE_URL}?lat=${lat}&lon=${lon}`
    );
    return response.data;
  } catch (error) {
    console.error('Weather API Error:', error);
    return null;
  }
};