"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const galleryItems = [
    {
        id: 1,
        title: "Workspace Setup",
        category: "Lifestyle",
        size: "large", // 2x2
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "Design System",
        category: "Work",
        size: "tall", // 1x2
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "Neon Nights",
        category: "Photography",
        size: "small", // 1x1
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Code Minimal",
        category: "Dev",
        size: "small", // 1x1
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Abstract Flow",
        category: "Art",
        size: "wide", // 2x1
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "Tech Stack",
        category: "Gear",
        size: "small",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    }
];

export default function Gallery() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Force refresh to ensure correct start positions
            ScrollTrigger.refresh();

            // Set initial state
            gsap.set(".gallery-item", { y: 50, opacity: 0 });

            // Use ScrollTrigger.batch for reliable grid animations
            ScrollTrigger.batch(".gallery-item", {
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.1,
                    duration: 0.8,
                    ease: "power3.out",
                    overwrite: true
                }),
                start: "top 85%",
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Helper to get grid classes based on size
    const getGridClasses = (size: string) => {
        switch (size) {
            case "large": return "md:col-span-2 md:row-span-2 h-[500px]";
            case "tall": return "md:col-span-1 md:row-span-2 h-[500px]";
            case "wide": return "md:col-span-2 md:row-span-1 h-[240px]";
            case "small": default: return "md:col-span-1 md:row-span-1 h-[240px]";
        }
    };

    return (
        <section className="py-32 px-6 md:px-20 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">Gallery</h2>
                        <h3 className="text-4xl font-heading font-medium">A Glimpse Into My World</h3>
                    </div>
                    <Link href="/gallery" className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors">
                        View All Photos <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                </div>

                <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
                    {galleryItems.map((item) => (
                        <div
                            key={item.id}
                            className={`gallery-item relative group rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-border/50 ${getGridClasses(item.size)}`}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                            <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">{item.category}</span>
                                <h4 className="text-xl font-medium text-white">{item.title}</h4>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
