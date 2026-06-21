import React, { useState } from "react";

export default function HomeView({ onSendToChat, onOpenTool }) {
  const moods = ["😊", "😐", "😔", "😤", "😰"];
  const [selectedMood, setSelectedMood] = useState(null);

  const moodDescription = (m) => {
    switch (m) {
      case "😊": return "Радость, Отлично, Спокойно";
      case "😐": return "Нейтрально, Ровно, Без эмоций";
      case "😔": return "Усталость, Апатия, Подавленность";
      case "😤": return "Раздражение, Гнев, Возмущение";
      case "😰": return "Тревога, Страх, Стресс, Паника";
      default: return "Прямо сейчас с Лизой";
    }
  };

  const handleAnalyze = () => {
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');
    if (!selectedMood) return onSendToChat("Привет, Лиза. Давай поговорим.");
    const text = `Лиза, я сейчас чувствую: ${moodDescription(selectedMood)}. Давай разберём моё состояние.`;
    onSendToChat(text);
  };

  // 1:1 перенос QuickHelpItem из Swift
  const quickTools = [
    { id: "breath", title: "Дыхание", icon: "🌬", color: "bg-blue-500/10 text-blue-500" },
    { id: "ground", title: "Заземление", icon: "👁", color: "bg-orange-500/10 text-orange-500" },
    { id: "medit", title: "Медитация", icon: "🍃", color: "bg-green-500/10 text-green-500" }
  ];

  // 1:1 перенос ToolItem из Swift
  const tools = [
    { id: "smer", title: "Дневник СМЭР", icon: "📘", color: "bg-purple-500/10 text-purple-500" },
    { id: "dispute", title: "Второй взгляд", icon: "💡", color: "bg-yellow-500/10 text-yellow-500" },
    { id: "experiment", title: "Эксперимент", icon: "🧪", color: "bg-red-500/10 text-red-500" },
    { id: "tests", title: "Тесты", icon: "🧠", color: "bg-teal-500/10 text-teal-500" }
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F7] pb-28 px-4 pt-4 max-w-md mx-auto font-sans text-[#1C1C1E]">
      
      {/* Header (Название приложения) */}
      <div className="mb-5 mt-2 px-1">
        <h1 className="text-[28px] font-bold tracking-tight">Лиза AI ✨</h1>
      </div>

      {/* Блок отслеживания настроения */}
      <div className="bg-white rounded-[24px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h2 className="text-[17px] font-bold mb-4">Привет! Как ты сейчас?</h2>

        <div className="flex justify-between items-center mb-5 px-1">
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.selectionChanged();
                setSelectedMood(m);
              }}
              className={`text-3xl w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 ${
                selectedMood === m 
                  ? "bg-[#EAF2FF] scale-110 shadow-inner" 
                  : "bg-[#F2F2F7] active:bg-gray-200 grayscale-[0.2]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <button 
          onClick={handleAnalyze}
          className="w-full bg-[#007AFF] text-white rounded-[16px] p-4 flex justify-between items-center active:scale-[0.98] transition-transform shadow-md shadow-blue-500/10"
        >
          <div className="text-left">
            <div className="text-[16px] font-bold mb-0.5">Разобрать ситуацию</div>
            <div className="text-[13px] text-white/80 font-medium line-clamp-1">
              {moodDescription(selectedMood)}
            </div>
          </div>
          <span className="text-2xl ml-2">⚡️</span>
        </button>
      </div>

      {/* Блок: Быстрая помощь */}
      <div className="bg-white rounded-[24px] p-5 mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h2 className="text-[17px] font-bold mb-4">Быстрая помощь (2 мин)</h2>

        <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none snap-x">
          {quickTools.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
                if (t.id === "breath" || t.id === "ground") {
                  onOpenTool(t.id);
                } else {
                  onSendToChat(`Хочу выполнить технику: ${t.title}`);
                }
              }}
              className="flex-1 min-w-[100px] snap-center flex flex-col items-center justify-center bg-[#F2F2F7] rounded-[20px] py-4 px-2 active:bg-gray-200/70 transition-colors"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-3 ${t.color}`}>
                {t.icon}
              </div>
              <span className="text-[14px] font-bold text-center leading-tight">
                {t.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Блок: Инструментарий */}
      <div className="bg-white rounded-[24px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h2 className="text-[17px] font-bold mb-4">Инструментарий</h2>

        <div className="grid grid-cols-2 gap-3">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
                onSendToChat(`Запусти инструмент: ${t.title}`);
              }}
              className="flex flex-col items-center justify-center bg-[#F2F2F7] rounded-[20px] p-4 min-h-[105px] active:bg-gray-200/70 transition-colors"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-2 ${t.color}`}>
                {t.icon}
              </div>
              <span className="text-[14px] font-bold text-center leading-tight">
                {t.title}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
