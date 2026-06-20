import React, { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatView = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Начальное сообщение
    setMessages([{
      id: '1',
      text: "Привет! 👋 Я Лиза. Как ты себя чувствуешь?",
      isUser: false
    }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
    
    const userMsg = { id: Date.now().toString(), text: inputText, isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);
    
    // Имитация ответа
    setTimeout(() => {
      setMessages(prev => [...prev, { id: (Date.now()+1).toString(), text: "Я здесь, слушаю тебя.", isUser: false }]);
      setIsTyping(false);
      window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F2F2F7]">
      {/* --- IOS ХЕДЕР (GLASS EFFECT) --- */}
      <div className="sticky top-0 bg-[#F2F2F7]/80 backdrop-blur-2xl border-b border-black/5 px-6 py-4 pt-10 z-20">
        <h1 className="text-[17px] font-semibold text-center">Лиза</h1>
      </div>

      {/* --- СООБЩЕНИЯ --- */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((m) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            key={m.id} 
            className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] px-4 py-2.5 text-[17px] leading-[1.3] ${
                m.isUser 
                  ? 'bg-[#007AFF] text-white rounded-[18px] rounded-br-[4px]' 
                  : 'bg-white text-black rounded-[18px] rounded-bl-[4px] shadow-sm'
              }`}>
              {m.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white px-5 py-3 rounded-[18px] rounded-bl-[4px] shadow-sm flex gap-1.5">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-gray-400 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-gray-400 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-gray-400 rounded-full" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* --- ПОЛЕ ВВОДА (IOS STYLE) --- */}
      <div className="p-3 bg-[#F2F2F7] border-t border-black/5 pb-8">
        <div className="flex items-end gap-2 bg-white rounded-[20px] p-1.5 shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-transparent px-3 py-2 outline-none text-[17px] max-h-[100px] resize-none"
            placeholder="Сообщение"
            rows={1}
          />
          <button 
            onClick={handleSend}
            className={`p-2 rounded-full transition-all ${inputText.trim() ? 'bg-[#007AFF] text-white' : 'bg-gray-200 text-gray-400'}`}
          >
            <Send className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
