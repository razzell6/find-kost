import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Ambil data user yang sedang login dari localStorage (jika ada) saat pertama kali load
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Fungsi Register (Daftar Akun Baru)
  const register = (username, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('kost_users')) || [];
    
    // Cek apakah username sudah dipakai
    const isUserExist = existingUsers.some((u) => u.username === username);
    if (isUserExist) {
      return { success: false, message: 'Username sudah terdaftar!' };
    }

    // Simpan user baru ke dalam array list
    const updatedUsers = [...existingUsers, { username, password }];
    localStorage.setItem('kost_users', JSON.stringify(updatedUsers));
    return { success: true, message: 'Registrasi berhasil! Silakan masuk.' };
  };

  // Fungsi Login (Masuk)
  const login = (username, password) => {
    const existingUsers = JSON.parse(localStorage.getItem('kost_users')) || [];
    
    // Cari user yang cocok dengan username dan password
    const validUser = existingUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (!validUser) {
      return { success: false, message: 'Username atau password salah!' };
    }

    // Jika cocok, simpan ke sesi aktif
    const sessionUser = { username: validUser.username };
    localStorage.setItem('currentUser', JSON.stringify(sessionUser));
    setUser(sessionUser);
    return { success: true };
  };

  // Fungsi Logout (Keluar)
  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);