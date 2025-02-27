"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  X,
  MessageSquare,
  Video,
  ArrowLeft,
  Send,
} from "lucide-react";

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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
      setMessages((prev) => [
        ...prev,
        { text: "Failed to send message. Check API key", isUser: false },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-[400px] h-[650px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-4 text-white flex justify-between items-center">
            {selectedMode && (
              <button
                onClick={() => setSelectedMode(null)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors flex items-center gap-1"
              >
                <ArrowLeft size={20} />
                <span className="text-sm">Back</span>
              </button>
            )}
            <h1 className="text-lg font-bold">AI Assistant</h1>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {!selectedMode ? (
              <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Welcome to AI Assistant
                </h2>
                <p className="text-gray-600">
                  Chat with AI using text or voice options.
                </p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={() => setSelectedMode("text")}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all shadow"
                  >
                    <MessageSquare size={30} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Text Chat
                    </span>
                  </button>
                  <button
                    onClick={() => setSelectedMode("avatar")}
                    className="flex flex-col items-center gap-2 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all shadow"
                  >
                    <Video size={30} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Video & Voice
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-2">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        msg.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-2 rounded-lg ${
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
                <div className="border-t p-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage(message)
                      }
                    />
                    <button
                      onClick={() => handleSendMessage(message)}
                      className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-2"
        >
          <MessageCircle size={24} />
          <span className="hidden md:inline">Chat</span>
        </button>
      )}
    </div>
  );
};
