"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import {
    Code, Server, Database, Layout, Smartphone, GitBranch, Terminal, Cpu, Globe, Layers,
    Zap, Eye, Heart, Coffee, Gamepad2, Plane, Music, Briefcase, GraduationCap,
    Monitor, Laptop, Mouse, Keyboard, BookOpen, Bookmark, PenTool
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ElectricNodesBg from "@/components/ui/ElectricNodesBg";
import { useTranslation } from "react-i18next";
import { portfolioData } from "@/data/portfolioData";

// --- COMPONENTS ---

const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
        const center = { x: left + width / 2, y: top + height / 2 };
        x.set((clientX - center.x) * 0.35);
        y.set((clientY - center.y) * 0.35);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default function AboutPage() {
    const containerRef = useRef(null);
    const { t } = useTranslation();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // --- DATA ---
    const stats = [
        { label: t("aboutPage.stats.exp"), value: "8+" },
        { label: t("aboutPage.stats.projects"), value: "50+" },
        { label: t("aboutPage.stats.clients"), value: "30+" },
        { label: t("aboutPage.stats.coffee"), value: "∞" },
    ];

    const timeline = [
        { year: t("timeline.items.0.year"), title: t("timeline.items.0.title"), subtitle: t("timeline.items.0.subtitle"), desc: t("timeline.items.0.description"), icon: Briefcase },
        { year: t("timeline.items.1.year"), title: t("timeline.items.1.title"), subtitle: t("timeline.items.1.subtitle"), desc: t("timeline.items.1.description"), icon: Code },
        { year: t("timeline.items.2.year"), title: t("timeline.items.2.title"), subtitle: t("timeline.items.2.subtitle"), desc: t("timeline.items.2.description"), icon: Smartphone },
        { year: t("timeline.items.3.year"), title: t("timeline.items.3.title"), subtitle: t("timeline.items.3.subtitle"), desc: t("timeline.items.3.description"), icon: GraduationCap },
    ];

    const philosophies = [
        { icon: Zap, title: t("philosophy.items.0.title"), desc: t("philosophy.items.0.description") },
        { icon: Eye, title: t("philosophy.items.1.title"), desc: t("philosophy.items.1.description") },
        { icon: Heart, title: t("philosophy.items.2.title"), desc: t("philosophy.items.2.description") },
        { icon: Layers, title: t("philosophy.items.3.title"), desc: t("philosophy.items.3.description") }
    ];

    const skills = [
        { category: t("techProficiency.categories.0.title"), icon: Layout, items: ["React", "Next.js", "TypeScript", "TailwindCSS", "Framer Motion", "Three.js"] },
        { category: t("techProficiency.categories.1.title"), icon: Server, items: ["Node.js", "PostgreSQL", "GraphQL", "Redis", "Serverless"] },
        { category: t("techProficiency.categories.3.title"), icon: Layers, items: ["Figma", "UI/UX", "Prototyping", "Design Systems"] },
        { category: t("techProficiency.categories.4.title"), icon: Terminal, items: ["Git", "Docker", "AWS", "CI/CD", "Vercel"] }
    ];

    const hobbies = [
        { icon: Gamepad2, label: t("aboutPage.personal.hobbies.gaming.label"), desc: t("aboutPage.personal.hobbies.gaming.desc") },
        { icon: Coffee, label: t("aboutPage.personal.hobbies.coffee.label"), desc: t("aboutPage.personal.hobbies.coffee.desc") },
        { icon: Plane, label: t("aboutPage.personal.hobbies.traveling.label"), desc: t("aboutPage.personal.hobbies.traveling.desc") },
        { icon: Music, label: t("aboutPage.personal.hobbies.music.label"), desc: t("aboutPage.personal.hobbies.music.desc") }
    ];

    const gear = [
        { icon: Laptop, name: 'MacBook Pro 16"', desc: 'M3 Max, 64GB RAM' },
        { icon: Monitor, name: 'LG Ultrafine 5K', desc: 'Crystal clear pixels' },
        { icon: Keyboard, name: 'Keychron Q1', desc: 'Gateron G Pro Brown' },
        { icon: Mouse, name: 'MX Master 3S', desc: 'Productivity beast' },
        { icon: Code, name: 'VS Code', desc: 'Theme: Tokyo Night' },
        { icon: PenTool, name: 'Figma', desc: t("aboutPage.gear.figmaDesc") },
    ];

    const books = [
        { title: "Clean Code", author: "Robert C. Martin", color: "bg-blue-500" },
        { title: "Refactoring UI", author: "Adam Wathan", color: "bg-purple-500" },
        { title: "The Pragmatic Programmer", author: "Andrew Hunt", color: "bg-amber-500" },
        { title: "Don't Make Me Think", author: "Steve Krug", color: "bg-emerald-500" },
    ];

    return (
        <div ref={containerRef} className="bg-background min-h-screen relative overflow-hidden">
            <ElectricNodesBg />

            {/* --- HERO SECTION --- */}
            <section className="min-h-screen pt-40 md:pt-60 pb-20 px-6 md:px-20 max-w-7xl mx-auto flex flex-col justify-center relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-6 flex items-center gap-2">
                            <span className="w-12 h-[2px] bg-primary"></span>
                            {t("aboutPage.hero.badge")}
                        </h2>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] text-balance mb-8">
                            {t("aboutPage.hero.heading1")} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-500 animate-gradient-x">{t("aboutPage.hero.heading2")}</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed max-w-lg mb-12">
                            {t("aboutPage.hero.description")}
                        </p>

                        <div className="flex flex-wrap gap-8 border-t border-border/50 pt-8">
                            {stats.map((stat, i) => (
                                <div key={i}>
                                    <h3 className="text-3xl font-bold font-heading">{stat.value}</h3>
                                    <p className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl shadow-primary/10 rotate-3 transition-transform hover:rotate-0 duration-500 group">
                            <Image
                                src="/profile.jpg"
                                alt="Ratnesh"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-6 left-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <p className="font-heading font-bold text-2xl">{portfolioData.about.name}</p>
                                <p className="text-sm opacity-80">{t("aboutPage.hero.role")}</p>
                            </div>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute top-10 -right-10 w-24 h-24 bg-primary rounded-full blur-[80px] -z-10 animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-600 rounded-full blur-[80px] -z-10 animate-pulse" style={{ animationDelay: '1s' }} />
                    </motion.div>
                </div>
            </section>

            {/* --- PHILOSOPHY (BENTO) --- */}
            <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">{t("aboutPage.philosophy.badge")}</h2>
                    <h3 className="text-3xl md:text-5xl font-heading font-bold">{t("aboutPage.philosophy.title")}</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {philosophies.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-border/50 hover:border-primary/30 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-all duration-300 group hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- TIMELINE (JOURNEY) --- */}
            <section className="py-24 px-6 md:px-20 bg-zinc-50/50 dark:bg-zinc-900/30 border-y border-border/40">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16 text-center"
                    >
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">{t("aboutPage.journey.badge")}</h2>
                        <h3 className="text-3xl md:text-5xl font-heading font-bold">{t("aboutPage.journey.title")}</h3>
                    </motion.div>

                    <div className="relative border-l-2 border-border/50 ml-6 space-y-12">
                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="relative pl-8 md:pl-12"
                            >
                                {/* Dot */}
                                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 shadow-[0_0_0_4px_rgba(var(--background),1)] group-hover:scale-125 transition-transform" />

                                <div className="flex flex-col md:flex-row gap-6 md:items-start group">
                                    <div className="md:w-32 shrink-0">
                                        <span className="text-sm font-bold font-mono text-primary/80 py-1 px-3 rounded-full bg-primary/5 border border-primary/10 inline-block">{item.year}</span>
                                    </div>
                                    <div className="bg-background border border-border/50 p-6 rounded-2xl shadow-sm flex-1 group-hover:border-primary/30 transition-all duration-300 group-hover:translate-x-2">
                                        <div className="flex items-center gap-3 mb-2">
                                            <item.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                            <h4 className="text-xl font-bold">{item.title}</h4>
                                        </div>
                                        <p className="text-base font-medium text-foreground/80 mb-2">{item.subtitle}</p>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TECH ARSENAL --- */}
            <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">{t("aboutPage.toolkit.badge")}</h2>
                    <h3 className="text-3xl md:text-5xl font-heading font-bold">{t("aboutPage.toolkit.title")}</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {skills.map((category, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-zinc-50 dark:bg-zinc-900 border border-border/50 hover:border-primary/40 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <category.icon className="w-5 h-5" />
                                </div>
                                <h4 className="font-bold text-lg">{category.category}</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {category.items.map(skill => (
                                    <span key={skill} className="text-xs font-medium px-2.5 py-1 rounded-md bg-background border border-border/60 text-muted-foreground hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-colors">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- MY GEAR & LEARNING (NEW PREMIUM SECTIONS) --- */}
            <section className="py-24 px-6 md:px-20 bg-zinc-950 text-white relative overflow-hidden rounded-[3rem] mx-4 md:mx-8 mb-20 shadow-2xl">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* GEAR */}
                        <div>
                            <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                                <Cpu className="w-6 h-6 text-indigo-400" /> My Gear
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {gear.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: i * 0.05 }}
                                        viewport={{ once: true }}
                                        className="bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors"
                                    >
                                        <item.icon className="w-5 h-5 text-indigo-300 mb-3" />
                                        <h4 className="font-bold text-sm">{item.name}</h4>
                                        <p className="text-xs text-white/50">{item.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* LEARNING */}
                        <div>
                            <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                                <BookOpen className="w-6 h-6 text-purple-400" /> Continuous Learning
                            </h3>
                            <div className="space-y-4">
                                {books.map((book, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                        className="group flex gap-4 items-center p-4 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                                    >
                                        <div className={`w-10 h-14 ${book.color} rounded-sm shadow-lg shrink-0 group-hover:scale-110 transition-transform`} />
                                        <div>
                                            <h4 className="font-bold">{book.title}</h4>
                                            <p className="text-sm text-white/50">{book.author}</p>
                                        </div>
                                        <Button size="icon" variant="ghost" className="ml-auto text-white/20 group-hover:text-white">
                                            <Bookmark className="w-4 h-4" />
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
                                <p className="text-sm text-white/70 italic">
                                    {t("aboutPage.learning.quote")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- BEYOND THE SCREEN --- */}
            <section className="py-24 px-6 md:px-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">{t("aboutPage.personal.badge")}</h2>
                    <h2 className="text-3xl font-heading font-bold mb-12">{t("aboutPage.personal.title")}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {hobbies.map((hobby, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center gap-4 bg-background p-6 rounded-3xl border border-border/40 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                            >
                                <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-primary text-2xl group-hover:scale-110 transition-transform">
                                    <hobby.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h4 className="font-bold">{hobby.label}</h4>
                                    <p className="text-xs text-muted-foreground">{hobby.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA & SIGNATURE --- */}
            <section className="py-32 px-6 text-center relative">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8">{t("aboutPage.cta.title")}</h2>
                    <MagneticButton>
                        <Link href="/contact">
                            <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform bg-primary text-primary-foreground hover:bg-primary/90">
                                {t("aboutPage.cta.button")} <Globe className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </MagneticButton>
                </div>

                <div className="flex justify-center opacity-50">
                    <svg width="200" height="80" viewBox="0 0 200 80" className="stroke-primary fill-none stroke-2">
                        <motion.path
                            d="M10,50 Q40,10 70,50 T130,50 T190,50"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        <text x="50" y="60" className="fill-primary stroke-none font-handwriting text-2xl">Ratnesh</text>
                    </svg>
                </div>
            </section>

        </div>
    );
}
