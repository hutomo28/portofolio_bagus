'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

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
      setIsScrolled(window.scrollY > 50);

      const sections = ['home', 'works', 'other-works', 'about', 'contact'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
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
            ? 'bg-[#F5F3EF]/95 backdrop-blur-md shadow-sm border-b border-[#D8D6D2]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#home')}
              className="group flex flex-col leading-none cursor-pointer"
            >
              <span
                className="text-sm font-semibold tracking-[0.2em] text-[#242424] uppercase transition-colors group-hover:text-[#8B6F5E]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                BAGOES
              </span>
              <span
                className="text-sm font-light tracking-[0.3em] text-[#777777] uppercase transition-colors group-hover:text-[#8B6F5E]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                HUTOMO
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const id = link.href.replace('#', '');
                const isActive = activeSection === id;
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className={`relative text-sm tracking-widest uppercase transition-colors duration-300 cursor-pointer ${
                      isActive ? 'text-[#8B6F5E]' : 'text-[#777777] hover:text-[#242424]'
                    }`}
                    style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#8B6F5E]" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#242424] hover:text-[#8B6F5E] transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#F5F3EF] flex flex-col justify-center items-center transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-4xl font-light text-[#242424] hover:text-[#8B6F5E] transition-colors duration-300 cursor-pointer"
              style={{
                fontFamily: 'var(--font-serif)',
                transitionDelay: `${i * 50}ms`,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
