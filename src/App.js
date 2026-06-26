import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import PageWrapper from './components/PageWrapper';

import Dashboard from './pages/Dashboard';
import InventoryPage from './pages/InventoryPage';
import MarketPage from './pages/MarketPage';
import WeatherPage from './pages/WeatherPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

import './index.css';

function App() {
  return (
    <Router>
      <PageWrapper>
        <div className="app-container">

          {/* Top Navbar */}
          <Navbar />

          {/* Main Layout */}
          <div className="main-layout">

            {/* Sidebar */}
            <Sidebar />

            {/* Content Area */}
            <div className="content-area">

              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/inventory" element={<InventoryPage />} />
                <Route path="/market" element={<MarketPage />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>

            </div>
          </div>

          {/* Global Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />

        </div>
      </PageWrapper>
    </Router>
  );
}

export default App;