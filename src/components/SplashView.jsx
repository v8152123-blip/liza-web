import React, { useEffect } from "react";

// 1:1 аналог SparkleView из Swift
const SparkleItem = ({ delay, scale, offsetX, offsetY }) => {
  return (
    <span
      className="absolute text-yellow-500 select-none liza-sparkle-pulse"
      style={{
        fontSize: "24px",
        transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
        animationDelay: `${delay}s`,
      }}
    >
      ✨
    </span>
  );
};

export default function SplashView({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 3000); // 3 секунды

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center select-none z-50">
      
      {/* Локальные стили, которые гарантируют градиент и пульсацию без участия Tailwind */}
      <style>{`
        .liza-gradient-text {
          background-image: linear-gradient(135deg, #007AFF 0%, #6680FF 100%) !important;
          background-clip: text !important;
          -webkit-background-clip: text !important;
          color: transparent !important;
          -webkit-text-fill-color: transparent !important;
          display: inline-block !important;
        }

        @keyframes sparkleAnimation {
          0%, 100% {
            opacity: 0.5;
            transform: var(--tw-transform) scale(0.85);
          }
          50% {
            opacity: 1;
            transform: var(--tw-transform) scale(1.15);
          }
        }

        .liza-sparkle-pulse {
          animation: sparkleAnimation 1.4s ease-in-out infinite;
        }
      `}</style>

      <div className="flex flex-col items-center justify-center space-y-3.5">
        
        {/* Главный блок заголовка (Лиза AI + Искры) */}
        <div className="flex items-center justify-center space-x-3 h-16">
          
          {/* Стягиваем буквы через -0.06em, чтобы Inter сел 1:1 как нативный SF Pro */}
          <div 
            className="flex items-center" 
            style={{ 
              fontFamily: "'Inter', sans-serif", 
              letterSpacing: "-0.06em",
              gap: "6px" /* Фиксированный зазор между Лиза и AI */
            }}
          >
            <span className="text-[48px] font-bold text-black leading-none">
              Лиза
            </span>
            
            {/* Текст AI с неубиваемым градиентом */}
            <span className="text-[48px] font-black leading-none liza-gradient-text">
              AI
            </span>
          </div>

          {/* Контейнер для SparkleView с точным переносом координат (размеры 40x40) */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <SparkleItem delay={0.0} scale={1.2} offsetX={10} offsetY={-15} />
            <SparkleItem delay={0.4} scale={0.6} offsetX={-5} offsetY={10} />
            <SparkleItem delay={0.8} scale={0.8} offsetX={25} offsetY={15} />
          </div>
          
        </div>

        {/* Подзаголовок (Твоя точка опоры...) */}
        <p 
          className="text-[18px] font-normal italic text-[#8E8E93]/80 text-center px-10 leading-relaxed max-w-sm"
          style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "-0.02em" }}
        >
          Твоя точка опоры всегда под рукой.
        </p>

      </div>

    </div>
  );
}