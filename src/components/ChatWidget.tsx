import React, { useMemo, useState } from 'react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: string[];
  confidence?: number;
  trace?: any;
}

interface ChatWidgetProps {
  fontMode?: 'pixel' | 'lato';
  /** Absolute or relative URL. Prop wins over envs. */
  apiEndpoint?: string;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  fontMode = 'pixel',
  apiEndpoint, // no localhost default anymore
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi! I'm Lewis's portfolio assistant. Ask me about his experience, projects, or technical skills!",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTrace, setShowTrace] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const fontClass = fontMode === 'pixel' ? 'font-pixel' : 'font-lato';

  // Resolve endpoint with clear precedence:
  // 1) Prop (absolute or relative)
  // 2) Public env base (Vite or Next.js) + '/api/chat'
  // 3) Same-origin '/api/chat'
  const resolvedEndpoint = useMemo(() => {
    const baseFromVite =
      typeof import.meta !== 'undefined' &&
      (import.meta as any)?.env?.VITE_CHAT_API_BASE;
    const baseFromNext =
      typeof process !== 'undefined' && (process as any)?.env?.NEXT_PUBLIC_CHAT_API_BASE;

    const publicBase = (baseFromVite || baseFromNext || '') as string;

    if (apiEndpoint && apiEndpoint.trim()) {
      return apiEndpoint.trim();
    }
    if (publicBase) {
      return `${publicBase.replace(/\/$/, '')}/api/chat`;
    }
    // default to same-origin path; never hard-code localhost
    return '/api/chat';
  }, [apiEndpoint]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const text = input.trim();

    const userMessage: ChatMessage = {
      role: 'user',
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(resolvedEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          config: {
            top_k: 3,
            llm: { temperature: 0.1 },
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        role: 'assistant',
        content:
          data.answer ||
          'Sorry, I encountered an error processing your request.',
        citations: data.citations || [],
        confidence: data.confidence ?? 0,
        trace: data._trace,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content:
          'Sorry, I had trouble connecting to my knowledge base. Please try again.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isExpanded) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className={`bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${fontClass}`}
        >
          💬 Chat with Lewis's AI
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 h-96 bg-white text-gray-800 rounded-lg shadow-xl border-2 border-gray-300 flex flex-col z-50">
      {/* Header */}
      <div className="bg-primary-600 text-white p-3 rounded-t-lg flex justify-between items-center">
        <h3 className={`font-bold ${fontClass}`}>Lewis's Portfolio Assistant</h3>
        <button
          onClick={() => setIsExpanded(false)}
          className="text-white hover:text-gray-200"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={message.role === 'user' ? 'text-right' : 'text-left'}
          >
            <div
              className={`inline-block max-w-[80%] p-2 rounded-lg ${fontClass} text-sm ${
                message.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <div>{message.content}</div>

              {/* Citations */}
              {message.citations && message.citations.length > 0 && (
                <div className="mt-1 text-xs opacity-75">
                  Sources: {message.citations.join(', ')}
                </div>
              )}

              {/* Confidence */}
              {typeof message.confidence === 'number' && (
                <div className="mt-1 text-xs opacity-75">
                  Confidence: {Math.round((message.confidence ?? 0) * 100)}%
                </div>
              )}

              {/* Debug Trace Toggle */}
              {message.trace && (
                <button
                  onClick={() => setShowTrace((v) => !v)}
                  className="mt-1 text-xs underline opacity-75 hover:opacity-100"
                >
                  {showTrace ? 'Hide' : 'Show'} Debug Info
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
              className={`inline-block bg-gray-100 text-gray-800 p-2 rounded-lg ${fontClass} text-sm`}
            >
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.1s' }}
                />
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
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
            placeholder="Ask about Lewis's experience..."
            className={`flex-1 bg-white text-gray-800 placeholder-gray-500 caret-purple-600
                        border border-gray-300 rounded-lg px-3 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-primary-300 ${fontClass}`}
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className={`bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg transition-colors ${fontClass} text-sm`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
