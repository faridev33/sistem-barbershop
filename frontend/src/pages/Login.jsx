import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUserShield, FaUser, FaBolt, FaArrowRight } from 'react-icons/fa';
import '../styles/login/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pesan, setPesan] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 1. AKSES CEPAT ROLE ADMIN (Tanpa Input Password)
    const handleAksesCepatAdmin = () => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', 'admin');
        navigate('/dashboard');
    };

    // 2. AKSES CEPAT ROLE CUSTOMER (Tanpa Input Password)
    const handleAksesCepatCustomer = () => {
        localStorage.setItem('userRole', 'customer');
        navigate('/booking');
    };

    // 3. LOGIN MANUAL (Jika ingin menggunakan username & password)
    const handleLoginManual = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPesan('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username: username,
                password: password
            });
            
            if (response.data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userRole', 'admin');
                navigate('/dashboard');
            }
        } catch (error) {
            setPesan(
                error.response?.data?.message || 
                "Gagal terhubung ke database. Silakan klik tombol 'Akses Cepat Admin' di atas tanpa password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div style={{ color: 'var(--color-main)', fontSize: '46px', marginBottom: '8px' }}>
                    <FaUserShield />
                </div>
                <h2>SISTEM BARBERSHOP</h2>
                <p className="subtitle">Pilih role untuk akses cepat atau masuk dengan akun admin</p>

                {/* ========================================================
                    BAGIAN 1: DUA TOMBOL AKSES CEPAT (ADMIN & CUSTOMER)
                    ======================================================== */}
                <div className="quick-access-wrapper">
                    <div className="quick-access-label">
                        <FaBolt /> Akses Cepat (Tanpa Password)
                    </div>

                    <div className="role-buttons-grid">
                        {/* Tombol Role 1: ADMIN */}
                        <button 
                            type="button" 
                            className="quick-role-btn admin" 
                            onClick={handleAksesCepatAdmin}
                            title="Klik untuk langsung masuk ke Dashboard Admin"
                        >
                            <div className="quick-role-icon admin-icon">
                                <FaUserShield />
                            </div>
                            <div className="quick-role-info">
                                <span className="quick-role-title">Role: Admin</span>
                                <span className="quick-role-desc">Kelola antrian, QR code & pendapatan</span>
                            </div>
                            <span className="quick-role-badge admin-badge">Masuk <FaArrowRight style={{marginLeft: '4px', verticalAlign: '-1px'}} /></span>
                        </button>

                        {/* Tombol Role 2: CUSTOMER */}
                        <button 
                            type="button" 
                            className="quick-role-btn customer" 
                            onClick={handleAksesCepatCustomer}
                            title="Klik untuk langsung masuk ke Halaman Booking Customer"
                        >
                            <div className="quick-role-icon customer-icon">
                                <FaUser />
                            </div>
                            <div className="quick-role-info">
                                <span className="quick-role-title">Role: Customer</span>
                                <span className="quick-role-desc">Booking layanan & ambil nomor antrian</span>
                            </div>
                            <span className="quick-role-badge customer-badge">Pesan <FaArrowRight style={{marginLeft: '4px', verticalAlign: '-1px'}} /></span>
                        </button>
                    </div>
                </div>

                {/* PEMISAH / DIVIDER */}
                <div className="login-divider">
                    <span>atau login manual admin</span>
                </div>

                {/* ========================================================
                    BAGIAN 2: FORM LOGIN MANUAL
                    ======================================================== */}
                <form className="login-form" onSubmit={handleLoginManual}>
                    <div className="input-group">
                        <label>Username Admin</label>
                        <input 
                            className="login-input" 
                            type="text" 
                            placeholder="Masukkan username (cth: admin)" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input 
                            className="login-input" 
                            type="password" 
                            placeholder="Masukkan password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>

                    <button className="login-btn" type="submit" disabled={loading}>
                        <FaLock /> {loading ? 'MEMPROSES...' : 'MASUK DENGAN PASSWORD'}
                    </button>
                </form>

                {pesan && (
                    <div className="login-error-alert">
                        ⚠️ {pesan}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
