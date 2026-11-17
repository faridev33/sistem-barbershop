const pool = require('../config/db');

const loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Mencari user di database PostgreSQL
        const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Username tidak ditemukan!' });
        }

        const user = result.rows[0];

        // Mencocokkan password
        if (password === user.password) {
            res.status(200).json({ success: true, message: `Login berhasil, Selamat datang ${user.username}!` });
        } else {
            res.status(401).json({ success: false, message: 'Password salah!' });
        }
    } catch (error) {
        console.error("Auth DB Error:", error.message);
        // Fallback akun demo jika DB belum aktif / belum terkonfigurasi
        if (username === 'admin' && (password === 'admin' || password === 'admin123')) {
            return res.status(200).json({
                success: true,
                message: 'Login demo berhasil (Mode Offline)!'
            });
        }
        res.status(500).json({
            success: false,
            message: 'Database belum terhubung. Silakan gunakan tombol "Akses Cepat Admin" tanpa password.'
        });
    }
};

module.exports = { loginAdmin };