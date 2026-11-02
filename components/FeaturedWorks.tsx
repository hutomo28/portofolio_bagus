'use client';

import { useEffect, useRef, useState } from 'react';
import ProjectCard from './ProjectCard';
import { featuredProjects } from '@/data/projects';

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

export default function FeaturedWorks() {
  const { ref: sectionRef, inView } = useInView(0.05);

  // Split projects into tiers for editorial layout
  const heroProjects = featuredProjects.slice(0, 2);    // Large featured
  const midProjects = featuredProjects.slice(2, 4);     // Medium
  const restProjects = featuredProjects.slice(4);       // Small grid

  return (
    <section id="works" className="py-24 lg:py-32" style={{ background: 'var(--color-bg)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div ref={sectionRef} className="mb-16">
          <div
            className={`flex items-center gap-4 mb-4 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="h-px w-10 bg-[#8B6F5E]" />
            <span
              className="text-xs tracking-[0.35em] uppercase text-[#8B6F5E]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
            >
              Featured Projects
            </span>
          </div>

          <div
            className={`flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(40px, 6vw, 80px)',
                fontWeight: 800,
                lineHeight: 0.95,
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
              }}
            >
              Selected
              <br />
              Works.
            </h2>
            <p
              className="max-w-sm"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--color-text-muted)',
              }}
            >
              Music videos, short dramas, and creative productions — each frame supported by a
              dedicated crew.
            </p>
          </div>
        </div>

        {/* TIER 1: Two large hero projects */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {heroProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} size="large" index={i} />
          ))}
        </div>

        {/* Divider with category label */}
        <div
          className={`flex items-center gap-4 my-8 transition-all duration-700 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '350ms' }}
        >
          <div className="h-px flex-1 bg-[#D8D6D2]" />
          <span
            className="text-[10px] tracking-[0.4em] uppercase text-[#777777]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            More Works
          </span>
          <div className="h-px flex-1 bg-[#D8D6D2]" />
        </div>

        {/* TIER 2: Two medium projects */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          {midProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} size="medium" index={i + 2} />
          ))}
        </div>

        {/* TIER 3: Remaining projects in smaller grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 transition-all duration-700 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '550ms' }}
        >
          {restProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} size="small" index={i + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}
