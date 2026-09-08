import React from 'react';
import { Film, Image, History, ArrowRight } from 'lucide-react';

export default function SupportedMedia() {
  const formats = [
    {
      title: 'Reels',
      description: 'Download high-definition videos from Reels. Perfect for saving creative shorts and inspirational video clips you own.',
      icon: Film,
      color: 'from-pink-500 to-rose-500',
      badge: 'Video',
    },
    {
      title: 'Posts',
      description: 'Retrieve single-image posts, multi-photo carousels, or video posts along with their original resolution settings.',
      icon: Image,
      color: 'from-fuchsia-500 to-indigo-500',
      badge: 'Photos & Slides',
    },
    {
      title: 'Stories',
      description: 'Save active Stories before they expire. Keep high-fidelity archives of your daily updates and highlighted stories.',
      icon: History,
      color: 'from-amber-500 to-fuchsia-500',
      badge: '24h Expiry',
    },
  ];

  return (
    <section id="supported-media" className="py-20 border-t border-slate-900 bg-slate-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Supported Media Types
          </h2>
          <p className="mt-4 text-base text-slate-400">
            InstaSave provides secure retrieval capabilities across major Instagram content formats. Save content directly at maximum available quality.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {formats.map((format, idx) => {
            const IconComponent = format.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:bg-slate-900/50 hover:shadow-xl hover:shadow-fuchsia-500/[0.02]"
              >
                {/* Accent line on hover */}
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-slate-800 to-transparent transition-all group-hover:from-fuchsia-500 group-hover:to-indigo-500"></div>

                <div className="flex justify-between items-start mb-6">
                  {/* Icon */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${format.color} text-white shadow-lg`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  {/* Badge */}
                  <span className="rounded-full bg-slate-800/50 border border-slate-700 px-3 py-1 text-xs font-medium text-slate-300">
                    {format.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-fuchsia-400 transition-colors">
                  {format.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {format.description}
                </p>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 group-hover:text-slate-300 transition-colors">
                  <span>Retrieve compliant files</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
