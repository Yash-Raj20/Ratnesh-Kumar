"use client";

import * as React from "react";
import { Moon, Sun, Monitor, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

const themes = [
    { name: "Rose", value: "rose", color: "bg-[#e11d48]" },
    { name: "Blue", value: "blue", color: "bg-[#2563eb]" },
    { name: "Green", value: "green", color: "bg-[#16a34a]" },
    { name: "Orange", value: "orange", color: "bg-[#ea580c]" },
    { name: "Violet", value: "violet", color: "bg-[#7c3aed]" },
    { name: "Cyan", value: "cyan", color: "bg-[#06b6d4]" },
    { name: "Yellow", value: "yellow", color: "bg-[#eab308]" },
];

export function ThemeSwitcher() {
    const { setTheme, theme } = useTheme();
    const [isOpen, setIsOpen] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
        const savedColor = localStorage.getItem('color-theme') || 'rose';
        document.documentElement.setAttribute('data-theme', savedColor);
        if (!localStorage.getItem('color-theme')) {
            localStorage.setItem('color-theme', 'rose');
        }
    }, []);

    const setColor = (color: string) => {
        document.documentElement.setAttribute('data-theme', color);
        localStorage.setItem('color-theme', color);
        window.dispatchEvent(new Event('theme-change'));
    };

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    const menu = (
        <AnimatePresence>
            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-[100] bg-black/20 backdrop-blur-[1px]"
                        onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.90, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.90, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="fixed left-1/2 top-24 z-[101] w-72 -translate-x-1/2 p-5 rounded-3xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl flex flex-col gap-6 origin-top"
                    >
                        {/* Mode Selection */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                <Monitor className="w-3 h-3" />
                                <span>Appearance</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 bg-black/20 p-1.5 rounded-xl border border-white/5">
                                {['light', 'dark', 'system'].map((mode) => (
                                    <button
                                        key={mode}
                                        onClick={() => {
                                            setTheme(mode);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "flex items-center justify-center py-2 rounded-lg text-sm font-medium transition-all duration-300",
                                            theme === mode
                                                ? "bg-zinc-800 text-white shadow-sm"
                                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                                        )}
                                    >
                                        {mode === 'light' && <Sun className="w-4 h-4" />}
                                        {mode === 'dark' && <Moon className="w-4 h-4" />}
                                        {mode === 'system' && <Monitor className="w-4 h-4" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Color Selection */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                <Palette className="w-3 h-3" />
                                <span>Accent Color</span>
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                                {themes.map((t) => (
                                    <button
                                        key={t.value}
                                        onClick={() => {
                                            setColor(t.value);
                                            setIsOpen(false);
                                        }}
                                        className="group relative flex items-center justify-center w-full aspect-square rounded-full transition-all duration-300 hover:scale-110"
                                    >
                                        <div className={cn(
                                            "w-full h-full rounded-full opacity-80 group-hover:opacity-100 transition-opacity",
                                            t.color
                                        )} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <div className="relative">
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full w-10 h-10 bg-zinc-800/50 hover:bg-zinc-800 border border-white/5 text-zinc-400 hover:text-white transition-all shadow-inner group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 group-hover:scale-110" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 group-hover:scale-110" />
                <span className="sr-only">Toggle theme</span>
            </Button>

            {mounted && createPortal(menu, document.body)}
        </div>
    );
}
