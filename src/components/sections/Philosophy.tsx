"use client";

import { motion } from "framer-motion";
import { Zap, Eye, Heart, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";

const philosophies = [
    { icon: Zap, key: "0" },
    { icon: Eye, key: "1" },
    { icon: Heart, key: "2" },
    { icon: Layers, key: "3" }
];

export default function Philosophy() {
    const { t } = useTranslation();
    return (
        <section className="py-24 px-6 md:px-20 bg-zinc-50 dark:bg-zinc-900/30">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-16 text-center"
                >
                    {t("philosophy.title")}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {philosophies.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-background border border-border/50 hover:border-primary/30 transition-colors shadow-sm"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-medium mb-3">{t(`philosophy.items.${item.key}.title`)}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {t(`philosophy.items.${item.key}.description`)}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
