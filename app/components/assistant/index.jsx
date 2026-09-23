'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { IoClose, IoPaperPlane } from 'react-icons/io5';
import { BsRobot } from 'react-icons/bs';
import { personalData } from '@/utilitários/data/personal-data';

const GREETING =
  'Olá! Sou o assistente do Vitor. Pergunte sobre as habilidades, os projetos ou como entrar em contato. 🚀';

const SUGGESTIONS = [
  'Quais as principais skills?',
  'Me fale do Planit',
  'Como entro em contato?',
];

const formatTime = () =>
  new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

// O modelo responde em markdown. Em vez de puxar uma biblioteca inteira (ou
// usar dangerouslySetInnerHTML), tratamos só os três casos que ele usa e
// devolvemos elementos React — nada de HTML vindo do modelo é interpretado.
const INLINE_MD = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function renderRich(text) {
  return text.split(INLINE_MD).map((part, i) => {
    if (!part) return null;

    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }

    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="font-mono text-[0.85em] px-1 py-0.5 rounded bg-primary-cyan/10 text-primary-cyan-light"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    const link = /^\[([^\]]+)\]\((https?:\/\/[^)]+|mailto:[^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a
          key={i}
          href={link[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-cyan-light underline underline-offset-2 hover:text-primary-cyan"
        >
          {link[1]}
        </a>
      );
    }

    return part;
  });
}

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: GREETING, time: formatTime() },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  // Cancela uma resposta em voo se o componente sair da tela.
  useEffect(() => () => abortRef.current?.abort(), []);

  const send = useCallback(
    async (rawText) => {
      const trimmed = rawText.trim();
      if (!trimmed || isLoading) return;

      const userMsg = { role: 'user', text: trimmed, time: formatTime() };
      // O histórico enviado é o mesmo que está na tela, então a conversa que o
      // modelo vê nunca diverge do que o visitante leu.
      const history = [...messages, userMsg];

      setMessages(history);
      setInput('');
      setIsLoading(true);

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch('/api/assistant', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            history: history.map(({ role, text }) => ({ role, text })),
          }),
          signal: controller.signal,
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) throw new Error(data?.error || `Erro ${res.status}`);

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', text: data.text, time: formatTime() },
        ]);
      } catch (error) {
        if (error.name === 'AbortError') return;
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            text: `${error.message} Você pode falar direto com o Vitor: ${personalData.email}`,
            time: formatTime(),
            isError: true,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  const showSuggestions = messages.length === 1 && !isLoading;

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 bg-surface-raised border-2 border-primary-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.45)] hover:scale-110 ${
          isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'
        }`}
        aria-label="Abrir assistente virtual"
        aria-expanded={isOpen}
      >
        <BsRobot size={24} className="text-primary-cyan-light" />
        <span className="absolute inset-0 rounded-full border-2 border-primary-cyan animate-ping opacity-30" />
      </button>

      {/* Janela do chat */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm flex flex-col rounded-xl overflow-hidden border border-primary-cyan/30 shadow-[0_0_40px_rgba(6,182,212,0.18)] transition-all duration-300 origin-bottom-right bg-surface-sunken ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'
        }`}
        style={{ maxHeight: 'min(560px, calc(100vh - 3rem))' }}
        role="dialog"
        aria-label="Assistente virtual do Vitor"
        aria-hidden={!isOpen}
      >
        {/* Barra de título estilo terminal */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-primary-cyan/20 bg-surface-raised">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex gap-1.5 flex-shrink-0" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-mono text-primary-cyan-light truncate">
                vhb@portfolio: ~/assistente
              </p>
              <p className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                online
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-white transition-colors p-1 rounded hover:bg-white/5 flex-shrink-0"
            aria-label="Fechar assistente"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Mensagens */}
        <div
          className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[280px]"
          aria-live="polite"
          aria-atomic="false"
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-wrap break-words ${
                  msg.role === 'user'
                    ? 'bg-primary-cyan/15 border border-primary-cyan/30 text-white rounded-br-none'
                    : msg.isError
                      ? 'bg-red-500/10 border border-red-500/30 text-red-200 rounded-bl-none'
                      : 'bg-surface-base border border-surface-line text-gray-200 rounded-bl-none'
                }`}
              >
                {msg.role === 'assistant' ? renderRich(msg.text) : msg.text}
              </div>
              <span className="text-[10px] text-gray-600 font-mono px-1">{msg.time}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start">
              <div className="bg-surface-base border border-surface-line px-3 py-2 rounded-lg rounded-bl-none">
                <div className="flex gap-1" aria-label="Digitando">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="w-1.5 h-1.5 bg-primary-cyan-light rounded-full animate-bounce"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {showSuggestions && (
            <div className="flex flex-wrap gap-2 pt-1">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] font-mono px-2.5 py-1.5 rounded-full border border-primary-cyan/25 text-primary-cyan-light hover:bg-primary-cyan/10 hover:border-primary-cyan/50 transition-colors text-left"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Entrada com prompt de shell */}
        <div className="px-3 py-3 border-t border-primary-cyan/20 bg-surface-raised">
          <div className="flex items-center gap-2 bg-surface-sunken border border-surface-line rounded-lg px-3 py-2 focus-within:border-primary-cyan/50 transition-colors">
            <span className="text-primary-cyan font-mono text-sm select-none" aria-hidden="true">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="pergunte algo..."
              maxLength={1000}
              disabled={isLoading}
              aria-label="Escreva sua pergunta"
              className="flex-1 min-w-0 bg-transparent text-sm font-mono text-white placeholder-gray-600 outline-none disabled:opacity-50"
            />
            <button
              onClick={() => send(input)}
              disabled={isLoading || !input.trim()}
              className="text-primary-cyan hover:text-primary-cyan-light disabled:text-gray-700 transition-colors p-1"
              aria-label="Enviar pergunta"
            >
              <IoPaperPlane size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
