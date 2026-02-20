import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../styles/dashboard/dashboard.css';

const PendapatanPage = () => {
    const [filter, setFilter] = useState('harian'); // harian, mingguan, bulanan
    const [transaksi, setTransaksi] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fungsi mengambil data dari backend
    const fetchRevenue = async () => {
        setLoading(true);
        try {
            // Mengirim filter ke backend melalui query params
            const response = await axios.get(`http://localhost:5000/api/queues/revenue?period=${filter}`);
            setTransaksi(response.data);
        } catch (error) {
            console.error("Gagal mengambil data pendapatan:", error);
        } finally {
            setLoading(false);
        }
    };

    // Jalankan fungsi setiap kali nilai 'filter' berubah
    useEffect(() => {
        fetchRevenue();
    }, [filter]);

    // Hitung Total Uang secara otomatis dari data yang diterima
    // Tambahkan Number() agar teks berubah menjadi angka sebelum dijumlahkan
const totalPendapatan = transaksi.reduce((acc, curr) => acc + Number(curr.harga), 0);

    return (
        <div className="page-container">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
                <h2>Laporan Pendapatan</h2>
                
                {/* Dropdown Filter */}
                <div>
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        style={{padding: '10px', borderRadius: '5px', border: '1px solid #088395', outline: 'none', cursor: 'pointer'}}
                    >
                        <option value="harian">Hari Ini</option>
                        <option value="mingguan">Minggu Ini</option>
                        <option value="bulanan">Bulan Ini</option>
                    </select>
                </div>
            </div>

            {/* Kotak Ringkasan */}
            <div className="card" style={{marginBottom: '20px', borderLeft: '5px solid #27ae60'}}>
                <h3>Total Pendapatan ({filter.charAt(0).toUpperCase() + filter.slice(1)})</h3>
                <p className="angka-besar" style={{color: '#27ae60'}}>
                    Rp {totalPendapatan.toLocaleString('id-ID')}
                </p>
                <p className="info-kecil">{transaksi.length} Transaksi Selesai</p>
            </div>

            {/* Tabel Rincian */}
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
                            <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>Memuat data...</td></tr>
                        ) : transaksi.length === 0 ? (
                            <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>Belum ada transaksi selesai untuk periode ini.</td></tr>
                        ) : (
                            transaksi.map((item) => (
                                <tr key={item.id}>
                                    <td>{new Date(item.created_at).toLocaleDateString('id-ID')}</td>
                                    <td>{item.nama_pelanggan}</td>
                                    <td>{item.nama_layanan}</td>
                                    <td>Rp {item.harga.toLocaleString('id-ID')}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PendapatanPage;