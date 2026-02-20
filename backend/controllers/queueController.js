const pool = require('../config/db');

/**
 * 1. AMBIL ANTRIAN HARI INI
 * Menampilkan daftar antrian di halaman Admin.
 */
const getTodayQueue = async (req, res) => {
    try {
        const query = `
            SELECT 
                q.id, 
                q.nama_pelanggan, 
                q.status, 
                COALESCE(STRING_AGG(s.nama_layanan, ', '), 'Tidak ada layanan') as nama_layanan
            FROM queues q
            LEFT JOIN queue_services qs ON q.id = qs.queue_id
            LEFT JOIN services s ON qs.service_id = s.id
            WHERE q.created_at::date = CURRENT_DATE
            GROUP BY q.id, q.nama_pelanggan, q.status
            ORDER BY q.id ASC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error("Error getTodayQueue:", err.message);
        res.status(500).json({ message: "Gagal mengambil data antrian" });
    }
};

/**
 * 2. UBAH STATUS ANTRIAN
 */
const updateQueueStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 
    try {
        const result = await pool.query(
            "UPDATE queues SET status = $1 WHERE id = $2 RETURNING *", 
            [status, id]
        );
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Antrian tidak ditemukan" });
        }

        res.json({ message: "Status berhasil diupdate!", data: result.rows[0] });
    } catch (err) {
        console.error("Error updateQueueStatus:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

/**
 * 3. HAPUS ANTRIAN
 */
const deleteQueue = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM queues WHERE id = $1", [id]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Antrian tidak ditemukan" });
        }
        res.json({ message: "Antrian berhasil dihapus!" });
    } catch (err) {
        console.error("Error deleteQueue:", err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

/**
 * 4. AMBIL DATA PENDAPATAN
 */
const getRevenue = async (req, res) => {
    const { period } = req.query; 
    let timeFilter = "q.created_at::date = CURRENT_DATE"; 
    
    if (period === 'mingguan') {
        timeFilter = "q.created_at >= date_trunc('week', CURRENT_DATE)";
    } else if (period === 'bulanan') {
        timeFilter = "q.created_at >= date_trunc('month', CURRENT_DATE)";
    }

    try {
        const query = `
            SELECT 
                q.id, 
                q.nama_pelanggan, 
                STRING_AGG(s.nama_layanan, ', ') as nama_layanan, 
                SUM(s.harga) as harga, 
                q.created_at
            FROM queues q
            JOIN queue_services qs ON q.id = qs.queue_id
            JOIN services s ON qs.service_id = s.id
            WHERE q.status = 'Selesai' AND ${timeFilter}
            GROUP BY q.id, q.nama_pelanggan, q.created_at
            ORDER BY q.created_at DESC
        `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (err) {
        console.error("Error getRevenue:", err.message);
        res.status(500).json({ message: "Gagal mengambil data pendapatan" });
    }
};

/**
 * 5. AMBIL STATUS LIVE (SANGAT PENTING)
 * Diperbaiki agar urutannya konsisten dengan halaman Admin.
 */
const getQueueStatus = async (req, res) => {
    try {
        // 1. Cari ID orang yang sedang diproses hari ini (paling pertama/lama)
        const serving = await pool.query(`
            SELECT id FROM queues 
            WHERE status = 'Diproses' 
            AND created_at::date = CURRENT_DATE 
            ORDER BY id ASC LIMIT 1
        `);

        let nomorSekarang = "-";

        if (serving.rows.length > 0) {
            const currentId = serving.rows[0].id;
            // 2. HITUNG: Ada berapa banyak orang yang daftar sebelum atau sama dengan ID ini HARI INI
            // Ini akan memberikan "Nomor Urut Antrian" yang akurat
            const rankQuery = await pool.query(`
                SELECT COUNT(*) FROM queues 
                WHERE created_at::date = CURRENT_DATE 
                AND id <= $1
            `, [currentId]);
            
            nomorSekarang = rankQuery.rows[0].count;
        }
        
        // 3. Hitung total antrian hari ini
        const totalQuery = await pool.query(`
            SELECT COUNT(*) FROM queues 
            WHERE created_at::date = CURRENT_DATE
        `);

        res.json({
            sedang_dilayani: nomorSekarang,
            total_antrian: parseInt(totalQuery.rows[0].count || 0)
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ sedang_dilayani: "-", total_antrian: 0 });
    }
};

module.exports = { 
    getTodayQueue, 
    updateQueueStatus, 
    deleteQueue, 
    getRevenue,
    getQueueStatus 
};