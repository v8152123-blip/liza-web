import React, { useState, useEffect, useRef } from 'react';
import { Send, Info, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatView = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Инициализация (добавь вызов haptic, если нужно)
  useEffect(() => {
    // В Telegram Mini App:
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
    }
    
    const savedMessages = localStorage.getItem('liza_chat_history');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([{
        id: '1',
        text: "Привет! 👋 Я Лиза, твоя точка опоры. Как ты себя чувствуешь сегодня?",
        isUser: false
      }]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputText.trim() || isTyping) return;
    
    // Легкая вибрация при нажатии
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');

    const userText = inputText.trim();
    setInputText('');
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, isUser: true }]);
    setIsTyping(true);

    try {
      const response = await fetch('https://api.gemini-liza.ru/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userText, model: "gemini-2.5-flash" })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { id: Date.now().toString(), text: data.reply || "...", isUser: false }]);
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F2F2F7]">
      {/* ХЕДЕР В СТИЛЕ IOS */}
      <div className="bg-[#F2F2F7]/80 backdrop-blur-xl px-5 py-4 border-b border-black/5 z-10">
        <h1 className="text-[28px] font-bold tracking-tight text-gray-900">Лиза</h1>
      </div>

      {/* СПИСОК СООБЩЕНИЙ */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-5 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
                m.isUser 
                  ? 'bg-[#007AFF] text-white rounded-[20px] rounded-br-[6px]' 
                  : 'bg-white text-gray-900 rounded-[20px] rounded-bl-[6px]'
              }`}>
              <p className="text-[17px] leading-6 font-medium">{m.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white shadow-sm px-5 py-4 rounded-[20px] rounded-bl-[6px] flex gap-1.5">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-gray-300 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-gray-300 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-gray-300 rounded-full" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ПОЛЕ ВВОДА */}
      <div className="p-4 bg-[#F2F2F7] pb-8">
        <div className="flex items-end gap-3 bg-white rounded-[24px] p-2 shadow-sm border border-black/5">
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent px-3 py-2 outline-none text-[17px] max-h-[100px] resize-none"
            placeholder="Сообщение..."
            rows={1}
          />
          <button 
            onClick={handleSend}
            className={`p-3 rounded-full transition-all ${inputText.trim() ? 'bg-[#007AFF] text-white' : 'bg-gray-200 text-gray-400'}`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
