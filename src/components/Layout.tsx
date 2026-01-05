import { ReactNode } from "react";
import Navbar from "./Navbar";
import ParticleField from "./ParticleField";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background hex-pattern relative overflow-hidden">
      {/* Deep background gradient */}
      <div className="fixed inset-0 bg-chaos pointer-events-none" />
      
      {/* Ambient energy orbs */}
      <div className="energy-orb w-96 h-96 -top-48 -left-48 opacity-30" />
      <div className="energy-orb w-64 h-64 top-1/3 -right-32 opacity-20" style={{ animationDelay: "-3s" }} />
      <div className="energy-orb w-48 h-48 bottom-1/4 left-1/4 opacity-25" style={{ animationDelay: "-5s" }} />
      
      {/* Particle system */}
      <ParticleField />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main content */}
      <main className="relative z-10 pt-24 pb-12">
        <div className="page-enter">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
