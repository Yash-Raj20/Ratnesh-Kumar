"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";

const testimonialKeys = ["0", "1", "2", "3", "4"];


export default function Testimonials() {
    const { t } = useTranslation();
    return (
        <section className="py-16 md:py-32 bg-zinc-50/50 dark:bg-zinc-900/20 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">{t("testimonials.title")}</h2>
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                    {t("testimonials.heading")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{t("testimonials.highlight")}</span>
                </h3>
            </div>

            <div className="relative flex flex-col gap-8 opacity-90">
                <MarqueeRow direction="left" speed="80s" />
            </div>
        </section>
    );
}

function MarqueeRow({ direction = "left", speed = "40s" }: { direction?: "left" | "right", speed?: string }) {
    const { t } = useTranslation();
    return (
        <div className="relative flex overflow-hidden w-full mask-linear-fade">
            <div
                className={`flex gap-6 whitespace-nowrap ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'} py-8 hover:[animation-play-state:paused] active:[animation-play-state:paused] cursor-pointer`}
                style={{ animationDuration: speed }}
            >
                {[...testimonialKeys, ...testimonialKeys, ...testimonialKeys, ...testimonialKeys].map((key, i) => {
                    const name = t(`testimonials.items.${key}.name`);
                    const initials = name.split(' ').map(n => n[0]).join('');
                    return (
                        <div
                            key={i}
                            className="w-[350px] md:w-[450px] flex-shrink-0 px-6 py-4 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group whitespace-normal flex flex-col justify-between"
                        >
                            <div>
                                <div className="mb-2 text-primary/20 group-hover:text-primary/40 transition-colors">
                                    <Quote size={28} className="fill-current" />
                                </div>
                                <p className="text-base md:text-lg font-medium leading-relaxed text-foreground/90 mb-4 font-heading">
                                    "{t(`testimonials.items.${key}.content`)}"
                                </p>
                            </div>

                            <div className="flex items-center gap-3 border-t border-border/40 pt-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                    {initials}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm">{name}</h4>
                                    <p className="text-xs text-muted-foreground">{t(`testimonials.items.${key}.role`)}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
