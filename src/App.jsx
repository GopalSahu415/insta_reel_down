import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthPanel from './components/AuthPanel';
import SupportedMedia from './components/SupportedMedia';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 selection:bg-fuchsia-500 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Navigation */}
      <Navbar />

      {/* Hero with UrlInput */}
      <Hero />

      {/* Meta API Authorization Status & Simulation Panel */}
      <AuthPanel />

      {/* Features / Supported Media */}
      <SupportedMedia />

      {/* How it Works timeline */}
      <HowItWorks />

      {/* About Section */}
      <About />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
