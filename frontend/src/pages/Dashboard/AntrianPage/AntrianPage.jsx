import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../styles/dashboard/dashboard.css'; // Sesuaikan path jika error (pakai ../../../ jika error)

const AntrianPage = () => {
    const [antrian, setAntrian] = useState([]);

    // Fungsi untuk mengambil data dari Database (Backend)
    const fetchAntrian = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/queues/today');
            setAntrian(response.data);
        } catch (error) {
            console.error("Gagal mengambil data antrian:", error);
        }
    };

    // useEffect agar data otomatis diambil saat halaman dibuka
    useEffect(() => {
        fetchAntrian();
    }, []);

    // Fungsi Mengubah Status & Simpan ke Database
    const updateStatus = async (id, statusSaatIni) => {
        let statusBaru = '';
        if (statusSaatIni === 'Menunggu') statusBaru = 'Diproses';
        else if (statusSaatIni === 'Diproses') statusBaru = 'Selesai';

        try {
            // Kirim perintah update ke Backend
            await axios.put(`http://localhost:5000/api/queues/${id}`, { status: statusBaru });
            // Refresh tabel antrian agar datanya terupdate di layar
            fetchAntrian();
        } catch (error) {
            alert("Gagal mengubah status!");
        }
    };

    // Fungsi Hapus dari Database
    const hapusAntrian = async (id) => {
        if(window.confirm("Yakin ingin membatalkan/menghapus antrian ini?")) {
            try {
                // Kirim perintah delete ke Backend
                await axios.delete(`http://localhost:5000/api/queues/${id}`);
                // Refresh tabel antrian
                fetchAntrian();
            } catch (error) {
                alert("Gagal menghapus antrian!");
            }
        }
    };

    return (
        <div className="page-container">
            <h2>Daftar Antrian Hari Ini</h2>
            <div className="table-wrapper">
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Layanan</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {antrian.length === 0 ? (
                            <tr><td colSpan="5" style={{textAlign:'center', padding:'20px'}}>Belum ada antrian hari ini.</td></tr>
                        ) : (
                            antrian.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td> 
                                    {/* Perhatikan: nama_pelanggan dan nama_layanan disesuaikan dgn kolom Database */}
                                    <td>{item.nama_pelanggan}</td>
                                    <td>{item.nama_layanan}</td>
                                    <td>
                                        <span className={
                                            item.status === 'Diproses' ? 'badge-proses' : 
                                            item.status === 'Selesai' ? 'badge-selesai' : 'badge-wait'
                                        }>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td>
                                        {/* Logika Tombol Berubah-ubah */}
                                        {item.status === 'Menunggu' && (
                                            <button onClick={() => updateStatus(item.id, item.status)} className="btn-aksi" style={{backgroundColor: '#f39c12', marginRight: '5px'}}>Proses</button>
                                        )}
                                        {item.status === 'Diproses' && (
                                            <button onClick={() => updateStatus(item.id, item.status)} className="btn-aksi" style={{backgroundColor: '#27ae60', marginRight: '5px'}}>Selesai</button>
                                        )}
                                        
                                        <button onClick={() => hapusAntrian(item.id)} className="btn-hapus">Hapus</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AntrianPage;