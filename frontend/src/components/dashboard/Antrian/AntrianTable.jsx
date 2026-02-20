import React from 'react';
import StatusBadge from './StatusBadge';
import ActionButtons from './ActionButtons';

const AntrianTable = ({ data, onUpdateStatus, onDelete }) => {
    return (
        <table className="dash-table">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Layanan</th>
                    <th>Status</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                            Belum ada antrian hari ini.
                        </td>
                    </tr>
                ) : (
                    data.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nama_pelanggan}</td>
                            <td>{item.nama_layanan}</td>
                            <td><StatusBadge status={item.status} /></td>
                            <td>
                                <ActionButtons 
                                    item={item} 
                                    onUpdate={onUpdateStatus} 
                                    onDelete={onDelete} 
                                />
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default AntrianTable;