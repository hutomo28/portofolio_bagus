import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bagoes Hutomo — Production Crew Portfolio',
  description:
    'Personal portfolio of Bagoes Hutomo — Camera Assistant, Production Assistant, and Gaffer working behind the scenes in music videos, short dramas, and dance cover productions.',
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
    title: 'Bagoes Hutomo — Production Crew Portfolio',
    description:
      'Behind every frame, there\'s a team. Explore the works of Bagoes Hutomo — camera assistant, production assistant, and gaffer.',
    type: 'website',
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
        {children}
      </body>
    </html>
  );
}
