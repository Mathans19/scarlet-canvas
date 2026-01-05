import { useEffect, useState } from "react";

interface ChaosSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
}

const ChaosSpinner = ({ size = "md", text }: ChaosSpinnerProps) => {
  const [rotation, setRotation] = useState(0);
  
  const sizeMap = {
    sm: { container: 40, ring: 32, core: 12 },
    md: { container: 80, ring: 64, core: 24 },
    lg: { container: 120, ring: 96, core: 36 },
  };
  
  const s = sizeMap[size];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 2);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        className="relative"
        style={{ width: s.container, height: s.container }}
      >
        {/* Outer chaos rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full border-2 border-transparent"
            style={{
              borderTopColor: `hsl(348 83% ${50 + i * 10}% / ${0.8 - i * 0.2})`,
              borderRightColor: `hsl(280 60% ${50 + i * 10}% / ${0.4 - i * 0.1})`,
              transform: `rotate(${rotation * (1 + i * 0.3)}deg) scale(${1 - i * 0.15})`,
              filter: `blur(${i}px)`,
              boxShadow: `0 0 ${20 + i * 10}px hsl(348 83% 50% / 0.3)`,
            }}
          />
        ))}
        
        {/* Hex pattern overlay */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 100 100"
          style={{ transform: `rotate(${-rotation * 0.5}deg)` }}
        >
          <polygon
            points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
            fill="none"
            stroke="hsl(348, 83%, 50%)"
            strokeWidth="1"
          />
          <polygon
            points="50,15 83,32.5 83,67.5 50,85 17,67.5 17,32.5"
            fill="none"
            stroke="hsl(348, 83%, 60%)"
            strokeWidth="0.5"
          />
        </svg>
        
        {/* Energy wisps */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`wisp-${i}`}
            className="absolute w-2 h-2 rounded-full bg-scarlet-glow"
            style={{
              top: "50%",
              left: "50%",
              transform: `
                rotate(${rotation * 2 + i * 60}deg) 
                translateX(${s.ring / 2}px) 
                translateY(-50%)
              `,
              boxShadow: "0 0 10px hsl(348 100% 60%), 0 0 20px hsl(348 83% 50% / 0.5)",
              opacity: 0.8,
            }}
          />
        ))}
        
        {/* Core energy ball */}
        <div
          className="absolute rounded-full"
          style={{
            width: s.core,
            height: s.core,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "radial-gradient(circle, hsl(348 100% 70%), hsl(348 83% 40%), hsl(280 60% 30%))",
            boxShadow: `
              0 0 20px hsl(348 100% 60%),
              0 0 40px hsl(348 83% 50% / 0.5),
              inset 0 0 10px hsl(0 0% 100% / 0.3)
            `,
            animation: "pulse-glow 1.5s ease-in-out infinite",
          }}
        />
        
        {/* Rune symbols */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `rotate(${rotation * 0.2}deg)` }}
        >
          <span 
            className="text-scarlet-glow opacity-60 font-display"
            style={{ fontSize: s.core * 0.6, textShadow: "0 0 10px hsl(348 100% 60%)" }}
          >
            ᛟ
          </span>
        </div>
      </div>
      
      {text && (
        <p className="text-sm text-muted-foreground font-display tracking-wider animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

export default ChaosSpinner;