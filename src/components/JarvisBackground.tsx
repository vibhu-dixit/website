import { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
}

const CANVAS_PALETTES = {
  light: {
    accent: "0, 130, 170",
    vignette: "225, 185, 195, 0.24",
    hexAlphaBase: 0.04,
    hexAlphaBoost: 0.12,
    connectionBase: 0.1,
    connectionBoost: 0.16,
    particleMultiplier: 0.85,
    glowMultiplier: 0.12,
  },
  dark: {
    accent: "0, 200, 255",
    vignette: "5, 10, 20, 0.6",
    hexAlphaBase: 0.02,
    hexAlphaBoost: 0.08,
    connectionBase: 0.12,
    connectionBoost: 0.2,
    particleMultiplier: 1.2,
    glowMultiplier: 0.14,
  },
} as const;

const JarvisBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const palette = CANVAS_PALETTES[theme];
    let animationId: number;
    let particles: Particle[] = [];
    const PARTICLE_COUNT = 100;
    const CONNECTION_DISTANCE = 180;
    const MOUSE_RADIUS = 250;
    let mouseX = -1000;
    let mouseY = -1000;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const baseOpacity = Math.random() * 0.45 + 0.35;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 2 + 0.5,
          opacity: baseOpacity,
          baseOpacity,
        });
      }
    };

    const drawHexGrid = () => {
      const size = 60;
      const h = size * Math.sqrt(3);
      for (let row = -1; row < canvas.height / h + 1; row++) {
        for (let col = -1; col < canvas.width / (size * 1.5) + 1; col++) {
          const x = col * size * 1.5;
          const y = row * h + (col % 2 === 0 ? 0 : h / 2);

          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 300);
          const alpha = palette.hexAlphaBase + proximity * palette.hexAlphaBoost;

          ctx.strokeStyle = `rgba(${palette.accent}, ${alpha})`;
          ctx.lineWidth = 0.5 + proximity * 0.5;
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const px = x + size * 0.4 * Math.cos(angle);
            const py = y + size * 0.4 * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();

          if (proximity > 0.3) {
            ctx.fillStyle = `rgba(${palette.accent}, ${proximity * (theme === "light" ? 0.05 : 0.03)})`;
            ctx.fill();
          }
        }
      }
    };

    const drawMouseGlow = () => {
      if (mouseX < 0) return;
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, MOUSE_RADIUS);
      gradient.addColorStop(0, `rgba(${palette.accent}, ${theme === "light" ? 0.08 : 0.06})`);
      gradient.addColorStop(0.5, `rgba(${palette.accent}, ${theme === "light" ? 0.03 : 0.02})`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(mouseX - MOUSE_RADIUS, mouseY - MOUSE_RADIUS, MOUSE_RADIUS * 2, MOUSE_RADIUS * 2);

      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 30 + Math.sin(time * 0.03) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${palette.accent}, ${theme === "light" ? 0.14 : 0.08})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      const crossSize = 8;
      ctx.strokeStyle = `rgba(${palette.accent}, ${theme === "light" ? 0.2 : 0.12})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(mouseX - crossSize, mouseY);
      ctx.lineTo(mouseX + crossSize, mouseY);
      ctx.moveTo(mouseX, mouseY - crossSize);
      ctx.lineTo(mouseX, mouseY + crossSize);
      ctx.stroke();
    };

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawHexGrid();
      drawMouseGlow();

      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.015;
          p.vy += (dy / dist) * force * 0.015;
          p.opacity = p.baseOpacity + force * 0.5;
          p.size = Math.min(3.5, p.size + force * 0.05);
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.998;
        p.vy *= 0.998;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const drawAlpha = Math.min(1, p.opacity * palette.particleMultiplier);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${palette.accent}, ${drawAlpha})`;
        ctx.fill();

        if (p.opacity > 0.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${palette.accent}, ${(p.opacity - 0.5) * palette.glowMultiplier})`;
          ctx.fill();
        }
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DISTANCE) {
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDist = Math.sqrt((mouseX - midX) ** 2 + (mouseY - midY) ** 2);
            const mouseProximity = Math.max(0, 1 - mouseDist / MOUSE_RADIUS);
            const baseAlpha = (1 - dist / CONNECTION_DISTANCE) * palette.connectionBase;
            const opacity = baseAlpha + mouseProximity * palette.connectionBoost;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${palette.accent}, ${opacity})`;
            ctx.lineWidth = 0.5 + mouseProximity * 0.5;
            ctx.stroke();
          }
        }
      }

      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.2,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.8
      );
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, `rgba(${palette.vignette})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const startAnimation = () => {
      resize();
      initParticles();
      animate();
    };
    const rafId = requestAnimationFrame(startAnimation);

    window.addEventListener("resize", () => { resize(); initParticles(); });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [theme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 transition-colors duration-500"
        style={{ background: "hsl(var(--jarvis-canvas-bg))" }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none jarvis-bg-wash transition-opacity duration-500" />
      <div className="fixed inset-0 z-0 scanline" />
    </>
  );
};

export default JarvisBackground;
