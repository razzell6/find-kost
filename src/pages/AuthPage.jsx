import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  // 🛠️ FIX 1: Ambil signUp dan signIn dari AuthContext
  const { signUp, signIn } = useAuth();
  const navigate = useNavigate();

  // State Kontrol Tampilan & Input
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Fungsi yang dipanggil saat Form di-Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email dan password wajib diisi!");
      return;
    }

    if (isRegister) {
      if (!name || !confirmPassword) {
        setError("Semua kolom wajib diisi!");
        return;
      }
      if (password !== confirmPassword) {
        setError("Konfirmasi password tidak cocok!");
        return;
      }

      // 🛠️ FIX 2: Proses Register menggunakan signUp dengan try...catch
      try {
        await signUp(email, password);
        alert("Pendaftaran berhasil! Silakan cek email kamu jika Supabase memerlukan verifikasi.");
        setIsRegister(false); // Pindahkan user ke halaman login setelah daftar
      } catch (err) {
        setError(err.message || "Gagal mendaftar akun baru.");
      }
      return;
    }

    // 🛠️ FIX 3: Proses Login menggunakan signIn dengan try...catch
    try {
      await signIn(email, password);
      navigate("/"); // Navigasi ke halaman utama jika sukses
    } catch (err) {
      setError(err.message || "Email atau password salah.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 border border-slate-200">
        {/* Header Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-indigo-600 tracking-tight">FindKost</h1>
          <p className="text-slate-500 text-sm mt-1">{isRegister ? "Buat akun untuk mencari kost idaman" : "Masuk untuk menjelajahi ribuan kost"}</p>
        </div>

        {/* Kotak Error jika Validasi Gagal */}
        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold p-3 rounded-lg mb-4">⚠️ {error}</div>}

        {/* Elemen Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama lengkap"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="nama@email.com" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
          </div>

          {/* Kolom Konfirmasi Password tambahan untuk pendaftaran */}
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Konfirmasi Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition mt-2 shadow-md shadow-indigo-100">
            {isRegister ? "Daftar Akun Baru" : "Masuk Sekarang"}
          </button>
        </form>

        {/* Navigasi Pindah Mode (Masuk / Daftar) */}
        <div className="text-center mt-6 pt-4 border-t border-slate-100 text-sm text-slate-600">
          {isRegister ? (
            <p>
              Sudah punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(false);
                  setError("");
                }}
                className="text-indigo-600 font-bold hover:underline"
              >
                Masuk di sini
              </button>
            </p>
          ) : (
            <p>
              Belum punya akun?{" "}
              <button
                type="button"
                onClick={() => {
                  setIsRegister(true);
                  setError("");
                }}
                className="text-indigo-600 font-bold hover:underline"
              >
                Daftar baru
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
