export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-4">FindKost</h3>
          <p className="text-sm text-slate-400 max-w-sm">
            Platform tepercaya penyedia info hunian kost terbaik, murah, aman, dan berfasilitas lengkap di Indonesia.
          </p>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Pencarian Populer</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition">Kost Jakarta Selatan</a></li>
            <li><a href="#" className="hover:text-white transition">Kost Yogyakarta Dekat UGM</a></li>
            <li><a href="#" className="hover:text-white transition">Kost Bandung Murah</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-sm font-semibold mb-4">Kontak Kami</h4>
          <p className="text-sm text-slate-400">Email: support@findkost.com</p>
          <p className="text-sm text-slate-400 mt-1">Grogol, Jakarta Barat, Indonesia</p>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} FindKost. All rights reserved.
      </div>
    </footer>
  );
}