import React from 'react';
import { FaCalendarAlt, FaClock, FaPercentage } from 'react-icons/fa';

const RevenueFilter = ({ 
    filter, 
    setFilter, 
    sesiFilter, 
    setSesiFilter, 
    komisiPersen, 
    setKomisiPersen 
}) => {
    return (
        <div style={{ 
            backgroundColor: 'white', 
            padding: '16px 20px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '15px'
        }}>
            <div>
                <h2 style={{ margin: 0, color: '#1e293b', fontSize: '22px', fontWeight: '800' }}>
                    Laporan Pendapatan & Sesi
                </h2>
                <span style={{ fontSize: '13px', color: '#64748b' }}>
                    Monitoring omset harian per shift kerja dan bagi hasil tukang potong
                </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {/* 1. FILTER PERIODE */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaCalendarAlt color="#0047AB" size={14} />
                    <select 
                        value={filter} 
                        onChange={(e) => setFilter(e.target.value)}
                        style={{
                            padding: '8px 12px', 
                            borderRadius: '8px', 
                            border: '1.5px solid #cbd5e1', 
                            outline: 'none', 
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#1e293b'
                        }}
                    >
                        <option value="harian">Hari Ini</option>
                        <option value="mingguan">Minggu Ini</option>
                        <option value="bulanan">Bulan Ini</option>
                    </select>
                </div>

                {/* 2. FILTER SESI KERJA */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaClock color="#0284c7" size={14} />
                    <select 
                        value={sesiFilter} 
                        onChange={(e) => setSesiFilter(e.target.value)}
                        style={{
                            padding: '8px 12px', 
                            borderRadius: '8px', 
                            border: '1.5px solid #cbd5e1', 
                            outline: 'none', 
                            cursor: 'pointer',
                            backgroundColor: 'white',
                            fontSize: '13px',
                            fontWeight: '600',
                            color: '#1e293b'
                        }}
                    >
                        <option value="semua">Semua Sesi</option>
                        <option value="Sesi 1 (Pagi)">Sesi 1: Pagi (09:00 - 14:00)</option>
                        <option value="Sesi 2 (Sore)">Sesi 2: Sore (14:00 - 18:00)</option>
                        <option value="Sesi 3 (Malam)">Sesi 3: Malam (18:00 - 22:00)</option>
                    </select>
                </div>

                {/* 3. KOMISI BAGI HASIL BARBER */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FaPercentage color="#16a34a" size={13} />
                    <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569' }}>
                        Bagi Hasil:
                    </label>
                    <select 
                        value={komisiPersen} 
                        onChange={(e) => setKomisiPersen(Number(e.target.value))}
                        style={{
                            padding: '8px 10px', 
                            borderRadius: '8px', 
                            border: '1.5px solid #cbd5e1', 
                            outline: 'none', 
                            cursor: 'pointer',
                            backgroundColor: '#f0fdf4',
                            fontSize: '13px',
                            fontWeight: '700',
                            color: '#16a34a'
                        }}
                    >
                        <option value={40}>40% Barber / 60% Toko</option>
                        <option value={50}>50% Barber / 50% Toko (Standar)</option>
                        <option value={60}>60% Barber / 40% Toko</option>
                        <option value={70}>70% Barber / 30% Toko</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default RevenueFilter;
