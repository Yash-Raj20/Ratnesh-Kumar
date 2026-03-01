"use client";

import { motion } from "framer-motion";
import { Calendar, ArrowRight, Sparkles, Clock, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useTranslation } from "react-i18next";

interface BookingSectionProps {
    bookingLink?: string;
    className?: string;
}

export default function BookingSection({
    bookingLink = "https://cal.com/ratnesh-kumar123/15min",
    className
}: BookingSectionProps) {
    const { t } = useTranslation();

    return (
        <section className={cn("py-12 md:py-24 px-6 md:px-20 relative overflow-hidden", className)}>
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
                    <div className="flex flex-col lg:flex-row">

                        {/* Left Side: Content */}
                        <div className="flex-1 p-12 md:p-20 border-r border-white/5">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest mb-8">
                                <Sparkles size={12} /> {t("booking.badge")}
                            </div>

                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-[0.9] mb-8">
                                {t("booking.heading")} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{t("booking.headingHighlight")}</span>
                            </h2>

                            <p className="text-lg text-zinc-400 font-medium italic mb-12 max-w-xl leading-relaxed">
                                {t("booking.description")}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black uppercase italic tracking-tight">{t("booking.features.meet.title")}</div>
                                        <div className="text-[10px] text-zinc-500 font-medium italic">{t("booking.features.meet.desc")}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <Globe size={20} />
                                    </div>
                                    <div>
                                        <div className="text-sm font-black uppercase italic tracking-tight">{t("booking.features.location.title")}</div>
                                        <div className="text-[10px] text-zinc-500 font-medium italic">{t("booking.features.location.desc")}</div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                size="lg"
                                onClick={() => window.open(bookingLink, '_blank')}
                                className="h-16 px-10 rounded-2xl text-lg font-black uppercase italic tracking-widest gap-3 shadow-2xl shadow-primary/20 hover:scale-[1.02] transition-all bg-primary text-primary-foreground group"
                            >
                                {t("booking.button")} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>

                        {/* Right Side: Visual / Info */}
                        <div className="lg:w-[400px] bg-zinc-950/40 p-12 md:p-16 flex flex-col justify-center relative overflow-hidden">
                            {/* Decorative Grid */}
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                            <div className="relative z-10 space-y-8">
                                <div className="p-6 rounded-3xl bg-zinc-900/50 border border-white/5 backdrop-blur-sm">
                                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 italic">{t("booking.sidebar.available")}</div>
                                    <div className="text-2xl font-black text-white italic tracking-tighter">{t("booking.sidebar.time")}</div>
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{t("booking.sidebar.pulse")}</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                            <Zap size={14} />
                                        </div>
                                        <p className="text-xs font-medium text-zinc-500 italic leading-snug">{t("booking.sidebar.hint1")}</p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                            <Calendar size={14} />
                                        </div>
                                        <p className="text-xs font-medium text-zinc-500 italic leading-snug">{t("booking.sidebar.hint2")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-16 pt-8 border-t border-white/5">
                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-700 italic">
                                    Ratnesh Kumar <br />
                                    {t("booking.footer")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
