import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaUserShield } from 'react-icons/fa'; // Tambahkan ikon
import '../styles/login/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pesan, setPesan] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username: username,
                password: password
            });
            
            if (response.data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/dashboard');
            }
        } catch (error) {
            setPesan(error.response?.data?.message || "Username atau Password salah");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <div style={{ color: 'var(--color-main)', fontSize: '50px', marginBottom: '10px' }}>
                    <FaUserShield />
                </div>
                <h2>ADMIN LOGIN</h2>
                <p>Gunakan akun terdaftar untuk masuk ke sistem</p>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Username</label>
                        <input 
                            className="login-input" 
                            type="text" 
                            placeholder="Masukkan username" 
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

                    <button className="login-btn" type="submit">
                        <FaLock style={{marginRight: '10px'}} /> MASUK SEKARANG
                    </button>
                </form>

                {pesan && (
                    <div style={{ 
                        marginTop: '20px', 
                        padding: '10px', 
                        backgroundColor: '#ffebee', 
                        color: '#c62828', 
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '500'
                    }}>
                        {pesan}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;