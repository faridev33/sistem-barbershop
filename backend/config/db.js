require('dotenv').config({ quiet: true });

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    host: process.env.PGHOST || 'localhost',
    database: process.env.PGDATABASE || 'barbershop_db',
    password: process.env.PGPASSWORD || 'postgres',
    port: Number(process.env.PGPORT) || 5432,
});

pool.connect()
    .then(() => console.log('✅ Terhubung ke database PostgreSQL!'))
    .catch((err) => console.error('❌ Gagal terhubung ke DB:', err.message));

module.exports = pool;