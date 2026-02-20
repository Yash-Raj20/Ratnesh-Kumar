"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    PenTool,
    Heart,
    MessageCircle,
    User,
    Plus,
    X,
    Sparkles,
    CheckCircle2
} from "lucide-react";

interface Signature {
    id: number;
    name: string;
    message: string;
    date: string;
    emoji: string;
    color: string;
}

const mockSignatures: Signature[] = [
    { id: 1, name: "Alice", message: "Amazing portfolio! The animations are so smooth.", date: "Feb 20, 2026", emoji: "✨", color: "from-blue-500 to-cyan-500" },
    { id: 2, name: "David", message: "One of the best dev portfolios I've seen. Great work!", date: "Feb 18, 2026", emoji: "🚀", color: "from-purple-500 to-pink-500" },
    { id: 3, name: "Sarah", message: "Love the glassmorphism aesthetic. Very вдохновляющий!", date: "Feb 15, 2026", emoji: "🎨", color: "from-emerald-500 to-teal-500" },
    { id: 4, name: "Michael", message: "The GitHub integration is top-notch. Inspiring!", date: "Feb 12, 2026", emoji: "🔥", color: "from-orange-500 to-amber-500" },
];

export default function Guestbook() {
    const [signatures, setSignatures] = useState<Signature[]>(mockSignatures);
    const [isSigning, setIsSigning] = useState(false);
    const [newName, setNewName] = useState("");
    const [newMessage, setNewMessage] = useState("");
    const [isSigned, setIsSigned] = useState(false);

    const handleSign = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName || !newMessage) return;

        const newSig: Signature = {
            id: Date.now(),
            name: newName,
            message: newMessage,
            date: "Today",
            emoji: "✍️",
            color: "from-primary to-purple-500"
        };

        setSignatures([newSig, ...signatures]);
        setIsSigned(true);
        setNewName("");
        setNewMessage("");

        setTimeout(() => {
            setIsSigning(false);
            setIsSigned(false);
        }, 2000);
    };

    return (
        <section className="py-24 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/10">
            {/* Background Decorations */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container px-6 lg:px-30 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-primary mb-4">Community</h2>
                        <h3 className="text-3xl md:text-5xl font-heading font-bold mb-6">
                            Guestbook <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">& Wall of Love.</span>
                        </h3>
                        <p className="text-muted-foreground">
                            A space for visitors to leave their mark. Thank you for visiting my digital home!
                        </p>
                    </div>
                    <button
                        onClick={() => setIsSigning(true)}
                        className="group relative px-8 py-4 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold overflow-hidden transition-all hover:scale-105 active:scale-95"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <PenTool className="w-5 h-5" /> Sign Guestbook
                        </span>
                        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-10 transition-opacity" />
                    </button>
                </div>

                {/* Signatures Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <AnimatePresence mode="popLayout">
                        {signatures.map((sig) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={sig.id}
                                className="group relative p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-primary/20 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-primary/5 cursor-default overflow-hidden"
                            >
                                {/* Gradient Orb on Hover */}
                                <div className={`absolute -top-10 -right-10 w-24 h-24 bg-gradient-to-br ${sig.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700`} />

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            {sig.emoji}
                                        </div>
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                                            {sig.date}
                                        </span>
                                    </div>
                                    <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6 italic">
                                        "{sig.message}"
                                    </p>
                                    <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${sig.color}`} />
                                        <h4 className="font-bold text-sm tracking-tight">{sig.name}</h4>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Sign Integration Modal */}
                <AnimatePresence>
                    {isSigning && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSigning(false)}
                                className="fixed inset-0 bg-background/80 backdrop-blur-xl"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-lg bg-zinc-900 border border-white/10 rounded-[2.5rem] shadow-2xl p-8 md:p-12 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4">
                                    <button
                                        onClick={() => setIsSigning(false)}
                                        className="p-2 rounded-xl hover:bg-white/5 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-zinc-500" />
                                    </button>
                                </div>

                                {isSigned ? (
                                    <div className="py-12 text-center">
                                        <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                                        </div>
                                        <h4 className="text-2xl font-bold mb-2">Signature Added!</h4>
                                        <p className="text-zinc-500">Thank you for signing the guestbook.</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-4 mb-8">
                                            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                                                <PenTool className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-2xl font-bold">Leave a Mark</h4>
                                                <p className="text-sm text-zinc-500 uppercase font-bold tracking-widest">Guestbook Signature</p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleSign} className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 pl-2">Display Name</label>
                                                <input
                                                    placeholder="Who are you?"
                                                    className="w-full h-14 bg-zinc-800 border border-white/5 rounded-2xl px-6 text-sm outline-none focus:border-primary/50 transition-all font-medium"
                                                    value={newName}
                                                    onChange={(e) => setNewName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 pl-2">Your Message</label>
                                                <textarea
                                                    placeholder="Say something nice..."
                                                    className="w-full h-32 bg-zinc-800 border border-white/5 rounded-2xl p-6 text-sm outline-none focus:border-primary/50 transition-all font-medium resize-none"
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-heading font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                            >
                                                Sign Guestbook
                                            </button>
                                        </form>
                                    </>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
