import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-[#f0f9f5] font-sans text-[#0d2b22] pb-20">
      
      {/* 1. NAVBAR */}
      <nav className="bg-white border-b border-[#cce4da] px-6 py-4 flex justify-between items-center shadow-sm">
        <div className="text-xl font-extrabold text-[#0d2b22] tracking-tight">
          FindKost<span className="text-[#f07030]">.</span>
        </div>
        <div className="flex gap-6 text-sm font-semibold text-[#3d5e55]">
          <a href="#hero" className="hover:text-[#246652]">Home</a>
          <a href="#how" className="hover:text-[#246652]">Cara Kerja</a>
          <a href="#cari-kost" className="hover:text-[#246652]">Cari Kost</a>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section id="hero" className="pt-20 pb-12 px-6 text-center max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-black text-[#0d2b22] leading-tight mb-6 font-serif">
          Hunian Nyaman untuk <br />
          <span className="text-[#246652]">Aktivitas Maksimal</span>
        </h1>
        <p className="text-base md:text-lg text-[#3d5e55] max-w-2xl mb-8">
          Temukan kost terbaik di sekitar kampus UNNES dengan fasilitas lengkap dan harga yang sesuai dengan kantong mahasiswa.
        </p>
        
        {/* Search Bar */}
        <div className="w-full max-w-2xl bg-white rounded-full p-2 shadow-md border border-[#cce4da] flex items-center">
          <div className="pl-4 text-gray-400">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Cari nama kost atau jalan..." 
            className="w-full pl-3 pr-4 py-3 text-sm text-[#0d2b22] bg-transparent focus:outline-none placeholder-gray-400"
          />
          <button className="bg-[#246652] text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-[#1a4d3e] transition-colors whitespace-nowrap">
            Cari Sekarang
          </button>
        </div>
      </section>

      {/* 3. CARA KERJA SECTION */}
      <section id="how" className="py-12 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-3 py-1 bg-[#d6efe8] text-[#246652] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            Cara Kerja
          </div>
          <h2 className="text-3xl font-extrabold text-[#0d2b22]">Mudah Dalam 3 Langkah</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Langkah 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#cce4da] text-center shadow-sm">
            <div className="w-12 h-12 bg-[#f0f9f5] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-[#246652]">1</div>
            <h3 className="font-bold text-lg mb-2">Cari Kost</h3>
            <p className="text-sm text-[#3d5e55]">Masukkan lokasi atau nama kost yang kamu inginkan di kolom pencarian.</p>
          </div>
          {/* Langkah 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#cce4da] text-center shadow-sm">
            <div className="w-12 h-12 bg-[#f0f9f5] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-[#246652]">2</div>
            <h3 className="font-bold text-lg mb-2">Filter Kebutuhan</h3>
            <p className="text-sm text-[#3d5e55]">Saring berdasarkan harga, jarak, fasilitas, dan kapasitas kamar.</p>
          </div>
          {/* Langkah 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#cce4da] text-center shadow-sm">
            <div className="w-12 h-12 bg-[#f0f9f5] rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold text-[#246652]">3</div>
            <h3 className="font-bold text-lg mb-2">Hubungi Pemilik</h3>
            <p className="text-sm text-[#3d5e55]">Langsung hubungi pemilik untuk survey lokasi atau booking langsung.</p>
          </div>
        </div>
      </section>

      {/* 4. FILTER PENCARIAN KOST */}
      <section className="py-12 px-6 max-w-6xl mx-auto" id="cari-kost">
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-[#cce4da]">
          
          <div className="flex items-center gap-2 text-lg font-bold text-[#0d2b22] mb-6 border-b pb-3 border-[#cce4da]">
            <span>⚙️</span> Filter Pencarian
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Harga per Bulan */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#0d2b22] mb-2 uppercase tracking-wide">Harga per Bulan</label>
              <select className="w-full bg-[#f0f9f5] border border-[#cce4da] text-[#3d5e55] rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#246652] cursor-pointer">
                <option>Semua Harga</option>
                <option>Di bawah Rp 500.000</option>
                <option>Rp 500.000 – 750.000</option>
                <option>Rp 750.000 – 1.000.000</option>
                <option>Di atas Rp 1.000.000</option>
              </select>
            </div>

            {/* 2. Jarak dari Unnes */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#0d2b22] mb-2 uppercase tracking-wide">Jarak dari Unnes</label>
              <select className="w-full bg-[#f0f9f5] border border-[#cce4da] text-[#3d5e55] rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#246652] cursor-pointer">
                <option>Semua Jarak</option>
                <option>Kurang dari 500 m</option>
                <option>500 m – 1 km</option>
                <option>1 km – 2 km</option>
                <option>Lebih dari 2 km</option>
              </select>
            </div>

            {/* 3. Fasilitas Kamar */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#0d2b22] mb-2 uppercase tracking-wide">Fasilitas Kamar</label>
              <select className="w-full bg-[#f0f9f5] border border-[#cce4da] text-[#3d5e55] rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#246652] cursor-pointer">
                <option>Semua Fasilitas</option>
                <option>AC</option>
                <option>Kamar Mandi Dalam</option>
                <option>AC + Kamar Mandi Dalam</option>
                <option>Kasur + Lemari</option>
              </select>
            </div>

            {/* 4. Kapasitas per Kamar */}
            <div className="flex flex-col">
              <label className="text-xs font-bold text-[#0d2b22] mb-2 uppercase tracking-wide">Kapasitas per Kamar</label>
              <select className="w-full bg-[#f0f9f5] border border-[#cce4da] text-[#3d5e55] rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-[#246652] cursor-pointer">
                <option>Semua Kapasitas</option>
                <option>1 Orang</option>
                <option>2 Orang</option>
                <option>3 Orang ke atas</option>
              </select>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}

export default App;