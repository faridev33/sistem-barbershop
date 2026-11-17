-- Skema database Sistem Barbershop
-- Jalankan: psql -U postgres -d barbershop_db -f backend/database/schema.sql

CREATE TABLE IF NOT EXISTS admins (
    id       SERIAL PRIMARY KEY,
    username VARCHAR(50)  NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS services (
    id           SERIAL PRIMARY KEY,
    nama_layanan VARCHAR(100) NOT NULL UNIQUE,
    harga        INTEGER      NOT NULL CHECK (harga >= 0),
    durasi       INTEGER      NOT NULL CHECK (durasi > 0)
);

CREATE TABLE IF NOT EXISTS queues (
    id             SERIAL PRIMARY KEY,
    nama_pelanggan VARCHAR(100) NOT NULL,
    no_hp          VARCHAR(20)  NOT NULL,
    status         VARCHAR(20)  NOT NULL DEFAULT 'Menunggu'
                   CHECK (status IN ('Menunggu', 'Diproses', 'Selesai')),
    barber_name    VARCHAR(100) NOT NULL DEFAULT 'Budi Pratama',
    sesi           VARCHAR(50)  NOT NULL DEFAULT 'Sesi 1 (Pagi)',
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS queue_services (
    queue_id   INTEGER NOT NULL REFERENCES queues (id) ON DELETE CASCADE,
    service_id INTEGER NOT NULL REFERENCES services (id) ON DELETE RESTRICT,
    PRIMARY KEY (queue_id, service_id)
);

CREATE INDEX IF NOT EXISTS idx_queues_created_at ON queues (created_at);
CREATE INDEX IF NOT EXISTS idx_queues_status ON queues (status);