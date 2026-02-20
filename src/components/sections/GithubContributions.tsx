"use client";

import React, { useState, useEffect, useCallback } from "react";
import { portfolioData } from "@/data/portfolioData";
import { useTheme } from "next-themes";
import { Github, RefreshCw, AlertCircle, Sparkles, Flame, Trophy } from "lucide-react";
import { ActivityCalendar, Activity } from "react-activity-calendar";
import { motion, AnimatePresence } from "framer-motion";

export default function GithubContributions() {
    const { theme } = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [data, setData] = useState<Activity[]>([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [selectedYear, setSelectedYear] = useState<number | "last">("last");
    const [years, setYears] = useState<number[]>([]);
    const [retryCount, setRetryCount] = useState(0);
    const [streak, setStreak] = useState(0);
    const [maxDay, setMaxDay] = useState(0);
    const [cache, setCache] = useState<Record<string, any>>({});

    const githubUser = portfolioData.about.githubUsername || "Yash-Raj20";

    const fetchContributions = useCallback(async () => {
        // Check cache first
        const cacheKey = String(selectedYear);
        if (cache[cacheKey]) {
            const cachedData = cache[cacheKey];
            setData(cachedData.contributions);
            setTotalContributions(cachedData.total);
            setMaxDay(cachedData.maxDay);
            setStreak(cachedData.streak);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setHasError(false);
        try {
            // Fetch total summary to get available years (only if not already fetched)
            if (years.length === 0) {
                const summaryRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUser}`);
                if (summaryRes.ok) {
                    const summaryData = await summaryRes.json();
                    const availableYears = Object.keys(summaryData.total)
                        .map(Number)
                        .filter(y => y > 2000)
                        .sort((a, b) => b - a);
                    setYears(availableYears);
                }
            }

            // Fetch specific year or 'last'
            const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${githubUser}?y=${selectedYear}`);
            if (!response.ok) throw new Error("Failed to fetch");
            const result = await response.json();

            const contributions = result.contributions;
            const total = result.contributions.reduce((acc: number, curr: any) => acc + curr.count, 0);
            const max = Math.max(...result.contributions.map((c: any) => c.count));

            // Basic streak calculation
            let currentStreak = 0;
            const sortedData = [...result.contributions].reverse();
            for (const day of sortedData) {
                if (day.count > 0) currentStreak++;
                else if (currentStreak > 0) break;
            }

            // Update state
            setData(contributions);
            setTotalContributions(total);
            setMaxDay(max);
            setStreak(currentStreak);

            // Save to cache
            setCache(prev => ({
                ...prev,
                [cacheKey]: {
                    contributions,
                    total,
                    maxDay: max,
                    streak: currentStreak
                }
            }));

            setIsLoading(false);
        } catch (error) {
            console.error("GitHub Fetch Error:", error);
            setHasError(true);
            setIsLoading(false);
        }
    }, [githubUser, selectedYear, cache, years.length]);

    useEffect(() => {
        fetchContributions();
    }, [fetchContributions, retryCount]);

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
    };

    return (
        <section className="py-12 md:py-24 relative overflow-hidden bg-zinc-950/50">
            {/* Extended Background Effects */}
            <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-primary/5 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                                    <Github className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                                </div>
                                <span className="text-zinc-500 uppercase tracking-[0.2em] text-[10px] md:text-xs font-bold">Activity Pulse</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight text-white">
                                GitHub <span className="text-gradient-premium">Ecosystem</span>
                            </h2>
                            <p className="text-zinc-400 text-sm md:text-base max-w-xl">
                                Detailed visualization of my open-source contributions, streaks, and engagement across the GitHub graph.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 lg:flex lg:flex-wrap gap-4 w-full md:w-auto"
                        >
                            {/* Insight Badges */}
                            <div className="px-4 py-3 md:px-5 md:py-3 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl flex items-center gap-3 shadow-xl">
                                <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                                <div>
                                    <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-black">Streak</p>
                                    <p className="text-base md:text-lg font-bold text-white leading-none">{streak} Days</p>
                                </div>
                            </div>
                            <div className="px-4 py-3 md:px-5 md:py-3 rounded-2xl bg-zinc-900/50 border border-white/5 backdrop-blur-xl flex items-center gap-3 shadow-xl">
                                <Trophy className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />
                                <div>
                                    <p className="text-[9px] md:text-[10px] text-zinc-500 uppercase font-black">Best</p>
                                    <p className="text-base md:text-lg font-bold text-white leading-none">{maxDay}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch">
                        {/* Calendar Container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="flex-1 min-w-0"
                        >
                            <div className="group relative p-0.5 md:p-1 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-primary/5">
                                <div className="bg-zinc-900/80 backdrop-blur-3xl border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-10 shadow-2xl relative overflow-hidden h-full">

                                    {/* Abstract Accent In Calendar */}
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

                                    <div className="flex justify-between items-center mb-8 md:mb-10 relative z-10">
                                        <div className="space-y-0.5">
                                            <p className="text-xl md:text-3xl font-bold text-white tracking-tight">
                                                {totalContributions.toLocaleString()}
                                            </p>
                                            <p className="text-[9px] md:text-xs text-zinc-500 uppercase tracking-widest font-bold">Contributions in {selectedYear === 'last' ? 'last year' : selectedYear}</p>
                                        </div>
                                        <div className="flex items-center gap-2 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full bg-zinc-800/50 border border-white/5 text-[8px] md:text-[10px] text-zinc-400 font-bold uppercase tracking-tighter cursor-help hover:bg-zinc-800 transition-colors shrink-0">
                                            <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
                                            <span className="hidden sm:inline">Data Sync Live</span>
                                            <span className="sm:hidden">Live</span>
                                        </div>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div
                                                key="loading"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="flex flex-col items-center justify-center py-16 md:py-20 bg-zinc-950/20 rounded-xl border border-white/5"
                                            >
                                                <div className="relative">
                                                    <div className="w-10 h-10 md:w-12 md:h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <Github className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary animate-pulse" />
                                                    </div>
                                                </div>
                                                <p className="mt-4 text-zinc-500 text-[10px] font-bold tracking-[0.3em] uppercase">Syncing</p>
                                            </motion.div>
                                        ) : hasError ? (
                                            <motion.div
                                                key="error"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex flex-col items-center justify-center py-16 md:py-20 text-center"
                                            >
                                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                                                    <AlertCircle className="w-6 h-6 md:w-8 md:h-8 text-red-500/50" />
                                                </div>
                                                <p className="text-zinc-300 font-bold mb-1 text-sm md:text-base">Graph Unavailable</p>
                                                <button
                                                    onClick={handleRetry}
                                                    className="px-6 py-2 md:px-8 md:py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs md:text-sm font-bold border border-white/10 transition-all active:scale-95"
                                                >
                                                    Retry
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="calendar"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="w-full h-full flex flex-col justify-center"
                                            >
                                                <div className="w-full overflow-x-auto scrollbar-hide contributions-grid border border-white/[0.05] rounded-xl md:rounded-2xl p-4 md:p-6 bg-zinc-950/50 backdrop-blur-sm">
                                                    <div className="min-w-[700px]">
                                                        <ActivityCalendar
                                                            data={data}
                                                            theme={{
                                                                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                                                            }}
                                                            blockSize={12}
                                                            blockMargin={4}
                                                            fontSize={12}
                                                            colorScheme="dark"
                                                            showWeekdayLabels={true}
                                                            labels={{
                                                                totalCount: "",
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="mt-6 md:mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] md:text-[10px] uppercase font-black tracking-widest text-zinc-600">
                                                        <div className="px-3 py-1 rounded-md bg-zinc-900 border border-white/5">
                                                            * Real-time Fetch Active
                                                        </div>
                                                        <div className="flex items-center gap-3 bg-zinc-900 px-4 py-1.5 rounded-full border border-white/5">
                                                            <span>Less</span>
                                                            <div className="flex gap-1.5">
                                                                {['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'].map(c => (
                                                                    <div key={c} className="w-[8px] h-[8px] md:w-[10px] md:h-[10px] rounded-[2px] shadow-sm" style={{ backgroundColor: c }} />
                                                                ))}
                                                            </div>
                                                            <span>More</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:w-44 flex lg:flex-col overflow-x-auto lg:overflow-visible scrollbar-hide timeline-scroll gap-2 py-2 lg:py-0"
                        >
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-2 px-2 hidden lg:block">Timeline</div>
                            <button
                                onClick={() => setSelectedYear("last")}
                                className={`group relative px-4 py-3 md:px-5 md:py-4 text-left text-[10px] md:text-xs font-bold rounded-xl md:rounded-2xl transition-all duration-500 border whitespace-nowrap lg:whitespace-normal ${selectedYear === "last"
                                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 lg:scale-105 z-10"
                                    : "bg-zinc-900/40 text-zinc-500 border-white/5 hover:border-white/10 hover:bg-zinc-900 hover:text-white"
                                    }`}
                            >
                                <div className="flex items-center justify-between gap-3 pointer-events-none">
                                    <span>Last 12 Months</span>
                                    <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${selectedYear === 'last' ? 'bg-white animate-pulse' : 'bg-zinc-700 opacity-0 group-hover:opacity-100'}`} />
                                </div>
                            </button>

                            {years.map(year => (
                                <button
                                    key={year}
                                    onClick={() => setSelectedYear(year)}
                                    className={`group relative px-4 py-3 md:px-5 md:py-4 text-left text-[10px] md:text-xs font-bold rounded-xl md:rounded-2xl transition-all duration-500 border whitespace-nowrap lg:whitespace-normal ${selectedYear === year
                                        ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 lg:scale-105 z-10"
                                        : "bg-zinc-900/40 text-zinc-500 border-white/5 hover:border-white/10 hover:bg-zinc-900 hover:text-white"
                                        }`}
                                >
                                    <div className="flex items-center justify-between gap-3 pointer-events-none">
                                        <span>{year} Activity</span>
                                        <div className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${selectedYear === year ? 'bg-white animate-pulse' : 'bg-zinc-700 opacity-0 group-hover:opacity-100'}`} />
                                    </div>
                                </button>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
