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
            console.error("Gagal mengambil data:", error);
        }
    };

    useEffect(() => {
        fetchAntrian();
    }, []);

    const updateStatus = async (id, statusSaatIni) => {
        let statusBaru = statusSaatIni === 'Menunggu' ? 'Diproses' : 'Selesai';
        try {
            await axios.put(`http://localhost:5000/api/queues/${id}`, { status: statusBaru });
            fetchAntrian();
        } catch (error) {
            alert("Gagal update status");
        }
    };

    const hapusAntrian = async (id) => {
        if (window.confirm("Yakin ingin menghapus antrian ini?")) {
            try {
                await axios.delete(`http://localhost:5000/api/queues/${id}`);
                fetchAntrian();
            } catch (error) {
                alert("Gagal menghapus");
            }
        }
    };

    return (
        <div className="page-container">
            <h2>Daftar Antrian Hari Ini</h2>
            <div className="table-wrapper">
                <AntrianTable 
                    data={antrian} 
                    onUpdateStatus={updateStatus} 
                    onDelete={hapusAntrian} 
                />
            </div>
        </div>
    );
};

export default AntrianPage;