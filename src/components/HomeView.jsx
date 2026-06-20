import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wind, Eye, Leaf, BookOpen, Lightbulb, FlaskConical, CheckCheck, Zap, User } from 'lucide-react';

const HomeView = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  const moods = ["😊", "😐", "😔", "😤", "😰"];

  // Логика текста в зависимости от настроения (1:1 из Swift)
  const getMoodDescription = (mood) => {
    switch (mood) {
      case "😊": return "Радость, Отлично, Спокойно";
      case "😐": return "Нейтрально, Ровно, Без эмоций";
      case "😔": return "Усталость, Апатия, Подавленность";
      case "😤": return "Раздражение, Гнев, Возмущение";
      case "😰": return "Тревога, Страх, Стресс, Паника";
      default: return "Прямо сейчас с Лизой";
    }
  };

  // Логика градиентов (перевод Swift Color в Tailwind классы)
  const getMoodGradient = (mood) => {
    switch (mood) {
      case "😊": return "from-green-500 to-teal-500";
      case "😐": return "from-gray-500 to-blue-400/60";
      case "😔": return "from-[#3366cc] to-indigo-500"; // Color(red: 0.2, green: 0.4, blue: 0.8)
      case "😤": return "from-red-500 to-orange-500";
      case "😰": return "from-purple-500 to-[#ff66b2]"; // Color(red: 1.0, green: 0.4, blue: 0.7)
      default: return "from-blue-500 to-purple-500";
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-gray-900 pb-20 font-sans">
      
      {/* Скролл-контейнер */}
      <div className="flex flex-col gap-6 pt-2">
        
        {/* --- ХЕДЕР --- */}
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-1 text-2xl font-bold">
            <span className="text-gray-900">Лиза</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              AI ✨
            </span>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-gray-200/60 px-3 py-1.5 rounded-full"
            onClick={() => console.log('Открыть профиль')}
          >
            <span className="text-sm font-medium">Войти</span>
            <User className="text-gray-500 w-6 h-6 bg-white rounded-full p-1 shadow-sm" />
          </motion.button>
        </div>

        {/* --- БЛОК НАСТРОЕНИЯ --- */}
        <div className="flex flex-col gap-4">
          <h2 className="text-[22px] font-bold px-4">Привет! Как ты сейчас?</h2>
          
          <div className="flex justify-between gap-2 px-4">
            {moods.map((emoji) => {
              const isSelected = selectedMood === emoji;
              return (
                <motion.button
                  key={emoji}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMood(isSelected ? null : emoji)}
                  className={`flex-1 h-[60px] text-[32px] rounded-2xl flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'bg-white shadow-md scale-110' 
                      : 'bg-gray-200/50 hover:bg-gray-200'
                  }`}
                >
                  {emoji}
                </motion.button>
              );
            })}
          </div>

          <motion.button 
            whileTap={{ scale: 0.97 }}
            className={`mx-4 mt-2 p-6 rounded-2xl flex items-center justify-between shadow-lg text-white bg-gradient-to-r ${getMoodGradient(selectedMood)}`}
            onClick={() => console.log('Отправка в чат')}
          >
            <div className="flex flex-col gap-1 text-left">
              <span className="text-[18px] font-bold">Разобрать ситуацию</span>
              <span className="text-[16px] font-medium text-white/90">
                {getMoodDescription(selectedMood)}
              </span>
            </div>
            <Zap className="text-yellow-400 w-8 h-8 fill-current" />
          </motion.button>
        </div>

        {/* --- БЫСТРАЯ ПОМОЩЬ --- */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[18px] font-bold px-4">Быстрая помощь (2 мин)</h3>
          
          <div className="flex gap-2.5 px-4">
            <QuickHelpItem title="Дыхание" icon={Wind} color="text-green-500" bg="bg-green-500/15" />
            <QuickHelpItem title="Заземление" icon={Eye} color="text-orange-500" bg="bg-orange-500/15" />
            <QuickHelpItem title="Медитация" icon={Leaf} color="text-blue-500" bg="bg-blue-500/15" />
          </div>
        </div>

        {/* --- ИНСТРУМЕНТАРИЙ --- */}
        <div className="flex flex-col gap-3 px-4">
          <h3 className="text-[18px] font-bold">Инструментарий</h3>
          
          <div className="grid grid-cols-2 gap-2.5">
            <ToolGridItem title="Дневник СМЭР" icon={BookOpen} bgColor="bg-purple-500" />
            <ToolGridItem title="Второй взгляд" icon={Lightbulb} bgColor="bg-[#FFD54F]" />
            <ToolGridItem title="Эксперимент" icon={FlaskConical} bgColor="bg-[#FF7F50]" />
            <ToolGridItem title="Тесты" icon={CheckCheck} bgColor="bg-cyan-500" />
          </div>
        </div>

      </div>
    </div>
  );
};

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

const QuickHelpItem = ({ title, icon: Icon, color, bg }) => (
  <motion.button 
    whileTap={{ scale: 0.95 }}
    className="flex-1 h-[110px] bg-white rounded-2xl flex flex-col items-center justify-center gap-3 shadow-sm border border-gray-100"
  >
    <div className={`w-[54px] h-[54px] rounded-full flex items-center justify-center ${bg}`}>
      <Icon className={`w-7 h-7 ${color}`} />
    </div>
    <span className="text-[14px] font-bold text-gray-900 truncate w-full px-1">{title}</span>
  </motion.button>
);

const ToolGridItem = ({ title, icon: Icon, bgColor }) => (
  <motion.button 
    whileTap={{ scale: 0.95 }}
    className="min-h-[95px] bg-white rounded-2xl flex flex-col items-center justify-center gap-3 py-3 shadow-sm border border-gray-100"
  >
    <div className={`w-[55px] h-[50px] rounded-xl flex items-center justify-center ${bgColor}`}>
      <Icon className="text-white w-6 h-6" />
    </div>
    <span className="text-[15px] font-bold text-gray-900 text-center px-2">{title}</span>
  </motion.button>
);

export default HomeView;
