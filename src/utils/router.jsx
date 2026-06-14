import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import KostDetail from "../pages/KostDetail";
import AuthPage from "../pages/AuthPage";
import ProtectedRoute from "../components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/",
    element: <Home />, // ✅ Home bebas diakses siapa saja
  },
  {
    path: "/kost/:id",
    element: <KostDetail />, // 🛠️ PERBAIKAN: Pembungkus ProtectedRoute dihapus agar bisa diakses secara publik!
  },
]);
