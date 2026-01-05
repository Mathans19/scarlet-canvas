import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AudioToggle = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  const createAmbientSound = () => {
    if (audioContextRef.current) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioContextRef.current = audioContext;
    
    // Master gain
    const masterGain = audioContext.createGain();
    masterGain.gain.value = 0.15;
    masterGain.connect(audioContext.destination);
    gainNodeRef.current = masterGain;
    
    // Create mystical drone layers
    const frequencies = [55, 82.5, 110, 165, 220]; // A1, E2, A2, E3, A3 - dark minor feel
    
    frequencies.forEach((freq, i) => {
      const osc = audioContext.createOscillator();
      const oscGain = audioContext.createGain();
      
      osc.type = i % 2 === 0 ? "sine" : "triangle";
      osc.frequency.value = freq;
      
      // Slight detuning for ethereal effect
      osc.detune.value = (Math.random() - 0.5) * 10;
      
      oscGain.gain.value = 0.3 / (i + 1);
      
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();
      
      oscillatorsRef.current.push(osc);
    });
    
    // LFO for subtle pulsing (chaos magic feel)
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.1; // Very slow pulse
    lfoGain.gain.value = 0.03;
    lfo.connect(lfoGain);
    lfoGain.connect(masterGain.gain);
    lfo.start();
    lfoRef.current = lfo;
    
    // Random glitch sounds
    const createGlitch = () => {
      if (!audioContextRef.current || audioContextRef.current.state !== "running") return;
      
      const glitchOsc = audioContextRef.current.createOscillator();
      const glitchGain = audioContextRef.current.createGain();
      
      glitchOsc.type = "square";
      glitchOsc.frequency.value = 200 + Math.random() * 1000;
      glitchGain.gain.value = 0.02;
      
      glitchOsc.connect(glitchGain);
      glitchGain.connect(masterGain);
      
      glitchOsc.start();
      glitchGain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1);
      glitchOsc.stop(audioContextRef.current.currentTime + 0.1);
      
      // Schedule next glitch
      setTimeout(createGlitch, 3000 + Math.random() * 7000);
    };
    
    setTimeout(createGlitch, 2000);
    setIsLoaded(true);
  };

  const toggleAudio = async () => {
    if (!isPlaying) {
      createAmbientSound();
      if (audioContextRef.current?.state === "suspended") {
        await audioContextRef.current.resume();
      }
      setIsPlaying(true);
    } else {
      if (audioContextRef.current) {
        await audioContextRef.current.suspend();
      }
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      lfoRef.current?.stop();
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass-card flex items-center justify-center group transition-all duration-300 hover:scale-110"
      style={{
        boxShadow: isPlaying 
          ? "0 0 20px hsl(348 83% 50% / 0.5), 0 0 40px hsl(348 83% 50% / 0.3)" 
          : "var(--glow-sm)",
      }}
      title={isPlaying ? "Mute ambient sounds" : "Play ambient sounds"}
    >
      {isPlaying ? (
        <Volume2 className="w-5 h-5 text-scarlet animate-pulse" />
      ) : (
        <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
      )}
      
      {/* Sound wave visualization */}
      {isPlaying && (
        <div className="absolute inset-0 rounded-full pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-scarlet/30"
              style={{
                animation: `soundWave 2s ease-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>
      )}
      
      <style>{`
        @keyframes soundWave {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </button>
  );
};

export default AudioToggle;