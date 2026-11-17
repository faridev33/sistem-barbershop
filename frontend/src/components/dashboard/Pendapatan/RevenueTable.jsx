import React from 'react';

const RevenueTable = ({ data, loading, komisiPersen = 50 }) => {
    return (
        <div className="table-wrapper" style={{ marginTop: '24px' }}>
            <div style={{ marginBottom: '14px' }}>
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '17px', fontWeight: '700' }}>
                    Rincian Transaksi Selesai
                </h3>
                <span style={{ fontSize: '12.5px', color: '#64748b' }}>
                    Log riwayat setiap pelanggan yang dicukur per sesi dan tukang potong
                </span>
            </div>

            <table className="dash-table">
                <thead>
                    <tr>
                        <th>Waktu & Tanggal</th>
                        <th>Sesi</th>
                        <th>Tukang Potong</th>
                        <th>Nama Pelanggan</th>
                        <th>Layanan</th>
                        <th>Total Bayar</th>
                        <th style={{ color: '#16a34a' }}>Komisi Barber ({komisiPersen}%)</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr><td colSpan="7" style={{ textAlign: 'center', padding: '24px' }}>Memuat data...</td></tr>
                    ) : data.length === 0 ? (
                        <tr><td colSpan="7" style={{ textAlign: 'center', padding: '24px' }}>Belum ada transaksi selesai.</td></tr>
                    ) : (
                        data.map((item) => {
                            const harga = Number(item.harga || 0);
                            const komisi = (harga * komisiPersen) / 100;
                            const dateObj = new Date(item.created_at);
                            const waktuStr = isNaN(dateObj) ? '-' : dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                            const tanggalStr = isNaN(dateObj) ? '-' : dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

                            return (
                                <tr key={item.id}>
                                    <td>
                                        <strong style={{ color: '#1e293b' }}>{waktuStr} WIB</strong>
                                        <span style={{ display: 'block', fontSize: '11px', color: '#64748b' }}>{tanggalStr}</span>
                                    </td>
                                    <td>
                                        <span style={{
                                            backgroundColor: '#f1f5f9',
                                            color: '#334155',
                                            padding: '3px 8px',
                                            borderRadius: '6px',
                                            fontSize: '11.5px',
                                            fontWeight: '600'
                                        }}>
                                            {item.sesi || 'Sesi 1 (Pagi)'}
                                        </span>
                                    </td>
                                    <td>
                                        <strong style={{ color: '#0047AB' }}>{item.barber_name || 'Budi Pratama'}</strong>
                                    </td>
                                    <td>{item.nama_pelanggan}</td>
                                    <td style={{ fontSize: '13px', color: '#475569' }}>{item.nama_layanan}</td>
                                    <td>
                                        <strong>Rp {harga.toLocaleString('id-ID')}</strong>
                                    </td>
                                    <td>
                                        <span style={{ color: '#16a34a', fontWeight: '700' }}>
                                            Rp {komisi.toLocaleString('id-ID')}
                                        </span>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RevenueTable;
