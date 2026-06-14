-- 1. Membuat kolom-kolom baru yang dibutuhkan oleh frontend kamu
ALTER TABLE kosts 
ADD COLUMN IF NOT EXISTS harga INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS rating NUMERIC DEFAULT 4.5,
ADD COLUMN IF NOT EXISTS tipe TEXT,
ADD COLUMN IF NOT EXISTS fasilitas TEXT[]; -- Menggunakan Array Text untuk tag fasilitas

-- 2. Mengisi/Update data harga, rating, tipe, dan fasilitas sesuai dengan mockup asli kamu
UPDATE kosts SET harga = 600000, rating = 4.8, tipe = 'Campur', fasilitas = ARRAY['WiFi', 'AC', 'KM Dalam', 'Parkir'] WHERE nama_kost = 'Kost Melati Indah';
UPDATE kosts SET harga = 550000, rating = 4.6, tipe = 'Putra', fasilitas = ARRAY['WiFi', 'AC', 'KM Dalam', 'Dapur Bersama'] WHERE nama_kost = 'Kost Putra Sejahtera';
UPDATE kosts SET harga = 700000, rating = 4.9, tipe = 'Putri', fasilitas = ARRAY['WiFi', 'AC', 'KM Dalam', 'Laundry'] WHERE nama_kost = 'Kost Putri Cantik';
UPDATE kosts SET harga = 800000, rating = 4.7, tipe = 'Campur', fasilitas = ARRAY['WiFi', 'AC', 'KM Dalam', 'Parkir Mobil', 'CCTV'] WHERE nama_kost = 'Kost Green House';
UPDATE kosts SET harga = 500000, rating = 4.4, tipe = 'Putra', fasilitas = ARRAY['WiFi', 'Parkir Motor'] WHERE nama_kost = 'Kost Budi Makmur';
UPDATE kosts SET harga = 650000, rating = 4.9, tipe = 'Putri', fasilitas = ARRAY['WiFi', 'AC', 'Dapur', 'Laundry'] WHERE nama_kost = 'Kost Lily';