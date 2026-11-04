'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Play, Film } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  size?: 'large' | 'medium' | 'small' | 'grid';
  index?: number;
}

function getThumbnailUrl(project: Project): string {
  if (project.source === 'youtube') {
    return `https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`;
  }
  return '';
}

function getFallbackUrl(project: Project): string {
  if (project.source === 'youtube') {
    return `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
  }
  return '';
}

export default function ProjectCard({ project, size = 'grid', index = 0 }: ProjectCardProps) {
  const [imgSrc, setImgSrc] = useState(getThumbnailUrl(project));
  const [hasError, setHasError] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleError = () => {
    if (!triedFallback && project.source === 'youtube') {
      setImgSrc(getFallbackUrl(project));
      setTriedFallback(true);
    } else {
      setHasError(true);
    }
  };

  const isEuis = project.productionHouse === 'EUIS.STUDIO';

  const aspectRatioClass =
    size === 'large'
      ? 'aspect-[16/10]'
      : size === 'medium'
      ? 'aspect-[16/10]'
      : 'aspect-[16/9]';

  return (
    <Link
      href={`/works/${project.id}`}
      className="group block cursor-pointer"
      style={{
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Thumbnail Container */}
      <div
        className={`relative overflow-hidden bg-[var(--color-bg-secondary)] border border-[var(--color-border)] ${aspectRatioClass} transition-shadow duration-500 group-hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]`}
      >
        {/* Viewfinder crosshairs on hover */}
        <div className="viewfinder-corner viewfinder-tl border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1" />
        <div className="viewfinder-corner viewfinder-tr border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-1" />
        <div className="viewfinder-corner viewfinder-bl border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 -translate-x-1" />
        <div className="viewfinder-corner viewfinder-br border-[var(--color-accent)] opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-1" />

        {!hasError && imgSrc ? (
          <Image
            src={imgSrc}
            alt={`${project.title} — ${project.client}`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            onError={handleError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[var(--color-bg-secondary)] p-4 text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-accent)] shadow-sm">
              <Film size={20} />
            </div>
            <div>
              <p
                className="text-sm font-bold text-[var(--color-text)] leading-tight line-clamp-1"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {project.title}
              </p>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 line-clamp-1">
                {project.client}
              </p>
            </div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-accent)]">
              {project.source === 'instagram' ? 'INSTAGRAM REEL' : 'VIDEO PRODUCTION'}
            </span>
          </div>
        )}

        {/* Cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-40 group-hover:opacity-70 transition-opacity duration-500" />

        {/* Hover Action Badge */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0">
            <div className="flex items-center gap-2 bg-[var(--color-bg-card)]/95 backdrop-blur-sm text-[var(--color-text)] px-4 py-2 text-xs tracking-widest uppercase font-mono shadow-md border border-[var(--color-border)]">
              <Play size={12} className="text-[var(--color-accent)] fill-[var(--color-accent)]" />
              <span>PROJECT SLATE</span>
            </div>
          </div>
        </div>

        {/* Production House & Category Badge Top-Left */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          {project.category !== 'Parodi' && (
            <span
              className={`text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 backdrop-blur-md bg-[var(--color-bg-card)]/90 text-[var(--color-text)] border border-[var(--color-border)] font-semibold`}
            >
              {project.category}
            </span>
          )}
          <span
            className={`text-[9px] font-mono tracking-wider px-2 py-1 backdrop-blur-md text-white font-medium ${
              isEuis ? 'bg-[#8B6F5E]/90' : 'bg-[#242424]/90'
            }`}
          >
            {project.productionHouse}
          </span>
        </div>

        {/* Source indicator Top-Right */}
        <div className="absolute top-3 right-3 opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] font-mono tracking-widest uppercase text-white/90 bg-black/60 px-2 py-0.5">
            {project.source === 'youtube' ? 'YT' : 'IG'}
          </span>
        </div>

        {/* Bottom subtle details on large/medium cards */}
        {size === 'large' && (
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90 text-[10px] font-mono pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>ROLE: PRODUCTION CREW</span>
            <span>PH: {project.productionHouse}</span>
          </div>
        )}
      </div>

      {/* Card Info Below Image */}
      <div className="mt-3.5 flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-[var(--color-text)] leading-tight group-hover:text-[var(--color-accent)] transition-colors duration-300 truncate"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: size === 'large' ? '22px' : size === 'medium' ? '18px' : '15px',
            }}
          >
            {project.title}
          </h3>

          <p
            className="text-[var(--color-text-muted)] mt-1 font-medium truncate"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: size === 'large' ? '13px' : '12px',
            }}
          >
            {project.client}
          </p>

          {/* Small Production House & Category Line */}
          <p className="mt-1 text-[11px] font-mono text-[var(--color-text-muted)] flex items-center gap-1.5 flex-wrap">
            {project.category !== 'Parodi' && (
              <>
                <span>{project.category}</span>
                <span className="text-[var(--color-border)]">·</span>
              </>
            )}
            <span
              className={`font-semibold ${
                isEuis ? 'text-[var(--color-accent)]' : 'text-[var(--color-accent-blue)]'
              }`}
            >
              {project.productionHouse}
            </span>
          </p>
        </div>

        <div className="shrink-0 mt-1">
          <div className="w-7 h-7 rounded border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] group-hover:text-white group-hover:bg-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-all duration-300">
            <ExternalLink size={12} />
          </div>
        </div>
      </div>

      {/* Production Crew Tag */}
      <div className="mt-2.5 flex items-center gap-2">
        <span className="text-[10px] font-mono tracking-wider uppercase text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 border border-[var(--color-accent)]/20">
          CREW SUPPORT
        </span>
      </div>
    </Link>
  );
}
