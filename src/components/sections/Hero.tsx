"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import ElectricNodesBg from "@/components/ui/ElectricNodesBg";
import { portfolioData } from "@/data/portfolioData";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-text-line", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
                delay: 0.2
            });

            gsap.from(".hero-cta", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 1.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 pt-20 relative overflow-hidden">
            {/* Electric Nodes Background */}
            <ElectricNodesBg />

            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 pointer-events-none -z-10" />

            <h2 className="hero-text-line text-sm md:text-base font-medium text-primary tracking-[0.3em] uppercase mb-4">
                {portfolioData.hero.title}
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] font-heading font-bold tracking-tighter leading-[1.1] max-w-6xl">
                <div className="overflow-hidden py-2"><span className="hero-text-line block">{portfolioData.hero.headingLine1}</span></div>
                <div className="overflow-hidden py-2"><span className="hero-text-line block">with <span className="text-gradient-premium">purpose & flow.</span></span></div>
            </h1>

            <p className="hero-text-line text-muted-foreground text-base md:text-lg max-w-3xl mx-auto leading-relaxed pt-4">
                {portfolioData.hero.subtext}
            </p>

            <div className="hero-cta flex flex-col md:flex-row gap-6 pt-12 items-center">
                <Button asChild size="lg" className="rounded-full text-base px-8 py-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all duration-300">
                    <a href={portfolioData.hero.ctaParams.primary.link}>{portfolioData.hero.ctaParams.primary.text} <ArrowDown className="ml-2 w-4 h-4" /></a>
                </Button>

                <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8 py-6 bg-background/50 border-primary/20 hover:bg-primary/5 hover:border-primary/50 backdrop-blur-sm transition-all duration-300">
                    <a href={portfolioData.hero.ctaParams.secondary.link}>{portfolioData.hero.ctaParams.secondary.text}</a>
                </Button>
            </div>
        </section>
    );
}
