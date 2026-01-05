import { useState } from "react";
import { BarChart2, PieChart, LineChart, ScatterChart, Layers } from "lucide-react";
import Layout from "@/components/Layout";

const chartTypes = [
  { id: "bar", label: "Bar Chart", icon: BarChart2 },
  { id: "line", label: "Line Chart", icon: LineChart },
  { id: "pie", label: "Pie Chart", icon: PieChart },
  { id: "scatter", label: "Scatter Plot", icon: ScatterChart },
];

const BarChartViz = () => {
  const data = [65, 45, 78, 52, 88, 70, 95, 60];
  const maxVal = Math.max(...data);
  
  return (
    <div className="h-64 flex items-end justify-around gap-2 px-4">
      {data.map((value, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2">
          <div
            className="w-full rounded-t-lg transition-all duration-700 group cursor-pointer relative overflow-hidden"
            style={{
              height: `${(value / maxVal) * 100}%`,
              background: `linear-gradient(180deg, hsl(348, 83%, 50%), hsl(348, 83%, 30%))`,
              animationDelay: `${i * 0.1}s`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{ boxShadow: "0 0 20px hsl(348, 83%, 50%)" }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-mono">{value}</span>
        </div>
      ))}
    </div>
  );
};

const LineChartViz = () => {
  const data = [30, 55, 40, 65, 50, 80, 60, 90, 75, 95];
  const maxVal = Math.max(...data);
  
  return (
    <div className="h-64 relative px-4">
      <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(280, 60%, 50%)" />
            <stop offset="50%" stopColor="hsl(348, 83%, 50%)" />
            <stop offset="100%" stopColor="hsl(348, 83%, 60%)" />
          </linearGradient>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(348, 83%, 50%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(348, 83%, 50%)" stopOpacity="0" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        
        {/* Area fill */}
        <path
          d={`
            M 0 ${200 - (data[0] / maxVal) * 180}
            ${data.map((v, i) => `L ${(i / (data.length - 1)) * 400} ${200 - (v / maxVal) * 180}`).join(" ")}
            L 400 200 L 0 200 Z
          `}
          fill="url(#areaGradient)"
        />
        
        {/* Line */}
        <path
          d={`
            M 0 ${200 - (data[0] / maxVal) * 180}
            ${data.map((v, i) => `L ${(i / (data.length - 1)) * 400} ${200 - (v / maxVal) * 180}`).join(" ")}
          `}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="3"
          filter="url(#glow)"
          className="transition-all duration-500"
        />
        
        {/* Points */}
        {data.map((v, i) => (
          <circle
            key={i}
            cx={(i / (data.length - 1)) * 400}
            cy={200 - (v / maxVal) * 180}
            r="6"
            fill="hsl(348, 83%, 50%)"
            className="cursor-pointer transition-all duration-300 hover:r-8"
            style={{ filter: "drop-shadow(0 0 5px hsl(348, 83%, 50%))" }}
          />
        ))}
      </svg>
    </div>
  );
};

const PieChartViz = () => {
  const data = [35, 25, 20, 15, 5];
  const colors = [
    "hsl(348, 83%, 45%)",
    "hsl(348, 83%, 35%)",
    "hsl(280, 60%, 45%)",
    "hsl(280, 60%, 35%)",
    "hsl(240, 10%, 30%)",
  ];
  
  let cumulative = 0;
  
  return (
    <div className="h-64 flex items-center justify-center">
      <svg viewBox="-1.5 -1.5 3 3" className="w-56 h-56" style={{ filter: "drop-shadow(0 0 20px hsl(348, 83%, 40%))" }}>
        {data.map((value, i) => {
          const startAngle = cumulative * 2 * Math.PI;
          cumulative += value / 100;
          const endAngle = cumulative * 2 * Math.PI;
          
          const x1 = Math.cos(startAngle);
          const y1 = Math.sin(startAngle);
          const x2 = Math.cos(endAngle);
          const y2 = Math.sin(endAngle);
          
          const largeArc = value > 50 ? 1 : 0;
          
          return (
            <path
              key={i}
              d={`M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={colors[i]}
              className="cursor-pointer transition-all duration-300 hover:opacity-80"
              style={{
                transformOrigin: "center",
                transform: "scale(1)",
              }}
            />
          );
        })}
        <circle cx="0" cy="0" r="0.5" fill="hsl(240, 10%, 8%)" />
      </svg>
    </div>
  );
};

const ScatterPlotViz = () => {
  const points = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
  }));

  return (
    <div className="h-64 relative px-4">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <defs>
          <radialGradient id="pointGradient">
            <stop offset="0%" stopColor="hsl(348, 83%, 60%)" />
            <stop offset="100%" stopColor="hsl(348, 83%, 40%)" />
          </radialGradient>
        </defs>
        
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((pos) => (
          <g key={pos}>
            <line
              x1={pos * 400}
              y1="0"
              x2={pos * 400}
              y2="200"
              stroke="hsl(240, 10%, 20%)"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1={pos * 200}
              x2="400"
              y2={pos * 200}
              stroke="hsl(240, 10%, 20%)"
              strokeWidth="1"
            />
          </g>
        ))}
        
        {points.map((point, i) => (
          <circle
            key={i}
            cx={(point.x / 100) * 380 + 10}
            cy={200 - (point.y / 100) * 180 - 10}
            r={point.size}
            fill="url(#pointGradient)"
            className="cursor-pointer transition-all duration-300"
            style={{
              filter: "drop-shadow(0 0 4px hsl(348, 83%, 50%))",
              opacity: 0.8,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

const Visualize = () => {
  const [activeChart, setActiveChart] = useState("bar");

  const renderChart = () => {
    switch (activeChart) {
      case "bar": return <BarChartViz />;
      case "line": return <LineChartViz />;
      case "pie": return <PieChartViz />;
      case "scatter": return <ScatterPlotViz />;
      default: return <BarChartViz />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text text-glow">Visual Projections</span>
          </h1>
          <p className="text-muted-foreground font-sans max-w-xl">
            Project your data into stunning visual dimensions. Each chart reveals 
            a new facet of your reality.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Chart Type Selector */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-28">
              <h3 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-scarlet" />
                Chart Types
              </h3>
              <div className="space-y-2">
                {chartTypes.map((chart) => (
                  <button
                    key={chart.id}
                    onClick={() => setActiveChart(chart.id)}
                    className={`
                      w-full p-3 rounded-lg flex items-center gap-3 transition-all duration-300
                      ${activeChart === chart.id 
                        ? "bg-scarlet-dark/30 border border-scarlet/50 text-foreground" 
                        : "bg-transparent border border-transparent hover:bg-muted/30 text-muted-foreground"
                      }
                    `}
                    style={{
                      boxShadow: activeChart === chart.id ? "var(--glow-sm)" : undefined,
                    }}
                  >
                    <chart.icon className={`w-5 h-5 ${activeChart === chart.id ? "text-scarlet" : ""}`} />
                    <span className="font-sans text-sm">{chart.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chart Area */}
          <div className="lg:col-span-3">
            <div className="glass-card p-8 energy-pulse">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-xl text-foreground">
                  {chartTypes.find((c) => c.id === activeChart)?.label}
                </h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-sans">
                  <span className="w-2 h-2 rounded-full bg-scarlet animate-pulse" />
                  Live Preview
                </div>
              </div>

              <div className="transition-all duration-500">
                {renderChart()}
              </div>

              {/* Legend */}
              <div className="mt-8 pt-6 border-t border-border flex flex-wrap gap-4 justify-center">
                {["Series A", "Series B", "Series C"].map((label, i) => (
                  <div key={label} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: `hsl(${348 - i * 30}, ${83 - i * 10}%, ${50 - i * 5}%)`,
                        boxShadow: `0 0 8px hsl(${348 - i * 30}, ${83 - i * 10}%, ${50 - i * 5}%)`,
                      }}
                    />
                    <span className="font-sans text-sm text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              {["Export PNG", "Export SVG", "Full Screen", "Share Link"].map((action) => (
                <button
                  key={action}
                  className="glass-card p-4 text-center font-sans text-sm text-muted-foreground hover:text-foreground hover:border-scarlet/30 transition-all duration-300"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Visualize;
