'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { quarticOut } from '@/lib/utils';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Logika Scroll Spy & Deteksi Scroll Background
  useEffect(() => {
    const handleScroll = () => {
      // 1. Deteksi apakah sudah di-scroll ke bawah untuk merombak tampilan Navbar
      setIsScrolled(window.scrollY > 50);

      // 2. Target Section yang akan dilacak
      const sections = ['skills', 'projects', 'ai-playground'];
      let current = '';

      // Jika masih di paling atas layar, hilangkan status aktif
      if (window.scrollY < 100) {
        setActiveSection('');
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Offset 250px agar transisi warna menu terasa natural saat membaca
          if (rect.top <= 250 && rect.bottom >= 250) {
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
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'AI Twin', id: 'ai-playground' },
  ];

  // Fungsi untuk scroll halus dengan kompensasi tinggi Navbar melayang
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Offset -100px agar judul section tidak tertutup oleh navbar
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: quarticOut }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
        ? 'bg-[#0b1326]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_15px_rgba(87,241,219,0.05)] border-b border-outline-variant/15 py-3'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="flex justify-between items-center px-6 md:px-8 max-w-7xl mx-auto">

        {/* Logo (Kembali ke Atas) */}
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl font-black tracking-tighter text-primary cursor-pointer hover:opacity-80 transition-opacity"
        >
          DevArchitect
        </Link>

        {/* Desktop Menu Kapsul */}
        <div className="hidden md:flex gap-2 items-center bg-surface-container-low/40 px-3 py-1.5 rounded-full border border-outline-variant/20 backdrop-blur-md shadow-inner">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${activeSection === item.id
                ? 'bg-primary/10 text-primary drop-shadow-[0_0_8px_rgba(87,241,219,0.4)]'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5'
                }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Terminal className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer w-5 h-5 hidden sm:block" />
          <button className="bg-primary/10 border border-primary/30 text-primary font-bold px-6 py-2 rounded-full hover:bg-primary hover:text-[#0b1326] duration-300 transition-all shadow-lg shadow-primary/10 text-sm">
            Hire Me
          </button>
        </div>
      </div>
    </motion.nav>
  );
}