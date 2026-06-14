import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ isOpen, onClose }) {
  // Jika modal tidak disuruh buka, jangan tampilkan apa-apa
  if (!isOpen) return null;

  const { signUp, signIn } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fungsi handle ketika tombol submit diklik
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validasi input kosong
    if (!email || !password) {
      setError("Email dan password wajib diisi!");
      setLoading(false);
      return;
    }

    try {
      if (isRegister) {
        // 1. Proses Daftar ke Supabase
        await signUp(email, password);

        // 🛠️ LOGIKA BARU: Paksa logout setelah daftar agar tidak langsung masuk ke Home
        const { supabase } = await import("../utils/supabase");
        await supabase.auth.signOut();

        // 2. Beri notifikasi sukses
        alert("Pendaftaran berhasil! Silakan masuk menggunakan akun yang baru dibuat.");

        // 3. Reset input password & langsung pindahkan ke tab "Masuk"
        setPassword("");
        setIsRegister(false);
      } else {
        // Proses Login ke Supabase
        await signIn(email, password);
        alert("Login berhasil!");
        onClose(); // Tutup modal setelah sukses login
      }
    } catch (err) {
      // Tangkap error jika email tidak valid atau password kurang dari 6 karakter
      setError(err.message || "Terjadi kesalahan, silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Tombol Close (X) */}
        <button type="button" onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 font-bold text-lg">
          ✕
        </button>

        {/* Tab Navigasi: Masuk / Daftar Akun */}
        <div className="mb-6 flex border-b border-gray-200 text-sm font-medium">
          <button
            type="button"
            className={`w-1/2 pb-3 text-center transition-all ${!isRegister ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-500"}`}
            onClick={() => {
              setIsRegister(false);
              setError("");
            }}
          >
            Masuk
          </button>
          <button
            type="button"
            className={`w-1/2 pb-3 text-center transition-all ${isRegister ? "border-b-2 border-indigo-600 font-bold text-indigo-600" : "text-gray-500"}`}
            onClick={() => {
              setIsRegister(true);
              setError("");
            }}
          >
            Daftar Akun
          </button>
        </div>

        {/* Kotak Pesan Error */}
        {error && <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-xs font-semibold text-red-600">⚠️ {error}</div>}

        {/* Form Authentikasi */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email anda"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Masukkan password anda"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              required
            />
          </div>

          <button type="submit" disabled={loading} className="w-full mt-4 rounded-xl bg-indigo-600 py-3 font-bold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700 disabled:bg-indigo-400">
            {loading ? "Memproses..." : isRegister ? "Daftar Sekarang" : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
