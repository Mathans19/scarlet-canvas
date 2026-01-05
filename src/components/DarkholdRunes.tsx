import { useEffect, useState } from "react";

const RUNE_SYMBOLS = ["ᛟ", "ᚦ", "ᚨ", "ᚱ", "ᚲ", "ᚷ", "ᚹ", "ᚺ", "ᛁ", "ᛃ", "ᛇ", "ᛈ", "ᛉ", "ᛊ", "ᛏ", "ᛒ", "ᛖ", "ᛗ", "ᛚ", "ᛜ", "ᛞ"];

interface Rune {
  id: number;
  symbol: string;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
}

const DarkholdRunes = () => {
  const [runes, setRunes] = useState<Rune[]>([]);

  useEffect(() => {
    const generateRunes = () => {
      const newRunes: Rune[] = [];
      for (let i = 0; i < 15; i++) {
        newRunes.push({
          id: i,
          symbol: RUNE_SYMBOLS[Math.floor(Math.random() * RUNE_SYMBOLS.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 1 + Math.random() * 2,
          delay: Math.random() * 10,
          duration: 10 + Math.random() * 10,
        });
      }
      setRunes(newRunes);
    };

    generateRunes();
  }, []);

  return (
    <div className="darkhold-runes">
      {runes.map((rune) => (
        <span
          key={rune.id}
          className="rune"
          style={{
            left: `${rune.x}%`,
            top: `${rune.y}%`,
            fontSize: `${rune.size}rem`,
            animationDelay: `${rune.delay}s`,
            animationDuration: `${rune.duration}s`,
          }}
        >
          {rune.symbol}
        </span>
      ))}
    </div>
  );
};

export default DarkholdRunes;