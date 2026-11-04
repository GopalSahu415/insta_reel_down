import React, { useEffect, useRef } from 'react';
import diwaliAudio from './DiwaliAudio';

// Rich Festive Diwali Color Palettes
const COLOR_PALETTES = [
  // 1. Rainbow Festival (Spectacular Multicolor)
  {
    name: 'rainbow-festival',
    isRainbow: true,
    colors: ['#FF1744', '#FF6D00', '#FFD700', '#10B981', '#00E5FF', '#3B82F6', '#9333EA', '#EC4899', '#FFFFFF'],
    primary: '#FFD700',
  },
  // 2. Royal Purple & Golden Amber
  {
    name: 'royal-purple-gold',
    colors: ['#7C3AED', '#8B5CF6', '#9333EA', '#C084FC', '#FFD700', '#F59E0B', '#FDE047', '#FFFFFF'],
    primary: '#8B5CF6',
  },
  // 3. Electric Cyan & Vibrant Magenta (Neon Night)
  {
    name: 'electric-cyan-magenta',
    colors: ['#00E5FF', '#22D3EE', '#06B6D4', '#E11D48', '#F43F5E', '#D946EF', '#FF4081', '#FFFFFF'],
    primary: '#00E5FF',
  },
  // 4. Sunset Saffron, Orange & Ruby Red
  {
    name: 'saffron-ruby',
    colors: ['#FF6D00', '#FF5722', '#F97316', '#EF4444', '#DC2626', '#FFD700', '#FFA726', '#FFF8E1'],
    primary: '#FF6D00',
  },
  // 5. Imperial Gold & Weeping Amber
  {
    name: 'imperial-gold',
    colors: ['#FFD700', '#FFC107', '#FFA000', '#FBBF24', '#F59E0B', '#FFF9C4', '#FFFFFF'],
    primary: '#FFD700',
  },
  // 6. Electric Blue & Diamond Cyan
  {
    name: 'electric-blue-cyan',
    colors: ['#2563EB', '#3B82F6', '#60A5FA', '#00E5FF', '#18FFFF', '#84FFFF', '#FFFFFF'],
    primary: '#3B82F6',
  },
  // 7. Cosmic Multi-Jewel
  {
    name: 'cosmic-jewel',
    isRainbow: true,
    colors: ['#FF1493', '#00E5FF', '#FFD700', '#76FF03', '#9333EA', '#FF5722', '#F43F5E', '#3B82F6'],
    primary: '#FF1493',
  },
];

