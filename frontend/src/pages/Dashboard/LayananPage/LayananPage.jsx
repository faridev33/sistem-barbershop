import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LayananHeader from '../../../components/dashboard/Layanan/LayananHeader';
import LayananTable from '../../../components/dashboard/Layanan/LayananTable';
import '../../../styles/dashboard/dashboard.css';

const LayananPage = () => {
    const navigate = useNavigate();
    const [layanan, setLayanan] = useState([
        { id: 1, nama: 'Cukur Dewasa', harga: 30000 },
        { id: 2, nama: 'Cukur Anak', harga: 20000 },
        { id: 3, nama: 'Shaving / Kerok', harga: 15000 },
    ]);

    const handleHapus = (id) => {
        if (window.confirm('Hapus layanan ini?')) {
            setLayanan(layanan.filter(item => item.id !== id));
        }
    };

    return (
        <div className="page-container">
            <LayananHeader 
                title="Daftar Harga & Layanan" 
                onAddClick={() => navigate('/dashboard/layanan/tambah')} 
            />
            <LayananTable 
                data={layanan} 
                onDelete={handleHapus} 
            />
        </div>
    );
};

export default LayananPage;