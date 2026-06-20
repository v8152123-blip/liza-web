import React from 'react';
import { Home, MessageCircle, BarChart2 } from 'lucide-react';

const TabBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'chat', icon: MessageCircle, label: 'Чат' },
    { id: 'settings', icon: BarChart2, label: 'Прогресс' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#F9F9F9]/80 backdrop-blur-2xl border-t border-black/10 pb-[env(safe-area-inset-bottom)] pt-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto h-[48px]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.selectionChanged();
                setActiveTab(tab.id);
              }}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-[#007AFF]' : 'text-gray-400'
              }`}
            >
              <Icon 
                className="w-6 h-6 mb-0.5" 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
