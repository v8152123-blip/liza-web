import HomeView from "./components/HomeView";
import ChatView from "./components/ChatView";
import { useState } from "react";

export default function App() {
  const [messages, setMessages] = useState([]);

  const sendToChat = (text) => {
    setMessages((prev) => [...prev, { text, isUser: true }]);
  };

  return (
    <>
      <HomeView onSendToChat={sendToChat} />
      <ChatView messages={messages} />
    </>
  );
}
