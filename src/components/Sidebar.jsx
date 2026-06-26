import React from 'react';
import {
  FaChartLine,
  FaCloudSun,
  FaWarehouse,
  FaMoneyBillWave,
  FaFileAlt,
  FaCog
} from 'react-icons/fa';

import { NavLink } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">

        <li>
          <NavLink to="/" className="sidebar-link">
            <FaChartLine />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/weather" className="sidebar-link">
            <FaCloudSun />
            <span>Weather</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/inventory" className="sidebar-link">
            <FaWarehouse />
            <span>Inventory</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/market" className="sidebar-link">
            <FaMoneyBillWave />
            <span>Market Prices</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/reports" className="sidebar-link">
            <FaFileAlt />
            <span>Reports</span>
          </NavLink>
        </li>

        <li>
          <NavLink to="/settings" className="sidebar-link">
            <FaCog />
            <span>Settings</span>
          </NavLink>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;