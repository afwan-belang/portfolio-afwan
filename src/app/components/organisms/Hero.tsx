'use client';

import { motion } from 'framer-motion';
import { Database, Gauge } from 'lucide-react';
import { quarticOut } from '@/lib/utils';
import Image from "next/image"
import FotoProfile from "../../../assets/images/FotoProfile.png"
import Text3DFlip from "../../../../src/components/ui/text-3d-flip"

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 min-h-[100dvh] grid lg:grid-cols-2 gap-10 md:gap-16 items-center pt-24 pb-12 relative z-10">

      {/* Kolom Kiri: Teks & Tech Stack */}
      {/* UPDATE: Mengubah space-y-8 menjadi space-y-6 agar jarak antar teks lebih padat */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: quarticOut }}
        className="space-y-6 md:space-y-8"
      >
        <div className="inline-block px-3 py-1 rounded-full bg-secondary-container/30 border border-outline-variant/30 text-on-secondary-container text-[0.75rem] uppercase tracking-[0.1em] font-medium backdrop-blur-md">
          Open to Work
        </div>

        {/* Typografi Hero dengan efek MagicUI Text3DFlip */}
        <div className="text-4xl sm:text-5xl md:text-[3.5rem] leading-[1.1] font-extrabold tracking-[-0.04em]">
          <span className="text-on-surface block mb-2">Crafting</span>
          <Text3DFlip
            className="font-sans"
            textClassName="text-on-surface-variant opacity-80"
            flipTextClassName="text-primary shimmer-text drop-shadow-[0_0_15px_rgba(87,241,219,0.3)]"
            rotateDirection="top"
            staggerDuration={0.03}
            staggerFrom="first"
            transition={{ type: "spring", damping: 25, stiffness: 160 }}
          >
            High-Performance Stable Web Experiences
          </Text3DFlip>
        </div>

        <p className="text-on-surface-variant text-base md:text-lg leading-relaxed max-w-lg">
          A Full-Stack Developer dedicated to architectural excellence. Building scalable systems with precise digital craftsmanship and ethereal aesthetics.
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-3 pt-2">
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
      {/* UPDATE: Menambahkan mx-auto dan max-w-[420px] agar kotak tidak raksasa di layar desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: quarticOut }}
        className="relative group mt-8 lg:mt-0 mx-auto w-full max-w-[360px] md:max-w-[420px]"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-primary/10 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Main Avatar / Visual Box */}
        {/* UPDATE: Mengurangi padding dari p-8 menjadi p-4 agar foto terlihat lebih proporsional dengan bingkainya */}
        <div className="relative w-full aspect-square glass-card rounded-[2rem] overflow-hidden flex items-center justify-center p-4 md:p-5 border border-primary/20 group-hover:border-primary/40 transition-colors duration-500 shadow-2xl">
          <div className="relative w-full h-full rounded-xl overflow-hidden shadow-inner bg-surface-container-highest">
            <Image
              src={FotoProfile}
              alt="Foto Profile"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover object-center rounded-xl"
            />
          </div>
        </div>

        {/* Asymmetrical Floating Element (Lighthouse Score) */}
        {/* UPDATE: Memperkecil p-6 menjadi p-4, dan mengecilkan ukuran teks agar lebih rapi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 glass-card p-4 rounded-xl shadow-2xl hidden sm:block border border-primary/20 backdrop-blur-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
              <Gauge className="text-primary w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] md:text-xs text-on-surface-variant uppercase tracking-widest font-semibold">Optimized</div>
              <div className="text-base md:text-lg font-bold text-primary">99 Lighthouse</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}