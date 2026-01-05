import { Link, useLocation } from "react-router-dom";
import { Upload, BarChart3, Sparkles, LineChart, Brain } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Upload", icon: Upload },
  { path: "/eda", label: "EDA Report", icon: BarChart3 },
  { path: "/clean", label: "Clean Data", icon: Sparkles },
  { path: "/visualize", label: "Visualize", icon: LineChart },
  { path: "/insights", label: "AI Insights", icon: Brain },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-xl border-b border-border" />
      
      {/* Energy line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-scarlet/50 to-transparent" />
      
      <div className="relative container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-chaos-gradient flex items-center justify-center energy-pulse">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              {/* Floating orbs around logo */}
              <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-scarlet-glow animate-glow" />
            </div>
            <span className="font-display text-xl tracking-wide">
              <span className="gradient-text font-semibold">WANDA</span>
              <span className="text-muted-foreground ml-1 font-sans text-sm">Analytics</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "nav-link flex items-center gap-2 font-sans text-sm",
                    isActive && "active"
                  )}
                >
                  <item.icon className={cn(
                    "w-4 h-4 transition-all duration-300",
                    isActive && "text-scarlet drop-shadow-[0_0_8px_hsl(348,83%,50%)]"
                  )} />
                  <span className="hidden md:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-scarlet animate-pulse" />
            <span className="hidden sm:inline font-sans">Reality Online</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
