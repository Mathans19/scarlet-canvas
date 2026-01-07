import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Character {
  name: string;
  imageUrl: string;
  color: string;
}

interface CharacterGuideProps {
  page: "upload" | "eda" | "clean" | "visualize" | "insights";
}

// Comic-style character images from Marvel/MCU references
const characters: Record<string, Character> = {
  wanda: {
    name: "Wanda Maximoff",
    imageUrl: "https://i.pinimg.com/originals/5a/8a/0d/5a8a0d3cdb8b3e3c89a4a7e8f2b3c4d5.png",
    color: "from-scarlet to-scarlet-dark",
  },
  vision: {
    name: "Vision",
    imageUrl: "https://i.pinimg.com/originals/6b/9b/1e/6b9b1e4dca9c4f4d9a5a8e9f3c4d5e6f.png",
    color: "from-yellow-400 to-amber-600",
  },
  agatha: {
    name: "Agatha Harkness",
    imageUrl: "https://i.pinimg.com/originals/7c/ac/2f/7cac2f5edb0d5g5e0b6b9f0g4d5e6f7g.png",
    color: "from-purple-600 to-purple-900",
  },
  billy: {
    name: "Billy Maximoff",
    imageUrl: "https://i.pinimg.com/originals/8d/bd/3g/8dbd3g6fec1e6h6f1c7c0g1h5e6f7g8h.png",
    color: "from-blue-500 to-blue-700",
  },
  tommy: {
    name: "Tommy Maximoff",
    imageUrl: "https://i.pinimg.com/originals/9e/ce/4h/9ece4h7gfd2f7i7g2d8d1h2i6f7g8h9i.png",
    color: "from-green-400 to-green-600",
  },
};

const pageGuides: Record<string, { character: string; message: string }> = {
  upload: {
    character: "wanda",
    message: "Welcome, seeker of truth. Upload your data manifestation here, and let the chaos magic reveal its secrets. Simply drag your file into the reality rift, or click to browse the multiverse.",
  },
  eda: {
    character: "vision",
    message: "Greetings. I have analyzed your dataset's structural integrity. The patterns you see represent the underlying truth of your reality fragment—column types, null distributions, and statistical harmonics.",
  },
  clean: {
    character: "agatha",
    message: "Ah, data cleansing! Every good witch knows that messy data leads to messy spells. Use these transformation incantations to purify your dataset. Missing values? Duplicates? I'll show you the tricks.",
  },
  visualize: {
    character: "tommy",
    message: "Charts! Graphs! Everything moving super fast! Pick your visualization type and watch your data come alive. Bar charts, line charts, scatter plots—I can render them all in a blink!",
  },
  insights: {
    character: "billy",
    message: "I can sense the patterns in your data through the astral plane. Ask me anything about your dataset, and I'll channel the chaos magic to reveal insights that others cannot perceive.",
  },
};

