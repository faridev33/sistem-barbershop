import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashHeader from '../../components/dashboard/DashHeader';
import DashCards from '../../components/dashboard/DashCards';
import '../styles/dashboard/dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    // Mengecek apakah admin sudah login. Jika belum, tendang balik ke halaman login!
    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn'); // Hapus memori login
        navigate('/'); // Kembalikan ke halaman login
    };

    const dataHariIni = { totalAntrian: 12, antrianSelesai: 8, pendapatan: 350000 };

    return (
        <div className="dash-container">
            {/* Memanggil Komponen yang sudah dipisah */}
            <DashHeader onLogout={handleLogout} />
            <DashCards data={dataHariIni} />

            {/* Bagian Tabel (Bisa dipisah juga ke komponen nanti) */}
            <div className="table-wrapper">
                <h3 style={{ marginTop: 0, color: '#333' }}>Daftar Antrian Aktif</h3>
                <table className="dash-table">
                    <thead>
                        <tr style={{ backgroundColor: '#f2f2f2' }}>
                            <th>No</th>
                            <th>Nama Pelanggan</th>
                            <th>Layanan</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Budi</td>
                            <td>Cukur + Cuci</td>
                            <td><span style={{ backgroundColor: '#f39c12', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>Diproses</span></td>
                            <td><button style={{ backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px' }}>Selesai</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;