import React, { useEffect, useState } from 'react';
import { ShieldCheck, ShieldAlert, Key, Link, Link2Off, RefreshCw, HelpCircle } from 'lucide-react';
import { getAuthSession, connectAuthMock, disconnectAuthMock } from '../services/api';

export default function AuthPanel() {
  const [session, setSession] = useState({
    isConnected: false,
    accessToken: null,
    status: 'disconnected',
    accountName: null,
    isSandbox: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sandboxVisible, setSandboxVisible] = useState(true);

  const fetchSession = async () => {
    setIsLoading(true);
    try {
      const response = await getAuthSession();
      setSession(response.data);
    } catch (err) {
      console.error('Failed to retrieve authentication session:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  const handleConnect = async (stateType) => {
    setIsLoading(true);
    try {
      const response = await connectAuthMock(stateType);
      setSession(response.data);
      // Reload page state or let other components know by firing a global event
      window.dispatchEvent(new Event('auth-change'));
    } catch (err) {
      console.error('Failed to connect mock profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setIsLoading(true);
    try {
      const response = await disconnectAuthMock();
      setSession(response.data);
      window.dispatchEvent(new Event('auth-change'));
    } catch (err) {
      console.error('Failed to disconnect profile:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-6">
      {/* Session Banner (Only displayed if disconnected or expired/revoked) */}
      {session.status !== 'connected' && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            {session.isConnected && session.status === 'expired' ? (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <ShieldAlert className="h-6 w-6 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-300 text-base">{session.accountName}</h3>
                    <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">Expired Token</span>
                  </div>
                  <p className="text-xs text-rose-300 mt-1 font-medium">Session expired. Please re-authenticate your Instagram Developer link.</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800 text-slate-400">
                  <Link2Off className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-400 text-base">Meta Account Disconnected</h3>
                    <span className="rounded-full bg-slate-800 border border-slate-700 px-2 py-0.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Inactive</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Connect your Instagram Business/Creator account to search owned assets.</p>
                </div>
              </>
            )}
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
            <button
              onClick={() => handleConnect('connected')}
              disabled={isLoading}
              className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white transition-all hover:from-fuchsia-500 hover:to-indigo-500 shadow-lg shadow-fuchsia-600/10 cursor-pointer"
            >
              <Link className="h-4 w-4" />
              Connect Instagram Professional
            </button>
          </div>
        </div>
      )}

      {/* Sandbox Controller Module (Visible for debugging/testing) */}
      {session.isSandbox && sandboxVisible && (
        <div className="mt-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/50 p-5 text-left animate-fadeIn">
          <div className="flex justify-between items-center pb-3 border-b border-slate-900">
            <span className="text-xs font-extrabold text-fuchsia-400 tracking-wider uppercase flex items-center gap-1.5">
              <Key className="h-3.5 w-3.5" />
              Meta API Sandbox Simulator Panel
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Use these presets to test all 5 requested states</span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              onClick={() => handleConnect('connected')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${session.isConnected && session.status === 'connected' ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'}`}
            >
              Preset 1: Token Active
            </button>
            <button
              onClick={() => handleConnect('expired')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${session.isConnected && session.status === 'expired' ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'}`}
            >
              Preset 2: Token Expired
            </button>
            <button
              onClick={handleDisconnect}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${!session.isConnected ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-400' : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'}`}
            >
              Preset 3: Disconnected
            </button>
          </div>

          {/* Sandbox Test Cases Instructions */}
          <div className="mt-4 bg-slate-900/40 border border-slate-800/80 rounded-xl p-3.5">
            <h4 className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
              <HelpCircle className="h-3.5 w-3.5 text-fuchsia-400" />
              How to verify the 5 user-requested test scenarios:
            </h4>
            <ul className="text-xs space-y-1.5 text-slate-400 list-disc list-inside">
              <li><strong>Case A & B (Authorized media)</strong>: Select <i>Token Active</i>, paste <b>any standard Instagram Reel/Post/Story URL</b>. Result: Verification passes and Downloader activates.</li>
              <li><strong>Case C (Third-party rejection)</strong>: Paste a URL containing the text <code className="text-fuchsia-300">third-party</code>. Result: Rejected by server.</li>
              <li><strong>Case D (Private/Unsupported)</strong>: Paste a URL containing the text <code className="text-fuchsia-300">private</code>. Result: Rejected by server.</li>
              <li><strong>Case E (Expired/Revoked Token)</strong>: Select <i>Token Expired</i> (or paste a URL containing <code className="text-fuchsia-300">expired-token</code>). Result: Prompts reconnect.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
