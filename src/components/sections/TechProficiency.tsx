"use client";

import { motion } from "framer-motion";
import { Code, Server, Database, Layout, Smartphone, GitBranch, Terminal, Cpu, Globe, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";

const skillCategories = [
    { key: "0", icon: Layout, skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "Redux"] },
    { key: "1", icon: Server, skills: ["Node.js", "Express", "PostgreSQL", "GraphQL", "Prisma", "Redis", "Serverless", "Microservices"] },
    { key: "2", icon: Smartphone, skills: ["React Native", "Expo", "iOS", "Android", "PWA"] },
    { key: "3", icon: Layers, skills: ["Figma", "UI/UX", "Prototyping", "Design Systems", "Adobe XD"] },
    { key: "4", icon: Terminal, skills: ["Git", "Docker", "AWS", "CI/CD", "Vercel", "Jest", "Webpack"] },
    { key: "5", icon: Cpu, skills: ["Data Structures", "Algorithms", "System Design", "OOP", "Performance Optimization"] }
];

export default function TechProficiency() {
    const { t } = useTranslation();
    return (
        <section className="py-24 px-6 md:px-20 bg-zinc-50/50 dark:bg-zinc-900/20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary">{t("techProficiency.title")}</h2>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold">
                        {t("techProficiency.heading1")}<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{t("techProficiency.heading2")}</span>
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative p-8 rounded-3xl bg-background border border-border/50 hover:border-primary/20 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
                        >
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                                    <category.icon className="w-6 h-6 text-primary" />
                                </div>

                                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{t(`techProficiency.categories.${category.key}.title`)}</h4>
                                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                    {t(`techProficiency.categories.${category.key}.description`)}
                                </p>


                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700/50 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary transition-all duration-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
