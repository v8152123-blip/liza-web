import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wind, Eye, Leaf, BookOpen, Lightbulb, FlaskConical, CheckCheck, Zap, User } from 'lucide-react';

const HomeView = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const moods = ["😊", "😐", "😔", "😤", "😰"];

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

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-gray-900 pb-24 font-sans px-5">
      {/* --- ХЕДЕР --- */}
      <div className="flex items-center justify-between pt-8 pb-6">
        <h1 className="text-[34px] font-bold tracking-tight">
          Лиза <span className="text-blue-600">AI</span> ✨
        </h1>
        <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-black/5">
          <span className="text-[14px] font-semibold">Владимир</span>
          <User className="text-gray-400 w-5 h-5" />
        </button>
      </div>

      {/* --- НАСТРОЕНИЕ --- */}
      <div className="mb-8">
        <h2 className="text-[22px] font-bold mb-4">Привет! Как ты сейчас?</h2>
        <div className="flex justify-between gap-2 mb-4">
          {moods.map((emoji) => (
            <motion.button
              key={emoji}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSelectedMood(emoji)}
              className={`w-[60px] h-[60px] text-[28px] rounded-2xl flex items-center justify-center transition-all ${
                selectedMood === emoji ? 'bg-white ring-2 ring-blue-500 shadow-md' : 'bg-white shadow-sm'
              }`}
            >
              {emoji}
            </motion.button>
          ))}
        </div>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full p-5 rounded-[24px] flex items-center justify-between text-white shadow-lg bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <div className="text-left">
            <div className="text-[17px] font-bold">Разобрать ситуацию</div>
            <div className="text-[14px] font-medium opacity-90">{getMoodDescription(selectedMood)}</div>
          </div>
          <Zap className="text-yellow-300 w-7 h-7 fill-current" />
        </motion.button>
      </div>

      {/* --- БЫСТРАЯ ПОМОЩЬ --- */}
      <div className="mb-8">
        <h3 className="text-[20px] font-bold mb-4">Быстрая помощь (2 мин)</h3>
        <div className="grid grid-cols-3 gap-3">
          <QuickHelpItem title="Дыхание" icon={Wind} bg="bg-green-100" color="text-green-600" />
          <QuickHelpItem title="Заземление" icon={Eye} bg="bg-orange-100" color="text-orange-600" />
          <QuickHelpItem title="Медитация" icon={Leaf} bg="bg-blue-100" color="text-blue-600" />
        </div>
      </div>

      {/* --- ИНСТРУМЕНТАРИЙ --- */}
      <div>
        <h3 className="text-[20px] font-bold mb-4">Инструментарий</h3>
        <div className="grid grid-cols-2 gap-3">
          <ToolItem title="Дневник СМЭР" icon={BookOpen} color="bg-purple-500" />
          <ToolItem title="Второй взгляд" icon={Lightbulb} color="bg-yellow-400" />
          <ToolItem title="Эксперимент" icon={FlaskConical} color="bg-orange-500" />
          <ToolItem title="Тесты" icon={CheckCheck} color="bg-cyan-500" />
        </div>
      </div>
    </div>
  );
};

const QuickHelpItem = ({ title, icon: Icon, bg, color }) => (
  <motion.button whileTap={{ scale: 0.95 }} className="bg-white p-4 rounded-[24px] flex flex-col items-center gap-3 shadow-sm border border-black/5">
    <div className={`p-3 rounded-full ${bg}`}><Icon className={`w-6 h-6 ${color}`} /></div>
    <span className="text-[13px] font-bold">{title}</span>
  </motion.button>
);

const ToolItem = ({ title, icon: Icon, color }) => (
  <motion.button whileTap={{ scale: 0.95 }} className="bg-white p-5 rounded-[24px] flex items-center gap-4 shadow-sm border border-black/5">
    <div className={`p-3 rounded-[16px] ${color}`}><Icon className="w-6 h-6 text-white" /></div>
    <span className="text-[15px] font-bold">{title}</span>
  </motion.button>
);

export default HomeView;
