import { useState, useCallback } from "react";
import { Upload as UploadIcon, FileUp, Sparkles, Check } from "lucide-react";
import Layout from "@/components/Layout";

const Upload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      simulateUpload(files[0].name);
    }
  }, []);

  const simulateUpload = (fileName: string) => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadedFile(fileName);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text text-glow-strong">Manifest Your Data</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-sans">
            Channel the chaos magic of data transformation. Upload your dataset 
            and watch reality reshape around your insights.
          </p>
        </div>

        {/* Upload Zone */}
        <div className="max-w-3xl mx-auto">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative glass-card p-16 text-center cursor-pointer
              transition-all duration-500 group
              ${isDragging ? "scale-[1.02] border-scarlet" : ""}
              ${uploadedFile ? "border-green-500/50" : ""}
            `}
            style={{
              boxShadow: isDragging ? "var(--glow-lg)" : undefined,
            }}
          >
            {/* Animated border */}
            <div className={`
              absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500
              ${isDragging ? "opacity-100" : "group-hover:opacity-50"}
            `}>
              <div className="absolute inset-0 rounded-xl animate-spin-slow"
                style={{
                  background: "conic-gradient(from 0deg, transparent, hsl(348, 83%, 50%), transparent, hsl(280, 60%, 50%), transparent)",
                  padding: "2px",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "xor",
                  WebkitMaskComposite: "xor",
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {uploadedFile ? (
                <div className="space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                    <Check className="w-10 h-10 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-foreground mb-2">
                      Reality Manifested
                    </h3>
                    <p className="text-muted-foreground font-sans">{uploadedFile}</p>
                  </div>
                  <button
                    onClick={() => setUploadedFile(null)}
                    className="chaos-btn"
                  >
                    <span>Channel Another Dataset</span>
                  </button>
                </div>
              ) : uploadProgress > 0 && uploadProgress < 100 ? (
                <div className="space-y-6">
                  <div className="w-20 h-20 mx-auto relative">
                    <div className="absolute inset-0 rounded-full border-4 border-muted" />
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="36"
                        fill="none"
                        stroke="url(#progressGradient)"
                        strokeWidth="4"
                        strokeDasharray={`${uploadProgress * 2.26} 226`}
                        className="transition-all duration-200"
                      />
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="hsl(348, 83%, 50%)" />
                          <stop offset="100%" stopColor="hsl(280, 60%, 50%)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-scarlet animate-pulse" />
                    </div>
                  </div>
                  <p className="font-display text-xl text-foreground">
                    Warping Reality... {Math.round(uploadProgress)}%
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`
                    w-24 h-24 mx-auto rounded-full 
                    bg-gradient-to-br from-scarlet-dark/30 to-mystic-dark/30
                    flex items-center justify-center
                    transition-all duration-500
                    ${isDragging ? "scale-110" : "group-hover:scale-105"}
                  `}>
                    <UploadIcon className={`
                      w-10 h-10 transition-all duration-500
                      ${isDragging ? "text-scarlet-glow scale-125" : "text-scarlet"}
                    `} />
                  </div>
                  
                  <div>
                    <h3 className="font-display text-2xl text-foreground mb-2">
                      {isDragging ? "Release the Chaos" : "Drop Your Dataset"}
                    </h3>
                    <p className="text-muted-foreground font-sans">
                      Drag & drop your CSV, Excel, or JSON files here
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <FileUp className="w-4 h-4" />
                      CSV
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>XLSX</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span>JSON</span>
                  </div>

                  <div className="pt-4">
                    <label className="chaos-btn cursor-pointer inline-block">
                      <span>Browse Files</span>
                      <input
                        type="file"
                        className="hidden"
                        accept=".csv,.xlsx,.xls,.json"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            simulateUpload(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Uploads */}
          <div className="mt-12">
            <h3 className="font-display text-lg text-muted-foreground mb-4">
              Recent Manifestations
            </h3>
            <div className="grid gap-3">
              {["sales_data_2024.csv", "customer_analysis.xlsx", "market_trends.json"].map((file, i) => (
                <div
                  key={file}
                  className="glass-card p-4 flex items-center justify-between group cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-scarlet-dark/30 flex items-center justify-center">
                      <FileUp className="w-5 h-5 text-scarlet" />
                    </div>
                    <div>
                      <p className="font-sans text-sm text-foreground">{file}</p>
                      <p className="font-sans text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 50 + 10)} MB • {i + 1} days ago
                      </p>
                    </div>
                  </div>
                  <Sparkles className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
