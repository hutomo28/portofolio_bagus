'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, Camera, Film, Zap, Clapperboard, Crosshair } from 'lucide-react';
import { allProjects } from '@/data/projects';

const roles = [
  { label: 'Camera Assistant', icon: Camera, desc: 'Focus pull & camera rig support' },
  { label: 'Production Assistant', icon: Film, desc: 'On-set logistics & coordination' },
  { label: 'Gaffer', icon: Zap, desc: 'Lighting control & electric setup' },
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [visible, setVisible] = useState(false);
  const [timecode, setTimecode] = useState('00:01:24:18');

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // Subtle timecode ticker
  useEffect(() => {
    let frame = 18;
    let sec = 24;
    const tcInterval = setInterval(() => {
      frame = (frame + 1) % 24;
      if (frame === 0) sec = (sec + 1) % 60;
      const fStr = frame < 10 ? `0${frame}` : `${frame}`;
      const sStr = sec < 10 ? `0${sec}` : `${sec}`;
      setTimecode(`00:01:${sStr}:${fStr}`);
    }, 1000 / 24);
    return () => clearInterval(tcInterval);
  }, []);

  const handleScroll = () => {
    const el = document.getElementById('works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden pt-24 pb-16 lg:py-0"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, var(--color-text) 0px, var(--color-text) 1px, transparent 1px, transparent 72px),
                            repeating-linear-gradient(90deg, var(--color-text) 0px, var(--color-text) 1px, transparent 1px, transparent 72px)`,
        }}
      />

      {/* Decorative Oversized Monogram */}
      <div
        className="absolute -right-12 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden hidden md:block"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(240px, 35vw, 520px)',
          fontWeight: 800,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(139, 111, 94, 0.12)',
          lineHeight: 1,
        }}
      >
        BH
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        {/* Viewfinder HUD Top Bar */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 pb-8 mb-8 border-b border-[var(--color-border)]/60 text-[11px] font-mono text-[var(--color-text-muted)] transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold text-[var(--color-accent)]">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-rec-dot" />
              REC
            </span>
            <span className="text-[var(--color-text)] font-medium tracking-wider">{timecode}</span>
            <span className="hidden sm:inline text-[var(--color-border)]">|</span>
            <span className="hidden sm:inline">24 FPS</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">1/200 SHUTTER SPEED</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline">ISO 800</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">PRORES 422 HQ</span>
            <span className="text-[var(--color-accent)] font-medium tracking-widest uppercase">
              CREW PERSPECTIVE
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-8 max-w-3xl">
            {/* Pre-heading tag */}
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <span className="h-px w-10 bg-[var(--color-accent)]" />
              <span
                className="text-xs tracking-[0.35em] uppercase text-[var(--color-accent)] font-semibold"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Personal Portfolio · Video Production
              </span>
            </div>

            {/* Main Title */}
            <h1
              className={`transition-all duration-900 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(54px, 9vw, 120px)',
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                color: 'var(--color-text)',
                transitionDelay: '250ms',
              }}
            >
              BAGOES
              <br />
              <span style={{ color: 'var(--color-accent)' }}>HUTOMO.</span>
            </h1>

            {/* Subheading */}
            <p
              className={`mt-6 transition-all duration-700 text-[var(--color-text-muted)] font-light ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(20px, 3vw, 32px)',
                fontStyle: 'italic',
                transitionDelay: '400ms',
              }}
            >
              Camera, lighting, and production coordination on set.
            </p>

            {/* Description */}
            <p
              className={`mt-5 max-w-xl transition-all duration-700 text-[var(--color-text-muted)] leading-relaxed text-base ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              I handle camera prep, run power and lighting rigs, and keep shoot schedules moving.
              Recent work spans music videos, narrative shorts, and dance covers.
            </p>

            {/* Animated Role Pills */}
            <div
              className={`mt-8 flex flex-wrap gap-2.5 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              {roles.map(({ label, icon: Icon }, i) => (
                <button
                  key={label}
                  onClick={() => setCurrentRole(i)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                    currentRole === i
                      ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white shadow-sm'
                      : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/60 bg-[var(--color-bg-secondary)]/50'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div
              className={`mt-10 flex flex-wrap items-center gap-4 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '700ms' }}
            >
              <button
                onClick={handleScroll}
                className="group relative inline-flex items-center gap-3 bg-[var(--color-text)] text-[var(--color-bg)] px-8 py-4 overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: '13px',
                  letterSpacing: '0.12em',
                }}
              >
                <span className="relative z-10 tracking-widest uppercase">Explore My Works</span>
                <ArrowDown
                  size={15}
                  className="relative z-10 group-hover:translate-y-1 transition-transform duration-300"
                />
                <span className="absolute inset-0 bg-[var(--color-accent)] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>

              <a
                href="#about"
                className="px-6 py-4 text-xs tracking-widest uppercase font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors bg-[var(--color-bg-secondary)]/30"
              >
                About Me
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Film Slate Card */}
          <div
            className={`lg:col-span-4 transition-all duration-1000 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <div className="relative p-6 sm:p-8 bg-[var(--color-bg-secondary)]/80 border border-[var(--color-border)] shadow-sm backdrop-blur-sm">
              {/* Viewfinder corner accents */}
              <div className="viewfinder-corner viewfinder-tl border-[var(--color-accent)]" />
              <div className="viewfinder-corner viewfinder-tr border-[var(--color-accent)]" />
              <div className="viewfinder-corner viewfinder-bl border-[var(--color-accent)]" />
              <div className="viewfinder-corner viewfinder-br border-[var(--color-accent)]" />

              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <Clapperboard size={16} className="text-[var(--color-accent)]" />
                  <span className="font-mono text-[11px] tracking-wider text-[var(--color-text)] uppercase font-bold">
                    PRODUCTION SLATE
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[var(--color-text-muted)]">TAKE #01</span>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-[10px] uppercase text-[var(--color-text-muted)] block">Crew Member</span>
                  <p className="font-bold text-[var(--color-text)] text-sm mt-0.5" style={{ fontFamily: 'var(--font-serif)' }}>
                    Bagoes Hutomo
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[var(--color-border)]/60">
                  <div>
                    <span className="text-[10px] uppercase text-[var(--color-text-muted)] block">Focus</span>
                    <span className="font-semibold text-[var(--color-text)] text-xs">Behind The Scenes</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-[var(--color-text-muted)] block">Location</span>
                    <span className="font-semibold text-[var(--color-text)] text-xs">Indonesia</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--color-border)]/60">
                  <span className="text-[10px] uppercase text-[var(--color-text-muted)] block">Active Role Support</span>
                  <div className="mt-1.5 p-3 bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text)]">
                    <span className="font-semibold text-xs text-[var(--color-accent)] block">
                      {roles[currentRole].label}
                    </span>
                    <span className="text-[11px] text-[var(--color-text-muted)] block mt-0.5">
                      {roles[currentRole].desc}
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between text-[10px] text-[var(--color-text-muted)]">
                  <span>{allProjects.length < 10 ? `0${allProjects.length}` : allProjects.length} WORKS CATALOGUED</span>
                  <span className="text-emerald-500 font-semibold">● ACTIVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
