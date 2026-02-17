"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const navLinks = [
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Services", href: "/services" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    return (
        <>
            <motion.header
                variants={{
                    visible: { y: 0, opacity: 1 },
                    hidden: { y: -100, opacity: 0 },
                }}
                animate={hidden ? "hidden" : "visible"}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="fixed top-6 inset-x-0 z-50 mx-auto max-w-fit pointer-events-none"
            >
                <div className="pointer-events-auto flex items-center gap-2 px-2 py-2 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-lg shadow-lg shadow-zinc-900/20">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-zinc-800 text-primary text-xl font-bold tracking-tighter hover:bg-zinc-700 transition-colors"
                    >
                        RK.
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1 mx-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium transition-colors rounded-full group",
                                        isActive ? "text-zinc-900 dark:text-zinc-200" : "text-zinc-400 hover:text-primary"
                                    )}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="bubble"
                                            className="absolute inset-0 z-[-1] bg-white/10 dark:bg-zinc-800 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.3)] rounded-full mix-blend-overlay dark:mix-blend-normal"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                    {/* Hover Glow */}
                                    <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 scale-x-50 group-hover:opacity-100 group-hover:scale-x-100 transition-all duration-300 pointer-events-none" />
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="hidden md:flex items-center gap-2 pl-2 border-l border-white/10">
                        <ThemeSwitcher />
                        <Link
                            href="/contact"
                            className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:pr-8"
                        >
                            <span className="mr-0 transition-all duration-300 group-hover:mr-2">Hire Me</span>
                            <ArrowRight className="absolute right-2 h-4 w-4 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="flex md:hidden items-center gap-2">
                        <ThemeSwitcher />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMenu}
                            className="rounded-full w-10 h-10 hover:bg-zinc-800 text-white"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </Button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-x-4 top-24 z-40 p-4 rounded-3xl bg-zinc-900/95 backdrop-blur-xl border border-white/10 md:hidden shadow-2xl origin-top"
                    >
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-all group"
                                >
                                    <span className="font-medium">{link.name}</span>
                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2" />
                            <Link
                                href="/resume"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center px-4 py-3 rounded-xl bg-white/5 text-white font-medium hover:bg-white/10 transition-all"
                            >
                                Resume
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:opacity-90 transition-all"
                            >
                                Hire Me
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
