import React from 'react';
import UrlInput from './UrlInput';
import { ShieldCheck, HelpCircle } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Background Glow Elements */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-fuchsia-600/10 to-indigo-600/10 blur-[120px] pointer-events-none"></div>
      
      <div className="mx-auto max-w-5xl px-4 text-center">
        {/* Badge */}
        <div className="mx-auto mb-6 inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-md">
          <span className="flex h-2 w-2 rounded-full bg-fuchsia-500 animate-ping"></span>
          <span>Compliant Media Archiving Tool</span>
        </div>

        {/* Title */}
        <h1 className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl max-w-4xl mx-auto leading-tight md:leading-none">
          Download Your <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-fuchsia-400 to-indigo-500 bg-clip-text text-transparent">Instagram Media</span>
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
