"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileText, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import ElectricNodesBg from "@/components/ui/ElectricNodesBg";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
    const { t } = useTranslation();
    const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const sections = [
        {
            id: "introduction",
            title: t('privacyPage.intro.title'),
            icon: FileText,
            content: (
                <p>
                    {t('privacyPage.intro.text')}
                </p>
            )
        },
        {
            id: "data-collection",
            title: t('privacyPage.data.title'),
            icon: DatabaseIcon,
            content: (
                <>
                    <p>{t('privacyPage.data.text')}</p>
                    <ul className="list-none space-y-2 mt-4 ml-1">
                        {[
                            t('privacyPage.data.list.0'),
                            t('privacyPage.data.list.1'),
                            t('privacyPage.data.list.2')
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
            title: t('privacyPage.usage.title'),
            icon: Lock,
            content: (
                <>
                    <p>{t('privacyPage.usage.text')}</p>
                    <ul className="list-disc pl-5 mt-4 space-y-2 text-muted-foreground marker:text-primary">
                        <li>{t('privacyPage.usage.list.0')}</li>
                        <li>{t('privacyPage.usage.list.1')}</li>
                    </ul>
                </>
            )
        },
        {
            id: "contact",
            title: t('privacyPage.contact.title'),
            icon: Mail,
            content: (
                <p>
                    {t('privacyPage.contact.text')} <a href="mailto:hello@ratnesh.dev" className="text-primary hover:underline">hello@ratnesh.dev</a>
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
        <div className="min-h-screen pt-40 md:pt-60 pb-20 px-6 md:px-20 relative overflow-hidden bg-background">
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
                        <Shield className="w-3 h-3" /> {t('privacyPage.lastUpdated')}: {lastUpdated}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">{t('privacyPage.title')}</h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('privacyPage.description')}
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
