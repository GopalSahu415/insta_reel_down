import React from 'react';
import { Clipboard, ShieldCheck, DownloadCloud } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Paste Link',
      description: 'Copy the URL of the Reel, Post, or Story from Instagram and paste it in the box above.',
      icon: Clipboard,
    },
    {
      step: '02',
      title: 'Verify & Retrieve',
      description: 'Our system validates compliance and fetches the original media file via client-safe pipelines.',
      icon: ShieldCheck,
    },
    {
      step: '03',
      title: 'Save Media',
      description: 'Download the source file directly to your system in high-definition formats.',
      icon: DownloadCloud,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 border-t border-slate-900 bg-slate-950/40 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-base text-slate-400">
            A simple, transparent, and completely compliant 3-step process to download authorized Instagram media assets.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[52px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-fuchsia-600/30 via-slate-800 to-indigo-600/30 -z-10"></div>

          {steps.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center group">
                {/* Numeric step badge */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-slate-800 bg-slate-900 text-lg font-bold text-slate-300 transition-all duration-300 group-hover:border-fuchsia-500 group-hover:text-fuchsia-400 group-hover:scale-105 shadow-xl">
                  <IconComp className="h-6 w-6 text-slate-400 group-hover:text-fuchsia-500 transition-colors" />
                  <span className="absolute -top-3.5 -right-3.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400 group-hover:bg-fuchsia-500 group-hover:text-white group-hover:border-fuchsia-400 transition-all duration-300">
                    {item.step}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-bold text-white group-hover:text-slate-100 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 max-w-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
