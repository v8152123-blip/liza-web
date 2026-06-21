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
    if (!selectedMood) return onSendToChat("Привет, Лиза. Давай поговорим.");
    const text = `Лиза, я сейчас чувствую: ${moodDescription(selectedMood)}. Давай разберём моё состояние.`;
    onSendToChat(text);
  };

  const quickTools = [
    { id: "breath", title: "Дыхание", icon: "🌬" },
    { id: "ground", title: "Заземление", icon: "👁" },
    { id: "medit", title: "Медитация", icon: "🍃" }
  ];

  const tools = [
    { id: "smer", title: "Дневник СМЭР", icon: "📘" },
    { id: "dispute", title: "Второй взгляд", icon: "💡" },
    { id: "experiment", title: "Эксперимент", icon: "🧪" },
    { id: "tests", title: "Тесты", icon: "🧠" }
  ];

  return (
    // Главный контейнер с отступом снизу для TabBar и серым фоном
    <div className="min-h-screen bg-[#F2F2F7] pb-24 px-4 pt-4 font-sans text-[#1C1C1E]">

      {/* Header */}
      <div className="mb-5 mt-2">
        <h1 className="text-2xl font-bold tracking-tight">Лиза AI ✨</h1>
      </div>

      {/* Mood Block */}
      <div className="bg-white rounded-[24px] p-5 mb-4 shadow-sm">
        <h2 className="text-[17px] font-semibold mb-4">Привет! Как ты сейчас?</h2>

        <div className="flex justify-between items-center mb-5">
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
                  : "bg-gray-50 hover:bg-gray-100 grayscale-[0.3]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <button 
          onClick={handleAnalyze}
          className="w-full bg-[#007AFF] text-white rounded-[16px] p-4 flex justify-between items-center active:scale-[0.98] transition-transform"
        >
          <div className="text-left">
            <div className="text-[15px] font-semibold mb-0.5">Разобрать ситуацию</div>
            <div className="text-[13px] text-white/80 line-clamp-1">
              {moodDescription(selectedMood)}
            </div>
          </div>
          <span className="text-2xl ml-2">⚡️</span>
        </button>
      </div>

      {/* Quick help Block */}
      <div className="bg-white rounded-[24px] p-5 mb-4 shadow-sm">
        <h2 className="text-[17px] font-semibold mb-4">Быстрая помощь (2 мин)</h2>

        <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-hide">
          {quickTools.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
                if (t.id === "breath") onOpenTool("breath");
                else if (t.id === "ground") onOpenTool("ground");
                else onSendToChat(`Хочу выполнить технику: ${t.title}`);
              }}
              className="flex-shrink-0 flex flex-col items-center justify-center bg-[#F2F2F7] rounded-[16px] w-[90px] h-[90px] active:bg-gray-200 transition-colors"
            >
              <span className="text-2xl mb-2">{t.icon}</span>
              <span className="text-[12px] font-medium text-center leading-tight px-1">
                {t.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tools Block */}
      <div className="bg-white rounded-[24px] p-5 mb-4 shadow-sm">
        <h2 className="text-[17px] font-semibold mb-4">Инструментарий</h2>

        <div className="grid grid-cols-2 gap-3">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
                onSendToChat(`Запусти инструмент: ${t.title}`);
              }}
              className="flex flex-col items-start bg-[#F2F2F7] rounded-[16px] p-4 active:bg-gray-200 transition-colors"
            >
              <span className="text-2xl mb-2">{t.icon}</span>
              <span className="text-[14px] font-medium text-left">
                {t.title}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
