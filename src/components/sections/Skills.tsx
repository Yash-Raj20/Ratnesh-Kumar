"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/data/portfolioData";



export default function Skills() {
    return (
        <section className="py-24 bg-zinc-50/50 dark:bg-zinc-900/20 overflow-hidden">
            <div className="container px-4 md:px-10 mx-auto mb-12 flex flex-col items-center text-center">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">Technical Proficiency</h2>
                <h3 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                    Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">modern technologies.</span>
                </h3>
                <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                    I leverage the latest tools and frameworks to build robust, scalable, and beautiful applications.
                </p>
                <Button variant="outline" className="rounded-full" asChild>
                    <Link href="/about">View Full Tech Stack</Link>
                </Button>
            </div>

            <div className="flex flex-col gap-8 mt-12 w-full overflow-hidden opacity-90 relative">
                {/* Gradient Masks - Widened for proper 'gaping' feel */}
                <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
                <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

                <MarqueeRow items={portfolioData.skills.row1} direction="left" />
                <MarqueeRow items={portfolioData.skills.row2} direction="right" />
            </div>

        </section>
    );
}

function MarqueeRow({ items, direction = "left" }: { items: { name: string, icon: string }[], direction?: "left" | "right" }) {
    return (
        <div className="relative flex overflow-hidden w-full mask-linear-fade">
            <div className={`flex gap-6 whitespace-nowrap ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'} py-2`}>
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
