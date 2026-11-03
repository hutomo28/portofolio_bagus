'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageCircle, ArrowUpRight, Mail, MapPin, Copy, Check } from 'lucide-react';

// ⚙️ Update these with actual contact details when available
const INSTAGRAM_URL = 'https://www.instagram.com/b49us_ajh/';
const WHATSAPP_URL = 'https://wa.me/62YOUR_PHONE_NUMBER';

function InstagramIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

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

export default function Contact() {
  const { ref, inView } = useInView(0.1);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('bagoes.production@example.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      className="py-24 lg:py-32 relative text-white"
      style={{ background: 'var(--color-dark)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Availability */}
          <div className="lg:col-span-6">
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="h-px w-8 bg-[#8B6F5E]" />
              <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#8B6F5E]">
                SEC_04 // DISPATCH & INQUIRY
              </span>
            </div>

            <h2
              className={`mb-6 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(44px, 6vw, 84px)',
                fontWeight: 800,
                lineHeight: 0.95,
                color: 'white',
                letterSpacing: '-0.025em',
                transitionDelay: '100ms',
              }}
            >
              Let's Work
              <br />
              <span className="italic font-normal text-[#8B6F5E]">Together.</span>
            </h2>

            <p
              className={`max-w-md text-sm leading-relaxed text-[#A0A0A0] mb-8 transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Have a shoot coming up or need crew for a date? Reach out by message or email.
              Available for camera assistance, lighting setups, and production coordination.
            </p>

            {/* Quick Details Badges */}
            <div
              className={`flex flex-wrap items-center gap-4 text-xs font-mono text-[#888888] transition-all duration-700 ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#8B6F5E]" />
                <span>INDONESIA BASED</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-rec-dot" />
                <span>CALL SHEET READY</span>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Cards */}
          <div
            className={`lg:col-span-6 space-y-4 transition-all duration-700 ${
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Instagram Link Card */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 border border-white/10 hover:border-[#8B6F5E] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#8B6F5E]"
                    style={{ backgroundColor: 'rgba(139, 111, 94, 0.15)' }}
                  >
                    <InstagramIcon
                      size={20}
                      className="text-[#8B6F5E] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white text-base">Instagram</p>
                      <span className="text-[10px] font-mono uppercase text-[#8B6F5E] bg-[#8B6F5E]/20 px-2 py-0.5">
                        DM & UPDATES
                      </span>
                    </div>
                    <p className="text-xs text-[#888888] mt-1 font-mono">
                      @b49us_ajh
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#777777] group-hover:text-white group-hover:border-[#8B6F5E] group-hover:bg-[#8B6F5E] transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </a>

            {/* WhatsApp Link Card */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 border border-white/10 hover:border-[#4A6FA5] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-[#4A6FA5]"
                    style={{ backgroundColor: 'rgba(74, 111, 165, 0.15)' }}
                  >
                    <MessageCircle
                      size={20}
                      className="text-[#4A6FA5] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white text-base">WhatsApp</p>
                      <span className="text-[10px] font-mono uppercase text-[#4A6FA5] bg-[#4A6FA5]/20 px-2 py-0.5">
                        DIRECT CHAT
                      </span>
                    </div>
                    <p className="text-xs text-[#888888] mt-1 font-mono">
                      Fast response for schedule & shoot inquiries
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#777777] group-hover:text-white group-hover:border-[#4A6FA5] group-hover:bg-[#4A6FA5] transition-all">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </a>

            {/* Note on bottom */}
            <div className="p-4 border border-dashed border-white/10 text-center text-xs font-mono text-[#777777]">
              <span>OPEN TO TRAVEL & ON-LOCATION ASSIGNMENTS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
