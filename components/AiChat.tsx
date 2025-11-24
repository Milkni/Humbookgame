import React, { useState, useRef, useEffect } from 'react';
import { AppRoute } from '../types';
import { sendMessageToAja } from '../services/geminiService';
import { ArrowLeft, Send, Sparkles } from 'lucide-react';

interface AiChatProps {
  onNavigate: (route: AppRoute) => void;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AiChat: React.FC<AiChatProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Ahoj! Jsem Ája, virtuální knihovnice. Podařilo se ti vyluštit heslo? Pokud ano, napiš mi ho a já ti poradím, kam dál!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToAja(userMsg);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-mkp-red text-white p-4 shadow-md flex items-center gap-3">
        <button onClick={() => onNavigate(AppRoute.HOME)} className="p-1 hover:bg-red-800 rounded">
          <ArrowLeft />
        </button>
        <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <h2 className="text-xl font-bold">Knihovnice Ája</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${
                msg.role === 'user'
                  ? 'bg-mkp-red text-white rounded-br-none'
                  : 'bg-white text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white text-gray-500 rounded-2xl rounded-bl-none p-4 shadow-sm italic text-sm">
                    Ája přemýšlí...
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Napiš heslo nebo dotaz..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-3 focus:outline-none focus:border-mkp-red focus:ring-1 focus:ring-mkp-red"
          disabled={isLoading}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="bg-mkp-red text-white p-3 rounded-full hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};