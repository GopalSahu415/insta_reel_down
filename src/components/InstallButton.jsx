import React, { useState, useEffect } from 'react';
import { Smartphone, X } from 'lucide-react';

export default function InstallButton({ className = '', variant = 'nav' }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showGuideModal, setShowGuideModal] = useState(false);

  useEffect(() => {
    // Check if app is already running in standalone PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      setShowGuideModal(false);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show native install prompt
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      // If browser doesn't support or expose beforeinstallprompt, open guide modal
      setShowGuideModal(true);
    }
  };

  // If already installed and running standalone, do not show button
  if (isInstalled) {
    return null;
  }

  return (
    <>
      {variant === 'nav' ? (
        <button
          onClick={handleInstallClick}
          type="button"
          aria-label="Install InstaReel Pro app"
          className={`inline-flex items-center gap-1.5 rounded-full border border-fuchsia-500/40 bg-gradient-to-r from-fuchsia-600/20 to-indigo-600/20 px-3.5 py-1 text-xs font-semibold text-fuchsia-300 hover:border-fuchsia-400 hover:bg-fuchsia-500/30 transition-all duration-200 cursor-pointer shadow-sm shadow-fuchsia-500/10 ${className}`}
        >
          <Smartphone className="h-3.5 w-3.5 text-fuchsia-400 animate-pulse" />
          <span>Install App</span>
        </button>
      ) : (
        <button
          onClick={handleInstallClick}
          type="button"
          aria-label="Install InstaReel Pro app on your phone"
          className={`w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/25 hover:from-fuchsia-500 hover:to-indigo-500 transition-all cursor-pointer ${className}`}
        >
          <Smartphone className="h-4 w-4" />
          <span>Install InstaReel Pro App</span>
        </button>
      )}

      {/* Manual Install Instructions Modal (when native prompt isn't directly triggered) */}
      {showGuideModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl text-left">
            {/* Close Button */}
            <button
              onClick={() => setShowGuideModal(false)}
              className="absolute top-4 right-4 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-fuchsia-600 to-indigo-600 text-white shadow-lg shadow-fuchsia-500/20">
                <Smartphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Install InstaReel Pro</h3>
                <p className="text-xs text-slate-400">Add to your Android home screen</p>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-3.5 py-2 text-xs sm:text-sm text-slate-300">
              <div className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/20 text-fuchsia-400 font-bold text-xs">
                  1
                </span>
                <p className="leading-snug">
                  Tap the browser menu <strong className="text-white font-semibold">⋮</strong> (three dots) in the top-right corner of Chrome.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/20 text-fuchsia-400 font-bold text-xs">
                  2
                </span>
                <p className="leading-snug">
                  Select <strong className="text-white font-semibold">"Install app"</strong> or <strong className="text-white font-semibold">"Add to Home screen"</strong>.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/20 text-fuchsia-400 font-bold text-xs">
                  3
                </span>
                <p className="leading-snug">
                  Tap <strong className="text-white font-semibold">Install</strong> to confirm. The app icon will appear on your phone home screen!
                </p>
              </div>
            </div>

            {/* Note & OK button */}
            <div className="mt-5 flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setShowGuideModal(false)}
                className="w-full rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/20 hover:from-fuchsia-500 hover:to-indigo-500 transition-all cursor-pointer text-center"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
