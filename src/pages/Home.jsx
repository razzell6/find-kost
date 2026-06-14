import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase'; // Pastikan path ini benar
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import KostCard from '../components/KostCard';

export default function Home() {
  const [kosts, setKosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKosts = async () => {
      setLoading(true);
      // Mengambil data dari tabel 'kosts'
      const { data, error } = await supabase.from('kosts').select('*');
      
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setKosts(data || []);
      }
      setLoading(false);
    };

    fetchKosts();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Daftar Kost</h2>
        
        {loading ? (
          <p>Memuat data...</p>
        ) : kosts.length === 0 ? (
          <p>Belum ada data kost di database.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {kosts.map((kost) => (
              <KostCard key={kost.id} kost={kost} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}