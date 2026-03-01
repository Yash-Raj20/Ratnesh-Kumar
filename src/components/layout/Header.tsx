"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { AIAssistant } from "@/components/ui/AIAssistant";
import { Menu, X, ArrowRight, Home, User, Layers, BookOpen, MessageSquare, Briefcase, Bot, Calculator, LayoutDashboard } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { AnimatedIcon } from "@/components/ui/AnimatedIcon";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar } from "lucide-react";

export default function Header() {
    const { scrollY } = useScroll();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const { t } = useTranslation();

    // Hide Header on Components Library page (UI Lab)
    if (pathname === "/components") return null;

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const navLinks = [
        { name: t("common.nav.about"), href: "/about", icon: User },
        { name: t("common.nav.projects"), href: "/projects", icon: Briefcase },
        { name: t("common.nav.services"), href: "/services", icon: Layers },
        { name: t("common.nav.blog"), href: "/blog", icon: BookOpen },
        { name: t("common.nav.contact"), href: "/contact", icon: MessageSquare },
    ];

    const mobileTabs = [
        { name: t("common.nav.home"), href: "/", iconName: "home" },
        { name: t("common.nav.projects"), href: "/projects", iconName: "briefcase" },
        { name: t("common.nav.blog"), href: "/blog", iconName: "book-open" },
        { name: t("common.nav.about"), href: "/about", iconName: "user" },
        { name: t("common.nav.contact"), href: "/contact", iconName: "message-square" },
    ];

    return (
        <>
            {/* Desktop Header (Top Floating - Permanently) */}
            <header
                className={cn(
                    "fixed top-6 inset-x-0 z-50 mx-auto max-w-fit hidden md:block transition-all duration-300 pointer-events-none",
                    scrolled ? "top-4" : "top-6"
                )}
            >
                <div className="pointer-events-auto flex items-center gap-2 px-2 py-2 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-lg shadow-xl shadow-black/20">
                    {/* Logo pill */}
                    <Link
                        href="/"
                        className="flex items-center justify-center w-11 h-11 rounded-full bg-zinc-800 text-primary text-lg font-bold tracking-tighter hover:bg-zinc-700 transition-colors shadow-inner"
                    >
                        RK.
                    </Link>

                    {/* Desktop active Nav pill */}
                    <nav className="flex items-center gap-0">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "relative px-4 py-2 text-sm font-medium transition-colors rounded-full group",
                                        isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 hover:text-primary"
                                    )}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="bubble"
                                            className="absolute inset-x-0 inset-y-0.5 z-[-1] bg-white/10 dark:bg-zinc-800 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)] rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="flex items-center gap-2 pl-2 border-l border-white/10">

                        <div className=" flex items-center gap-2">
                            <DropdownMenu modal={false}>
                                <DropdownMenuTrigger asChild>
                                    <button className="w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-800 border border-white/10 flex items-center justify-center text-primary transition-all active:scale-90 shadow-lg">
                                        <Menu size={20} />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 mt-2 bg-zinc-950/50 backdrop-blur-xl border-white/10 rounded-2xl p-2 shadow-2xl z-[100]">
                                    <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-zinc-500 px-3 py-2">Quick Actions</DropdownMenuLabel>
                                    <DropdownMenuItem
                                        asChild
                                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer data-[highlighted]:bg-primary/10"
                                    >
                                        <Link href="/estimate" className="w-full flex items-center gap-3">
                                            <Calculator size={20} className="text-primary" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold">Project Estimator</span>
                                                <span className="text-[12px] text-zinc-500">Calculate cost & time</span>
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => window.open("https://cal.com/ratnesh-kumar123/15min", '_blank')}
                                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer data-[highlighted]:bg-primary/10"
                                    >
                                        <Calendar size={20} className="text-primary" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">Book a Call</span>
                                            <span className="text-[12px] text-zinc-500">15-min discovery call</span>
                                        </div>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer data-[highlighted]:bg-primary/10"
                                    >
                                        <Link href="/components" target="_blank" className="w-full flex items-center gap-3">
                                            <LayoutDashboard size={20} className="text-primary" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold">UI Lab</span>
                                                <span className="text-[12px] text-zinc-500">Components Library</span>
                                            </div>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <LanguageSwitcher />
                        <CommandPalette />
                        <ThemeSwitcher />
                        <MagneticButton>
                            <Link
                                href="/contact"
                                className="group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:pr-8"
                            >
                                <span className="mr-0 transition-all duration-300 group-hover:mr-2">{t("common.buttons.hireMe")}</span>
                                <ArrowRight className="absolute right-2 h-4 w-4 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                            </Link>
                        </MagneticButton>
                    </div>
                </div>
            </header>

            {/* Mobile Bottom Tabbar - Compact & Elegant */}
            <div className="fixed bottom-4 inset-x-0 z-[60] flex justify-center md:hidden pointer-events-none px-4">
                <motion.nav
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="pointer-events-auto flex items-center justify-around gap-1 px-2 py-1 rounded-full border border-white/10 bg-zinc-900/80 backdrop-blur-xl shadow-2xl w-full max-w-[320px]"
                >
                    {mobileTabs.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));

                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 min-w-[50px] transition-all relative pt-1.5 pb-1",
                                    isActive ? "text-primary" : "text-zinc-500 hover:text-white"
                                )}
                            >
                                <div className={cn(
                                    "p-1.5 rounded-xl transition-all duration-500",
                                    isActive ? "bg-primary/10 shadow-[0_0_15px_rgba(var(--primary),0.1)]" : ""
                                )}>
                                    <AnimatedIcon
                                        name={link.iconName}
                                        isActive={isActive}
                                        size={18}
                                        className={cn(
                                            isActive ? "stroke-[2.5px]" : "stroke-2"
                                        )}
                                    />
                                </div>
                                <span className={cn(
                                    "text-[9px] font-bold uppercase tracking-tight transition-all duration-300",
                                    isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1 absolute"
                                )}>
                                    {link.name}
                                </span>
                            </Link>
                        );
                    })}
                </motion.nav>
            </div>

            {/* Top Bar for Mobile */}
            <header className="fixed top-0 inset-x-0 z-40 p-4 flex md:hidden items-center justify-between bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none">
                <Link
                    href="/"
                    className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900/80 backdrop-blur-md border border-white/10 text-primary text-base font-bold tracking-tighter"
                >
                    RK.
                </Link>
                <div className="pointer-events-auto flex items-center gap-2">
                    <CommandPalette isMobileTrigger />
                    <button
                        onClick={() => window.dispatchEvent(new CustomEvent('toggle-ai-assistant'))}
                        className="w-10 h-10 rounded-full bg-zinc-900/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-zinc-400 hover:text-primary transition-all active:scale-90 overflow-hidden p-2"
                    >
                        <img src="/bot/bot1.png" alt="AI Agent" className="w-full h-full object-contain" />
                    </button>
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                    <div className="lg:hidden flex items-center gap-2">
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <button className="w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-800 border border-white/10 flex items-center justify-center text-primary transition-all active:scale-90 shadow-lg">
                                    <Menu size={20} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-zinc-950/90 backdrop-blur-xl border-white/10 rounded-2xl p-2 shadow-2xl z-[100]">
                                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-zinc-500 px-3 py-2">Quick Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    asChild
                                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer data-[highlighted]:bg-primary/10"
                                >
                                    <Link href="/estimate" className="w-full flex items-center gap-3">
                                        <Calculator size={20} className="text-primary" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">Project Estimator</span>
                                            <span className="text-[12px] text-zinc-500">Calculate cost & time</span>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => window.open("https://cal.com/ratnesh-kumar123/15min", '_blank')}
                                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer data-[highlighted]:bg-primary/10"
                                >
                                    <Calendar size={20} className="text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold">Book a Call</span>
                                        <span className="text-[12px] text-zinc-500">15-min discovery call</span>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    asChild
                                    className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-primary/10 transition-colors cursor-pointer data-[highlighted]:bg-primary/10"
                                >
                                    <Link href="/components" target="_blank" className="w-full flex items-center gap-3">
                                        <Bot size={20} className="text-primary" />
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold">UI Lab</span>
                                            <span className="text-[12px] text-zinc-500">Components Library</span>
                                        </div>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <AIAssistant />
        </>
    );
}
