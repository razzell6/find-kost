import React, { useState, useEffect } from 'react';
import './index.css';

// Data Kost disimpan dalam array objek agar dinamis dan mudah dikelola
const DATAKOST = [
  {
    id: 1,
    category: 'Kost Putra',
    typeBadge: 'Putra',
    badgeBg: '#1a4d3e',
    title: 'Kost Putra Abadi',
    location: 'Kec. Temanggung',
    price: 'Rp 750.000',
    rating: '4.8',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    tags: ['Kamar Mandi Dalam', 'WiFi', 'AC'],
    desc: 'Kost putra strategis yang terletak dekat dengan pusat kota dan fasilitas umum. Lingkungan sangat tenang, bersih, dan mendukung produktivitas Anda.'
  },
  {
    id: 2,
    category: 'Kost Putri',
    typeBadge: 'Putri',
    badgeBg: '#b22222',
    title: 'Kost Putri Melati',
    location: 'Kec. Kranggan',
    price: 'Rp 500.000',
    rating: '4.6',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80',
    tags: ['Kamar Mandi Luar', 'WiFi', 'Dapur'],
    badgeColor: '#b22222',
    desc: 'Kost khusus putri dengan lingkungan yang aman dan nyaman. Dilengkapi dengan sistem keamanan yang baik serta akses dekat ke area kuliner.'
  },
  {
    id: 3,
    category: 'Kost Campur',
    typeBadge: 'Campur',
    badgeBg: '#f27438',
    title: 'Kost Eksklusif Harmoni',
    location: 'Kec. Parakan',
    price: 'Rp 1.200.000',
    rating: '4.9',
    image: 'https://images.unsplash.com/photo-1522771731470-421715e4f509?auto=format&fit=crop&w=600&q=80',
    tags: ['Kamar Mandi Dalam', 'AC', 'Parkir Luas'],
    desc: 'Hunian premium dengan fasilitas lengkap setara apartemen. Sangat cocok bagi mahasiswa maupun pekerja yang mendambakan kenyamanan optimal.'
  }
];

