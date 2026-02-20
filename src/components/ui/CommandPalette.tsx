import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    X,
    Home,
    User,
    Briefcase,
    Layers,
    BookOpen,
    MessageSquare,
    Github,
    FileText,
    ArrowRight,
    Command
} from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CommandItem {
    id: string;
    name: string;
    icon: any;
    href: string;
    category: "Navigation" | "Social" | "Resources";
    shortcut?: string;
}

const commands: CommandItem[] = [
    { id: "home", name: "Home", icon: Home, href: "/", category: "Navigation" },
    { id: "about", name: "About", icon: User, href: "/about", category: "Navigation" },
    { id: "projects", name: "Projects", icon: Briefcase, href: "/projects", category: "Navigation" },
    { id: "services", name: "Services", icon: Layers, href: "/services", category: "Navigation" },
    { id: "blog", name: "Blog", icon: BookOpen, href: "/blog", category: "Navigation" },
    { id: "contact", name: "Contact", icon: MessageSquare, href: "/contact", category: "Navigation" },
    { id: "github", name: "GitHub Profile", icon: Github, href: "https://github.com/Yash-Raj20", category: "Social" },
    { id: "resume", name: "View Resume", icon: FileText, href: "/resume", category: "Resources" },
    // Adding more duplicates to test scroll if needed
    { id: "skills", name: "Technical Skills", icon: Layers, href: "/#skills", category: "Navigation" },
    { id: "experience", name: "Work History", icon: Briefcase, href: "/#experience", category: "Navigation" },
    { id: "guestbook", name: "Sign Guestbook", icon: MessageSquare, href: "/#guestbook", category: "Navigation" },
];

export function CommandPalette({ isMobileTrigger = false }: { isMobileTrigger?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const listRef = useRef<HTMLDivElement>(null);

    const filteredCommands = useMemo(() => {
        if (!query) return commands;
        return commands.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
    }, [query]);

    const handleOpen = useCallback(() => setIsOpen(true), []);
    const handleClose = useCallback(() => {
        setIsOpen(false);
        setQuery("");
        setSelectedIndex(0);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === "Escape") handleClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleClose]);

    // Track scroll for selection
    useEffect(() => {
        if (isOpen && listRef.current) {
            const activeItem = listRef.current.children[selectedIndex] as HTMLElement;
            if (activeItem) {
                activeItem.scrollIntoView({
                    block: "nearest",
                    behavior: "smooth"
                });
            }
        }
    }, [selectedIndex, isOpen]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleSelect = (item: CommandItem) => {
        if (item.href.startsWith("http")) {
            window.open(item.href, "_blank");
        } else {
            router.push(item.href);
        }
        handleClose();
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === "Enter") {
            if (filteredCommands.length > 0) {
                handleSelect(filteredCommands[selectedIndex]);
            }
        }
    };

    return (
        <>
            {/* Desktop Trigger (Pill with shortcut) */}
            <button
                onClick={handleOpen}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 transition-all group"
            >
                <Search className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-colors" />
                <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    <span className="bg-zinc-700/50 px-1 rounded">Ctrl</span>
                    <span>+</span>
                    <span className="bg-zinc-700/50 px-1 rounded">K</span>
                </div>
            </button>

            {/* Mobile/Tablet Trigger (Icon only) */}
            <button
                onClick={handleOpen}
                className="lg:hidden w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary transition-all group shadow-inner"
            >
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[1001] flex items-start justify-center pt-[10vh] sm:pt-[15vh] p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleClose}
                            className="fixed inset-0 bg-black/10 backdrop-blur-none pointer-events-auto cursor-pointer"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2rem] shadow-[0_0_100px_-20px_rgba(0,0,0,0.9)] overflow-hidden pointer-events-auto"
                        >
                            <div className="flex items-center px-6 border-b border-white/5 relative">
                                <Search className="w-5 h-5 text-zinc-500 mr-4" />
                                <input
                                    autoFocus
                                    placeholder="Search command or page..."
                                    className="flex-1 h-16 bg-transparent border-none outline-none text-white text-lg placeholder:text-zinc-600"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setSelectedIndex(0);
                                    }}
                                    onKeyDown={onKeyDown}
                                />
                                <div className="flex items-center gap-3">
                                    <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 border border-white/5 text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
                                        ESC
                                    </div>
                                    <button
                                        onClick={handleClose}
                                        className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-zinc-500" />
                                    </button>
                                </div>
                            </div>

                            <div
                                data-lenis-prevent
                                className="max-h-[50vh] overflow-y-auto p-4 pt-6 scroll-smooth overscroll-contain"
                            >
                                {filteredCommands.length > 0 ? (
                                    <div ref={listRef} className="space-y-1 relative">
                                        {filteredCommands.map((item, index) => {
                                            const Icon = item.icon;
                                            const isActive = selectedIndex === index;
                                            return (
                                                <button
                                                    key={item.id}
                                                    onClick={() => handleSelect(item)}
                                                    onMouseEnter={() => setSelectedIndex(index)}
                                                    className={cn(
                                                        "w-full relative flex items-center justify-between px-4 py-3 rounded-2xl transition-colors duration-200 group outline-none",
                                                        isActive ? "text-primary-foreground" : "text-zinc-400 hover:text-white"
                                                    )}
                                                >
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="command-highlight"
                                                            className="absolute inset-0 bg-primary rounded-2xl shadow-lg shadow-primary/30"
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 400,
                                                                damping: 30,
                                                                mass: 0.8
                                                            }}
                                                        />
                                                    )}

                                                    <div className="relative z-10 flex items-center gap-4">
                                                        <div className={cn(
                                                            "w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300",
                                                            isActive ? "bg-white/20" : "bg-zinc-800 group-hover:bg-zinc-700"
                                                        )}>
                                                            <Icon className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex flex-col items-start translate-y-[1px]">
                                                            <span className="font-bold text-sm tracking-tight">{item.name}</span>
                                                            <span className={cn(
                                                                "text-[10px] uppercase font-black tracking-widest opacity-60 mb-1",
                                                                isActive ? "text-primary-foreground" : "text-zinc-500"
                                                            )}>
                                                                {item.category}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="relative z-10 flex items-center gap-3">
                                                        {isActive && (
                                                            <motion.div
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                className="flex items-center gap-2 text-xs font-medium"
                                                            >
                                                                <span className="text-[10px] opacity-60">Navigate</span>
                                                                <ArrowRight className="w-4 h-4" />
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="py-12 text-center">
                                        <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                                            <Search className="w-8 h-8 text-zinc-600" />
                                        </div>
                                        <p className="text-zinc-500 font-medium">No results found for "{query}"</p>
                                    </div>
                                )}
                            </div>

                            <div className="px-6 py-4 bg-zinc-950/50 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <div className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/5 text-[10px] text-zinc-500">↑</div>
                                            <div className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/5 text-[10px] text-zinc-500">↓</div>
                                        </div>
                                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">Navigate</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="px-1.5 py-0.5 rounded bg-zinc-800 border border-white/5 text-[10px] text-zinc-500">ENTER</div>
                                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">Select</span>
                                    </div>
                                </div>
                                <div className="hidden sm:flex items-center gap-2">
                                    <span className="text-[10px] text-zinc-700 font-bold uppercase tracking-wider">Ratnesh Portfolio</span>
                                    <Command className="w-3 h-3 text-zinc-700" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
