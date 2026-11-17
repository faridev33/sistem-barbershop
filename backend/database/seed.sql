-- Data awal (idempotent, aman dijalankan berulang)
-- Jalankan setelah schema.sql: psql -U postgres -d barbershop_db -f backend/database/seed.sql

-- Akun admin demo. Ganti password ini sebelum dipakai di lingkungan nyata.
INSERT INTO admins (username, password)
VALUES ('admin', 'admin123')
ON CONFLICT (username) DO NOTHING;

INSERT INTO services (nama_layanan, harga, durasi)
VALUES
    ('Potong Rambut Classic', 35000, 30),
    ('Cukur Kumis & Jenggot', 15000, 15),
    ('Cuci Rambut & Pijat Kepala', 20000, 20),
    ('Paket Ganteng Maksimal (Lengkap)', 60000, 50)
ON CONFLICT (nama_layanan) DO NOTHING;