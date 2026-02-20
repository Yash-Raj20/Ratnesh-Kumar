"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter, Instagram, ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatusWidget } from "@/components/ui/StatusWidget";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: "GitHub", icon: Github, href: "https://github.com" },
        { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
        { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
        { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
    ];

    const footerLinks = [
        {
            title: "Navigation",
            links: [
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Projects", href: "/projects" },
                { name: "Blog", href: "/blog" },
                { name: "Contact", href: "/contact" },
            ]
        },
        {
            title: "Services",
            links: [
                { name: "Web Development", href: "/services#web" },
                { name: "UI/UX Design", href: "/services#design" },
                { name: "Mobile Apps", href: "/services#mobile" },
                { name: "Consulting", href: "/services#consulting" },
            ]
        },
    ];

    return (
        <footer className="bg-zinc-950 text-zinc-200 border-t border-white/10 relative overflow-hidden">
            {/* Central Ripple Animation */}
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-12">
                <div className="relative w-full h-full max-w-[1200px] flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full border border-primary/20 bg-primary/5"
                            style={{
                                width: '80px',
                                height: '80px',
                                animation: `ripple 8s infinite linear`,
                                animationDelay: `${i * 1.8}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Inline styles for the ripple animation */}
            <style jsx>{`
                @keyframes ripple {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(30); opacity: 0; }
                }
            `}</style>

            <div className="container mx-auto px-6 py-8">
                <div className="flex justify-center mb-12 opacity-80 hover:opacity-100 transition-opacity">
                    <StatusWidget />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-white inline-block">
                            Ratnesh.
                        </Link>
                        <p className="text-zinc-400 leading-relaxed max-w-sm">
                            Crafting digital experiences that merge art with technology. Specialized in building scalable, performant, and beautiful web applications.
                        </p>
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-primary/50 hover:text-primary transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    {footerLinks.map((column) => (
                        <div key={column.title} className="lg:col-span-2 space-y-6">
                            <h4 className="text-lg font-medium text-white">{column.title}</h4>
                            <ul className="space-y-3">
                                {column.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary/0 group-hover:bg-primary transition-all duration-300" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Newsletter Column */}
                    <div className="lg:col-span-4 space-y-6">
                        <h4 className="text-lg font-medium text-white">Stay Updated</h4>
                        <p className="text-zinc-400 text-sm">
                            Subscribe to my newsletter for the latest updates on tech, design, and development.
                        </p>
                        <div className="space-y-3">
                            <div className="flex gap-2">
                                <div className="relative flex-grow">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-zinc-500 focus-visible:ring-primary/50 focus-visible:border-primary"
                                    />
                                </div>
                                <Button size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </div>
                            <p className="text-xs text-zinc-600">
                                By subscribing, you agree to our Privacy Policy. No spam, ever.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-zinc-500">
                            © {currentYear} Ratnesh. All rights reserved.
                        </p>

                    </div>
                    <div className="flex gap-6 text-sm text-zinc-500">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
