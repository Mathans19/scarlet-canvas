import { useEffect, useState } from "react";

interface EnergyWisp {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  path: number;
}

const ChaosEnergy = () => {
  const [wisps, setWisps] = useState<EnergyWisp[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const generateWisps = () => {
      const newWisps: EnergyWisp[] = [];
      for (let i = 0; i < 8; i++) {
        newWisps.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 3 + Math.random() * 4,
          delay: Math.random() * 5,
          duration: 8 + Math.random() * 8,
          path: Math.floor(Math.random() * 3),
        });
      }
      setWisps(newWisps);
    };

    generateWisps();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      {/* Floating energy wisps */}
      {wisps.map((wisp) => (
        <div
          key={wisp.id}
          className="energy-wisp"
          style={{
            left: `${wisp.x}%`,
            top: `${wisp.y}%`,
            width: `${wisp.size}px`,
            height: `${wisp.size}px`,
            animationDelay: `${wisp.delay}s`,
            animationDuration: `${wisp.duration}s`,
          }}
        />
      ))}
      
      {/* Mouse-following chaos energy */}
      {isHovering && (
        <div
          className="absolute transition-all duration-300 ease-out"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Core */}
          <div className="w-4 h-4 rounded-full bg-scarlet/40 blur-sm" />
          
          {/* Outer rings */}
          <div 
            className="absolute inset-0 -m-4 w-12 h-12 rounded-full border border-scarlet/20 animate-ping"
            style={{ animationDuration: "2s" }}
          />
          <div 
            className="absolute inset-0 -m-8 w-20 h-20 rounded-full border border-mystic/10 animate-ping"
            style={{ animationDuration: "3s", animationDelay: "0.5s" }}
          />
        </div>
      )}
      
      {/* Chaos tendrils from corners */}
      <div className="absolute top-0 left-0 w-64 h-64">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          <defs>
            <radialGradient id="tendrilGrad">
              <stop offset="0%" stopColor="hsl(348, 83%, 60%)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <path
            d="M0,0 Q30,50 20,100"
            stroke="url(#tendrilGrad)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ filter: "blur(2px)" }}
          />
          <path
            d="M0,0 Q50,30 100,20"
            stroke="url(#tendrilGrad)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ filter: "blur(2px)", animationDelay: "1s" }}
          />
        </svg>
      </div>
      
      <div className="absolute bottom-0 right-0 w-64 h-64 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
          <path
            d="M0,0 Q30,50 20,100"
            stroke="url(#tendrilGrad)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ filter: "blur(2px)", animationDelay: "2s" }}
          />
          <path
            d="M0,0 Q50,30 100,20"
            stroke="url(#tendrilGrad)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ filter: "blur(2px)", animationDelay: "3s" }}
          />
        </svg>
      </div>
    </div>
  );
};

export default ChaosEnergy;