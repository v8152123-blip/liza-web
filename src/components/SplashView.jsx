import { useEffect, useState } from "react";
import "./Splash.css";

export default function Splash({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onFinish?.(), 400); // fade-out 0.4s
    }, 8000); // длительность заставки

    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className={`splash-root ${visible ? "show" : "hide"}`}>
      <div className="splash-container">

        {/* Заголовок */}
        <div className="title-row">
          <div className="title-text">
            <span className="liza">Лиза</span>
            <span className="ai">AI</span>
          </div>

          {/* Одна ✨ */}
          <div className="sparkles-box">
            <Sparkle delay={0.0} scale={1.2} offset={{ x: 10, y: -15 }} />
          </div>
        </div>

        {/* Подзаголовок */}
        <div className="subtitle">
          Твоя точка опоры всегда под рукой.
        </div>

      </div>
    </div>
  );
}

function Sparkle({ delay, scale, offset }) {
  return (
    <div
      className="sparkle"
      style={{
        animationDelay: `${delay}s`,
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`
      }}
    >
      ✨
    </div>
  );
}
