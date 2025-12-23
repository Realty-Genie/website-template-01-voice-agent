"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Minus } from "lucide-react";
import { cn } from "@/lib/utils";


// Mock conversation

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Array<{ id: string, role: 'user' | 'assistant', content: string }>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when messages change or chat opens
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { id: Date.now().toString(), role: 'user' as const, content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            const assistantId = (Date.now() + 1).toString();

            setMessages(prev => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

            if (reader) {
                let accumulatedContent = '';
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const text = decoder.decode(value);
                    accumulatedContent += text;
                    setMessages(prev =>
                        prev.map(msg => msg.id === assistantId ? { ...msg, content: accumulatedContent } : msg)
                    );
                }
            }
        } catch (error) {
            console.error('Chat error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end pointer-events-none">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="mb-4 w-[90vw] sm:w-[400px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                        style={{ height: "min(600px, 70vh)" }}
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary flex justify-between items-center relative overflow-hidden">
                            {/* Subtle background pattern for luxury feel */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150" />
                            </div>

                            <div className="flex items-center gap-3 relative z-10">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
                                    <Bot size={22} className="text-primary-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-primary-foreground font-medium  leading-none">Denise Mai AI</h3>
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        <span className="text-primary-foreground/80 text-[10px] uppercase tracking-wider font-medium">Active Now</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 relative z-10">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-black/10 rounded-full transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                                    title="Minimize"
                                >
                                    <Minus size={20} />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-black/10 rounded-full transition-colors text-primary-foreground/80 hover:text-primary-foreground"
                                    title="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-card to-background"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "flex flex-col max-w-[85%] space-y-2",
                                        msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all whitespace-pre-wrap",
                                            msg.role === "user"
                                                ? "bg-primary text-primary-foreground rounded-tr-none font-medium"
                                                : "bg-muted/50 text-foreground rounded-tl-none border border-border backdrop-blur-sm"
                                        )}
                                    >
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex flex-col max-w-[85%] space-y-2 mr-auto items-start">
                                    <div className="px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm transition-all bg-muted/50 text-foreground rounded-tl-none border border-border backdrop-blur-sm">
                                        <span className="flex gap-1">
                                            <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full animate-bounce" />
                                            <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full animate-bounce [animation-delay:0.2s]" />
                                            <span className="w-1.5 h-1.5 bg-foreground/20 rounded-full animate-bounce [animation-delay:0.4s]" />
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-border bg-card">
                            <form
                                onSubmit={handleSubmit}
                                className="relative flex items-center group"
                            >
                                <input
                                    type="text"
                                    placeholder="Ask about listings, neighborhood, or Denise's services..."
                                    className="w-full bg-muted/50 border border-border rounded-xl py-3.5 pl-4 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-muted-foreground/50"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="absolute right-2 p-2 bg-primary text-primary-foreground rounded-lg hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all disabled:opacity-30 disabled:hover:shadow-none disabled:active:scale-100"
                                >
                                    <Send size={18} />
                                </button>
                            </form>

                            <p className="text-center text-[10px] text-muted-foreground/40 mt-3 font-light">
                                Luxury service, powered by Denise Mai AI assistant.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FAB */}
            <motion.button
                layout
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all duration-500 pointer-events-auto relative",
                    isOpen
                        ? "bg-card text-foreground border border-border"
                        : "bg-primary text-primary-foreground"
                )}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="chat"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            <MessageCircle size={28} />
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-primary rounded-full" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default Chatbot;
