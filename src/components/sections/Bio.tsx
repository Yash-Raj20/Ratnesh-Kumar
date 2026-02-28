"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const statsKeys = [
    { label: "bio.stats.exp", value: "8+" },
    { label: "bio.stats.projects", value: "50+" },
    { label: "bio.stats.clients", value: "30+" },
    { label: "bio.stats.awards", value: "12" },
];

export default function Bio() {
    const { t } = useTranslation();
    return (
        <section className="min-h-screen pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto flex flex-col justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                <div className="space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">{t("bio.title")}</h2>
                        <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] tracking-tight">
                            {t("bio.heading1")} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">{t("bio.heading2")}</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-6 text-xl text-muted-foreground leading-relaxed"
                    >
                        <p>
                            {t("bio.para1")}
                        </p>
                        <p>
                            {t("bio.para2")}
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-6 border-t border-border/40"
                    >
                        {statsKeys.map((stat, index) => (
                            <div key={index} className="space-y-1">
                                <h3 className="text-3xl font-bold font-heading text-foreground">{stat.value}</h3>
                                <p className="text-sm text-muted-foreground uppercase tracking-wider">{t(stat.label)}</p>
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
