import React, { useState } from 'react';
import StatusBadge from './StatusBadge';
import ActionButtons from './ActionButtons';

const BARBERS = ['Budi Pratama', 'Rian Hidayat', 'Dani Saputra'];
const SESSIONS = ['Sesi 1 (Pagi)', 'Sesi 2 (Sore)', 'Sesi 3 (Malam)'];

const AntrianTable = ({ data, onUpdateStatus, onDelete, onUpdateBarber }) => {
    return (
        <table className="dash-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Pelanggan</th>
                    <th>Layanan</th>
                    <th>Tukang Potong (Barber)</th>
                    <th>Sesi Kerja</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: '#64748b' }}>
                            Belum ada antrian hari ini.
                        </td>
                    </tr>
                ) : (
                    data.map((item, index) => {
                        const currentBarber = item.barber_name || 'Budi Pratama';
                        const currentSesi = item.sesi || 'Sesi 1 (Pagi)';

                        return (
                            <tr key={item.id}>
                                <td><strong>#{index + 1}</strong></td>
                                <td>
                                    <strong style={{ color: '#1e293b' }}>{item.nama_pelanggan}</strong>
                                </td>
                                <td style={{ fontSize: '13px', color: '#475569' }}>{item.nama_layanan}</td>
                                
                                {/* PILIH TUKANG POTONG */}
                                <td>
                                    {item.status === 'Selesai' ? (
                                        <strong style={{ color: '#0047AB' }}>{currentBarber}</strong>
                                    ) : (
                                        <select
                                            value={currentBarber}
                                            onChange={(e) => onUpdateBarber(item.id, e.target.value, currentSesi)}
                                            style={{
                                                padding: '5px 8px',
                                                borderRadius: '6px',
                                                border: '1px solid #cbd5e1',
                                                fontSize: '12.5px',
                                                fontWeight: '600',
                                                color: '#0047AB',
                                                cursor: 'pointer',
                                                backgroundColor: '#f8fafc'
                                            }}
                                        >
                                            {BARBERS.map(b => (
                                                <option key={b} value={b}>{b}</option>
                                            ))}
                                        </select>
                                    )}
                                </td>

                                {/* PILIH SESI KERJA */}
                                <td>
                                    {item.status === 'Selesai' ? (
                                        <span style={{ 
                                            backgroundColor: '#f1f5f9', 
                                            padding: '3px 8px', 
                                            borderRadius: '6px', 
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            color: '#334155' 
                                        }}>
                                            {currentSesi}
                                        </span>
                                    ) : (
                                        <select
                                            value={currentSesi}
                                            onChange={(e) => onUpdateBarber(item.id, currentBarber, e.target.value)}
                                            style={{
                                                padding: '5px 8px',
                                                borderRadius: '6px',
                                                border: '1px solid #cbd5e1',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                color: '#334155',
                                                cursor: 'pointer',
                                                backgroundColor: '#f8fafc'
                                            }}
                                        >
                                            {SESSIONS.map(s => (
                                                <option key={s} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    )}
                                </td>

                                <td><StatusBadge status={item.status} /></td>
                                <td>
                                    <ActionButtons 
                                        item={item} 
                                        onUpdate={() => onUpdateStatus(item.id, item.status, currentBarber, currentSesi)} 
                                        onDelete={onDelete} 
                                    />
                                </td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
};

export default AntrianTable;