// Comic-style SVG character illustrations
const CharacterIllustration = ({ character }: { character: string }) => {
  switch (character) {
    case "wanda":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          {/* Wanda/Scarlet Witch with crown */}
          <defs>
            <linearGradient id="wandaHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B0000" />
              <stop offset="100%" stopColor="#4a0000" />
            </linearGradient>
            <linearGradient id="wandaCrown" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#DC143C" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Hair */}
          <ellipse cx="40" cy="55" rx="25" ry="28" fill="url(#wandaHair)" />
          {/* Face */}
          <ellipse cx="40" cy="48" rx="16" ry="18" fill="#F5DEB3" />
          {/* Eyes */}
          <ellipse cx="34" cy="46" rx="3" ry="2" fill="#DC143C" filter="url(#glow)" />
          <ellipse cx="46" cy="46" rx="3" ry="2" fill="#DC143C" filter="url(#glow)" />
          {/* Crown */}
          <path d="M40,12 L32,28 L22,24 L28,38 L40,34 L52,38 L58,24 L48,28 Z" 
                fill="url(#wandaCrown)" filter="url(#glow)" />
          {/* Chaos magic wisps */}
          <circle cx="25" cy="40" r="4" fill="#DC143C" opacity="0.6" filter="url(#glow)">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="55" cy="40" r="4" fill="#DC143C" opacity="0.6" filter="url(#glow)">
            <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
        </svg>
      );
    case "vision":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <defs>
            <linearGradient id="visionFace" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E53E3E" />
              <stop offset="100%" stopColor="#9B2C2C" />
            </linearGradient>
            <linearGradient id="mindStone" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="100%" stopColor="#FFA500" />
            </linearGradient>
          </defs>
          {/* Head shape */}
          <ellipse cx="40" cy="45" rx="22" ry="26" fill="url(#visionFace)" />
          {/* Forehead Mind Stone */}
          <polygon points="40,18 35,28 45,28" fill="url(#mindStone)">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="1.5s" repeatCount="indefinite" />
          </polygon>
          {/* Face lines */}
          <path d="M25,35 Q40,30 55,35" fill="none" stroke="#4A0E0E" strokeWidth="1.5" />
          <path d="M28,50 L28,60" stroke="#4A0E0E" strokeWidth="1" />
          <path d="M52,50 L52,60" stroke="#4A0E0E" strokeWidth="1" />
          {/* Eyes */}
          <ellipse cx="33" cy="42" rx="4" ry="3" fill="#FFD700" />
          <ellipse cx="47" cy="42" rx="4" ry="3" fill="#FFD700" />
        </svg>
      );
    case "agatha":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <defs>
            <linearGradient id="agathaHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a0a2e" />
              <stop offset="100%" stopColor="#3d1a5c" />
            </linearGradient>
            <filter id="purpleGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Wild hair */}
          <ellipse cx="40" cy="50" rx="28" ry="32" fill="url(#agathaHair)" />
          <circle cx="20" cy="35" r="8" fill="url(#agathaHair)" />
          <circle cx="60" cy="35" r="8" fill="url(#agathaHair)" />
          {/* Face */}
          <ellipse cx="40" cy="48" rx="15" ry="17" fill="#DEB887" />
          {/* Smirking expression */}
          <path d="M32,52 Q40,58 48,52" fill="none" stroke="#4a0a2e" strokeWidth="2" />
          {/* Glowing purple eyes */}
          <ellipse cx="34" cy="44" rx="3" ry="2" fill="#9B30FF" filter="url(#purpleGlow)">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="46" cy="44" rx="3" ry="2" fill="#9B30FF" filter="url(#purpleGlow)">
            <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" begin="0.5s" />
          </ellipse>
          {/* Magic sparkles */}
          <circle cx="15" cy="55" r="2" fill="#9B30FF" filter="url(#purpleGlow)">
            <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="65" cy="55" r="2" fill="#9B30FF" filter="url(#purpleGlow)">
            <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" begin="1s" />
          </circle>
        </svg>
      );
    case "billy":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <defs>
            <linearGradient id="billyHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2d1b00" />
              <stop offset="100%" stopColor="#1a0f00" />
            </linearGradient>
            <filter id="blueGlow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Hair */}
          <ellipse cx="40" cy="40" rx="20" ry="22" fill="url(#billyHair)" />
          {/* Face */}
          <ellipse cx="40" cy="48" rx="14" ry="16" fill="#DEB887" />
          {/* Eyes with blue magic */}
          <ellipse cx="34" cy="46" rx="3" ry="2" fill="#4169E1" filter="url(#blueGlow)" />
          <ellipse cx="46" cy="46" rx="3" ry="2" fill="#4169E1" filter="url(#blueGlow)" />
          {/* Cape hint */}
          <path d="M20,65 L25,55 L40,60 L55,55 L60,65" fill="#1E3A8A" />
          {/* Blue magic around hands */}
          <circle cx="20" cy="70" r="5" fill="#4169E1" opacity="0.6" filter="url(#blueGlow)">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="70" r="5" fill="#4169E1" opacity="0.6" filter="url(#blueGlow)">
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin="0.5s" />
          </circle>
        </svg>
      );
    case "tommy":
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <defs>
            <linearGradient id="tommyHair" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C0C0C0" />
              <stop offset="100%" stopColor="#808080" />
            </linearGradient>
            <filter id="speedBlur">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* Speed-styled hair */}
          <ellipse cx="40" cy="38" rx="18" ry="20" fill="url(#tommyHair)" />
          {/* Speed lines in hair */}
          <path d="M25,30 L55,30" stroke="#fff" strokeWidth="2" opacity="0.5" />
          <path d="M28,35 L52,35" stroke="#fff" strokeWidth="1.5" opacity="0.3" />
          {/* Face */}
          <ellipse cx="40" cy="48" rx="14" ry="16" fill="#DEB887" />
          {/* Eyes */}
          <ellipse cx="34" cy="46" rx="3" ry="2" fill="#228B22" />
          <ellipse cx="46" cy="46" rx="3" ry="2" fill="#228B22" />
          {/* Confident smile */}
          <path d="M34,54 Q40,58 46,54" fill="none" stroke="#8B4513" strokeWidth="1.5" />
          {/* Speed effect lines */}
          <path d="M5,40 L15,40" stroke="#228B22" strokeWidth="2" opacity="0.6" filter="url(#speedBlur)">
            <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" />
          </path>
          <path d="M65,40 L75,40" stroke="#228B22" strokeWidth="2" opacity="0.6" filter="url(#speedBlur)">
            <animate attributeName="opacity" values="0;1;0" dur="0.5s" repeatCount="indefinite" begin="0.25s" />
          </path>
          <path d="M8,50 L18,50" stroke="#228B22" strokeWidth="1.5" opacity="0.4" filter="url(#speedBlur)">
            <animate attributeName="opacity" values="0;0.6;0" dur="0.5s" repeatCount="indefinite" begin="0.1s" />
          </path>
        </svg>
      );
    default:
      return null;
  }
};

