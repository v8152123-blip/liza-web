import { useEffect, useState } from "react";
import "./Splash.css";

export default function Splash({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        onFinish?.();
      }, 400); // fade-out
    }, 3000); // как в SwiftUI

    return () => clearTimeout(t);
  }, [onFinish]);

  return (
    <div className={`splash-root ${visible ? "show" : "hide"}`}>
      <div className="splash-container">

        <div className="title-row">
          <div className="title-text">
            <span className="liza">Лиза</span>
            <span className="ai">AI</span>
          </div>

          <div className="sparkles-box">
            <Sparkle
              delay={0.0}
              scale={1.2}
              offset={{ x: 10, y: -15 }}
            />

            <Sparkle
              delay={0.4}
              scale={0.6}
              offset={{ x: -5, y: 10 }}
            />

            <Sparkle
              delay={0.8}
              scale={0.8}
              offset={{ x: 25, y: 15 }}
            />
          </div>
        </div>

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
      className="sparkle-wrapper"
      style={{
        left: `${offset.x}px`,
        top: `${offset.y}px`
      }}
    >
      <div
        className="sparkle"
        style={{
          animationDelay: `${delay}s`,
          "--sparkle-scale": scale
        }}
      >
        ✨
      </div>
    </div>
  );
}
