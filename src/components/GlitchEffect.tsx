import { useEffect, useState } from "react";

const GlitchEffect = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [glitchType, setGlitchType] = useState(0);

  useEffect(() => {
    const triggerGlitch = () => {
      if (Math.random() > 0.7) {
        setGlitchType(Math.floor(Math.random() * 3));
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150 + Math.random() * 200);
      }
    };

    const interval = setInterval(triggerGlitch, 4000 + Math.random() * 6000);
    return () => clearInterval(interval);
  }, []);

  if (!glitchActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {/* Chromatic aberration overlay */}
      {glitchType === 0 && (
        <>
          <div 
            className="absolute inset-0 bg-scarlet/10 mix-blend-screen"
            style={{ transform: "translateX(-4px)" }}
          />
          <div 
            className="absolute inset-0 bg-mystic/10 mix-blend-screen"
            style={{ transform: "translateX(4px)" }}
          />
        </>
      )}
      
      {/* Scan line burst */}
      {glitchType === 1 && (
        <div 
          className="absolute inset-0"
          style={{
            background: `repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              hsl(348 83% 47% / 0.1) 2px,
              hsl(348 83% 47% / 0.1) 4px
            )`,
            animation: "scanlines 0.05s linear"
          }}
        />
      )}
      
      {/* Reality tear */}
      {glitchType === 2 && (
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              ${Math.random() * 360}deg,
              transparent 45%,
              hsl(348 83% 47% / 0.2) 49%,
              hsl(280 60% 50% / 0.2) 51%,
              transparent 55%
            )`
          }}
        />
      )}
    </div>
  );
};

export default GlitchEffect;