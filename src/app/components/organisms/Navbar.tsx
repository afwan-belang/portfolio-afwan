'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Terminal } from 'lucide-react';
import { quarticOut } from '@/lib/utils';

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: quarticOut }}
      className="fixed top-0 w-full z-50 bg-[#0b1326]/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_15px_rgba(45,212,191,0.05)]"
    >
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tighter text-teal-400">
          DevArchitect
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="#projects" className="text-teal-400 border-b-2 border-teal-400 pb-1 tracking-tight">
            Projects
          </Link>
          <Link href="#experience" className="text-slate-400 hover:text-teal-200 transition-colors tracking-tight">
            Experience
          </Link>
          <Link href="#ai-playground" className="text-slate-400 hover:text-teal-200 transition-colors tracking-tight">
            AI Twin
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Terminal className="text-slate-400 hover:text-primary transition-colors cursor-pointer w-6 h-6 hidden sm:block" />
          <button className="bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-bold px-6 py-2 rounded-md hover:scale-95 duration-200 transition-all shadow-lg shadow-primary/20">
            Hire Me
          </button>
        </div>
      </div>
    </motion.nav>
  );
}