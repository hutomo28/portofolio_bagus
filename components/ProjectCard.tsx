'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Play } from 'lucide-react';
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
  // For Instagram, return empty string (will use placeholder)
  return '';
}

function getFallbackUrl(project: Project): string {
  if (project.source === 'youtube') {
    return `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`;
  }
  return '';
}

const categoryColors: Record<string, string> = {
  'Music Video': '#4A6FA5',
  'Short Drama': '#8B6F5E',
  'Music Video Cover': '#6B8F71',
  'Dance Cover': '#7A6F8F',
  'Dance Cover / Concert': '#7A6F8F',
};

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

  const categoryColor = categoryColors[project.category] || '#8B6F5E';

  const aspectRatioClass =
    size === 'large'
      ? 'aspect-[16/10]'
      : size === 'medium'
      ? 'aspect-[16/10]'
      : 'aspect-[16/9]';

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block cursor-pointer"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden bg-[#E9E9E6] ${aspectRatioClass}`}
        style={{ backgroundColor: '#E0DCDA' }}
      >
        {!hasError && imgSrc ? (
          <Image
            src={imgSrc}
            alt={`${project.title} — ${project.client}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={handleError}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#E0DCDA]">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: categoryColor + '22' }}
            >
              <Play size={20} style={{ color: categoryColor }} />
            </div>
            <div className="text-center px-4">
              <p
                className="text-sm font-semibold text-[#242424] leading-tight"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.title}
              </p>
              <p
                className="text-xs text-[#777777] mt-1"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {project.client}
              </p>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-[#1A1A1A]/0 group-hover:bg-[#1A1A1A]/40 transition-all duration-500 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm text-[#242424] px-4 py-2.5 text-xs tracking-widest uppercase font-semibold">
              <Play size={12} />
              <span>Watch</span>
            </div>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
            className="text-[10px] tracking-widest uppercase text-white px-2.5 py-1"
            style={{
              backgroundColor: categoryColor,
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Card info */}
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3
            className="font-semibold text-[#242424] leading-tight group-hover:text-[#8B6F5E] transition-colors duration-300"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: size === 'large' ? '20px' : size === 'medium' ? '17px' : '14px',
            }}
          >
            {project.title}
          </h3>
          <p
            className="text-[#777777] mt-0.5"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: size === 'large' ? '13px' : '12px',
            }}
          >
            {project.client}
          </p>
        </div>
        <ExternalLink
          size={14}
          className="text-[#D8D6D2] group-hover:text-[#8B6F5E] transition-colors duration-300 mt-1 shrink-0"
        />
      </div>

      {/* Category line */}
      <div className="mt-1.5">
        <span
          className="text-[10px] tracking-widest uppercase"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 500,
            color: categoryColor,
          }}
        >
          {project.category}
        </span>
      </div>
    </a>
  );
}
