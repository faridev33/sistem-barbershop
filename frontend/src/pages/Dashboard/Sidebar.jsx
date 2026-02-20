import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaQrcode, FaMoneyBillWave, FaCut, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h2>BarberAdmin</h2>
            </div>
            <ul className="sidebar-menu">
                <li>
                    {/* Link ke /dashboard */}
                    <NavLink to="/dashboard" end className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaHome /> <span>Antrian</span>
                    </NavLink>
                </li>
                <li>
                    {/* Link ke /dashboard/qrcode */}
                    <NavLink to="/dashboard/qrcode" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaQrcode /> <span>Buat QR Code</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/pendapatan" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaMoneyBillWave /> <span>Pendapatan</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/layanan" className={({ isActive }) => (isActive ? "active-link" : "")}>
                        <FaCut /> <span>Daftar Layanan</span>
                    </NavLink>
                </li>
            </ul>
            <button onClick={handleLogout} className="sidebar-logout">
                <FaSignOutAlt /> <span>Logout</span>
            </button>
        </div>
    );
};

export default Sidebar;