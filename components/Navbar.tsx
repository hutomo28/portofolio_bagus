'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Works', href: '#works' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'works', 'other-works', 'about', 'contact'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 140 && rect.bottom >= 140;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[var(--color-nav-bg)] backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-b border-[var(--color-border)] py-3'
            : 'bg-transparent py-5 lg:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="group flex items-center gap-3 text-left cursor-pointer"
            >
              <div className="relative w-8 h-8 rounded-lg border border-[var(--color-border)] flex items-center justify-center overflow-hidden bg-[var(--color-bg-secondary)] group-hover:border-[var(--color-accent)] group-hover:scale-105 active:scale-95 group-hover:shadow-[0_0_14px_rgba(196,141,117,0.35)] transition-all duration-300">
                <span className="font-mono text-xs font-bold text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110">
                  BH
                </span>
                {/* Interactive sheen on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className="text-xs font-bold tracking-[0.24em] text-[var(--color-text)] uppercase transition-colors group-hover:text-[var(--color-accent)]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  BAGOES HUTOMO
                </span>
                <span
                  className="text-[10px] font-mono tracking-[0.2em] text-[var(--color-text-muted)] uppercase"
                >
                  PRODUCTION CREW
                </span>
              </div>
            </button>

            {/* Desktop Status Badge + Nav + ThemeToggle */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {/* Production Status Badge */}
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50 text-[10px] font-mono tracking-widest text-[var(--color-text-muted)]">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-rec-dot" />
                <span>OPEN FOR CREW CALLS</span>
              </div>

              {/* Links */}
              <div className="flex items-center gap-7">
                {navLinks.map((link) => {
                  const id = link.href.replace('#', '');
                  const isActive = activeSection === id;
                  return (
                    <button
                      key={link.label}
                      onClick={() => handleNavClick(link.href)}
                      className={`relative text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 cursor-pointer ${
                        isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2.5 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors cursor-pointer rounded border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--color-bg)] flex flex-col justify-between p-8 transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="pt-20 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-rec-dot" />
              <span>AVAILABLE FOR PRODUCTION CALLS</span>
            </div>
          </div>

          <div className="h-px bg-[var(--color-border)] my-2" />

          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-3xl font-light text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors duration-300 cursor-pointer"
              style={{
                fontFamily: 'var(--font-serif)',
                transitionDelay: `${i * 40}ms`,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="border-t border-[var(--color-border)] pt-6 flex justify-between items-center text-xs font-mono text-[var(--color-text-muted)]">
          <span>CAMERA · LIGHTING · PA</span>
          <span>JAKARTA, ID</span>
        </div>
      </div>
    </>
  );
}
