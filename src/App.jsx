import React, { useState, useEffect } from 'react';
import HomeView from './components/HomeView';
import ChatView from './components/ChatView';
import TabBar from './components/TabBar';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    // Инициализация Telegram Mini App
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand(); // Разворачиваем на весь экран
      
      // Можно задать цвет хедера под наш фон
      tg.setHeaderColor('#F2F2F7');
    }
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#F2F2F7] overflow-hidden">
      {/* Область контента */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'home' && <HomeView setActiveTab={setActiveTab} />}
        {activeTab === 'chat' && <ChatView />}
        {/* Здесь позже добавим ProfileView */}
      </div>

      {/* Нижнее меню навигации */}
      <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
