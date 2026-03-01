"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentItem } from "@/data/components-library";

interface PreviewModalProps {
    selectedComponent: ComponentItem | null;
    setSelectedComponent: (item: ComponentItem | null) => void;
    showCode: boolean;
    setShowCode: (show: boolean) => void;
    copied: boolean;
    onCopy: (code: string) => void;
}

export default function PreviewModal({
    selectedComponent,
    setSelectedComponent,
    showCode,
    setShowCode,
    copied,
    onCopy
}: PreviewModalProps) {
    if (!selectedComponent) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                    setSelectedComponent(null);
                    setShowCode(false);
                }}
                className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-5xl h-[85vh] bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] z-[101] flex flex-col"
            >
                {/* Modal Header */}
                <div className="px-8 py-4 border-b border-white/5 flex items-center justify-between shrink-0">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h2 className="text-2xl font-[1000] text-white tracking-tighter">{selectedComponent.name}</h2>
                            <span className="px-2 py-0.5 rounded-md bg-[#e11d48]/10 border border-[#e11d48]/20 text-[10px] font-black text-[#e11d48] uppercase tracking-widest">{selectedComponent.tag}</span>
                        </div>
                        <p className="text-sm text-zinc-500 font-medium">{selectedComponent.desc}</p>
                    </div>
                    <button
                        onClick={() => {
                            setSelectedComponent(null);
                            setShowCode(false);
                        }}
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-white/10 transition-all"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Tabs */}
                <div className="flex px-8 border-b border-white/5 bg-[#0d0d0f]">
                    <button
                        onClick={() => setShowCode(false)}
                        className={cn(
                            "px-6 py-3 text-xs font-black uppercase tracking-widest transition-all relative",
                            !showCode ? "text-[#e11d48]" : "text-zinc-600 hover:text-zinc-400"
                        )}
                    >
                        Preview
                        {!showCode && <motion.div layoutId="modal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e11d48]" />}
                    </button>
                    <button
                        onClick={() => setShowCode(true)}
                        className={cn(
                            "px-6 py-4 text-xs font-black uppercase tracking-widest transition-all relative",
                            showCode ? "text-[#e11d48]" : "text-zinc-600 hover:text-zinc-400"
                        )}
                    >
                        Source Code
                        {showCode && <motion.div layoutId="modal-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#e11d48]" />}
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar" data-lenis-prevent>
                    <AnimatePresence mode="wait">
                        {!showCode ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className={cn("w-full h-full min-h-[500px] rounded-3xl flex items-center justify-center border border-white/5 relative bg-zinc-950/20", selectedComponent.previewBg)}
                            >
                                <div className={cn(
                                    "transition-all duration-500 flex items-center justify-center w-full h-full p-12",
                                    selectedComponent.category === "Forms" || selectedComponent.category === "Cards" ? "scale-100" : "scale-[1.3]"
                                )}>
                                    {selectedComponent.component}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="code"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="relative h-full"
                            >
                                <div className="absolute top-4 right-4 z-10">
                                    <Button
                                        onClick={() => onCopy(selectedComponent.code)}
                                        className="bg-[#e11d48] hover:bg-[#be123c] text-white rounded-lg h-9 px-4 font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
                                    >
                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                        {copied ? "Copied" : "Copy Code"}
                                    </Button>
                                </div>
                                <pre className="w-full h-full bg-zinc-950 p-8 rounded-2xl border border-white/5 text-zinc-300 text-sm font-mono overflow-auto scrollbar-none">
                                    {selectedComponent.code}
                                </pre>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
