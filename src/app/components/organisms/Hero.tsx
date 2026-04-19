'use client';

import { motion } from 'framer-motion';
import { Database, Gauge } from 'lucide-react';
import { quarticOut } from '@/lib/utils';
import Image from "next/image"
import FotoProfile from "../../../assets/images/FotoProfile.png"

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 mb-32 grid lg:grid-cols-2 gap-16 items-center pt-32 relative z-10">

      {/* Kolom Kiri: Teks & Tech Stack */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: quarticOut }}
        className="space-y-8"
      >
        <div className="inline-block px-3 py-1 rounded-full bg-secondary-container/30 border border-outline-variant/30 text-on-secondary-container text-[0.75rem] uppercase tracking-[0.1em] font-medium backdrop-blur-md">
          Open to Work
        </div>

        <h1 className="text-5xl md:text-[3.5rem] leading-[1.1] font-extrabold tracking-[-0.04em] text-on-surface">
          Crafting <span className="shimmer-text">High-Performance</span>, Stable Web Experiences
        </h1>

        <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
          A Full-Stack Developer dedicated to architectural excellence. Building scalable systems with precise digital craftsmanship and ethereal aesthetics.
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-4 pt-4">
          {['JavaScript', 'React', 'Node.js'].map((tech) => (
            <div key={tech} className="flex items-center gap-2 px-4 py-2 glass-card rounded-full hover:bg-white/5 transition-colors cursor-default">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-slate-200">{tech}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-full hover:bg-white/5 transition-colors cursor-default">
            <Database className="text-primary-container w-4 h-4" />
            <span className="text-sm font-medium text-slate-200">Express / Spring Boot</span>
          </div>
        </div>
      </motion.div>

      {/* Kolom Kanan: Visual & Asymmetrical Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: quarticOut }}
        className="relative group mt-12 lg:mt-0"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Main Avatar / Visual Box */}
        <div className="relative w-full aspect-square glass-card rounded-[2rem] overflow-hidden flex items-center justify-center p-8 border border-primary/20 group-hover:border-primary/40 transition-colors duration-500">
          {/* Karena kita belum punya gambar final, kita pakai gradien abstrak sebagai placeholder estetis */}
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner bg-surface-container-highest">
            {/* <span className="text-outline-variant text-sm font-mono tracking-widest">[ Visual Assets ]</span> */}
            <Image
              src={FotoProfile}
              alt="Foto Profile"
              fill
              priority /* Menandai bahwa ini gambar penting yang harus diload pertama kali (LCP optimization) */
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-center rounded-xl"
            />
          </div>
        </div>

        {/* Asymmetrical Floating Element (Lighthouse Score) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute -bottom-6 -right-6 glass-card p-6 rounded-2xl shadow-2xl hidden md:block border border-primary/20 backdrop-blur-2xl"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
              <Gauge className="text-primary w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Optimized</div>
              <div className="text-lg font-bold text-primary">99 Lighthouse</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}