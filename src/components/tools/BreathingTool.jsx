import { useEffect, useState } from "react";
import "./BreathingTool.css";

export default function BreathingTool({ onFinish }) {
  const PHASES = [
    { id: "inhale", text: "Вдох..." },
    { id: "hold1", text: "Задержка..." },
    { id: "exhale", text: "Выдох..." },
    { id: "hold2", text: "Задержка..." }
  ];

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseTime, setPhaseTime] = useState(4);
  const [totalTime, setTotalTime] = useState(60);
  const [isFinished, setFinished] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalTime((t) => t - 1);
      setPhaseTime((t) => {
        if (t > 1) return t - 1;
        setPhaseIndex((i) => (i + 1) % PHASES.length);
        return 4;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (totalTime <= 0) {
      setFinished(true);
      setTimeout(() => {
        onFinish(
          "Лиза, я только что выполнил технику квадратного дыхания. Помоги мне прийти в себя."
        );
      }, 800);
    }
  }, [totalTime]);

  if (isFinished) {
    return (
      <div className="breath-finish">
        <div className="finish-icon">✔️</div>
        <h2>Отлично!</h2>
        <p>Минута осознанности завершена. Вы вернули себя в настоящий момент.</p>

        <button className="finish-btn" onClick={() => onFinish(null)}>
          Готово
        </button>
      </div>
    );
  }

  return (
    <div className="breath-container">
      <div className="breath-header">
        <div className="timer">{totalTime}с</div>
      </div>

      <div className="breath-text">{PHASES[phaseIndex].text}</div>

      <div
        className={`breath-flower ${
          PHASES[phaseIndex].id === "inhale" ? "expand" : "shrink"
        }`}
      >
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{ transform: `rotate(${i * 30}deg)` }}
          />
        ))}
      </div>
    </div>
  );
}
