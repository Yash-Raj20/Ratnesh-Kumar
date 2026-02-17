"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, projectCategories } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Filter } from "lucide-react";
import ContactCTA from "@/components/sections/ContactCTA";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
    const [filter, setFilter] = useState("All");
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const filteredProjects = filter === "All"
        ? projects
        : projects.filter(p => p.category === filter);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.refresh();

            // Hero Animation
            const tl = gsap.timeline();

            tl.from(".hero-text-char", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.05,
                ease: "power4.out",
                delay: 0.2
            })
                .from(".hero-subtitle", {
                    y: 20,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.5");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Split text for hero animation
    const heroTitle = "Selected Works";
    const heroChars = heroTitle.split("");

    return (
        <div ref={containerRef} className="min-h-screen bg-background selection:bg-primary/20 flex flex-col">

            {/* Hero Section */}
            <section ref={heroRef} className="pt-40 pb-20 px-6 md:px-20 max-w-8xl mx-auto w-full relative z-10">
                <div className="overflow-hidden mb-6">
                    <h1 className="text-6xl md:text-9xl font-heading font-bold tracking-tight flex flex-wrap gap-x-4 md:gap-x-8">
                        {heroTitle.split(" ").map((word, wordIndex) => (
                            <span key={wordIndex} className="inline-flex overflow-hidden">
                                {word.split("").map((char, charIndex) => (
                                    <span key={charIndex} className="hero-text-char inline-block transform">
                                        {char}
                                    </span>
                                ))}
                            </span>
                        ))}
                    </h1>
                </div>
                <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                    A curated collection of projects that push the boundaries of design and technology.
                </p>
            </section>

            {/* Filter Section */}
            <section className="px-6 md:px-20 mb-16 sticky top-24 z-40">
                <div className="max-w-8xl mx-auto">
                    <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-border/50 p-2 pl-3 rounded-full inline-flex items-center gap-2 shadow-sm relative no-scrollbar overflow-x-auto max-w-full">
                        <div className="pr-2 border-r border-border/50 text-muted-foreground hidden sm:flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm font-medium">Filter</span>
                        </div>
                        <div className="flex items-center gap-1">
                            {projectCategories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setFilter(category)}
                                    className={cn(
                                        "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative whitespace-nowrap",
                                        filter === category
                                            ? "text-white"
                                            : "text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    )}
                                >
                                    {filter === category && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-primary rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">{category}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="px-6 md:px-20 pb-32 max-w-8xl mx-auto w-full">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, index) => {
                            // Featured logic: First item or every 4th item spans 2 columns if not mobile
                            const isFeatured = index === 0 || index % 4 === 0;

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    key={project.id}
                                    className={cn(
                                        "group relative rounded-[2.5rem] overflow-hidden cursor-pointer",
                                        isFeatured ? "md:col-span-2 aspect-[16/10]" : "col-span-1 aspect-square"
                                    )}
                                >
                                    <Link href={`/projects/${project.id}`} className="block w-full h-full relative">
                                        {/* Image */}
                                        <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105">
                                            <Image
                                                src={project.image || "/placeholder-image.jpg"}
                                                alt={project.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300" />

                                        {/* Hover Overlay - Darker */}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />

                                        {/* Content */}
                                        <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between text-white">
                                            <div className="flex justify-between items-start">
                                                <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-medium uppercase tracking-wider">
                                                    {project.year}
                                                </div>
                                                <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100">
                                                    <ArrowUpRight className="w-6 h-6" />
                                                </div>
                                            </div>

                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                                    {project.tech?.slice(0, 3).map((t: string) => (
                                                        <span key={t} className="text-sm font-medium text-white/80">
                                                            {t} •
                                                        </span>
                                                    ))}
                                                </div>
                                                <h3 className={cn(
                                                    "font-heading font-bold mb-2 leading-tight",
                                                    isFeatured ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
                                                )}>
                                                    {project.title}
                                                </h3>
                                                <p className="text-white/70 text-lg line-clamp-2 max-w-xl">
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </section>

            <ContactCTA />
        </div>
    );
}
