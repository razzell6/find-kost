import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import KostCard from '../components/KostCard';

// ============================================================
// 1. DATA MASTER KOST
//    PERUBAHAN: Ditambah 2 field baru di setiap kost:
//      - `jarak`    : jarak dalam meter dari Unnes
//      - `kapasitas`: jumlah orang per kamar
//    Kost Putra Sejahtera diubah harga & fasilitas agar
//    filter "Dibawah 500rb" dan "Kasur+Lemari" bisa ditest.
// ============================================================
const DATA_KOST_MASTER = [
  {
    id: 1,
    title: "Kost Melati Indah",
    type: "Campur",
    location: "Jl. Sekaran Raya No. 12, Semarang",
    price: 600000,
    rating: 4.8,
    jarak: 300,
    kapasitas: 1,
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
    jarak: 750,
    kapasitas: 1,
    facilities: ["AC 1 PK", "WiFi High-Speed", "Kamar Mandi Dalam", "Water Heater"],
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    title: "Kost Putra Sejahtera",
    type: "Putra",
    location: "Jl. Banaran Gang 3",
    price: 450000,       // diubah dari 550000 → agar filter "Dibawah 500rb" bisa dicoba
    rating: 4.7,
    jarak: 1500,
    kapasitas: 2,
    facilities: ["WiFi High-Speed", "Kasur", "Lemari", "Kipas Angin"], // diubah → agar filter "Kasur+Lemari" bisa dicoba
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    title: "Kost Lily",
    type: "Putri",
    location: "Jalan Dewi Sartika No 22",
    price: 650000,
    rating: 4.9,
    jarak: 450,
    kapasitas: 1,
    facilities: ["AC 1 PK", "WiFi High-Speed", "Kamar Mandi Dalam", "Water Heater"],
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80"
  }
];

