'use client';

import { useEffect } from 'react';

export default function InteractiveFavicon() {
  useEffect(() => {
    const originalTitle = document.title;
    let restoreTimeout: NodeJS.Timeout | null = null;

    // Helper to find or create favicon link element
    const getFaviconLink = (): HTMLLinkElement => {
      let link = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      return link;
    };

    // Generate dynamic favicon with camera recording tally indicator
    const createRecFavicon = (): string => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (!ctx) return '/icon.svg';

      // Dark squircle background
      ctx.fillStyle = '#181715';
      ctx.beginPath();
      ctx.roundRect(2, 2, 60, 60, 14);
      ctx.fill();

      // Border
      ctx.strokeStyle = '#C48D75';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Monogram "B"
      ctx.fillStyle = '#FAF0E6';
      ctx.font = 'bold 36px Georgia, "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('B', 30, 34);

      // Red recording tally light (top right)
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(50, 14, 5, 0, Math.PI * 2);
      ctx.fill();

      // Soft glow around recording light
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
      ctx.lineWidth = 3;
      ctx.stroke();

      return canvas.toDataURL('image/png');
    };

    const handleVisibilityChange = () => {
      const link = getFaviconLink();

      if (document.hidden) {
        if (restoreTimeout) clearTimeout(restoreTimeout);
        document.title = '🎬 In Production... · Bagoes Hutomo';
        try {
          link.href = createRecFavicon();
        } catch {
          // Fallback if canvas is blocked
        }
      } else {
        document.title = '⚡ Back On Set · Bagoes Hutomo';
        link.href = '/icon.svg';

        restoreTimeout = setTimeout(() => {
          document.title = originalTitle;
        }, 1800);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (restoreTimeout) clearTimeout(restoreTimeout);
    };
  }, []);

  return null;
}

