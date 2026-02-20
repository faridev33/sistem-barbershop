import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

// PERBAIKAN PENTING:
// "../.." artinya keluar dari folder Dashboard, lalu keluar dari folder Layouts (masuk ke src)
// lalu masuk ke "pages/Dashboard/Sidebar"
import Sidebar from '../../pages/Dashboard/Sidebar'; 

// Import CSS (Mundur ke src -> styles -> dashboard)
import '../../styles/dashboard/dashboard.css';

const DashboardLayout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="layout-container">
            {/* Panggil Sidebar */}
            <Sidebar />
            
            {/* Area Konten */}
            <div className="content-area">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;