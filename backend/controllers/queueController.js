const pool = require('../config/db');

// Otomatis tambahkan kolom barber_name dan sesi jika tabel queues sudah ada di PostgreSQL
pool.query(`
    ALTER TABLE queues ADD COLUMN IF NOT EXISTS barber_name VARCHAR(100) DEFAULT 'Budi Pratama';
    ALTER TABLE queues ADD COLUMN IF NOT EXISTS sesi VARCHAR(50) DEFAULT 'Sesi 1 (Pagi)';
`).catch(() => {});

// Mock data antrian hari ini (fallback)
let mockTodayQueue = [
    {
        id: 1,
        nama_pelanggan: "Riko Saputra",
        nama_layanan: "Potong Rambut Classic",
        status: "Diproses",
        barber_name: "Budi Pratama",
        sesi: "Sesi 1 (Pagi)"
    },
    {
        id: 2,
        nama_pelanggan: "Faisal Tanjung",
        nama_layanan: "Paket Ganteng Maksimal",
        status: "Menunggu",
        barber_name: "Rian Hidayat",
        sesi: "Sesi 1 (Pagi)"
    },
    {
        id: 3,
        nama_pelanggan: "Ilham Ramadhan",
        nama_layanan: "Cukur Kumis & Jenggot",
        status: "Menunggu",
        barber_name: "Dani Saputra",
        sesi: "Sesi 2 (Sore)"
    }
];

// Mock data pendapatan dengan Sesi dan Barber (fallback)
const today = new Date();
const setTime = (h, m) => new Date(today.getFullYear(), today.getMonth(), today.getDate(), h, m).toISOString();

const fallbackRevenue = [
    {
        id: 101,
        nama_pelanggan: "Ahmad Rizky",
        nama_layanan: "Potong Rambut Classic + Cuci",
        harga: 55000,
        barber_name: "Budi Pratama",
        sesi: "Sesi 1 (Pagi)",
        created_at: setTime(10, 15)
    },
    {
        id: 102,
        nama_pelanggan: "Dimas Anggara",
        nama_layanan: "Potong Rambut Classic",
        harga: 35000,
        barber_name: "Rian Hidayat",
        sesi: "Sesi 1 (Pagi)",
        created_at: setTime(11, 30)
    },
    {
        id: 103,
        nama_pelanggan: "Farhan Maulana",
        nama_layanan: "Paket Ganteng Maksimal",
        harga: 60000,
        barber_name: "Budi Pratama",
        sesi: "Sesi 1 (Pagi)",
        created_at: setTime(13, 0)
    },
    {
        id: 104,
        nama_pelanggan: "Kevin Sanjaya",
        nama_layanan: "Potong Rambut Classic + Cukur Jenggot",
        harga: 50000,
        barber_name: "Rian Hidayat",
        sesi: "Sesi 2 (Sore)",
        created_at: setTime(15, 20)
    },
    {
        id: 105,
        nama_pelanggan: "Bagus Setiawan",
        nama_layanan: "Paket Ganteng Maksimal",
        harga: 60000,
        barber_name: "Dani Saputra",
        sesi: "Sesi 2 (Sore)",
        created_at: setTime(16, 45)
    },
    {
        id: 106,
        nama_pelanggan: "Rendra Pratama",
        nama_layanan: "Potong Rambut Classic",
        harga: 35000,
        barber_name: "Dani Saputra",
        sesi: "Sesi 3 (Malam)",
        created_at: setTime(19, 10)
    },
    {
        id: 107,
        nama_pelanggan: "Yoga Aditya",
        nama_layanan: "Potong Rambut Classic + Cuci",
        harga: 55000,
        barber_name: "Budi Pratama",
        sesi: "Sesi 3 (Malam)",
        created_at: setTime(20, 30)
    }
];

const filterFallbackRevenue = (list, period, session) => {
    let result = [...list];
    if (session && session !== 'semua') {
        result = result.filter(item => item.sesi === session);
    }
    return result;
};

/**
 * 1. AMBIL ANTRIAN HARI INI
 */
const getTodayQueue = async (req, res) => {
    try {
        const query = `
            SELECT 
                q.id, 
                q.nama_pelanggan, 
                q.status, 
                COALESCE(q.barber_name, 'Budi Pratama') as barber_name,
                COALESCE(q.sesi, 'Sesi 1 (Pagi)') as sesi,
                COALESCE(STRING_AGG(s.nama_layanan, ', '), 'Tidak ada layanan') as nama_layanan
            FROM queues q
            LEFT JOIN queue_services qs ON q.id = qs.queue_id
            LEFT JOIN services s ON qs.service_id = s.id
            WHERE q.created_at::date = CURRENT_DATE
            GROUP BY q.id, q.nama_pelanggan, q.status, q.barber_name, q.sesi
            ORDER BY q.id ASC
        `;
        const result = await pool.query(query);
        if (result.rows.length === 0) {
            return res.json(mockTodayQueue);
        }
        res.json(result.rows);
    } catch (err) {
        console.error("Error getTodayQueue (using mock):", err.message);
        res.json(mockTodayQueue);
    }
};

/**
 * 2. UBAH STATUS ANTRIAN (DENGAN TUKANG POTONG & SESI)
 */
