import React from 'react';
import { FaCut, FaMoneyBillWave, FaUserCheck, FaStore } from 'react-icons/fa';

const BarberRevenueTable = ({ data, komisiPersen = 50 }) => {
    // Kelompokkan pendapatan per Tukang Potong (Barber)
    const barberMap = {};

    data.forEach(item => {
        const barber = item.barber_name || 'Budi Pratama';
        if (!barberMap[barber]) {
            barberMap[barber] = {
                nama: barber,
                totalOmset: 0,
                jumlahPelanggan: 0,
                sesiSet: new Set(),
                layananList: []
            };
        }

        const harga = Number(item.harga || 0);
        barberMap[barber].totalOmset += harga;
        barberMap[barber].jumlahPelanggan += 1;
        if (item.sesi) barberMap[barber].sesiSet.add(item.sesi);
        if (item.nama_layanan) barberMap[barber].layananList.push(item.nama_layanan);
    });

    const barberList = Object.values(barberMap).sort((a, b) => b.totalOmset - a.totalOmset);

    return (
        <div className="table-wrapper" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                    <h3 style={{ margin: 0, color: '#1e293b', fontSize: '17px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FaCut color="#0047AB" /> Rekap Pendapatan per Tukang Potong (Barber)
                    </h3>
                    <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
                        Perhitungan bagi hasil {komisiPersen}% untuk Tukang Potong dan {100 - komisiPersen}% untuk Barbershop
                    </p>
                </div>
            </div>

            <table className="dash-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Tukang Potong</th>
                        <th>Sesi Kerja</th>
                        <th style={{ textAlign: 'center' }}>Jumlah Dicukur</th>
                        <th>Total Omset</th>
                        <th style={{ color: '#16a34a' }}>Pendapatan Barber ({komisiPersen}%)</th>
                        <th style={{ color: '#0284c7' }}>Bagian Toko ({100 - komisiPersen}%)</th>
                        <th>Rata-rata / Orang</th>
                    </tr>
                </thead>
                <tbody>
                    {barberList.length === 0 ? (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
                                Belum ada transaksi potong rambut yang selesai pada sesi/periode ini.
                            </td>
                        </tr>
                    ) : (
                        barberList.map((barber, index) => {
                            const komisiBarber = (barber.totalOmset * komisiPersen) / 100;
                            const bagianToko = barber.totalOmset - komisiBarber;
                            const rataRata = barber.jumlahPelanggan > 0 
                                ? Math.round(barber.totalOmset / barber.jumlahPelanggan) 
                                : 0;
                            const sesiArray = Array.from(barber.sesiSet);

                            return (
                                <tr key={barber.nama}>
                                    <td><strong>#{index + 1}</strong></td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <div style={{ 
                                                width: '34px', 
                                                height: '34px', 
                                                borderRadius: '50%', 
                                                backgroundColor: '#e8f1ff', 
                                                color: '#0047AB',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '13px'
                                            }}>
                                                {barber.nama.charAt(0)}
                                            </div>
                                            <div>
                                                <strong style={{ color: '#1e293b' }}>{barber.nama}</strong>
                                                <span style={{ display: 'block', fontSize: '11px', color: '#64748b' }}>
                                                    Kapster Aktif
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                            {sesiArray.map(s => (
                                                <span 
                                                    key={s} 
                                                    style={{ 
                                                        backgroundColor: '#f1f5f9', 
                                                        color: '#475569', 
                                                        padding: '2px 8px', 
                                                        borderRadius: '6px', 
                                                        fontSize: '11px',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ textAlign: 'center' }}>
                                        <span style={{ 
                                            backgroundColor: '#eff6ff', 
                                            color: '#1d4ed8', 
                                            padding: '4px 10px', 
                                            borderRadius: '20px', 
                                            fontWeight: '700',
                                            fontSize: '13px'
                                        }}>
                                            {barber.jumlahPelanggan} orang
                                        </span>
                                    </td>
                                    <td>
                                        <strong>Rp {barber.totalOmset.toLocaleString('id-ID')}</strong>
                                    </td>
                                    <td>
                                        <span style={{ 
                                            color: '#16a34a', 
                                            fontWeight: '800', 
                                            fontSize: '14px',
                                            backgroundColor: '#f0fdf4',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            display: 'inline-block'
                                        }}>
                                            Rp {komisiBarber.toLocaleString('id-ID')}
                                        </span>
                                    </td>
                                    <td>
                                        <span style={{ 
                                            color: '#0284c7', 
                                            fontWeight: '700', 
                                            fontSize: '13px',
                                            backgroundColor: '#f0f9ff',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            display: 'inline-block'
                                        }}>
                                            Rp {bagianToko.toLocaleString('id-ID')}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '12.5px', color: '#64748b' }}>
                                        Rp {rataRata.toLocaleString('id-ID')}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BarberRevenueTable;
