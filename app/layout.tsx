import type { Metadata } from 'next';
import './globals.css';
import InteractiveFavicon from '@/components/InteractiveFavicon';
import CameraCursor from '@/components/CameraCursor';

export const metadata: Metadata = {
  title: 'Bagoes Hutomo | Production Crew Portfolio',
  description:
    'Portfolio of Bagoes Hutomo: camera assistant, production assistant, and gaffer for music videos, short dramas, and dance covers.',
  keywords: [
    'Bagoes Hutomo',
    'Camera Assistant',
    'Production Assistant',
    'Gaffer',
    'Lighting Crew',
    'Video Production',
    'Music Video',
    'Behind The Scenes',
    'Portfolio',
  ],
  authors: [{ name: 'Bagoes Hutomo' }],
  openGraph: {
    title: 'Bagoes Hutomo | Production Crew Portfolio',
    description:
      'Video production crew portfolio for Bagoes Hutomo: camera assistant, production assistant, and gaffer.',
    type: 'website',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
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
