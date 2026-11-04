import React, { useState } from 'react';
import FireworksCanvas from './FireworksCanvas';
import DiwaliDecorations from './DiwaliDecorations';

/**
 * DiwaliExperience - Flipkart-Inspired Festive Fireworks & Atmosphere
 *
 * Provides:
 * 1. Continuous, realistic HTML5 Canvas fireworks show with rockets, starbursts, willows, cracklers, and grand salvos.
 * 2. Premium festive Diwali atmosphere with hanging Kandil lanterns, glowing terracotta Diyas, top fairy lights, and subtle night-sky illumination.
 * 3. Self-contained Web Audio API realistic fireworks sounds (launch whoosh, booming explosion, popping crackles).
 * 4. Completely non-intrusive: pointer-events: none on all animation layers so existing buttons, forms, and pages work seamlessly.
 * 5. Full responsiveness, 60fps optimization, mobile-friendly particle scaling, and prefers-reduced-motion support.
 */
export default function DiwaliExperience() {
  const [fireworksEnabled, setFireworksEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  return (
    <div className="diwali-experience-container" aria-label="Diwali Festive Fireworks Experience">
      {/* 1. Realistic Canvas Fireworks Engine */}
      <FireworksCanvas isEnabled={fireworksEnabled} soundEnabled={soundEnabled} />

      {/* 2. Traditional Festive Visual Design & Interactive Controls */}
      <DiwaliDecorations
        fireworksEnabled={fireworksEnabled}
        setFireworksEnabled={setFireworksEnabled}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />
    </div>
  );
}

