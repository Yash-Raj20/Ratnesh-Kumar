"use client";

import { motion, LayoutGroup } from "framer-motion";
import {
    Box,
    Settings,
    FileText,
    LayoutDashboard,
    MousePointer2,
    FormInput,
    Layers,
    LayoutGrid,
    Bell,
    Heart,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
    activeCategory: string;
    setActiveCategory: (category: string) => void;
}

export const CATEGORIES = [
    { name: "All Components", id: "all", icon: LayoutDashboard },
    { name: "Buttons", id: "buttons", icon: MousePointer2 },
    { name: "Inputs", id: "inputs", icon: FormInput },
    { name: "Cards", id: "cards", icon: LayoutGrid },
    { name: "Navigation", id: "nav", icon: Layers },
    { name: "Surface", id: "surface", icon: Box },
    { name: "Forms", id: "forms", icon: FileText },
    { name: "Feedback", id: "feedback", icon: Bell },
    { name: "Typography", id: "typo", icon: Zap },
];

export default function Sidebar({ activeCategory, setActiveCategory }: SidebarProps) {
    return (
        <aside className="w-[260px] hidden lg:flex flex-col bg-[#000000] border-r border-white/5 shrink-0 px-4 py-8 shadow-[20px_0_60px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3.5 mb-14">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e11d48] to-[#be123c] flex items-center justify-center text-white shadow-[0_0_30px_rgba(225,29,72,0.25)]">
                    <Box size={22} strokeWidth={2.5} />
                </div>
                <div>
                    <h1 className="text-base font-[900] tracking-tight leading-none text-white">UI Lab</h1>
                    <p className="text-[9px] uppercase tracking-[0.2em] font-black text-zinc-700 mt-1">SOPHISTICATED LIBRARY</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto scrollbar-none" data-lenis-prevent>
                <LayoutGroup id="sidebar">
                    {CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat.name;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.name)}
                                className={cn(
                                    "w-full flex items-center gap-3.5 px-4 py-3.5 rounded-lg text-[12px] font-bold transition-all duration-300 relative",
                                    isActive ? "text-white" : "text-zinc-600 hover:text-zinc-300"
                                )}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="active-bg"
                                        className="absolute inset-0 bg-[#e11d48]/10 border border-[#e11d48]/20 rounded-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex items-center gap-3.5 font-sans">
                                    <cat.icon size={16} strokeWidth={isActive ? 2.5 : 2} className={cn(isActive ? "text-[#e11d48]" : "text-inherit")} />
                                    {cat.name}
                                </span>
                            </button>
                        );
                    })}
                </LayoutGroup>

                <div className="pt-10 mb-4">
                    <div className="text-[12px] font-black uppercase tracking-[0.2em] text-zinc-800 mb-6 px-4">SYSTEM</div>
                    <button className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[12px] font-bold text-zinc-600 hover:text-white transition-all">
                        <Settings size={16} /> <span className="font-sans">Settings</span>
                    </button>
                    <button className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[12px] font-bold text-zinc-600 hover:text-white transition-all">
                        <FileText size={16} /> <span className="font-sans">Documentation</span>
                    </button>
                </div>
            </nav>
        </aside>
    );
}
