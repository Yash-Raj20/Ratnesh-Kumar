"use client";

import { useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { projects } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github, ArrowRight, CheckCircle2, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactCTA from "@/components/sections/ContactCTA";

export default function ProjectDetail() {
    const { id } = useParams();
    const router = useRouter();
    // Use type assertion or access properties safely if the type definition isn't updated yet
    const project: any = projects.find((p) => p.id === Number(id));
    const containerRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);

    // Find next project for navigation
    const currentIndex = projects.findIndex(p => p.id === Number(id));
    const nextProject = projects[(currentIndex + 1) % projects.length];

    useEffect(() => {
        if (!project) return;

        const ctx = gsap.context(() => {
            ScrollTrigger.refresh();

            // Parallax Hero Image
            if (heroImageRef.current) {
                gsap.to(heroImageRef.current, {
                    yPercent: 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }

            // Hero Text Animation
            gsap.from(".hero-element", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out",
                delay: 0.2
            });

            // Section Animations
            gsap.utils.toArray(".reveal-section").forEach((section: any) => {
                gsap.from(section, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    }
                });
            });

            // Feature Highlights Stagger
            gsap.from(".feature-card", {
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".features-grid",
                    start: "top 80%",
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [project]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-heading font-bold">Project Not Found</h1>
                    <Button asChild variant="outline">
                        <Link href="/projects">Back to Projects</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-background selection:bg-primary/20">
            {/* Hero Section */}
            <div className="relative h-[90vh] min-h-[700px] w-full overflow-hidden">
                <div ref={heroImageRef} className="absolute inset-0 h-[120%] w-full">
                    <Image
                        src={project.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />

                <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-20 flex flex-col justify-end pb-32">
                    <Link href="/projects" className="hero-element inline-flex items-center text-white/70 hover:text-primary transition-colors mb-8 group w-fit">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to All Projects
                    </Link>
                    <div className="hero-element mb-6 flex flex-wrap gap-4">
                        <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-medium">
                            {project.category}
                        </span>
                        <span className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm font-medium">
                            {project.year}
                        </span>
                    </div>
                    <h1 className="hero-element text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-8 leading-[0.9] tracking-tight">
                        {project.title}
                    </h1>
                </div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-6 md:px-20 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-24">

                        {/* Intro */}
                        <section className="reveal-section">
                            <h2 className="text-3xl md:text-4xl font-light leading-snug text-foreground/90 font-heading">
                                {project.description}
                            </h2>
                        </section>

                        {/* Challenge & Solution Grid */}
                        {project.details && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <section className="reveal-section p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/40 border border-border/50">
                                    <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-6">The Challenge</h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {project.details.problem}
                                    </p>
                                </section>

                                <section className="reveal-section p-8 rounded-[2rem] bg-zinc-900 text-white border border-zinc-800">
                                    <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white/50 mb-6">The Solution</h3>
                                    <p className="text-lg text-white/90 leading-relaxed">
                                        {project.details.solution}
                                    </p>
                                </section>
                            </div>
                        )}

                        {/* Key Features Section - Bento Grid Style */}
                        {project.features && (
                            <section className="reveal-section">
                                <h3 className="text-3xl font-heading font-bold mb-10">Key Features</h3>
                                <div className="features-grid grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {project.features.map((feature: string, index: number) => (
                                        <div key={index} className="feature-card flex items-start gap-4 p-6 rounded-3xl bg-white dark:bg-zinc-900/60 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <CheckCircle2 className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-lg mb-1">{feature}</h4>
                                                <p className="text-sm text-muted-foreground">Designed for impact and usability.</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Outcome Section */}
                        {project.details?.outcome && (
                            <section className="reveal-section">
                                <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-purple-600 p-10 md:p-16 text-white text-center">
                                    {/* Abstract shapes */}
                                    <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

                                    <div className="relative z-10">
                                        <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white/70 mb-6">The Outcome</h3>
                                        <p className="text-2xl md:text-4xl font-heading font-bold leading-tight">
                                            "{project.details.outcome}"
                                        </p>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="p-8 rounded-[2.5rem] bg-zinc-50/50 dark:bg-zinc-900/50 border border-border/50 backdrop-blur-md sticky top-32">
                            <h3 className="text-xl font-bold mb-8">Project Details</h3>

                            <div className="space-y-8">
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Role</p>
                                    <p className="font-medium text-lg">Lead Designer & Developer</p>
                                </div>
                                <div className="h-px bg-border/50" />
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-2">Timeline</p>
                                    <p className="font-medium text-lg">8 Weeks</p>
                                </div>
                                <div className="h-px bg-border/50" />
                                <div>
                                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-4">Tech Structure</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech?.map((t: string) => (
                                            <span key={t} className="px-3 py-1.5 rounded-xl bg-background border border-border/50 text-xs font-medium">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="h-px bg-border/50" />
                                <div className="flex flex-col gap-3 pt-2">
                                    <Button size="lg" className="w-full rounded-full gap-2 shadow-lg shadow-primary/20">
                                        <ExternalLink className="w-4 h-4" />
                                        Launch Project
                                    </Button>
                                    <Button size="lg" variant="outline" className="w-full rounded-full gap-2">
                                        <Github className="w-4 h-4" />
                                        View Code
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gallery Section */}
            {project.gallery && (
                <section className="reveal-section py-20 bg-zinc-900 overflow-hidden">
                    <div className="max-w-8xl mx-auto px-6 md:px-20">
                        <div className="mb-12 flex items-end justify-between">
                            <div>
                                <h3 className="text-sm font-medium uppercase tracking-[0.2em] text-white/50 mb-2">Showcase</h3>
                                <h2 className="text-4xl text-white font-heading font-bold">Project Gallery</h2>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {project.gallery.map((img: string, i: number) => (
                                <div key={i} className={`relative rounded-3xl overflow-hidden aspect-[4/3] ${i === 0 ? 'md:col-span-2 md:aspect-[16/9]' : ''} group`}>
                                    <Image
                                        src={img}
                                        alt={`Gallery ${i}`}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Client Testimonial */}
            {project.testimonial && (
                <section className="reveal-section py-32 px-6 md:px-20 max-w-5xl mx-auto text-center">
                    <div className="mb-8 flex justify-center text-primary">
                        <Quote className="w-12 h-12 fill-current opacity-20" />
                    </div>
                    <p className="text-3xl md:text-5xl font-heading font-medium leading-tight mb-12">
                        "{project.testimonial.quote}"
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden relative">
                            <Image
                                src={project.testimonial.avatar}
                                alt={project.testimonial.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-left">
                            <h4 className="font-bold text-lg">{project.testimonial.name}</h4>
                            <p className="text-muted-foreground">{project.testimonial.role}</p>
                        </div>
                    </div>
                    <div className="flex justify-center gap-1 mt-4 text-amber-500">
                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                </section>
            )}

            {/* Next Project Navigation */}
            {nextProject && (
                <section className="py-32 border-t border-border/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors duration-500 overflow-hidden relative group">
                    <Link href={`/projects/${nextProject.id}`} className="block relative z-10">
                        <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
                            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-6">Next Project</p>
                            <h3 className="text-5xl md:text-8xl font-heading font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 transition-all duration-500">
                                {nextProject.title}
                            </h3>
                            <div className="mt-8 flex justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                <div className="rounded-full bg-primary text-white p-4">
                                    <ArrowRight className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            <ContactCTA />
        </div>
    );
}
