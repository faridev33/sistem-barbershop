import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RevenueFilter from '../../../components/dashboard/Pendapatan/RevenueFilter';
import SessionCards from '../../../components/dashboard/Pendapatan/SessionCards';
import BarberRevenueTable from '../../../components/dashboard/Pendapatan/BarberRevenueTable';
import RevenueTable from '../../../components/dashboard/Pendapatan/RevenueTable';
import { FaChartPie, FaListAlt } from 'react-icons/fa';
import '../../../styles/dashboard/dashboard.css';

const PendapatanPage = () => {
    const [filter, setFilter] = useState('harian');
    const [sesiFilter, setSesiFilter] = useState('semua');
    const [komisiPersen, setKomisiPersen] = useState(50); // Default 50% komisi tukang potong
    const [transaksi, setTransaksi] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('sesi'); // 'sesi' atau 'transaksi'

    const fetchRevenue = async () => {
        setLoading(true);
        try {
            let url = `http://localhost:5000/api/queues/revenue?period=${filter}`;
            if (sesiFilter && sesiFilter !== 'semua') {
                url += `&session=${encodeURIComponent(sesiFilter)}`;
            }
            const response = await axios.get(url);
            setTransaksi(response.data);
        } catch (error) {
            console.error("Gagal mengambil data pendapatan:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRevenue();
    }, [filter, sesiFilter]);

    return (
        <div className="page-container" style={{ padding: '24px' }}>
            {/* 1. HEADER & FILTER KONTROL */}
            <RevenueFilter 
                filter={filter} 
                setFilter={setFilter} 
                sesiFilter={sesiFilter}
                setSesiFilter={setSesiFilter}
                komisiPersen={komisiPersen}
                setKomisiPersen={setKomisiPersen}
            />

            {/* 2. TAB NAVIGASI CEPAT */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <button
                    type="button"
                    onClick={() => setActiveTab('sesi')}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '13.5px',
                        backgroundColor: activeTab === 'sesi' ? '#0047AB' : '#e2e8f0',
                        color: activeTab === 'sesi' ? 'white' : '#475569',
                        transition: '0.2s'
                    }}
                >
                    <FaChartPie /> Rekap Sesi & Tukang Potong
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab('transaksi')}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 18px',
                        borderRadius: '8px',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '13.5px',
                        backgroundColor: activeTab === 'transaksi' ? '#0047AB' : '#e2e8f0',
                        color: activeTab === 'transaksi' ? 'white' : '#475569',
                        transition: '0.2s'
                    }}
                >
                    <FaListAlt /> Rincian Semua Transaksi ({transaksi.length})
                </button>
            </div>

            {/* 3. KONTEN TAB */}
            {activeTab === 'sesi' ? (
                <>
                    {/* Ringkasan Sesi (Pagi, Sore, Malam & Total) */}
                    <SessionCards 
                        transaksi={transaksi} 
                        komisiPersen={komisiPersen} 
                    />

                    {/* Tabel Pendapatan per Tukang Potong */}
                    <BarberRevenueTable 
                        data={transaksi} 
                        komisiPersen={komisiPersen} 
                    />
                </>
            ) : (
                /* Tabel Rincian Semua Transaksi */
                <RevenueTable 
                    data={transaksi} 
                    loading={loading} 
                    komisiPersen={komisiPersen}
                />
            )}
        </div>
    );
};

export default PendapatanPage;
