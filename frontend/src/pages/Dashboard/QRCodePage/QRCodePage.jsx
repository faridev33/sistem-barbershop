import React from 'react';
import QRCard from '../../../components/dashboard/QRCode/QRCard';
import '../../../styles/dashboard/dashboard.css';

const QRCodePage = () => {
    // URL ini yang akan di-scan oleh pelanggan
    const linkReservasi = "http://localhost:5173/booking"; 

    return (
        <div className="page-container" style={{
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '80vh' 
        }}>
            <h2 style={{ marginBottom: '20px', color: '#09637E' }}>
                QR Code Reservasi
            </h2>
            
            {/* Memanggil Komponen Kartu QR */}
            <QRCard value={linkReservasi} size={250} />
            
            <p style={{ marginTop: '20px', color: '#777', fontSize: '14px', maxWidth: '300px', textAlign: 'center' }}>
                Customer bisa scan kode ini untuk melakukan reservasi antrian secara mandiri.
            </p>
        </div>
    );
};

export default QRCodePage;