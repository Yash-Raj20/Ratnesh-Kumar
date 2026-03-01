"use client";

import { motion } from "framer-motion";
import { EyeIcon, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentItem } from "@/data/components-library";

interface ComponentCardProps {
    item: ComponentItem;
    onPreview: (item: ComponentItem) => void;
    onCopy: (code: string) => void;
}

export default function ComponentCard({ item, onPreview, onCopy }: ComponentCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group bg-black/40 border border-white/5 rounded-lg overflow-hidden shadow-2xl hover:border-white/10 transition-all duration-500"
        >
            <div className={cn("aspect-[16/11] relative overflow-hidden flex items-center justify-center p-8 transition-all duration-700", item.previewBg)}>
                <div className="w-full h-full flex items-center justify-center scale-[0.85] group-hover:scale-95 transition-transform duration-700">
                    {item.component}
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#e11d48]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-3.5">
                    <h3 className="text-[14px] font-[900] tracking-tight text-white line-clamp-1">{item.name}</h3>
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/[0.02] text-[8px] font-black uppercase tracking-wider text-zinc-700">
                        {item.tag}
                    </span>
                </div>
                <p className="text-[11px] text-zinc-600 font-medium leading-relaxed mb-8 line-clamp-2">
                    {item.desc}
                </p>

                <div className="flex items-center gap-2">
                    <Button
                        onClick={() => onPreview(item)}
                        variant="outline"
                        className="flex-1 rounded-lg h-9 font-bold text-[12px] text-zinc-400 border-white/5 bg-transparent hover:bg-white/5 hover:border-white/10 transition-all font-sans"
                    >
                        <EyeIcon size={13} className="text-[#e11d48]" strokeWidth={3} /> Preview
                    </Button>
                    <Button
                        onClick={() => onCopy(item.code)}
                        className="flex-1 bg-[#1e293b] text-white rounded-lg h-9 font-black text-[12px] hover:bg-[#334155] transition-all flex items-center justify-center gap-2 group font-sans"
                    >
                        <Copy size={13} className="group-hover:scale-110 transition-transform text-[#e11d48]" strokeWidth={3} /> Get Code
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
