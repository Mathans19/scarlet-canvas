import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Brain, Zap, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import TiltCard from "@/components/TiltCard";
import MagicButton from "@/components/MagicButton";
import ChaosSpinner from "@/components/ChaosSpinner";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const suggestedQueries = [
  { icon: Eye, label: "Identify patterns", query: "What patterns do you see in my data?" },
  { icon: Zap, label: "Anomalies", query: "Are there any anomalies or outliers?" },
  { icon: Brain, label: "Predictions", query: "What trends can you predict from this data?" },
  { icon: Sparkles, label: "Insights", query: "Give me your top 3 insights" },
];

const AIInsights = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "I am the manifestation of chaos wisdom. Ask me anything about your data, and I shall reveal the hidden truths within the patterns of reality.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateResponse = (query: string) => {
    setIsTyping(true);
    
    const responses: Record<string, string> = {
      "What patterns do you see in my data?": "Through the chaos, I perceive three distinct clusters forming in your dataset. The temporal patterns suggest weekly cycles with peaks every 7 days. There's a strong correlation (0.87) between customer_age and purchase_amount that warrants deeper investigation.",
      "Are there any anomalies or outliers?": "Reality bends around 23 data points that defy the natural order. These outliers appear concentrated in the 'amount' column, with values 3+ standard deviations from the mean. I sense they may represent either data entry errors or genuinely exceptional transactions.",
      "What trends can you predict from this data?": "The cosmic patterns whisper of a 15% growth trajectory over the next quarter. Seasonal effects will peak in month 3, and your 'inactive' user segment shows signs of potential reactivation if targeted within 14 days of their last interaction.",
      "Give me your top 3 insights": "**Insight 1:** Your highest-value customers (top 10%) generate 43% of total revenue—focus retention efforts here.\n\n**Insight 2:** The 'pending' status has an average resolution time of 4.2 days, suggesting a bottleneck in your approval process.\n\n**Insight 3:** Missing email data correlates with 67% lower lifetime value—data completeness directly impacts business outcomes.",
    };

    const response = responses[query] || "I sense great complexity in your question. The patterns in your data suggest multiple interpretations. Could you be more specific about which dimension of reality you wish to explore?";

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    simulateResponse(input);
    setInput("");
  };

  const handleSuggestion = (query: string) => {
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    simulateResponse(query);
  };

  return (
    <Layout>
      <div className="container mx-auto px-6 h-[calc(100vh-8rem)] flex flex-col">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text text-glow">Chaos Oracle</span>
          </h1>
          <p className="text-muted-foreground font-sans max-w-xl">
            Channel the wisdom of artificial intelligence to unlock insights hidden 
            within your data. Ask, and reality shall answer.
          </p>
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col min-h-0">
            <TiltCard className="flex-1 flex flex-col min-h-0 overflow-hidden" intensity={2}>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[80%] p-4 rounded-2xl
                        ${message.role === "user"
                          ? "bg-scarlet-dark/40 border border-scarlet/30 rounded-br-sm"
                          : "bg-muted/50 border border-border rounded-bl-sm"
                        }
                      `}
                      style={{
                        boxShadow: message.role === "user" ? "var(--glow-sm)" : undefined,
                      }}
                    >
                      {message.role === "assistant" && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-6 h-6 rounded-full bg-scarlet/20 flex items-center justify-center">
                            <Sparkles className="w-3 h-3 text-scarlet" />
                          </div>
                          <span className="font-display text-xs text-scarlet">Chaos Oracle</span>
                        </div>
                      )}
                      <p className="font-sans text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                      <span className="block mt-2 text-xs text-muted-foreground">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted/50 border border-border rounded-2xl rounded-bl-sm p-4">
                      <div className="flex items-center gap-4">
                        <ChaosSpinner size="sm" />
                        <span className="text-sm text-muted-foreground">Channeling wisdom...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask the Oracle about your data..."
                    className="mystic-input flex-1"
                    disabled={isTyping}
                  />
                  <MagicButton
                    disabled={!input.trim() || isTyping}
                  >
                    <Send className="w-4 h-4" />
                  </MagicButton>
                </form>
              </div>
            </TiltCard>
          </div>

          {/* Suggestions Panel */}
          <div className="w-72 hidden lg:block">
            <TiltCard className="p-6 sticky top-28" intensity={5}>
              <h3 className="font-display text-lg text-foreground mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-scarlet" />
                Quick Queries
              </h3>
              <div className="space-y-3">
                {suggestedQueries.map((suggestion) => (
                  <MagicButton
                    key={suggestion.label}
                    onClick={() => handleSuggestion(suggestion.query)}
                    disabled={isTyping}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <div className="w-8 h-8 rounded-lg bg-scarlet-dark/30 flex items-center justify-center">
                      <suggestion.icon className="w-4 h-4 text-scarlet" />
                    </div>
                    <span>{suggestion.label}</span>
                  </MagicButton>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-sans">Oracle Status: Active</span>
                </div>
                <p className="font-sans text-xs text-muted-foreground mt-2">
                  Ask questions in natural language. The Oracle will analyze your dataset 
                  and provide chaos-powered insights.
                </p>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIInsights;