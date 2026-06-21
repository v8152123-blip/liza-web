import React, { useState, useEffect } from "react";
import SplashView from "./components/SplashView"; // Импортируем новый сплеш
import HomeView from "./components/HomeView";
import ChatView from "./components/ChatView";
import TabBar from "./components/TabBar";
import { useChat } from "./hooks/useChat";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [selectedTab, setSelectedTab] = useState("home");
  const [activeTool, setActiveTool] = useState(null);

  const { messages, isTyping, sendMessage, unreadCount, setUnreadCount } = useChat("Владимир");

  useEffect(() => {
    if (selectedTab === "chat") {
      setUnreadCount(0);
    }
  }, [selectedTab]);

  const handleSendToChat = (text) => {
    setActiveTool(null);
    setSelectedTab("chat");
    setTimeout(() => {
      sendMessage(text);
    }, 300);
  };

  // 1:1 логика контейнера: если тру — показываем жесткий SplashView
  if (showSplash) {
    return (
      <SplashView 
        onFinish={() => setShowSplash(false)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-black font-sans antialiased">
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

      <TabBar 
        selectedTab={selectedTab} 
        setSelectedTab={setSelectedTab} 
        unreadCount={unreadCount} 
      />

      {/* Модалки практик будут открываться здесь */}
    </div>
  );
}