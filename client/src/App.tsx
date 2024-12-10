import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log("Received Message: ", message.data);
      setMessages((m) => [...m, message.data]);
    };

    return () => socket.close();
  }, []);

  const handleSendMessage = () => {
    // Prevent sending empty messages
    if (input.trim() === '') return;

    socket?.send(input);
    setInput("");
  }

  return (
    <>
      <h1 className="text-3xl font-bold">Dolco Chat</h1>
      {socket ? (
        <ul>
          {messages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      <input
        type="text"
        value={input}
        onKeyDown={(e) => {
          if(e.key === 'Enter')
            handleSendMessage(); 
        }} // Handle the Enter key press
        placeholder="Type your message"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={handleSendMessage}
        className="mt-2 ml-2 "
      >
        Send
      </button>
    </>
  );
}
export default App;
