/**
 * DiwaliAudio - Realistic Web Audio API Sound Synthesizer for Fireworks
 * 100% self-contained synthesized sounds without external audio assets.
 */

class DiwaliAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Respect user by starting muted
    this.masterGain = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    } catch {
      // Gracefully ignore audio failure in unsupported environments
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (!this.ctx) {
      if (!muted) this.init();
    } else {
      if (this.ctx.state === 'suspended' && !muted) {
        this.ctx.resume();
      }
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(muted ? 0 : 0.35, this.ctx.currentTime, 0.05);
      }
    }
  }

  // Realistic rocket launch whoosh
  playLaunch() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') return;
      const now = this.ctx.currentTime;
      const duration = 0.8 + Math.random() * 0.3;

      // Filtered noise buffer for the rocket whoosh
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + duration);
      filter.Q.setValueAtTime(4, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.2, now + duration * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Audio playback safety catch
    }
  }

  // Deep resonant sky boom explosion
  playExplosion(isLarge = false) {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') return;
      const now = this.ctx.currentTime;
      const duration = isLarge ? 1.4 : 0.9;

      // 1. Low frequency thump oscillator
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(isLarge ? 120 : 160, now);
      osc.frequency.exponentialRampToValueAtTime(28, now + duration);

      oscGain.gain.setValueAtTime(isLarge ? 0.6 : 0.4, now);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(oscGain);
      oscGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration);

      // 2. Exploding crackle noise
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isLarge ? 800 : 1200, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + duration);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(isLarge ? 0.5 : 0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(this.masterGain);

      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Audio playback safety catch
    }
  }

  // Sparkling crackle burst (Diwali sparklers / chatai effect)
  playCrackle() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.ctx.state === 'suspended') return;
      const count = 4 + Math.floor(Math.random() * 4);
      for (let i = 0; i < count; i++) {
        const delay = Math.random() * 0.35;
        setTimeout(() => {
          if (this.isMuted || !this.ctx || this.ctx.state === 'suspended') return;
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(800 + Math.random() * 1200, now);
          osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);

          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

          osc.connect(gain);
          gain.connect(this.masterGain);
          osc.start(now);
          osc.stop(now + 0.05);
        }, delay * 1000);
      }
    } catch {
      // Audio playback safety catch
    }
  }
}

export const diwaliAudio = new DiwaliAudioEngine();
export default diwaliAudio;

