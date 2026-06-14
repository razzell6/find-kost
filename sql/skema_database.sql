-- 1. MEMBUAT TABEL PROFIL (Untuk data pengguna/mahasiswa/pekerja setelah login)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nama_lengkap TEXT NOT NULL,
  nomor_hp VARCHAR(15),
  tipe_pengguna TEXT CHECK (tipe_pengguna IN ('pencari', 'pemilik')) DEFAULT 'pencari'
);

-- 2. MEMBUAT TABEL KOST (Untuk data rumah kost di daerah UNNES)
CREATE TABLE kosts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nama_kost TEXT NOT NULL,
  alamat TEXT NOT NULL,
  area TEXT CHECK (area IN ('Sekaran', 'Banaran', 'Patemon', 'Ngijo')) NOT NULL,
  deskripsi TEXT,
  id_pemilik UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. MEMBUAT TABEL KAMAR (Karena 1 kost bisa punya beberapa tipe kamar & harga)
CREATE TABLE rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  id_kost UUID REFERENCES kosts(id) ON DELETE CASCADE,
  tipe_kamar TEXT NOT NULL, -- Contoh: 'Kamar Mandi Dalam', 'Kamar AC VIP'
  harga_per_bulan INTEGER NOT NULL,
  fasilitas TEXT[], -- Contoh pengisian nanti: {"Kasur", "WiFi", "Lemari"}
  tersedia BOOLEAN DEFAULT TRUE
);