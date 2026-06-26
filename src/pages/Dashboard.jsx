import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import { fetchWeather } from '../services/weatherApi';
import { fetchMarketPrices } from '../services/marketApi';
import { fetchInventory } from '../services/inventoryApi';
import { toast } from 'react-toastify';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const Dashboard = () => {
  const [weather, setWeather] = useState(null);
  const [marketPrices, setMarketPrices] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const loadDashboardData = async () => {
      const weatherData = await fetchWeather(6.34, 5.62);
      const marketData = await fetchMarketPrices();
      const inventoryData = await fetchInventory();

      if (weatherData) {
        setWeather(weatherData);
      } else {
        toast.error('Weather data unavailable');
      }

      if (marketData) {
        setMarketPrices(marketData);
      }

      if (inventoryData) {
        setInventory(inventoryData);
      }
    };

    loadDashboardData();
  }, []);

  // Calculate estimated market value
  const totalMarketValue = inventory.reduce(
    (total, item) =>
      total + (item.estimatedValue || 0),
    0
  );

  /* =========================
     CHART DATA
  ========================= */
  const inventoryChartData = inventory.map((item) => ({
    name: item.cropName,
    quantity: item.quantity
  }));

  const pieChartData = inventory.map((item) => ({
    name: item.cropName,
    value: item.estimatedValue
  }));

  const COLORS = [
    '#1d3557',
    '#2a9d8f',
    '#e9c46a',
    '#f4a261',
    '#e76f51',
    '#6a4c93',
    '#118ab2'
  ];

  return (
    <div className="dashboard-container container-fluid py-4">

      {/* Welcome Header */}
      <div className="welcome-bar d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="dashboard-title">Farm Overview</h2>
          <p className="dashboard-subtitle">
            Monitor your farm performance, weather, and market trends in real time.
          </p>
        </div>

        <div className="location-boxes d-flex gap-3 flex-wrap">
          <div className="info-box">📍 Port -Harcourt Farm</div>
          <div className="info-box">📅 2026 Season</div>
        </div>
      </div>

      {/* Farm Banner */}
      <div className="farm-banner-card position-relative mb-4">
        <img
          src="https://media.istockphoto.com/id/506164764/photo/tractor-spraying-soybean-field.jpg?s=612x612&w=0&k=20&c=h27yHr07QNSghYS20iwYBCGjZIa2HlXqrZDkM0ZsYEw="
          alt="Farm Banner"
          className="farm-banner-img"
        />

        <div className="banner-overlay">
          <div className="banner-left">
            <h3>Smart Farm Management</h3>
            <p>Total Acres: 1,250</p>
            <p>Crop Health: Moderate</p>
            <p>Field Locations: 8 Active Zones</p>
          </div>

          <div className="banner-right d-flex gap-3 flex-wrap">
            <div className="mini-card">
              <h4>
                {weather ? `${weather.main.temp}°C` : '...'}
              </h4>
              <p>
                {weather ? weather.weather[0].main : 'Loading'}
              </p>
            </div>

            <div className="mini-card">
              <h4>72%</h4>
              <p>Soil Moisture</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Cards */}
      <div className="row g-4">

        {/* Weather */}
        <div className="col-lg-4 col-md-6">
          <div className="dashboard-card weather-card">
            <h5>Weather Forecast</h5>
            <p>
              Temperature:{' '}
              {weather
                ? `${weather.main.temp}°C`
                : 'Loading...'}
            </p>
            <p>
              Condition:{' '}
              {weather
                ? weather.weather[0].main
                : 'Loading...'}
            </p>
          </div>
        </div>

        {/* Market Prices */}
        <div className="col-lg-4 col-md-6">
          <div className="dashboard-card market-card">
            <h5>Market Prices</h5>
            {marketPrices.length > 0 ? (
              marketPrices.map(
                (crop, index) => (
                  <p key={index}>
                    {crop.crop}: ₦
                    {crop.price.toLocaleString()}
                  </p>
                )
              )
            ) : (
              <p>
                Loading market prices...
              </p>
            )}
          </div>
        </div>

        {/* Inventory */}
        <div className="col-lg-4 col-md-12">
          <div className="dashboard-card inventory-card">
            <h5>Inventory Status</h5>
            {inventory.length > 0 ? (
              inventory.map(
                (item, index) => (
                  <p key={index}>
                    {item.cropName}:{' '}
                    {item.quantity}{' '}
                    {item.unit}
                  </p>
                )
              )
            ) : (
              <p>
                No inventory data
                available
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Analytics Section */}
      <div className="row g-4 mt-3">

        {/* Estimated Market Value */}
        <div className="col-lg-6 col-md-6">
          <div className="dashboard-card analytics-card">
            <h5>
              Estimated Market Value
            </h5>
            <p>
              Total Value: ₦
              {totalMarketValue > 0
                ? totalMarketValue.toLocaleString()
                : 'Loading...'}
            </p>
          </div>
        </div>

        {/* Alerts */}
        <div className="col-lg-6 col-md-6">
          <div className="dashboard-card alerts-card">
            <h5>Alerts</h5>

            {weather &&
              weather.weather[0].main
                .toLowerCase()
                .includes('rain') && (
                <p>
                  ⚠ Rain expected —
                  protect sensitive
                  crops.
                </p>
              )}

            {weather &&
              weather.main.temp >
                35 && (
                <p>
                  ⚠ High
                  temperature
                  warning —
                  irrigation
                  advised.
                </p>
              )}

            {inventory.some(
              (item) =>
                item.quantity < 100
            ) && (
              <p>
                ⚠ Low stock
                detected for some
                crops.
              </p>
            )}

            {marketPrices.some(
              (crop) =>
                crop.price < 200000
            ) && (
              <p>
                ⚠ Market prices
                dropping for
                select crops.
              </p>
            )}

            {!weather && (
              <p>
                Loading weather
                alerts...
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="row g-4 mt-4">

        {/* Bar Chart */}
        <div className="col-lg-6 col-md-12">
          <div className="dashboard-card">
            <h5
              style={{
                color: '#1d3557',
                fontWeight: '700'
              }}
            >
              Crop Quantity Overview
            </h5>

            {inventoryChartData.length >
            0 ? (
              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <BarChart
                  data={
                    inventoryChartData
                  }
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />

                  <Bar dataKey="quantity">
                    {inventoryChartData.map(
                      (
                        entry,
                        index
                      ) => (
                        <Cell
                          key={`bar-${index}`}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Bar>

                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>
                No inventory chart
                data available
              </p>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-lg-6 col-md-12">
          <div className="dashboard-card">
            <h5
              style={{
                color: '#1d3557',
                fontWeight: '700'
              }}
            >
              Market Value
              Distribution
            </h5>

            {pieChartData.length >
            0 ? (
              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={
                      110
                    }
                    dataKey="value"
                    label
                  >
                    {pieChartData.map(
                      (
                        entry,
                        index
                      ) => (
                        <Cell
                          key={`pie-${index}`}
                          fill={
                            COLORS[
                              index %
                                COLORS.length
                            ]
                          }
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p>
                No market value
                chart data
                available
              </p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;