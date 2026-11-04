import React from 'react';
import UrlInput from './UrlInput';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-purple-600/15 via-pink-600/10 to-amber-600/15 blur-[120px] pointer-events-none"></div>
      
      <div className="mx-auto max-w-5xl px-4 text-center">
        {/* Festive Golden-Purple Badge */}
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-gradient-to-r from-purple-950/50 via-amber-950/30 to-purple-950/50 px-4 py-1.5 text-xs sm:text-sm text-amber-200 backdrop-blur-md shadow-lg shadow-amber-500/15">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
          <span>⚡ Crafted with passion by <strong className="text-white font-semibold">Gopal</strong></span>
        </div>

        {/* Title */}
        <h1 className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight md:leading-none">
          Download Your <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Instagram Media</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-slate-400">
          InstaSave allows you to easily retrieve and archive Reels, Posts, and Stories you own or have explicit authorization to download. Completely secure and client-authorized.
        </p>

        {/* URL Input Form */}
        <UrlInput />
      </div>
    </section>
  );
}
