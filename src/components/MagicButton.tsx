import { ReactNode, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface EnergyBurst {
  id: number;
  x: number;
  y: number;
}

interface MagicButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

const MagicButton = ({ 
  children, 
  onClick, 
  className,
  variant = "primary",
  size = "md",
  disabled = false
}: MagicButtonProps) => {
  const [bursts, setBursts] = useState<EnergyBurst[]>([]);
  const [isPressed, setIsPressed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const burstIdRef = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create energy burst
    const newBurst: EnergyBurst = {
      id: burstIdRef.current++,
      x,
      y,
    };
    
    setBursts(prev => [...prev, newBurst]);
    
    // Remove burst after animation
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== newBurst.id));
    }, 1000);
    
    onClick?.();
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-gradient-to-br from-scarlet-dark to-blood border-scarlet/50 text-white",
    secondary: "bg-muted/50 border-border text-foreground hover:bg-muted",
    ghost: "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30",
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden rounded-lg font-medium border transition-all duration-300",
        "hover:scale-105 active:scale-95",
        sizeClasses[size],
        variantClasses[variant],
        disabled && "opacity-50 cursor-not-allowed hover:scale-100",
        className
      )}
      style={{
        boxShadow: variant === "primary" 
          ? isPressed 
            ? "0 0 40px hsl(348 83% 50% / 0.6), 0 0 80px hsl(348 83% 50% / 0.4), inset 0 0 20px hsl(348 100% 60% / 0.3)"
            : "0 0 15px hsl(348 83% 50% / 0.3)"
          : undefined,
        transform: isPressed ? "scale(0.97)" : undefined,
      }}
    >
      {/* Shimmer effect */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.1), transparent)",
          animation: "shimmer 2s infinite",
        }}
      />
      
      {/* Energy bursts */}
      {bursts.map(burst => (
        <div
          key={burst.id}
          className="absolute pointer-events-none"
          style={{
            left: burst.x,
            top: burst.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Core explosion */}
          <div
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(348 100% 70%), hsl(348 83% 50%), transparent)",
              animation: "energyCore 0.6s ease-out forwards",
            }}
          />
          
          {/* Energy particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-scarlet-glow"
              style={{
                animation: `energyParticle 0.8s ease-out forwards`,
                animationDelay: `${i * 0.02}s`,
                transform: `rotate(${i * 45}deg)`,
                boxShadow: "0 0 6px hsl(348 100% 60%)",
              }}
            />
          ))}
          
          {/* Chaos ring */}
          <div
            className="absolute w-8 h-8 rounded-full border-2 border-scarlet"
            style={{
              left: "-12px",
              top: "-12px",
              animation: "chaosRing 0.6s ease-out forwards",
              boxShadow: "0 0 20px hsl(348 83% 50% / 0.5)",
            }}
          />
          
          {/* Hex burst */}
          <svg
            className="absolute"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            style={{
              left: "-30px",
              top: "-30px",
              animation: "hexBurst 0.8s ease-out forwards",
            }}
          >
            <polygon
              points="30,5 55,17.5 55,42.5 30,55 5,42.5 5,17.5"
              fill="none"
              stroke="hsl(348, 100%, 60%)"
              strokeWidth="2"
              opacity="0.8"
            />
          </svg>
        </div>
      ))}
      
      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      <style>{`
        @keyframes energyCore {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
          50% { transform: translate(-50%, -50%) scale(3); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(5); opacity: 0; }
        }
        
        @keyframes energyParticle {
          0% { transform: rotate(var(--rotation, 0deg)) translateX(0); opacity: 1; }
          100% { transform: rotate(var(--rotation, 0deg)) translateX(40px); opacity: 0; }
        }
        
        @keyframes chaosRing {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
        
        @keyframes hexBurst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(2) rotate(30deg); opacity: 0; }
        }
      `}</style>
    </button>
  );
};

export default MagicButton;