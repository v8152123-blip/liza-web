import { useState, useEffect } from "react";
import "./GroundingTool.css";

export default function GroundingTool({ onFinish }) {
  const STEPS = [
    { id: "intro", num: null, title: "Заземление", text: "Давай вернемся в настоящий момент.\nДыши глубоко и следуй за подсказками." },
    { id: "sight", num: 5, title: "Зрение", text: "Назови 5 предметов, которые ты видишь прямо сейчас." },
    { id: "touch", num: 4, title: "Осязание", text: "4 вещи, которые ты чувствуешь кожей (одежда, стул, воздух)." },
    { id: "hearing", num: 3, title: "Слух", text: "3 звука, которые ты слышишь (часы, машины, дыхание)." },
    { id: "smell", num: 2, title: "Обоняние", text: "2 запаха, которые ты можешь уловить." },
    { id: "taste", num: 1, title: "Вкус", text: "1 вещь, которую можно попробовать или приятная мысль." },
    { id: "feedback", num: null, title: "Проверка", text: "Стало ли тебе спокойнее?" }
  ];

  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const anim = setTimeout(() => setPulse(true), 100);
    return () => clearTimeout(anim);
  }, []);

  const next = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const finishAndSend = () => {
    onFinish(
      "Лиза, я только что выполнил технику заземления 5‑4‑3‑2‑1. Помоги мне прийти в себя."
    );
  };

  return (
    <div className="grounding-container">
      {/* Header */}
      <div className="grounding-header">
        <button className="close-btn" onClick={() => onFinish(null)}>✕</button>
      </div>

      {/* Number */}
      {step.num !== null && (
        <div className="grounding-number">{step.num}</div>
      )}

      {/* Title */}
      <h2 className="grounding-title">{step.title}</h2>

      {/* Description */}
      <p className="grounding-text">{step.text}</p>

      {/* Pulse circle */}
      <div className={`pulse-wrapper ${pulse ? "pulse" : ""}`}>
        <div className="pulse-circle"></div>
        <div className="pulse-label">Дыши</div>
      </div>

      {/* Buttons */}
      {step.id !== "feedback" && (
        <button className="next-btn" onClick={next}>
          {step.id === "intro" ? "Начать" : "Далее"}
        </button>
      )}

      {step.id === "feedback" && (
        <div className="feedback-buttons">
          <button className="yes-btn" onClick={() => onFinish(null)}>
            Да, стало лучше
          </button>

          <button className="chat-btn" onClick={finishAndSend}>
            Побеседовать с Лизой ✨
          </button>
        </div>
      )}
    </div>
  );
}
