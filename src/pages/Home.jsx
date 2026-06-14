import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import KostCard from '../components/KostCard';

// ============================================================
// DATA MASTER KOST
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
    price: 450000,
    rating: 4.7,
    jarak: 1500,
    kapasitas: 2,
    facilities: ["WiFi High-Speed", "Kasur", "Lemari", "Kipas Angin"],
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
  const location = useLocation();

  // ── STATE FILTER ──
  const [keywordLokasi, setKeywordLokasi] = useState('');
  const [filterTipe, setFilterTipe]       = useState('Semua');
  const [filterHarga, setFilterHarga]     = useState('semua');
  const [filterJarak, setFilterJarak]     = useState('semua');
  const [filterFasilitas, setFilterFasilitas] = useState('semua');
  const [filterKapasitas, setFilterKapasitas] = useState('semua');

  // ── Auto-scroll ke section Contact kalau URL membawa hash #contact ──
  useEffect(() => {
    if (location.hash === '#contact') {
      const timer = setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // ── LOGIKA FILTER ──
  const kostTerfilter = DATA_KOST_MASTER.filter((item) => {
    const cocokTipe = filterTipe === 'Semua' || item.type.toLowerCase() === filterTipe.toLowerCase();
    const cocokLokasi = item.location.toLowerCase().includes(keywordLokasi.toLowerCase()) ||
                        item.title.toLowerCase().includes(keywordLokasi.toLowerCase());

    let cocokHarga = true;
    if      (filterHarga === 'dibawah500')  cocokHarga = item.price < 500000;
    else if (filterHarga === '500-750')     cocokHarga = item.price >= 500000 && item.price <= 750000;
    else if (filterHarga === '750-1000')    cocokHarga = item.price > 750000 && item.price <= 1000000;
    else if (filterHarga === 'diatas1000')  cocokHarga = item.price > 1000000;

    let cocokJarak = true;
    if      (filterJarak === 'kurang500')   cocokJarak = item.jarak < 500;
    else if (filterJarak === '500-1000')    cocokJarak = item.jarak >= 500 && item.jarak <= 1000;
    else if (filterJarak === '1000-2000')   cocokJarak = item.jarak > 1000 && item.jarak <= 2000;
    else if (filterJarak === 'lebih2000')   cocokJarak = item.jarak > 2000;

    const fas = item.facilities.map(f => f.toLowerCase());
    let cocokFasilitas = true;
    if      (filterFasilitas === 'ac')              cocokFasilitas = fas.some(f => f.includes('ac'));
    else if (filterFasilitas === 'kamar-mandi')     cocokFasilitas = fas.some(f => f.includes('kamar mandi dalam'));
    else if (filterFasilitas === 'ac-kamar-mandi')  cocokFasilitas = fas.some(f => f.includes('ac')) && fas.some(f => f.includes('kamar mandi dalam'));
    else if (filterFasilitas === 'kasur-lemari')    cocokFasilitas = fas.some(f => f.includes('kasur')) && fas.some(f => f.includes('lemari'));

    let cocokKapasitas = true;
    if      (filterKapasitas === '1')     cocokKapasitas = item.kapasitas === 1;
    else if (filterKapasitas === '2')     cocokKapasitas = item.kapasitas === 2;
    else if (filterKapasitas === '3plus') cocokKapasitas = item.kapasitas >= 3;

    return cocokTipe && cocokLokasi && cocokHarga && cocokJarak && cocokFasilitas && cocokKapasitas;
  });

  const dropdownStyle =
    "w-full text-xs font-semibold text-slate-700 bg-white border border-slate-200 " +
    "rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer shadow-sm";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <Navbar />

      {/* ─── HERO + SEARCH BAR ─── */}
      <header className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            Cari Kost Nyaman &amp; Strategis Tanpa Ribet
          </h2>
          <p className="text-slate-300 text-sm md:text-base">
            Ribuan pilihan kamar kost putra, putri, dan campur di seluruh Indonesia dengan fasilitas lengkap.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-4 rounded-2xl shadow-xl max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-7 gap-4 text-slate-800 items-center mt-8">
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
            <button className="md:col-span-1 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-4 rounded-xl transition text-sm shadow-md shadow-indigo-100">
              Cari
            </button>
          </div>

          {/* Filter Tambahan */}
          <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
            <div className="text-left">
              <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5 pl-1">💰 Harga / Bulan</label>
              <select value={filterHarga} onChange={(e) => setFilterHarga(e.target.value)} className={dropdownStyle}>
                <option value="semua">Semua Harga</option>
                <option value="dibawah500">Dibawah Rp 500.000</option>
                <option value="500-750">Rp 500rb – 750rb</option>
                <option value="750-1000">Rp 750rb – 1jt</option>
                <option value="diatas1000">Diatas Rp 1.000.000</option>
              </select>
            </div>
            <div className="text-left">
              <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5 pl-1">📍 Jarak dari Unnes</label>
              <select value={filterJarak} onChange={(e) => setFilterJarak(e.target.value)} className={dropdownStyle}>
                <option value="semua">Semua Jarak</option>
                <option value="kurang500">Kurang dari 500m</option>
                <option value="500-1000">500m – 1km</option>
                <option value="1000-2000">1km – 2km</option>
                <option value="lebih2000">Lebih dari 2km</option>
              </select>
            </div>
            <div className="text-left">
              <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5 pl-1">🛏️ Fasilitas Kamar</label>
              <select value={filterFasilitas} onChange={(e) => setFilterFasilitas(e.target.value)} className={dropdownStyle}>
                <option value="semua">Semua Fasilitas</option>
                <option value="ac">AC</option>
                <option value="kamar-mandi">Kamar Mandi Dalam</option>
                <option value="ac-kamar-mandi">AC + Kamar Mandi Dalam</option>
                <option value="kasur-lemari">Kasur + Lemari</option>
              </select>
            </div>
            <div className="text-left">
              <label className="block text-[10px] font-bold text-indigo-300 uppercase tracking-wider mb-1.5 pl-1">👥 Kapasitas Kamar</label>
              <select value={filterKapasitas} onChange={(e) => setFilterKapasitas(e.target.value)} className={dropdownStyle}>
                <option value="semua">Semua</option>
                <option value="1">1 Orang</option>
                <option value="2">2 Orang</option>
                <option value="3plus">3 Orang Ke Atas</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* ─── LISTING KOST ─── */}
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
            <p className="text-xs text-slate-400 mt-1">Coba ubah filter pencarian kamu.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {kostTerfilter.map((item) => (
              <KostCard key={item.id} kost={item} />
            ))}
          </div>
        )}
      </main>

      {/* ═══════════════════════════════════════════════════════
          ✅ SECTION BARU: HUBUNGI KAMI
          Layout & bubble dari gambar 2, warna dari FindKost
      ════════════════════════════════════════════════════════ */}
      <section id="contact" className="bg-white py-20 px-4 border-t border-slate-100 scroll-mt-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">

          {/* ── KIRI: Kontak ── */}
          <div className="space-y-8">

            {/* Badge "HUBUNGI KAMI" */}
            <span className="inline-flex items-center border border-slate-300 text-slate-500 text-[11px] font-bold uppercase tracking-[0.18em] px-4 py-1.5 rounded-full">
              Hubungi Kami
            </span>

            {/* Heading & Deskripsi */}
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-[1.1] tracking-tight">
                Ada Pertanyaan?<br />
                Kami Siap Membantu
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tim FindKost siap membantu kamu menemukan kost terbaik.<br />
                Jangan ragu untuk menghubungi kami kapan saja!
              </p>
            </div>

            {/* ── Contact Items (bubble) ── */}
            <div className="space-y-5">

              {/* Telepon / WhatsApp */}
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 min-w-[52px] min-h-[52px] bg-indigo-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-0.5">Telepon / WhatsApp</p>
                  <p className="text-slate-800 font-semibold text-sm">+62 812-3456-7890</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 min-w-[52px] min-h-[52px] bg-indigo-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-slate-800 font-semibold text-sm">support@findkost.com</p>
                </div>
              </div>

              {/* Area Layanan */}
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 min-w-[52px] min-h-[52px] bg-indigo-100 rounded-2xl flex items-center justify-center shadow-sm">
                  <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] font-black text-indigo-600 uppercase tracking-wider mb-0.5">Area Layanan</p>
                  <p className="text-slate-800 font-semibold text-sm">Sekitar Universitas Negeri Semarang</p>
                </div>
              </div>
            </div>

            {/* ── Tombol Sosial Media ── */}
            <div className="flex gap-3 flex-wrap">
              {/* Instagram */}
              <button className="flex items-center gap-2 border border-slate-200 text-slate-600 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram
              </button>
              {/* TikTok */}
              <button className="flex items-center gap-2 border border-slate-200 text-slate-600 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.78a4.84 4.84 0 01-1.01-.09z"/>
                </svg>
                TikTok
              </button>
            </div>
          </div>

          {/* ── KANAN: Location Card ── */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-800 rounded-3xl flex flex-col items-center justify-center text-white text-center py-16 px-8 shadow-2xl shadow-indigo-900/30">

            {/* Map Pin (bubble) */}
            <div className="mb-8 flex flex-col items-center">
              {/* Kepala pin */}
              <div className="w-11 h-11 bg-rose-500 rounded-full shadow-xl shadow-rose-500/60 flex items-center justify-center">
                <div className="w-4 h-4 bg-white/30 rounded-full"></div>
              </div>
              {/* Jarum pin */}
              <div
                style={{ width: '3px', height: '28px', background: 'linear-gradient(to bottom, #f43f5e, #9f1239)', borderRadius: '0 0 3px 3px' }}
              ></div>
              {/* Bayangan di tanah */}
              <div className="w-5 h-1.5 bg-black/25 rounded-full blur-sm mt-0.5"></div>
            </div>

            {/* Teks Lokasi */}
            <h3 className="text-2xl font-black tracking-tight">Sekitar Unnes</h3>
            <p className="text-indigo-300 text-sm mt-2 font-medium">Universitas Negeri Semarang</p>
            <p className="text-indigo-400 text-xs mt-1">Kota Semarang, Jawa Tengah</p>
          </div>

        </div>
      </section>
      {/* ═══════════════════════════════════════════════════════
          END SECTION HUBUNGI KAMI
      ════════════════════════════════════════════════════════ */}

      <Footer />
    </div>
  );
}