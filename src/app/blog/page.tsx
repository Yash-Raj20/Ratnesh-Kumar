"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Clock, User, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/data/blogData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import ContactCTA from "@/components/sections/ContactCTA";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPage() {
    const containerRef = useRef<HTMLElement>(null);
    const [hoveredPost, setHoveredPost] = useState<number | null>(null);

    // Sort posts by date if needed, for now taking the first as featured
    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header Animation
            const tl = gsap.timeline();
            tl.from(".blog-header-item", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power4.out"
            });

            // Featured Post Reveal
            gsap.from(".featured-post-container", {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out"
            });

            // Grid Items Reveal
            gsap.utils.toArray(".blog-card-item").forEach((item: any, i) => {
                gsap.from(item, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                    }
                });
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary/20">

            {/* Header Section */}
            <section className="pt-40 pb-20 px-6 md:px-20 max-w-7xl mx-auto text-center relative z-10">
                <div className="blog-header-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-xs font-semibold tracking-widest uppercase mb-6 text-primary">
                    <Sparkles className="w-3 h-3" />
                    <span>Thoughts & Perspectives</span>
                </div>
                <h1 className="blog-header-item text-6xl md:text-8xl font-heading font-bold mb-6 tracking-tight leading-[0.9]">
                    Insights <span className="text-muted-foreground font-serif italic font-light">&</span> Ideas
                </h1>
                <p className="blog-header-item text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    A curated collection of articles on design, engineering, and the future of digital experiences.
                </p>
            </section>

            {/* Featured Post */}
            <section className="px-6 md:px-20 max-w-7xl mx-auto mb-32 featured-post-container">
                <Link href={`/blog/${featuredPost.slug}`} className="group relative block overflow-hidden rounded-[2.5rem] bg-zinc-900 aspect-[16/9] md:aspect-[21/9]">
                    <div className="absolute inset-0">
                        <Image
                            src={featuredPost.image}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-60 group-hover:opacity-50"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    </div>

                    <div className="absolute inset-0 p-8 md:p-12 lg:p-16 flex flex-col justify-end text-white">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex items-center gap-4 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                <span className="px-3 py-1 rounded-full bg-primary text-xs font-bold uppercase tracking-wider text-primary-foreground">
                                    Featured
                                </span>
                                <span className="text-sm font-medium text-white/80 flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> {featuredPost.date}
                                </span>
                            </div>

                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 leading-tight max-w-4xl">
                                {featuredPost.title}
                            </h2>

                            <p className="text-lg text-white/70 max-w-2xl line-clamp-2 md:line-clamp-none mb-6">
                                {featuredPost.excerpt}
                            </p>

                            <div className="flex items-center gap-2 text-white/90 font-medium group/btn">
                                <span>Read Full Article</span>
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-primary transition-colors duration-300">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </section>

            {/* Main Layout: Sidebar + Grid */}
            <div className="px-6 md:px-20 max-w-7xl mx-auto pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Posts Grid */}
                    <div className="lg:col-span-8 space-y-16">
                        <div className="flex items-end justify-between border-b border-border/40 pb-4 mb-8">
                            <h3 className="text-2xl font-bold font-heading">Latest Articles</h3>
                            <span className="text-sm text-muted-foreground">{otherPosts.length} Articles</span>
                        </div>

                        <div className="grid grid-cols-1 gap-12">
                            {otherPosts.map((post) => (
                                <Link
                                    key={post.id}
                                    href={`/blog/${post.slug}`}
                                    className="blog-card-item group grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 items-start"
                                    onMouseEnter={() => setHoveredPost(post.id)}
                                    onMouseLeave={() => setHoveredPost(null)}
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="py-2">
                                        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
                                            {post.category}
                                            <span className="w-1 h-1 rounded-full bg-border" />
                                            <span className="text-muted-foreground font-normal normal-case flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            Read More
                                            <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredPost === post.id ? 'translate-x-1' : ''}`} />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Newsletter */}
                    <div className="lg:col-span-4 space-y-12">
                        {/* Categories - Could be dynamic later */}
                        <div className="p-8 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900/50 border border-border/50 sticky top-32">
                            <h4 className="font-bold text-lg mb-6">Topics</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Development", "Design", "Engineering", "UI/UX"].map(tag => (
                                    <Badge key={tag} variant="secondary" className="px-3 py-1.5 hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="mt-12 pt-12 border-t border-border/50">
                                <h4 className="font-bold text-lg mb-2">Subscribe</h4>
                                <p className="text-sm text-muted-foreground mb-4">Get the latest insights delivered to your inbox. No spam, ever.</p>
                                <div className="space-y-3">
                                    <Input placeholder="email@example.com" className="bg-background rounded-xl border-border/50" />
                                    <Button className="w-full rounded-xl">Subscribe</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ContactCTA />
        </main>
    );
}
