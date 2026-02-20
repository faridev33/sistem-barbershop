import React from 'react';

const DashCards = ({ data }) => {
  return (
    <div className="dash-cards-grid">
      <div className="card">
        <h3 style={{ margin: 0, color: '#555' }}>Antrian Hari Ini</h3>
        <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0', color: '#3498db' }}>
          {data.totalAntrian} <span style={{ fontSize: '16px', color: '#999', fontWeight: 'normal' }}>Orang</span>
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#2ecc71' }}>Selesai: {data.antrianSelesai}</p>
      </div>

      <div className="card">
        <h3 style={{ margin: 0, color: '#555' }}>Pendapatan Hari Ini</h3>
        <p style={{ fontSize: '36px', fontWeight: 'bold', margin: '10px 0', color: '#27ae60' }}>
          Rp {data.pendapatan.toLocaleString('id-ID')}
        </p>
        <p style={{ margin: 0, fontSize: '14px', color: '#7f8c8d' }}>Terus tingkatkan pelayanan!</p>
      </div>
    </div>
  );
};

export default DashCards;