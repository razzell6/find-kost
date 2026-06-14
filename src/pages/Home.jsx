import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Sesuaikan jika folder/nama file client kamu berbeda
import Navbar from '../components/Navbar';
import KostCard from '../components/KostCard';

export default function Home() {
  const [kosts, setKosts] = useState([]);
  const [filteredKosts, setFilteredKosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTipe, setSelectedTipe] = useState('Semua');

  // 1. Ambil data asli dari Supabase saat halaman dibuka
  useEffect(() => {
    async function fetchKosts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('kosts') // Sesuaikan nama tabel kamu di Supabase (kosts atau kost)
          .select('*');

        if (error) throw error;
        setKosts(data || []);
        setFilteredKosts(data || []);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchKosts();
  }, []);

  // 2. Fungsi Otomatis untuk Menyaring / Memfilter Kost saat user mengetik atau klik tombol
  useEffect(() => {
    let hasilSaring = kosts;

    // Filter berdasarkan teks pencarian (Nama Kost atau Alamat)
    if (searchQuery) {
      hasilSaring = hasilSaring.filter((kost) => {
        const nama = (kost.nama_kost || kost.title || '').toLowerCase();
        const alamat = (kost.alamat || kost.location || '').toLowerCase();
        return nama.includes(searchQuery.toLowerCase()) || alamat.includes(searchQuery.toLowerCase());
      });
    }

    // Filter berdasarkan Tipe Kost (Putra / Putri / Campur)
    if (selectedTipe !== 'Semua') {
      hasilSaring = hasilSaring.filter((kost) => {
        const tipe = kost.tipe || kost.type || 'Campur';
        return tipe.toLowerCase() === selectedTipe.toLowerCase();
      });
    }

    setFilteredKosts(hasilSaring);
  }, [searchQuery, selectedTipe, kosts]);

  // 3. Scroll otomatis ke section #contact kalau halaman dibuka dengan hash (misal dari Navbar di halaman lain)
  useEffect(() => {
    if (window.location.hash === '#contact') {
      const el = document.getElementById('contact');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 w-full block">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION / TEMPAT NYARI KOST */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 px-4 text-center block w-full">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">
            Cari Kost Impianmu di Sini
          </h1>
          <p className="text-blue-100 text-sm md:text-base mb-8 max-w-xl mx-auto">
            Temukan hunian kos yang nyaman, strategis, dan sesuai dengan budget kantongmu dengan mudah.
          </p>

          {/* Kotak Input Pencarian */}
          <div className="bg-white p-2 rounded-xl shadow-lg max-w-2xl mx-auto flex flex-col md:flex-row gap-2 items-center">
            <div className="flex items-center gap-2 px-3 py-2 w-full text-slate-800">
              <span className="text-xl">🔍</span>
              <input
                type="text"
                placeholder="Masukkan nama kost atau lokasi (contoh: Pogung, Sleman)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-sm md:text-base text-slate-700 placeholder-slate-400"
              />
            </div>
            <button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-lg transition text-sm shadow-md whitespace-nowrap">
              Cari Sekarang
            </button>
          </div>

          {/* Tombol Filter Cepat Kategori */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Semua', 'Putra', 'Putri', 'Campur'].map((tipe) => (
              <button
                key={tipe}
                onClick={() => setSelectedTipe(tipe)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                  selectedTipe === tipe
                    ? 'bg-white text-indigo-900 shadow'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {tipe}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DAFTAR KOST UTAMA */}
      <main className="max-w-7xl mx-auto px-4 py-12 block">
        <div className="flex justify-between items-baseline mb-6 border-b border-slate-200 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800">
            {selectedTipe !== 'Semua' ? `Rekomendasi Kost ${selectedTipe}` : 'Semua Rekomendasi Kost'}
          </h2>
          <span className="text-xs md:text-sm text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-full">
            Menampilkan {filteredKosts.length} kost
          </span>
        </div>

        {/* Status Loading saat nunggu data Supabase */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-slate-500 font-medium animate-pulse">Memuat data kost...</p>
          </div>
        ) : filteredKosts.length === 0 ? (
          /* Tampilan jika kost yang dicari atau difilter tidak ketemu */
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-200 p-8">
            <span className="text-4xl mb-3 block">⚠️</span>
            <p className="text-slate-700 font-bold mb-1">Kost Tidak Ditemukan</p>
            <p className="text-slate-400 text-xs max-w-xs mx-auto">
              Maaf, tidak ada kos-kosan yang cocok dengan kata kunci "{searchQuery}" atau filter tipe tersebut.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedTipe('Semua'); }}
              className="mt-4 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          /* Grid Card Kost */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredKosts.map((kost) => (
              <KostCard key={kost.id} kost={kost} />
            ))}
          </div>
        )}
      </main>

      {/* SECTION HUBUNGI KAMI / CONTACT */}
      <section id="contact" className="bg-white py-16 px-4 block w-full border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-bold tracking-widest text-indigo-600 border border-indigo-200 bg-indigo-50 rounded-full px-4 py-1 mb-4">
              HUBUNGI KAMI
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 leading-tight">
              Ada Pertanyaan? <br className="hidden md:block" />Kami Siap Membantu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Kiri: Info Kontak */}
            <div>
              <p className="text-slate-500 text-sm md:text-base mb-8 max-w-md">
                Tim FindKost siap membantu kamu menemukan kost terbaik. Jangan ragu untuk menghubungi kami kapan saja!
              </p>

              <div className="space-y-5 mb-8">
                {/* Telepon / WhatsApp */}
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-600 rounded-lg p-3 text-xl">📞</div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 tracking-wide">TELEPON / WHATSAPP</p>
                    <p className="text-slate-800 font-semibold">+62 812-3456-7890</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-600 rounded-lg p-3 text-xl">✉️</div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 tracking-wide">EMAIL</p>
                    <p className="text-slate-800 font-semibold">support@findkost.com</p>
                  </div>
                </div>

                {/* Area Layanan */}
                <div className="flex items-start gap-4">
                  <div className="bg-indigo-50 text-indigo-600 rounded-lg p-3 text-xl">📍</div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 tracking-wide">AREA LAYANAN</p>
                    <p className="text-slate-800 font-semibold">Sekitar Universitas Negeri Semarang</p>
                  </div>
                </div>
              </div>

              {/* Sosial Media */}
              <div className="flex gap-3">
                <a href="https://instagram.com/findkost" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition">📷 Instagram</a>
                <a href="https://tiktok.com/@findkost" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition">🎵 TikTok</a>
              </div>
            </div>

            {/* Kanan: Kartu Lokasi */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-10 text-center shadow-lg flex flex-col items-center justify-center min-h-[260px]">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-white text-xl md:text-2xl font-bold mb-1">Sekitar Unnes</h3>
              <p className="text-indigo-300 font-semibold text-sm md:text-base">Universitas Negeri Semarang</p>
              <p className="text-slate-400 text-xs md:text-sm mt-1">Kota Semarang, Jawa Tengah</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-12 px-4 block w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-white text-lg font-bold mb-3">FindKost</h3>
            <p className="text-sm text-slate-400 max-w-xs">
              Platform tepercaya penyedia info hunian kost terbaik, murah, aman, dan berfasilitas lengkap disekitar UNNES.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Pencarian Populer</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-indigo-400 transition">Kost Banaran</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Kost Sekaran</a></li>
              <li><a href="#" className="hover:text-indigo-400 transition">Kost Patemon</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Kontak Kami untuk mendaftarkan Kost</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Email: support@findkost.com</li>
              <li>WhatsApp: +62 812-3456-7890</li>
              <li>Instagram: @findkost</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}