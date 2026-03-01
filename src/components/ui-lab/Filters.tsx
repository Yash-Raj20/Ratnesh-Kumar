"use client";

import { motion, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

interface FiltersProps {
    activePill: string;
    setActivePill: (pill: string) => void;
    setActiveCategory: (category: string) => void;
}

export const FILTER_PILLS = ["All Components", "Premium", "Glass", "Charts", "Mobile", "Feedback", "Forms", "Styles"];

export default function Filters({ activePill, setActivePill, setActiveCategory }: FiltersProps) {
    return (
        <div className="flex items-center gap-2.5 mb-10 overflow-x-auto pb-4 scrollbar-none">
            <LayoutGroup id="filters">
                {FILTER_PILLS.map((tag) => {
                    const isActive = activePill === tag;
                    return (
                        <button
                            key={tag}
                            onClick={() => {
                                setActivePill(tag);
                                setActiveCategory(tag === "All Components" ? "All Components" : tag);
                            }}
                            className={cn(
                                "px-6 py-2 rounded-lg text-[12px] font-[800] whitespace-nowrap transition-colors duration-300 relative font-sans",
                                isActive ? "text-white" : "text-zinc-600 bg-transparent border border-white/5 hover:border-white/10"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="pill-bg"
                                    className="absolute inset-0 bg-[#e11d48] rounded-lg shadow-[0_0_20px_rgba(225,29,72,0.35)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{tag}</span>
                        </button>
                    );
                })}
            </LayoutGroup>
        </div>
    );
}
