import { useState } from "react";
import "./HomeView.css";

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
    <div className="home-container">

      {/* Header */}
      <div className="header">
        <h1 className="logo">Лиза AI ✨</h1>
      </div>

      {/* Mood */}
      <div className="block">
        <h2>Привет! Как ты сейчас?</h2>

        <div className="mood-row">
          {moods.map((m) => (
            <button
              key={m}
              className={`mood-btn ${selectedMood === m ? "active" : ""}`}
              onClick={() => setSelectedMood(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <button className="analyze-btn" onClick={handleAnalyze}>
          <div>
            <div className="analyze-title">Разобрать ситуацию</div>
            <div className="analyze-sub">{moodDescription(selectedMood)}</div>
          </div>
          <span className="bolt">⚡️</span>
        </button>
      </div>

      {/* Quick help */}
      <div className="block">
        <h2>Быстрая помощь (2 мин)</h2>

  <div className="quick-row">
  {quickTools.map((t) => (
    <button
      key={t.id}
      className="quick-item"
      onClick={() => {
        if (t.id === "breath") {
          onOpenTool("breath");   // дыхание
        } else if (t.id === "ground") {
          onOpenTool("ground");   // заземление
        } else {
          onSendToChat(`Хочу выполнить технику: ${t.title}`);
        }
      }}
    >
      <span className="quick-icon">{t.icon}</span>
      <span>{t.title}</span>
    </button>
  ))}
</div>



      {/* Tools */}
      <div className="block">
        <h2>Инструментарий</h2>

        <div className="tools-grid">
          {tools.map((t) => (
            <button
              key={t.id}
              className="tool-card"
              onClick={() => onSendToChat(`Запусти инструмент: ${t.title}`)}
            >
              <span className="tool-icon">{t.icon}</span>
              <span className="tool-title">{t.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
