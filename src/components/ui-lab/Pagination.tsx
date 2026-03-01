"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLab } from "./LabContext";

export default function Pagination() {
    const { currentPage, setCurrentPage, totalPages } = useLab();

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-4 mt-16 pb-12">
            <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white hover:border-[#e11d48]/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-xl group"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <div className="flex items-center gap-2 px-3 h-12 bg-zinc-950 border border-white/5 rounded-2xl shadow-xl">
                {[...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    const isActive = currentPage === page;
                    return (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={cn(
                                "w-9 h-9 rounded-xl text-[11px] font-[900] uppercase transition-all relative group",
                                isActive ? "text-white" : "text-zinc-600 hover:text-zinc-300"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="page-active"
                                    className="absolute inset-0 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{page}</span>
                            {!isActive && <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/5 flex items-center justify-center text-zinc-600 hover:text-white hover:border-[#e11d48]/30 disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-xl group"
            >
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>
    );
}
