import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number;
}

const JarvisBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
        const baseOpacity = Math.random() * 0.5 + 0.2;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
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

          // Mouse proximity glow on hex cells
          const dx = mouseX - x;
          const dy = mouseY - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 300);
          const alpha = 0.02 + proximity * 0.08;

          ctx.strokeStyle = `rgba(0, 200, 255, ${alpha})`;
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

          // Fill hex near mouse
          if (proximity > 0.3) {
            ctx.fillStyle = `rgba(0, 200, 255, ${proximity * 0.03})`;
            ctx.fill();
          }
        }
      }
    };

    const drawMouseGlow = () => {
      if (mouseX < 0) return;
      // Outer glow
      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, MOUSE_RADIUS);
      gradient.addColorStop(0, `rgba(0, 200, 255, 0.06)`);
      gradient.addColorStop(0.5, `rgba(0, 200, 255, 0.02)`);
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(mouseX - MOUSE_RADIUS, mouseY - MOUSE_RADIUS, MOUSE_RADIUS * 2, MOUSE_RADIUS * 2);

      // Inner ring
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 30 + Math.sin(time * 0.03) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 200, 255, 0.08)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // Crosshair
      const crossSize = 8;
      ctx.strokeStyle = `rgba(0, 200, 255, 0.12)`;
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

      // Update and draw particles
      particles.forEach((p) => {
        // Mouse attraction/repulsion
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          // Attract gently toward mouse
          p.vx += (dx / dist) * force * 0.015;
          p.vy += (dy / dist) * force * 0.015;
          // Brighten near mouse
          p.opacity = p.baseOpacity + force * 0.5;
          p.size = Math.min(3.5, p.size + force * 0.05);
        } else {
          p.opacity += (p.baseOpacity - p.opacity) * 0.02;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Dampen
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle with glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${p.opacity})`;
        ctx.fill();

        // Glow ring on brighter particles
        if (p.opacity > 0.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 200, 255, ${(p.opacity - 0.5) * 0.1})`;
          ctx.fill();
        }
      });

      // Draw connections (brighter near mouse)
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
            const baseAlpha = (1 - dist / CONNECTION_DISTANCE) * 0.12;
            const opacity = baseAlpha + mouseProximity * 0.2;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 200, 255, ${opacity})`;
            ctx.lineWidth = 0.5 + mouseProximity * 0.5;
            ctx.stroke();
          }
        }
      }

      // Vignette
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.2,
        canvas.width / 2, canvas.height / 2, canvas.height * 0.8
      );
      gradient.addColorStop(0, "transparent");
      gradient.addColorStop(1, "rgba(5, 10, 20, 0.6)");
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

    resize();
    initParticles();
    animate();

    window.addEventListener("resize", () => { resize(); initParticles(); });
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0"
        style={{ background: "hsl(220, 25%, 4%)" }}
      />
      <div className="fixed inset-0 z-0 scanline" />
    </>
  );
};

export default JarvisBackground;
