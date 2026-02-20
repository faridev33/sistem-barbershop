const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',       // Ganti jika username postgres Anda berbeda
    host: 'localhost',
    database: 'barbershop_db',
    password: '0909', // GANTI dengan password postgres laptop Anda
    port: 5432,
});

pool.connect()
    .then(() => console.log('✅ Terhubung ke database PostgreSQL!'))
    .catch((err) => console.error('❌ Gagal terhubung ke DB:', err));

module.exports = pool;