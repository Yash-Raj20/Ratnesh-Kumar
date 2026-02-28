"use client";

import { portfolioData } from "@/data/portfolioData";
import { useTranslation } from "react-i18next";


export default function WorkExperience() {
    const { t } = useTranslation();
    return (
        <section className="py-16 md:py-32 px-6 md:px-20 bg-zinc-50 dark:bg-zinc-900/10 relative z-0">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-16">{t("experience.title")}</h2>
                <div className="space-y-12">
                    {portfolioData.experience.map((exp, index) => (
                        <div key={index} className="group relative pl-8 border-l border-border/40 hover:border-primary/50 transition-colors">
                            <span className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700 group-hover:bg-primary transition-colors" />
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                                <h3 className="text-2xl font-medium">{t(`experience.items.${index}.company`)}</h3>
                                <span className="text-sm text-muted-foreground font-mono">{t(`experience.items.${index}.period`)}</span>
                            </div>
                            <p className="text-lg text-foreground/80 mb-2">{t(`experience.items.${index}.role`)}</p>
                            <p className="text-muted-foreground leading-relaxed max-w-2xl">{t(`experience.items.${index}.description`)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
