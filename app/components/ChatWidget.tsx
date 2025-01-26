"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <div className="w-[400px] h-[650px] bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200">
                    <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-5 text-white flex justify-between items-center rounded-t-xl">
                        <h1 className="text-lg font-bold">AI Assistant</h1>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <div className="h-full flex flex-col justify-center items-center p-8 text-center">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to AI Assistant</h2>
                        <p className="text-gray-600 mb-6">Chat with AI using text or voice options.</p>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition-all"
                        >
                            Start Chatting
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-5 bg-indigo-600 text-white rounded-full shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-2"
                >
                    <MessageCircle size={24} />
                    <span className="hidden md:inline">Chat</span>
                </button>
            )}
        </div>
    );
};
