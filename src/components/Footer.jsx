import React from 'react';
import { Download, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-900 bg-slate-950/80 py-12 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white">
              <Download className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Insta<span className="text-fuchsia-500">Save</span>
            </span>
          </div>

          {/* Quick Info */}
          <div className="text-sm text-center md:text-right">
            <span className="flex items-center justify-center md:justify-end gap-1.5">
              Built with <Heart className="h-3.5 w-3.5 text-fuchsia-500 fill-fuchsia-500" /> for modern web development.
            </span>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-xs text-slate-500 leading-relaxed text-center lg:text-left">
            <p className="font-semibold text-slate-400 mb-1">Compliance & Terms Disclaimer</p>
            InstaSave is an independent web application design tool. It is not affiliated with, endorsed by, or associated with Instagram, Meta Platforms, Inc., or its subsidiaries. The tool does not perform automated extraction, scraping, or authorization bypass. Users are solely responsible for ensuring that they possess valid legal rights or creator consent to retrieve media files.
          </div>
          
          <div className="text-xs text-slate-500 whitespace-nowrap text-center">
            &copy; {currentYear} InstaSave. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
