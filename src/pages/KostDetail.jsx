import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext'; // Ambil state auth

export default function KostDetail() {
  const { isLoggedIn, login } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false); // State Modal Pop-up

  const kost = {
    title: "Kost Eksklusif Kebayoran Baru AC Dalam",
    type: "Campur",
    location: "Kebayoran Baru, Jakarta Selatan",
    price: 2500000,
    description: "Kost mewah berlokasi sangat strategis di area Kebayoran Baru. Dekat dengan stasiun MRT, pusat perbelanjaan, perkantoran Sudirman, dan berbagai kafe.",
    facilities: ["AC 1 PK", "WiFi High-Speed", "Kamar Mandi Dalam", "Water Heater"],
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1200&q=80"
  };

  // Fungsi Proteksi Checkout
 // Ganti fungsi lama kamu dengan ini
const handleBooking = () => {
  alert("🎉 Akses terverifikasi! Mengalihkan kamu ke halaman form pembayaran...");
};

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between relative">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        <section className="rounded-2xl overflow-hidden aspect-[21/9] bg-slate-200 mb-8 shadow-sm">
          <img src={kost.image} alt={kost.title} className="w-full h-full object-cover" />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <span className="bg-purple-100 text-purple-800 text-xs font-bold px-3 py-1 rounded-md">Kost {kost.type}</span>
              <h1 className="text-2xl font-extrabold text-slate-900 mt-3 mb-2">{kost.title}</h1>
              <p className="text-sm text-slate-500 mb-4">📍 {kost.location}</p>
              <hr className="border-slate-100 my-4" />
              <h2 className="text-lg font-bold text-slate-800 mb-3">Deskripsi Properti</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{kost.description}</p>
            </div>
          </section>

          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md sticky top-24 space-y-4">
              <div>
                <span className="text-xs text-slate-400">Harga Sewa</span>
                <p className="text-2xl font-black text-slate-900">
                  Rp {kost.price.toLocaleString('id-ID')} <span className="text-sm font-normal text-slate-500">/bulan</span>
                </p>
              </div>
              
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition flex justify-center items-center gap-2">
                <span>💬</span> Hubungi Pemilik
              </button>
              
              {/* Jalankan fungsi proteksi saat diklik */}
            </div>
          </aside>
        </div>
      </main>

      {/* ================= MODAL DIALOG AUTH (SEMANTIC & ACCESSIBLE) ================= */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full mx-4 shadow-2xl text-center border border-slate-100 animate-scale-up">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Yuk, Masuk Akun Dulu!</h3>
            <p className="text-sm text-slate-500 mb-6">
              Kamu harus masuk atau daftar akun terlebih dahulu sebelum bisa melakukan booking kost ini.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={() => {
                  login(); // Set user jadi masuk
                  setShowAuthModal(false); // Tutup modal
                }}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition"
              >
                Masuk Sekarang (Simulasi)
              </button>
              <button 
                onClick={() => setShowAuthModal(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium py-2.5 rounded-xl transition"
              >
                Nanti Saja
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}