"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { portfolioData } from "@/data/portfolioData";
import { cn } from "@/lib/utils";

export default function FeaturedProjects() {

    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".project-card", {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.05,
                ease: "back.out(1.7)"
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-background text-foreground relative py-32 z-10">
            <div className="px-6 md:px-20 max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">Selected Works</h2>
                    <h3 className="text-4xl md:text-5xl font-heading font-medium">Crafting Digital Excellence</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
                    {portfolioData.projects.map((project, index) => {
                        // Bento Layout Configuration
                        // Index 0: Large spanning 2 cols, 2 rows
                        // Index 1: Wide spanning 2 cols, 1 row
                        // Index 2: Tall spanning 1 col, 2 rows (optional, let's stick to simple bento)
                        // Using a more structured mapping for predictability
                        const bentoConfigs = [
                            "md:col-span-2 md:row-span-2", // 0
                            "md:col-span-2 md:row-span-1", // 1
                            "md:col-span-1 md:row-span-1", // 2
                            "md:col-span-1 md:row-span-1", // 3
                            "md:col-span-2 md:row-span-1", // 4
                        ];
                        const gridClass = bentoConfigs[index % bentoConfigs.length];

                        return (
                            <div
                                key={project.id}
                                className={cn(
                                    "project-card relative group rounded-[2rem] overflow-hidden border border-border/50 bg-card/30 backdrop-blur-xl transition-all duration-500 cursor-pointer hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5",
                                    gridClass
                                )}
                            >
                                {/* Gradient Ambient background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-100/50 to-zinc-200/50 dark:from-zinc-900/50 dark:to-zinc-950/50 transition-transform duration-1000 group-hover:scale-110" />

                                {/* Inner Content */}
                                <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end z-20">
                                    <div className="space-y-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider border border-primary/20 backdrop-blur-md">
                                            {project.category}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-heading font-medium tracking-tight">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 max-w-xs">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Floating Action Button */}
                                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/5 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-200 backdrop-blur-md">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </div>

                                {/* Dynamic Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/10 transition-colors duration-500 rounded-[2rem] pointer-events-none" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
