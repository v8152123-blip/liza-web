import { useEffect, useState } from "react";
import "./Splash.css";

export default function Splash({ onFinish }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);

      setTimeout(() => {
        onFinish?.();
      }, 400); // fade out
    }, 8000); // как в SwiftUI

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className={`splash-root ${hidden ? "hide" : ""}`}>
      <div className="splash-container">
        <div className="title-row">
          <div className="title-text">
            <span className="liza">Лиза</span>
            <span className="ai">AI</span>
          </div>

          <div className="sparkles-box">
            <Sparkle
              delay={0}
              scale={1.2}
              offset={{ x: 8, y: -16 }}
            />

            <Sparkle
              delay={0.4}
              scale={0.6}
              offset={{ x: -3, y: 12 }}
            />

            <Sparkle
              delay={0.8}
              scale={0.8}
              offset={{ x: 24, y: 18 }}
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
        left: offset.x,
        top: offset.y
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