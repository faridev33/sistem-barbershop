import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/login/login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [pesan, setPesan] = useState('');
    const navigate = useNavigate(); // Alat untuk pindah halaman

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                username: username,
                password: password
            });
            
            // Jika sukses, simpan status login di browser lalu pindah ke dashboard
            if (response.data.success) {
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/dashboard'); // PINDAH HALAMAN
            }
        } catch (error) {
            setPesan(error.response?.data?.message || "Terjadi kesalahan");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 style={{ textAlign: 'center' }}>Admin Barbershop</h2>
                <form className="login-form" onSubmit={handleLogin}>
                    <input className="login-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className="login-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <button className="login-btn" type="submit">LOGIN</button>
                </form>
                {pesan && <p style={{ textAlign: 'center', color: 'red', marginTop: '10px' }}>{pesan}</p>}
            </div>
        </div>
    );
};

export default Login;