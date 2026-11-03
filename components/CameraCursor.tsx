'use client';

import { useEffect, useState, useRef } from 'react';

export default function CameraCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('CAM 1 · 24fps');

  const cursorRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  // Smooth lerp coordinates for camera body
  const mousePos = useRef({ x: -100, y: -100 });
  const cameraPos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if device supports fine pointer (mouse/trackpad, not touch)
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    setMounted(true);
    document.documentElement.classList.add('has-camera-cursor');

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsPressed(true);
      // Trigger shutter flash
      if (flashRef.current) {
        flashRef.current.style.opacity = '1';
        setTimeout(() => {
          if (flashRef.current) flashRef.current.style.opacity = '0';
        }, 80);
      }
    };

    const handleMouseUp = () => {
      setIsPressed(false);
    };

    // Detect hover over interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-pointer, [data-interactive="true"]'
      );

      if (interactive) {
        setIsHovered(true);
        const ariaLabel = interactive.getAttribute('aria-label') || interactive.getAttribute('title');
        if (ariaLabel && ariaLabel.length < 18) {
          setCursorText(`FOCUS · ${ariaLabel.toUpperCase()}`);
        } else {
          setCursorText('● FOCUS REC');
        }
      } else {
        setIsHovered(false);
        setCursorText('CAM 1 · 24fps');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    // Animation loop for fluid camera gimbal lag
    const loop = () => {
      // Lerp camera position towards mouse position
      const ease = 0.22;
      cameraPos.current.x += (mousePos.current.x - cameraPos.current.x) * ease;
      cameraPos.current.y += (mousePos.current.y - cameraPos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cameraPos.current.x}px, ${cameraPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('has-camera-cursor');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <>
      {/* Subtle Camera Shutter Flash Overlay on Click */}
      <div
        ref={flashRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-[99998] bg-white/20 opacity-0 transition-opacity duration-100 ease-out"
      />

      {/* Camera Viewfinder & Camera Rig Cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-200 select-none ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          willChange: 'transform',
        }}
      >
        {/* Container centered exactly on mouse */}
        <div
          className={`relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out ${
            isPressed ? 'scale-85' : isHovered ? 'scale-110' : 'scale-100'
          }`}
        >
          {/* Viewfinder 4-Corner Frame Brackets */}
          <div
            className={`absolute transition-all duration-300 ease-out ${
              isHovered ? 'w-14 h-14' : 'w-11 h-11'
            }`}
          >
            {/* Top-Left Bracket */}
            <div
              className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 transition-colors duration-200 ${
                isHovered ? 'border-[#EF4444]' : 'border-[#C48D75]/80'
              }`}
            />
            {/* Top-Right Bracket */}
            <div
              className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 transition-colors duration-200 ${
                isHovered ? 'border-[#EF4444]' : 'border-[#C48D75]/80'
              }`}
            />
            {/* Bottom-Left Bracket */}
            <div
              className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 transition-colors duration-200 ${
                isHovered ? 'border-[#EF4444]' : 'border-[#C48D75]/80'
              }`}
            />
            {/* Bottom-Right Bracket */}
            <div
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 transition-colors duration-200 ${
                isHovered ? 'border-[#EF4444]' : 'border-[#C48D75]/80'
              }`}
            />
          </div>

          {/* Camera HUD Indicator Pill (Above Viewfinder) */}
          <div
            className={`absolute -top-6 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase border whitespace-nowrap transition-all duration-200 shadow-md ${
              isHovered
                ? 'bg-[#18181B] text-[#EF4444] border-[#EF4444]/60 scale-105'
                : 'bg-[#141413]/90 text-[#C48D75] border-[#C48D75]/35'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isHovered ? 'bg-[#EF4444] animate-ping' : 'bg-[#C48D75]'
                }`}
              />
              {cursorText}
            </span>
          </div>

          {/* Cinema Camera Graphic with Optical Lens Center */}
          <div className="relative">
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
            >
              {/* Cinema Camera Main Body */}
              <rect
                x="3"
                y="7"
                width="15"
                height="13"
                rx="2.5"
                fill="#161514"
                stroke="#C48D75"
                strokeWidth="1.5"
              />
              {/* Top Handle / Rigging */}
              <path
                d="M5.5 7V4.5H12.5V7"
                stroke="#C48D75"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              {/* Matte Box / Front Lens Barrel */}
              <path
                d="M18 10L24 7.5V19.5L18 17V10Z"
                fill="#161514"
                stroke="#C48D75"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              {/* Optical Lens Outer Ring */}
              <circle
                cx="10.5"
                cy="13.5"
                r="3.5"
                stroke="#FAF0E6"
                strokeWidth="1.2"
              />
              {/* Aperture Center Dot (Exact Target Reticle) */}
              <circle
                cx="10.5"
                cy="13.5"
                r="1.6"
                fill={isHovered ? '#EF4444' : '#C48D75'}
                className="transition-colors duration-200"
              />
              {/* Red Tally / Recording Light */}
              <circle
                cx="5.5"
                cy="9.5"
                r="1.2"
                fill="#EF4444"
                className={isHovered ? 'animate-pulse' : ''}
              />
            </svg>

            {/* Precision Crosshair Target Center */}
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full pointer-events-none transition-transform duration-150 ${
                isHovered ? 'bg-[#EF4444] scale-125' : 'bg-transparent'
              }`}
            />
          </div>
        </div>
      </div>
    </>
  );
}

