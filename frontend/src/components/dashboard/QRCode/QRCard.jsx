import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const QRCard = ({ value, size = 250 }) => {
    return (
        <div className="qr-box" style={{
            padding: '40px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)', 
            borderRadius: '15px',
            backgroundColor: 'white',
            textAlign: 'center'
        }}>
            {/* Gambar QR Code */}
            <QRCodeSVG value={value} size={size} level={"H"} />
            
            {/* Teks Link di bawah QR */}
            <p style={{
                marginTop: '20px', 
                fontWeight: 'bold', 
                color: '#555',
                wordBreak: 'break-all',
                fontSize: '14px'
            }}>
                {value}
            </p>
            
            {/* Tombol Cetak (Hanya muncul di layar, tidak ikut tercetak jika diatur di CSS) */}
            <button 
                className="btn-aksi" 
                onClick={() => window.print()} 
                style={{ marginTop: '15px', width: '100%' }}
            >
                Cetak QR Code
            </button>
        </div>
    );
};

export default QRCard;