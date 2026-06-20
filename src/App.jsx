import { useState } from "react";
import HomeView from "./components/HomeView";
import ChatView from "./components/ChatView";
import BreathingTool from "./components/tools/BreathingTool";
import GroundingTool from "./components/tools/GroundingTool";


export default function App() {
  const [messages, setMessages] = useState([]);
  const [activeTool, setActiveTool] = useState(null);

  // Отправка сообщения в Telegram-чат
  const sendToChat = (text) => {
    if (!text) return;
    Telegram.WebApp.sendData(text);
  };

  return (
    <>
      {/* Если открыт инструмент — показываем его */}
      {activeTool === "breath" && (
        <BreathingTool
          onFinish={(msg) => {
            if (msg) sendToChat(msg);
            setActiveTool(null);
          }}
        />
      )}

      
{activeTool === "ground" && (
  <GroundingTool
    onFinish={(msg) => {
      if (msg) sendToChat(msg);
      setActiveTool(null);
    }}
  />
)}


      {/* Если инструмент НЕ открыт — показываем обычный интерфейс */}
      {activeTool === null && (
        <>
          <HomeView
            onSendToChat={sendToChat}
            onOpenTool={(id) => setActiveTool(id)}
          />

          <ChatView messages={messages} />
        </>
      )}
    </>
  );
}
