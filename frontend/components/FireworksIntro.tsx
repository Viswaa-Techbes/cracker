'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  decay: number;
  color: string;
  size: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  trail: { x: number; y: number; alpha: number }[];
  exploded: boolean;
}

export default function FireworksIntro() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);

    // 1. Check if user already saw the intro during this browser session
    try {
      const alreadySeen = sessionStorage.getItem('sri_sai_intro_shown');
      if (alreadySeen) {
        return;
      }
    } catch {
      // Ignore storage access errors
    }

    // 2. Accessibility: Check for prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('sri_sai_intro_shown', 'true');
      return;
    }

    // 3. Mark as shown and activate intro overlay
    try {
      sessionStorage.setItem('sri_sai_intro_shown', 'true');
    } catch {
      // Ignore
    }

    setVisible(true);

    // Auto fade-out sequence
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2400);

    const endTimer = setTimeout(() => {
      setVisible(false);
    }, 2900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!visible) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = width < 640;
    const colors = ['#FFD700', '#FFA000', '#FF3D00', '#FF1744', '#FFFFFF', '#00E5FF', '#FFEA00'];

    const particles: Particle[] = [];
    const createBurst = (x: number, y: number, count: number, sizeMultiplier = 1) => {
      const actualCount = isMobile ? Math.floor(count * 0.55) : count;
      for (let i = 0; i < actualCount; i++) {
        const angle = (Math.PI * 2 * i) / actualCount + (Math.random() - 0.5) * 0.4;
        const speed = (Math.random() * 4.5 + 2) * sizeMultiplier;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          decay: Math.random() * 0.018 + 0.015,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: (Math.random() * 2.2 + 1.2) * (isMobile ? 0.8 : 1),
        });
      }
    };

    // Main rocket
    const mainRocket: Rocket = {
      x: width / 2,
      y: height + 10,
      targetY: height * 0.36,
      vy: -12 * (height / 800),
      trail: [],
      exploded: false,
    };

    let startTime = performance.now();
    let sideBurst1Triggered = false;
    let sideBurst2Triggered = false;

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      // Dark translucent clear to leave soft glowing fireworks trails
      ctx.fillStyle = 'rgba(7, 10, 18, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // Rocket flight
      if (!mainRocket.exploded) {
        mainRocket.y += mainRocket.vy;
        mainRocket.vy *= 0.985; // Slight deceleration towards apex

        // Add trail spark
        mainRocket.trail.push({ x: mainRocket.x, y: mainRocket.y, alpha: 1 });

        // Draw trail
        for (let i = mainRocket.trail.length - 1; i >= 0; i--) {
          const t = mainRocket.trail[i];
          t.alpha -= 0.06;
          if (t.alpha <= 0) {
            mainRocket.trail.splice(i, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(t.x, t.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 215, 0, ${t.alpha})`;
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 6;
          ctx.fill();
        }

        // Draw rocket head
        ctx.beginPath();
        ctx.arc(mainRocket.x, mainRocket.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFA000';
        ctx.shadowBlur = 10;
        ctx.fill();

        if (mainRocket.y <= mainRocket.targetY || elapsed >= 0.85) {
          mainRocket.exploded = true;
          createBurst(mainRocket.x, mainRocket.y, 80, 1.25);
        }
      }

      // 2–3 background bursts
      if (elapsed > 1.2 && !sideBurst1Triggered) {
        sideBurst1Triggered = true;
        createBurst(width * (isMobile ? 0.2 : 0.28), height * 0.26, 45, 0.85);
      }
      if (elapsed > 1.55 && !sideBurst2Triggered) {
        sideBurst2Triggered = true;
        createBurst(width * (isMobile ? 0.8 : 0.72), height * 0.22, 50, 0.9);
      }

      // Update & render particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.vy += 0.06; // subtle gravity
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [visible]);

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Welcome Fireworks Intro"
      className={`fixed inset-0 z-[100] bg-[#070A12] flex flex-col items-center justify-center transition-all duration-500 ease-out select-none ${
        fading ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Canvas for Fireworks Sparks */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Centered Sri Sai Traders Emblem & Branding */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg animate-in fade-in zoom-in-95 duration-500">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-1 shadow-2xl shadow-amber-500/40 mb-4 animate-pulse flex items-center justify-center">
          <Image
            src="/images/logo-icon.svg"
            alt="Sri Sai Traders Logo"
            width={88}
            height={88}
            className="w-full h-full object-contain rounded-full"
            priority
          />
        </div>

        <h1 className="text-2xl sm:text-4xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 tracking-wide drop-shadow-md">
          SRI SAI TRADERS
        </h1>

        <p className="text-xs sm:text-sm font-semibold text-amber-300/90 mt-1 tracking-wide uppercase">
          Dealers in All Types of Crackers Wholesale & Retail
        </p>

        <p className="text-[11px] sm:text-xs text-slate-300 mt-2 font-medium max-w-xs">
          Diwali Celebrations 2026 • Direct From Sivakasi
        </p>

        {/* Small subtle skip button */}
        <button
          type="button"
          onClick={() => {
            setFading(true);
            setTimeout(() => setVisible(false), 200);
          }}
          className="mt-6 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 text-[11px] font-bold transition-colors pointer-events-auto backdrop-blur-xs border border-white/15"
        >
          Skip Intro →
        </button>
      </div>
    </div>
  );
}
