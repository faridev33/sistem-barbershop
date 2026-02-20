import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/dashboard/dashboard.css';
import { FaCut, FaQrcode, FaUsers, FaClock } from 'react-icons/fa';

const BookingPage = () => {
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [nama, setNama] = useState('');
    const [noHp, setNoHp] = useState('');
    const [selectedServices, setSelectedServices] = useState([]);
    const [stats, setStats] = useState({ sedang_dilayani: '-', total_antrian: 0 });

    // 1. FUNGSI UNTUK AMBIL DATA STATISTIK LIVE DARI BACKEND
    const fetchLiveStatus = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/queues/status-live');
            setStats(res.data);
        } catch (err) {
            console.error("Gagal mengambil status live:", err);
        }
    };

    useEffect(() => {
        // A. Ambil Daftar Layanan (Hanya sekali saat halaman dimuat)
        axios.get('http://localhost:5000/api/booking/services')
            .then(res => setServices(res.data))
            .catch(err => console.error("Gagal mengambil layanan:", err));

        // B. Ambil Status Pertama Kali
        fetchLiveStatus();

        // C. REAL-TIME POLLING: Cek status setiap 5 detik
        const interval = setInterval(() => {
            fetchLiveStatus();
        }, 5000);

        // D. BERSIHKAN TIMER saat user pindah halaman
        return () => clearInterval(interval);
    }, []);

    const handleCheckboxChange = (id) => {
        if (selectedServices.includes(id)) {
            setSelectedServices(selectedServices.filter(item => item !== id));
        } else {
            setSelectedServices([...selectedServices, id]);
        }
    };

    // Hitung Total Bayar Secara Real-time berdasarkan pilihan
    const totalBayar = services
        .filter(s => selectedServices.includes(s.id))
        .reduce((sum, item) => sum + item.harga, 0);

    const handleGoToPayment = (e) => {
        e.preventDefault();
        if (selectedServices.length === 0) return alert("Pilih minimal 1 layanan!");
        
        // Pindah ke halaman pembayaran dengan membawa data
        navigate('/booking/payment', { 
            state: { 
                nama, 
                noHp, 
                selectedServices, 
                totalBayar 
            } 
        });
    };

    return (
        <div className="login-container" style={{ backgroundColor: '#EBF4F6', flexDirection: 'column', padding: '20px' }}>
            
            {/* INFO ANTRIAN LIVE (Sinkron dengan Admin) */}
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', width: '100%', maxWidth: '450px' }}>
                <div className="card" style={{ flex: 1, textAlign: 'center', padding: '15px', borderTop: '4px solid #088395' }}>
                    <p style={{ fontSize: '11px', color: '#777', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        <FaClock /> Sedang Dilayani
                    </p>
                    <h2 style={{ color: '#088395', fontSize: '28px', margin: '5px 0' }}>
                        {stats.sedang_dilayani === '-' ? '-' : `#${stats.sedang_dilayani}`}
                    </h2>
                </div>
                <div className="card" style={{ flex: 1, textAlign: 'center', padding: '15px', borderTop: '4px solid #09637E' }}>
                    <p style={{ fontSize: '11px', color: '#777', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        <FaUsers /> Total Antrian
                    </p>
                    <h2 style={{ color: '#09637E', fontSize: '28px', margin: '5px 0' }}>
                        {stats.total_antrian}
                    </h2>
                </div>
            </div>

            {/* FORM BOOKING */}
            <div className="login-box" style={{ maxWidth: '450px', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <h2 style={{ textAlign: 'center', color: '#09637E', marginBottom: '20px' }}>
                    <FaCut /> Booking Barbershop
                </h2>
                
                <form onSubmit={handleGoToPayment} className="login-form">
                    <div className="form-group">
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>Nama Lengkap</label>
                        <input 
                            type="text" 
                            placeholder="Masukkan nama Anda" 
                            className="login-input" 
                            required 
                            onChange={e => setNama(e.target.value)} 
                        />
                    </div>

                    <div className="form-group">
                        <label style={{ fontSize: '13px', fontWeight: '600', color: '#555' }}>No WhatsApp (Aktif)</label>
                        <input 
                            type="number" 
                            placeholder="Contoh: 08123456789" 
                            className="login-input" 
                            required 
                            onChange={e => setNoHp(e.target.value)} 
                        />
                    </div>
                    
                    <p style={{ fontWeight: 'bold', marginTop: '10px', fontSize: '14px', color: '#333' }}>Pilih Layanan (Bisa lebih dari 1):</p>
                    <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', padding: '5px' }}>
                        {services.map(s => (
                            <label key={s.id} style={{ 
                                display: 'flex', 
                                alignItems: 'center', 
                                gap: '10px', 
                                padding: '12px', 
                                border: '1px solid #ddd', 
                                borderRadius: '10px', 
                                cursor: 'pointer',
                                transition: '0.2s',
                                backgroundColor: selectedServices.includes(s.id) ? '#f0f9fa' : 'white',
                                borderColor: selectedServices.includes(s.id) ? '#088395' : '#ddd'
                            }}>
                                <input 
                                    type="checkbox" 
                                    style={{ width: '18px', height: '18px' }}
                                    checked={selectedServices.includes(s.id)} 
                                    onChange={() => handleCheckboxChange(s.id)} 
                                />
                                <span style={{ fontSize: '14px', flex: 1 }}>{s.nama_layanan}</span>
                                <strong style={{ fontSize: '14px', color: '#088395' }}>Rp {s.harga.toLocaleString()}</strong>
                            </label>
                        ))}
                    </div>

                    {/* Ringkasan Bayar */}
                    <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#F8F9FA', borderRadius: '10px', border: '1px dashed #088395', textAlign: 'center' }}>
                        <p style={{ fontSize: '13px', color: '#666', marginBottom: '5px' }}>Total yang harus dibayar:</p>
                        <h2 style={{ color: '#27ae60', margin: 0 }}>Rp {totalBayar.toLocaleString('id-ID')}</h2>
                    </div>

                    <button type="submit" className="login-btn" style={{ marginTop: '15px', backgroundColor: '#088395', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <FaQrcode /> BAYAR GUNAKAN QRIS
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookingPage;