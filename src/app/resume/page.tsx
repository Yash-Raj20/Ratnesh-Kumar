"use client";

import { motion } from "framer-motion";
import { FileText, Download, Eye, Briefcase, GraduationCap, Code, Globe, Mail, Phone, MapPin, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ElectricNodesBg from "@/components/ui/ElectricNodesBg";
import { useState } from "react";

const resumes = [
    {
        id: 1,
        title: "Frontend Developer",
        file: "/resume/Frontend Resume.pdf",
        description: "Specialized in React, Next.js, and modern UI engineering.",
        date: "Feb 2026"
    },
    {
        id: 2,
        title: "React Native Developer",
        file: "/resume/React Native Resume.pdf",
        description: "Focus on cross-platform mobile application development.",
        date: "Jan 2026"
    }
];

const experience = [
    {
        company: "TechFlow",
        role: "Senior Frontend Engineer",
        period: "2023 - Present",
        description: "Leading the frontend team, establishing design systems, and migrating legacy codebases to Next.js. Improved site performance by 40%.",
        technologies: ["Next.js", "TypeScript", "Tailwind", "AWS"]
    },
    {
        company: "Creative Studios",
        role: "Frontend Developer",
        period: "2021 - 2023",
        description: "Built award-winning experiential websites for major brands using WebGL and GSAP. Collaborated closely with designers to implement pixel-perfect UIs.",
        technologies: ["React", "GSAP", "Three.js", "WebGL"]
    },
    {
        company: "StartUp Inc",
        role: "Junior Developer",
        period: "2020 - 2021",
        description: "Key member of the launch team for a fintech mobile app. Implemented core UI components and integrated RESTful APIs.",
        technologies: ["React Native", "Redux", "Firebase"]
    }
];

const education = [
    {
        school: "University of Technology",
        degree: "B.Tech in Computer Science",
        period: "2016 - 2020",
        description: "Specialized in Human-Computer Interaction. heavy focus on Algorithms and Data Structures."
    }
];

const skills = [
    { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Python", "HTML5", "CSS3"] },
    { category: "Frameworks", items: ["React", "Next.js", "React Native", "Express", "Tailwind CSS"] },
    { category: "Tools", items: ["Git", "Docker", "Figma", "VS Code", "Webpack", "Vite"] },
    { category: "Platform", items: ["Vercel", "AWS", "Firebase", "Netlify"] }
];

export default function ResumePage() {
    const [activeTab, setActiveTab] = useState<'digital' | 'files'>('digital');

    const handlePrint = () => {
        window.print();
    };

    return (
        <section className="min-h-screen pt-32 pb-20 px-6 md:px-20 bg-zinc-50/50 dark:bg-background text-foreground relative print:pt-0 print:pb-0 print:bg-white print:text-black">
            <div className="print:hidden">
                <ElectricNodesBg />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
            </div>

            <div className="max-w-5xl mx-auto">
                {/* Header & Controls */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 print:hidden">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-2">Resume</h1>
                        <p className="text-muted-foreground">My professional journey and qualifications.</p>
                    </div>
                    <div className="flex gap-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-full border border-border/50">
                        <button
                            onClick={() => setActiveTab('digital')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'digital' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Digital View
                        </button>
                        <button
                            onClick={() => setActiveTab('files')}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'files' ? 'bg-primary text-primary-foreground shadow-lg' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            PDF Files
                        </button>
                    </div>
                </div>

                {activeTab === 'digital' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-background dark:bg-zinc-900 border border-border/50 rounded-[2rem] shadow-2xl p-8 md:p-16 print:border-none print:shadow-none print:p-0 print:rounded-none"
                    >
                        {/* Resume Header */}
                        <div className="border-b border-border/50 pb-12 mb-12 flex flex-col md:flex-row justify-between gap-8 items-start">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 print:text-black">Ratnesh</h1>
                                <p className="text-xl text-primary font-medium mb-6 print:text-black">Senior Full Stack Engineer</p>
                                <p className="text-muted-foreground max-w-lg leading-relaxed print:text-gray-600">
                                    Product-minded developer with 8+ years of experience building scalable web applications. Obsessed with performance, clean code, and user experience.
                                </p>
                            </div>
                            <div className="flex flex-col gap-3 text-sm text-muted-foreground print:text-gray-600">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-4 h-4" /> hello@ratnesh.dev
                                </div>
                                <div className="flex items-center gap-3">
                                    <Globe className="w-4 h-4" /> www.ratnesh.dev
                                </div>
                                <div className="flex items-center gap-3">
                                    <MapPin className="w-4 h-4" /> India (Remote)
                                </div>
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-4 h-4" /> Available for hire
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 print:grid-cols-3">
                            {/* Main Column */}
                            <div className="lg:col-span-2 space-y-12">
                                {/* Experience */}
                                <section>
                                    <h3 className="text-lg font-bold uppercase tracking-widest text-primary mb-8 flex items-center gap-3 print:text-black">
                                        <Briefcase className="w-5 h-5" /> Experience
                                    </h3>
                                    <div className="space-y-10 border-l-2 border-border/50 ml-2 pl-8 relative">
                                        {experience.map((job, i) => (
                                            <div key={i} className="relative">
                                                <span className="absolute -left-[39px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary" />
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                                                    <h4 className="text-xl font-bold print:text-black">{job.role}</h4>
                                                    <span className="text-sm font-mono text-muted-foreground print:text-gray-500">{job.period}</span>
                                                </div>
                                                <p className="text-primary/80 font-medium mb-3 print:text-black">{job.company}</p>
                                                <p className="text-muted-foreground leading-relaxed mb-4 print:text-gray-600">{job.description}</p>
                                                <div className="flex flex-wrap gap-2">
                                                    {job.technologies.map(tech => (
                                                        <span key={tech} className="text-xs px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 print:border print:border-gray-300 print:bg-white">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Education */}
                                <section>
                                    <h3 className="text-lg font-bold uppercase tracking-widest text-primary mb-8 flex items-center gap-3 print:text-black">
                                        <GraduationCap className="w-5 h-5" /> Education
                                    </h3>
                                    <div className="space-y-8">
                                        {education.map((edu, i) => (
                                            <div key={i}>
                                                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-2">
                                                    <h4 className="text-xl font-bold print:text-black">{edu.school}</h4>
                                                    <span className="text-sm font-mono text-muted-foreground print:text-gray-600">{edu.period}</span>
                                                </div>
                                                <p className="text-primary/80 font-medium mb-2 print:text-black">{edu.degree}</p>
                                                <p className="text-muted-foreground text-sm leading-relaxed print:text-gray-600">{edu.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar Column */}
                            <div className="space-y-12">
                                <section>
                                    <h3 className="text-lg font-bold uppercase tracking-widest text-primary mb-8 flex items-center gap-3 print:text-black">
                                        <Code className="w-5 h-5" /> Skills
                                    </h3>
                                    <div className="space-y-8">
                                        {skills.map((skillGroup, i) => (
                                            <div key={i}>
                                                <h4 className="font-bold mb-3 text-sm print:text-black">{skillGroup.category}</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {skillGroup.items.map(skill => (
                                                        <Badge key={skill} variant="secondary" className="font-normal print:border print:border-gray-300 print:bg-white print:text-black">
                                                            {skill}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10 print:hidden">
                                    <h4 className="font-bold mb-2">Want a PDF version?</h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Download the tailored PDF version for offline viewing or ATS systems.
                                    </p>
                                    <Button onClick={() => setActiveTab('files')} variant="outline" className="w-full">
                                        View Files
                                    </Button>
                                    <Button onClick={handlePrint} variant="ghost" className="w-full mt-2 text-primary hover:text-primary/80">
                                        <Printer className="w-4 h-4 mr-2" /> Print this page
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                ) : (
                    <motion.div
                        key="files"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="grid md:grid-cols-2 gap-10"
                    >
                        {resumes.map((resume, index) => (
                            <div
                                key={resume.id}
                                className="group relative bg-zinc-50 dark:bg-zinc-900/50 border border-border/50 rounded-3xl p-8 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 overflow-hidden flex flex-col"
                            >
                                <div className="flex items-start justify-between mb-8">
                                    <div className="p-4 bg-primary/10 rounded-2xl">
                                        <FileText className="w-8 h-8 text-primary" />
                                    </div>
                                    <Badge variant="secondary" className="bg-zinc-200 dark:bg-zinc-800 text-foreground/80">
                                        {resume.date}
                                    </Badge>
                                </div>

                                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{resume.title}</h3>
                                <p className="text-muted-foreground mb-8 flex-grow">{resume.description}</p>

                                <div className="relative aspect-[3/4] w-full bg-zinc-200 dark:bg-zinc-800 rounded-xl overflow-hidden mb-8 border border-border/20 group-hover:border-primary/20 transition-colors">
                                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                        <FileText className="w-12 h-12 opacity-20" />
                                    </div>
                                    {/* If actual PDF preview is needed, iframe goes here. Placeholder for now to avoid PDF loading issues. */}
                                    {/* <iframe src={`${resume.file}#toolbar=0`} ... /> */}
                                    <div className="absolute inset-0 bg-transparent group-hover:bg-primary/5 transition-colors pointer-events-none" />
                                </div>

                                <div className="flex gap-4 mt-auto">
                                    <Button className="flex-1 gap-2 rounded-full" asChild>
                                        <a href={resume.file} target="_blank" rel="noopener noreferrer">
                                            <Eye className="w-4 h-4" /> View
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="flex-1 gap-2 rounded-full" asChild>
                                        <a href={resume.file} download>
                                            <Download className="w-4 h-4" /> Download
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
}
