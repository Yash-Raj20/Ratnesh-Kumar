"use client";

import { motion } from "framer-motion";

const timelineData = [
    { year: "2023 - Present", title: "Senior Frontend Engineer", subtitle: "TechFlow", description: "Leading the frontend team, establishing design systems, and migrating legacy codebases to Next.js." },
    { year: "2021 - 2023", title: "Frontend Developer", subtitle: "Creative Studios", description: "Built award-winning experiential websites for major brands using WebGL and GSAP." },
    { year: "2020 - 2021", title: "Junior Developer", subtitle: "StartUp Inc", description: "Collaborated on the launch of a fintech mobile app, focusing on UI implementation." },
    { year: "2016 - 2020", title: "B.Tech in Computer Science", subtitle: "University of Technology", description: "Specialized in Human-Computer Interaction and Web Technologies." },
];

export default function Timeline() {
    return (
        <section className="py-24 px-6 md:px-20 max-w-5xl mx-auto">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-sm font-medium uppercase tracking-widest text-muted-foreground mb-16 text-center"
            >
                My Journey
            </motion.h2>

            <div className="relative border-l border-border/40 ml-4 md:ml-0 space-y-12 md:space-y-0">
                {timelineData.map((item, index) => (
                    <div key={index} className="mb-8 md:mb-16 md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-8 relative group">
                        {/* Circle on the line */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="absolute left-[-21px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-muted-foreground group-hover:border-primary group-hover:bg-primary transition-colors z-10"
                        />

                        {/* Content - alternating sides for desktop */}
                        <div className={`pl-8 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:col-start-3 md:pl-8'}`}>
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <span className="text-sm font-mono text-primary mb-2 block">{item.year}</span>
                                <h3 className="text-xl font-medium">{item.title}</h3>
                                <p className="text-muted-foreground font-medium mb-2">{item.subtitle}</p>
                                <p className="text-muted-foreground/80 text-sm leading-relaxed hidden md:block">{item.description}</p>
                            </motion.div>
                        </div>

                        {/* Mobile description (always shown below on mobile, hidden on desktop if we want to alternate description placement... but let's concise it) */}
                        <p className="pl-8 text-muted-foreground/80 text-sm leading-relaxed md:hidden mt-2">{item.description}</p>

                        {/* Empty column for grid balance */}
                        <div className="hidden md:block"></div>
                    </div>
                ))}
            </div>
        </section>
    );
}
