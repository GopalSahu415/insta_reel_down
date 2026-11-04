import React, { useEffect, useRef } from 'react';
import diwaliAudio from './DiwaliAudio';

// Rich Festive Diwali Color Palettes
const COLOR_PALETTES = [
  // 1. Rainbow Festival (Spectacular Multicolor)
  {
    name: 'rainbow-festival',
    isRainbow: true,
    colors: ['#FF1744', '#FF6D00', '#FFD700', '#10B981', '#00E5FF', '#3B82F6', '#9333EA', '#EC4899', '#FFF'],
    primary: '#FFD700',
    flash: 'rgba(255, 215, 0, 0.45)',
  },
  // 2. Royal Purple & Golden Amber
  {
    name: 'royal-purple-gold',
    colors: ['#7C3AED', '#8B5CF6', '#9333EA', '#C084FC', '#FFD700', '#F59E0B', '#FDE047', '#FFFFFF'],
    primary: '#8B5CF6',
    flash: 'rgba(139, 92, 246, 0.42)',
  },
  // 3. Electric Cyan & Vibrant Magenta (Neon Night)
  {
    name: 'electric-cyan-magenta',
    colors: ['#00E5FF', '#22D3EE', '#06B6D4', '#E11D48', '#F43F5E', '#D946EF', '#FF4081', '#FFFFFF'],
    primary: '#00E5FF',
    flash: 'rgba(0, 229, 255, 0.42)',
  },
  // 4. Sunset Saffron, Orange & Ruby Red
  {
    name: 'saffron-ruby',
    colors: ['#FF6D00', '#FF5722', '#F97316', '#EF4444', '#DC2626', '#FFD700', '#FFA726', '#FFF8E1'],
    primary: '#FF6D00',
    flash: 'rgba(255, 109, 0, 0.42)',
  },
  // 5. Imperial Gold & Weeping Amber
  {
    name: 'imperial-gold',
    colors: ['#FFD700', '#FFC107', '#FFA000', '#FBBF24', '#F59E0B', '#FFF9C4', '#FFFFFF'],
    primary: '#FFD700',
    flash: 'rgba(255, 215, 0, 0.42)',
  },
  // 6. Electric Blue & Diamond Cyan
  {
    name: 'electric-blue-cyan',
    colors: ['#2563EB', '#3B82F6', '#60A5FA', '#00E5FF', '#18FFFF', '#84FFFF', '#FFFFFF'],
    primary: '#3B82F6',
    flash: 'rgba(37, 99, 235, 0.40)',
  },
  // 7. Cosmic Multi-Jewel
  {
    name: 'cosmic-jewel',
    isRainbow: true,
    colors: ['#FF1493', '#00E5FF', '#FFD700', '#76FF03', '#9333EA', '#FF5722', '#F43F5E', '#3B82F6'],
    primary: '#FF1493',
    flash: 'rgba(255, 20, 147, 0.42)',
  },
];

