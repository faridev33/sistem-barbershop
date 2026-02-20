import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../../../styles/dashboard/dashboard.css';

const LayananPage = () => {
    const navigate = useNavigate(); // Inisialisasi navigasi

    // Data Dummy
    const [layanan, setLayanan] = useState([
        { id: 1, nama: 'Cukur Dewasa', harga: 30000 },
        { id: 2, nama: 'Cukur Anak', harga: 20000 },
        { id: 3, nama: 'Shaving / Kerok', harga: 15000 },
    ]);

    const handleHapus = (id) => {
        if(confirm('Hapus layanan ini?')) {
            setLayanan(layanan.filter(item => item.id !== id));
        }
    };

    return (
        <div className="page-container">
            <div style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
                <h2>Daftar Harga & Layanan</h2>
                
                {/* Tombol ini sekarang PINDAH HALAMAN */}
                <button 
                    className="btn-aksi" 
                    onClick={() => navigate('/dashboard/layanan/tambah')}
                >
                    + Tambah Layanan
                </button>
            </div>
            
            <div className="table-wrapper">
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Nama Layanan</th>
                            <th>Harga</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {layanan.map(item => (
                            <tr key={item.id}>
                                <td>{item.nama}</td>
                                <td>Rp {item.harga.toLocaleString('id-ID')}</td>
                                <td>
                                    <button className="btn-aksi" style={{marginRight: '10px', backgroundColor: '#f39c12'}}>Edit</button>
                                    <button onClick={() => handleHapus(item.id)} className="btn-hapus">Hapus</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LayananPage;