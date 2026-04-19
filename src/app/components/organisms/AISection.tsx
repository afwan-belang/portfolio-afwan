'use client';

import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Send, AlertCircle, Terminal } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AISection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input } as Message;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 120000);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error('Koneksi ke server AI gagal.');
      if (!response.body) throw new Error('Tidak ada respon stream.');

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value);
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1].content += chunk;
            return updated;
          });
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Server AI memakan waktu lebih dari 60 detik. Request otomatis dibatalkan.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Terjadi kesalahan sistem internal yang tidak diketahui.');
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6 md:px-8 relative z-10" id="ai-playground">
      <div className="flex flex-col items-center space-y-12">

        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-on-surface mb-4 tracking-tight">Consult My Digital Twin</h2>
          <p className="text-on-surface-variant max-w-md mx-auto">
            Ask about my stack, experience, or architectural philosophies.
          </p>
        </div>

        <div className="w-full max-w-[1024px] glass-card rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative">

          <div
            ref={scrollRef}
            className="h-[600px] overflow-y-auto p-6 md:p-8 space-y-8 flex flex-col scrollbar-thin scrollbar-thumb-secondary-container scrollbar-track-background"
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-start max-w-[90%] md:max-w-[80%]">
                <div className="bg-surface-container-high/60 backdrop-blur-md p-4 md:p-6 rounded-2xl rounded-tl-none border border-outline-variant/15 text-on-surface shadow-lg shadow-black/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    <span className="font-bold tracking-wide">System Initialized</span>
                  </div>
                  <p className="text-on-surface-variant leading-relaxed">
                    Hello! I&apos;m the AI persona of <strong className="text-on-surface">Muhammad Haikal Afwan</strong>.
                    Powered by Next.js 15 Edge Runtime & OpenRouter. How can I assist you with code, architecture, or Web3 today?
                  </p>
                </div>
                <span className="text-[10px] text-on-surface-variant mt-2 ml-1 uppercase tracking-widest font-mono">
                  Architect AI • Online
                </span>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end self-end' : 'items-start'} max-w-[95%] md:max-w-[85%]`}
              >
                <div className={`${msg.role === 'user'
                    ? 'bg-gradient-to-br from-primary to-primary-container p-4 rounded-2xl rounded-tr-none text-on-primary font-medium shadow-lg shadow-primary/10 overflow-hidden'
                    : 'bg-surface-container-high/60 backdrop-blur-md p-5 md:p-6 rounded-2xl rounded-tl-none border border-outline-variant/15 text-on-surface shadow-lg shadow-black/20 w-full overflow-hidden'
                  }`}>
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                  ) : (
                    <div className="prose prose-invert max-w-full break-words
                      prose-p:leading-relaxed prose-p:text-on-surface-variant 
                      prose-headings:text-on-surface prose-headings:font-bold
                      prose-strong:text-on-surface 
                      prose-ul:pl-4 prose-ol:pl-4 prose-li:marker:text-primary
                      prose-a:text-primary hover:prose-a:text-primary-container transition-colors
                      prose-pre:bg-surface-container-lowest prose-pre:border prose-pre:border-outline-variant/20 prose-pre:shadow-inner prose-pre:overflow-x-auto prose-pre:max-w-full
                      prose-code:text-primary-container prose-code:bg-surface-container-low prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md
                      prose-pre:prose-code:bg-transparent prose-pre:prose-code:text-on-surface prose-pre:prose-code:p-0">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-on-surface-variant mt-2 mx-1 uppercase tracking-widest font-mono">
                  {msg.role === 'user' ? 'You' : 'Architect AI'}
                </span>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role === 'user' && (
              <div className="flex flex-col items-start max-w-[80%]">
                <div className="flex items-center gap-2 px-5 py-4 bg-surface-container-high/30 backdrop-blur-md rounded-2xl rounded-tl-none border border-outline-variant/10 w-fit shadow-lg">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
                <span className="text-[10px] text-on-surface-variant mt-2 ml-1 uppercase tracking-widest font-mono">
                  Computing...
                </span>
              </div>
            )}

            {error && (
              <div className="flex justify-center mt-4">
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-900/20 border border-red-500/30 text-red-400 text-sm backdrop-blur-md">
                  <AlertCircle size={18} /> {error}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-6 bg-surface-container-highest/40 backdrop-blur-2xl border-t border-outline-variant/15">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                placeholder="Type your message..."
                className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-xl pl-6 pr-16 py-4 focus:ring-1 focus:ring-primary focus:border-primary text-on-surface placeholder-on-surface-variant/50 outline-none transition-all shadow-inner disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-primary-container rounded-lg flex items-center justify-center hover:bg-primary transition-colors disabled:opacity-50 disabled:hover:bg-primary-container text-on-primary-container"
              >
                <Send size={20} className={isLoading ? "opacity-0" : "opacity-100"} />
                {isLoading && <div className="absolute w-4 h-4 border-2 border-on-primary-container border-t-transparent rounded-full animate-spin" />}
              </button>
            </div>
          </form>

        </div>
      </div>
    </section>
  );
}