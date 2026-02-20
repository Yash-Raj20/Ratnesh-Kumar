"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";

export default function SocialDock() {
    const socials = [
        { icon: Github, href: "https://github.com", name: "GitHub" },
        { icon: Linkedin, href: "https://linkedin.com", name: "LinkedIn" },
        { icon: Twitter, href: "https://twitter.com", name: "Twitter" },
        { icon: Instagram, href: "https://instagram.com", name: "Instagram" },
    ];

    return (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
            <div className="flex flex-col gap-4 p-2 rounded-full border border-white/10 bg-zinc-900/40 backdrop-blur-md shadow-2xl">
                {socials.map((social, index) => (
                    <MagneticButton key={index} distance={0.3}>
                        <Link
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group relative"
                        >
                            <social.icon size={18} />

                            {/* Tooltip */}
                            <span className="absolute left-full ml-4 px-2 py-1 rounded bg-zinc-800 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/5">
                                {social.name}
                            </span>
                        </Link>
                    </MagneticButton>
                ))}
            </div>

            {/* Vertical Line */}
            <div className="w-px h-20 bg-gradient-to-b from-white/10 to-transparent mx-auto" />
        </div>
    );
}
