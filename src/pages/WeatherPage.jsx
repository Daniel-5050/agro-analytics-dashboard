import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../services/weatherApi';
import { toast } from 'react-toastify';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const loadWeather = async () => {
      const data = await fetchWeather(6.34, 5.62);

      if (data) {
        setWeather(data);
      } else {
        toast.error('Weather data unavailable');
      }
    };

    loadWeather();
  }, []);

  return (
    <div className="container-fluid py-4">
      <h2>Weather Intelligence</h2>
      <p>Localized climate conditions for strategic farming.</p>

      <div className="dashboard-card weather-card mt-4">
        <h4>
          {weather
            ? `${weather.main.temp}°C`
            : 'Loading...'}
        </h4>

        <p>
          {weather
            ? weather.weather[0].description
            : 'Loading...'}
        </p>

        <p>
          Humidity:{' '}
          {weather
            ? `${weather.main.humidity}%`
            : '...'}
        </p>
      </div>
    </div>
  );
};

export default WeatherPage;