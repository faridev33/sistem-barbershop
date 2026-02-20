import React from 'react';

const RevenueFilter = ({ filter, setFilter }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>Laporan Pendapatan</h2>
            <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                style={{
                    padding: '10px', 
                    borderRadius: '5px', 
                    border: '1px solid #088395', 
                    outline: 'none', 
                    cursor: 'pointer',
                    backgroundColor: 'white'
                }}
            >
                <option value="harian">Hari Ini</option>
                <option value="mingguan">Minggu Ini</option>
                <option value="bulanan">Bulan Ini</option>
            </select>
        </div>
    );
};

export default RevenueFilter;