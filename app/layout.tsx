import type { Metadata } from 'next';
import './globals.css';
import InteractiveFavicon from '@/components/InteractiveFavicon';
import CameraCursor from '@/components/CameraCursor';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://bagoeshutomo.com');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bagoes Hutomo — Official Portfolio | Camera Assistant & Gaffer',
    template: '%s | Bagoes Hutomo',
  },
  description:
    'Official portfolio of Bagoes Hutomo (Bagus Hutomo) — Camera Assistant, Production Assistant, and Gaffer. Specializing in music videos, narrative short dramas, dance covers, and video production with EUIS.STUDIO and EFKA.PROD.',
  keywords: [
    'Bagoes Hutomo',
    'Bagus Hutomo',
    'Bagoes Hutomo Portfolio',
    'Bagus Hutomo Portfolio',
    'Bagoes Hutomo Crew',
    'b49us_ajh',
    'Bagoes Hutomo Camera Assistant',
    'Bagoes Hutomo Gaffer',
    'Bagoes Hutomo Production Assistant',
    'EUIS.STUDIO',
    'EFKA.PROD',
    'Camera Assistant Indonesia',
    'Production Assistant Indonesia',
    'Gaffer Indonesia',
    'Lighting Crew Jakarta',
    'Video Production Crew',
    'Music Video Crew Indonesia',
    'Short Drama Crew',
    'Dance Cover Video Crew',
    'Film Crew Indonesia',
    'Focus Puller Indonesia',
  ],
  authors: [{ name: 'Bagoes Hutomo', url: siteUrl }],
  creator: 'Bagoes Hutomo',
  publisher: 'Bagoes Hutomo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Bagoes Hutomo — Official Portfolio | Camera Assistant & Gaffer',
    description:
      'Official portfolio of Bagoes Hutomo (Bagus Hutomo) — Camera Assistant, Production Assistant, and Gaffer. Video production projects with EUIS.STUDIO and EFKA.PROD.',
    url: siteUrl,
    siteName: 'Bagoes Hutomo Portfolio',
    locale: 'id_ID',
    alternateLocale: ['en_US'],
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bagoes Hutomo — Official Portfolio | Camera Assistant & Gaffer',
    description:
      'Official portfolio of Bagoes Hutomo: Camera Assistant, Production Assistant, and Gaffer for music videos, short dramas, and dance covers.',
    creator: '@b49us_ajh',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Bagoes Hutomo',
      alternateName: ['Bagus Hutomo', 'b49us_ajh', 'Bagoes', 'Hutomo'],
      jobTitle: ['Camera Assistant', 'Production Assistant', 'Gaffer'],
      description:
        'Indonesian video production crew member specializing in camera prep, focus pulling, lighting rigs, and on-set coordination for music videos, narrative short dramas, and dance covers.',
      url: siteUrl,
      image: `${siteUrl}/opengraph-image`,
      sameAs: [
        'https://www.instagram.com/b49us_ajh/',
        'https://github.com/hutomo28',
        'https://github.com/hutomo28/portofolio_bagus',
      ],
      worksFor: [
        {
          '@type': 'Organization',
          name: 'EUIS.STUDIO',
          url: 'https://www.instagram.com/euisstudio/',
        },
        {
          '@type': 'Organization',
          name: 'EFKA.PROD',
          url: 'https://www.instagram.com/efka.pro/',
        },
      ],
      knowsAbout: [
        'Camera Assistant',
        'Production Assistant',
        'Gaffer',
        'Cinematography',
        'Lighting Rigging',
        'Floor Logistics',
        'Music Video Production',
        'Short Drama Production',
        'Dance Cover Production',
        'Video Editing & On-set Playback',
      ],
      nationality: {
        '@type': 'Country',
        name: 'Indonesia',
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Bagoes Hutomo — Official Portfolio',
      alternateName: [
        'Bagoes Hutomo Portfolio',
        'Bagus Hutomo',
        'Bagoes Hutomo Website',
      ],
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
      inLanguage: ['id-ID', 'en-US'],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: 'Bagoes Hutomo — Personal Portfolio',
      isPartOf: {
        '@id': `${siteUrl}/#website`,
      },
      about: {
        '@id': `${siteUrl}/#person`,
      },
      mainEntity: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:wght@300;400;500&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('portfolio-theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[#8B6F5E] selection:text-white">
        <CameraCursor />
        <InteractiveFavicon />
        {children}
      </body>
    </html>
  );
}
