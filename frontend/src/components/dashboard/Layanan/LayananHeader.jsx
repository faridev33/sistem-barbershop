import React from 'react';

const LayananHeader = ({ title, onAddClick }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2>{title}</h2>
            <button className="btn-aksi" onClick={onAddClick}>
                + Tambah Layanan
            </button>
        </div>
    );
};

export default LayananHeader;