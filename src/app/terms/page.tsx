"use client";

import { motion } from "framer-motion";
import { Scale, Gavel, UserCheck, AlertTriangle, FileText, ArrowRight } from "lucide-react";
import ElectricNodesBg from "@/components/ui/ElectricNodesBg";
import Link from "next/link";

export default function TermsPage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const sections = [
        {
            id: "agreement",
            title: "1. Agreement to Terms",
            icon: Scale,
            content: (
                <p>
                    By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                    If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </p>
            )
        },
        {
            id: "ip",
            title: "2. Intellectual Property",
            icon: FileText,
            content: (
                <p>
                    Unless otherwise indicated, the Site is my proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are owned or controlled by me or licensed to me, and are protected by copyright and trademark laws.
                </p>
            )
        },
        {
            id: "user-reps",
            title: "3. User Representations",
            icon: UserCheck,
            content: (
                <p>
                    By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
                </p>
            )
        },
        {
            id: "limitations",
            title: "4. Limitations",
            icon: AlertTriangle,
            content: (
                <p>
                    In no event shall Ratnesh or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ratnesh's website.
                </p>
            )
        },
        {
            id: "governing-law",
            title: "5. Governing Law",
            icon: Gavel,
            content: (
                <p>
                    These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </p>
            )
        }
    ];

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100; // Height of sticky header/offset
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 md:px-20 relative overflow-hidden bg-background">
            <ElectricNodesBg />
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-500/20">
                        <Scale className="w-3 h-3" /> Last Updated: {lastUpdated}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Terms of Service</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Please read these terms carefully before using my portfolio website.
                    </p>
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-4 hidden lg:block">
                    <div className="sticky top-32 p-6 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-border/50 backdrop-blur-sm">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4 pl-3">Table of Contents</h3>
                        <nav className="space-y-1">
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-indigo-500/5 hover:text-indigo-500 transition-all duration-300 flex items-center gap-3 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-indigo-500 transition-colors" />
                                    {section.title}
                                </button>
                            ))}
                        </nav>
                        <div className="mt-8 pt-8 border-t border-border/50">
                            <Link href="/contact" className="flex items-center gap-2 text-sm font-medium text-indigo-500 hover:underline group">
                                Questions? Contact Support <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-8 space-y-12">
                    {sections.map((section, index) => (
                        <motion.section
                            key={section.id}
                            id={section.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-background border border-border/50 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-500"
                        >
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50">
                                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                    <section.icon className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-bold font-heading">{section.title}</h2>
                            </div>
                            <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-indigo-500">
                                {section.content}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>
        </div>
    );
}
