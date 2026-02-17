"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export default function AboutPreview() {
    const containerRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            tl.from(".about-content > *", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            })
                .from(imageRef.current, {
                    x: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.6");

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-20 bg-zinc-50/50 dark:bg-zinc-900/20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">

                {/* Text Content */}
                <div className="about-content space-y-8 order-2 lg:order-1">
                    <div className="space-y-4">
                        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{portfolioData.about.title}</h2>
                        <h3 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                            {portfolioData.about.headingLine1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{portfolioData.about.headingLine2}</span>
                        </h3>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                        {portfolioData.about.description}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <div className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium shadow-sm">
                            ✨ Performance First
                        </div>
                        <div className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium shadow-sm">
                            🎨 Creative Design
                        </div>
                        <div className="px-4 py-2 rounded-full bg-background border border-border text-sm font-medium shadow-sm">
                            ♿ Inclusive/Accessible
                        </div>
                    </div>

                    <Button asChild size="lg" className="rounded-full text-base px-8 h-12 group mt-4">
                        <Link href="/about">
                            My Journey <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                {/* Image / Visual */}
                <div ref={imageRef} className="order-1 lg:order-2 relative">
                    <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mr-0 rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl shadow-primary/10 group">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                        <Image
                            src="/profile.jpg"
                            alt="Ratnesh"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-white">
                            <p className="font-heading text-2xl font-bold mb-1">{portfolioData.about.name}</p>
                            <p className="text-white/80 text-sm tracking-wider uppercase">{portfolioData.about.role}</p>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl -z-10" />
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl -z-10" />
                </div>
            </div>
        </section>
    );
}
