import React from 'react';
import { Shield, Eye, HelpCircle, HardDrive } from 'lucide-react';

export default function About() {
  const policies = [
    {
      title: 'Copyright Ownership',
      description: 'InstaSave is designed exclusively for downloading media you own or have explicit permission to access from creators.',
      icon: Shield,
    },
    {
      title: 'Zero Scraping',
      description: 'We do not build databases, run automated scrapers, or circumvent Instagram API access limits.',
      icon: Eye,
    },
    {
      title: 'No Authentication Bypass',
      description: 'Private media cannot be downloaded. We strictly adhere to Instagram privacy guidelines and access tokens.',
      icon: HardDrive,
    },
  ];

  return (
    <section id="about" className="py-20 border-t border-slate-900 bg-slate-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Copy */}
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-3.5 py-1 text-xs font-semibold text-fuchsia-400 mb-6">
              <HelpCircle className="h-3.5 w-3.5" />
              General Guidelines
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl leading-tight">
              Responsible & Authorized Media Retrievals
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed">
              InstaSave prioritizes ethical standards and developer API compliance. Our tool enables content creators, social media managers, and archivists to secure backup copies of their intellectual property without violating platforms' terms of service.
            </p>
            <p className="mt-4 text-base text-slate-400 leading-relaxed">
              We do not store downloaded files on our servers. All media data processing is handled on-the-fly and passed directly to your client web browser.
            </p>
          </div>

          {/* Right Side: Features */}
          <div className="space-y-6">
            {policies.map((policy, idx) => {
              const Icon = policy.icon;
              return (
                <div
                  key={idx}
                  className="flex gap-4 rounded-2xl border border-slate-800/80 bg-slate-900/20 p-6 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-slate-300">
                    <Icon className="h-5 w-5 text-fuchsia-500" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{policy.title}</h3>
                    <p className="mt-1.5 text-sm text-slate-400 leading-relaxed">
                      {policy.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
