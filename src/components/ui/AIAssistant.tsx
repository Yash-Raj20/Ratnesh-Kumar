"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Send,
    Bot,
    Sparkles,
    User,
    ArrowRight,
    Search,
    Brain,
    Rocket,
    MessageCircle,
    Mic,
    Terminal,
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "assistant" | "user";
    content: string;
    timestamp: Date;
}

const SUGGESTIONS = [
    { text: "What are your core skills?", icon: Brain },
    { text: "Show me your best projects", icon: Rocket },
    { text: "Tell me about your work experience", icon: ArrowRight },
    { text: "How can I contact you?", icon: MessageCircle },
];

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "initial-1",
            role: "assistant",
            content: "Hi! I'm Ratnesh's AI Assistant. Ask me anything about his skills, projects, or experience!",
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [isMobile, setIsMobile] = useState(false);

    // Detect screen size for specialized animations
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Listen for external triggers (from Header)
    useEffect(() => {
        const handleExternalToggle = () => setIsOpen(prev => !prev);
        window.addEventListener('toggle-ai-assistant', handleExternalToggle);
        return () => window.removeEventListener('toggle-ai-assistant', handleExternalToggle);
    }, []);

    // Scroll to bottom whenever messages or typing state changes
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [messages, isTyping]);

    // ... generateResponse remains same ...
    const generateResponse = (query: string): string => {
        const q = query.toLowerCase();

        if (q.includes("skill") || q.includes("tech") || q.includes("stack")) {
            const allSkills = [...portfolioData.skills.row1, ...portfolioData.skills.row2].map(s => s.name).join(", ");
            return `Ratnesh is proficient in ${allSkills}. His core expertise is in React.js and Next.js.`;
        }
        if (q.includes("project") || q.includes("work")) {
            const projects = portfolioData.projects.map(p => p.title).join(", ");
            return `Some of his key projects include ${projects}. You can view the full list in the Projects section!`;
        }
        if (q.includes("experience") || q.includes("job")) {
            const exp = portfolioData.experience.map(e => `${e.role} at ${e.company} (${e.period})`).join(". ");
            return `He has experience as a ${exp}.`;
        }
        if (q.includes("contact") || q.includes("email") || q.includes("hire")) {
            return "You can reach out to Ratnesh via the Contact page or email him at hello@ratnesh.dev.";
        }
        if (q.includes("who") || q.includes("about")) {
            return portfolioData.about.description;
        }
        if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
            return "Hello! How can I help you learn more about Ratnesh today?";
        }

        return "I'm not sure about that, but I'm sure Ratnesh would love to chat! Check out his contact page or social links.";
    };

    const handleSend = useCallback((text: string) => {
        const content = text.trim();
        if (!content) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: generateResponse(content),
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMsg]);
            setIsTyping(false);
        }, 1200);
    }, []);

    return (
        <>
            {/* Floating Toggle Button - Hidden on mobile, shown on md+ (tablet/large) */}
            <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[70] hidden md:block">
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative group p-3 rounded-full bg-primary text-primary-foreground shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-110 active:scale-95 transition-all duration-300"
                >
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20 pointer-events-none" />
                    <Bot className="w-8 h-8" />
                    <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 whitespace-nowrap pointer-events-none shadow-xl">
                        AI Assistant
                    </span>
                </button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[75]"
                        />

                        <motion.div
                            initial={isMobile ? { y: "100%", opacity: 0 } : { y: 40, scale: 0.95, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={isMobile ? { y: "100%", opacity: 0 } : { y: 40, scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 32, stiffness: 200 }}
                            className={cn(
                                "fixed z-[80]",
                                // Mobile: Bottom sheet style | MD+: Floating card style
                                "inset-x-0 bottom-0 md:inset-auto md:bottom-10 md:right-8 md:w-[450px] lg:w-[550px] h-[90vh] md:h-[min(800px,90vh)]",
                                "bg-zinc-900/95 backdrop-blur-2xl rounded-t-[2.5rem] md:rounded-[2rem] border-t md:border border-white/10",
                                "shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
                            )}
                        >
                            {/* Header */}
                            <div className="shrink-0 p-6 bg-zinc-950/50 border-b border-white/5 flex items-center justify-between relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center relative shadow-lg shadow-primary/5">
                                        <Bot className="w-6 h-6 text-primary" />
                                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-zinc-950 shadow-lg" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-base font-black tracking-tight text-white uppercase italic">RK AI Assistant</h4>
                                            <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                                        </div>
                                        <div className="flex items-center gap-1.5 opacity-60">
                                            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Active Now</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5 text-zinc-400" />
                                </button>
                            </div>

                            {/* Messages Container */}
                            <div
                                ref={scrollRef}
                                data-lenis-prevent
                                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide overscroll-contain"
                            >
                                <AnimatePresence mode="popLayout">
                                    {messages.map((msg, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            key={msg.id}
                                            className={cn(
                                                "flex w-full group",
                                                msg.role === 'user' ? 'justify-end' : 'justify-start'
                                            )}
                                        >
                                            <div className={cn(
                                                "flex flex-col max-w-[85%] gap-1.5",
                                                msg.role === 'user' ? 'items-end' : 'items-start'
                                            )}>
                                                <div className={cn(
                                                    "relative px-5 py-3.5 rounded-3xl text-sm leading-relaxed shadow-xl",
                                                    msg.role === 'user'
                                                        ? 'bg-primary text-primary-foreground rounded-tr-none border border-primary/20'
                                                        : 'bg-zinc-800/80 text-zinc-200 rounded-tl-none border border-white/5 backdrop-blur-md'
                                                )}>
                                                    {msg.content}
                                                </div>
                                                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity px-1">
                                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex justify-start"
                                    >
                                        <div className="bg-zinc-800/50 backdrop-blur-md border border-white/5 p-4 rounded-3xl rounded-tl-none flex gap-1.5 shadow-lg">
                                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Footer Area with Input and Suggestions */}
                            <div className="shrink-0 p-6 space-y-4 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5">
                                {/* Suggestion Chips */}
                                <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 mask-linear-fade">
                                    {SUGGESTIONS.map((suggestion, idx) => {
                                        const Icon = suggestion.icon;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleSend(suggestion.text)}
                                                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-all text-[11px] font-bold text-zinc-300 hover:text-white uppercase tracking-tight whitespace-nowrap group"
                                            >
                                                <Icon className="w-3.5 h-3.5 text-primary group-hover:scale-110 transition-transform" />
                                                <span>{suggestion.text}</span>
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Input Bar */}
                                <div className="relative group/input">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-[2rem] blur opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                    <div className="relative flex items-center">
                                        <div className="absolute left-4 text-zinc-500">
                                            <Terminal className="w-4 h-4" />
                                        </div>
                                        <input
                                            ref={inputRef}
                                            placeholder="Type your question..."
                                            className="w-full h-14 bg-zinc-900 border border-white/10 rounded-[2rem] pl-12 pr-14 text-sm font-medium text-white placeholder:text-zinc-600 outline-none focus:border-primary/50 transition-all shadow-2xl"
                                            value={input}
                                            onChange={(e) => setInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleSend(input);
                                                }
                                            }}
                                        />
                                        <button
                                            onClick={() => handleSend(input)}
                                            disabled={!input.trim() || isTyping}
                                            className="absolute right-2 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg shadow-primary/20"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                                    <span>Encrypted Chat</span>
                                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                    <span>AI Insights</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
