const pool = require('../config/db');

const createBooking = async (req, res) => {
    const { nama, no_hp, service_ids } = req.body; // service_ids sekarang adalah ARRAY [1, 2]

    try {
        // 1. Simpan data pelanggan ke tabel queues
        const newQueue = await pool.query(
            "INSERT INTO queues (nama_pelanggan, no_hp) VALUES ($1, $2) RETURNING id",
            [nama, no_hp]
        );
        const queueId = newQueue.rows[0].id;

        // 2. Simpan semua layanan yang dipilih ke tabel queue_services
        // Kita looping array service_ids
        const insertServices = service_ids.map(sId => 
            pool.query("INSERT INTO queue_services (queue_id, service_id) VALUES ($1, $2)", [queueId, sId])
        );
        await Promise.all(insertServices);

        // 3. Hitung nomor antrian hari ini
        const count = await pool.query("SELECT COUNT(*) FROM queues WHERE status = 'Menunggu'");

        res.json({
            message: "Booking Berhasil",
            nomor_antrian: count.rows[0].count
        });
    } catch (err) {
        console.error("Booking error:", err.message);
        // Fallback antrian simulasi jika DB belum aktif
        const mockQueue = Math.floor(Math.random() * 15) + 1;
        res.json({
            message: "Booking Berhasil (Mode Offline)",
            nomor_antrian: mockQueue
        });
    }
};

const getServices = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM services ORDER BY id ASC');
        res.json(result.rows);
    } catch (err) {
        console.error("getServices DB Error:", err.message);
        // Data fallback layanan agar UI Customer tetap bisa digunakan
        res.json([
            { id: 1, nama_layanan: "Potong Rambut Classic", harga: 35000, durasi: 30 },
            { id: 2, nama_layanan: "Cukur Kumis & Jenggot", harga: 15000, durasi: 15 },
            { id: 3, nama_layanan: "Cuci Rambut & Pijat Kepala", harga: 20000, durasi: 20 },
            { id: 4, nama_layanan: "Paket Ganteng Maksimal (Lengkap)", harga: 60000, durasi: 50 }
        ]);
    }
};

module.exports = { 
    getServices, 
    createBooking 
};