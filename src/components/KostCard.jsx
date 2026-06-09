import { Link } from 'react-router-dom';

export default function KostCard({ kost }) {
  return (
    <article className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition flex flex-col">
      {/* Gambar Kost */}
      <figure className="relative aspect-[4/3] w-full bg-slate-200 overflow-hidden">
        <img 
          src={kost.image} 
          alt={kost.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
          loading="lazy"
        />
        {/* Badge Tipe Kost */}
        <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md text-white shadow-sm ${
          kost.type === 'Putra' ? 'bg-blue-600' : kost.type === 'Putri' ? 'bg-pink-600' : 'bg-purple-600'
        }`}>
          {kost.type}
        </span>
      </figure>

      {/* Konten Detail */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-1">
          <span>{kost.location}</span>
          <span>•</span>
          <span className="text-amber-500">⭐ {kost.rating}</span>
        </div>

        <h3 className="font-bold text-slate-800 text-base line-clamp-1 mb-2">
          <Link to={`/kost/${kost.id}`} className="hover:text-indigo-600 transition">
            {kost.title}
          </Link>
        </h3>

        {/* Fasilitas Singkat */}
        <div className="flex gap-2 mb-4 text-xs text-slate-500">
          {kost.facilities.map((fac, idx) => (
            <span key={idx} className="bg-slate-100 px-2 py-1 rounded">
              {fac}
            </span>
          ))}
        </div>

        {/* Harga */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-baseline justify-between">
          <div>
            <span className="text-xs text-slate-400">Mulai</span>
            <p className="text-base font-extrabold text-slate-900">
              Rp {kost.price.toLocaleString('id-ID')} <span className="text-xs font-normal text-slate-500">/bln</span>
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