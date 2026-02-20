import React from 'react';

const RevenueCard = ({ total, count, period }) => {
    // Membuat huruf pertama kapital (harian -> Harian)
    const labelPeriod = period.charAt(0).toUpperCase() + period.slice(1);

    return (
        <div className="card" style={{ marginBottom: '20px', borderLeft: '5px solid #27ae60' }}>
            <h3>Total Pendapatan ({labelPeriod})</h3>
            <p className="angka-besar" style={{ color: '#27ae60' }}>
                Rp {total.toLocaleString('id-ID')}
            </p>
            <p className="info-kecil">{count} Transaksi Selesai</p>
        </div>
    );
};

export default RevenueCard;