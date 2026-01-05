import { TrendingUp, TrendingDown, Database, Columns, AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";
import TiltCard from "@/components/TiltCard";
import MagicButton from "@/components/MagicButton";

const stats = [
  { label: "Total Rows", value: "1,247,832", icon: Database, trend: "+12.5%", up: true },
  { label: "Columns", value: "24", icon: Columns, trend: "Stable", up: true },
  { label: "Missing Values", value: "3.2%", icon: AlertTriangle, trend: "-0.8%", up: true },
  { label: "Data Quality", value: "94.7%", icon: CheckCircle, trend: "+2.3%", up: true },
];

const columns = [
  { name: "customer_id", type: "INT", nulls: "0%", unique: "100%", distribution: 85 },
  { name: "purchase_date", type: "DATETIME", nulls: "0.1%", unique: "67%", distribution: 72 },
  { name: "amount", type: "FLOAT", nulls: "0%", unique: "43%", distribution: 90 },
  { name: "category", type: "STRING", nulls: "2.1%", unique: "0.1%", distribution: 45 },
  { name: "region", type: "STRING", nulls: "0%", unique: "0.02%", distribution: 30 },
  { name: "customer_age", type: "INT", nulls: "5.3%", unique: "0.5%", distribution: 65 },
];

const EDAReport = () => {
  return (
    <Layout>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text text-glow">Reality Analysis</span>
            </h1>
            <p className="text-muted-foreground font-sans max-w-xl">
              Exploratory insights channeled from your dataset. Every pattern revealed, 
              every anomaly exposed.
            </p>
          </div>
          <MagicButton variant="secondary" size="sm">
            <RefreshCw className="w-4 h-4" />
            Refresh Analysis
          </MagicButton>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <TiltCard
              key={stat.label}
              className="p-6 float"
              intensity={10}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-scarlet-dark/30 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-scarlet" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-sans ${stat.up ? "text-green-400" : "text-red-400"}`}>
                  {stat.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <p className="font-display text-2xl text-foreground mb-1">{stat.value}</p>
              <p className="text-muted-foreground text-sm font-sans">{stat.label}</p>
            </TiltCard>
          ))}
        </div>

        {/* Column Analysis */}
        <TiltCard className="p-8 mb-8" intensity={3}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl text-foreground">Column Insights</h2>
            <MagicButton variant="ghost" size="sm">
              Export Report
            </MagicButton>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-sans text-sm text-muted-foreground font-medium">Column</th>
                  <th className="text-left py-4 px-4 font-sans text-sm text-muted-foreground font-medium">Type</th>
                  <th className="text-left py-4 px-4 font-sans text-sm text-muted-foreground font-medium">Null %</th>
                  <th className="text-left py-4 px-4 font-sans text-sm text-muted-foreground font-medium">Unique %</th>
                  <th className="text-left py-4 px-4 font-sans text-sm text-muted-foreground font-medium">Distribution</th>
                </tr>
              </thead>
              <tbody>
                {columns.map((col) => (
                  <tr
                    key={col.name}
                    className="border-b border-border/50 hover:bg-scarlet-dark/5 transition-colors group"
                  >
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-foreground group-hover:text-scarlet transition-colors">
                        {col.name}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-1 rounded-md bg-muted text-xs font-sans text-muted-foreground">
                        {col.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-sans text-sm text-muted-foreground">{col.nulls}</td>
                    <td className="py-4 px-4 font-sans text-sm text-muted-foreground">{col.unique}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-scarlet-dark to-scarlet transition-all duration-500 group-hover:shadow-[0_0_10px_hsl(348,83%,50%)]"
                            style={{ width: `${col.distribution}%` }}
                          />
                        </div>
                        <span className="font-sans text-xs text-muted-foreground w-8">{col.distribution}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TiltCard>

        {/* Distribution Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Numeric Distribution */}
          <TiltCard className="p-6" intensity={8}>
            <h3 className="font-display text-lg text-foreground mb-4">Value Distribution</h3>
            <div className="space-y-4">
              {["0-100", "100-500", "500-1000", "1000-5000", "5000+"].map((range, i) => {
                const width = [15, 35, 28, 18, 4][i];
                return (
                  <div key={range} className="flex items-center gap-4">
                    <span className="font-mono text-xs text-muted-foreground w-20">{range}</span>
                    <div className="flex-1 h-6 rounded bg-muted/50 overflow-hidden relative group">
                      <div
                        className="h-full bg-gradient-to-r from-blood via-scarlet to-scarlet-glow transition-all duration-700 group-hover:shadow-[0_0_20px_hsl(348,83%,50%)]"
                        style={{ 
                          width: `${width}%`,
                          transitionDelay: `${i * 0.1}s`
                        }}
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 font-sans text-xs text-foreground">
                        {width}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TiltCard>

          {/* Correlation Matrix Preview */}
          <TiltCard className="p-6" intensity={8}>
            <h3 className="font-display text-lg text-foreground mb-4">Correlation Heatmap</h3>
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 25 }).map((_, i) => {
                const value = Math.random();
                const hue = value > 0.5 ? 348 : 200;
                const lightness = 20 + value * 40;
                return (
                  <div
                    key={i}
                    className="aspect-square rounded transition-all duration-300 hover:scale-110 cursor-pointer"
                    style={{
                      background: `hsl(${hue}, 70%, ${lightness}%)`,
                      boxShadow: value > 0.7 ? `0 0 10px hsl(${hue}, 70%, ${lightness}%)` : undefined,
                    }}
                    title={`Correlation: ${value.toFixed(2)}`}
                  />
                );
              })}
            </div>
            <div className="mt-4 flex justify-between text-xs font-sans text-muted-foreground">
              <span>Low</span>
              <span>High</span>
            </div>
          </TiltCard>
        </div>
      </div>
    </Layout>
  );
};

export default EDAReport;