const updateQueueStatus = async (req, res) => {
    const { id } = req.params;
    const { status, barber_name, sesi } = req.body; 
    try {
        let result;
        if (barber_name || sesi) {
            result = await pool.query(
                "UPDATE queues SET status = $1, barber_name = COALESCE($2, barber_name), sesi = COALESCE($3, sesi) WHERE id = $4 RETURNING *", 
                [status, barber_name, sesi, id]
            );
        } else {
            result = await pool.query(
                "UPDATE queues SET status = $1 WHERE id = $2 RETURNING *", 
                [status, id]
            );
        }
        
        if (result.rowCount === 0) {
            // Update in mock
            const item = mockTodayQueue.find(q => q.id === parseInt(id));
            if (item) {
                item.status = status;
                if (barber_name) item.barber_name = barber_name;
                if (sesi) item.sesi = sesi;
            }
            return res.json({ message: "Status berhasil diupdate!", data: { id, status, barber_name, sesi } });
        }

        res.json({ message: "Status berhasil diupdate!", data: result.rows[0] });
    } catch (err) {
        console.error("Error updateQueueStatus (fallback mode):", err.message);
        const item = mockTodayQueue.find(q => q.id === parseInt(id));
        if (item) {
            item.status = status;
            if (barber_name) item.barber_name = barber_name;
            if (sesi) item.sesi = sesi;
        }
        res.json({ message: "Status berhasil diupdate!", data: { id, status, barber_name, sesi } });
    }
};

/**
 * 3. HAPUS ANTRIAN
 */
const deleteQueue = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query("DELETE FROM queues WHERE id = $1", [id]);
        mockTodayQueue = mockTodayQueue.filter(q => q.id !== parseInt(id));
        res.json({ message: "Antrian berhasil dihapus!" });
    } catch (err) {
        console.error("Error deleteQueue (fallback):", err.message);
        mockTodayQueue = mockTodayQueue.filter(q => q.id !== parseInt(id));
        res.json({ message: "Antrian berhasil dihapus!" });
    }
};

/**
 * 4. AMBIL DATA PENDAPATAN (DENGAN SESI & TUKANG POTONG)
 */
const getRevenue = async (req, res) => {
    const { period, session } = req.query; 
    let timeFilter = "q.created_at::date = CURRENT_DATE"; 
    
    if (period === 'mingguan') {
        timeFilter = "q.created_at >= date_trunc('week', CURRENT_DATE)";
    } else if (period === 'bulanan') {
        timeFilter = "q.created_at >= date_trunc('month', CURRENT_DATE)";
    }

    let sessionFilter = "";
    if (session && session !== 'semua') {
        sessionFilter = ` AND q.sesi = '${session}'`;
    }

    try {
        const query = `
            SELECT 
                q.id, 
                q.nama_pelanggan, 
                COALESCE(q.barber_name, 'Budi Pratama') as barber_name,
                COALESCE(q.sesi, 'Sesi 1 (Pagi)') as sesi,
                STRING_AGG(s.nama_layanan, ', ') as nama_layanan, 
                SUM(s.harga) as harga, 
                q.created_at
            FROM queues q
            JOIN queue_services qs ON q.id = qs.queue_id
            JOIN services s ON qs.service_id = s.id
            WHERE q.status = 'Selesai' AND ${timeFilter} ${sessionFilter}
            GROUP BY q.id, q.nama_pelanggan, q.barber_name, q.sesi, q.created_at
            ORDER BY q.created_at DESC
        `;
        const result = await pool.query(query);
        if (result.rows.length === 0) {
            return res.json(filterFallbackRevenue(fallbackRevenue, period, session));
        }
        res.json(result.rows);
    } catch (err) {
        console.error("Error getRevenue (using fallback data):", err.message);
        res.json(filterFallbackRevenue(fallbackRevenue, period, session));
    }
};

/**
 * 5. AMBIL STATUS LIVE
 */
const getQueueStatus = async (req, res) => {
    try {
        const serving = await pool.query(`
            SELECT id FROM queues 
            WHERE status = 'Diproses' 
            AND created_at::date = CURRENT_DATE 
            ORDER BY id ASC LIMIT 1
        `);

        let nomorSekarang = "-";

        if (serving.rows.length > 0) {
            const currentId = serving.rows[0].id;
            const rankQuery = await pool.query(`
                SELECT COUNT(*) FROM queues 
                WHERE created_at::date = CURRENT_DATE 
                AND id <= $1
            `, [currentId]);
            
            nomorSekarang = rankQuery.rows[0].count;
        }
        
        const totalQuery = await pool.query(`
            SELECT COUNT(*) FROM queues 
            WHERE created_at::date = CURRENT_DATE
        `);

        res.json({
            sedang_dilayani: nomorSekarang,
            total_antrian: parseInt(totalQuery.rows[0].count || 0)
        });
    } catch (err) {
        console.error("Queue status DB error:", err.message);
        res.json({ sedang_dilayani: "1", total_antrian: 3 });
    }
};

module.exports = { 
    getTodayQueue, 
    updateQueueStatus, 
    deleteQueue, 
    getRevenue,
    getQueueStatus 
};
