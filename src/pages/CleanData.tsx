import { useState } from "react";
import { Trash2, Wand2, ArrowUpDown, Filter, CheckCircle2, XCircle, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";

const sampleData = [
  { id: 1, name: "John Doe", email: "john@email.com", age: 28, score: 85.5, status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@email.com", age: null, score: 92.3, status: "active" },
  { id: 3, name: "Bob Wilson", email: null, age: 35, score: 78.1, status: "inactive" },
  { id: 4, name: "Alice Brown", email: "alice@email.com", age: 42, score: null, status: "active" },
  { id: 5, name: "Charlie Davis", email: "charlie@email.com", age: 31, score: 88.9, status: "pending" },
  { id: 6, name: null, email: "unknown@email.com", age: 29, score: 76.4, status: "active" },
];

const operations = [
  { id: "remove-nulls", label: "Remove Null Values", icon: Trash2, description: "Eliminate rows with missing data" },
  { id: "fill-mean", label: "Fill with Mean", icon: Wand2, description: "Replace nulls with column average" },
  { id: "normalize", label: "Normalize Data", icon: ArrowUpDown, description: "Scale values between 0 and 1" },
  { id: "filter-outliers", label: "Remove Outliers", icon: Filter, description: "Exclude statistical anomalies" },
];

const CleanData = () => {
  const [selectedOp, setSelectedOp] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedRows, setProcessedRows] = useState<number[]>([]);

  const handleApply = () => {
    if (!selectedOp) return;
    setIsProcessing(true);
    setProcessedRows([]);
    
    // Simulate processing
    sampleData.forEach((_, i) => {
      setTimeout(() => {
        setProcessedRows((prev) => [...prev, i]);
        if (i === sampleData.length - 1) {
          setTimeout(() => setIsProcessing(false), 500);
        }
      }, i * 200);
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text text-glow">Reality Manipulation</span>
          </h1>
          <p className="text-muted-foreground font-sans max-w-xl">
            Reshape your data with chaos magic. Transform, cleanse, and 
            transmute your dataset into its purest form.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Operations Panel */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-28">
              <h2 className="font-display text-xl text-foreground mb-6">Transformation Spells</h2>
              
              <div className="space-y-3 mb-6">
                {operations.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setSelectedOp(op.id)}
                    className={`
                      w-full p-4 rounded-lg text-left transition-all duration-300 group
                      ${selectedOp === op.id 
                        ? "bg-scarlet-dark/30 border border-scarlet/50" 
                        : "bg-muted/30 border border-transparent hover:border-border"
                      }
                    `}
                    style={{
                      boxShadow: selectedOp === op.id ? "var(--glow-sm)" : undefined,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`
                        w-10 h-10 rounded-lg flex items-center justify-center transition-colors
                        ${selectedOp === op.id ? "bg-scarlet/20" : "bg-muted"}
                      `}>
                        <op.icon className={`w-5 h-5 ${selectedOp === op.id ? "text-scarlet" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <p className={`font-sans text-sm font-medium ${selectedOp === op.id ? "text-foreground" : "text-muted-foreground"}`}>
                          {op.label}
                        </p>
                        <p className="font-sans text-xs text-muted-foreground mt-1">
                          {op.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleApply}
                disabled={!selectedOp || isProcessing}
                className={`
                  w-full chaos-btn flex items-center justify-center gap-2
                  ${(!selectedOp || isProcessing) ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Casting Spell...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Apply Transformation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Data Table */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-foreground">Data Preview</h2>
                <span className="font-sans text-sm text-muted-foreground">
                  {sampleData.length} rows • 6 columns
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      {["ID", "Name", "Email", "Age", "Score", "Status"].map((header) => (
                        <th
                          key={header}
                          className="text-left py-3 px-4 font-sans text-xs text-muted-foreground font-medium uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {sampleData.map((row, i) => {
                      const isProcessed = processedRows.includes(i);
                      return (
                        <tr
                          key={row.id}
                          className={`
                            border-b border-border/50 transition-all duration-500
                            ${isProcessed ? "bg-scarlet-dark/10" : "hover:bg-muted/30"}
                          `}
                          style={{
                            boxShadow: isProcessed ? "inset 0 0 20px hsl(348, 83%, 50%, 0.1)" : undefined,
                          }}
                        >
                          <td className="py-3 px-4 font-mono text-sm text-muted-foreground">{row.id}</td>
                          <td className="py-3 px-4">
                            {row.name ? (
                              <span className="font-sans text-sm text-foreground">{row.name}</span>
                            ) : (
                              <span className="flex items-center gap-1 text-scarlet text-sm">
                                <XCircle className="w-3 h-3" />
                                null
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {row.email ? (
                              <span className="font-sans text-sm text-muted-foreground">{row.email}</span>
                            ) : (
                              <span className="flex items-center gap-1 text-scarlet text-sm">
                                <XCircle className="w-3 h-3" />
                                null
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {row.age !== null ? (
                              <span className="font-mono text-sm text-muted-foreground">{row.age}</span>
                            ) : (
                              <span className="flex items-center gap-1 text-scarlet text-sm">
                                <XCircle className="w-3 h-3" />
                                null
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {row.score !== null ? (
                              <span className="font-mono text-sm text-muted-foreground">{row.score}</span>
                            ) : (
                              <span className="flex items-center gap-1 text-scarlet text-sm">
                                <XCircle className="w-3 h-3" />
                                null
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`
                              px-2 py-1 rounded-full text-xs font-sans
                              ${row.status === "active" ? "bg-green-500/20 text-green-400" : ""}
                              ${row.status === "inactive" ? "bg-red-500/20 text-red-400" : ""}
                              ${row.status === "pending" ? "bg-yellow-500/20 text-yellow-400" : ""}
                            `}>
                              {row.status}
                            </span>
                          </td>
                          {isProcessed && (
                            <td className="py-3 px-2">
                              <CheckCircle2 className="w-4 h-4 text-green-400 animate-scale-in" />
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[
                { label: "Null Values", value: "4", color: "text-scarlet" },
                { label: "Duplicates", value: "0", color: "text-green-400" },
                { label: "Outliers", value: "2", color: "text-yellow-400" },
              ].map((stat) => (
                <div key={stat.label} className="glass-card p-4 text-center">
                  <p className={`font-display text-2xl ${stat.color}`}>{stat.value}</p>
                  <p className="font-sans text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CleanData;
