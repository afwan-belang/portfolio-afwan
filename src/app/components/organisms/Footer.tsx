'use client';

import { Mail, Code2 } from 'lucide-react';

// --- KOMPONEN ICON CUSTOM ---
// Karena Lucide tidak lagi menyediakan logo brand, kita buat komponen SVG-nya secara manual.
// Kode ini sangat ringan, responsif, dan warnanya akan otomatis mengikuti Tailwind class kita!

const GithubIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.18-.3 6.5-1.5 6.5-7.17 0-1.6-.5-2.9-1.4-3.9.15-.35.6-1.85-.1-3.85 0 0-1.1-.35-3.6 1.35a12.8 12.8 0 0 0-6.6 0C6.3 3.5 5.2 3.85 5.2 3.85c-.7 2-.25 3.5-.1 3.85-.9 1-1.4 2.3-1.4 3.9 0 5.6 3.3 6.8 6.5 7.15a4.8 4.8 0 0 0-1 2.95v4.1" />
    <path d="M9 20.5c-3.1.9-4.7-1-4.7-1" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// --- KOMPONEN UTAMA FOOTER ---

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-outline-variant/15 bg-[#0b1326] pt-16 pb-8 overflow-hidden z-10">
      {/* Efek Cahaya Halus di Latar Belakang */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">

          {/* Kolom Kiri: Brand & Status */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-primary">
              <Code2 size={28} strokeWidth={1.5} />
              <span className="text-2xl font-black tracking-tighter">DevArchitect</span>
            </div>
            <p className="text-on-surface-variant max-w-sm leading-relaxed">
              Membangun sistem digital yang memadukan keindahan estetika dengan arsitektur kode yang kokoh. Mari bangun masa depan bersama.
            </p>

            {/* Indikator "Available for Work/PKL" */}
            <div className="flex items-center gap-3 w-fit px-4 py-2 rounded-full bg-surface-container-low border border-outline-variant/20 shadow-inner">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-xs font-bold text-on-surface uppercase tracking-widest">
                Available for Work & Internship
              </span>
            </div>
          </div>

          {/* Kolom Kanan: Social Links */}
          <div className="flex flex-col md:items-end justify-center space-y-4">
            {/* PERBAIKAN: Mengubah Let's menjadi Let&apos;s agar lolos pengecekan ESLint */}
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Let&apos;s Connect</p>
            <div className="flex gap-4">

              {/* Tombol GitHub */}
              <a
                href="https://github.com/afwan-belang"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card rounded-xl hover:bg-primary/10 hover:border-primary/40 text-on-surface-variant hover:text-primary transition-all duration-300 shadow-lg flex items-center justify-center"
                title="GitHub"
              >
                <GithubIcon size={20} />
              </a>

              {/* Tombol LinkedIn */}
              <a
                href="https://www.linkedin.com/in/muhammad-haikal-afwan-8a32b4332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card rounded-xl hover:bg-primary/10 hover:border-primary/40 text-on-surface-variant hover:text-primary transition-all duration-300 shadow-lg flex items-center justify-center"
                title="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>

              {/* Tombol Instagram */}
              <a
                href="https://www.instagram.com/muhammadhaikalafwan?igsh=MTdxeDFkYW13bGJ0ag=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass-card rounded-xl hover:bg-primary/10 hover:border-primary/40 text-on-surface-variant hover:text-primary transition-all duration-300 shadow-lg flex items-center justify-center"
                title="Instagram"
              >
                <InstagramIcon size={20} />
              </a>

              {/* Tombol Email */}
              <a
                href="mailto:muhammadhaikalafwan@gmail.com"
                className="p-3 glass-card rounded-xl hover:bg-primary/10 hover:border-primary/40 text-on-surface-variant hover:text-primary transition-all duration-300 shadow-lg flex items-center justify-center"
                title="Email Me"
              >
                <Mail size={20} />
              </a>

            </div>
          </div>
        </div>

        {/* Garis Bawah & Hak Cipta */}
        <div className="pt-8 border-t border-outline-variant/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] sm:text-xs font-mono text-on-surface-variant/60 tracking-widest uppercase">
          <p>© {currentYear} Haikal Afwan. All rights reserved.</p>
          <p>Crafted with Next.js in Bandung</p>
        </div>
      </div>
    </footer>
  );
}