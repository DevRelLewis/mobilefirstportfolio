import React, { useMemo, useState } from "react";

interface Citation {
  content: string;
  source_system: string;
  classification: string;
  file_path: string;
  score: number;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  citations?: string[] | Citation[];
  confidence?: number;
  source_breakdown?: Record<string, number>;
  trace?: any;
}

interface ChatWidgetProps {
  fontMode?: "pixel" | "lato";
  apiEndpoint?: string;
  useRAG?: boolean;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  fontMode = "pixel",
  apiEndpoint,
  useRAG = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: useRAG
        ? "Hi! I'm Lewis's RAG-powered portfolio assistant. I can answer questions about his GitHub projects, work experience, and technical skills using real-time data!"
        : "Hi! I'm Lewis's portfolio assistant. Ask me about his experience, projects, or technical skills!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showTrace, setShowTrace] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fontClass = fontMode === "pixel" ? "font-pixel" : "font-lato";

  const resolvedEndpoint = useMemo(() => {
    if (apiEndpoint && apiEndpoint.trim()) {
      return apiEndpoint.trim();
    }
    return "/api/chat";
  }, [apiEndpoint]);

  const getClassificationBadgeColor = (classification: string) => {
    switch (classification?.toLowerCase()) {
      case "confidential":
        return "bg-red-100 text-red-800 border-red-200";
      case "restricted":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "technical":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "public":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSourceSystemIcon = (sourceSystem: string) => {
    switch (sourceSystem?.toLowerCase()) {
      case "github":
        return "🐙";
      case "hr":
        return "👔";
      case "ats":
        return "📋";
      case "linkedin":
        return "💼";
      default:
        return "📄";
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const text = input.trim();

    const userMessage: ChatMessage = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const endpoint = useRAG
        ? `${resolvedEndpoint.replace("/api/chat", "/api/rag/query")}`
        : resolvedEndpoint;

      const requestBody = useRAG
        ? {
            query: text,
            top_k: 5,
            threshold: 0.25,
          }
        : {
            message: text,
            use_rag: true,
            config: {
              top_k: 3,
              llm: { temperature: 0.1 },
            },
          };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content:
          data.answer ||
          "Sorry, I encountered an error processing your request.",
        citations: data.citations || [],
        confidence: data.confidence ?? 0,
        source_breakdown: data.source_breakdown,
        trace: data._trace,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: ChatMessage = {
        role: "assistant",
        content:
          "Sorry, I had trouble connecting to my knowledge base. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderCitations = (citations: string[] | Citation[]) => {
    if (!citations || citations.length === 0) return null;

    // Handle both old format (string[]) and new RAG format (Citation[])
    const isRAGFormat =
      citations.length > 0 && typeof citations[0] === "object";

    if (isRAGFormat) {
      const ragCitations = citations as Citation[];
      return (
        <div className="mt-2 space-y-1">
          <div className="text-xs font-semibold text-gray-600">Sources:</div>
          {ragCitations.map((cite, idx) => (
            <div key={idx} className="text-xs bg-gray-50 rounded p-2 border">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span>{getSourceSystemIcon(cite.source_system)}</span>
                  <span className="font-medium">{cite.source_system}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs border ${getClassificationBadgeColor(
                      cite.classification
                    )}`}>
                    {cite.classification}
                  </span>
                </div>
                <span className="text-gray-500">
                  Score: {(cite.score * 100).toFixed(0)}%
                </span>
              </div>
              <div className="text-gray-700">
                {cite.content.substring(0, 120)}...
              </div>
              <div className="text-gray-500 text-xs mt-1">
                {cite.file_path.split("/").pop()}
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      // Original format
      const stringCitations = citations as string[];
      return (
        <div className="mt-1 text-xs opacity-75">
          Sources: {stringCitations.join(", ")}
        </div>
      );
    }
  };

  const renderSourceBreakdown = (breakdown: Record<string, number>) => {
    if (!breakdown || Object.keys(breakdown).length === 0) return null;

    return (
      <div className="mt-2 text-xs">
        <div className="font-semibold text-gray-600 mb-1">
          Source Distribution:
        </div>
        <div className="flex flex-wrap gap-1">
          {Object.entries(breakdown).map(([source, count]) => (
            <span
              key={source}
              className="inline-flex items-center space-x-1 px-2 py-1 rounded bg-blue-100 text-blue-800">
              <span>{getSourceSystemIcon(source)}</span>
              <span>
                {source}: {count}
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className={`bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${fontClass}`}>
          {useRAG ? "🚀 Ask Lewis's RAG Assistant!" : "Ask Lewis's Assistant!"}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-white text-gray-800 rounded-lg shadow-xl border-2 border-gray-300 flex flex-col z-50">
      {/* Header */}
      <div className="bg-primary-600 text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className={`font-bold ${fontClass}`}>
          Lewis's {useRAG ? "RAG" : "Portfolio"} Assistant
        </h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-white hover:text-gray-200"
          aria-label="Close chat">
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === "user" ? "text-right" : "text-left"}>
            <div
              className={`inline-block max-w-[80%] p-2 rounded-lg ${fontClass} text-sm ${
                message.role === "user"
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}>
              <div>{message.content}</div>

              {/* Enhanced Citations */}
              {renderCitations(message.citations || [])}

              {/* Source Breakdown */}
              {message.source_breakdown &&
                renderSourceBreakdown(message.source_breakdown)}

              {/* Confidence */}
              {typeof message.confidence === "number" && (
                <div className="mt-1 text-xs opacity-75">
                  Confidence: {Math.round((message.confidence ?? 0) * 100)}%
                </div>
              )}

              {/* Debug Trace Toggle */}
              {message.trace && (
                <button
                  onClick={() => setShowTrace((v) => !v)}
                  className="mt-1 text-xs underline opacity-75 hover:opacity-100">
                  {showTrace ? "Hide" : "Show"} Debug Info
                </button>
              )}
            </div>

            {/* Debug Trace */}
            {showTrace && message.trace && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono max-h-32 overflow-y-auto">
                <pre>{JSON.stringify(message.trace, null, 2)}</pre>
              </div>
            )}
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="text-left">
            <div
              className={`inline-block bg-gray-100 text-gray-800 p-2 rounded-lg ${fontClass} text-sm`}>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              useRAG
                ? "Ask about Lewis's GitHub projects, skills, or experience..."
                : "Ask about Lewis's experience..."
            }
            className={`flex-1 bg-white text-gray-800 placeholder-gray-500 caret-purple-600
                        border border-gray-300 rounded-lg px-3 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary-300 ${fontClass}`}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className={`bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors ${fontClass} text-sm`}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
