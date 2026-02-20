import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft, FaCheckDouble } from 'react-icons/fa';

const PaymentPage = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) return <p>Data tidak valid.</p>;

    const handleConfirmPayment = async () => {
        try {
            // Setelah bayar (simulasi), baru simpan ke database
            const res = await axios.post('http://localhost:5000/api/booking/create', {
                nama: state.nama,
                no_hp: state.noHp,
                service_ids: state.selectedServices
            });
            
            navigate('/booking/success', { state: { 
                nama: state.nama, 
                nomor_antrian: res.data.nomor_antrian 
            }});
        } catch (err) {
            alert("Terjadi kesalahan saat konfirmasi.");
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f4f4f9', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
                <button onClick={() => navigate(-1)} style={{border:'none', background:'none', cursor:'pointer', marginBottom:'10px'}}>
                    <FaArrowLeft /> Kembali
                </button>
                
                <div className="card" style={{ padding: '30px', textAlign: 'center' }}>
                    <h3>Pembayaran QRIS</h3>
                    <p style={{ color: '#777', fontSize: '14px' }}>Silakan scan kode di bawah ini</p>
                    
                    <h2 style={{ margin: '20px 0', color: '#27ae60' }}>Rp {state.totalBayar.toLocaleString()}</h2>
                    
                    {/* Gambar QRIS (Bisa ganti dengan link gambar QRIS asli Anda) */}
                    <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ddd', borderRadius: '10px' }}>
                        <img 
                            src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                            alt="QRIS" 
                            style={{ width: '100%' }} 
                        />
                    </div>

                    <div style={{ marginTop: '20px', textAlign: 'left', fontSize: '13px', color: '#555' }}>
                        <p>1. Buka Aplikasi Bank atau E-Wallet (Gopay/OVO/Dana).</p>
                        <p>2. Scan QR Code di atas.</p>
                        <p>3. Masukkan nominal sesuai total di atas.</p>
                        <p>4. Jika sudah bayar, klik tombol di bawah.</p>
                    </div>

                    <button 
                        onClick={handleConfirmPayment} 
                        className="login-btn" 
                        style={{ marginTop: '30px', backgroundColor: '#27ae60' }}
                    >
                        SAYA SUDAH BAYAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;