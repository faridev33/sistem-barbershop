import React from 'react';

const DashHeader = ({ onLogout }) => {
  return (
    <div className="dash-header">
      <h2>Barbershop Admin</h2>
      <div>
        <span>Halo, <strong>Fari</strong></span>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>
    </div>
  );
};

export default DashHeader;