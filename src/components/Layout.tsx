import { ReactNode } from "react";
import Navbar from "./Navbar";
import ParticleField from "./ParticleField";
import DarkholdRunes from "./DarkholdRunes";
import HexOverlay from "./HexOverlay";
import GlitchEffect from "./GlitchEffect";
import ChaosEnergy from "./ChaosEnergy";
import AudioToggle from "./AudioToggle";
import PageTransition from "./PageTransition";
import wandaBg from "@/assets/scarlet-witch-bg.jpg";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background hex-pattern comic-dots relative overflow-hidden">
      {/* Wanda Maximoff Background */}
      <div 
        className="wanda-bg"
        style={{ backgroundImage: `url(${wandaBg})` }}
      />
      
      {/* Deep background gradient */}
      <div className="fixed inset-0 bg-chaos pointer-events-none" />
      
      {/* Vignette effect */}
      <div className="vignette" />
      
      {/* Darkhold floating runes */}
      <DarkholdRunes />
      
      {/* Hex reality boundaries */}
      <HexOverlay />
      
      {/* Chaos magic energy */}
      <ChaosEnergy />
      
      {/* WandaVision glitch effect */}
      <GlitchEffect />
      
      {/* Ambient energy orbs */}
      <div className="energy-orb w-96 h-96 -top-48 -left-48 opacity-30" />
      <div className="energy-orb w-64 h-64 top-1/3 -right-32 opacity-20" style={{ animationDelay: "-3s" }} />
      <div className="energy-orb w-48 h-48 bottom-1/4 left-1/4 opacity-25" style={{ animationDelay: "-5s" }} />
      <div className="energy-orb w-80 h-80 bottom-0 right-1/4 opacity-15" style={{ animationDelay: "-7s" }} />
      
      {/* Particle system */}
      <ParticleField />
      
      {/* TV static overlay for WandaVision feel */}
      <div className="fixed inset-0 pointer-events-none z-[4] opacity-[0.02]">
        <div className="w-full h-full tv-static" />
      </div>
      
      {/* Navigation */}
      <Navbar />
      
      {/* Audio Toggle */}
      <AudioToggle />
      
      {/* Main content with page transition */}
      <main className="relative z-10 pt-24 pb-12">
        <PageTransition>
          <div className="reality-glitch">
            {children}
          </div>
        </PageTransition>
      </main>
      
      {/* Scarlet Witch Crown Watermark */}
      <div className="fixed bottom-6 right-6 opacity-10 pointer-events-none z-20">
        <svg width="60" height="50" viewBox="0 0 60 50">
          <defs>
            <linearGradient id="crownGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="hsl(348, 83%, 47%)" />
              <stop offset="100%" stopColor="hsl(348, 100%, 60%)" />
            </linearGradient>
          </defs>
          {/* Crown silhouette */}
          <path 
            d="M30,5 L20,25 L5,20 L15,45 L30,40 L45,45 L55,20 L40,25 L30,5 Z" 
            fill="url(#crownGrad)"
            className="animate-pulse"
          />
          {/* Center gem */}
          <circle cx="30" cy="20" r="4" fill="hsl(348, 100%, 70%)" />
        </svg>
      </div>
    </div>
  );
};

export default Layout;