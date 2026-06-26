import React from 'react';
import {
  Bar,
  Pie,
  Line
} from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import '../styles/charts.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartsSection = ({ inventory, marketPrices }) => {
  // Inventory Quantity Chart
  const inventoryBarData = {
    labels: inventory.map(item => item.cropName),
    datasets: [
      {
        label: 'Inventory Quantity',
        data: inventory.map(item => item.quantity),
        backgroundColor: [
          '#2d6a4f',
          '#40916c',
          '#52b788',
          '#74c69d'
        ]
      }
    ]
  };

  // Market Price Pie Chart
  const marketPieData = {
    labels: marketPrices.map(item => item.crop),
    datasets: [
      {
        data: marketPrices.map(item => item.price),
        backgroundColor: [
          '#f4a261',
          '#e76f51',
          '#ffb703',
          '#fb8500'
        ]
      }
    ]
  };

  // Estimated Market Value Line Chart
  const valueLineData = {
    labels: inventory.map(item => item.cropName),
    datasets: [
      {
        label: 'Estimated Value',
        data: inventory.map(item => item.estimatedValue),
        borderColor: '#1877f2',
        backgroundColor: 'rgba(24,119,242,0.2)',
        tension: 0.4
      }
    ]
  };

  return (
    <div className="charts-section container-fluid mt-5">

      <h3 className="charts-title mb-4">
        Farm Analytics Dashboard
      </h3>

      <div className="row g-4">

        {/* Bar Chart */}
        <div className="col-lg-6">
          <div className="chart-card">
            <h5>Inventory Quantity by Crop</h5>
            <Bar data={inventoryBarData} />
          </div>
        </div>

        {/* Pie Chart */}
        <div className="col-lg-6">
          <div className="chart-card">
            <h5>Market Price Distribution</h5>
            <Pie data={marketPieData} />
          </div>
        </div>

        {/* Line Chart */}
        <div className="col-12">
          <div className="chart-card">
            <h5>Estimated Market Value Trends</h5>
            <Line data={valueLineData} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChartsSection;