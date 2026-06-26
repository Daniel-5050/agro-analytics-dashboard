import axios from 'axios';

const MARKET_BASE_URL =
  'http://localhost:5000/api/market-prices';

/* =========================
   FETCH MARKET PRICES
========================= */
export const fetchMarketPrices = async () => {
  try {
    const response = await axios.get(
      MARKET_BASE_URL
    );

    return response.data;
  } catch (error) {
    console.error(
      'Market API Error:',
      error.response?.data || error.message
    );

    return [];
  }
};