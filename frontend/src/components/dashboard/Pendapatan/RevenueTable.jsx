import React from 'react';

const RevenueTable = ({ data, loading }) => {
    return (
        <div className="table-wrapper">
            <h3>Rincian Transaksi</h3>
            <table className="dash-table">
                <thead>
                    <tr>
                        <th>Tanggal</th>
                        <th>Nama Pelanggan</th>
                        <th>Layanan</th>
                        <th>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Memuat data...</td></tr>
                    ) : data.length === 0 ? (
                        <tr><td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>Belum ada transaksi selesai.</td></tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                                <td>{item.nama_pelanggan}</td>
                                <td>{item.nama_layanan}</td>
                                <td>Rp {Number(item.harga).toLocaleString('id-ID')}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RevenueTable;