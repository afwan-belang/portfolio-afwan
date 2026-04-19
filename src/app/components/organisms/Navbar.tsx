'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { quarticOut } from '@/lib/utils';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');

  // Logika Scroll Spy (Mendeteksi bagian mana yang sedang dilihat di layar)
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['projects', 'experience', 'ai-playground'];
      let current = '';

      // Jika scroll masih di atas (di area Hero), matikan semua indikator menu
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Offset 200px agar menu aktif sebelum elemen menyentuh atas layar persis
          if (rect.top <= 200 && rect.bottom >= 200) {
            current = section;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Jalankan sekali saat pertama kali render

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' }, // Jika bagian ini belum ada di page.tsx, buat id="experience" nanti
    { name: 'AI Twin', id: 'ai-playground' },
  ];

  // Fungsi untuk scroll halus saat menu diklik (dengan kompensasi tinggi Navbar)
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Menghitung posisi Y dikurangi 100px agar konten tidak tertutup Navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: quarticOut }}
      className="fixed top-0 w-full z-50 bg-[#0b1326]/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_15px_rgba(45,212,191,0.05)]"
    >
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        
        {/* Logo (Kembali ke Atas) */}
        <Link 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl font-bold tracking-tighter text-primary cursor-pointer hover:opacity-80 transition-opacity"
        >
          DevArchitect
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`tracking-tight transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-primary border-b-2 border-primary pb-1 font-medium'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Terminal className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer w-6 h-6 hidden sm:block" />
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-bold px-6 py-2 rounded-md hover:scale-95 duration-200 transition-all shadow-lg shadow-primary/20">
            Hire Me
          </button>
        </div>
      </div>
    </motion.nav>
  );
}