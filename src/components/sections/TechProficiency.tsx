"use client";

import { motion } from "framer-motion";
import { Code, Server, Database, Layout, Smartphone, GitBranch, Terminal, Cpu, Globe, Layers } from "lucide-react";

const skillCategories = [
    {
        title: "Frontend Engineering",
        icon: Layout,
        description: "Building immersive, pixel-perfect user interfaces.",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "Redux"]
    },
    {
        title: "Backend & Architecture",
        icon: Server,
        description: "Designing scalable and secure server-side systems.",
        skills: ["Node.js", "Express", "PostgreSQL", "GraphQL", "Prisma", "Redis", "Serverless", "Microservices"]
    },
    {
        title: "Mobile & Cross-Platform",
        icon: Smartphone,
        description: "Crafting native-like experiences for mobile devices.",
        skills: ["React Native", "Expo", "iOS", "Android", "PWA"]
    },
    {
        title: "Design & Creative",
        icon: Layers,
        description: "Bridging the gap between design and code.",
        skills: ["Figma", "UI/UX", "Prototyping", "Design Systems", "Adobe XD"]
    },
    {
        title: "DevOps & Tools",
        icon: Terminal,
        description: "Streamlining development and deployment workflows.",
        skills: ["Git", "Docker", "AWS", "CI/CD", "Vercel", "Jest", "Webpack"]
    },
    {
        title: "Core Concepts",
        icon: Cpu,
        description: "Deep understanding of computer science fundamentals.",
        skills: ["Data Structures", "Algorithms", "System Design", "OOP", "Performance Optimization"]
    }
];

export default function TechProficiency() {
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
                    <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary">Technical Arsenal</h2>
                    <h3 className="text-3xl md:text-4xl font-heading font-bold">
                        Tools I use to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">build the future.</span>
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
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

                                <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{category.title}</h4>
                                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                    {category.description}
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
