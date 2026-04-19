import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background w-full py-12 border-t border-outline-variant/15 mt-32 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 max-w-7xl mx-auto gap-8 text-center md:text-left">
        <div className="text-lg font-black text-on-surface tracking-tighter">
          DevArchitect<span className="text-primary">.</span>
        </div>

        <div className="text-[0.75rem] uppercase tracking-[0.1em] font-medium text-on-surface-variant">
          © {new Date().getFullYear()} Muhammad Haikal Afwan. Built with Logic.
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <Link href="https://github.com" className="text-[0.75rem] uppercase tracking-[0.1em] font-medium text-on-surface-variant hover:text-primary transition-colors">Github</Link>
          <Link href="https://linkedin.com" className="text-[0.75rem] uppercase tracking-[0.1em] font-medium text-on-surface-variant hover:text-primary transition-colors">LinkedIn</Link>
          <Link href="#" className="text-[0.75rem] uppercase tracking-[0.1em] font-medium text-on-surface-variant hover:text-primary transition-colors">Resume</Link>
        </div>
      </div>
    </footer>
  );
}