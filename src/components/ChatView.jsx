import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, Info, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatView = () => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);
  const STORAGE_KEY = 'liza_chat_history';

  // --- 1. ИНИЦИАЛИЗАЦИЯ И ИСТОРИЯ ---
  useEffect(() => {
    // Загружаем историю при старте (аналог loadMessagesAsync из Swift)
    const savedMessages = localStorage.getItem(STORAGE_KEY);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // Приветственное сообщение, если истории нет
      setMessages([{
        id: Date.now().toString(),
        text: "Привет! 👋 Я Лиза, твоя точка опоры. Как ты себя чувствуешь сегодня?",
        isUser: false,
        date: new Date().toISOString()
      }]);
    }
  }, []);

  // Сохраняем историю при каждом изменении (аналог saveMessages)
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Автоскролл вниз (аналог ScrollViewReader)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);


  // --- 2. ЛОГИКА ОТПРАВКИ СООБЩЕНИЯ (API) ---
 const handleSend = async () => {
  if (!inputText.trim() || isTyping) return;

  const userText = inputText.trim();
  setInputText('');
  
  // Добавляем сообщение в UI
  const userMsg = { id: Date.now().toString(), text: userText, isUser: true };
  setMessages(prev => [...prev, userMsg]);
  setIsTyping(true);

  try {
    const response = await fetch('https://api.gemini-liza.ru/v1/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: userText,
        // Передаем системный промпт из твоего Prompts.swift
        system_instruction: `Ты — Лиза AI. Методология: КПТ, Джон Тисдейл, Даниэль Канеман. ${userText}`,
        model: "gemini-2.5-flash"
      })
    });

    const data = await response.json();
    const botMsg = { id: (Date.now() + 1).toString(), text: data.reply || "...", isUser: false };
    setMessages(prev => [...prev, botMsg]);
  } catch (e) {
    console.error(e);
  } finally {
    setIsTyping(false);
  }
};


  // Очистка памяти
  const clearMemory = () => {
    setMessages([{
        id: Date.now().toString(),
        text: "История очищена. О чем поговорим теперь? 🌿",
        isUser: false,
        date: new Date().toISOString()
    }]);
  };

  return (
    <div className="flex flex-col h-full bg-[#F2F2F7]">
      
      {/* --- ХЕДЕР --- */}
      <div className="px-4 py-3 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between border-b border-gray-100">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[19px]">✨</span>
            <h2 className="font-bold text-lg text-gray-900 tracking-tight">Чат с Лизой AI</h2>
          </div>
          <button className="flex items-center gap-1 text-[12px] font-medium text-gray-500 hover:text-gray-700 transition-colors">
            <span>ИИ-поддержка. Не заменяет психолога</span>
            <Info className="w-3 h-3" />
          </button>
        </div>

        <button 
          onClick={clearMemory}
          className="p-2.5 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* --- СПИСОК СООБЩЕНИЙ --- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.isUser ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-[16px] leading-relaxed font-sans ${
                m.isUser 
                  ? 'bg-[#4776E6]/10 text-gray-900 rounded-br-sm' // Юзер (как в Swift: Color(hex: "4776E6").opacity(0.1))
                  : 'bg-gradient-to-br from-[#8E54E9] to-[#4776E6] text-white shadow-sm rounded-bl-sm' // Лиза (Градиент)
              }`}
            >
              {/* Если нужно поддерживать Markdown от Лизы, в будущем сюда можно добавить react-markdown */}
              {m.text}
            </div>
          </div>
        ))}

        {/* ИНДИКАТОР ПЕЧАТИ */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 shadow-sm px-4 py-4 rounded-2xl rounded-bl-sm flex gap-1.5">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0 }} className="w-2 h-2 bg-gray-400 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.3 }} className="w-2 h-2 bg-gray-400 rounded-full" />
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: 0.6 }} className="w-2 h-2 bg-gray-400 rounded-full" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* --- ЗОНА ВВОДА --- */}
      <div className="p-3 bg-white border-t border-gray-100 pb-6">
        <div className="flex items-end gap-2 bg-[#F2F2F7] rounded-[24px] p-1.5 pl-4">
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Опиши свои чувства..."
            className="flex-1 bg-transparent outline-none text-[15px] py-2.5 max-h-[120px] min-h-[40px] resize-none"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim() || isTyping}
            className={`p-2.5 rounded-full transition-all shrink-0 ${
              inputText.trim() && !isTyping
                ? 'bg-gradient-to-br from-[#8E54E9] to-[#4776E6] text-white shadow-md hover:opacity-90' 
                : 'bg-gray-200 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5 -ml-0.5 mt-0.5" />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChatView;