function App() {
  // State untuk interaktivitas filter, modal, dan navbar
  const [activeFilter, setActiveFilter] = useState('Semua');
  const [selectedKost, setSelectedKost] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efek untuk mengubah style navbar saat halaman digulir (scroll)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memfilter data kost berdasarkan kategori chip yang aktif
  const filteredKost = activeFilter === 'Semua' 
    ? DATAKOST 
    : DATAKOST.filter(kost => kost.category === activeFilter);

  return (
    <div className="w-full">
      {/* ════════════════ NAV BAR ════════════════ */}
      <nav id="navbar" className={`navbar ${isScrolled ? 'scrolled' : 'at-hero'}`}>
        <div className="container nav-inner">
          <div className="logo">
            <div className="logo-mark">F</div>
            <div className="logo-name">Find<b>Kost</b></div>
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#cari-kost">Cari Kost</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* ════════════════ HERO SECTION ════════════════ */}
      <section id="home" className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <span className="tag">Solusi Hunian Terbaik</span>
            <h1 className="hero-title">
              Hunian Nyaman untuk <span className="italic">Aktivitas Maksimal</span>
            </h1>
            <p className="hero-desc">
              Temukan berbagai pilihan kost terbaik di sekitar lokasi Anda dengan fasilitas lengkap dan harga transparan langsung dari pemiliknya.
            </p>
            <div className="search-bar">
              <div className="search-input-group">
                <span className="search-icon">📍</span>
                <input type="text" placeholder="Masukkan lokasi, nama daerah atau kampus..." />
              </div>
              <button className="search-btn">Cari Sekarang</button>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-img-backdrop"></div>
            <img 
              src="https://images.unsplash.com/photo-1244474744-bb3c366157fd?auto=format&fit=crop&w=800&q=80" 
              alt="FindKost Main Visual" 
              className="hero-img"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80";
              }}
            />
          </div>
        </div>
      </section>

      {/* ════════════════ HOW IT WORKS SECTION ════════════════ */}
      <section id="how-it-works" className="section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="tag">Panduan</span>
            <h2 className="section-title">Cara Mudah Temukan Kost</h2>
            <p className="section-desc">Tiga langkah sederhana untuk memulai perjalan baru Anda di tempat hunian yang ideal.</p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <h3 className="step-title">Pilih Lokasi & Fasilitas</h3>
              <p className="step-desc">Gunakan filter pencarian untuk menemukan hunian kost yang ideal di area strategis.</p>
            </div>
            <div className="step-card">
              <div className="step-num">02</div>
              <h3 className="step-title">Hubungi Pemilik</h3>
              <p className="step-desc">Lakukan konfirmasi langsung mengenai ketersediaan kamar secara transparan tanpa perantara.</p>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <h3 className="step-title">Mulai Sewa</h3>
              <p className="step-desc">Selesaikan proses administrasi dan Anda siap menempati kamar kost baru Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ CARI KOST SECTION ════════════════ */}
      <section id="cari-kost" className="section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Eksplorasi</span>
            <h2 className="section-title">Cari Kost Sesuai Kebutuhanmu</h2>
            <p className="section-desc">
              Temukan kost yang paling pas dengan budget dan gaya hidupmu. Gunakan filter di bawah ini.
            </p>
          </div>
          
          {/* Komponen Filter Kategori Chips */}
          <div className="chips-container">
            <div className="chips">
              {['Semua', 'Kost Putra', 'Kost Putri', 'Kost Campur'].map((item) => (
                <button 
                  key={item}
                  className={`chip ${activeFilter === item ? 'active' : ''}`}
                  onClick={() => setActiveFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Kost Cards */}
          <div className="kost-grid">
            {filteredKost.map((kost) => (
              <div 
                key={kost.id} 
                className="kost-card"
                onClick={() => setSelectedKost(kost)}
                style={{ cursor: 'pointer' }}
              >
                <div className="kost-img-wrapper">
                  <span className="kost-type-badge" style={{ backgroundColor: kost.badgeBg }}>
                    {kost.typeBadge}
                  </span>
                  <img src={kost.image} alt={kost.title} />
                </div>
                <div className="kost-content">
                  <div>
                    <div className="kost-tags">
                      {kost.tags.map((tag, idx) => (
                        <span key={idx} className="kost-tag">{tag}</span>
                      ))}
                    </div>
                    <h3 className="kost-title">{kost.title}</h3>
                    <div className="kost-location">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {kost.location}
                    </div>
                  </div>
                  <div className="kost-footer">
                    <div className="kost-price"><b>{kost.price}</b> / Bulan</div>
                    <div className="kost-rating">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                      {kost.rating}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ FEATURES SECTION ════════════════ */}
      <section className="features-section section bg-light">
        <div className="container">
          <div className="section-header">
            <span className="tag">Keunggulan</span>
            <h2 className="section-title">Fitur Utama di FindKost</h2>
            <p className="section-desc">Nikmati berbagai kemudahan mencari hunian dengan fitur andalan kami.</p>
          </div>
          <div className="features-grid">
            <div className="feature-box">
              <div className="feat-icon">🛏️</div>
              <h3 className="feat-title">Fasilitas Lengkap</h3>
              <p className="feat-desc">Informasi fasilitas kamar dan area bersama yang super detail.</p>
            </div>
            <div className="feature-box">
              <div className="feat-icon">📍</div>
              <h3 className="feat-title">Lokasi Strategis</h3>
              <p className="feat-desc">Cari kost dekat kampus, kantor, atau pusat perbelanjaan.</p>
            </div>
            <div className="feature-box">
              <div className="feat-icon">💰</div>
              <h3 className="feat-title">Harga Transparan</h3>
              <p className="feat-desc">Tanpa biaya tersembunyi, sesuai dengan budget mahasiswa.</p>
            </div>
            <div className="feature-box">
              <div className="feat-icon">🛡️</div>
              <h3 className="feat-title">Keamanan Terjamin</h3>
              <p className="feat-desc">Kost terverifikasi dengan lingkungan yang aman dan nyaman.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ CONTACT SECTION ════════════════ */}
      <section id="contact" className="section">
        <div className="container">
          <div className="section-header">
            <span className="tag">Hubungi Kami</span>
            <h2 className="section-title">Punya Pertanyaan?</h2>
            <p className="section-desc">Tim support kami siap membantu menjawab kebingungan atau kendala teknis Anda.</p>
          </div>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <form className="search-bar" style={{ padding: '24px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }} onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Nama Lengkap Anda" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
              <input type="email" placeholder="Alamat Email" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }} />
              <textarea placeholder="Pesan atau pertanyaan Anda..." rows="4" style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ddd', resize: 'none' }}></textarea>
              <button className="search-btn" style={{ width: '100%', borderRadius: '6px' }}>Kirim Pesan</button>
            </form>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer className="footer" style={{ background: '#0d2b22', color: '#b2dece', padding: '40px 0', fontSize: '14px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#fff' }}>FindKost</span>
            <p style={{ marginTop: '8px', opacity: 0.8 }}>© 2026 FindKost. Seluruh hak cipta dilindungi.</p>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>Kebijakan Privasi</a>
            <a href="#home" style={{ color: 'inherit', textDecoration: 'none' }}>Syarat & Ketentuan</a>
          </div>
        </div>
      </footer>

      {/* ════════════════ DETAIL MODAL DIALOG ════════════════ */}
      {selectedKost && (
        <div id="modal" className="modal open" onClick={() => setSelectedKost(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedKost(null)}>×</button>
            <div className="modal-body-layout">
              <div className="modal-graphic">
                <img src={selectedKost.image} alt={selectedKost.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="modal-info">
                <span className="tag" style={{ backgroundColor: selectedKost.badgeBg, color: '#fff' }}>{selectedKost.typeBadge}</span>
                <h2 className="modal-title" style={{ marginTop: '12px' }}>{selectedKost.title}</h2>
                <p className="kost-location" style={{ margin: '8px 0 16px' }}>📍 {selectedKost.location}</p>
                <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>{selectedKost.desc}</p>
                
                <h4 style={{ marginBottom: '8px', fontWeight: 'bold' }}>Fasilitas Tersedia:</h4>
                <div className="kost-tags" style={{ marginBottom: '24px' }}>
                  {selectedKost.tags.map((tag, idx) => (
                    <span key={idx} className="kost-tag" style={{ fontSize: '13px', padding: '6px 12px' }}>{tag}</span>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #eee' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#888' }}>Harga Sewa</span>
                    <div style={{ fontSize: '20px', color: '#0d2b22' }}><b>{selectedKost.price}</b> <span style={{ fontSize: '14px', color: '#666' }}>/bln</span></div>
                  </div>
                  <button className="search-btn" style={{ padding: '12px 24px' }} onClick={() => alert('Menghubungi pemilik kost via WhatsApp...')}>
                    Hubungi Pemilik
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;