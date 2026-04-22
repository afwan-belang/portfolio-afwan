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
    }, 600000); // Timeout di set 120 detik (2 Menit)

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
      let buffer = ''; // Buffer untuk merangkai teks yang terpotong

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          buffer += decoder.decode(value, { stream: true });

          // Pisahkan stream berdasarkan baris baru (format standar SSE)
          const lines = buffer.split('\n');

          // Simpan baris terakhir ke dalam buffer jika JSON-nya terpotong di tengah jalan
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmedLine = line.trim();

            // 1. Abaikan baris kosong atau sinyal ping OpenRouter
            if (!trimmedLine || trimmedLine.includes('OPENROUTER PROCESSING')) {
              continue;
            }

            // 2. Hanya proses baris yang berisi data dari AI
            if (trimmedLine.startsWith('data: ')) {
              const dataStr = trimmedLine.slice(6); // Potong teks "data: " di depannya

              // 3. Jika stream selesai, hentikan
              if (dataStr === '[DONE]') continue;

              try {
                // 4. Ubah teks JSON menjadi objek JavaScript
                const parsedData = JSON.parse(dataStr);

                // 5. HANYA ekstrak isi pesan (content). Abaikan reasoning, token, dan metadata.
                const content = parsedData.choices?.[0]?.delta?.content;

                if (content) {
                  setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1].content += content;
                    return updated;
                  });
                }
              } catch (err) {
                // Jika terjadi error saat parse JSON (karena chunk terpotong), biarkan saja.
                // Potongan ini akan dirangkai kembali di putaran loop selanjutnya.
              }
            }
          }
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Server AI memakan waktu lebih dari 120 detik. Request otomatis dibatalkan.');
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
                    // PERUBAHAN UTAMA: Membuang class "prose" dan memasukkan Custom Components
                    <div className="w-full break-words text-on-surface-variant">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ node, ...props }) => <p className="mb-4 leading-relaxed last:mb-0" {...props} />,
                          h1: ({ node, ...props }) => <h1 className="text-2xl md:text-3xl font-black text-on-surface mb-4 mt-6 tracking-tight" {...props} />,
                          h2: ({ node, ...props }) => <h2 className="text-xl md:text-2xl font-bold text-on-surface mb-3 mt-5 tracking-tight" {...props} />,
                          h3: ({ node, ...props }) => <h3 className="text-lg font-bold text-on-surface mb-3 mt-4" {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-bold text-primary" {...props} />,
                          ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1.5 marker:text-primary" {...props} />,
                          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-1.5 marker:text-primary" {...props} />,
                          li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                          blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary/50 pl-4 italic text-on-surface-variant/80 mb-4 bg-surface-container-low/30 py-2 pr-2 rounded-r-lg" {...props} />,
                          a: ({ node, ...props }) => <a className="text-primary hover:text-primary-container transition-colors underline decoration-primary/30 underline-offset-4" target="_blank" rel="noopener noreferrer" {...props} />,
                          pre: ({ node, ...props }) => (
                            <div className="w-full overflow-x-auto bg-[#0b1326] border border-outline-variant/20 rounded-xl mb-4 shadow-inner p-4 scrollbar-thin scrollbar-thumb-outline-variant scrollbar-track-transparent">
                              <pre className="w-fit min-w-full text-sm" {...props} />
                            </div>
                          ),
                          code: ({
                            node,
                            inline,
                            className,
                            children,
                            ...props
                          }: React.ComponentPropsWithoutRef<'code'> & {
                            inline?: boolean;
                            node?: unknown;
                          }) => {
                            return !inline ? (
                              <code className={`block font-mono text-[#bacac5] ${className || ''}`} {...props}>
                                {children}
                              </code>
                            ) : (
                              <code className="bg-surface-container-low text-primary-container px-1.5 py-0.5 rounded-md font-mono text-[0.85em] border border-primary/10" {...props}>
                                {children}
                              </code>
                            )
                          }
                        }}
                      >
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