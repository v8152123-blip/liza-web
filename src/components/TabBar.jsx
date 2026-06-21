import React from 'react';
import { Home, MessageCircle, BarChart2 } from 'lucide-react';

const TabBar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'chat', icon: MessageCircle, label: 'Чат' },
    { id: 'settings', icon: BarChart2, label: 'Прогресс' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-4px_25px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom)] z-50">
      <div className="flex justify-around items-center h-[80px] px-2 pt-1">
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
              className="flex-1 flex justify-center items-center h-full tap-highlight-transparent"
            >
              <div 
                className={`flex flex-col items-center justify-center px-6 py-2.5 rounded-[22px] transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#EAF2FF] text-[#007AFF]' 
                    : 'bg-transparent text-[#1C1C1E]'
                }`}
              >
                <Icon 
                  className="w-[26px] h-[26px] mb-1" 
                  strokeWidth={isActive ? 2.5 : 2}
                />
                <span className="text-[11px] font-medium tracking-wide">
                  {tab.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
