import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AntrianTable from '../../../components/dashboard/Antrian/AntrianTable';
import '../../../styles/dashboard/dashboard.css';

const AntrianPage = () => {
    const [antrian, setAntrian] = useState([]);

    const fetchAntrian = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/queues/today');
            setAntrian(response.data);
        } catch (error) {
            console.error("Gagal mengambil data antrian:", error);
        }
    };

    useEffect(() => {
        fetchAntrian();
    }, []);

    const updateStatus = async (id, statusSaatIni, barberName, sesi) => {
        let statusBaru = statusSaatIni === 'Menunggu' ? 'Diproses' : 'Selesai';
        try {
            await axios.put(`http://localhost:5000/api/queues/${id}`, { 
                status: statusBaru,
                barber_name: barberName,
                sesi: sesi
            });
            fetchAntrian();
        } catch (error) {
            alert("Gagal update status antrian");
        }
    };

    const updateBarberAndSesi = async (id, barberName, sesi) => {
        // Optimistic UI update
        setAntrian(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, barber_name: barberName, sesi: sesi };
            }
            return item;
        }));

        try {
            const currentItem = antrian.find(a => a.id === id);
            await axios.put(`http://localhost:5000/api/queues/${id}`, {
                status: currentItem?.status || 'Menunggu',
                barber_name: barberName,
                sesi: sesi
            });
        } catch (error) {
            console.error("Gagal update barber:", error);
        }
    };

    const hapusAntrian = async (id) => {
        if (window.confirm("Yakin ingin menghapus antrian ini?")) {
            try {
                await axios.delete(`http://localhost:5000/api/queues/${id}`);
                fetchAntrian();
            } catch (error) {
                alert("Gagal menghapus antrian");
            }
        }
    };

    return (
        <div className="page-container" style={{ padding: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
                <h2 style={{ margin: 0, color: '#1e293b', fontSize: '24px', fontWeight: '800' }}>
                    Daftar Antrian Hari Ini
                </h2>
                <span style={{ fontSize: '13px', color: '#64748b' }}>
                    Atur antrian, tetapkan Tukang Potong (Barber), dan pilih sesi kerja operasional
                </span>
            </div>

            <div className="table-wrapper">
                <AntrianTable 
                    data={antrian} 
                    onUpdateStatus={updateStatus} 
                    onDelete={hapusAntrian} 
                    onUpdateBarber={updateBarberAndSesi}
                />
            </div>
        </div>
    );
};

export default AntrianPage;
