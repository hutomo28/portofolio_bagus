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
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
