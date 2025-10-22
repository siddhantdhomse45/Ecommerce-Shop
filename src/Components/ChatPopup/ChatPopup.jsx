import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatPopup.css";

const ChatPopup = () => {
  const [showChat, setShowChat] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m your assistant. Ask me anything about Shopper platform!",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const speakText = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    const userMsg = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");

    const chatMessages = [
      {
        role: "system",
        content: "You are an expert assistant that ONLY answers questions about the Shopper platform.",
      },
      ...messages.map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: userInput },
    ];

    try {
      const res = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: chatMessages,
        },
        {
          headers: {
            Authorization: "Bearer YOUR_OPENAI_API_KEY",
            "Content-Type": "application/json",
          },
        }
      );

      const botReply = res.data.choices[0].message.content;
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      speakText(botReply);
    } catch (error) {
      console.error("OpenAI API error:", error);
      const errMsg = "Sorry, I couldn't fetch an answer right now.";
      setMessages((prev) => [...prev, { sender: "bot", text: errMsg }]);
      speakText(errMsg);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {showChat ? (
        <div className={`chat-ai ${minimized ? "minimized" : ""}`}>
          <div className="chat-header">
            <span>SHOPPER ASSISTANT</span>
            <div className="chat-controls">
              <button onClick={() => setMinimized(!minimized)}>
                {minimized ? "🔼" : "🔽"}
              </button>
              <button onClick={() => setShowChat(false)}>❌</button>
            </div>
          </div>

          {!minimized && (
            <>
              <div className="chat-body">
                {messages.map((msg, i) => (
                  <div key={i} className={`chat-message ${msg.sender}`}>
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="chat-footer">
                <textarea
                  rows={2}
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about shopper.com..."
                />
                <button onClick={sendMessage}>Send</button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button className="chat-icon" onClick={() => setShowChat(true)}>
          💬
        </button>
      )}
    </>
  );
};

export default ChatPopup;
