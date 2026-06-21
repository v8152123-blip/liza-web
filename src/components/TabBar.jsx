import React from 'react';
import { Home, MessageCircle, BarChart2 } from 'lucide-react';

const TabBar = ({ selectedTab, setSelectedTab, unreadCount }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Главная' },
    { id: 'chat', icon: MessageCircle, label: 'Чат', badge: true },
    { id: 'settings', icon: BarChart2, label: 'Прогресс' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[24px] shadow-[0_-4px_20px_rgba(0,0,0,0.03)] pb-[env(safe-area-inset-bottom)] z-50">
      <div className="flex justify-around items-center h-[74px] px-2 pt-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.selectionChanged();
                setSelectedTab(tab.id);
              }}
              className="flex-1 flex justify-center items-center h-full relative"
            >
              <div 
                className={`flex flex-col items-center justify-center px-6 py-2 rounded-[22px] transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#EAF2FF] text-[#007AFF]' 
                    : 'bg-transparent text-[#1C1C1E]'
                }`}
              >
                <div className="relative">
                  <Icon 
                    className="w-[24px] h-[24px] mb-0.5" 
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  {tab.badge && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-2.5 bg-[#FF3B30] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center border border-white">
                      {unreadCount}
                    </span>
                  )}
                </div>
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

