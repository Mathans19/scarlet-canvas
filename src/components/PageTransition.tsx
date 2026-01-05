import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const DARKHOLD_RUNES = ["ᛟ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᛁ", "ᛃ"];

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [displayedRunes, setDisplayedRunes] = useState<string[]>([]);

  useEffect(() => {
    // Generate random runes for this transition
    const runes = Array.from({ length: 20 }, () => 
      DARKHOLD_RUNES[Math.floor(Math.random() * DARKHOLD_RUNES.length)]
    );
    setDisplayedRunes(runes);
    
    setShowContent(false);
    setIsTransitioning(true);
    
    // Page flip animation timing
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, 400);
    
    const hideTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 800);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* Darkhold Page Flip Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
          {/* Left page */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full origin-right"
            style={{
              background: "linear-gradient(90deg, hsl(240 10% 6%), hsl(240 10% 8%))",
              boxShadow: "inset -20px 0 60px hsl(348 83% 30% / 0.3)",
              animation: "pageFlipLeft 0.8s ease-in-out forwards",
            }}
          >
            {/* Ancient text pattern */}
            <div className="absolute inset-0 p-8 opacity-30 overflow-hidden">
              {displayedRunes.slice(0, 10).map((rune, i) => (
                <span
                  key={i}
                  className="inline-block text-scarlet mx-2 my-1"
                  style={{
                    fontSize: `${1 + Math.random()}rem`,
                    opacity: 0.3 + Math.random() * 0.4,
                    textShadow: "0 0 10px hsl(348 83% 50%)",
                  }}
                >
                  {rune}
                </span>
              ))}
            </div>
            
            {/* Glowing edge */}
            <div 
              className="absolute top-0 right-0 w-2 h-full"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(348 100% 60%))",
                boxShadow: "0 0 30px hsl(348 100% 60%), 0 0 60px hsl(348 83% 50%)",
              }}
            />
          </div>
          
          {/* Right page */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full origin-left"
            style={{
              background: "linear-gradient(-90deg, hsl(240 10% 6%), hsl(240 10% 8%))",
              boxShadow: "inset 20px 0 60px hsl(348 83% 30% / 0.3)",
              animation: "pageFlipRight 0.8s ease-in-out forwards",
            }}
          >
            {/* Ancient text pattern */}
            <div className="absolute inset-0 p-8 opacity-30 overflow-hidden text-right">
              {displayedRunes.slice(10).map((rune, i) => (
                <span
                  key={i}
                  className="inline-block text-scarlet mx-2 my-1"
                  style={{
                    fontSize: `${1 + Math.random()}rem`,
                    opacity: 0.3 + Math.random() * 0.4,
                    textShadow: "0 0 10px hsl(348 83% 50%)",
                  }}
                >
                  {rune}
                </span>
              ))}
            </div>
            
            {/* Glowing edge */}
            <div 
              className="absolute top-0 left-0 w-2 h-full"
              style={{
                background: "linear-gradient(-90deg, transparent, hsl(348 100% 60%))",
                boxShadow: "0 0 30px hsl(348 100% 60%), 0 0 60px hsl(348 83% 50%)",
              }}
            />
          </div>
          
          {/* Center glow line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full"
            style={{
              background: "hsl(348 100% 60%)",
              boxShadow: "0 0 40px 10px hsl(348 100% 60%), 0 0 80px 20px hsl(348 83% 50%)",
              animation: "centerGlow 0.8s ease-in-out",
            }}
          />
        </div>
      )}

      {/* Content with fade */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "scale(1)" : "scale(0.98)",
          transition: "all 0.4s ease-out",
        }}
      >
        {children}
      </div>

      <style>{`
        @keyframes pageFlipLeft {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(-90deg); }
          100% { transform: rotateY(-180deg); opacity: 0; }
        }
        
        @keyframes pageFlipRight {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(90deg); }
          100% { transform: rotateY(180deg); opacity: 0; }
        }
        
        @keyframes centerGlow {
          0% { opacity: 0; transform: translateX(-50%) scaleY(0); }
          30% { opacity: 1; transform: translateX(-50%) scaleY(1); }
          70% { opacity: 1; transform: translateX(-50%) scaleY(1); }
          100% { opacity: 0; transform: translateX(-50%) scaleY(0); }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;