import React, { useState } from 'react';
import {
  FaBell,
  FaMoon,
  FaSun,
  FaUserCog,
  FaGlobeAfrica,
  FaShieldAlt,
  FaSyncAlt
} from 'react-icons/fa';
import '../styles/settings.css';
import { toast } from 'react-toastify';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] =
    useState(true);
  const [language, setLanguage] =
    useState('English');

  /* =========================
     TOGGLES
  ========================= */
  const handleDarkMode = () => {
    setDarkMode(!darkMode);

    toast.info(
      !darkMode
        ? 'Dark mode enabled'
        : 'Light mode enabled'
    );
  };

  const handleNotifications = () => {
    setNotifications(!notifications);

    toast.success(
      !notifications
        ? 'Notifications enabled'
        : 'Notifications disabled'
    );
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);

    toast.success(
      `Language changed to ${e.target.value}`
    );
  };

  return (
    <div className="settings-page container-fluid py-4">

      {/* Header */}
      <div className="settings-header mb-4">
        <h2>Dashboard Settings</h2>
        <p>
          Customize farm preferences,
          notifications, security,
          and system integrations.
        </p>
      </div>

      <div className="row g-4">

        {/* Appearance */}
        <div className="col-lg-6">
          <div className="settings-card stagger-card">
            <div className="settings-icon">
              {darkMode ? (
                <FaMoon />
              ) : (
                <FaSun />
              )}
            </div>

            <h5>Appearance Mode</h5>
            <p>
              Switch between dark and
              light dashboard themes.
            </p>

            <button
              className="btn btn-success"
              onClick={handleDarkMode}
            >
              {darkMode
                ? 'Disable Dark Mode'
                : 'Enable Dark Mode'}
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-lg-6">
          <div className="settings-card stagger-card delay-1">
            <div className="settings-icon">
              <FaBell />
            </div>

            <h5>Notifications</h5>
            <p>
              Manage crop alerts,
              market signals,
              and weather updates.
            </p>

            <button
              className="btn btn-success"
              onClick={
                handleNotifications
              }
            >
              {notifications
                ? 'Disable Alerts'
                : 'Enable Alerts'}
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="col-lg-4">
          <div className="settings-card stagger-card delay-2">
            <div className="settings-icon">
              <FaGlobeAfrica />
            </div>

            <h5>Language</h5>

            <select
              className="form-select"
              value={language}
              onChange={
                handleLanguageChange
              }
            >
              <option>
                English
              </option>
              <option>
                French
              </option>
              <option>
                Hausa
              </option>
            </select>
          </div>
        </div>

        {/* Security */}
        <div className="col-lg-4">
          <div className="settings-card stagger-card delay-3">
            <div className="settings-icon">
              <FaShieldAlt />
            </div>

            <h5>Security</h5>
            <p>
              Account protection,
              password control,
              and access security.
            </p>

            <button className="btn btn-outline-primary">
              Manage Security
            </button>
          </div>
        </div>

        {/* Sync */}
        <div className="col-lg-4">
          <div className="settings-card stagger-card delay-4">
            <div className="settings-icon">
              <FaSyncAlt />
            </div>

            <h5>Integrations</h5>
            <p>
              Sync weather,
              inventory,
              and market APIs.
            </p>

            <button className="btn btn-outline-success">
              Sync Data
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="col-12">
          <div className="settings-card profile-card stagger-card delay-5">
            <div className="settings-icon">
              <FaUserCog />
            </div>

            <h5>Account Management</h5>
            <p>
              Update personal profile,
              farm admin roles,
              and system access.
            </p>

            <button className="btn btn-primary">
              Edit Profile
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SettingsPage;