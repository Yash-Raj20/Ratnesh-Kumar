"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "CEO, TechFlow",
        content: "Ratnesh transformed our vague ideas into a stunning digital reality. His attention to detail and design sensibility is unmatched.",
        initials: "SJ"
    },
    {
        name: "Michael Chen",
        role: "Product Lead, StartUp Inc",
        content: "The best frontend developer I've worked with. He understands both code and design, which makes the collaboration seamless.",
        initials: "MC"
    },
    {
        name: "Elena Rodriguez",
        role: "Founder, Creative Studios",
        content: "Delivered the project ahead of schedule and with quality that exceeded our expectations. Highly recommended!",
        initials: "ER"
    },
    {
        name: "David Kim",
        role: "CTO, FinTech Sol",
        content: "His ability to animate complex UIs without compromising performance is incredible. Our users love the new dashboard.",
        initials: "DK"
    },
    {
        name: "Jessica Lee",
        role: "Marketing Director",
        content: "A true professional who brings creativity to every problem. The new landing page increased our conversions by 40%.",
        initials: "JL"
    }
];

export default function Testimonials() {
    return (
        <section className="py-24 md:py-32 bg-zinc-50/50 dark:bg-zinc-900/20 overflow-hidden relative">
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">Client Reviews</h2>
                <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                    Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Innovators.</span>
                </h3>
            </div>

            <div className="relative flex flex-col gap-8 opacity-90">
                <MarqueeRow items={testimonials} direction="left" speed="40s" />
            </div>
        </section>
    );
}

function MarqueeRow({ items, direction = "left", speed = "40s" }: { items: typeof testimonials, direction?: "left" | "right", speed?: string }) {
    return (
        <div className="relative flex overflow-hidden w-full mask-linear-fade">
            {/* Added style for custom duration to control speed easily if needed, though Tailwind class is cleaner if standard.
                Using standard animate-marquee from globals.css for consistency.
            */}
            <div
                className={`flex gap-6 whitespace-nowrap ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'} py-8`}
                style={{ animationDuration: speed }}
            >
                {[...items, ...items, ...items, ...items].map((testimonial, i) => (
                    <div
                        key={i}
                        className="w-[350px] md:w-[450px] flex-shrink-0 px-6 py-4 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group whitespace-normal flex flex-col justify-between"
                    >
                        <div>
                            <div className="mb-2 text-primary/20 group-hover:text-primary/40 transition-colors">
                                <Quote size={28} className="fill-current" />
                            </div>
                            <p className="text-base md:text-lg font-medium leading-relaxed text-foreground/90 mb-4 font-heading">
                                "{testimonial.content}"
                            </p>
                        </div>

                        <div className="flex items-center gap-3 border-t border-border/40 pt-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                {testimonial.initials}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{testimonial.name}</h4>
                                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
