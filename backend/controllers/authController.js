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
        console.error(error.message);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan pada server' });
    }
};

module.exports = { loginAdmin };