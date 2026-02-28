'use client';

import { useTranslation } from 'react-i18next';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const languages = [
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w40/us.png' },
    { code: 'hi', name: 'Hindi', flag: 'https://flagcdn.com/w40/in.png' },
    { code: 'gu', name: 'Gujarati', flag: 'https://flagcdn.com/w40/in.png' },
];

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    // Use startsWith to handle variations like 'en-US'
    const currentLanguage = languages.find(l => i18n.language?.startsWith(l.code)) || languages[0];

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-zinc-800/50 hover:bg-zinc-800 border border-white/10 text-white transition-all shadow-inner group flex items-center justify-center overflow-hidden">
                    <img
                        src={currentLanguage.flag}
                        alt={currentLanguage.name}
                        className="w-7 h-7 rounded-full object-cover"
                    />
                    <span className="sr-only">Switch Language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 bg-zinc-900/90 backdrop-blur-xl border-white/10 p-1">
                {languages.map((lang) => {
                    const isActive = i18n.language?.startsWith(lang.code);
                    return (
                        <DropdownMenuItem
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200",
                                isActive
                                    ? "bg-primary/10 text-primary font-bold"
                                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                            )}
                        >
                            <img
                                src={lang.flag}
                                alt={lang.name}
                                className="w-8 h-6 rounded-sm object-cover"
                            />
                            <span className="text-sm tracking-wide">{lang.name}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-lang"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]"
                                />
                            )}
                        </DropdownMenuItem>
                    );
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
