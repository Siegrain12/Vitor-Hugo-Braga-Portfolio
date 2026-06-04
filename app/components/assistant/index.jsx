'use client';

import { useState, useRef, useEffect } from 'react';
import { IoClose, IoPaperPlane } from 'react-icons/io5';
import { BsRobot } from 'react-icons/bs';

// Perfil do Vitor para o assistente responder perguntas
const VITOR_PROFILE = `
Você é o assistente virtual do portfólio de Vitor Hugo Braga, um desenvolvedor Full Stack de Belo Horizonte - MG, Brasil.

## Sobre o Vitor:
- Nome: Vitor Hugo Braga
- Cargo atual: Analista QA / Developer na MGS (desde Jan 2022)
- Formação: Análise e Desenvolvimento de Sistemas - PUC Minas (2024 - presente)
- Email: vitorsilv999a@gmail.com
- LinkedIn: https://www.linkedin.com/in/vitor-hugo-braga-da-silva-b40842257/
- GitHub: https://github.com/Siegrain12

## Habilidades Técnicas:
- Frontend (Avançado): React, JavaScript, HTML, CSS
- Frontend (Intermediário): Next.js, TypeScript, Tailwind, Bootstrap
- Backend (Intermediário): Node.js, Firebase
- Backend (Básico): Java, C#
- Banco de Dados (Intermediário): MongoDB, PostgreSQL, SQL
- Banco de Dados (Básico): MySQL
- DevOps (Básico): Docker, Azure
- Ferramentas: Git (Avançado), Figma (Básico)

## Projetos em Destaque:
1. **Planit** - Aplicação Full Stack com sistema de login, cadastro, agendamentos, consultas e histórico. Tech: React, Node.js, Firebase, SQL, TypeScript.
2. **VetConnect** - Plataforma de gerenciamento de serviços veterinários com login, agendamento de consultas, histórico clínico. Tech: React, Node.js, MongoDB, PostgreSQL, TypeScript.
3. **SoluPlay** - Solução integrada de agendamentos, consultas e histórico de operações. Tech: React, Node.js, Firebase, MongoDB, TypeScript.

## Reconhecimentos:
- Certificado de Destaque Acadêmico da PUC Minas

## Instruções:
- Responda SEMPRE em português do Brasil.
- Seja simpático, animado e use linguagem de desenvolvedor mas acessível.
- Se perguntarem sobre habilidades, mencione o nível e a categoria.
- Se perguntarem sobre projetos, dê detalhes das tecnologias usadas.
- Se perguntarem algo que não sabe, redirecione para o email ou LinkedIn.
- Mantenha respostas curtas (máx 3-4 linhas) a não ser que peçam mais detalhes.
- NÃO fale sobre informações pessoais sensíveis como endereço completo ou documentos.
`;

const SYSTEM_MESSAGE = {
  role: 'user',
  parts: [{ text: `${VITOR_PROFILE}\n\nPrimeira mensagem: Diga olá e apresente-se brevemente em 2 linhas.` }]
};

export default function Assistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !initialized) {
      initializeChat();
    }
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const initializeChat = async () => {
    setIsLoading(true);
    setInitialized(true);
    try {
      const greeting = await callGemini([SYSTEM_MESSAGE], '');
      setMessages([{ role: 'assistant', text: greeting, time: formatTime() }]);
    } catch (err) {
      setMessages([{
        role: 'assistant',
        text: 'Olá! Sou o assistente virtual do Vitor. Pode me perguntar sobre as habilidades, projetos ou como entrar em contato! 🚀',
        time: formatTime()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const callGemini = async (history, userMessage) => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) throw new Error('API key not configured');

    const contents = [
      // Context message
      {
        role: 'user',
        parts: [{ text: `${VITOR_PROFILE}\n\nAgora responda a seguinte pergunta do visitante:` }]
      },
      {
        role: 'model',
        parts: [{ text: 'Entendido! Estou pronto para ajudar os visitantes do portfólio do Vitor.' }]
      },
      // Conversation history (skip init message)
      ...history.slice(1).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text || m.parts?.[0]?.text || '' }]
      })),
      // New user message
      ...(userMessage ? [{ role: 'user', parts: [{ text: userMessage }] }] : [])
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: { maxOutputTokens: 300, temperature: 0.7 }
        })
      }
    );

    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não consegui processar sua pergunta.';
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: 'user', text: trimmed, time: formatTime() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Build history for API (init + conversation so far)
      const historyForApi = [SYSTEM_MESSAGE, ...newMessages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        text: m.text
      }))];
      const response = await callGemini(historyForApi.slice(0, -1), trimmed);
      setMessages(prev => [...prev, { role: 'assistant', text: response, time: formatTime() }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Ops! Tive um problema técnico. Tente novamente ou entre em contato pelo email: vitorbraga1777@gmail.com',
        time: formatTime()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100'} bg-[#0a0e1a] border-2 border-cyan-500 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-110`}
        aria-label="Abrir assistente"
      >
        <BsRobot size={24} className="text-cyan-400" />
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping opacity-30" />
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,229,255,0.15)] transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
        style={{ maxHeight: '520px', background: '#080c1a' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-cyan-500/20 bg-[#0a0e1a]">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/40 flex items-center justify-center">
              <BsRobot size={16} className="text-cyan-400" />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-400 border border-[#0a0e1a]" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-cyan-400 tracking-widest uppercase">ASSISTENTE DO VITOR</p>
              <p className="text-[10px] text-green-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                ONLINE
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-white transition-colors p-1 rounded hover:bg-white/5"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: '280px', maxHeight: '340px' }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-cyan-500/15 border border-cyan-500/30 text-white rounded-br-none'
                    : 'bg-[#0d1224] border border-[#1a2040] text-gray-200 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-600 font-mono px-1">{msg.time}</span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="bg-[#0d1224] border border-[#1a2040] px-3 py-2 rounded-lg rounded-bl-none">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-3 py-3 border-t border-cyan-500/20 bg-[#0a0e1a]">
          <div className="flex items-center gap-2 bg-[#080c1a] border border-[#1a2040] rounded-lg px-3 py-2 focus-within:border-cyan-500/50 transition-colors">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pergunte-me algo..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-600 outline-none"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="text-cyan-400 hover:text-cyan-300 disabled:text-gray-700 transition-colors p-1"
            >
              <IoPaperPlane size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