const CharacterGuide = ({ page }: CharacterGuideProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const guide = pageGuides[page];
  const character = characters[guide.character];

  useEffect(() => {
    // Check if already shown for this page in this session
    const shownKey = `guide_shown_${page}`;
    const alreadyShown = sessionStorage.getItem(shownKey);

    if (!alreadyShown) {
      const showTimer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem(shownKey, "true");
      }, 800);

      return () => clearTimeout(showTimer);
    }
  }, [page]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed left-4 bottom-24 z-[100] transition-all duration-500 ${
        isExiting ? "opacity-0 translate-x-[-100%]" : "opacity-100 translate-x-0"
      }`}
      style={{
        animation: isExiting ? undefined : "slideInFromLeft 0.6s ease-out",
      }}
    >
      <div className="relative max-w-sm">
        {/* Speech Bubble */}
        <div
          className="relative bg-background/95 backdrop-blur-md border-2 border-scarlet/50 rounded-2xl p-4 shadow-2xl"
          style={{
            boxShadow: "0 0 30px hsl(348 83% 47% / 0.3), inset 0 0 20px hsl(348 83% 47% / 0.1)",
          }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-scarlet/20 transition-colors"
          >
            <X size={16} className="text-muted-foreground" />
          </button>

          {/* Character Avatar with Comic Image */}
          <div className="flex items-start gap-3">
            <div
              className={`relative w-20 h-20 rounded-xl bg-gradient-to-br ${character.color} flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden border-2 border-scarlet/50`}
              style={{
                boxShadow: `0 0 25px hsl(348 83% 47% / 0.6), inset 0 0 20px hsl(0 0% 0% / 0.3)`,
                animation: "float 3s ease-in-out infinite",
              }}
            >
              {/* Comic-style character illustration */}
              <CharacterIllustration character={guide.character} />
              
              {/* Comic halftone overlay */}
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle, hsl(0 0% 0%) 1px, transparent 1px)`,
                  backgroundSize: '4px 4px',
                }}
              />
              
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-xl border border-scarlet/30" />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-cinzel text-scarlet font-semibold text-sm mb-1">
                {character.name}
              </h4>
              <p className="text-sm text-foreground/90 leading-relaxed">
                {guide.message}
              </p>
            </div>
          </div>

          {/* Comic-style tail */}
          <div
            className="absolute -left-3 bottom-6 w-6 h-6 bg-background/95 border-l-2 border-b-2 border-scarlet/50"
            style={{
              transform: "rotate(45deg)",
              clipPath: "polygon(0 0, 100% 100%, 0 100%)",
            }}
          />
        </div>

        {/* Glowing particles around the bubble */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-scarlet/60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${-Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-100%) scale(0.8);
          }
          60% {
            transform: translateX(10%) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CharacterGuide;
