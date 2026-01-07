import { ReactNode, useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

interface DarkholdPageTransitionProps {
  children: ReactNode;
}

const DARKHOLD_RUNES = ["ᛟ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᛁ", "ᛃ", "ᛈ", "ᛉ", "ᛊ", "ᛏ"];
const ANCIENT_TEXT = [
  "In umbris potestas",
  "Chaos vincit omnia",
  "Darkhold aperit",
  "Wanda Maximoff",
  "Scarlet Witch",
  "Reality bends",
];

const DarkholdPageTransition = ({ children }: DarkholdPageTransitionProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [displayedRunes, setDisplayedRunes] = useState<string[]>([]);
  const [pagePhase, setPagePhase] = useState<"closed" | "opening" | "open" | "closing">("open");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Skip on initial mount
    if (prevPathRef.current === location.pathname) return;
    prevPathRef.current = location.pathname;

    // Generate random runes
    const runes = Array.from({ length: 30 }, () =>
      DARKHOLD_RUNES[Math.floor(Math.random() * DARKHOLD_RUNES.length)]
    );
    setDisplayedRunes(runes);

    // Play page turn sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    setShowContent(false);
    setIsTransitioning(true);
    setPagePhase("closing");

    // Phase timing for realistic book page turn
    const openingTimer = setTimeout(() => {
      setPagePhase("opening");
    }, 400);

    const showTimer = setTimeout(() => {
      setShowContent(true);
      setPagePhase("open");
    }, 800);

    const hideTimer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1200);

    return () => {
      clearTimeout(openingTimer);
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [location.pathname]);

  return (
    <div className="relative">
      {/* Page Turn Sound */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2617/2617-preview.mp3"
        preload="auto"
      />

      {/* Darkhold Book Page Turn Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden perspective-1000">
          {/* Book spine glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-full"
            style={{
              background: "linear-gradient(90deg, hsl(348 100% 30%), hsl(348 100% 50%), hsl(348 100% 30%))",
              boxShadow: "0 0 60px 20px hsl(348 100% 50% / 0.8)",
              zIndex: 10,
            }}
          />

          {/* Left page (stays mostly still, slight curl) */}
          <div
            className="absolute top-0 left-0 w-1/2 h-full origin-right"
            style={{
              background: `
                linear-gradient(90deg, 
                  hsl(25 30% 8%) 0%,
                  hsl(25 25% 12%) 85%,
                  hsl(25 20% 6%) 100%
                )
              `,
              boxShadow: "inset -30px 0 60px hsl(348 83% 30% / 0.4)",
              transform: pagePhase === "closing" ? "rotateY(5deg)" : "rotateY(0deg)",
              transition: "transform 0.4s ease-out",
            }}
          >
            {/* Aged paper texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: `
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    hsl(25 30% 20% / 0.3) 2px,
                    hsl(25 30% 20% / 0.3) 4px
                  )
                `,
              }}
            />

            {/* Ancient text and runes on left page */}
            <div className="absolute inset-0 p-8 flex flex-col justify-center items-center overflow-hidden">
              {/* Runes scattered */}
              {displayedRunes.slice(0, 15).map((rune, i) => (
                <span
                  key={`left-${i}`}
                  className="absolute text-scarlet/40"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${5 + Math.random() * 90}%`,
                    fontSize: `${0.8 + Math.random() * 1.5}rem`,
                    textShadow: "0 0 10px hsl(348 83% 50% / 0.5)",
                    transform: `rotate(${-20 + Math.random() * 40}deg)`,
                  }}
                >
                  {rune}
                </span>
              ))}

              {/* Ancient text lines */}
              {ANCIENT_TEXT.slice(0, 3).map((text, i) => (
                <p
                  key={i}
                  className="text-scarlet/30 font-cinzel text-sm tracking-widest my-2"
                  style={{
                    textShadow: "0 0 8px hsl(348 83% 50% / 0.3)",
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Page edge shadow */}
            <div
              className="absolute top-0 right-0 w-8 h-full"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(0 0% 0% / 0.5))",
              }}
            />
          </div>

          {/* Right page (the one that flips) */}
          <div
            className="absolute top-0 right-0 w-1/2 h-full origin-left"
            style={{
              background: `
                linear-gradient(-90deg, 
                  hsl(25 30% 8%) 0%,
                  hsl(25 25% 12%) 85%,
                  hsl(25 20% 6%) 100%
                )
              `,
              boxShadow: "inset 30px 0 60px hsl(348 83% 30% / 0.4)",
              transform:
                pagePhase === "closing"
                  ? "rotateY(0deg)"
                  : pagePhase === "opening"
                  ? "rotateY(-160deg)"
                  : "rotateY(-180deg)",
              transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
            }}
          >
            {/* Front of page */}
            <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
              {/* Aged paper texture */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `
                    repeating-linear-gradient(
                      0deg,
                      transparent,
                      transparent 2px,
                      hsl(25 30% 20% / 0.3) 2px,
                      hsl(25 30% 20% / 0.3) 4px
                    )
                  `,
                }}
              />

              {/* Runes on right page */}
              {displayedRunes.slice(15).map((rune, i) => (
                <span
                  key={`right-${i}`}
                  className="absolute text-scarlet/40"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    top: `${5 + Math.random() * 90}%`,
                    fontSize: `${0.8 + Math.random() * 1.5}rem`,
                    textShadow: "0 0 10px hsl(348 83% 50% / 0.5)",
                    transform: `rotate(${-20 + Math.random() * 40}deg)`,
                  }}
                >
                  {rune}
                </span>
              ))}

              {/* Page curl shadow */}
              <div
                className="absolute top-0 left-0 w-16 h-full"
                style={{
                  background: "linear-gradient(-90deg, transparent, hsl(0 0% 0% / 0.4))",
                }}
              />
            </div>

            {/* Back of page (seen when flipping) */}
            <div
              className="absolute inset-0"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                background: `
                  linear-gradient(90deg, 
                    hsl(25 25% 10%) 0%,
                    hsl(25 30% 14%) 50%,
                    hsl(25 25% 10%) 100%
                  )
                `,
              }}
            >
              {/* More runes on back */}
              {displayedRunes.map((rune, i) => (
                <span
                  key={`back-${i}`}
                  className="absolute text-scarlet/30"
                  style={{
                    left: `${5 + Math.random() * 90}%`,
                    top: `${5 + Math.random() * 90}%`,
                    fontSize: `${0.6 + Math.random() * 1}rem`,
                    textShadow: "0 0 5px hsl(348 83% 50% / 0.3)",
                  }}
                >
                  {rune}
                </span>
              ))}
            </div>

            {/* Glowing edge during flip */}
            <div
              className="absolute top-0 left-0 w-2 h-full"
              style={{
                background: "hsl(348 100% 60%)",
                boxShadow: "0 0 30px hsl(348 100% 60%), 0 0 60px hsl(348 83% 50%)",
                opacity: pagePhase === "opening" ? 1 : 0,
                transition: "opacity 0.3s",
              }}
            />
          </div>

          {/* Red energy particles during transition */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-scarlet"
              style={{
                left: "50%",
                top: `${Math.random() * 100}%`,
                animation: `particleBurst 0.8s ease-out forwards`,
                animationDelay: `${Math.random() * 0.3}s`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      )}

      {/* Content with fade */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "scale(1) translateZ(0)" : "scale(0.96) translateZ(-20px)",
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {children}
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 2000px;
        }

        @keyframes particleBurst {
          0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(${Math.random() > 0.5 ? "" : "-"}${100 + Math.random() * 200}px, ${-50 + Math.random() * 100}px) scale(0);
          }
        }
      `}</style>
    </div>
  );
};

export default DarkholdPageTransition;
