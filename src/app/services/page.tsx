"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Layout, Code as CodeIcon, Zap, Layers, Globe, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactCTA from "@/components/sections/ContactCTA";
import { useTranslation } from "react-i18next";
import { services } from "@/lib/data";

const iconMap: Record<string, any> = {
    Layout,
    Code: CodeIcon,
    Zap,
    Layers,
    Globe
};

export default function ServicesPage() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.refresh();

            // Hero Animation
            gsap.from(".hero-text", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Services List Animation
            const serviceItems = gsap.utils.toArray(".service-item");
            serviceItems.forEach((item: any, index) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="flex flex-col min-h-screen bg-background selection:bg-primary/20">
            {/* Hero Section */}
            <section className="pt-40 md:pt-60 pb-20 px-6 md:px-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-20 opacity-20 dark:opacity-5 blur-3xl pointer-events-none">
                    <div className="w-96 h-96 rounded-full bg-primary/50" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <h1 className="text-6xl md:text-9xl font-heading font-bold mb-8 leading-[0.8] animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        {t("servicesPage.hero.title")}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-12 animate-in fade-in slide-in-from-bottom-10 delay-200 duration-1000">
                        {t("servicesPage.hero.subtitle")}
                    </p>
                    <div className="hero-text h-px w-full max-w-sm bg-gradient-to-r from-primary/50 to-transparent" />
                </div>
            </section>

            {/* Services List */}
            <section className="py-20 px-6 md:px-20">
                <div className="max-w-7xl mx-auto space-y-32">
                    {services.map((service, index) => {
                        const Icon = iconMap[service.icon];
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={service.id}
                                className={`service-item flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
                            >
                                {/* Image / Visual Side */}
                                <div className="w-full lg:w-1/2 relative group">
                                    <div className="relative h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl">
                                        <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10" />
                                        <Image
                                            src={service.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"} // Fallback
                                            alt={t(`servicesPage.items.${service.id}.title`)}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />

                                        {/* Floating Badge */}
                                        <div className="absolute bottom-8 left-8 z-20 bg-white/10 backdrop-blur-md border border-white/20 px-6 py-4 rounded-2xl shadow-xl">
                                            <div className="flex items-center gap-3 text-white">
                                                {Icon && <Icon className="w-6 h-6" />}
                                                <span className="font-bold tracking-wide">{t(`servicesPage.items.${service.id}.title`)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative Pattern behind */}
                                    <div className={`absolute -bottom-10 -z-10 w-full h-full border border-primary/20 rounded-[2.5rem] ${isEven ? '-right-10' : '-left-10'}`} />
                                </div>

                                {/* Content Side */}
                                <div className="w-full lg:w-1/2">
                                    <div className="flex items-center gap-3 text-primary font-medium mb-6 uppercase tracking-wider text-sm">
                                        <span className="w-8 h-px bg-primary" />
                                        0{index + 1}
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">{t(`servicesPage.items.${service.id}.title`)}</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                        {t(`servicesPage.items.${service.id}.detailedDescription`)}
                                    </p>

                                    <div className="bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-3xl border border-border/50 mb-10">
                                        <h3 className="font-bold mb-6 flex items-center gap-2">
                                            <Layers className="w-5 h-5 text-primary" />
                                            {t("common.labels.included")}
                                        </h3>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {service.features?.map((feature, fIndex) => (
                                                <li key={fIndex} className="flex items-center text-sm text-foreground/80 gap-3">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500/10" />
                                                    {t(`servicesPage.items.${service.id}.features.${fIndex}`)}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <Button size="lg" className="rounded-full px-8 h-12 group" asChild>
                                        <Link href={`/services/${service.id}`}>
                                            {t(`servicesPage.items.${service.id}.startProject`)}
                                            <MoveRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
                <div className="bg-primary/5 rounded-[3rem] p-12 md:p-20 border border-primary/10 relative overflow-hidden group">
                    <div className="max-w-3xl mx-auto relative z-10">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 italic">{t("servicesPage.cta.title")}</h2>
                        <p className="text-xl text-muted-foreground mb-12">
                            {t("servicesPage.cta.description")}
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="h-16 px-10 rounded-full text-lg gap-2 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform bg-primary text-primary-foreground hover:bg-primary/90">
                                {t("servicesPage.cta.button")} <ArrowRight className="w-5 h-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
