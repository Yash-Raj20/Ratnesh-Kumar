"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileText, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import ElectricNodesBg from "@/components/ui/ElectricNodesBg";
import Link from "next/link";

export default function PrivacyPage() {
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const sections = [
        {
            id: "introduction",
            title: "1. Introduction",
            icon: FileText,
            content: (
                <p>
                    Welcome to my portfolio. I respect your privacy and am committed to protecting your personal data.
                    This privacy policy will inform you as to how I look after your personal data when you visit my website
                    (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
                </p>
            )
        },
        {
            id: "data-collection",
            title: "2. Data I Collect",
            icon: DatabaseIcon,
            content: (
                <>
                    <p>I may collect, use, store and transfer different kinds of personal data about you which I have grouped together follows:</p>
                    <ul className="list-none space-y-2 mt-4 ml-1">
                        {[
                            "Identity Data includes first name, last name, username or similar identifier.",
                            "Contact Data includes email address and telephone number (if provided via contact form).",
                            "Technical Data includes internet protocol (IP) address, your login data, browser type and version."
                        ].map((item, i) => (
                            <li key={i} className="flex gap-3 text-muted-foreground">
                                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </>
            )
        },
        {
            id: "usage",
            title: "3. How I Use Your Data",
            icon: Lock,
            content: (
                <>
                    <p>I will only use your personal data when the law allows me to. Most commonly, I will use your personal data in the following circumstances:</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2 text-muted-foreground marker:text-primary">
                        <li>Where I need to respond to your inquiries sent via the contact form.</li>
                        <li>Where it is necessary for my legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                    </ul>
                </>
            )
        },
        {
            id: "contact",
            title: "4. Contact Me",
            icon: Mail,
            content: (
                <p>
                    If you have any questions about this privacy policy or my privacy practices, please contact me at: <a href="mailto:hello@ratnesh.dev" className="text-primary hover:underline">hello@ratnesh.dev</a>
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
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            {/* Header */}
            <div className="max-w-7xl mx-auto mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
                        <Shield className="w-3 h-3" /> Last Updated: {lastUpdated}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Privacy Policy</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Transparency is key. Here's how I handle your data with care and respect.
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
                                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-primary transition-all duration-300 flex items-center gap-3 group"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                                    {section.title}
                                </button>
                            ))}
                        </nav>
                        <div className="mt-8 pt-8 border-t border-border/50">
                            <Link href="/contact" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline group">
                                Have questions? Contact me <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <section.icon className="w-5 h-5" />
                                </div>
                                <h2 className="text-2xl font-bold font-heading">{section.title}</h2>
                            </div>
                            <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-bold prose-a:text-primary">
                                {section.content}
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>
        </div>
    );
}

function DatabaseIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
        </svg>
    )
}
