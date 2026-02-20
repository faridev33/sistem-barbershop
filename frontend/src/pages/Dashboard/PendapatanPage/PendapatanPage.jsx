import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RevenueFilter from '../../../components/dashboard/Pendapatan/RevenueFilter';
import RevenueCard from '../../../components/dashboard/Pendapatan/RevenueCard';
import RevenueTable from '../../../components/dashboard/Pendapatan/RevenueTable';
import '../../../styles/dashboard/dashboard.css';

const PendapatanPage = () => {
    const [filter, setFilter] = useState('harian');
    const [transaksi, setTransaksi] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRevenue = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/queues/revenue?period=${filter}`);
            setTransaksi(response.data);
        } catch (error) {
            console.error("Gagal mengambil data pendapatan:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenue();
    }, [filter]);

    // Kalkulasi Total
    const totalPendapatan = transaksi.reduce((acc, curr) => acc + Number(curr.harga), 0);

    return (
        <div className="page-container">
            {/* Bagian Header & Dropdown */}
            <RevenueFilter filter={filter} setFilter={setFilter} />

            {/* Bagian Kartu Hijau */}
            <RevenueCard 
                total={totalPendapatan} 
                count={transaksi.length} 
                period={filter} 
            />

            {/* Bagian Tabel Rincian */}
            <RevenueTable data={transaksi} loading={loading} />
        </div>
    );
};

export default PendapatanPage;