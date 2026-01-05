const HexOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[3] overflow-hidden">
      {/* Hex boundary corners */}
      <svg className="absolute top-0 left-0 w-48 h-48 opacity-20" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(348, 83%, 47%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(348, 83%, 47%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none"
          stroke="url(#hexGrad)"
          strokeWidth="1"
          className="animate-pulse"
        />
      </svg>
      
      <svg className="absolute top-0 right-0 w-48 h-48 opacity-20 rotate-60" viewBox="0 0 100 100">
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none"
          stroke="url(#hexGrad)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </svg>
      
      <svg className="absolute bottom-0 left-0 w-48 h-48 opacity-20 -rotate-30" viewBox="0 0 100 100">
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none"
          stroke="url(#hexGrad)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </svg>
      
      <svg className="absolute bottom-0 right-0 w-48 h-48 opacity-20 rotate-45" viewBox="0 0 100 100">
        <polygon
          points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
          fill="none"
          stroke="url(#hexGrad)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </svg>
      
      {/* Central hex distortion ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax] opacity-5">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
          <defs>
            <radialGradient id="hexRadial">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="70%" stopColor="hsl(348, 83%, 47%)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          {[...Array(6)].map((_, i) => (
            <polygon
              key={i}
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="url(#hexRadial)"
              strokeWidth="0.3"
              transform={`rotate(${i * 10} 50 50) scale(${0.3 + i * 0.12})`}
              style={{ transformOrigin: "center" }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default HexOverlay;