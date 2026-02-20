import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ServiceForm from '../../../components/dashboard/Layanan/ServiceForm';
import '../../../styles/dashboard/dashboard.css';

const TambahLayanan = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ nama: '', harga: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Data Disimpan:", formData);
        alert("Layanan berhasil ditambahkan!");
        navigate('/dashboard/layanan');
    };

    return (
        <div className="page-container">
            <div className="form-header">
                <button onClick={() => navigate('/dashboard/layanan')} className="btn-back">
                    <FaArrowLeft /> Kembali
                </button>
                <h2>Tambah Layanan Baru</h2>
            </div>

            <ServiceForm 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleSubmit} 
                onCancel={() => navigate('/dashboard/layanan')}
            />
        </div>
    );
};

export default TambahLayanan;