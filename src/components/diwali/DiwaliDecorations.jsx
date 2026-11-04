import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react';
import './diwali.css';

/**
 * Hanging Traditional Kandil Lantern (SVG Component)
 * Upgraded with rich royal purple, vibrant magenta, and golden filigree.
 */
function KandilLantern({ className = '', style = {} }) {
  return (
    <div className={`pointer-events-none drop-shadow-[0_0_25px_rgba(245,158,11,0.4)] ${className}`} style={style}>
      <svg
        width="76"
        height="130"
        viewBox="0 0 68 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-24 sm:w-18 sm:h-32 overflow-visible"
      >
        <defs>
          <linearGradient id="kandilBodyVibrant" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9333EA" />
            <stop offset="35%" stopColor="#C026D3" />
            <stop offset="70%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#701A75" />
          </linearGradient>
          <linearGradient id="kandilGoldVibrant" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9C4" />
            <stop offset="40%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="kandilOrangeCore" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="50%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
          <radialGradient id="kandilAura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 220, 80, 0.9)" />
            <stop offset="50%" stopColor="rgba(245, 158, 11, 0.5)" />
            <stop offset="100%" stopColor="rgba(217, 70, 239, 0)" />
          </radialGradient>
          <filter id="kandilInnerGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient Backlight Aura */}
        <circle cx="34" cy="42" r="26" fill="url(#kandilAura)" />

        {/* Suspension Cord */}
        <line x1="34" y1="0" x2="34" y2="16" stroke="#FDE047" strokeWidth="1.6" strokeDasharray="2,2" />
        <circle cx="34" cy="16" r="3" fill="#FBBF24" />

        {/* Top Canopy */}
        <path d="M 20 18 L 48 18 L 42 24 L 26 24 Z" fill="url(#kandilGoldVibrant)" />

        {/* Main Central Diamond Lantern Body */}
        <polygon
          points="34,22 58,42 34,62 10,42"
          fill="url(#kandilBodyVibrant)"
          stroke="url(#kandilGoldVibrant)"
          strokeWidth="1.8"
        />

        {/* Inner Glowing Star Window */}
        <polygon
          points="34,29 48,42 34,55 20,42"
          fill="url(#kandilOrangeCore)"
          opacity="0.95"
        />
        <circle
          cx="34"
          cy="42"
          r="7"
          fill="#FFFDF0"
          filter="url(#kandilInnerGlow)"
          className="animate-pulse"
        />

        {/* Decorative Corner Tabs */}
        <polygon points="10,42 15,33 20,42" fill="url(#kandilGoldVibrant)" />
        <polygon points="58,42 53,33 48,42" fill="url(#kandilGoldVibrant)" />

        {/* Bottom Filigree Ring */}
        <rect x="23" y="62" width="22" height="4.5" rx="2" fill="url(#kandilGoldVibrant)" />

        {/* Swaying Golden Tassels */}
        <line x1="25" y1="67" x2="23" y2="94" stroke="#FBBF24" strokeWidth="1.4" />
        <circle cx="23" cy="95" r="1.8" fill="#F59E0B" />

        <line x1="29" y1="67" x2="28" y2="108" stroke="#FDE047" strokeWidth="1.4" />
        <circle cx="28" cy="109" r="2.2" fill="#E11D48" />

        <line x1="34" y1="67" x2="34" y2="118" stroke="#FFF9C4" strokeWidth="1.8" />
        <circle cx="34" cy="119" r="2.6" fill="#FBBF24" />

        <line x1="39" y1="67" x2="40" y2="108" stroke="#FDE047" strokeWidth="1.4" />
        <circle cx="40" cy="109" r="2.2" fill="#E11D48" />

        <line x1="43" y1="67" x2="45" y2="94" stroke="#FBBF24" strokeWidth="1.4" />
        <circle cx="45" cy="95" r="1.8" fill="#F59E0B" />
      </svg>
    </div>
  );
}

/**
 * Traditional Glowing Terracotta Diya (SVG Component)
 * Upgraded with multi-layered flickering flames and surface reflections.
 */
