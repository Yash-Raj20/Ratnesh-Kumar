"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import { portfolioData } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export default function FeaturedProjects() {
    const containerRef = useRef<HTMLElement>(null);
    const { t } = useTranslation();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".project-card", 
                { 
                    y: 30, 
                    opacity: 0 
                },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top bottom-=100px",
                        toggleActions: "play none none reverse",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out",
                    onComplete: () => {
                        ScrollTrigger.refresh();
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-background text-foreground relative py-12 md:py-24 px-4 md:px-20 z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-sm font-medium uppercase tracking-widest text-primary mb-4">{t("projects.title") || "Selected Works"}</h2>
                    <h3 className="text-4xl md:text-5xl font-heading font-bold">{t("projects.heading") || "Crafting Digital Excellence"}</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
                    {portfolioData.projects.map((project, index) => {
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
                                    "project-card opacity-0 relative group rounded-[2.5rem] overflow-hidden border border-border/50 bg-card/30 backdrop-blur-xl transition-all duration-500 cursor-pointer hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5",
                                    gridClass
                                )}
                            >
                                {/* Project Image Background */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={project.image}
                                        alt={t(`projects.items.${project.id}.title`) || project.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay for card readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent dark:from-zinc-950/90 dark:via-transparent dark:to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                                </div>

                                {/* Inner Content */}
                                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
                                    <div className="space-y-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                        <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                                            {t(`projects.items.${project.id}.category`) || project.category}
                                        </span>
                                        <h3 className="text-2xl md:text-3xl font-heading font-medium tracking-tight text-white">
                                            {t(`projects.items.${project.id}.title`) || project.title}
                                        </h3>
                                        <p className="text-sm text-white/70 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100 max-w-xs">
                                            {t(`projects.items.${project.id}.description`) || project.description}
                                        </p>
                                    </div>
                                </div>


                                {/* Floating Action Button */}
                                <div className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/20 border border-white/30 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-200 backdrop-blur-md">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500">
                                        <line x1="7" y1="17" x2="17" y2="7"></line>
                                        <polyline points="7 7 17 7 17 17"></polyline>
                                    </svg>
                                </div>

                                {/* Dynamic Overlay Border on hover */}
                                <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 transition-colors duration-500 rounded-[2.5rem] pointer-events-none z-30" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}
