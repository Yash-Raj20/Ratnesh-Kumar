"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
    { label: "Years Experience", value: "8+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Happy Clients", value: "30+" },
    { label: "Awards Won", value: "12" },
];

export default function Bio() {
    return (
        <section className="min-h-screen pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">The Person Behind The Code</h2>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] tracking-tight">
                            Design driven. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">Engineering focused.</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 text-xl text-muted-foreground leading-relaxed"
                    >
                        <p>
                            Hi, I'm Ratnesh. I sit at the intersection of design and engineering. My philosophy is simple: technology should be invisible, and experiences should be unforgettable.
                        </p>
                        <p>
                            With over 8 years of experience shipping production-grade software, I've learned that the secret to great products isn't just clean code or pretty pixels—it's how they work together to solve real human problems.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 border-t border-border/40"
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className="space-y-1">
                                <h3 className="text-3xl font-bold font-heading text-foreground">{stat.value}</h3>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative aspect-[3/4] w-full max-w-md mx-auto rounded-[2rem] overflow-hidden border border-border/50 shadow-2xl shadow-primary/5">
                        <Image
                            src="/profile.jpg"
                            alt="Ratnesh Portfolio"
                            fill
                            className="object-cover"
                            priority
                        />
                        {/* Gradient Overlay for text readability if needed, or just style */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay" />
                    </div>

                    {/* Abstract Shapes */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDelay: "1s" }} />
                </motion.div>
            </div>
        </section>
    );
}
