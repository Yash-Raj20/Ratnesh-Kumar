"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, CloudSun, MapPin, Laptop } from "lucide-react";

export function StatusWidget() {
    const [time, setTime] = useState("");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!mounted) return null;

    return (
        <div className="flex items-center gap-6 px-6 py-3 rounded-full bg-zinc-900/50 backdrop-blur-md border border-white/5 hover:border-primary/20 transition-all duration-500 shadow-xl shadow-black/20">
            {/* Clock */}
            <div className="flex items-center gap-3 border-r border-white/10 pr-6">
                <Clock className="w-4.5 h-4.5 text-primary animate-pulse" />
                <span className="text-[10px] md:text-[11px] font-mono font-black text-zinc-100 tabular-nums tracking-tight">
                    {time || "00:00:00 AM"}
                </span>
            </div>

            {/* Location & Weather */}
            <div className="flex items-center gap-3 border-r border-white/10 pr-6">
                <CloudSun className="w-4.5 h-4.5 text-blue-400" />
                <span className="text-[10px] md:text-[11px] font-black text-zinc-300 uppercase tracking-[0.15em]">
                    India • 24°C
                </span>
            </div>

            {/* Status */}
            <div className="flex items-center gap-3">
                <div className="relative">
                    <Laptop className="w-4.5 h-4.5 text-emerald-400" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-zinc-900" />
                </div>
                <span className="text-[10px] md:text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em] animate-pulse">
                    Currently Coding
                </span>
            </div>
        </div>
    );
}
