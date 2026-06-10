import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import KostCard from '../components/KostCard'; // Pastikan komponen kartu kost di-import

// 1. DATA MASTER KOST (Mock Data untuk Simulasi)
const DATA_KOST_MASTER = [
  {
    id: 1,
    title: "Kost Melati Indah",
    type: "Campur",
    location: " Jl. Sekaran Raya No. 12, Semarang",
    price: 600000,
    rating: 4.8,
    facilities: ["AC 1 PK", "WiFi High-Speed", "Kamar Mandi Dalam", "Water Heater"],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    title: "Kost Putri Cantik",
    type: "Putri",
    location: "Jl. Pakintelan No 7",
    price: 700000,
    rating: 4.5,
    facilities: ["AC 1 PK", "WiFi High-Speed", "Kamar Mandi Dalam", "Water Heater"],
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Kost Putra Sejahtera",
    type: "Putra",
    location: "Jl. Banaran Gang 3",
    price: 550000,
    rating: 4.7,
    facilities: ["AC 1 PK", "WiFi High-Speed", "Kamar Mandi Dalam", "Water Heater"],
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Kost Lily",
    type: "Putri",
    location: "Jalan Dewi Sartika No 22",
    price: 650000,
    rating: 4.9,
    facilities: ["AC 1 PK", "WiFi High-Speed", "Kamar Mandi Dalam", "Water Heater"],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80"
  }
];

export default function Home() {
  // 2. STATE UNTUK MENAMPUNG INPUT FILTER
  const [keywordLokasi, setKeywordLokasi] = useState('');
  const [filterTipe, setFilterTipe] = useState('Semua'); // Default menampilkan semua tipe

  // 3. LOGIKA UTAMA: MULTI-FILTER YANG SALING NYAMBUNG
  const kost = DATA_KOST_MASTER.filter((kost) => {
    // A. Filter Tipe (Putra / Putri / Campur)
    const cocokTipe = filterTipe === 'Semua' || kost.type.toLowerCase() === filterTipe.toLowerCase();

    // B. Filter Lokasi (Berdasarkan ketikan keyword huruf kecil/besar tidak masalah)
    const cocokLokasi = kost.location.toLowerCase().includes(keywordLokasi.toLowerCase()) ||
                        kost.title.toLowerCase().includes(keywordLokasi.toLowerCase());

    // C. Keduanya harus bernilai TRUE agar data lolos saringan
    return cocokTipe && cocokLokasi;
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      {/* HERO SECTION & SEARCH BAR */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Cari Kost Nyaman & Strategis Tanpa Ribet
          </h2>
          <p className="text-slate-300 text-sm md:text-base">
            Ribuan pilihan kamar kost putra, putri, dan campur di seluruh Indonesia dengan fasilitas lengkap.
          </p>

          {/* KOTAK SEARCH BAR (Sesuai Layout Desainmu) */}
          <div className="bg-white p-4 rounded-2xl shadow-xl max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-4 text-slate-800 items-center mt-8">
            
            {/* Input Keyword Lokasi */}
            <div className="md:col-span-3 text-left px-2">
              <label className="block text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-1">
                Lokasi / Area
              </label>
              <input 
                type="text"
                value={keywordLokasi}
                onChange={(e) => setKeywordLokasi(e.target.value)} // Mengubah state keyword langsung saat mengetik
                placeholder="Mau ngekos di mana?"
                className="w-full text-sm font-medium focus:outline-none placeholder-slate-400"
              />
            </div>

            <div className="hidden md:block h-8 border-r border-slate-200"></div>

            {/* Select Dropdown Tipe Properti */}
            <div className="md:col-span-2 text-left px-2">
              <label className="block text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-1">
                Tipe Properti
              </label>
              <select
                value={filterTipe}
                onChange={(e) => setFilterTipe(e.target.value)} // Mengubah state tipe langsung saat dipilih
                className="w-full text-sm font-bold text-slate-700 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Semua">Semua Tipe</option>
                <option value="Putra">Putra</option>
                <option value="Putri">Putri</option>
                <option value="Campur">Campur</option>
              </select>
            </div>

            {/* Tombol Cari */}
            <button className="md:col-span-1 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition text-sm shadow-md shadow-indigo-100">
              Cari
            </button>
          </div>
        </div>
      </header>

      {/* RENDER HASIL FILTER LISTING KOST */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Rekomendasi Kost Terpopuler</h3>
            <p className="text-xs text-slate-500 mt-0.5">Pilihan kost terbaik berdasarkan pencarian kamu</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
            {kost.length} Kost Ditemukan
          </span>
        </div>

        {/* LOGIKA JIKA DATA KOSONG ATAU ADA */}
        {kost.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
            <span className="text-4xl">🔍</span>
            <h4 className="text-base font-bold text-slate-700 mt-2">Kost Tidak Ditemukan</h4>
            <p className="text-xs text-slate-400 mt-1">Coba ketik kata kunci daerah lain atau ubah tipe filternya.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {kost.map((kost) => (
              // Mengirim data kost yang sudah disaring ke komponen KostCard kamu
              <KostCard key={kost.id} kost={kost} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}