import React from 'react';
import { FaSave } from 'react-icons/fa';

const ServiceForm = ({ formData, setFormData, onSubmit, onCancel }) => {
    return (
        <div className="form-card-container">
            <div className="form-card">
                <div className="form-title">
                    <h3>Informasi Layanan</h3>
                    <p>Masukkan detail layanan yang ingin ditambahkan ke sistem.</p>
                </div>

                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label>Nama Layanan</label>
                        <input 
                            type="text" 
                            className="form-input"
                            placeholder="Contoh: Cukur Rambut Dewasa"
                            value={formData.nama}
                            onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Harga (Rp)</label>
                        <div className="input-with-icon">
                            <span>Rp</span>
                            <input 
                                type="number" 
                                className="form-input"
                                placeholder="0"
                                value={formData.harga}
                                onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                                required 
                            />
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onCancel} className="btn-cancel">
                            Batal
                        </button>
                        <button type="submit" className="btn-save">
                            <FaSave /> Simpan Layanan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ServiceForm;