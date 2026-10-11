import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Safely clean up any legacy ChatApp caches to prevent stale PWA shells
if (typeof window !== 'undefined' && 'caches' in window) {
  caches.keys().then((cacheNames) => {
    cacheNames.forEach((name) => {
      if (name.includes('chat-app') || name.includes('chatapp')) {
        caches.delete(name);
      }
    });
  }).catch(() => {
    // Ignore cache cleanup errors in unsupported environments
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
