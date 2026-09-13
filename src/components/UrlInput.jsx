import React, { useState } from 'react';
import { Link2, ArrowRight, Loader2, AlertCircle, Info, Server, Calendar } from 'lucide-react';
import { retrieveMediaFromApi, API_URL } from '../services/api';

export default function UrlInput() {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const validateUrl = (input) => {
    if (!input.trim()) {
      setError('Please paste an Instagram Reel, Post, or Story link to continue.');
      return false;
    }

    const containsInstagram = input.toLowerCase().includes('instagram.com');
    if (!containsInstagram) {
      setError('Please enter a valid Instagram URL (e.g., https://www.instagram.com/reel/...)');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiResponse(null);

    if (!validateUrl(url)) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await retrieveMediaFromApi(url);
      setApiResponse(response.data);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="relative mt-8">
        <div className="flex flex-col sm:flex-row items-stretch gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 p-2 backdrop-blur-xl shadow-2xl focus-within:border-fuchsia-500/50 transition-all duration-300">
          <div className="relative flex-grow flex items-center pl-3">
            <Link2 className="h-5 w-5 text-slate-500 mr-2" />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
                if (apiResponse) setApiResponse(null);
              }}
              disabled={isLoading}
              placeholder="Paste Instagram Reel, Post or Story URL"
              className="w-full bg-transparent py-3 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none text-base disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-6 py-4 text-base font-semibold text-white transition-all hover:from-fuchsia-500 hover:to-indigo-500 active:scale-95 disabled:scale-100 disabled:opacity-50 cursor-pointer shadow-lg shadow-fuchsia-600/20"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Fetching...</span>
              </>
            ) : (
              <>
                <span>Download</span>
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error / Rejection Banner */}
      {error && (
        <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-300 animate-fadeIn text-left">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
          <div className="text-sm font-medium leading-relaxed">{error}</div>
        </div>
      )}

      {/* Premium Search Result Card */}
      {apiResponse && (
        <div className="mt-12 text-center animate-fadeIn">
          <h2 className="text-2xl font-extrabold text-white mb-6">
            Search result
          </h2>

          <div className="flex justify-center">
            {/* Visual Media Card */}
            <div className="w-full max-w-[340px] rounded-3xl border border-slate-800 bg-slate-900/40 shadow-2xl overflow-hidden backdrop-blur-xl flex flex-col">
              
              {/* Media Preview Window */}
              <div className="relative aspect-[9/16] bg-slate-950 w-full overflow-hidden flex items-center justify-center">
                {apiResponse.type === 'Reel' || apiResponse.type === 'Story' || apiResponse.type === 'VIDEO' || apiResponse.type === 'video' ? (
                  <video
                    src={apiResponse.downloadUrl}
                    poster={apiResponse.thumbnailUrl}
                    controls
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={apiResponse.downloadUrl}
                    className="w-full h-full object-cover"
                    alt="Media Preview"
                  />
                )}
              </div>

              {/* Download Action Wrapper */}
              <div className="p-4 bg-slate-900 border-t border-slate-800">
                {apiResponse.downloadUrl ? (
                  <a
                    href={`${API_URL}/api/media/download?url=${encodeURIComponent(apiResponse.downloadUrl)}&type=${apiResponse.type}`}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all duration-200 text-center block text-base active:scale-[0.97] shadow-lg shadow-blue-600/25"
                  >
                    Download
                  </a>
                ) : (
                  <span className="text-xs text-rose-400 font-semibold block py-2">
                    No downloadable resource returned
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details layout below the card */}
          <div className="mt-8 max-w-lg mx-auto rounded-xl border border-slate-800/80 bg-slate-950/20 p-4 text-left">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="text-[10px] text-fuchsia-400 font-extrabold uppercase tracking-wider">Media Details</span>
              <span className="flex items-center gap-1 text-[10px] text-slate-500">
                <Server className="h-3 w-3" />
                {apiResponse.source || 'Direct Resolver'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
              {apiResponse.message || 'Media successfully processed and ready to download.'}
            </p>
            <div className="mt-2.5 flex items-center gap-1.5 text-[10px] text-slate-500">
              <Calendar className="h-3 w-3" />
              <span>Resolved: {new Date(apiResponse.timestamp || Date.now()).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* Info notice */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Info className="h-3.5 w-3.5" />
        <span>InstaSave supports public Instagram Reels, Posts, and Stories.</span>
      </div>
    </div>
  );
}
