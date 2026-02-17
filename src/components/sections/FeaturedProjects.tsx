"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { portfolioData } from "@/data/portfolioData";

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {portfolioData.projects.map((project, index) => (
                        <div
                            key={project.id}
                            className={`project-card relative group rounded-3xl overflow-hidden border border-border/50 bg-card hover:border-primary/50 transition-colors duration-500 aspect-[4/3] cursor-pointer ${index % 2 === 1 ? "md:translate-y-12" : ""
                                }`}
                        >
                            {/* Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 transition-transform duration-700 group-hover:scale-105" />

                            {/* Premium Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                            {/* Color Accent Glow */}
                            <div className="absolute -inset-full top-0 block h-[200%] w-1/2 -rotate-12 transform bg-gradient-to-r from-transparent to-primary/10 opacity-0 group-hover:opacity-100 group-hover:animate-shine transition-opacity duration-500 pointer-events-none" />

                            <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary text-xs font-medium mb-4 backdrop-blur-md border border-primary/10">
                                    {project.category}
                                </span>
                                <h3 className="text-2xl md:text-4xl font-heading font-medium text-white mb-2">{project.title}</h3>
                                <div className="h-0.5 w-0 group-hover:w-full bg-primary transition-all duration-500 delay-100"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
