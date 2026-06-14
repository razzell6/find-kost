import { Link } from 'react-router-dom';

export default function KostCard({ kost }) {
  // Hubungkan variabel frontend dengan nama kolom di Supabase kamu
  const namaKost = kost.nama_kost || kost.title;
  const hargaKost = kost.harga !== undefined ? kost.harga : (kost.price || 0);
  const tipeKost = kost.tipe || kost.type || 'Campur';
  const ratingKost = kost.rating || 4.5;
  const fasilitasKost = kost.fasilitas || kost.facilities || [];
  const lokasiKost = kost.alamat || kost.location;

  return (
    <article className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition flex flex-col">
      {/* Gambar Kost */}
      <figure className="relative aspect-[4/3] w-full bg-slate-200 overflow-hidden">
        <img 
          src={kost.image || 'https://via.placeholder.com/400x300'} 
          alt={namaKost}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
          loading="lazy"
        />
        {/* Badge Tipe Kost */}
        <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md text-white shadow-sm ${
          tipeKost === 'Putra' ? 'bg-blue-600' : tipeKost === 'Putri' ? 'bg-pink-600' : 'bg-purple-600'
        }`}>
          {tipeKost}
        </span>
      </figure>

      {/* Konten Detail */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
          <span>{lokasiKost}</span>
          <span>•</span>
          <span className="text-amber-500">⭐ {ratingKost}</span>
        </div>

        <h3 className="font-bold text-slate-800 text-base line-clamp-1 mb-2">
          <Link to={`/kost/${kost.id}`} className="hover:text-indigo-600 transition">
            {namaKost}
          </Link>
        </h3>

        {/* Fasilitas Singkat */}
        <div className="flex flex-wrap gap-2 mb-4 text-xs text-slate-500">
          {fasilitasKost && fasilitasKost.length > 0 ? (
            fasilitasKost.map((fac, idx) => (
              <span key={idx} className="bg-slate-100 px-2 py-1 rounded">
                {fac}
              </span>
            ))
          ) : (
            <span className="text-slate-400 italic">Belum ada info fasilitas</span>
          )}
        </div>

        {/* Harga */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-slate-400">Mulai</span>
            <p className="text-base font-extrabold text-slate-900">
              Rp {hargaKost.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-500">/bln</span>
            </p>
          </div>
          <Link 
            to={`/kost/${kost.id}`} 
            className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 font-bold px-3 py-2 rounded-lg transition"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </article>
  );
}