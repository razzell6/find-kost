import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();

  // Jika belum login, paksa pindah ke halaman auth
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  // Jika sudah login, izinkan akses ke halaman yang dituju
  return children;
}