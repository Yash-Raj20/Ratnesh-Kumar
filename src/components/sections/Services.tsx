"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layout, Palette, Code, Layers, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data";

const iconMap: Record<string, any> = {
    Layout,
    Code,
    Zap: Palette,
    Layers
};

export default function Services() {
    const sectionRef = useRef<HTMLElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.refresh();

            gsap.set(".service-card", { y: 50, opacity: 0 });

            ScrollTrigger.batch(".service-card", {
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    overwrite: true,
                    duration: 0.8,
                    ease: "power3.out"
                }),
                start: "top 85%",
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-32 px-6 md:px-20 bg-background relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />

            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center max-w-2xl mx-auto">
                    <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                        Solving problems with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">design thinking.</span>
                    </h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        I combine technical expertise with design sensibilities to create digital products that stand out.
                    </p>
                </div>

                <div ref={triggerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card group relative h-[400px] rounded-[2rem] overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-500"
                        >
                            {/* Background Image */}
                            <Image
                                src={service.image || ""}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-end">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-3">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center text-sm font-medium text-white/90 gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                        Explore Service <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <Button asChild size="lg" className="rounded-full px-8 h-12">
                        <Link href="/services">
                            View All Services
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
