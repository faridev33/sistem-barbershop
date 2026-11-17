import React from 'react';
import { FaCloudSun, FaSun, FaMoon, FaMoneyBillWave, FaUsers } from 'react-icons/fa';

const SessionCards = ({ transaksi, komisiPersen = 50 }) => {
    // Sesi-sesi operasional barbershop
    const sesiList = [
        {
            key: 'Sesi 1 (Pagi)',
            label: 'Sesi 1: Pagi',
            jam: '09:00 - 14:00',
            icon: <FaCloudSun size={24} color="#f59e0b" />,
            borderColor: '#f59e0b',
            bgColor: '#fffbeb'
        },
        {
            key: 'Sesi 2 (Sore)',
            label: 'Sesi 2: Sore',
            jam: '14:00 - 18:00',
            icon: <FaSun size={24} color="#0284c7" />,
            borderColor: '#0284c7',
            bgColor: '#f0f9ff'
        },
        {
            key: 'Sesi 3 (Malam)',
            label: 'Sesi 3: Malam',
            jam: '18:00 - 22:00',
            icon: <FaMoon size={24} color="#6366f1" />,
            borderColor: '#6366f1',
            bgColor: '#eef2ff'
        }
    ];

    // Hitung per sesi
    const sessionStats = sesiList.map(sesi => {
        const itemSesi = transaksi.filter(t => t.sesi === sesi.key);
        const omset = itemSesi.reduce((sum, item) => sum + Number(item.harga || 0), 0);
        const barbers = [...new Set(itemSesi.map(t => t.barber_name).filter(Boolean))];
        const komisiBarber = (omset * komisiPersen) / 100;
        const omsetToko = omset - komisiBarber;

        return {
            ...sesi,
            omset,
            count: itemSesi.length,
            barbers,
            komisiBarber,
            omsetToko
        };
    });

    const totalSemuaOmset = transaksi.reduce((sum, item) => sum + Number(item.harga || 0), 0);
    const totalKomisiSemuaBarber = (totalSemuaOmset * komisiPersen) / 100;
    const totalBersihToko = totalSemuaOmset - totalKomisiSemuaBarber;

    return (
        <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '14px', color: '#1e293b', fontSize: '17px', fontWeight: '700' }}>
                Ringkasan Pendapatan per Sesi Kerja Hari Ini
            </h3>

            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
                gap: '16px',
                marginBottom: '16px'
            }}>
                {sessionStats.map(s => (
                    <div 
                        key={s.key} 
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '18px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                            borderTop: `4px solid ${s.borderColor}`,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                <span style={{ fontWeight: '700', fontSize: '15px', color: '#1e293b' }}>{s.label}</span>
                                {s.icon}
                            </div>
                            <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '500' }}>Jam Kerja: {s.jam}</span>
                            
                            <div style={{ margin: '14px 0 10px 0' }}>
                                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>Total Omset Sesi</span>
                                <h3 style={{ fontSize: '22px', color: '#0047AB', margin: '2px 0 0 0', fontWeight: '800' }}>
                                    Rp {s.omset.toLocaleString('id-ID')}
                                </h3>
                            </div>
                        </div>

                        <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '10px', fontSize: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ color: '#64748b' }}>Pelanggan:</span>
                                <strong style={{ color: '#1e293b' }}>{s.count} orang</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                <span style={{ color: '#64748b' }}>Hak Tukang Potong ({komisiPersen}%):</span>
                                <strong style={{ color: '#16a34a' }}>Rp {s.komisiBarber.toLocaleString('id-ID')}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#64748b' }}>Bagian Kas Toko:</span>
                                <strong style={{ color: '#0284c7' }}>Rp {s.omsetToko.toLocaleString('id-ID')}</strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* KARTU TOTAL GABUNGAN */}
            <div style={{
                background: 'linear-gradient(135deg, #0047AB, #0f172a)',
                color: 'white',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '15px',
                boxShadow: '0 4px 14px rgba(0,71,171,0.25)'
            }}>
                <div>
                    <span style={{ fontSize: '12px', textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.8px', fontWeight: '600' }}>
                        Total Keseluruhan Semua Sesi
                    </span>
                    <h2 style={{ fontSize: '30px', margin: '4px 0 0 0', fontWeight: '800' }}>
                        Rp {totalSemuaOmset.toLocaleString('id-ID')}
                    </h2>
                    <span style={{ fontSize: '13px', opacity: 0.9 }}>
                        {transaksi.length} Total Transaksi Selesai
                    </span>
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', padding: '10px 16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '11px', opacity: 0.8, display: 'block' }}>Total Komisi Tukang Potong</span>
                        <strong style={{ fontSize: '17px', color: '#86efac' }}>
                            Rp {totalKomisiSemuaBarber.toLocaleString('id-ID')}
                        </strong>
                    </div>

                    <div style={{ backgroundColor: 'rgba(255,255,255,0.12)', padding: '10px 16px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '11px', opacity: 0.8, display: 'block' }}>Total Bersih Kas Barbershop</span>
                        <strong style={{ fontSize: '17px', color: '#93c5fd' }}>
                            Rp {totalBersihToko.toLocaleString('id-ID')}
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SessionCards;
