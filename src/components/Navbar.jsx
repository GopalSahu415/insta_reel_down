import React, { useState } from 'react';
import { Download, Menu, X, ShieldCheck } from 'lucide-react';
import InstallButton from './InstallButton';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-fuchsia-500/20">
              <Download className="h-5 w-5 animate-pulse" />
            </div>
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-xl font-bold tracking-tight text-transparent">
              Insta<span className="text-fuchsia-500">Save</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('supported-media')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Supported Formats
            </button>
            <div className="h-4 w-px bg-slate-800"></div>
            <InstallButton variant="nav" />
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Compliant Integration
            </div>
          </div>

          {/* Mobile menu button and quick install */}
          <div className="flex items-center gap-2 md:hidden">
            <InstallButton variant="nav" />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-slate-900 hover:text-white focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 px-2 pt-2 pb-4 space-y-1 sm:px-3 animate-fadeIn">
          <button
            onClick={() => scrollToSection('how-it-works')}
            className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('supported-media')}
            className="block w-full text-left rounded-lg px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
          >
            Supported Formats
          </button>
          <div className="border-t border-slate-800 my-2 pt-3 px-3 space-y-2.5">
            <InstallButton variant="full" />
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" />
              Compliant Integration
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
