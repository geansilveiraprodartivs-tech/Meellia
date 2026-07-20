import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Send, Plus, Sparkles } from 'lucide-react';
import MeellAvatar from '../../components/MeellAvatar';
import type { ChatMessage } from '../../types';

let idc = 0;
const uid = () => `m${Date.now()}-${idc++}`;

const API_URL = 'https://meell-ia-backend.onrender.com';

const welcome: ChatMessage = {
  id: 'welcome',
  author: 'meell',
  text: 'Olá! Eu sou a Meell ✨ Sua assistente criativa. Como posso te ajudar hoje?',
  at: Date.now(),
};

export default function Conversar() {
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, thinking]);

  const send = async (e: FormEvent) => {
    e.preventDefault();

    const text = input.trim();

    if (!text || thinking) return;

    const userMsg: ChatMessage = {
      id: uid(),
      author: 'user',
      text,
      at: Date.now(),
    };

    setMessages((m) => [...m, userMsg]);
    setInput('');
    setThinking(true);

    try {
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mensagem: text,
          message: text,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          `Erro da API: ${response.status} ${response.statusText} - ${errorText}`
        );
      }

      const data = await response.json();

      const resposta =
        data.resposta ??
        data.response ??
        data.message ??
        data.mensagem;

      if (typeof resposta !== 'string' || !resposta.trim()) {
        console.error('Resposta inesperada recebida da API:', data);
        throw new Error('A API não retornou uma resposta de texto válida.');
      }

      const meellMsg: ChatMessage = {
        id: uid(),
        author: 'meell',
        text: resposta,
        at: Date.now(),
      };

      setMessages((m) => [...m, meellMsg]);
    } catch (error) {
      console.error('Erro ao conversar com a Meell IA:', error);

      const errorMsg: ChatMessage = {
        id: uid(),
        author: 'meell',
        text: 'Ops! Tive um probleminha para responder agora. 💗 Tente novamente em alguns instantes.',
        at: Date.now(),
      };

      setMessages((m) => [...m, errorMsg]);
    } finally {
      setThinking(false);
    }
  };

  const newChat = () => {
    setMessages([
      {
        ...welcome,
        id: 'welcome',
        at: Date.now(),
      },
    ]);

    setInput('');
    setThinking(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-7rem)] flex flex-col">
      {/* Header */}
      <div className="meell-card p-4 sm:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <MeellAvatar size="header" />

          <div>
            <h2 className="font-display text-lg font-bold text-rose-700">
              Conversar com a Meell
            </h2>

            <p className="text-xs text-rose-400">
              Sua assistente criativa
            </p>
          </div>
        </div>

        <button
          onClick={newChat}
          className="meell-btn-ghost"
        >
          <Plus className="w-4 h-4" />

          <span className="hidden sm:inline">
            Nova conversa
          </span>

          <span className="sm:hidden">
            Nova
          </span>
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 meell-card mt-4 p-4 sm:p-6 overflow-y-auto scroll-soft space-y-4"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex gap-3 animate-pop-in ${
              m.author === 'user'
                ? 'justify-end'
                : 'justify-start'
            }`}
          >
            {m.author === 'meell' && (
              <MeellAvatar
                size="message"
                className="self-end mb-1"
              />
            )}

            <div
              className={`max-w-[78%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-soft whitespace-pre-wrap ${
                m.author === 'user'
                  ? 'bg-gradient-to-br from-rose-400 to-rose-500 text-white rounded-br-md'
                  : 'bg-white border border-rose-100 text-rose-700 rounded-bl-md'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}

        {thinking && (
          <div className="flex gap-3 items-end animate-fade-up">
            <MeellAvatar size="message" />

            <div className="bg-white border border-rose-100 rounded-2xl rounded-bl-md px-4 py-3.5 flex items-center gap-2">
              <span className="text-xs text-rose-400 font-medium">
                Meell está pensando
              </span>

              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-300 animate-pulse-soft" />

                <span className="w-1.5 h-1.5 rounded-full bg-rose-300 animate-pulse-soft [animation-delay:0.2s]" />

                <span className="w-1.5 h-1.5 rounded-full bg-rose-300 animate-pulse-soft [animation-delay:0.4s]" />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={send}
        className="mt-4 meell-card p-3 sm:p-4 flex items-end gap-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(e as unknown as FormEvent);
            }
          }}
          rows={1}
          placeholder="Digite sua mensagem para a Meell..."
          className="flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-rose-800 placeholder-rose-300 focus:outline-none max-h-32 scroll-soft"
        />

        <button
          type="submit"
          disabled={!input.trim() || thinking}
          className="meell-btn-primary shrink-0"
          aria-label="Enviar mensagem"
        >
          <Send className="w-4 h-4" />

          <span className="hidden sm:inline">
            Enviar
          </span>
        </button>
      </form>

      <p className="mt-2 text-center text-[11px] text-rose-300 flex items-center justify-center gap-1">
        <Sparkles className="w-3 h-3" />
        Meell IA conectada ✨
      </p>
    </div>
  );
}