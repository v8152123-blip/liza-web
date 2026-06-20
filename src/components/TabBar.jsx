import React from 'react';
import { Home, MessageCircle, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const TabBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'chat', icon: MessageCircle, label: 'Чат' },
    { id: 'settings', icon: BarChart2, label: 'Прогресс' }
  ];

  return (
    // Добавили чуть больше высоты и более мягкий размытый фон
    <div className="fixed bottom-0 left-0 right-0 bg-[#F9F9F9]/80 backdrop-blur-2xl border-t border-black/5 pb-safe pt-2">
      <div className="flex justify-around items-center max-w-md mx-auto h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => {
                // Добавляем тактильный отклик для iOS
                window.Telegram?.WebApp?.HapticFeedback?.selectionChanged();
                setActiveTab(tab.id);
              }}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-[#007AFF]' : 'text-gray-400'
              }`}
            >
              <Icon 
                className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-semibold tracking-wide">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
