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
    <div className="bg-white/80 backdrop-blur-md border-t border-gray-200 px-6 py-3 pb-8">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? 'text-blue-500' : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"
                  />
                )}
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;