function GlowingDiya({ className = '', size = 56 }) {
  return (
    <div className={`pointer-events-none relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={Math.round(size * 0.78)}
        viewBox="0 0 60 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="clayGradientVibrant" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="40%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#7C2D12" />
          </linearGradient>
          <linearGradient id="diyaRimGold" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="50%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="flameVibrant" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="45%" stopColor="#EA580C" />
            <stop offset="75%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>
          <radialGradient id="wickGlowCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="rgba(245, 158, 11, 0)" />
          </radialGradient>
        </defs>

        {/* Warm Ambient Surface Reflection */}
        <ellipse
          cx="30"
          cy="42"
          rx="24"
          ry="5"
          fill="rgba(245, 158, 11, 0.45)"
          className="diwali-diya-reflection"
          filter="blur(5px)"
        />

        {/* Terracotta Clay Diya Body */}
        <path
          d="M 9 26 C 9 38, 20 43, 30 43 C 40 43, 51 38, 51 26 C 51 24, 46 22, 30 22 C 14 22, 9 24, 9 26 Z"
          fill="url(#clayGradientVibrant)"
        />

        {/* Golden Metallic Rim */}
        <path
          d="M 7 25 C 14 20, 46 20, 53 25 C 46 27, 14 27, 7 25 Z"
          fill="url(#diyaRimGold)"
        />

        {/* Warm Inner Oil Surface */}
        <ellipse cx="30" cy="24" rx="17" ry="3.5" fill="#451A03" opacity="0.85" />

        {/* Flickering Diya Flame */}
        <g className="diwali-diya-flame" style={{ transformOrigin: '30px 22px' }}>
          {/* Outer Radiant Heat Halo */}
          <circle cx="30" cy="13" r="16" fill="rgba(245, 158, 11, 0.35)" filter="blur(7px)" />

          {/* Outer Orange-Red Flame Teardrop */}
          <path
            d="M 30 3 C 37 11, 38 18, 30 22 C 22 18, 23 11, 30 3 Z"
            fill="url(#flameVibrant)"
          />

          {/* Inner Golden Core */}
          <path
            d="M 30 8 C 34 13, 35 18, 30 21 C 25 18, 26 13, 30 8 Z"
            fill="#FEF08A"
          />

          {/* Incandescent Center Wick */}
          <circle cx="30" cy="16" r="2.5" fill="url(#wickGlowCore)" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Animated Fairy Lights Garland across screen header
 * Features 12 rich alternating jewel colors.
 */
function FairyLightsGarland() {
  const bulbs = [
    { color: '#FFD700', delay: '0s' },
    { color: '#FF1744', delay: '0.4s' },
    { color: '#00E5FF', delay: '0.8s' },
    { color: '#D946EF', delay: '1.2s' },
    { color: '#FF6D00', delay: '1.6s' },
    { color: '#3B82F6', delay: '0.3s' },
    { color: '#10B981', delay: '0.7s' },
    { color: '#EC4899', delay: '1.1s' },
    { color: '#8B5CF6', delay: '1.5s' },
    { color: '#F59E0B', delay: '0.2s' },
    { color: '#F43F5E', delay: '0.6s' },
    { color: '#76FF03', delay: '1.0s' },
  ];

  return (
    <div className="pointer-events-none absolute top-0 left-0 right-0 h-5 z-40 overflow-hidden flex justify-around items-start opacity-85">
      {bulbs.map((bulb, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="w-[1px] h-2 bg-slate-700/80"></div>
          <div
            className="w-2 h-2.5 rounded-full shadow-lg"
            style={{
              backgroundColor: bulb.color,
              color: bulb.color,
              boxShadow: `0 0 8px ${bulb.color}, 0 0 16px ${bulb.color}`,
              animation: `fairyLightBlink 2.2s ease-in-out infinite`,
              animationDelay: bulb.delay,
            }}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Master Diwali Festive Decor Layer
 */
export default function DiwaliDecorations({
  fireworksEnabled,
  setFireworksEnabled,
  soundEnabled,
  setSoundEnabled,
}) {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* 1. Soft Moving Festive Night Sky Atmosphere & Warm Illumination */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {/* Soft moving background gradient with royal purple, vibrant magenta, and amber */}
        <div
          className="diwali-ambient-glow absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[150vw] max-w-[1500px] h-[600px] rounded-[100%] blur-3xl pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 50% 0%, rgba(124, 58, 237, 0.24) 0%, rgba(217, 70, 239, 0.20) 25%, rgba(245, 158, 11, 0.16) 50%, rgba(11, 15, 25, 0) 75%)',
          }}
        />

        {/* Ambient Golden & Magenta Sky Aura */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[75vw] h-[260px] bg-gradient-to-r from-purple-600/10 via-amber-500/12 to-pink-600/10 blur-[110px] pointer-events-none" />
      </div>

      {/* 2. Top Fairy Lights Garland */}
      <FairyLightsGarland />

      {/* 3. Hanging Kandil Lanterns on Screen Corners */}
      <div className="pointer-events-none fixed top-16 left-2 sm:left-6 z-40">
        <KandilLantern className="diwali-lantern-left" />
      </div>
      <div className="pointer-events-none fixed top-16 right-2 sm:right-6 z-40">
        <KandilLantern className="diwali-lantern-right" />
      </div>

      {/* 4. Glowing Diyas Placed at Side Edges */}
      <div className="pointer-events-none fixed bottom-4 left-3 sm:left-6 z-40 hidden sm:block">
        <GlowingDiya size={56} />
      </div>
      <div className="pointer-events-none fixed bottom-4 right-3 sm:right-6 z-40 hidden sm:block">
        <GlowingDiya size={56} />
      </div>

      {/* 5. Festive Control Bar & Happy Diwali Greeting (Interactive) */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <div className="diwali-pill-glow flex items-center gap-2 sm:gap-3 rounded-full border border-amber-400/60 bg-slate-950/90 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-slate-100 shadow-2xl backdrop-blur-xl transition-all duration-300">
          {/* Happy Diwali Badge with Golden Shimmer Glow */}
          <div className="flex items-center gap-1.5 font-bold tracking-wide pr-1 sm:pr-2 border-r border-slate-700/60">
            <span className="text-base select-none animate-pulse">🪔</span>
            <span className="diwali-text-shimmer font-extrabold text-sm sm:text-base">
              Happy Diwali
            </span>
          </div>

          {!isMinimized && (
            <>
              {/* Fireworks Toggle with Colorful Active State */}
              <button
                type="button"
                onClick={() => setFireworksEnabled(!fireworksEnabled)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 hover:scale-105 ${
                  fireworksEnabled
                    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-md shadow-pink-500/30 border border-amber-300/60 hover:brightness-110'
                    : 'bg-slate-800/80 text-slate-400 border border-slate-700/60 hover:text-slate-200'
                }`}
                title={fireworksEnabled ? 'Pause Fireworks' : 'Play Fireworks'}
              >
                <Sparkles className={`h-3.5 w-3.5 ${fireworksEnabled ? 'text-amber-200 animate-spin' : 'text-slate-400'}`} style={{ animationDuration: '4s' }} />
                <span className="hidden sm:inline">Fireworks:</span>
                <span>{fireworksEnabled ? 'ON' : 'OFF'}</span>
              </button>

              {/* Sound Toggle (Web Audio API Synthesizer) with Vibrant Active State */}
              <button
                type="button"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 hover:scale-105 ${
                  soundEnabled
                    ? 'bg-gradient-to-r from-rose-600 to-orange-500 text-white shadow-md shadow-rose-500/30 border border-rose-300/60 hover:brightness-110'
                    : 'bg-slate-800/80 text-slate-400 border border-slate-700/60 hover:text-slate-200'
                }`}
                title={soundEnabled ? 'Mute Fireworks Audio' : 'Unmute Fireworks Audio'}
              >
                {soundEnabled ? (
                  <>
                    <Volume2 className="h-3.5 w-3.5 text-white animate-pulse" />
                    <span>Sound ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="h-3.5 w-3.5 text-slate-400" />
                    <span className="hidden sm:inline">Sound OFF</span>
                  </>
                )}
              </button>

              <span className="hidden lg:inline text-[11px] text-amber-200/80 font-medium pl-1 select-none">
                ✦ Tap sky to burst 🎆
              </span>
            </>
          )}

          {/* Minimize / Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800/70 transition-colors cursor-pointer"
            title={isMinimized ? 'Expand controls' : 'Collapse controls'}
          >
            {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </>
  );
}
