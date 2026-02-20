import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSave } from 'react-icons/fa'; // Pastikan install react-icons
import '../../../styles/dashboard/dashboard.css';

const TambahLayanan = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ nama: '', harga: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulasi Simpan Data
        console.log("Data Disimpan:", formData);
        alert("Layanan berhasil ditambahkan!");
        navigate('/dashboard/layanan');
    };

    return (
        <div className="page-container">
            {/* Header dengan Tombol Kembali */}
            <div className="form-header">
                <button onClick={() => navigate('/dashboard/layanan')} className="btn-back">
                    <FaArrowLeft /> Kembali
                </button>
                <h2>Tambah Layanan Baru</h2>
            </div>

            {/* Kartu Formulir di Tengah */}
            <div className="form-card-container">
                <div className="form-card">
                    <div className="form-title">
                        <h3>Informasi Layanan</h3>
                        <p>Masukkan detail layanan yang ingin ditambahkan ke sistem.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* Input Nama */}
                        <div className="form-group">
                            <label htmlFor="nama">Nama Layanan</label>
                            <input 
                                type="text" 
                                id="nama"
                                placeholder="Contoh: Cukur Rambut Dewasa" 
                                className="form-input"
                                value={formData.nama}
                                onChange={(e) => setFormData({...formData, nama: e.target.value})}
                                required 
                            />
                        </div>

                        {/* Input Harga */}
                        <div className="form-group">
                            <label htmlFor="harga">Harga (Rp)</label>
                            <div className="input-with-icon">
                                <span>Rp</span>
                                <input 
                                    type="number" 
                                    id="harga"
                                    placeholder="0" 
                                    className="form-input"
                                    value={formData.harga}
                                    onChange={(e) => setFormData({...formData, harga: e.target.value})}
                                    required 
                                />
                            </div>
                        </div>

                        {/* Tombol Aksi */}
                        <div className="form-actions">
                            <button type="button" onClick={() => navigate('/dashboard/layanan')} className="btn-cancel">
                                Batal
                            </button>
                            <button type="submit" className="btn-save">
                                <FaSave /> Simpan Layanan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TambahLayanan;