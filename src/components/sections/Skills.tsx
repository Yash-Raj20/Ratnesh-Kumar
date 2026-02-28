"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";
import { useTranslation } from "react-i18next";



export default function Skills() {
    const { t } = useTranslation();
    return (
        <section className="py-12 md:py-24 bg-zinc-50/50 dark:bg-zinc-900/20 overflow-hidden px-6 md:px-20">
            <div className="container px-4 md:px-10 mx-auto mb-12 flex flex-col items-center text-center">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">{t("skills.title")}</h2>
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                    {t("skills.heading1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{t("skills.heading2")}</span>
                </h3>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                    {t("skills.description")}
                </p>
                <Button variant="outline" className="rounded-full" asChild>
                    <Link href="/about">{t("skills.cta")}</Link>
                </Button>
            </div>

            <div className="flex flex-col gap-8 mt-12 w-full overflow-hidden opacity-90 relative">
                {/* Gradient Masks - Widened for proper 'gaping' feel */}
                <MarqueeRow items={portfolioData.skills.row1} direction="left" speed="80s" />
                <MarqueeRow items={portfolioData.skills.row2} direction="right" speed="80s" />
            </div>

        </section>
    );
}

function MarqueeRow({ items, direction = "left", speed = "80s" }: { items: { name: string, icon: string }[], direction?: "left" | "right", speed?: string }) {
    return (
        <div className="relative flex overflow-hidden w-full mask-linear-fade">
            <div
                className={`flex gap-6 whitespace-nowrap ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'} py-2`}
                style={{ animationDuration: speed }}
            >
                {[...items, ...items, ...items, ...items].map((skill, i) => (
                    <div key={i} className="flex items-center justify-center gap-3 px-6 py-2 rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-input/30 text-base md:text-lg font-bold text-foreground hover:border-primary/50 hover:scale-[1.02] transition-all duration-300 cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,0.05)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]">
                        <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-5 h-5 md:w-6 md:h-6 object-cover"
                            onError={(e) => (e.currentTarget.style.display = 'none')}
                        />
                        <span>{skill.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
