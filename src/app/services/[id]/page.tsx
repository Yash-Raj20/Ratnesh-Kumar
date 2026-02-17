"use client";

import { useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { services, projects } from "@/lib/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CheckCircle2, ArrowRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactCTA from "@/components/sections/ContactCTA";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function ServiceDetail() {
    const { id } = useParams();
    const router = useRouter();
    // Use type assertion or access properties safely if the type definition isn't updated yet
    const service: any = services.find((s) => s.id === id);
    const containerRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);

    // Find next service for navigation
    const currentIndex = services.findIndex(s => s.id === id);
    const nextService = services[(currentIndex + 1) % services.length];

    useEffect(() => {
        if (!service) return;

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

            // Process Cards Animation
            gsap.from(".process-step", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".process-section",
                    start: "top 70%",
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [service]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-heading font-bold">Service Not Found</h1>
                    <Button asChild variant="outline">
                        <Link href="/services">Back to Services</Link>
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-background selection:bg-primary/20">
            {/* Hero Section */}
            <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
                <div ref={heroImageRef} className="absolute inset-0 h-[120%] w-full">
                    <Image
                        src={service.image || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"}
                        alt={service.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-20 flex flex-col justify-end pb-40">
                    <Link href="/services" className="hero-element inline-flex items-center text-white/70 hover:text-primary transition-colors mb-8 group w-fit">
                        <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Services
                    </Link>
                    <h1 className="hero-element text-5xl md:text-8xl font-heading font-bold text-white mb-8">
                        {service.title}
                    </h1>
                    <p className="hero-element text-xl md:text-2xl text-white/80 max-w-3xl leading-relaxed font-light">
                        {service.description}
                    </p>
                </div>
            </div>

            {/* Overview Section */}
            <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-8">
                        <h2 className="text-3xl font-bold mb-8">Overview</h2>
                        <p className="text-xl leading-relaxed text-muted-foreground mb-12">
                            {service.detailedDescription}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {service.features?.map((feature: string) => (
                                <div key={feature} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-border/50">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                    </div>
                                    <span className="font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="bg-zinc-900 text-white rounded-[2rem] p-8 md:p-10 sticky top-32">
                            <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                                Technologies
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {service.tools?.map((tool: string) => (
                                    <span key={tool} className="px-4 py-2 rounded-full bg-white/10 border border-white/10 text-sm font-medium hover:bg-white/20 transition-colors cursor-default">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-12 pt-8 border-t border-white/10">
                                <p className="text-white/60 text-sm mb-6">Need a custom stack?</p>
                                <Button className="w-full rounded-full bg-white text-black hover:bg-zinc-200" asChild>
                                    <Link href="/contact">Let's Discuss</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            {service.process && (
                <section className="process-section py-24 bg-zinc-50 dark:bg-zinc-900/20 border-y border-border/50">
                    <div className="max-w-7xl mx-auto px-6 md:px-20">
                        <div className="text-center mb-16">
                            <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">How It Works</h2>
                            <h3 className="text-4xl md:text-5xl font-heading font-bold">Our Process</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {service.process.map((step: any, index: number) => (
                                <div key={index} className="process-step relative group">
                                    <div className="mb-6 text-6xl font-heading font-bold text-black/5 dark:text-white/5 group-hover:text-primary/10 transition-colors duration-500">
                                        0{index + 1}
                                    </div>
                                    <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                    {index < service.process.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 right-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent translate-x-1/2" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Selected Work Section */}
            <section className="py-24 max-w-7xl mx-auto px-6 md:px-20">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">Selected Work</h2>
                        <h3 className="text-4xl md:text-5xl font-heading font-bold">Featured Projects</h3>
                    </div>
                    <Button variant="outline" asChild className="rounded-full">
                        <Link href="/projects">View All Work</Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {(() => {
                        const relatedProjects = projects.filter((p: any) =>
                            p.category.toLowerCase().includes(service.title.toLowerCase()) ||
                            service.title.toLowerCase().includes(p.category.toLowerCase()) ||
                            (service.id === 'development' && p.category === 'Development') ||
                            (service.id === 'web-design' && p.category === 'Web Design')
                        ).slice(0, 2);

                        // If no related projects, show top 2 general projects
                        const displayProjects = relatedProjects.length > 0 ? relatedProjects : projects.slice(0, 2);

                        return displayProjects.map((project: any, index: number) => (
                            <Link href={`/projects/${project.id}`} key={project.id} className="group block relative overflow-hidden rounded-[2rem] aspect-[4/3] border border-border/50">
                                <Image
                                    // Use a placeholder if no project image is mapped, or map to random unsplash for demo
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-primary font-medium mb-2">{project.category}</p>
                                        <h4 className="text-3xl font-bold text-white mb-4">{project.title}</h4>
                                        <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                            {project.tech?.slice(0, 3).map((t: string) => (
                                                <span key={t} className="px-3 py-1 rounded-full bg-white/20 text-white text-xs backdrop-blur-md">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ));
                    })()}
                </div>
            </section>

            {/* Testimonials Snippet */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900/20 border-t border-border/50">
                <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
                    <h2 className="text-3xl font-bold mb-12">What Clients Say</h2>
                    <div className="max-w-4xl mx-auto bg-background p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-primary/5 relative">
                        <Quote className="absolute top-12 left-12 w-10 h-10 text-primary/10 rotate-180" />
                        <p className="text-xl md:text-2xl leading-relaxed font-medium text-foreground/80 relative z-10">
                            "Ratnesh is simply one of the best developers I have worked with. The attention to detail in the {service.title.toLowerCase()} was outstanding, and the final delivery exceeded our expectations."
                        </p>
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                J
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold">Jonathan Doe</h4>
                                <div className="flex text-primary text-xs">
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            {service.faqs && (
                <section className="py-24 px-6 md:px-20 max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">F.A.Q</h2>
                        <h3 className="text-3xl md:text-5xl font-heading font-bold">Common Questions</h3>
                    </div>

                    <Accordion className="w-full relative z-10 space-y-4">
                        {service.faqs.map((faq: any, index: number) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-none">
                                <AccordionTrigger className="text-lg md:text-xl font-medium hover:text-primary transition-colors py-6 text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-6">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </section>
            )}

            {/* Next Service Navigation */}
            {nextService && (
                <section className="py-32 border-t border-border/40 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors duration-500 overflow-hidden relative group">
                    <Link href={`/services/${nextService.id}`} className="block relative z-10">
                        <div className="max-w-7xl mx-auto px-6 md:px-20 text-center">
                            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-6">Next Service</p>
                            <h3 className="text-5xl md:text-8xl font-heading font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-purple-500 transition-all duration-500">
                                {nextService.title}
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
