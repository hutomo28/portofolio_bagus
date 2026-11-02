'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read from localStorage or system preference
    const savedTheme = localStorage.getItem('portfolio-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem('portfolio-theme', nextTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-full border border-[var(--color-border)] opacity-0 ${className}`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      title={`Switch to ${theme === 'light' ? 'Dark Mode' : 'Light Mode'}`}
      className={`group relative flex items-center justify-center w-9 h-9 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-secondary)]/80 text-[var(--color-text)] hover:text-[#8B6F5E] hover:border-[#8B6F5E] transition-all duration-300 cursor-pointer shadow-xs ${className}`}
    >
      {theme === 'light' ? (
        <Moon size={15} className="transition-transform duration-300 group-hover:-rotate-12 text-[#242424]" />
      ) : (
        <Sun size={15} className="transition-transform duration-300 group-hover:rotate-45 text-[#F0EDE8]" />
      )}
    </button>
  );
}
