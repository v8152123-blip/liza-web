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

  // Цвета и иконки строго из ContentView.swift (SF Symbols заменены на аккуратный текст/emoji)
  const quickTools = [
    { id: "breath", title: "Дыхание", icon: "🌬", color: "text-[#007AFF] bg-[#007AFF]/10" },
    { id: "ground", title: "Заземление", icon: "👁", color: "text-[#FF9500] bg-[#FF9500]/10" },
    { id: "medit", title: "Медитация", icon: "🍃", color: "text-[#34C759] bg-[#34C759]/10" }
  ];

  const tools = [
    { id: "smer", title: "Дневник СМЭР", icon: "📘", color: "text-[#AF52DE] bg-[#AF52DE]/10" },
    { id: "dispute", title: "Второй взгляд", icon: "💡", color: "text-[#FFCC00] bg-[#FFCC00]/10" },
    { id: "experiment", title: "Эксперимент", icon: "🧪", color: "text-[#FF3B30] bg-[#FF3B30]/10" },
    { id: "tests", title: "Тесты", icon: "🧠", color: "text-[#5AC8FA] bg-[#5AC8FA]/10" }
  ];

  return (
    // Нативный системный фон iOS (.systemGroupedBackground)
    <div className="min-h-screen bg-[#F2F2F7] pb-24 font-sans text-black select-none">
      
      {/* Большой нативный заголовок а-ля NavigationTitle (.large) */}
      <div className="pt-7 pb-2 px-4">
        <h1 className="text-[34px] font-bold tracking-tight text-black">Лиза AI ✨</h1>
      </div>

      {/* Нативная iOS Секция (Форма настроения) */}
      <div className="mx-4 mb-6 bg-white rounded-[20px] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <h2 className="text-[17px] font-semibold tracking-tight text-black mb-4">Привет! Как ты сейчас?</h2>

        {/* Ряд эмодзи */}
        <div className="flex justify-between items-center mb-5 px-1">
          {moods.map((m) => (
            <button
              key={m}
              onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.selectionChanged();
                setSelectedMood(m);
              }}
              className={`text-3xl w-12 h-12 flex items-center justify-center rounded-full transition-all duration-150 ${
                selectedMood === m 
                  ? "bg-[#EAF2FF] scale-110" 
                  : "bg-[#F2F2F7] active:bg-[#E5E5EA]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Кнопка "Разобрать ситуацию" */}
        <button 
          onClick={handleAnalyze}
          className="w-full bg-[#007AFF] active:opacity-85 text-white rounded-[16px] p-3.5 flex justify-between items-center transition-opacity"
        >
          <div className="text-left pl-1">
            <div className="text-[16px] font-semibold">Разобрать ситуацию</div>
            <div className="text-[13px] text-white/75 font-normal line-clamp-1">
              {moodDescription(selectedMood)}
            </div>
          </div>
          <span className="text-xl pr-1">⚡️</span>
        </button>
      </div>

      {/* Секция: Быстрая помощь (1:1 аналог твоей ScrollView(.horizontal)) */}
      <div className="mb-6">
        <h2 className="text-[17px] font-semibold tracking-tight text-black mx-4 mb-3">Быстрая помощь (2 мин)</h2>
        
        {/* Горизонтальный контейнер скролла без полосы прокрутки */}
        <div className="flex space-x-3 overflow-x-auto px-4 pb-1 scrollbar-none snap-x">
          {quickTools.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
                if (t.id === "breath" || t.id === "ground") onOpenTool(t.id);
                else onSendToChat(`Хочу выполнить технику: ${t.title}`);
              }}
              // Фиксированная ширина w-[105px] и высота h-[110px] — строго как в твоем QuickHelpItem
              className="flex-shrink-0 w-[105px] h-[110px] snap-center flex flex-col items-center justify-center bg-white rounded-[20px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] active:bg-[#F2F2F7] transition-colors"
            >
              {/* Круглая подложка под иконку с 15% прозрачности цвета */}
              <div className={`w-[54px] h-[54px] rounded-full flex items-center justify-center text-2xl mb-2 ${t.color}`}>
                {t.icon}
              </div>
              <span className="text-[13px] font-bold text-[#1C1C1E] text-center px-1 line-clamp-1">
                {t.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Секция: Инструментарий (1:1 аналог твоего LazyVGrid в Swift) */}
      <div className="mx-4">
        <h2 className="text-[17px] font-semibold tracking-tight text-black mb-3">Инструментарий</h2>

        {/* Ровная двухколоночная нативная сетка */}
        <div className="grid grid-cols-2 gap-3">
          {tools.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
                onSendToChat(`Запусти инструмент: ${t.title}`);
              }}
              // Карточка инструмента высотой ровно 95px как в твоем ToolItem
              className="flex flex-col items-center justify-center bg-white rounded-[20px] p-3 h-[95px] shadow-[0_1px_3px_rgba(0,0,0,0.04)] active:bg-[#F2F2F7] transition-colors"
            >
              {/* Скругленный квадрат под иконку инструмента */}
              <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center text-xl mb-2 ${t.color}`}>
                {t.icon}
              </div>
              <span className="text-[14px] font-bold text-[#1C1C1E] text-center leading-tight">
                {t.title}
              </span>
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}

