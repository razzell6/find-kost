import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal'; // Import modal baru

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();

  const openAuthModal = (mode) => {
    setModalMode(mode);
    setModalOpen(true);
  };

  // Klik "Contact" -> scroll ke section #contact di Home
  const handleContactClick = (e) => {
    e.preventDefault();

    if (location.pathname === '/') {
      // Sudah di Home, langsung scroll smooth
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Belum di Home, pindah ke Home dulu + bawa hash #contact
      navigate('/#contact');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <span>FindKost</span>
        </Link>

        {/* Menu Navigasi */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
          <a
            href="#contact"
            onClick={handleContactClick}
            className="hover:text-indigo-600 transition cursor-pointer"
          >
            Contact
          </a>
        </div>

        {/* Tombol Aksi Kanan */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-700">👋 {user?.username}</span>
              <button
                onClick={logout}
                className="text-sm font-medium text-red-500 hover:text-red-700 transition"
              >
                Keluar
              </button>
            </div>
          ) : (
            <>
              {/* Tombol Masuk */}
              <button
                onClick={() => openAuthModal('login')}
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition"
              >
                Masuk
              </button>

              {/* Tombol Daftar */}
              <button
                onClick={() => openAuthModal('register')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-sm"
              >
                Daftar
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Tampilkan Modal Auth secara global di navbar */}
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialMode={modalMode}
      />
    </header>
  );
}