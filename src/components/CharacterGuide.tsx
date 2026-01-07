import { useEffect, useState } from "react";
import { X } from "lucide-react";

interface Character {
  name: string;
  image: string;
  color: string;
}

interface CharacterGuideProps {
  page: "upload" | "eda" | "clean" | "visualize" | "insights";
}

const characters: Record<string, Character> = {
  wanda: {
    name: "Wanda Maximoff",
    image: "🔮",
    color: "from-scarlet to-scarlet-dark",
  },
  vision: {
    name: "Vision",
    image: "💎",
    color: "from-yellow-400 to-amber-600",
  },
  agatha: {
    name: "Agatha Harkness",
    image: "🌙",
    color: "from-purple-600 to-purple-900",
  },
  billy: {
    name: "Billy Maximoff",
    image: "⚡",
    color: "from-blue-500 to-blue-700",
  },
  tommy: {
    name: "Tommy Maximoff",
    image: "💨",
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

          {/* Character Avatar */}
          <div className="flex items-start gap-3">
            <div
              className={`w-14 h-14 rounded-full bg-gradient-to-br ${character.color} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}
              style={{
                boxShadow: `0 0 20px hsl(348 83% 47% / 0.5)`,
                animation: "float 3s ease-in-out infinite",
              }}
            >
              {character.image}
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
