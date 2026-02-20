import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import '../../../styles/dashboard/dashboard.css';

const QRCodePage = () => {
    const linkReservasi = "http://localhost:5173/booking"; 

    return (
        <div className="page-container" style={{
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '80vh' // Mengambil 80% tinggi layar agar ke tengah
        }}>
            <h2 style={{marginBottom: '20px'}}>QR Code Reservasi</h2>
            
            <div className="qr-box" style={{
                padding: '40px', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)', 
                borderRadius: '15px',
                backgroundColor: 'white'
            }}>
                <QRCodeSVG value={linkReservasi} size={250} level={"H"} />
                <p style={{marginTop: '20px', fontWeight: 'bold', color: '#555'}}>{linkReservasi}</p>
                <button className="btn-aksi" onClick={() => window.print()} style={{marginTop: '15px', width: '100%'}}>
                    Cetak QR Code
                </button>
            </div>
        </div>
    );
};

export default QRCodePage;