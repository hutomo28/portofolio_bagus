'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Camera, Film, Zap } from 'lucide-react';

const roles = ['Camera Assistant', 'Production Assistant', 'Gaffer'];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    const el = document.getElementById('works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Background texture / grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #242424 0px, #242424 1px, transparent 1px, transparent 60px),
                            repeating-linear-gradient(90deg, #242424 0px, #242424 1px, transparent 1px, transparent 60px)`,
        }}
      />

      {/* Decorative large letter */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 select-none pointer-events-none overflow-hidden"
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(200px, 30vw, 480px)',
          fontWeight: 800,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(139, 111, 94, 0.1)',
          lineHeight: 1,
        }}
      >
        B
      </div>

      {/* Accent line left */}
      <div
        className={`absolute left-6 top-1/3 w-px bg-[#8B6F5E] transition-all duration-1000 ${
          visible ? 'h-32' : 'h-0'
        }`}
        style={{ transitionDelay: '600ms' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-4xl">
          {/* Pre-heading tag */}
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="h-px w-10 bg-[#8B6F5E]" />
            <span
              className="text-xs tracking-[0.35em] uppercase text-[#8B6F5E]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Personal Portfolio
            </span>
          </div>

          {/* Main heading */}
          <h1
            className={`transition-all duration-900 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(52px, 9vw, 130px)',
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              transitionDelay: '300ms',
            }}
          >
            BAGOES
            <br />
            <span style={{ color: 'var(--color-accent)' }}>HUTOMO.</span>
          </h1>

          {/* Subheading */}
          <p
            className={`mt-6 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(18px, 2.5vw, 28px)',
              fontWeight: 300,
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
              transitionDelay: '450ms',
            }}
          >
            "Behind Every Frame, There's a Team."
          </p>

          {/* Description */}
          <p
            className={`mt-5 max-w-xl transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              lineHeight: 1.8,
              color: 'var(--color-text-muted)',
              transitionDelay: '550ms',
            }}
          >
            An individual working behind the scenes in video production, supporting camera
            operations, production activities, and lighting setups.
          </p>

          {/* Animated roles */}
          <div
            className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '650ms' }}
          >
            {[
              { label: 'Camera Assistant', Icon: Camera },
              { label: 'Production Assistant', Icon: Film },
              { label: 'Gaffer', Icon: Zap },
            ].map(({ label, Icon }, i) => (
              <div
                key={label}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  currentRole === i
                    ? 'bg-[#8B6F5E] border-[#8B6F5E] text-white'
                    : 'border-[#D8D6D2] text-[#777777]'
                }`}
              >
                <Icon size={13} />
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div
            className={`mt-12 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '750ms' }}
          >
            <button
              onClick={handleScroll}
              className="group relative inline-flex items-center gap-3 bg-[#242424] text-white px-8 py-4 overflow-hidden cursor-pointer"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '14px', letterSpacing: '0.1em' }}
            >
              <span className="relative z-10 tracking-widest uppercase">Explore My Works</span>
              <ArrowDown
                size={15}
                className="relative z-10 group-hover:translate-y-1 transition-transform duration-300"
              />
              <span className="absolute inset-0 bg-[#8B6F5E] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>
        </div>

        {/* Bottom scroll indicator */}
        <div
          className={`absolute bottom-10 right-8 flex flex-col items-center gap-2 transition-all duration-700 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <span
            className="text-[10px] tracking-[0.3em] uppercase text-[#777777] rotate-90 mb-4"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Scroll
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-[#777777] to-transparent" />
        </div>
      </div>
    </section>
  );
}
