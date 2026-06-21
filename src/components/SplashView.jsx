import React, { useEffect } from "react";

// 1:1 аналог SparkleView из Swift
const SparkleItem = ({ delay, scale, offsetX, offsetY }) => {
  return (
    <span
      className="absolute text-yellow-500 select-none animate-pulse-custom"
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
      
      <div className="flex flex-col items-center justify-center space-y-3.5">
        
        {/* Главный блок заголовка (Лиза AI + Искры) */}
        <div className="flex items-center justify-center space-x-3 h-16">
          
          {/* letterSpacing: "-0.05em" склеивает буквы в плотное, дорогое нативное начертание */}
          <div 
            className="flex items-center space-x-2" 
            style={{ fontFamily: '"SF Pro Display", sans-serif', letterSpacing: "-0.05em" }}
          >
            <span className="text-[48px] font-bold text-black">
              Лиза
            </span>
            {/* Текст AI с точным градиентом из Swift-кода */}
            <span className="text-[48px] font-black bg-gradient-to-br from-[#007AFF] to-[#6680FF] bg-clip-text text-transparent">
              AI
            </span>
          </div>

          {/* Контейнер для SparkleView с точным переносом координат (размеры 40x40) */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            {/* SparkleView(delay: 0.0, scale: 1.2, offset: CGSize(width: 10, height: -15)) */}
            <SparkleItem delay={0.0} scale={1.2} offsetX={10} offsetY={-15} />
            
            {/* SparkleView(delay: 0.4, scale: 0.6, offset: CGSize(width: -5, height: 10)) */}
            <SparkleItem delay={0.4} scale={0.6} offsetX={-5} offsetY={10} />
            
            {/* SparkleView(delay: 0.8, scale: 0.8, offset: CGSize(width: 25, height: 15)) */}
            <SparkleItem delay={0.8} scale={0.8} offsetX={25} offsetY={15} />
          </div>
          
        </div>

        {/* Подзаголовок (Твоя точка опоры...) */}
        <p 
          className="text-[18px] font-normal italic text-[#8E8E93]/80 text-center px-10 leading-relaxed max-w-sm"
          style={{ letterSpacing: "-0.02em" }}
        >
          Твоя точка опоры всегда под рукой.
        </p>

      </div>

    </div>
  );
}