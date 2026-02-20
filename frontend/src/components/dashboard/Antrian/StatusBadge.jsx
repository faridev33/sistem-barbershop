import React from 'react';

const StatusBadge = ({ status }) => {
    const getBadgeClass = () => {
        if (status === 'Diproses') return 'badge-proses';
        if (status === 'Selesai') return 'badge-selesai';
        return 'badge-wait';
    };

    return <span className={getBadgeClass()}>{status}</span>;
};

export default StatusBadge;