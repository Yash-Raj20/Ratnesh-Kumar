"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, PenTool, LayoutTemplate, Zap, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
    {
        id: "01",
        title: "Discovery",
        description: "We dive deep into your vision, understanding your target audience, competitors, and business goals to build a solid strategic foundation.",
        icon: Search
    },
    {
        id: "02",
        title: "Strategy",
        description: "Crafting a tailored roadmap and user experience strategy that aligns with your objectives, ensuring every pixel serves a purpose.",
        icon: PenTool
    },
    {
        id: "03",
        title: "Design",
        description: "Creating high-fidelity, interactive prototypes that bring the vision to life with pixel-perfect aesthetics and intuitive usability.",
        icon: LayoutTemplate
    },
    {
        id: "04",
        title: "Development",
        description: "Building robust, scalable, and performant applications using modern technologies, ensuring a seamless experience across all devices.",
        icon: Zap
    }
];

export default function Process() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // usage of useLayoutEffect (or useEffect with extra care) is recommended for GSAP in React
    // to ensure elements are in the DOM before animation setup.
    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!triggerRef.current) return;

            // Ensure ScrollTrigger refreshes to calculate correct positions
            ScrollTrigger.refresh();

            // Use ScrollTrigger.batch for reliable grid animations
            ScrollTrigger.batch(".process-card", {
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    overwrite: true,
                    duration: 0.8,
                    ease: "power3.out"
                }),
                start: "top 85%",
                // Initial state handled by CSS or gsap.set
            });

            // Set initial state
            gsap.set(".process-card", { y: 50, opacity: 0 });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 md:py-32 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] left-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto px-6" ref={triggerRef}>
                <div className="text-center mb-20">
                    <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">How I Work</h2>
                    <h3 className="text-4xl md:text-5xl font-heading font-bold">
                        From <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Concept to Reality.</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                    {processSteps.map((step, index) => (
                        <div
                            key={step.id}
                            className="process-card group relative p-8 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/20 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] overflow-hidden"
                        >
                            {/* Glossy Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            {/* Circular Number Background */}
                            <div className="absolute -right-6 -top-6 w-32 h-32 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                                <span className="text-6xl font-black font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-transparent select-none">
                                    {step.id}
                                </span>
                            </div>

                            <div className="relative z-10 pt-4">
                                <div className="mb-8 w-16 h-16 rounded-2xl bg-background shadow-sm border border-border/50 flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ease-out">
                                    <step.icon className="w-7 h-7" />
                                </div>

                                <h4 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                                    {step.title}
                                </h4>

                                <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/80 transition-colors duration-300">
                                    {step.description}
                                </p>
                            </div>

                            {/* Bottom Active Line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