export default function Home() {

  // ============================================================
  // 2. STATE FILTER — yang lama + 4 baru di bawahnya
  // ============================================================
  const [keywordLokasi, setKeywordLokasi] = useState('');
  const [filterTipe, setFilterTipe] = useState('Semua');

  // ✅ 4 STATE FILTER BARU
  const [filterHarga, setFilterHarga] = useState('semua');
  const [filterJarak, setFilterJarak] = useState('semua');
  const [filterFasilitas, setFilterFasilitas] = useState('semua');
  const [filterKapasitas, setFilterKapasitas] = useState('semua');

  // ============================================================
  // 3. LOGIKA FILTER UTAMA — semua kondisi digabung
  // ============================================================
  const kostTerfilter = DATA_KOST_MASTER.filter((item) => {

    // A. Filter Tipe Properti (tidak berubah)
    const cocokTipe =
      filterTipe === 'Semua' ||
      item.type.toLowerCase() === filterTipe.toLowerCase();

    // B. Filter Lokasi / Keyword (tidak berubah)
    const cocokLokasi =
      item.location.toLowerCase().includes(keywordLokasi.toLowerCase()) ||
      item.title.toLowerCase().includes(keywordLokasi.toLowerCase());

    // C. ✅ Filter Harga Per Bulan
    let cocokHarga = true;
    if      (filterHarga === 'dibawah500')  cocokHarga = item.price < 500000;
    else if (filterHarga === '500-750')     cocokHarga = item.price >= 500000  && item.price <= 750000;
    else if (filterHarga === '750-1000')    cocokHarga = item.price > 750000   && item.price <= 1000000;
    else if (filterHarga === 'diatas1000')  cocokHarga = item.price > 1000000;

    // D. ✅ Filter Jarak Dari Unnes
    let cocokJarak = true;
    if      (filterJarak === 'kurang500')   cocokJarak = item.jarak < 500;
    else if (filterJarak === '500-1000')    cocokJarak = item.jarak >= 500  && item.jarak <= 1000;
    else if (filterJarak === '1000-2000')   cocokJarak = item.jarak > 1000  && item.jarak <= 2000;
    else if (filterJarak === 'lebih2000')   cocokJarak = item.jarak > 2000;

    // E. ✅ Filter Fasilitas Kamar
    const fas = item.facilities.map(f => f.toLowerCase());
    let cocokFasilitas = true;
    if (filterFasilitas === 'ac') {
      cocokFasilitas = fas.some(f => f.includes('ac'));
    } else if (filterFasilitas === 'kamar-mandi') {
      cocokFasilitas = fas.some(f => f.includes('kamar mandi dalam'));
    } else if (filterFasilitas === 'ac-kamar-mandi') {
      cocokFasilitas =
        fas.some(f => f.includes('ac')) &&
        fas.some(f => f.includes('kamar mandi dalam'));
    } else if (filterFasilitas === 'kasur-lemari') {
      cocokFasilitas =
        fas.some(f => f.includes('kasur')) &&
        fas.some(f => f.includes('lemari'));
    }

    // F. ✅ Filter Kapasitas Per Kamar
    let cocokKapasitas = true;
    if      (filterKapasitas === '1')      cocokKapasitas = item.kapasitas === 1;
    else if (filterKapasitas === '2')      cocokKapasitas = item.kapasitas === 2;
    else if (filterKapasitas === '3plus')  cocokKapasitas = item.kapasitas >= 3;

    // Semua kondisi harus TRUE agar kost lolos saringan
    return cocokTipe && cocokLokasi && cocokHarga && cocokJarak && cocokFasilitas && cocokKapasitas;
  });

  // Styling reusable untuk dropdown filter baru
  const dropdownStyle =
    "w-full text-xs font-semibold text-slate-700 bg-white border border-slate-200 " +
    "rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 " +
    "cursor-pointer shadow-sm";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      {/* ─── HERO SECTION & SEARCH BAR ─── */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Cari Kost Nyaman &amp; Strategis Tanpa Ribet
          </h2>
          <p className="text-slate-300 text-sm md:text-base">
            Ribuan pilihan kamar kost putra, putri, dan campur di seluruh Indonesia dengan fasilitas lengkap.
          </p>

          {/* ── SEARCH BAR (tidak berubah) ── */}
          <div className="bg-white p-4 rounded-2xl shadow-xl max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-4 text-slate-800 items-center mt-8">

            {/* Input Keyword Lokasi */}
            <div className="md:col-span-3 text-left px-2">
              <label className="block text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-1">
                Lokasi / Area
              </label>
              <input
                type="text"
                value={keywordLokasi}
                onChange={(e) => setKeywordLokasi(e.target.value)}
                placeholder="Mau ngekos di mana?"
                className="w-full text-sm font-medium focus:outline-none placeholder-slate-400"
              />
            </div>

            <div className="hidden md:block h-8 border-r border-slate-200"></div>

            {/* Select Tipe Properti */}
            <div className="md:col-span-2 text-left px-2">
              <label className="block text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-1">
                Tipe Properti
              </label>
              <select
                value={filterTipe}
                onChange={(e) => setFilterTipe(e.target.value)}
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

          {/* ── ✅ FILTER TAMBAHAN (4 dropdown baru) ── */}
          <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">

            {/* Filter 1: Harga Per Bulan */}
            <div className="text-left">
              <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5 pl-1">
                💰 Harga / Bulan
              </label>
              <select
                value={filterHarga}
                onChange={(e) => setFilterHarga(e.target.value)}
                className={dropdownStyle}
              >
                <option value="semua">Semua Harga</option>
                <option value="dibawah500">Dibawah Rp 500.000</option>
                <option value="500-750">Rp 500rb – 750rb</option>
                <option value="750-1000">Rp 750rb – 1jt</option>
                <option value="diatas1000">Diatas Rp 1.000.000</option>
              </select>
            </div>

            {/* Filter 2: Jarak Dari Unnes */}
            <div className="text-left">
              <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5 pl-1">
                📍 Jarak dari Unnes
              </label>
              <select
                value={filterJarak}
                onChange={(e) => setFilterJarak(e.target.value)}
                className={dropdownStyle}
              >
                <option value="semua">Semua Jarak</option>
                <option value="kurang500">Kurang dari 500m</option>
                <option value="500-1000">500m – 1km</option>
                <option value="1000-2000">1km – 2km</option>
                <option value="lebih2000">Lebih dari 2km</option>
              </select>
            </div>

            {/* Filter 3: Fasilitas Kamar */}
            <div className="text-left">
              <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5 pl-1">
                🛏️ Fasilitas Kamar
              </label>
              <select
                value={filterFasilitas}
                onChange={(e) => setFilterFasilitas(e.target.value)}
                className={dropdownStyle}
              >
                <option value="semua">Semua Fasilitas</option>
                <option value="ac">AC</option>
                <option value="kamar-mandi">Kamar Mandi Dalam</option>
                <option value="ac-kamar-mandi">AC + Kamar Mandi Dalam</option>
                <option value="kasur-lemari">Kasur + Lemari</option>
              </select>
            </div>

            {/* Filter 4: Kapasitas Per Kamar */}
            <div className="text-left">
              <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5 pl-1">
                👥 Kapasitas Kamar
              </label>
              <select
                value={filterKapasitas}
                onChange={(e) => setFilterKapasitas(e.target.value)}
                className={dropdownStyle}
              >
                <option value="semua">Semua</option>
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
                <option value="3plus">3 Orang Ke Atas</option>
              </select>
            </div>

          </div>
          {/* ── END FILTER TAMBAHAN ── */}

        </div>
      </header>

      {/* ─── RENDER HASIL FILTER LISTING KOST ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-grow">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Rekomendasi Kost Terpopuler</h3>
            <p className="text-xs text-slate-500 mt-0.5">Pilihan kost terbaik berdasarkan pencarian kamu</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-md">
            {kostTerfilter.length} Kost Ditemukan
          </span>
        </div>

        {kostTerfilter.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200">
            <span className="text-4xl">🔍</span>
            <h4 className="text-base font-bold text-slate-700 mt-2">Kost Tidak Ditemukan</h4>
            <p className="text-xs text-slate-400 mt-1">Coba ketik kata kunci daerah lain atau ubah filter pencarian.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {kostTerfilter.map((item) => (
              <KostCard key={item.id} kost={item} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}