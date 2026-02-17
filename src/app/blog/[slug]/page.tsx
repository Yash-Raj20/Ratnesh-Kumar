"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, Clock, Calendar, Share2, User, Tag, ArrowRight, BookOpen, ChevronUp, Twitter, Linkedin, Link as LinkIcon, ThumbsUp, X, Heart, Sparkles, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogData";
import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";

gsap.registerPlugin(ScrollTrigger);

export default function BlogPost() {
    const { slug } = useParams();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    // Find post
    const postIndex = blogPosts.findIndex((p) => p.slug === slug);
    const post = blogPosts[postIndex];
    const nextPost = blogPosts[(postIndex + 1) % blogPosts.length];

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const heroImageRef = useRef<HTMLDivElement>(null);

    // Reading Progress
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Table of Contents State
    const [toc, setToc] = useState<{ id: string; text: string }[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    // Bonus Features State
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
        if (!post) return;

        // Syntax Highlighting
        Prism.highlightAll();

        // Generate TOC from content string
        const headings = post.content.match(/<h2>(.*?)<\/h2>/g);
        if (headings) {
            const tocItems = headings.map((heading: string, index: number) => {
                const text = heading.replace(/<\/?[^>]+(>|$)/g, ""); // strip tags
                const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return { id, text };
            });
            setToc(tocItems);
        }

        // GSAP Animations
        const ctx = gsap.context(() => {
            // Parallax Hero
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

            // Text Reveal
            gsap.from(".hero-text", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.2
            });

            // Content Reveal
            gsap.from(".blog-content", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                delay: 0.6
            });

        }, containerRef);

        return () => ctx.revert();
    }, [post]);

    // Handle TOC click
    const scrollToHeading = (id: string) => {
        const elements = document.querySelectorAll("h2");
        elements.forEach((el) => {
            if (el.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === id) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    };

    // Update active TOC item on scroll
    useEffect(() => {
        if (!mounted) return;

        const handleScroll = () => {
            const headings = document.querySelectorAll("h2");
            let currentId = "";

            // Find the last heading that is above the "reading line" (e.g., 150px from top)
            headings.forEach((h2) => {
                const top = h2.getBoundingClientRect().top;
                if (top < 150) {
                    currentId = h2.textContent?.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "";
                }
            });

            if (currentId) {
                setActiveId(currentId);
            }
        };

        // Initial check
        handleScroll();

        // Add scroll listener with a small throttle/debounce if needed, 
        // but for now running it directly is usually fine for this complexity.
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);
    }, [mounted, post]);

    // Handle Like Interaction
    const handleLike = () => {
        if (!hasLiked) {
            setLikes(prev => prev + 1);
            setHasLiked(true);
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 2000);
        } else {
            setLikes(prev => prev - 1);
            setHasLiked(false);
        }
    };

    // Attach click listeners to images for lightbox
    useEffect(() => {
        if (!mounted) return;
        const images = document.querySelectorAll('.prose img');
        const handleImageClick = (e: Event) => {
            const src = (e.target as HTMLImageElement).currentSrc;
            setLightboxImage(src);
        };

        images.forEach(img => {
            img.addEventListener('click', handleImageClick);
            img.classList.add('cursor-zoom-in');
        });

        return () => {
            images.forEach(img => {
                img.removeEventListener('click', handleImageClick);
                img.classList.remove('cursor-zoom-in');
            });
        }
    }, [mounted, post]);


    if (!mounted) return null;
    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                    <Link href="/blog" className="text-primary hover:underline">Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <article ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-primary/20 relative">

            {/* Lightbox Modal */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
                        onClick={() => setLightboxImage(null)}
                    >
                        <div className="relative w-full h-full max-w-7xl max-h-[90vh]">
                            <Image
                                src={lightboxImage}
                                alt="Lightbox"
                                fill
                                className="object-contain"
                            />
                            <Button
                                className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70 text-white border-0"
                                size="icon"
                            >
                                <X className="w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-[0%]"
                style={{ scaleX }}
            />

            {/* Back Button (Floating) */}
            <div className="fixed top-24 left-6 z-40 hidden xl:block">
                <Link href="/blog" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-background/80 backdrop-blur border border-border/50 hover:border-primary/50 transition-colors shadow-sm group">
                    <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
            </div>

            {/* Floating Like Button (Mobile/Desktop) */}
            <motion.div
                className="fixed bottom-8 right-8 z-40"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2, type: "spring" }}
            >
                <div className="relative">
                    {showConfetti && (
                        <div className="absolute inset-0 -top-20 flex justify-center pointer-events-none">
                            <div className="text-4xl animate-bounce">🎉</div>
                        </div>
                    )}
                    <Button
                        onClick={handleLike}
                        size="lg"
                        className={`rounded-full shadow-2xl h-16 w-16 transition-all duration-300 ${hasLiked ? 'bg-primary text-primary-foreground scale-110' : 'bg-primary text-foreground border border-border/50 hover:border-primary'}`}
                    >
                        <div className="flex flex-col items-center gap-0.5">
                            <Heart className={`w-6 h-6 ${hasLiked ? 'fill-current' : ''}`} />
                            <span className="text-[10px] font-bold">{124 + likes}</span>
                        </div>
                    </Button>
                </div>
            </motion.div>

            {/* Hero Section */}
            <div className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
                <div ref={heroImageRef} className="absolute inset-0 h-[120%] w-full">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />

                <div className="relative z-10 h-full max-w-5xl mx-auto px-6 flex flex-col justify-end pb-32 items-center text-center">
                    <div className="hero-text mb-6">
                        <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold tracking-wider uppercase bg-white/10 text-white backdrop-blur-md border-white/20">
                            {post.category}
                        </Badge>
                    </div>
                    <h1 className="hero-text text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-[1.1] text-balance">
                        {post.title}
                    </h1>
                    <div className="hero-text flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm md:text-base">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden relative">
                                <Image src={post.author.image} alt={post.author.name} fill className="object-cover" />
                            </div>
                            <span className="font-medium text-white">{post.author.name}</span>
                        </div>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</span>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Sidebar (Left) - Share */}
                    <div className="hidden lg:flex lg:col-span-2 flex-col items-center gap-6 sticky top-32 h-fit">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground rotate-180 mb-2 vertical-rl">Share</p>
                        <Button size="icon" variant="outline" className="rounded-full w-10 h-10 border-border/50 hover:bg-twitter/10 hover:text-blue-400 transition-colors">
                            <Twitter className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="rounded-full w-10 h-10 border-border/50 hover:bg-linkedin/10 hover:text-blue-700 transition-colors">
                            <Linkedin className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="rounded-full w-10 h-10 border-border/50 hover:bg-primary/10 hover:text-primary transition-colors">
                            <LinkIcon className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Content (Center) */}
                    <div className="lg:col-span-7 blog-content">
                        {/* Abstract/Excerpt */}
                        <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground/80 mb-12 border-l-4 border-primary pl-6 py-2 italic">
                            {post.excerpt}
                        </p>

                        {/* Rich Text Content */}
                        <div
                            className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-border/50 prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 max-w-none prose-blockquote:border-l-primary prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Newsletter CTA Banner (Mid-content) */}
                        <div className="my-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-8 md:p-12 text-center">
                            <div className="absolute top-0 right-0 opacity-10">
                                <Sparkles className="w-64 h-64 -translate-y-1/2 translate-x-1/2" />
                            </div>
                            <div className="relative z-10 max-w-lg mx-auto">
                                <Mail className="w-10 h-10 mx-auto mb-4 opacity-80" />
                                <h3 className="text-2xl font-bold font-heading mb-3">Love this content?</h3>
                                <p className="text-white/70 mb-6">Join 5,000+ developers receiving exclusive insights and resources.</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Input placeholder="Enter your email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-full" />
                                    <Button className="rounded-full bg-white text-purple-900 hover:bg-white/90">
                                        Subscribe
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Tags */}
                        {post.tags && (
                            <div className="mt-8 pt-8 border-t border-border/40">
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="rounded-full px-4 py-1.5 text-sm font-normal bg-zinc-100 dark:bg-zinc-800 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                                            # {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Author Bio Box */}
                        <div className="mt-16 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/40 border border-border/50 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-primary/20 shrink-0">
                                <Image src={post.author.image} alt={post.author.name} width={80} height={80} className="object-cover w-full h-full" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg mb-1">Written by {post.author.name}</h3>
                                <p className="text-sm text-primary font-medium mb-3">{post.author.role}</p>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Passionate about building accessible and performant web experiences.
                                    Constantly exploring new technologies and sharing insights with the community.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Table of Contents (Right) */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-32 space-y-8">
                            {toc.length > 0 && (
                                <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 border border-border/50 backdrop-blur-sm">
                                    <h4 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" /> On this page
                                    </h4>
                                    <nav className="flex flex-col gap-2">
                                        {toc.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => scrollToHeading(item.id)}
                                                className={`text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-300 border-l-2 ${activeId === item.id
                                                    ? "border-primary text-primary bg-primary/5 font-medium"
                                                    : "border-transparent text-muted-foreground hover:text-foreground hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                                    }`}
                                            >
                                                {item.text}
                                            </button>
                                        ))}
                                    </nav>
                                </div>
                            )}

                            {/* Related Article Teaser */}
                            <div className="p-6 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden">
                                <div className="relative z-10">
                                    <p className="text-xs font-bold uppercase tracking-wider opacity-70 mb-2">Next Read</p>
                                    <h4 className="font-bold text-lg leading-tight mb-4">{nextPost.title}</h4>
                                    <Link href={`/blog/${nextPost.slug}`} className="inline-flex items-center text-sm font-medium hover:underline">
                                        Read Now <ArrowRight className="ml-1 w-3 h-3" />
                                    </Link>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Read Next Full Section */}
            <section className="py-24 bg-zinc-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="container max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <p className="text-sm font-medium uppercase tracking-widest text-primary mb-6">Up Next</p>
                    <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">{nextPost.title}</h2>
                    <p className="text-lg text-white/60 mb-10 max-w-2xl mx-auto">{nextPost.excerpt}</p>
                    <Button asChild size="lg" className="rounded-full text-base px-8 py-6">
                        <Link href={`/blog/${nextPost.slug}`}>
                            Continue Reading <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </Button>
                </div>
            </section>

        </article>
    );
}
