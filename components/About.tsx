'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, Film, Zap, CheckCircle2, ShieldCheck } from 'lucide-react';

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

const roles = [
  {
    icon: Camera,
    title: 'Camera Assistant',
    badge: 'CAMERA DEPT',
    description:
      'Prep camera packages, pull cables, swap lenses between takes, and feed wireless monitors for the DP and director.',
    skills: ['Rigging & Mounting', 'Lens Swaps', 'Wireless Video Feed', 'Slate Coordination'],
  },
  {
    icon: Film,
    title: 'Production Assistant',
    badge: 'PRODUCTION DEPT',
    description:
      'Distribute call sheets, stage gear across locations, guide talent to set, and protect the daily shooting schedule.',
    skills: ['Call Sheets', 'On-Set Logistics', 'Talent Flow', 'Equipment Movement'],
  },
  {
    icon: Zap,
    title: 'Gaffer / Lighting Crew',
    badge: 'LIGHTING DEPT',
    description:
      'Rig fixtures, position C-stands and diffusers, route distribution boxes safely, and trim lighting for each camera setup.',
    skills: ['Fixture Rigging', 'Diffusion & Modifiers', 'Cable Management', 'Lighting Control'],
  },
];

export default function About() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="about" className="py-24 lg:py-32 relative" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Narrative Copy */}
          <div className="lg:col-span-6">
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]">
                SEC_03 // CREW PROFILE
              </span>
            </div>

            <h2
              className={`mb-8 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(42px, 5.5vw, 76px)',
                fontWeight: 800,
                lineHeight: 0.95,
                color: 'var(--color-text)',
                letterSpacing: '-0.025em',
                transitionDelay: '100ms',
              }}
            >
              Behind
              <br />
              <span className="italic font-normal text-[var(--color-accent)]">The Scenes.</span>
            </h2>

            <div
              className={`space-y-4 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '17px',
                  lineHeight: 1.8,
                  color: 'var(--color-text)',
                  fontWeight: 500,
                }}
              >
                I am <strong style={{ color: 'var(--color-accent)' }}>Bagoes Hutomo</strong>, a video production crew member based in Indonesia.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  lineHeight: 1.85,
                  color: 'var(--color-text-muted)',
                }}
              >
                I work across music videos, narrative shorts, and dance covers, taking roles in camera support, lighting, and floor logistics.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '15px',
                  lineHeight: 1.85,
                  color: 'var(--color-text-muted)',
                }}
              >
                Sets move fast. I focus on clean resets: swapping glass before the next call, rigging fixtures where the DP needs them, and keeping cables tidy so crew move freely.
              </p>
            </div>

            {/* Crew Commitment Box */}
            <div
              className={`mt-10 p-6 bg-[var(--color-bg-secondary)]/60 border-l-2 border-[var(--color-accent)] transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              <div className="flex items-center gap-2 mb-2 text-xs font-mono tracking-wider uppercase text-[var(--color-accent)]">
                <ShieldCheck size={16} />
                <span>ON-SET PRINCIPLE</span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '17px',
                  fontStyle: 'italic',
                  color: 'var(--color-text)',
                  lineHeight: 1.6,
                }}
              >
                "Production days succeed when crew anticipate the next setup before call. Clear communication, quick turnarounds, zero clutter."
              </p>
            </div>
          </div>

          {/* Right Column: Production Roles & Technical Skills */}
          <div
            className={`lg:col-span-6 space-y-4 transition-all duration-700 ${
              inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Header Plate */}
            <div className="p-6 bg-[var(--color-dark)] text-white border border-[var(--color-dark)]">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-accent)] uppercase tracking-widest mb-1">
                <span>CREW COMPETENCIES</span>
                <span>ON-SET READINESS</span>
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '24px',
                  fontWeight: 700,
                  lineHeight: 1.25,
                }}
              >
                Three Pillars of Production Support
              </p>
            </div>

            {/* The 3 Roles */}
            {roles.map(({ icon: Icon, title, badge, description, skills }, i) => (
              <div
                key={title}
                className="p-6 bg-[var(--color-bg-card)]/80 border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-accent)]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3
                        className="font-bold text-[var(--color-text)] text-base"
                        style={{ fontFamily: 'var(--font-serif)' }}
                      >
                        {title}
                      </h3>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-text-muted)]">
                        {badge}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-[var(--color-text-muted)] mb-4">
                  {description}
                </p>

                {/* Practical skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--color-border)]/60">
                  {skills.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 bg-[var(--color-bg-secondary)]/70 text-[var(--color-text-muted)] border border-[var(--color-border)]/60 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
