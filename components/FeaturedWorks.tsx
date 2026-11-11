'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { featuredProjects, danceCoverProjects, vinaFanProjects, promotionProjects } from '@/data/projects';
import { Film, Filter } from 'lucide-react';

function useInView(threshold = 0.05) {
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

export default function FeaturedWorks() {
  const { ref: sectionRef, inView } = useInView(0.05);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Featured' },
    { id: 'Music Video', label: 'Music Videos' },
    { id: 'Short Drama', label: 'Short Drama' },
    { id: 'Dance Cover', label: 'Dance Cover' },
    { id: 'Parodi', label: 'Parodi' },
    { id: 'Promotion', label: 'Promosi' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? featuredProjects
      : activeCategory === 'Dance Cover'
      ? danceCoverProjects
      : activeCategory === 'Parodi'
      ? vinaFanProjects
      : activeCategory === 'Promotion'
      ? promotionProjects
      : activeCategory === 'Music Video'
      ? featuredProjects.filter(
          (p) => p.category === 'Music Video' || p.category === 'Music Video Cover'
        )
      : featuredProjects.filter((p) => p.category === activeCategory);

  // When 'all', retain the requested editorial layout: top 2 hero, next 2 medium, rest small
  const isDefaultView = activeCategory === 'all';
  const heroProjects = featuredProjects.slice(0, 2);
  const midProjects = featuredProjects.slice(2, 4);
  const restProjects = featuredProjects.slice(4);

  return (
    <section id="works" className="py-24 lg:py-32 relative" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={sectionRef} className="mb-14">
          <div
            className={`flex items-center justify-between flex-wrap gap-4 mb-4 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <span
                className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--color-accent)]"
              >
                SEC_01 // SELECTED PRODUCTIONS
              </span>
            </div>

            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              {activeCategory === 'all'
                ? `${featuredProjects.length < 10 ? '0' + featuredProjects.length : featuredProjects.length} FEATURED WORKS`
                : `${filteredProjects.length < 10 ? '0' + filteredProjects.length : filteredProjects.length} PRODUCTIONS`}
            </span>
          </div>

          <div
            className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(44px, 6vw, 84px)',
                  fontWeight: 800,
                  lineHeight: 0.95,
                  color: 'var(--color-text)',
                  letterSpacing: '-0.025em',
                }}
              >
                Featured
                <br />
                <span className="italic font-normal text-[var(--color-accent)]">Works.</span>
              </h2>
            </div>

            <div className="max-w-md">
              <p
                className="text-sm leading-relaxed text-[var(--color-text-muted)]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Music videos, narrative short dramas, dance covers, and parody productions. These selections cover on-set assignments across camera prep, lighting rigs, and floor logistics.
              </p>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-2 mt-5 flex-wrap">
                <span className="text-[11px] font-mono text-[var(--color-text-muted)] flex items-center gap-1.5 mr-1">
                  <Filter size={12} />
                  FILTER:
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`text-xs font-mono uppercase tracking-wider px-3 py-1.5 border transition-all cursor-pointer ${
                      activeCategory === cat.id
                        ? 'bg-[var(--color-text)] text-[var(--color-bg)] border-[var(--color-text)]'
                        : 'border-[var(--color-border)] text-[var(--color-text-muted)] hover:border-[var(--color-text)] bg-[var(--color-bg-secondary)]/50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Display Based on Filter */}
        {isDefaultView ? (
          <>
            {/* TIER 1: The Top 2 Hero Projects (Large Editorial Layout) */}
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-10 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {heroProjects.map((project, i) => (
                <div key={project.id} className="relative">
                  <span className="absolute -top-3 right-3 z-10 font-mono text-[10px] tracking-widest text-[var(--color-text-muted)] bg-[var(--color-bg)] px-2">
                    0{i + 1} / HERO FOCUS
                  </span>
                  <ProjectCard project={project} size="large" index={i} />
                </div>
              ))}
            </div>

            {/* Divider with Category Slate */}
            <div
              className={`flex items-center gap-4 my-10 transition-all duration-700 ${
                inView ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transitionDelay: '350ms' }}
            >
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--color-text-muted)] bg-[var(--color-bg-secondary)] px-4 py-1.5 border border-[var(--color-border)]">
                <Film size={12} className="text-[var(--color-accent)]" />
                <span>NARRATIVE & MUSIC VIDEO PRODUCTIONS</span>
              </div>
              <div className="h-px flex-1 bg-[var(--color-border)]" />
            </div>

            {/* TIER 2: Projects 3 & 4 (Medium Prominence) */}
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {midProjects.map((project, i) => (
                <div key={project.id} className="relative">
                  <span className="absolute -top-3 right-3 z-10 font-mono text-[10px] tracking-widest text-[var(--color-text-muted)] bg-[var(--color-bg)] px-2">
                    0{i + 3} / SPOTLIGHT
                  </span>
                  <ProjectCard project={project} size="medium" index={i + 2} />
                </div>
              ))}
            </div>

            {/* TIER 3: Projects 5 through 9 (Refined Grid) */}
            <div
              className={`pt-8 border-t border-[var(--color-border)] transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '500ms' }}
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs tracking-widest uppercase text-[var(--color-text-muted)]">
                  ADDITIONAL FEATURED PRODUCTIONS
                </span>
                <span className="font-mono text-xs text-[var(--color-text-muted)]">
                  {restProjects.length < 10 ? `0${restProjects.length}` : restProjects.length} WORKS
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                {restProjects.map((project, i) => (
                  <ProjectCard key={project.id} project={project} size="small" index={i + 4} />
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Filtered Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} size="medium" index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
