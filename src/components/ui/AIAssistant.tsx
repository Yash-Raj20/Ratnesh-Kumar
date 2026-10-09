"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
    ArrowUpRight,
    RotateCcw,
    ExternalLink,
    Calendar,
    Layers,
    Github,
    Linkedin
} from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

interface ActionLink {
    text: string;
    href: string;
}

interface Message {
    id: string;
    role: "assistant" | "user";
    content: string;
    actionLinks?: ActionLink[];
    timestamp: Date;
}

const STORAGE_KEY = "rk_ai_chat_history";

const SUGGESTIONS = [
    { text: "Tell me about Vedix UI System", icon: Layers },
    { text: "What are your core skills?", icon: Brain },
    { text: "Show me your best 8 projects", icon: Rocket },
    { text: "How can I book a call?", icon: Calendar },
    { text: "Connect on LinkedIn & GitHub", icon: Linkedin },
];

export function AIAssistant() {
    const [isOpen, setIsOpen] = useState(false);
    
    // Persistent Messages with sessionStorage (preserves chat history until tab closes)
    const [messages, setMessages] = useState<Message[]>(() => {
        if (typeof window !== "undefined") {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    return parsed.map((m: any) => ({
                        ...m,
                        timestamp: new Date(m.timestamp)
                    }));
                } catch (e) {
                    console.error("Failed to parse chat history:", e);
                }
            }
        }
        return [
            {
                id: "initial-1",
                role: "assistant",
                content: "Hey there! 👋 I'm Ratnesh's AI Co-Pilot. Ask me anything about his 8 projects (including Vedix UI & HisGro), technical skills, work experience, or scheduling a call!",
                actionLinks: [
                    { text: "🎨 Vedix UI System", href: "https://vedix-ui.vercel.app/" },
                    { text: "🚀 8 Featured Projects", href: "/projects" },
                    { text: "📅 Book 15-min Call", href: "https://cal.com/ratnesh-kumar123/15min" },
                    { text: "💼 LinkedIn Profile", href: "https://www.linkedin.com/in/ratnesh-kumar20/" }
                ],
                timestamp: new Date()
            }
        ];
    });

    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Save messages to sessionStorage whenever updated
    useEffect(() => {
        if (typeof window !== "undefined") {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
        }
    }, [messages]);

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

    const clearChat = () => {
        const defaultMsg: Message[] = [
            {
                id: Date.now().toString(),
                role: "assistant",
                content: "Chat history cleared! 👋 How can I assist you with Ratnesh's portfolio today?",
                actionLinks: [
                    { text: "🚀 View Projects", href: "/projects" },
                    { text: "🎨 Vedix UI", href: "https://vedix-ui.vercel.app/" },
                    { text: "✉️ Contact", href: "/contact" }
                ],
                timestamp: new Date()
            }
        ];
        setMessages(defaultMsg);
        if (typeof window !== "undefined") {
            sessionStorage.removeItem(STORAGE_KEY);
        }
    };

    const generateResponse = (query: string): { content: string; actionLinks?: ActionLink[] } => {
        const q = query.toLowerCase();

        // 1. Vedix UI Project
        if (q.includes("vedix") || q.includes("component library") || q.includes("ui lab") || q.includes("ui kit") || q.includes("framework")) {
            return {
                content: "Ratnesh built **Vedix UI System** — an open-source React & Tailwind CSS component library designed for high-performance, responsive, and accessible web interfaces. It features production-grade components, copy-paste snippets, and micro-animations!",
                actionLinks: [
                    { text: "🎨 Visit Vedix UI Live Site", href: "https://vedix-ui.vercel.app/" },
                    { text: "🐙 View GitHub Profile", href: "https://github.com/Yash-Raj20" },
                    { text: "🚀 All 8 Projects", href: "/projects" }
                ]
            };
        }

        // 2. Book a Call / Schedule
        if (q.includes("book") || q.includes("call") || q.includes("schedule") || q.includes("meet") || q.includes("calendar")) {
            return {
                content: "Want to discuss a project, freelance collaboration, or full-time opportunity directly with Ratnesh? You can book a 15-minute discovery call directly on his calendar!",
                actionLinks: [
                    { text: "📅 Book 15-Min Call", href: "https://cal.com/ratnesh-kumar123/15min" },
                    { text: "✉️ Send Email Message", href: "/contact" }
                ]
            };
        }

        // 3. GitHub Profile
        if (q.includes("github") || q.includes("code") || q.includes("repository") || q.includes("repo") || q.includes("open source")) {
            return {
                content: "Ratnesh actively contributes to open source and maintains full-stack repositories on GitHub (@Yash-Raj20). Check out his code, stars, and contributions!",
                actionLinks: [
                    { text: "🐙 Ratnesh on GitHub", href: "https://github.com/Yash-Raj20" },
                    { text: "🎨 Vedix UI Repo", href: "https://vedix-ui.vercel.app/" }
                ]
            };
        }

        // 4. LinkedIn Profile
        if (q.includes("linkedin") || q.includes("social") || q.includes("network") || q.includes("profile")) {
            return {
                content: "Connect with Ratnesh on LinkedIn to explore his full professional background, recommendations, work history, and industry posts!",
                actionLinks: [
                    { text: "💼 Ratnesh on LinkedIn", href: "https://www.linkedin.com/in/ratnesh-kumar20/" },
                    { text: "🐙 GitHub Profile", href: "https://github.com/Yash-Raj20" }
                ]
            };
        }

        // 5. Skills & Tech Stack
        if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("react") || q.includes("next")) {
            const allSkills = [...portfolioData.skills.row1, ...portfolioData.skills.row2].map(s => s.name).join(", ");
            return {
                content: `Ratnesh is a Full Stack Developer skilled in ${allSkills}. His core strength lies in Next.js, React.js, TypeScript, Laravel, Node.js, and state-of-the-art UI/UX design systems.`,
                actionLinks: [
                    { text: "📄 View Digital Resume", href: "/resume" },
                    { text: "🎨 Vedix UI System", href: "https://vedix-ui.vercel.app/" },
                    { text: "🚀 Explore Projects", href: "/projects" }
                ]
            };
        }

        // 6. HisGro E-Commerce & ERP
        if (q.includes("hisgro")) {
            return {
                content: "Ratnesh developed **HisGro** — a production-grade hair wellness e-commerce platform & Admin ERP system using Next.js, React, TypeScript, Laravel, and MySQL. Features include AI Hair Assessment, payment gateways, stock ledger WMS, and automated logistics!",
                actionLinks: [
                    { text: "🛍️ HisGro Live Platform", href: "https://hisgro.com/" },
                    { text: "🚀 All 8 Projects", href: "/projects" }
                ]
            };
        }

        // 7. Projects Overview (8 Projects)
        if (q.includes("project") || q.includes("work") || q.includes("portfolio")) {
            return {
                content: "Ratnesh has engineered **8 high-impact projects**: HisGro Platform, HisGro Admin ERP & WMS, **Vedix UI System**, Janseva Portal, CareerPath AI, Heavenstay Villa Booking, FitIndia App, and his Portfolio Site.",
                actionLinks: [
                    { text: "🚀 Explore All 8 Projects", href: "/projects" },
                    { text: "🎨 Vedix UI Library", href: "https://vedix-ui.vercel.app/" }
                ]
            };
        }

        // 8. Experience & Career
        if (q.includes("experience") || q.includes("job") || q.includes("company") || q.includes("work history")) {
            const exp = portfolioData.experience.map(e => `${e.role} at ${e.company} (${e.period})`).join(". ");
            return {
                content: `Ratnesh has hands-on industry experience: ${exp}. He specializes in building scalable frontend architectures and backend REST APIs.`,
                actionLinks: [
                    { text: "💼 Experience Timeline", href: "/experience" },
                    { text: "📄 Download / View Resume", href: "/resume" }
                ]
            };
        }

        // 9. Contact / Hire / Email
        if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("reach") || q.includes("phone")) {
            return {
                content: "You can reach out to Ratnesh directly at **ratneshkumarstm987@gmail.com** or phone **(+91) 9835854042**. He is open for freelance projects, full-time engineering roles, and technical consultancies!",
                actionLinks: [
                    { text: "✉️ Contact Page", href: "/contact" },
                    { text: "📅 Schedule 15-min Call", href: "https://cal.com/ratnesh-kumar123/15min" },
                    { text: "💼 LinkedIn Profile", href: "https://www.linkedin.com/in/ratnesh-kumar20/" }
                ]
            };
        }

        // 10. Estimate / Pricing
        if (q.includes("estimate") || q.includes("cost") || q.includes("price") || q.includes("quote")) {
            return {
                content: "Planning a new web app or digital platform? Use Ratnesh's interactive Project Estimator to get an instant cost and timeline estimate tailored to your requirements!",
                actionLinks: [
                    { text: "⚡ Calculate Project Estimate", href: "/estimate" }
                ]
            };
        }

        // 11. About / Bio
        if (q.includes("who") || q.includes("about") || q.includes("ratnesh")) {
            return {
                content: portfolioData.about.description,
                actionLinks: [
                    { text: "✨ Read Full Story", href: "/about" },
                    { text: "📄 Digital Resume", href: "/resume" },
                    { text: "🐙 GitHub Profile", href: "https://github.com/Yash-Raj20" }
                ]
            };
        }

        // 12. Hello / Greeting
        if (q.includes("hello") || q.includes("hi") || q.includes("hey") || q.includes("greetings")) {
            return {
                content: "Hey there! How can I help you explore Ratnesh's portfolio today? Feel free to ask about his 8 projects, tech stack, or booking a call!",
                actionLinks: [
                    { text: "🚀 Explore Projects", href: "/projects" },
                    { text: "🎨 Vedix UI System", href: "https://vedix-ui.vercel.app/" },
                    { text: "✉️ Get in Touch", href: "/contact" }
                ]
            };
        }

        // 13. Services & Offerings
        if (q.includes("service") || q.includes("offer") || q.includes("build") || q.includes("design")) {
            return {
                content: "Ratnesh offers full-stack web development, responsive UI/UX design systems, motion & animation engineering (GSAP/Framer Motion), and API integration.",
                actionLinks: [
                    { text: "⚙️ Services Page", href: "/services" },
                    { text: "⚡ Project Estimator", href: "/estimate" }
                ]
            };
        }

        // 14. Education & Qualification
        if (q.includes("education") || q.includes("college") || q.includes("university") || q.includes("degree") || q.includes("btech") || q.includes("cgpa")) {
            return {
                content: "Ratnesh is pursuing B.Tech in Computer Engineering at Aditya Silver Oak Institute of Technology (CGPA: 8.62/10.0), with strong foundations in Web Architecture, Software Engineering, and Data Structures.",
                actionLinks: [
                    { text: "📄 View Resume", href: "/resume" },
                    { text: "💼 Experience", href: "/experience" }
                ]
            };
        }

        // 15. Location / Based
        if (q.includes("location") || q.includes("where") || q.includes("city") || q.includes("delhi") || q.includes("ahmedabad")) {
            return {
                content: "Ratnesh is based in **New Ashok Nagar, Delhi / Ahmedabad, India**. He is open to on-site, hybrid, and remote opportunities worldwide!",
                actionLinks: [
                    { text: "✉️ Contact Page", href: "/contact" },
                    { text: "📅 Schedule a Call", href: "https://cal.com/ratnesh-kumar123/15min" }
                ]
            };
        }

        // 16. Blog / Articles
        if (q.includes("blog") || q.includes("article") || q.includes("post") || q.includes("read")) {
            return {
                content: "Check out articles and tech insights written by Ratnesh on modern web development, performance optimization, and UI/UX design.",
                actionLinks: [
                    { text: "📖 Read Tech Blogs", href: "/blog" }
                ]
            };
        }

        // Unrecognized / Gibberish Fallback
        return {
            content: "I didn't quite catch that! 🤔 I can help you with details about Ratnesh's 8 projects, technical skills, work experience, Vedix UI, or booking a call. Feel free to try one of the options below!",
            actionLinks: [
                { text: "🚀 8 Featured Projects", href: "/projects" },
                { text: "🎨 Vedix UI System", href: "https://vedix-ui.vercel.app/" },
                { text: "📅 Book a 15-min Call", href: "https://cal.com/ratnesh-kumar123/15min" }
            ]
        };
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
            const res = generateResponse(content);
            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: res.content,
                actionLinks: res.actionLinks,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMsg]);
            setIsTyping(false);
        }, 900);
    }, []);

    return (
        <>
            {/* Floating Toggle Button - Hidden on mobile (since header has bot icon), shown on md+ */}
            <div className="fixed bottom-24 right-4 md:bottom-8 md:right-4 z-[70] hidden md:block">
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative group w-24 h-24  text-primary-foreground shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:scale-120 active:scale-110 transition-all duration-300 flex items-center justify-center p-3"
                >
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-15 pointer-events-none" />
                    <img src="/bot/bot1.png" alt="Bot" className="w-full h-full object-contain relative z-10" />
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
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[75]"
                        />

                        <motion.div
                            initial={isMobile ? { y: "100%", opacity: 0 } : { y: 40, scale: 0.95, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={isMobile ? { y: "100%", opacity: 0 } : { y: 40, scale: 0.95, opacity: 0 }}
                            transition={{ type: "spring", damping: 32, stiffness: 200 }}
                            className={cn(
                                "fixed z-[80]",
                                "inset-x-0 bottom-0 md:inset-auto md:bottom-10 md:right-8 md:w-[450px] lg:w-[550px] h-[90vh] md:h-[min(800px,90vh)]",
                                "bg-zinc-900/95 backdrop-blur-2xl rounded-t-[2.5rem] md:rounded-[2rem] border-t md:border border-white/10",
                                "shadow-[0_0_100px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
                            )}
                        >
                            {/* Header */}
                            <div className="shrink-0 px-6 py-3 bg-zinc-950/80 border-b border-white/5 flex items-center justify-between relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center relative shadow-lg p-2">
                                        <img src="/bot/bot1.png" alt="Bot" className="w-full h-full object-contain" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-sm font-black tracking-tight text-white uppercase italic">RK AI Assistant</h4>
                                            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
                                        </div>
                                        <div className="flex items-center gap-1.5 opacity-70">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                                            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Online & Persistent</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={clearChat}
                                        title="Clear Chat History"
                                        className="w-9 h-9 rounded-full bg-white/5 hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-colors text-zinc-400"
                                    >
                                        <RotateCcw className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                                    >
                                        <X className="w-5 h-5 text-zinc-400" />
                                    </button>
                                </div>
                            </div>

                            {/* Messages Container */}
                            <div
                                ref={scrollRef}
                                data-lenis-prevent
                                className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scrollbar-hide overscroll-contain"
                                style={{
                                    background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, transparent 40%), linear-gradient(120deg, #0f0e17 0%, #1a1b26 100%)"
                                }}
                            >
                                <AnimatePresence mode="popLayout">
                                    {messages.map((msg) => (
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
                                                    <div className="whitespace-pre-line">{msg.content}</div>
                                                    {msg.actionLinks && msg.actionLinks.length > 0 && (
                                                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/10">
                                                            {msg.actionLinks.map((link, idx) => {
                                                                const isExternal = link.href.startsWith("http");
                                                                if (isExternal) {
                                                                    return (
                                                                        <a
                                                                            key={idx}
                                                                            href={link.href}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/20 hover:bg-primary border border-primary/30 text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
                                                                        >
                                                                            <span>{link.text}</span>
                                                                            <ExternalLink className="w-3.5 h-3.5" />
                                                                        </a>
                                                                    );
                                                                }
                                                                return (
                                                                    <Link
                                                                        key={idx}
                                                                        href={link.href}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary/20 hover:bg-primary border border-primary/30 text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
                                                                    >
                                                                        <span>{link.text}</span>
                                                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    )}
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
                            <div className="shrink-0 px-6 py-3 space-y-3 bg-zinc-950/80 backdrop-blur-xl border-t border-white/5">
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
                                            placeholder="Ask about 8 projects, skills, Vedix UI, or booking a call..."
                                            className="w-full h-12 bg-zinc-900 border border-white/10 rounded-[2rem] pl-12 pr-14 text-sm font-medium text-white placeholder:text-zinc-600 outline-none focus:border-primary/50 transition-all shadow-2xl"
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
                                            className="absolute right-2 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg shadow-primary/20"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center gap-4 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">
                                    <span>Persistent Session</span>
                                    <div className="w-1 h-1 rounded-full bg-zinc-800" />
                                    <span>AI Co-Pilot</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
