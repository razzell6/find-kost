import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const { login, register } = useAuth();
  const [mode, setMode] = useState(initialMode); // 'login' atau 'register'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username || !password) {
      setError('Semua kolom wajib diisi!');
      return;
    }

    if (mode === 'login') {
      const result = login(username, password);
      if (result.success) {
        onClose(); // Tutup modal jika login berhasil
      } else {
        setError(result.message);
      }
    } else {
      const result = register(username, password);
      if (result.success) {
        setSuccess(result.message);
        setMode('login'); // Pindahkan otomatis ke tab login setelah daftar sukses
        setPassword('');
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-2xl max-w-sm w-full mx-4 shadow-2xl border border-slate-100 relative">
        {/* Tombol Close */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold"
        >
          ✕
        </button>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 mb-6">
          <button
            onClick={() => { setMode('login'); setError(''); setSuccess(''); }}
            className={`w-1/2 pb-3 text-sm font-bold transition-colors ${mode === 'login' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-400'}`}
          >
            Masuk
          </button>
          <button
            onClick={() => { setMode('register'); setError(''); setSuccess(''); }}
            className={`w-1/2 pb-3 text-sm font-bold transition-colors ${mode === 'register' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-400'}`}
          >
            Daftar Akun
          </button>
        </div>

        {/* Alert Pesan Error / Sukses */}
        {error && <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-lg mb-4">{error}</div>}
        {success && <div className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs p-3 rounded-lg mb-4">{success}</div>}

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan username"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition mt-2 shadow-md shadow-indigo-100"
          >
            {mode === 'login' ? 'Masuk Sekarang' : 'Daftar Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
}