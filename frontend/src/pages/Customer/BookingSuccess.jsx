import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const BookingSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state; // Data yang dikirim dari halaman sebelumnya

    if (!data) return <p>Data tidak ditemukan. Silakan booking ulang.</p>;

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#09637E', padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '15px', width: '100%', maxWidth: '350px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                
                <FaCheckCircle size={60} color="#27ae60" style={{ marginBottom: '20px' }} />
                
                <h2 style={{ color: '#333', marginBottom: '5px' }}>Booking Berhasil!</h2>
                <p style={{ color: '#777' }}>Halo, <strong>{data.nama}</strong></p>
                
                <div style={{ margin: '30px 0', padding: '20px', backgroundColor: '#f4f4f9', borderRadius: '10px', border: '2px dashed #ccc' }}>
                    <p style={{ fontSize: '14px', color: '#555', marginBottom: '5px' }}>Nomor Antrian Anda</p>
                    <h1 style={{ fontSize: '60px', color: '#09637E', margin: 0 }}>{data.nomor_antrian}</h1>
                </div>

                <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>
                    Silakan datang ke lokasi dan tunjukkan layar ini kepada kasir.
                </p>

                <button onClick={() => navigate('/booking')} style={{ padding: '10px 20px', border: 'none', backgroundColor: '#eee', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Kembali ke Halaman Awal
                </button>
            </div>
        </div>
    );
};

export default BookingSuccess;