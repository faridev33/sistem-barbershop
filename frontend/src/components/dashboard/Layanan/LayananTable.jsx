import React from 'react';

const LayananTable = ({ data, onDelete }) => {
    return (
        <div className="table-wrapper">
            <table className="dash-table">
                <thead>
                    <tr>
                        <th>Nama Layanan</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nama}</td>
                            <td>Rp {item.harga.toLocaleString('id-ID')}</td>
                            <td>
                                <button className="btn-aksi" style={{ marginRight: '10px', backgroundColor: '#f39c12' }}>
                                    Edit
                                </button>
                                <button onClick={() => onDelete(item.id)} className="btn-hapus">
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LayananTable;