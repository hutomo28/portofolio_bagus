'use client';

import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="py-10 border-t"
      style={{
        background: 'var(--color-dark)',
        borderColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded border border-white/20 flex items-center justify-center font-mono text-[10px] font-bold text-[#8B6F5E] bg-white/5">
              BH
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-xs font-bold tracking-[0.24em] text-white uppercase"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                BAGOES HUTOMO
              </span>
              <span className="text-[10px] font-mono tracking-[0.2em] text-[#666666] uppercase mt-0.5">
                PERSONAL PRODUCTION ARCHIVE
              </span>
            </div>
          </div>

          {/* Credits and role disclaimer */}
          <div className="text-center md:text-left">
            <p className="text-xs font-mono text-[#777777]">
              © {currentYear} Bagoes Hutomo · Behind The Scenes Crew
            </p>
            <p className="text-[11px] text-[#555555] mt-0.5">
              Camera Assistant · Production Assistant · Gaffer / Lighting Crew
            </p>
          </div>

          {/* Back to top */}
          <button
            onClick={handleScrollTop}
            className="group flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#777777] hover:text-white transition-colors duration-300 cursor-pointer"
          >
            <span>TOP OF FRAME</span>
            <div className="w-7 h-7 border border-white/10 flex items-center justify-center group-hover:border-[#8B6F5E] group-hover:bg-[#8B6F5E] group-hover:text-white transition-all duration-300">
              <ArrowUp size={13} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
