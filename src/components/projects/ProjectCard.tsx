"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
    id: number;
    title: string;
    category: string;
    color: string;
    year: string;
    index: number;
}

export default function ProjectCard({ id, title, category, color, year, index }: ProjectCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer"
        >
            <Link href={`/projects/${id}`} className="block w-full h-full">
                {/* Background / Image Placeholder */}
                <div className={`absolute inset-0 ${color} transition-transform duration-700 group-hover:scale-105`} />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <span className="text-white/60 text-sm font-mono uppercase tracking-widest">{year}</span>
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>

                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="text-white/60 text-sm uppercase tracking-wider mb-2 block">{category}</span>
                        <h3 className="text-3xl font-heading font-medium text-white">{title}</h3>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
