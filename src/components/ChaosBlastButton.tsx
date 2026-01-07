import { ReactNode, useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface EnergyBurst {
  id: number;
  x: number;
  y: number;
}

interface ChaosBlastButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const ChaosBlastButton = ({
  children,
  onClick,
  className,
  variant = "primary",
  size = "md",
  disabled = false,
}: ChaosBlastButtonProps) => {
  const [bursts, setBursts] = useState<EnergyBurst[]>([]);
  const [isBlasting, setIsBlasting] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Play blast sound
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.src = "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3";
      audioRef.current.volume = 0.3;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsBlasting(true);

    // Create multiple energy bursts
    const newBursts: EnergyBurst[] = [];
    for (let i = 0; i < 12; i++) {
      newBursts.push({
        id: Date.now() + i,
        x,
        y,
      });
    }
    setBursts((prev) => [...prev, ...newBursts]);

    // Clean up bursts after animation
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => !newBursts.find((nb) => nb.id === b.id)));
      setIsBlasting(false);
    }, 800);

    onClick?.(e);
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-scarlet to-scarlet-dark text-white hover:from-scarlet-light hover:to-scarlet",
    secondary: "bg-background/50 border-2 border-scarlet/50 text-scarlet hover:bg-scarlet/10",
    ghost: "bg-transparent text-scarlet hover:bg-scarlet/10",
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden rounded-lg font-semibold transition-all duration-300",
        "transform hover:scale-105 active:scale-95",
        "shadow-lg hover:shadow-scarlet/30",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        isBlasting && "scale-110",
        className
      )}
      style={{
        boxShadow: isBlasting
          ? "0 0 40px hsl(348 100% 50% / 0.8), 0 0 80px hsl(348 83% 47% / 0.4)"
          : undefined,
      }}
    >
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(348 100% 70% / 0.2), transparent)",
          animation: "shimmer 2s infinite",
        }}
      />

      {/* Energy bursts */}
      {bursts.map((burst) => (
        <div key={burst.id} className="absolute pointer-events-none" style={{ left: burst.x, top: burst.y }}>
          {/* Central chaos energy core */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "120px",
              height: "120px",
              background: `radial-gradient(circle, 
                hsl(348 100% 70%) 0%, 
                hsl(348 100% 50%) 30%, 
                hsl(348 83% 40% / 0.5) 60%, 
                transparent 100%
              )`,
              animation: "chaosCore 0.6s ease-out forwards",
            }}
          />

          {/* Energy blast waves */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-scarlet"
              style={{
                width: "20px",
                height: "20px",
                animation: `blastWave 0.6s ease-out forwards`,
                animationDelay: `${i * 0.1}s`,
                opacity: 0,
              }}
            />
          ))}

          {/* Energy particles shooting outward */}
          {[...Array(16)].map((_, i) => {
            const angle = (i * 360) / 16 + Math.random() * 20;
            const distance = 80 + Math.random() * 60;
            return (
              <div
                key={`particle-${i}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                  width: `${4 + Math.random() * 6}px`,
                  height: `${4 + Math.random() * 6}px`,
                  background: `hsl(${348 + Math.random() * 20} 100% ${60 + Math.random() * 20}%)`,
                  boxShadow: `0 0 10px hsl(348 100% 60%)`,
                  animation: `chaosParticle 0.5s ease-out forwards`,
                  "--angle": `${angle}deg`,
                  "--distance": `${distance}px`,
                } as React.CSSProperties}
              />
            );
          })}

          {/* Hex pattern burst */}
          <svg
            className="absolute -translate-x-1/2 -translate-y-1/2"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            style={{
              animation: "hexBurst 0.6s ease-out forwards",
            }}
          >
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="hsl(348 100% 60%)"
              strokeWidth="2"
            />
          </svg>

          {/* Energy tendrils */}
          {[...Array(6)].map((_, i) => {
            const angle = (i * 60) + Math.random() * 30;
            return (
              <div
                key={`tendril-${i}`}
                className="absolute origin-center"
                style={{
                  left: 0,
                  top: 0,
                  width: "60px",
                  height: "3px",
                  background: `linear-gradient(90deg, hsl(348 100% 60%), transparent)`,
                  transform: `rotate(${angle}deg)`,
                  animation: `tendrilBlast 0.4s ease-out forwards`,
                  animationDelay: `${Math.random() * 0.1}s`,
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Screen flash effect */}
      {isBlasting && (
        <div
          className="fixed inset-0 pointer-events-none z-[300]"
          style={{
            background: "hsl(348 100% 50% / 0.15)",
            animation: "screenFlash 0.3s ease-out forwards",
          }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10">{children}</span>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes chaosCore {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }

        @keyframes blastWave {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
            border-width: 3px;
          }
          100% {
            transform: translate(-50%, -50%) scale(8);
            opacity: 0;
            border-width: 1px;
          }
        }

        @keyframes chaosParticle {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(
              calc(-50% + cos(var(--angle)) * var(--distance)),
              calc(-50% + sin(var(--angle)) * var(--distance))
            ) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes hexBurst {
          0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(2) rotate(30deg);
            opacity: 0;
          }
        }

        @keyframes tendrilBlast {
          0% {
            transform: rotate(var(--angle, 0deg)) scaleX(0);
            opacity: 1;
          }
          100% {
            transform: rotate(var(--angle, 0deg)) scaleX(2);
            opacity: 0;
          }
        }

        @keyframes screenFlash {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </button>
  );
};

export default ChaosBlastButton;
