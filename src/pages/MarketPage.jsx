import React, { useEffect, useState } from 'react';
import { fetchMarketPrices } from '../services/marketApi';


const MarketPage = () => {
  const [marketPrices, setMarketPrices] = useState([]);

  useEffect(() => {
    const loadMarketData = async () => {
      const data = await fetchMarketPrices();
      setMarketPrices(data);
    };

    loadMarketData();
  }, []);

  return (
    <div className="container-fluid py-4">
      <h2>Market Analytics</h2>
      <p>Live crop pricing updates for better selling decisions.</p>

      <div className="row g-4 mt-3">
        {marketPrices.map((crop, index) => (
          <div className="col-md-4" key={index}>
            <div className="dashboard-card market-card">
              <h5>{crop.crop}</h5>
              <p>₦{crop.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPage;