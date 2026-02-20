const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // <--- TAMBAH INI
const queueRoutes = require('./routes/queueRoutes'); // <--- TAMBAH INI

const app = express();

app.use(cors());
app.use(express.json());

// Menggunakan Routes yang sudah dipisah
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes); // <--- TAMBAH INI
app.use('/api/queues', queueRoutes); // <--- TAMBAH INI

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});