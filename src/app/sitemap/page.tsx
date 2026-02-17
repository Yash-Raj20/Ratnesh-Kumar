"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Home, User, Code, Briefcase, FileText, Mail,
    Smartphone, PenTool, Layout, Shield, FileCheck, Map, ArrowRight
} from "lucide-react";
import ElectricNodesBg from "@/components/ui/ElectricNodesBg";

export default function SitemapPage() {
    const sitemapData = [
        {
            category: "Main Navigation",
            description: "Core sections of the portfolio",
            items: [
                { name: "Home", href: "/", icon: Home, desc: "Landing page & overview" },
                { name: "About", href: "/about", icon: User, desc: "Bio, skills & journey" },
                { name: "Projects", href: "/projects", icon: Briefcase, desc: "Case studies & work" },
                { name: "Services", href: "/services", icon: Code, desc: "Offerings & process" },
                { name: "Blog", href: "/blog", icon: FileText, desc: "Thoughts & tutorials" },
                { name: "Contact", href: "/contact", icon: Mail, desc: "Get in touch" },
            ]
        },
        {
            category: "Services",
            description: "Specialized offerings",
            items: [
                { name: "Web Development", href: "/services#web", icon: Layout, desc: "React, Next.js sites" },
                { name: "UI/UX Design", href: "/services#design", icon: PenTool, desc: "Figma prototypes" },
                { name: "Mobile Apps", href: "/services#mobile", icon: Smartphone, desc: "iOS & Android" },
            ]
        },
        {
            category: "Legal & Utility",
            description: "Important documents",
            items: [
                { name: "Privacy Policy", href: "/privacy", icon: Shield, desc: "Data protection" },
                { name: "Terms of Service", href: "/terms", icon: FileCheck, desc: "Usage agreements" },
                { name: "Sitemap", href: "/sitemap", icon: Map, desc: "You are here" },
            ]
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-20 relative overflow-hidden bg-background">
            <ElectricNodesBg />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4">Structure</h2>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Sitemap</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        A complete overview of all pages available on this portfolio.
                    </p>
                </motion.div>

                <div className="space-y-20">
                    {sitemapData.map((section, sectionIndex) => (
                        <div key={section.category}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="mb-10 flex items-end gap-6 border-b border-border/50 pb-6"
                            >
                                <h3 className="text-3xl font-heading font-bold">{section.category}</h3>
                                <p className="text-muted-foreground pb-1">{section.description}</p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.items.map((item, i) => (
                                    <Link key={item.name} href={item.href} passHref>
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group bg-zinc-50/50 dark:bg-zinc-900/30 border border-border/50 hover:border-primary/30 p-6 rounded-3xl transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 flex items-start gap-4"
                                        >
                                            <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300">
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h4 className="font-bold text-lg group-hover:text-primary transition-colors">{item.name}</h4>
                                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                                                </div>
                                                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
