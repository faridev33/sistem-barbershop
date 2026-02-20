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
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

module.exports = { 
    getServices: async (req, res) => {
        const result = await pool.query('SELECT * FROM services ORDER BY id ASC');
        res.json(result.rows);
    }, 
    createBooking 
};