import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Film, User, Tag, Play, Building2 } from 'lucide-react';
import { allProjects } from '@/data/projects';
import ThemeToggle from '@/components/ThemeToggle';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.id === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.title} (${project.productionHouse}) | Bagoes Hutomo`,
    description: `${project.title} (${project.category} · ${project.productionHouse}) for ${project.client}. Crew support by Bagoes Hutomo.`,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  const isYouTube = project.source === 'youtube';
  const youtubeEmbedUrl = isYouTube
    ? `https://www.youtube-nocookie.com/embed/${project.videoId}?rel=0`
    : null;

  const currentIndex = allProjects.findIndex((p) => p.id === slug);
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const prevProject =
    allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];

  const isEuis = project.productionHouse === 'EUIS.STUDIO';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}>
      {/* Top Bar */}
      <header className="border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-nav-bg)] backdrop-blur-md z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 lg:h-20 flex items-center justify-between">
          <Link
            href="/#works"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <ArrowLeft
              size={14}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>RETURN TO ARCHIVE</span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded border border-[var(--color-border)] flex items-center justify-center font-mono text-[10px] font-bold text-[var(--color-accent)] bg-[var(--color-bg-secondary)]">
                BH
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="text-xs font-bold tracking-[0.2em] text-[var(--color-text)] uppercase"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  BAGOES HUTOMO
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[var(--color-text-muted)] uppercase mt-0.5">
                  CREW ARCHIVE
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 lg:px-8 py-10 lg:py-16">
        {/* Project Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--color-border)]/60 font-mono text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="text-[var(--color-accent)] font-bold">
              SLATE #{currentIndex < 9 ? `0${currentIndex + 1}` : currentIndex + 1}
            </span>
            {project.category !== 'Parodi' && (
              <>
                <span>·</span>
                <span className="uppercase">{project.category}</span>
              </>
            )}
            <span>·</span>
            <span
              className={`font-semibold ${
                isEuis ? 'text-[var(--color-accent)]' : 'text-[var(--color-accent-blue)]'
              }`}
            >
              {project.productionHouse}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-rec-dot" />
            <span className="uppercase text-[var(--color-text)]">CREW VERIFIED</span>
          </div>
        </div>

        {/* Title, Production House & Client */}
        <div className="mb-8">
          {/* Subtle Category · Production House Label */}
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[var(--color-text-muted)]">
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
          </div>

          <h1
            className="text-[var(--color-text)] mb-3"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(36px, 6vw, 68px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.025em',
            }}
          >
            {project.title}
          </h1>

          <p className="text-base font-medium text-[var(--color-text-muted)]">
            Client / Collaborator:{' '}
            <strong className="text-[var(--color-text)] font-semibold">{project.client}</strong>
          </p>
        </div>

        {/* Video Player Box with Viewfinder Accents */}
        <div className="relative mb-12">
          {isYouTube && youtubeEmbedUrl ? (
            <div className="relative w-full aspect-video bg-black overflow-hidden shadow-md border border-[var(--color-border)]">
              {/* Corner Viewfinder marks */}
              <div className="viewfinder-corner viewfinder-tl border-white/60 z-10" />
              <div className="viewfinder-corner viewfinder-tr border-white/60 z-10" />
              <div className="viewfinder-corner viewfinder-bl border-white/60 z-10" />
              <div className="viewfinder-corner viewfinder-br border-white/60 z-10" />

              <iframe
                src={youtubeEmbedUrl}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video bg-[var(--color-bg-secondary)] flex flex-col items-center justify-center p-8 text-center border border-[var(--color-border)]">
              <div className="w-16 h-16 rounded-full bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-accent)] flex items-center justify-center mb-4 shadow-sm">
                <Play size={24} />
              </div>
              <p
                className="text-2xl font-bold text-[var(--color-text)] mb-2"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {project.title}
              </p>
              <p className="text-xs font-mono text-[var(--color-text-muted)] mb-2">
                {project.category !== 'Parodi' ? `${project.category} · ` : ''}{project.productionHouse}
              </p>
              <p className="text-sm text-[var(--color-text-muted)] max-w-md mb-6">
                Published on Instagram Reel in 9:16 vertical format. Open the original post below.
              </p>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--color-text)] text-[var(--color-bg)] px-6 py-3.5 text-xs font-mono tracking-widest uppercase hover:bg-[var(--color-accent)] transition-colors shadow-sm"
              >
                <span>WATCH ON INSTAGRAM</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>

        {/* Technical Production Metadata Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6 md:p-8 bg-[var(--color-bg-secondary)]/80 border border-[var(--color-border)] mb-12">
          {/* Role */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-2 font-medium">
              <User size={14} className="text-[var(--color-accent)]" />
              <span>Role in Production</span>
            </div>
            <p
              className="text-base font-bold text-[var(--color-text)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.role || 'Production Crew'}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Camera / Production / Lighting Support
            </p>
          </div>

          {/* Production House */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-2 font-medium">
              <Building2 size={14} className="text-[var(--color-accent)]" />
              <span>Production House</span>
            </div>
            <p
              className={`text-base font-bold ${
                isEuis ? 'text-[var(--color-accent)]' : 'text-[var(--color-accent-blue)]'
              }`}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.productionHouse}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">
              Production Studio
            </p>
          </div>

          {/* Category */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-2 font-medium">
              <Tag size={14} className="text-[var(--color-accent)]" />
              <span>{project.category === 'Parodi' ? 'Production Type' : 'Category'}</span>
            </div>
            <p
              className="text-base font-bold text-[var(--color-text)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.category === 'Parodi' ? 'Special Project' : project.category}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1 font-mono">
              Format: {isYouTube ? '16:9 Broadcast' : '9:16 Reel'}
            </p>
          </div>

          {/* Client / Team */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-2 font-medium">
              <Film size={14} className="text-[var(--color-accent)]" />
              <span>Client / Team</span>
            </div>
            <p
              className="text-base font-bold text-[var(--color-text)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.client}
            </p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Creative production partner
            </p>
          </div>
        </div>

        {/* Project External Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-[var(--color-border)] mb-14">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[var(--color-text)] text-[var(--color-bg)] px-7 py-3.5 text-xs font-mono tracking-widest uppercase hover:bg-[var(--color-accent)] transition-colors shadow-sm"
          >
            <span>WATCH ON {isYouTube ? 'YOUTUBE' : 'INSTAGRAM'}</span>
            <ExternalLink size={14} />
          </a>

          <Link
            href="/#works"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <ArrowLeft size={14} />
            <span>BACK TO ALL WORKS</span>
          </Link>
        </div>

        {/* Next / Previous Project Slates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/works/${prevProject.id}`}
            className="group block p-6 border border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-bg-card)]/60 hover:bg-[var(--color-bg-card)] transition-all shadow-sm"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] block mb-1">
              ← PREVIOUS PRODUCTION
            </span>
            <span
              className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {prevProject.title}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] block mt-1 font-mono">
              {prevProject.client}{prevProject.category !== 'Parodi' ? ` · ${prevProject.category}` : ''} · {prevProject.productionHouse}
            </span>
          </Link>

          <Link
            href={`/works/${nextProject.id}`}
            className="group block p-6 border border-[var(--color-border)] hover:border-[var(--color-accent)] bg-[var(--color-bg-card)]/60 hover:bg-[var(--color-bg-card)] text-right transition-all shadow-sm"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-muted)] block mb-1">
              NEXT PRODUCTION →
            </span>
            <span
              className="text-lg font-bold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {nextProject.title}
            </span>
            <span className="text-xs text-[var(--color-text-muted)] block mt-1 font-mono">
              {nextProject.client}{nextProject.category !== 'Parodi' ? ` · ${nextProject.category}` : ''} · {nextProject.productionHouse}
            </span>
          </Link>
        </div>
      </main>

      {/* Detail Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 mt-16 text-center text-xs font-mono text-[var(--color-text-muted)]">
        <p>© {new Date().getFullYear()} Bagoes Hutomo · Camera Assistant · Production Assistant · Gaffer</p>
      </footer>
    </div>
  );
}