export default function FireworksCanvas({ isEnabled = true, soundEnabled = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    diwaliAudio.setMuted(!soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId = null;
    let isTabVisible = !document.hidden;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Dimensions & Scaling
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isMobile = false;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      isMobile = width < 768;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Visibility Listener
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Entity Containers
    const rockets = [];
    const particles = [];
    const fallingGlitters = [];
    const atmosphericFlashes = [];
    const ambientSparkles = [];

    // Ambient floating golden and magenta embers across the sky
    const initAmbientSparkles = () => {
      const count = isMobile ? 22 : 40;
      for (let i = 0; i < count; i++) {
        ambientSparkles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.2 + 1,
          speedY: -(Math.random() * 0.45 + 0.18),
          speedX: Math.sin(Math.random() * Math.PI * 2) * 0.3,
          alpha: Math.random() * 0.65 + 0.25,
          pulse: Math.random() * Math.PI * 2,
          color: ['#FFD700', '#F59E0B', '#EC4899', '#00E5FF'][Math.floor(Math.random() * 4)],
        });
      }
    };
    initAmbientSparkles();

    // Rocket Spark Trail Particle (Multicolor glowing rocket tail)
    class RocketSpark {
      constructor(x, y, color) {
        this.x = x + (Math.random() - 0.5) * 4;
        this.y = y + (Math.random() - 0.5) * 4;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = Math.random() * 2.2 + 1.2; // Falls downward
        this.alpha = 1;
        this.decay = Math.random() * 0.05 + 0.035;
        this.color = color;
        this.size = Math.random() * 2.2 + 1.2;
        this.dead = false;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        if (this.alpha <= 0) this.dead = true;
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Rocket Class
    class Rocket {
      constructor(targetX, targetY, isLarge = false, customPalette = null) {
        this.x = targetX !== undefined && targetX !== null ? targetX : (Math.random() * 0.84 + 0.08) * width;
        this.y = height + 15;
        this.targetY = targetY || (Math.random() * 0.35 + 0.08) * height;
        this.isLarge = isLarge;
        this.palette = customPalette || COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];

        // Compute upward velocity based on target height & gravity
        const gravity = 0.18;
        const deltaY = this.y - this.targetY;
        const initialSpeed = Math.sqrt(2 * gravity * deltaY);
        this.vy = -initialSpeed * (0.98 + Math.random() * 0.04);
        this.vx = (Math.random() - 0.5) * 1.6;
        this.gravity = gravity;

        // Visual trails
        this.trail = [];
        this.maxTrailLength = isMobile ? 6 : 9;
        this.dead = false;

        // Audio whoosh
        diwaliAudio.playLaunch();
      }

      update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > this.maxTrailLength) {
          this.trail.shift();
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.99;

        // Spawn colorful rocket sparks
        if (Math.random() > 0.2) {
          const sparkColor = Math.random() > 0.4 ? this.palette.primary : '#FFD700';
          particles.push(new RocketSpark(this.x, this.y, sparkColor));
        }

        // Explode upon reaching target height or near zero vertical speed
        if (this.y <= this.targetY || this.vy >= -0.7) {
          this.explode();
          this.dead = true;
        }
      }

      draw() {
        if (this.trail.length < 2) return;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.trail[0].x, this.trail[0].y);
        for (let i = 1; i < this.trail.length; i++) {
          ctx.lineTo(this.trail[i].x, this.trail[i].y);
        }
        ctx.strokeStyle = '#FFE082';
        ctx.lineWidth = this.isLarge ? 3.5 : 2.2;
        ctx.shadowColor = this.palette.primary;
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Glowing rocket head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.isLarge ? 4 : 2.8, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.restore();
      }

      explode() {
        const patternTypes = ['rainbowBurst', 'cascading', 'starburst', 'ring', 'circular', 'crackler'];
        let pattern = patternTypes[Math.floor(Math.random() * patternTypes.length)];
        if (this.isLarge) pattern = Math.random() > 0.4 ? 'rainbowBurst' : 'cascading';

        createExplosion(this.x, this.y, this.palette, pattern, this.isLarge, isMobile);
      }
    }

    // Explosion Particle Class
    class Particle {
      constructor(options) {
        this.x = options.x;
        this.y = options.y;
        this.vx = options.vx;
        this.vy = options.vy;
        this.color = options.color;
        this.size = options.size || (Math.random() * 2.4 + 1.8);
        this.alpha = 1;
        this.decay = options.decay || (Math.random() * 0.012 + 0.008);
        this.friction = options.friction || 0.965;
        this.gravity = options.gravity !== undefined ? options.gravity : 0.055;
        this.trail = [];
        this.maxTrail = options.maxTrail || (isMobile ? 3 : 5);
        this.isCascading = options.isCascading || false;
        this.isStrobe = options.isStrobe || false;
        this.strobeTick = 0;
        this.canCrackle = options.canCrackle || false;
        this.crackleAge = 0;
        this.dead = false;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: this.alpha });
        if (this.trail.length > this.maxTrail) {
          this.trail.shift();
        }

        this.x += this.vx;
        this.y += this.vy;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.vy += this.gravity;
        this.alpha -= this.decay;

        if (this.isStrobe) {
          this.strobeTick++;
        }

        // Secondary Crackling pop effect
        if (this.canCrackle) {
          this.crackleAge++;
          if (this.crackleAge > 26 && Math.random() > 0.85) {
            spawnCrackleBurst(this.x, this.y, this.color);
            this.canCrackle = false;
          }
        }

        if (this.alpha <= 0) {
          this.dead = true;
        }
      }

      draw() {
        ctx.save();
        let displayAlpha = this.alpha;
        if (this.isStrobe && (this.strobeTick % 4 < 2)) {
          displayAlpha *= 0.2;
        }

        // 1. Draw glowing comet trail
        if (this.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(this.trail[0].x, this.trail[0].y);
          for (let i = 1; i < this.trail.length; i++) {
            ctx.lineTo(this.trail[i].x, this.trail[i].y);
          }
          ctx.strokeStyle = this.color;
          ctx.lineWidth = this.isCascading ? 2.4 : 1.6;
          ctx.globalAlpha = Math.max(0, displayAlpha * (this.isCascading ? 0.8 : 0.55));
          ctx.stroke();
        }

        // 2. Draw particle head
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, displayAlpha);
        ctx.shadowColor = this.color;
        ctx.shadowBlur = this.isCascading ? 14 : 9;
        ctx.fill();

        ctx.restore();
      }
    }

    // Falling Golden Glitter Class (Lingering slow-falling glittering dust)
    class FallingGlitter {
      constructor(x, y) {
        this.x = x + (Math.random() - 0.5) * 60;
        this.y = y + (Math.random() - 0.5) * 40;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = Math.random() * 0.6 + 0.35; // Gentle slow descent
        this.swayOffset = Math.random() * Math.PI * 2;
        this.size = Math.random() * 1.8 + 0.9;
        this.alpha = 1;
        this.decay = Math.random() * 0.009 + 0.006;
        this.tick = 0;
        this.color = Math.random() > 0.35 ? '#FFD700' : '#FFF9C4';
        this.dead = false;
      }

      update() {
        this.tick += 0.06;
        this.x += this.vx + Math.sin(this.tick + this.swayOffset) * 0.45;
        this.y += this.vy;
        this.alpha -= this.decay;
        if (this.alpha <= 0) this.dead = true;
      }

      draw() {
        ctx.save();
        const flicker = 0.5 + 0.5 * Math.sin(this.tick * 4);
        ctx.globalAlpha = Math.max(0, this.alpha * flicker);
        ctx.fillStyle = this.color;
        ctx.shadowColor = '#FFD700';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Atmospheric flash on detonation
    class AtmosphericFlash {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 16;
        this.maxRadius = isMobile ? 160 : 250;
        this.color = color || 'rgba(255, 215, 0, 0.4)';
        this.alpha = 0.4;
        this.dead = false;
      }

      update() {
        this.radius += (this.maxRadius - this.radius) * 0.22;
        this.alpha -= 0.045;
        if (this.alpha <= 0) this.dead = true;
      }

      draw() {
        ctx.save();
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.globalAlpha = Math.max(0, this.alpha);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Secondary micro-crackles
    const spawnCrackleBurst = (x, y, color) => {
      diwaliAudio.playCrackle();
      const count = isMobile ? 3 : 6;
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.8 + 0.6;
        particles.push(
          new Particle({
            x,
            y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: Math.random() > 0.5 ? '#FFFFFF' : color,
            size: Math.random() * 1.6 + 0.8,
            decay: Math.random() * 0.04 + 0.03,
            friction: 0.94,
            gravity: 0.035,
            maxTrail: 2,
            isStrobe: true,
          })
        );
      }
    };

    // Primary Explosion Generator
    const createExplosion = (x, y, palette, pattern, isLarge, mobileMode) => {
      diwaliAudio.playExplosion(isLarge);
      atmosphericFlashes.push(new AtmosphericFlash(x, y, palette.flash));

      let baseCount = isLarge ? 175 : 95;
      if (mobileMode) baseCount = Math.floor(baseCount * 0.55);

      const colors = palette.colors;

      // Occasional falling golden glitter shower
      const glitterCount = isLarge ? (mobileMode ? 18 : 36) : (mobileMode ? 10 : 20);
      for (let i = 0; i < glitterCount; i++) {
        fallingGlitters.push(new FallingGlitter(x, y));
      }

      switch (pattern) {
        // Spectacular Rainbow / Multicolor Burst
        case 'rainbowBurst': {
          const count = isLarge ? (mobileMode ? 100 : 210) : (mobileMode ? 60 : 130);
          const rainbowColors = [
            '#FF1744', '#FF5722', '#FFD700', '#10B981',
            '#00E5FF', '#3B82F6', '#8B5CF6', '#EC4899', '#FFFFFF'
          ];
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * (isLarge ? 8.5 : 6.8) + 1.6;
            const color = rainbowColors[i % rainbowColors.length];
            particles.push(
              new Particle({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color,
                size: Math.random() * 2.8 + 1.6,
                decay: Math.random() * 0.012 + 0.008,
                friction: 0.966,
                gravity: 0.05,
                isStrobe: Math.random() > 0.65,
                canCrackle: Math.random() > 0.7,
              })
            );
          }
          break;
        }

        // Cascading Waterfall / Weeping Willow
        case 'cascading': {
          const count = isLarge ? (mobileMode ? 100 : 185) : (mobileMode ? 55 : 110);
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6.8 + 1.5;
            const chosenColor = palette.isRainbow
              ? colors[i % colors.length]
              : Math.random() > 0.25 ? palette.primary : '#FFF9C4';
            particles.push(
              new Particle({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed * 0.7 - 1.2,
                color: chosenColor,
                size: Math.random() * 2.4 + 1.5,
                decay: Math.random() * 0.007 + 0.006, // Long cascading hang time
                friction: 0.972,
                gravity: 0.068, // Flowing waterfall rain
                maxTrail: mobileMode ? 4 : 7,
                isCascading: true,
              })
            );
          }
          break;
        }

        // Expanding Ring with Contrasting Nucleus
        case 'ring': {
          const ringCount = mobileMode ? 38 : 70;
          const ringColor = palette.primary;
          const ringSpeed = isLarge ? 7.5 : 5.5;
          for (let i = 0; i < ringCount; i++) {
            const angle = (i / ringCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.08;
            const speed = ringSpeed + (Math.random() - 0.5) * 0.35;
            particles.push(
              new Particle({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: ringColor,
                size: 2.4,
                decay: 0.011,
                friction: 0.965,
                gravity: 0.048,
              })
            );
          }
          // Inner core
          const coreCount = mobileMode ? 18 : 34;
          const coreColor = palette.isRainbow ? '#00E5FF' : (colors[1] || '#FFFFFF');
          for (let i = 0; i < coreCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 3.2 + 0.6;
            particles.push(
              new Particle({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: coreColor,
                size: 2.0,
                decay: 0.015,
                friction: 0.95,
                gravity: 0.04,
                isStrobe: true,
              })
            );
          }
          break;
        }

        // Crackling Strobe Palm
        case 'crackler': {
          const count = mobileMode ? 42 : 85;
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 7.5 + 2.2;
            particles.push(
              new Particle({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: colors[i % colors.length],
                size: 2.5,
                decay: 0.011,
                friction: 0.962,
                gravity: 0.055,
                canCrackle: true,
              })
            );
          }
          break;
        }

        // Starburst with Radial Comets
        case 'starburst': {
          const count = baseCount;
          const raySpokes = isLarge ? 14 : 10;
          for (let i = 0; i < count; i++) {
            // Clustered along spokes with spread
            const spokeIndex = Math.floor(Math.random() * raySpokes);
            const spokeAngle = (spokeIndex / raySpokes) * Math.PI * 2;
            const angle = spokeAngle + (Math.random() - 0.5) * 0.25;
            const speed = Math.random() * (isLarge ? 8 : 6.2) + 1.8;
            particles.push(
              new Particle({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: colors[i % colors.length],
                size: Math.random() * 2.6 + 1.5,
                decay: Math.random() * 0.013 + 0.009,
                friction: 0.965,
                gravity: 0.05,
                maxTrail: mobileMode ? 4 : 6,
                isStrobe: Math.random() > 0.6,
              })
            );
          }
          break;
        }

        // Uniform Circular Explosion
        case 'circular':
        default: {
          const count = baseCount;
          for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * (isLarge ? 7.6 : 5.8) + 1.4;
            particles.push(
              new Particle({
                x,
                y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: colors[i % colors.length],
                size: Math.random() * 2.4 + 1.4,
                decay: Math.random() * 0.013 + 0.009,
                friction: 0.965,
                gravity: 0.05,
                isStrobe: Math.random() > 0.7,
              })
            );
          }
          break;
        }
      }

      // Shimmering micro-glitter halo around epicenter
      const haloCount = mobileMode ? 18 : 35;
      for (let i = 0; i < haloCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.4 + 0.4;
        particles.push(
          new Particle({
            x: x + (Math.random() - 0.5) * 16,
            y: y + (Math.random() - 0.5) * 16,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            color: '#FFF8E1',
            size: Math.random() * 1.5 + 0.8,
            decay: Math.random() * 0.02 + 0.01,
            friction: 0.95,
            gravity: 0.03,
            isStrobe: true,
          })
        );
      }
    };

    // Scheduled Launch Timers
    let lastLaunchTime = Date.now();
    let nextLaunchDelay = 750 + Math.random() * 850;
    let salvoTimer = 0;
    let grandFinaleTimer = 0;

    // Interactive Tap/Click Handler (Triggers immediate colorful firework at clicked spot)
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

      // Trigger if click is anywhere in the upper 80% of the screen
      if (clickY < height * 0.82) {
        // Pick a random vibrant palette for each tap
        const randomPalette = COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
        const patterns = ['rainbowBurst', 'cascading', 'starburst', 'ring', 'crackler'];
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];

        // Immediate spectacular explosion at exact tap coordinate!
        createExplosion(clickX, clickY, randomPalette, randomPattern, true, isMobile);
      }
    };

    window.addEventListener('click', handleWindowClick);

    // Main Animation Loop
    let lastFrameTime = performance.now();
    let performanceThrottled = false;

    const render = (currentTime) => {
      animationFrameId = requestAnimationFrame(render);

      // Handle Tab Inactivity or Disabled State
      if (!isTabVisible || !isEnabled) {
        lastFrameTime = currentTime;
        return;
      }

      const frameDelta = currentTime - lastFrameTime;
      lastFrameTime = currentTime;
      performanceThrottled = frameDelta > 28;

      // Clear canvas cleanly without obscuring underlying UI
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      // 1. Draw Ambient Floating Embers
      if (!isReducedMotion) {
        for (let i = 0; i < ambientSparkles.length; i++) {
          const s = ambientSparkles[i];
          s.y += s.speedY;
          s.x += s.speedX + Math.sin(s.pulse) * 0.25;
          s.pulse += 0.03;

          if (s.y < -10) {
            s.y = height + 10;
            s.x = Math.random() * width;
          }

          const currentAlpha = s.alpha * (0.6 + 0.4 * Math.sin(s.pulse));
          ctx.save();
          ctx.globalAlpha = Math.max(0, currentAlpha);
          ctx.fillStyle = s.color;
          ctx.shadowColor = s.color;
          ctx.shadowBlur = 8;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 2. Continuous Fireworks Scheduling
      if (!isReducedMotion && !performanceThrottled) {
        const now = Date.now();

        if (now - lastLaunchTime > nextLaunchDelay) {
          lastLaunchTime = now;
          nextLaunchDelay = 800 + Math.random() * 1100;

          // Single rocket launch
          rockets.push(new Rocket());

          // Simultaneous Salvos (2 or 3 fireworks bursting together)
          salvoTimer++;
          if (salvoTimer % 4 === 0) {
            const leftX = width * (0.15 + Math.random() * 0.2);
            const rightX = width * (0.65 + Math.random() * 0.2);
            rockets.push(new Rocket(leftX));
            setTimeout(() => {
              if (isEnabled && isTabVisible) {
                rockets.push(new Rocket(rightX));
              }
            }, 120);
          }

          // Triple Grand Salvo
          grandFinaleTimer++;
          if (grandFinaleTimer % 10 === 0) {
            const x1 = width * 0.22;
            const x2 = width * 0.5;
            const x3 = width * 0.78;
            rockets.push(new Rocket(x1, height * 0.22, true));
            setTimeout(() => {
              if (isEnabled && isTabVisible) rockets.push(new Rocket(x2, height * 0.14, true));
            }, 180);
            setTimeout(() => {
              if (isEnabled && isTabVisible) rockets.push(new Rocket(x3, height * 0.24, true));
            }, 360);
          }
        }
      }

      // 3. Update & Draw Atmospheric Detonation Flashes
      for (let i = atmosphericFlashes.length - 1; i >= 0; i--) {
        const flash = atmosphericFlashes[i];
        flash.update();
        flash.draw();
        if (flash.dead) atmosphericFlashes.splice(i, 1);
      }

      // 4. Update & Draw Falling Golden Glitter Shower
      for (let i = fallingGlitters.length - 1; i >= 0; i--) {
        const g = fallingGlitters[i];
        g.update();
        g.draw();
        if (g.dead) fallingGlitters.splice(i, 1);
      }

      // 5. Update & Draw Ascending Rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.update();
        r.draw();
        if (r.dead) rockets.splice(i, 1);
      }

      // 6. Update & Draw Exploding Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.dead) particles.splice(i, 1);
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('click', handleWindowClick);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
