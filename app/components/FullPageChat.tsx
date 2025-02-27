"use client";

import React, { useState } from "react";
import { MessageSquare, Video, ArrowLeft, Send } from "lucide-react";

const FullPageChat: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<"text" | "avatar" | null>(
    null
  );
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages([...messages, { text, isUser: true }]);
    setMessage("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.reply, isUser: false }]);
    } catch (error) {
      return setMessages((prev) => [
        ...prev,
        { text: "Failed to send message. Check API key", isUser: false },
      ]);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 py-12">
      <div className="w-[700px] h-[750px] bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-700 p-6 text-white flex justify-between items-center">
          {selectedMode ? (
            <button
              onClick={() => setSelectedMode(null)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors flex items-center gap-2"
            >
              <ArrowLeft size={24} />
              <span>Back</span>
            </button>
          ) : (
            <h1 className="text-2xl font-bold">AI Assistant</h1>
          )}
        </div>

        <div className="h-[calc(750px-80px)] p-6">
          {!selectedMode ? (
            <div className="h-full flex flex-col items-center justify-center gap-8">
              <h2 className="text-3xl font-bold text-gray-800 text-center">
                Choose Your Interaction Mode
              </h2>
              <div className="flex gap-8">
                <button
                  onClick={() => setSelectedMode("text")}
                  className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all shadow-lg"
                >
                  <div className="p-5 bg-blue-200 rounded-full">
                    <MessageSquare size={40} className="text-blue-600" />
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    Text Chat
                  </span>
                </button>
                <button
                  onClick={() => setSelectedMode("avatar")}
                  className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-all shadow-lg"
                >
                  <div className="p-5 bg-blue-200 rounded-full">
                    <Video size={40} className="text-blue-600" />
                  </div>
                  <span className="text-lg font-medium text-gray-700">
                    Video & Voice
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col h-full space-y-6">
              <div className="flex-1 overflow-y-auto space-y-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        msg.isUser
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t p-6">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-3 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage(message)
                    }
                  />
                  <button
                    onClick={() => handleSendMessage(message)}
                    className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    <Send size={24} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FullPageChat;
