import { useState, useEffect } from "react";
import { hapticManager } from "../utils/haptic";

export function useChat(userName = "Владимир") {
  const storageKey = "chat_history";
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [
      {
        id: "init-greet",
        text: `Привет, ${userName}! Я Лиза — твой ИИ-психолог. Как ты себя чувствуешь?`,
        isUser: false,
        date: new Date().toISOString()
      }
    ];
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const userMsg = {
      id: crypto.randomUUID(),
      text,
      isUser: true,
      date: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);
    hapticManager.lightImpact();

    try {
      // Здесь будет твой fetch-запрос к Nginx прокси api.gemini-liza.ru
      const response = await fetch("https://api.gemini-liza.ru/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: text,
          history: messages,
          systemInstruction: `Ты ИИ-психолог Лиза... Собеседника зовут ${userName}.`
        })
      });
      
      const data = await response.json();
      
      const lizaMsg = {
        id: crypto.randomUUID(),
        text: data.reply || "Я внимательно тебя слушаю.",
        isUser: false,
        date: new Date().toISOString()
      };

      setMessages(prev => [...prev, lizaMsg]);
      hapticManager.mediumImpact();
    } catch (e) {
      console.error(e);
    } finally {
      setIsTyping(false);
    }
  };

  return { messages, isTyping, unreadCount, setUnreadCount, sendMessage };
}