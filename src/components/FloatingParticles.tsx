"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  opacityTarget: number;
  opacitySpeed: number;
  size: number;
}

export default function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawn = (): Particle => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      opacity: 0,
      opacityTarget: Math.random() * 0.18 + 0.04,
      opacitySpeed: Math.random() * 0.003 + 0.001,
      size: Math.random() * 1.2 + 0.4,
    });

    const init = () => {
      particles = Array.from({ length: 80 }, spawn);
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Fade in/out
        if (p.opacity < p.opacityTarget) {
          p.opacity = Math.min(p.opacity + p.opacitySpeed, p.opacityTarget);
        } else {
          p.opacity -= p.opacitySpeed * 0.5;
          if (p.opacity <= 0) {
            // Respawn at a random edge
            Object.assign(p, spawn());
            const edge = Math.floor(Math.random() * 4);
            if (edge === 0) { p.x = Math.random() * canvas.width; p.y = -4; }
            else if (edge === 1) { p.x = canvas.width + 4; p.y = Math.random() * canvas.height; }
            else if (edge === 2) { p.x = Math.random() * canvas.width; p.y = canvas.height + 4; }
            else { p.x = -4; p.y = Math.random() * canvas.height; }
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();
    init();
    tick();

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
