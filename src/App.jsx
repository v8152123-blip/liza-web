import React, { useState, useEffect } from "react";
import HomeView from "./components/HomeView";
import ChatView from "./components/ChatView";
import TabBar from "./components/TabBar";
import { useChat } from "./hooks/useChat";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // В будущем привяжем к авторизации Telegram
  const [selectedTab, setSelectedTab] = useState("home"); // 'home' | 'chat' | 'settings'
  const [activeTool, setActiveTool] = useState(null); // Для открытия модалок практик

  const { messages, isTyping, sendMessage, unreadCount, setUnreadCount } = useChat("Владимир");

  // Имитируем SplashView из Swift
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Сброс бейджей при переходе в чат (аналог .onChange во ContentView.swift)
  useEffect(() => {
    if (selectedTab === "chat") {
      setUnreadCount(0);
    }
  }, [selectedTab]);

  // Обработчик отправки команды из любого инструмента прямо в чат
  const handleSendToChat = (text) => {
    setActiveTool(null);
    setSelectedTab("chat");
    // Даем небольшую задержку на переключение таба, как в DispatchQueue.main.asyncAfter на Swift
    setTimeout(() => {
      sendMessage(text);
    }, 300);
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-[#007AFF] to-[#5AC8FA] flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-black tracking-wider animate-pulse">ЛИЗА AI</h1>
        <p className="text-sm opacity-80 mt-2">Твой психологический проводник</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-[#1C1C1E] font-sans antialiased selection:bg-[#007AFF]/20">
      
      {/* Рендеринг вью в зависимости от выбранного таба */}
      <main className="pb-24">
        {selectedTab === "home" && (
          <HomeView 
            onSendToChat={handleSendToChat} 
            onOpenTool={(id) => setActiveTool(id)} 
          />
        )}
        
        {selectedTab === "chat" && (
          <ChatView 
            messages={messages} 
            isTyping={isTyping} 
            onSendMessage={sendMessage} 
          />
        )}

        {selectedTab === "settings" && (
          <div className="p-6 text-center text-gray-500 mt-20">Экран прогресса и настроек профиля</div>
        )}
      </main>

      {/* Нативный TabBar нижней навигации */}
      <TabBar 
        selectedTab={selectedTab} 
        setSelectedTab={setSelectedTab} 
        unreadCount={unreadCount} 
      />

      {/* Модальные окна для практик (Квадратное дыхание, Заземление и т.д.) */}
      {activeTool === "breath" && (
        <BreathingTool onClose={() => setActiveTool(null)} onFinish={handleSendToChat} />
      )}
      {activeTool === "ground" && (
        <GroundingTool onClose={() => setActiveTool(null)} onFinish={handleSendToChat} />
      )}
    </div>
  );
}
