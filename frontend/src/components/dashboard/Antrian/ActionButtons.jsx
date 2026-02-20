import React from 'react';

const ActionButtons = ({ item, onUpdate, onDelete }) => {
    return (
        <div style={{ display: 'flex', gap: '5px' }}>
            {item.status === 'Menunggu' && (
                <button 
                    onClick={() => onUpdate(item.id, item.status)} 
                    className="btn-aksi" 
                    style={{ backgroundColor: '#f39c12' }}
                >
                    Proses
                </button>
            )}
            
            {item.status === 'Diproses' && (
                <button 
                    onClick={() => onUpdate(item.id, item.status)} 
                    className="btn-aksi" 
                    style={{ backgroundColor: '#27ae60' }}
                >
                    Selesai
                </button>
            )}

            <button onClick={() => onDelete(item.id)} className="btn-hapus">
                Hapus
            </button>
        </div>
    );
};

export default ActionButtons;