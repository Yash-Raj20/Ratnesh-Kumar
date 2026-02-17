"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogData";

gsap.registerPlugin(ScrollTrigger);

export default function Insights() {
    const containerRef = useRef<HTMLElement>(null);

    // Use only the first 3 posts for the "Featured" section
    const featuredInsights = blogPosts.slice(0, 3);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Force refresh to ensure correct start positions
            ScrollTrigger.refresh();

            // Use ScrollTrigger.batch for reliable grid animations
            ScrollTrigger.batch(".insight-card", {
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    overwrite: true,
                    duration: 0.6,
                    ease: "power2.out"
                }),
                start: "top 85%",
            });

            // Set initial state
            gsap.set(".insight-card", { y: 30, opacity: 0 });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-20 bg-zinc-50 dark:bg-zinc-900/10">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-4">Insights</h2>
                        <h3 className="text-4xl font-heading font-medium">Thoughts & Code</h3>
                    </div>
                    <Button variant="outline" size="sm" asChild className="rounded-full">
                        <Link href="/blog">Read All Articles</Link>
                    </Button>
                </div>

                <div className="space-y-4">
                    {featuredInsights.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="insight-card group block p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
                        >
                            <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-wider">
                                        <span className="text-primary font-medium">{post.category}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    </div>
                                    <h4 className="text-2xl font-medium group-hover:text-primary transition-colors">{post.title}</h4>
                                    <p className="text-muted-foreground max-w-2xl leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                </div>
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-white transition-colors" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
