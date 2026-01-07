import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Brain, Zap, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import TiltCard from "@/components/TiltCard";
import ChaosBlastButton from "@/components/ChaosBlastButton";
import ChaosSpinner from "@/components/ChaosSpinner";
import CharacterGuide from "@/components/CharacterGuide";
import { supabase } from "@/integrations/supabase/client";

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
      content: "I am the manifestation of chaos wisdom, channeling the power of the Darkhold. Ask me anything about your data, and I shall reveal the hidden truths within the patterns of reality.",
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

  const streamChat = async (userMessages: { role: string; content: string }[]) => {
    setIsTyping(true);
    let assistantContent = "";

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ messages: userMessages }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to get response");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) throw new Error("No reader available");

      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && last.id !== 1) {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantContent } : m
                  );
                }
                return [
                  ...prev,
                  {
                    id: Date.now(),
                    role: "assistant",
                    content: assistantContent,
                    timestamp: new Date(),
                  },
                ];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "assistant",
          content: "The chaos magic falters... Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const allMessages = [
      ...messages.filter((m) => m.id !== 1).map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: input },
    ];

    await streamChat(allMessages);
  };

  const handleSuggestion = async (query: string) => {
    if (isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: query,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    const allMessages = [
      ...messages.filter((m) => m.id !== 1).map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: query },
    ];

    await streamChat(allMessages);
  };

  return (
    <Layout>
      <CharacterGuide page="insights" />
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

                {isTyping && messages[messages.length - 1]?.role !== "assistant" && (
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
                  <ChaosBlastButton disabled={!input.trim() || isTyping}>
                    <Send className="w-4 h-4" />
                  </ChaosBlastButton>
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
                  <ChaosBlastButton
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
                  </ChaosBlastButton>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-sans">Oracle Status: Active</span>
                </div>
                <p className="font-sans text-xs text-muted-foreground mt-2">
                  Powered by chaos magic AI. Ask questions in natural language.
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
