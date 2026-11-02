'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { otherProjects, allProjects } from '@/data/projects';
import { Search } from 'lucide-react';

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

export default function OtherWorks() {
  const { ref, inView } = useInView(0.05);
  const [searchQuery, setSearchQuery] = useState('');

  const q = searchQuery.toLowerCase().trim();
  const isMvSearch = q === 'mv' || q === 'm/v' || q === 'music video' || q.includes('music video');

  // When a search query is active, search across ALL productions (including MVs & featured works)
  const sourceList = q ? allProjects : otherProjects;

  const filteredProjects = sourceList.filter((p) => {
    if (!q) return true;

    const titleMatch = p.title.toLowerCase().includes(q);
    const clientMatch = p.client.toLowerCase().includes(q);
    const categoryMatch = p.category.toLowerCase().includes(q);
    const phMatch = p.productionHouse.toLowerCase().includes(q);

    // Dedicated MV shorthand match so typing 'mv' finds all Music Videos
    const mvMatch =
      isMvSearch &&
      (p.category === 'Music Video' || p.category === 'Music Video Cover');

    return titleMatch || clientMatch || categoryMatch || phMatch || mvMatch;
  });

  return (
    <section
      id="other-works"
      className="py-24 lg:py-32 relative border-t border-[var(--color-border)]"
      style={{ background: 'var(--color-bg-secondary)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div ref={ref} className="mb-14">
          <div
            className={`flex items-center justify-between flex-wrap gap-4 mb-4 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[var(--color-accent-blue)]" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[var(--color-accent-blue)]">
                SEC_02 // EXTENDED ARCHIVE
              </span>
            </div>

            <span className="font-mono text-xs text-[var(--color-text-muted)]">
              {q
                ? `${filteredProjects.length} PRODUCTIONS FOUND`
                : `${otherProjects.length} CATALOGUED PRODUCTIONS`}
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
                Other
                <br />
                <span className="italic font-normal text-[var(--color-accent-blue)]">Works.</span>
              </h2>
            </div>

            <div className="max-w-md">
              <p
                className="text-sm leading-relaxed text-[var(--color-text-muted)] mb-5"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                A collection of dance cover productions and creative projects, including Bollywood
                parody recreations with <strong>Vina Fan</strong> and dynamic dance covers across various teams.
              </p>

              {/* Instant Search Bar */}
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]"
                />
                <input
                  type="text"
                  placeholder="Search by title, artist, or type (MV, Dance Cover, Vina Fan...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[var(--color-bg-card)]/80 border border-[var(--color-border)] pl-9 pr-4 py-2.5 text-xs font-mono text-[var(--color-text)] placeholder:text-[var(--color-text-muted)]/70 focus:outline-none focus:border-[var(--color-accent-blue)] transition-colors shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-[var(--color-text-muted)] hover:text-[var(--color-text)] cursor-pointer"
                  >
                    CLEAR
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search Results Summary when active */}
        {q && (
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] border-b border-[var(--color-border)]/60 pb-3 flex-wrap gap-2">
            <span>
              SEARCHING ALL PRODUCTIONS FOR <strong className="text-[var(--color-text)]">"{searchQuery}"</strong> ({filteredProjects.length} RESULTS)
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-[var(--color-accent)] hover:underline cursor-pointer text-[11px]"
            >
              RESET TO ARCHIVE
            </button>
          </div>
        )}

        {/* Projects Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} size="grid" index={i} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-[var(--color-text-muted)] font-mono text-xs">
              No productions matching "{searchQuery}". Try searching "MV", "Invasion", "Vina Fan", or an artist name.
            </div>
          )}
        </div>

        {/* Production Experience Stats Row */}
        <div
          className={`mt-20 pt-12 border-t border-[var(--color-border)] grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '350ms' }}
        >
          {[
            { number: '31+', label: 'Total Productions Supported', sub: 'Music videos, dramas, Vina Fan & dance covers' },
            { number: '03', label: 'Crew Specialties', sub: 'Camera Assistant, PA & Gaffer' },
            { number: '09+', label: 'Collaborative Teams', sub: 'Vina Fan, Invasion, Virtudance, Jiniso, etc.' },
            { number: '100%', label: 'Crew Dedication', sub: 'Committed to on-set excellence' },
          ].map(({ number, label, sub }) => (
            <div key={label} className="p-4 border-l border-[var(--color-border)] pl-6">
              <div
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(38px, 4.5vw, 56px)',
                  fontWeight: 800,
                  color: 'var(--color-text)',
                  lineHeight: 1,
                }}
              >
                {number}
              </div>
              <p
                className="mt-2 text-xs tracking-wider uppercase text-[var(--color-text)] font-bold"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {label}
              </p>
              <p className="mt-1 text-[11px] text-[var(--color-text-muted)]">
                {sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
