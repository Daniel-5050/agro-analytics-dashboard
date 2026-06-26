import React from 'react';
import '../styles/preloader.css';


const Preloader = () => {
  return (
    <div className="preloader-container">
      <div className="spinner-wrapper">
        <div className="custom-spinner"></div>
        <h4 className="loading-text">Loading Agro Analytics...</h4>
      </div>
    </div>
  );
};

export default Preloader;