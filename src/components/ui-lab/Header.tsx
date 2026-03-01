"use client";

import { Search, Bell } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeaderProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function Header({ searchQuery, setSearchQuery }: HeaderProps) {
    return (
        <header className="h-[100px] flex items-center justify-between px-10 shrink-0 border-b border-white/[0.03]">
            <div className="flex-1">
                <h2 className="text-[32px] font-[900] tracking-tighter text-white leading-none mb-1">Components Library</h2>
                <p className="text-[13px] font-medium text-zinc-600">Premium crimson building blocks.</p>
            </div>

            <div className="flex items-center gap-6">
                <div className="relative w-[300px] hidden lg:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={16} />
                    <Input
                        placeholder="Search components..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-11 bg-black border-white/5 rounded-lg h-[44px] text-sm text-white font-medium placeholder:text-zinc-800 focus-visible:ring-1 focus-visible:ring-[#e11d48]/20"
                    />
                </div>

                <button className="w-10 h-10 rounded-2xl bg-black border border-white/5 flex items-center justify-center text-zinc-700 hover:text-white transition-all">
                    <Bell size={18} />
                </button>

                <div className="w-10 h-10 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg/?seed=rk_crimson" alt="User" className="w-full h-full object-cover" />
                </div>
            </div>
        </header>
    );
}