export default function FireworksCanvas({ isEnabled = true, soundEnabled = false }) {
  const canvasRef = useRef(null);

  // Sync sound setting
  useEffect(() => {
    diwaliAudio.setMuted(!soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Detect Device Capabilities (Not relying solely on width)
    const isSmallScreen = window.innerWidth < 768;
    const isTouch = typeof navigator !== 'undefined' && (navigator.maxTouchPoints > 0 || 'ontouchstart' in window);
    const lowCores = typeof navigator !== 'undefined' && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    const lowMemory = typeof navigator !== 'undefined' && navigator.deviceMemory && navigator.deviceMemory <= 4;
    const isMobile = isSmallScreen || (isTouch && (lowCores || lowMemory));

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensions & Scaling
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Mobile: Lock DPR to 1.0 to save 75% GPU fillrate and prevent lag!
    // Desktop: Cap at 1.5 for sharpness without 4K overhead
    const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.5);

    const applyCanvasSize = (w, h) => {
      width = w;
      height = h;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      if (dpr !== 1) {
        ctx.scale(dpr, dpr);
      }
    };

    applyCanvasSize(width, height);

    // Prevent excessive resizing from mobile address-bar hide/show
    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      if (Math.abs(newW - width) > 30 || Math.abs(newH - height) > 120) {
        applyCanvasSize(newW, newH);
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Scroll throttle: pause new launches during fast mobile scrolling to keep UI 60 FPS
    let isScrolling = false;
    let scrollTimeout = null;
    const handleScroll = () => {
      if (!isMobile) return;
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 160);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // -------------------------------------------------------------------------
    // High-Performance Object Pooling (Zero allocations during animation loop)
    // -------------------------------------------------------------------------
    const MAX_PARTICLES = isMobile ? 70 : 260;
    const particlePool = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particlePool.push({
        active: false,
        x: 0,
        y: 0,
        prevX: 0,
        prevY: 0,
        vx: 0,
        vy: 0,
        color: '#FFD700',
        size: 2,
        alpha: 1,
        decay: 0.01,
        friction: 0.965,
        gravity: 0.05,
        isCascading: false,
        isStrobe: false,
        strobeTick: 0,
        canCrackle: false,
        crackleAge: 0,
      });
    }

    const spawnPooledParticle = (options) => {
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = particlePool[i];
        if (!p.active) {
          p.active = true;
          p.x = options.x;
          p.y = options.y;
          p.prevX = options.x;
          p.prevY = options.y;
          p.vx = options.vx;
          p.vy = options.vy;
          p.color = options.color;
          p.size = options.size || 2.2;
          p.alpha = 1;
          p.decay = options.decay || 0.012;
          p.friction = options.friction || 0.965;
          p.gravity = options.gravity !== undefined ? options.gravity : 0.05;
          p.isCascading = options.isCascading || false;
          p.isStrobe = options.isStrobe || false;
          p.strobeTick = 0;
          p.canCrackle = options.canCrackle || false;
          p.crackleAge = 0;
          return p;
        }
      }
      return null;
    };

    // Falling Golden Glitter Pool
    const MAX_GLITTERS = isMobile ? 8 : 28;
    const glitterPool = [];
    for (let i = 0; i < MAX_GLITTERS; i++) {
      glitterPool.push({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        swayOffset: 0,
        size: 1.2,
        alpha: 1,
        decay: 0.008,
        tick: 0,
        color: '#FFD700',
      });
    }

    const spawnPooledGlitter = (x, y) => {
      for (let i = 0; i < MAX_GLITTERS; i++) {
        const g = glitterPool[i];
        if (!g.active) {
          g.active = true;
          g.x = x + (Math.random() - 0.5) * 45;
          g.y = y + (Math.random() - 0.5) * 30;
          g.vx = (Math.random() - 0.5) * 0.6;
          g.vy = Math.random() * 0.55 + 0.35;
          g.swayOffset = Math.random() * Math.PI * 2;
          g.size = Math.random() * 1.5 + 0.9;
          g.alpha = 1;
          g.decay = Math.random() * 0.009 + 0.006;
          g.tick = 0;
          g.color = Math.random() > 0.3 ? '#FFD700' : '#FFF9C4';
          return g;
        }
      }
      return null;
    };

    // Rockets container (Limit: 1 on mobile, 3 on desktop)
    const MAX_ROCKETS = isMobile ? 1 : 3;
    const rockets = [];

    // Flash container
    let activeFlash = null;

    // Ambient floating golden embers across the sky
    const ambientSparkles = [];
    const ambientCount = isMobile ? 12 : 28;
    for (let i = 0; i < ambientCount; i++) {
      ambientSparkles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: -(Math.random() * 0.4 + 0.15),
        speedX: Math.sin(Math.random() * Math.PI * 2) * 0.2,
        alpha: Math.random() * 0.55 + 0.2,
        pulse: Math.random() * Math.PI * 2,
        color: ['#FFD700', '#F59E0B', '#EC4899', '#00E5FF'][i % 4],
      });
    }

    // Rocket Class with optimized spark trail
    class Rocket {
      constructor(targetX, targetY, isLarge = false, customPalette = null) {
        this.x = targetX !== undefined && targetX !== null ? targetX : (Math.random() * 0.8 + 0.1) * width;
        this.y = height + 10;
        this.prevX = this.x;
        this.prevY = this.y;
        this.targetY = targetY || (Math.random() * 0.32 + 0.1) * height;
        this.isLarge = isLarge;
        this.palette = customPalette || COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];

        const gravity = 0.18;
        const deltaY = this.y - this.targetY;
        const initialSpeed = Math.sqrt(2 * gravity * deltaY);
        this.vy = -initialSpeed * (0.98 + Math.random() * 0.04);
        this.vx = (Math.random() - 0.5) * 1.4;
        this.gravity = gravity;
        this.dead = false;

        diwaliAudio.playLaunch();
      }

      update() {
        this.prevX = this.x;
        this.prevY = this.y;
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.99;

        // Occasional trailing spark (spawns into particle pool)
        if (!isMobile && Math.random() > 0.4) {
          spawnPooledParticle({
            x: this.x + (Math.random() - 0.5) * 3,
            y: this.y + (Math.random() - 0.5) * 3,
            vx: (Math.random() - 0.5) * 0.8,
            vy: Math.random() * 1.8 + 0.8,
            color: this.palette.primary,
            size: 1.4,
            decay: 0.06,
            friction: 0.96,
            gravity: 0.04,
          });
        }

        if (this.y <= this.targetY || this.vy >= -0.7) {
          this.explode();
          this.dead = true;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = '#FFE082';
        ctx.lineWidth = isMobile ? 1.8 : 2.4;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.x, this.y, isMobile ? 2.2 : 3, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      explode() {
        const patterns = ['rainbowBurst', 'cascading', 'starburst', 'ring', 'circular', 'crackler'];
        let pattern = patterns[Math.floor(Math.random() * patterns.length)];
        if (this.isLarge && !isMobile) pattern = Math.random() > 0.5 ? 'rainbowBurst' : 'cascading';
        createExplosion(this.x, this.y, this.palette, pattern, this.isLarge);
      }
    }

    // Explosion Generator: strictly enforcing particle limits
    const createExplosion = (x, y, palette, pattern, isLarge) => {
      diwaliAudio.playExplosion(isLarge);

      // Light flash (simple circle without expensive radial gradients on mobile)
      activeFlash = {
        x,
        y,
        radius: 12,
        maxRadius: isMobile ? 90 : 160,
        color: palette.primary,
        alpha: isMobile ? 0.25 : 0.35,
      };

      // Strict Particle Limits:
      // Mobile: 25–45 particles per explosion
      // Desktop: 80–120 particles per explosion
      let count;
      if (isMobile) {
        count = Math.floor(Math.random() * 16) + 26; // 26 to 41 particles
      } else {
        count = isLarge ? 120 : (Math.floor(Math.random() * 30) + 85); // 85 to 120 particles
      }

      const colors = palette.colors;

      // Golden Glitter Shower: 4-6 on mobile, 14-22 on desktop
      const glitterCount = isMobile ? 4 : 16;
      for (let i = 0; i < glitterCount; i++) {
        spawnPooledGlitter(x, y);
      }

      switch (pattern) {
        // 1. Rainbow / Multicolor Burst
        case 'rainbowBurst': {
          const rainbowColors = [
            '#FF1744', '#FF5722', '#FFD700', '#10B981',
            '#00E5FF', '#3B82F6', '#8B5CF6', '#EC4899', '#FFFFFF',
          ];
          for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
            const speed = Math.random() * (isMobile ? 5.2 : 7.2) + 1.2;
            const color = rainbowColors[i % rainbowColors.length];
            spawnPooledParticle({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color,
              size: isMobile ? 1.8 : 2.4,
              decay: isMobile ? 0.018 : 0.011,
              friction: 0.965,
              gravity: 0.05,
              isStrobe: !isMobile && Math.random() > 0.7,
            });
          }
          break;
        }

        // 2. Cascading Waterfall / Weeping Willow
        case 'cascading': {
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * (isMobile ? 5.0 : 6.4) + 1.2;
            const chosenColor = palette.isRainbow
              ? colors[i % colors.length]
              : Math.random() > 0.25 ? palette.primary : '#FFF9C4';
            spawnPooledParticle({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed * 0.7 - 0.8,
              color: chosenColor,
              size: isMobile ? 1.8 : 2.2,
              decay: isMobile ? 0.016 : 0.009,
              friction: 0.97,
              gravity: 0.065,
              isCascading: true,
            });
          }
          break;
        }

        // 3. Ring with Center Star
        case 'ring': {
          const ringCount = Math.floor(count * 0.75);
          const ringSpeed = isMobile ? 4.5 : 5.8;
          for (let i = 0; i < ringCount; i++) {
            const angle = (i / ringCount) * Math.PI * 2;
            spawnPooledParticle({
              x,
              y,
              vx: Math.cos(angle) * ringSpeed,
              vy: Math.sin(angle) * ringSpeed,
              color: palette.primary,
              size: 2.0,
              decay: isMobile ? 0.018 : 0.012,
              friction: 0.965,
              gravity: 0.048,
            });
          }
          // Inner core
          const coreCount = count - ringCount;
          for (let i = 0; i < coreCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 2.5 + 0.5;
            spawnPooledParticle({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color: '#FFFFFF',
              size: 1.6,
              decay: 0.02,
              friction: 0.95,
              gravity: 0.04,
              isStrobe: true,
            });
          }
          break;
        }

        // 4. Starburst or Circular Burst
        case 'starburst':
        case 'circular':
        case 'crackler':
        default: {
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * (isMobile ? 5.5 : 6.8) + 1.2;
            spawnPooledParticle({
              x,
              y,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              color: colors[i % colors.length],
              size: isMobile ? 1.8 : 2.2,
              decay: isMobile ? 0.018 : 0.012,
              friction: 0.965,
              gravity: 0.05,
              isStrobe: !isMobile && Math.random() > 0.7,
              canCrackle: !isMobile && Math.random() > 0.8,
            });
          }
          break;
        }
      }
    };

    // Scheduled Launch Timers
    let lastLaunchTime = Date.now();
    // Mobile: Spaced launches (2.2s - 2.8s) to allow previous to finish smoothly
    // Desktop: 900ms - 1500ms
    let nextLaunchDelay = isMobile ? 2400 : (900 + Math.random() * 600);
    let salvoCounter = 0;

    // Interactive Tap to Burst Handler (Immediate explosion at tapped spot)
    const handleWindowClick = (e) => {
      if (!isEnabled) return;
      const target = e.target;
      if (
        target.closest('button') ||
        target.closest('input') ||
        target.closest('a') ||
        target.closest('form') ||
        target.closest('[role="button"]')
      ) {
        return;
      }

      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickY < height * 0.82) {
        const randomPalette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
        const patterns = ['rainbowBurst', 'cascading', 'starburst', 'ring'];
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

        createExplosion(clickX, clickY, randomPalette, randomPattern, !isMobile);
      }
    };

    window.addEventListener('click', handleWindowClick);

    // -------------------------------------------------------------------------
    // Guaranteed Single Animation Loop (No duplicate loops, full pause on inactive)
    // -------------------------------------------------------------------------
    let animFrameId = null;
    let isLoopActive = false;
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let fpsAccumulator = 0;
    let dynamicQualityDrop = false;

    const render = (currentTime) => {
      if (!isLoopActive) return;

      animFrameId = requestAnimationFrame(render);

      // Adaptive Performance Monitoring (Rolling 30-frame average FPS)
      const delta = currentTime - lastFrameTime;
      lastFrameTime = currentTime;

      frameCount++;
      fpsAccumulator += delta;
      if (frameCount >= 30) {
        const avgFps = 1000 / (fpsAccumulator / 30);
        dynamicQualityDrop = avgFps < 45; // If drops below 45 FPS, throttle particles
        frameCount = 0;
        fpsAccumulator = 0;
      }

      // Fast Canvas Clear
      ctx.clearRect(0, 0, width, height);

      // Additive Incandescent Blend Mode
      ctx.globalCompositeOperation = 'lighter';

      // 1. Ambient Floating Embers
      if (!isReducedMotion) {
        for (let i = 0; i < ambientSparkles.length; i++) {
          const s = ambientSparkles[i];
          s.y += s.speedY;
          s.x += s.speedX + Math.sin(s.pulse) * 0.2;
          s.pulse += 0.03;

          if (s.y < -10) {
            s.y = height + 10;
            s.x = Math.random() * width;
          }

          const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.pulse));
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fillStyle = s.color;
          ctx.globalAlpha = Math.max(0, currentAlpha);
          ctx.fill();
        }
      }

      // 2. Continuous Fireworks Scheduling
      if (!isReducedMotion && !isScrolling) {
        const now = Date.now();
        if (now - lastLaunchTime > nextLaunchDelay) {
          lastLaunchTime = now;
          nextLaunchDelay = isMobile
            ? (dynamicQualityDrop ? 3000 : 2200 + Math.random() * 600)
            : (900 + Math.random() * 800);

          // On mobile: strictly max 1 rocket at a time!
          if (rockets.length < MAX_ROCKETS) {
            rockets.push(new Rocket());

            // Simultaneous Salvos ONLY on desktop when FPS is healthy
            if (!isMobile && !dynamicQualityDrop) {
              salvoCounter++;
              if (salvoCounter % 5 === 0) {
                const rightX = width * (0.65 + Math.random() * 0.2);
                setTimeout(() => {
                  if (isLoopActive && rockets.length < MAX_ROCKETS) {
                    rockets.push(new Rocket(rightX));
                  }
                }, 140);
              }
            }
          }
        }
      }

      // 3. Detonation Flash (Fast circle)
      if (activeFlash) {
        activeFlash.radius += (activeFlash.maxRadius - activeFlash.radius) * 0.25;
        activeFlash.alpha -= 0.05;
        if (activeFlash.alpha <= 0) {
          activeFlash = null;
        } else {
          ctx.beginPath();
          ctx.arc(activeFlash.x, activeFlash.y, activeFlash.radius, 0, Math.PI * 2);
          ctx.fillStyle = activeFlash.color;
          ctx.globalAlpha = Math.max(0, activeFlash.alpha);
          ctx.fill();
        }
      }

      // 4. Falling Golden Glitter Shower
      for (let i = 0; i < MAX_GLITTERS; i++) {
        const g = glitterPool[i];
        if (g.active) {
          g.tick += 0.06;
          g.x += g.vx + Math.sin(g.tick + g.swayOffset) * 0.4;
          g.y += g.vy;
          g.alpha -= g.decay;

          if (g.alpha <= 0 || g.y > height + 20) {
            g.active = false;
          } else {
            const flicker = 0.5 + 0.5 * Math.sin(g.tick * 4);
            ctx.beginPath();
            ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
            ctx.fillStyle = g.color;
            ctx.globalAlpha = Math.max(0, g.alpha * flicker);
            ctx.fill();
          }
        }
      }

      // 5. Update & Draw Ascending Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw();
        if (r.dead) {
          rockets.splice(i, 1);
        }
      }

      // 6. Update & Draw Exploding Particles (Fast stroke trail + arc head)
      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = particlePool[i];
        if (p.active) {
          p.prevX = p.x;
          p.prevY = p.y;
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= p.friction;
          p.vy *= p.friction;
          p.vy += p.gravity;
          p.alpha -= p.decay;

          if (p.isStrobe) p.strobeTick++;

          if (p.alpha <= 0 || p.y > height + 40) {
            p.active = false;
          } else {
            let displayAlpha = p.alpha;
            if (p.isStrobe && (p.strobeTick % 4 < 2)) {
              displayAlpha *= 0.2;
            }

            // Draw comet trail line
            ctx.beginPath();
            ctx.moveTo(p.prevX, p.prevY);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = p.isCascading ? 2.2 : 1.6;
            ctx.globalAlpha = Math.max(0, displayAlpha * (p.isCascading ? 0.75 : 0.5));
            ctx.stroke();

            // Draw glowing particle head
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = Math.max(0, displayAlpha);
            ctx.fill();
          }
        }
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    // Single Loop Controller
    const startLoop = () => {
      if (isLoopActive) return;
      isLoopActive = true;
      lastFrameTime = performance.now();
      animFrameId = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      if (!isLoopActive) return;
      isLoopActive = false;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    };

    // Visibility Listener: Completely stop animation when tab is inactive
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isEnabled) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial Start if enabled
    if (isEnabled && !document.hidden) {
      startLoop();
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    // Comprehensive Cleanup on unmount or when isEnabled changes
    return () => {
      stopLoop();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleWindowClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(scrollTimeout);
      ctx.clearRect(0, 0, width, height);
    };
  }, [isEnabled]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none select-none"
    />
  );
}
