import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  life: number;
  maxLife: number;
  hue: number;
}

const ChaosCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticle = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 1;
      return {
        x,
        y,
        size: Math.random() * 4 + 2,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        life: 1,
        maxLife: 30 + Math.random() * 20,
        hue: 348 + Math.random() * 20 - 10, // Scarlet hue variation
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const prevX = mouseRef.current.x;
      const prevY = mouseRef.current.y;
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Create particles along the trail
      const distance = Math.sqrt(
        Math.pow(e.clientX - prevX, 2) + Math.pow(e.clientY - prevY, 2)
      );
      
      const particlesToCreate = Math.min(Math.floor(distance / 5), 5);
      for (let i = 0; i < particlesToCreate; i++) {
        const ratio = i / particlesToCreate;
        const x = prevX + (e.clientX - prevX) * ratio;
        const y = prevY + (e.clientY - prevY) * ratio;
        particlesRef.current.push(createParticle(x, y));
      }

      // Limit particles
      if (particlesRef.current.length > 100) {
        particlesRef.current = particlesRef.current.slice(-100);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedX *= 0.98;
        p.speedY *= 0.98;
        p.life++;

        const lifeRatio = 1 - p.life / p.maxLife;
        if (lifeRatio <= 0) return false;

        // Draw particle with glow
        const alpha = lifeRatio * 0.8;
        const size = p.size * lifeRatio;

        // Outer glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, size * 3
        );
        gradient.addColorStop(0, `hsla(${p.hue}, 83%, 60%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${p.hue}, 83%, 47%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 83%, 30%, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 70%, ${alpha})`;
        ctx.fill();

        return true;
      });

      // Draw crown-shaped cursor hint at mouse position
      const { x, y } = mouseRef.current;
      if (x > 0 && y > 0) {
        // Draw small crown shape
        ctx.save();
        ctx.translate(x, y - 15);
        ctx.scale(0.3, 0.3);
        
        const crownGradient = ctx.createLinearGradient(0, 30, 0, 0);
        crownGradient.addColorStop(0, "hsla(348, 83%, 47%, 0.3)");
        crownGradient.addColorStop(1, "hsla(348, 100%, 60%, 0.6)");
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-20, 30);
        ctx.lineTo(-35, 20);
        ctx.lineTo(-25, 50);
        ctx.lineTo(0, 40);
        ctx.lineTo(25, 50);
        ctx.lineTo(35, 20);
        ctx.lineTo(20, 30);
        ctx.closePath();
        
        ctx.fillStyle = crownGradient;
        ctx.shadowColor = "hsl(348, 100%, 60%)";
        ctx.shadowBlur = 15;
        ctx.fill();
        
        ctx.restore();

        // Energy ring around cursor
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.strokeStyle = "hsla(348, 83%, 60%, 0.4)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
};

export default ChaosCursor;
