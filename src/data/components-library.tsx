import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap,
    Bell,
    MousePointer2,
    Layers,
    Search,
    Settings,
    User,
    Mail,
    Lock,
    CreditCard,
    Activity,
    Shield,
    Smartphone,
    Cpu,
    Briefcase,
    Calendar,
    MessageSquare,
    Star,
    ArrowUpRight,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    MoreHorizontal,
    Heart,
    Share2,
    Download,
    Eye,
    Trash2,
    Plus,
    Minus,
    Filter,
    ArrowRight,
    Paperclip,
    Image as ImageIcon,
    Globe,
    Code as CodeIcon,
    ChevronLeft,
    Send
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ComponentItem {
    id: number;
    name: string;
    category: string;
    tag: string;
    desc: string;
    previewBg: string;
    component: React.ReactNode;
    code: string;
}

// --- INTERACTIVE SUB-COMPONENTS ---
const InteractiveSwitch = () => {
    const [active, setActive] = React.useState(true);
    return (
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActive(!active)}>
            <div className={cn("w-12 h-6 rounded-full relative transition-all duration-500", active ? "bg-[#e11d48] shadow-[0_0_20px_rgba(225,29,72,0.4)]" : "bg-zinc-800")}>
                <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-lg", active ? "right-1" : "right-7")} />
            </div>
            <span className={cn("text-[11px] font-black uppercase tracking-widest transition-colors", active ? "text-white" : "text-zinc-600")}>{active ? "System Active" : "System Offline"}</span>
        </div>
    );
};

const InteractiveTabs = () => {
    const [activeTab, setActiveTab] = React.useState("Profile");
    const tabs = ["Profile", "Settings", "Security"];
    return (
        <div className="flex p-1.5 bg-zinc-950 rounded-2xl border border-white/5 relative shadow-2xl">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                        "relative z-10 px-6 py-2.5 text-[10px] font-black text-white uppercase tracking-widest transition-all duration-500",
                        activeTab !== tab && "text-zinc-600 hover:text-zinc-400"
                    )}
                >
                    {activeTab === tab && (
                        <motion.div
                            layoutId="active-tab-indicator"
                            className="absolute inset-0 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)]"
                        />
                    )}
                    <span className="relative z-10">{tab}</span>
                </button>
            ))}
        </div>
    );
};

const InteractiveLoginForm = () => {
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const handleSubmit = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        }, 2000);
    };

    return (
        <div className="w-80 p-10 bg-zinc-950 border border-white/10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#e11d48]/5 blur-3xl rounded-full" />
            <div className="relative z-10">
                <div className="mb-8">
                    <h3 className="text-2xl font-[1000] text-white mb-2 tracking-tighter">Access Core</h3>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.2em]">Encrypted Authentication Layer</p>
                </div>
                <div className="space-y-5">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-4">Identifier</label>
                        <input className="w-full h-14 bg-black border border-white/5 rounded-2xl px-6 text-xs text-white focus:border-[#e11d48]/50 outline-none transition-all focus:ring-4 focus:ring-[#e11d48]/5 shadow-inner" placeholder="admin@neural.io" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black text-zinc-700 uppercase tracking-widest ml-4">Credential</label>
                        <input className="w-full h-14 bg-black border border-white/5 rounded-2xl px-6 text-xs text-white focus:border-[#e11d48]/50 outline-none transition-all focus:ring-4 focus:ring-[#e11d48]/5 shadow-inner" type="password" placeholder="••••••••" />
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading || success}
                        className={cn(
                            "w-full h-14 rounded-2xl text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-3 active:scale-95 shadow-xl",
                            success ? "bg-emerald-500" : "bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:shadow-[0_0_40px_rgba(225,29,72,0.4)]"
                        )}
                    >
                        {loading && <Loader2 className="animate-spin" size={16} />}
                        {success ? <CheckCircle2 size={16} /> : null}
                        {success ? "Authorized" : loading ? "Verifying..." : "Initialize Session"}
                    </button>
                    <div className="flex justify-between items-center px-2 pt-2">
                        <span className="text-[9px] text-zinc-700 font-bold uppercase hover:text-zinc-400 cursor-pointer transition-colors">Recover Seed</span>
                        <div className="flex items-center gap-2 group/biometric cursor-pointer">
                            <Shield size={12} className="text-zinc-700 group-hover/biometric:text-[#e11d48] transition-colors" />
                            <span className="text-[9px] text-zinc-700 font-bold uppercase">Biometric</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InteractiveStepProgress = () => {
    const [step, setStep] = React.useState(1);
    return (
        <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-4">
                {[1, 2, 3].map(i => (
                    <React.Fragment key={i}>
                        <button
                            onClick={() => setStep(i)}
                            className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center text-[12px] font-black transition-all duration-500 relative group",
                                i <= step ? "bg-[#e11d48] text-white shadow-[0_0_20px_rgba(225,29,72,0.3)]" : "bg-black border border-white/5 text-zinc-700 hover:border-white/20"
                            )}
                        >
                            {i < step ? <CheckCircle2 size={18} /> : i}
                            {i === step && <motion.div layoutId="step-glow" className="absolute inset-0 bg-[#e11d48] blur-xl opacity-20" />}
                        </button>
                        {i < 3 && <div className={cn("w-12 h-[2px] rounded-full transition-all duration-700", i < step ? "bg-[#e11d48]" : "bg-white/5")} />}
                    </React.Fragment>
                ))}
            </div>
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">
                Current Phase: <span className="text-[#e11d48]">0{step}</span>
            </div>
        </div>
    );
};

const InteractiveMetricWidget = () => {
    const [val, setVal] = React.useState(98.2);
    React.useEffect(() => {
        const interval = setInterval(() => {
            setVal(v => +(v + (Math.random() * 0.4 - 0.2)).toFixed(1));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-64 p-8 bg-[#0a0a0a] rounded-[2.5rem] border border-white/5 shadow-[0_30px_60px_rgba(0,0,0,0.5)] group hover:border-[#e11d48]/20 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#e11d48]/10 flex items-center justify-center text-[#e11d48]">
                    <Activity size={24} className="animate-[pulse_3s_infinite]" />
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-zinc-800" />)}
                </div>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl font-[1000] text-white tracking-tighter">{val}</span>
                <span className="text-sm font-black text-[#e11d48] italic">%</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest font-sans">Real-time Efficiency</span>
            </div>
        </div>
    );
};

const InteractiveAvatarStack = () => {
    const [hovered, setHovered] = React.useState<number | null>(null);
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map(i => (
                    <motion.div
                        key={i}
                        onHoverStart={() => setHovered(i)}
                        onHoverEnd={() => setHovered(null)}
                        whileHover={{ y: -10, zIndex: 50, scale: 1.1 }}
                        className="w-14 h-14 rounded-full border-[3px] border-black bg-zinc-900 overflow-hidden shadow-2xl relative cursor-pointer"
                    >
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=rk_${i}`} className="w-full h-full object-cover" />
                        {hovered === i && <motion.div layoutId="avatar-glow" className="absolute inset-0 bg-[#e11d48]/20 shadow-[inset_0_0_20px_#e11d48]/40" />}
                    </motion.div>
                ))}
                <div className="w-14 h-14 rounded-full border-[3px] border-black bg-gradient-to-br from-[#e11d48] to-[#be123c] flex items-center justify-center text-[11px] font-black text-white shadow-xl hover:scale-110 transition-transform cursor-pointer">+2.4k</div>
            </div>
            <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">Neural Network Nodes</span>
        </div>
    );
};

const InteractiveCreditCard = () => {
    const [isFlipped, setIsFlipped] = React.useState(false);
    return (
        <div
            className="w-72 h-44 perspective-1000 cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-full h-full relative preserve-3d"
            >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-zinc-800 via-zinc-950 to-black border border-white/10 rounded-[2rem] p-8 overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#e11d48]/10 blur-[80px]" />
                    <div className="flex justify-between items-start mb-10">
                        <CreditCard className="text-[#e11d48]" size={32} />
                        <div className="flex gap-1.5 italic font-black text-[#e11d48] text-xs uppercase tracking-tighter">Neural<span className="text-white">Card</span></div>
                    </div>
                    <div className="text-lg font-black text-white tracking-[0.3em] font-mono mb-4">•••• •••• •••• 8844</div>
                    <div className="flex justify-between items-end">
                        <div>
                            <div className="text-[7px] text-zinc-700 uppercase font-bold mb-0.5">Holder</div>
                            <div className="text-[10px] text-white font-black uppercase tracking-widest">Ratnesh Kumar</div>
                        </div>
                        <div className="w-12 h-8 bg-gradient-to-tr from-amber-400 to-amber-200 rounded-lg opacity-80" />
                    </div>
                </div>
                {/* Back */}
                <div className="absolute inset-0 backface-hidden bg-zinc-950 border border-white/10 rounded-[2rem] p-8 shadow-2xl rotate-y-180">
                    <div className="w-full h-12 bg-black -mx-8 mt-4" />
                    <div className="mt-8 flex items-center gap-4">
                        <div className="flex-1 h-10 bg-zinc-900 rounded-lg flex items-center px-4">
                            <div className="w-full h-px bg-white/5" />
                        </div>
                        <div className="w-14 h-10 bg-white rounded-lg flex items-center justify-center text-black font-mono font-black italic">823</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const InteractiveCarouselSlider = () => {
    const [index, setIndex] = React.useState(0);
    const slides = [
        { title: "Neural Network", desc: "Advanced AI computation layers.", color: "from-[#e11d48]/20 to-transparent" },
        { title: "Quantum Sync", desc: "Instantaneous data synchronization.", color: "from-blue-500/20 to-transparent" },
        { title: "Cyber Shield", desc: "Military-grade encryption protocols.", color: "from-emerald-500/20 to-transparent" }
    ];

    const next = () => setIndex((index + 1) % slides.length);
    const prev = () => setIndex((index - 1 + slides.length) % slides.length);

    return (
        <div className="w-80 h-48 bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden relative group shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className={cn("absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-br", slides[index].color)}
                >
                    <h3 className="text-xl font-[1000] text-white mb-2 tracking-tighter">{slides[index].title}</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{slides[index].desc}</p>
                </motion.div>
            </AnimatePresence>

            <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={prev} className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#e11d48] transition-all"><ChevronLeft size={16} /></button>
                <button onClick={next} className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-[#e11d48] transition-all"><ChevronRight size={16} /></button>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
                {slides.map((_, i) => (
                    <div key={i} className={cn("h-1 rounded-full transition-all duration-500", i === index ? "w-6 bg-[#e11d48]" : "w-1.5 bg-white/10")} />
                ))}
            </div>
        </div>
    );
};

const InteractiveStackCarousel = () => {
    const [index, setIndex] = React.useState(0);
    const cards = [1, 2, 3];

    return (
        <div className="flex items-center justify-center h-64 w-80 relative perspective-1000">
            {cards.map((c, i) => {
                const isActive = i === index;
                const offset = (i - index + cards.length) % cards.length;

                return (
                    <motion.div
                        key={c}
                        onClick={() => setIndex(i)}
                        animate={{
                            scale: isActive ? 1 : 0.8 - offset * 0.1,
                            x: offset * 40,
                            z: -offset * 100,
                            opacity: 1 - offset * 0.3,
                            zIndex: 10 - offset
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={cn(
                            "absolute w-44 h-56 rounded-[2.5rem] border border-white/10 cursor-pointer overflow-hidden shadow-2xl",
                            isActive ? "bg-gradient-to-br from-zinc-800 to-black shadow-[0_0_50px_rgba(225,29,72,0.2)]" : "bg-zinc-950"
                        )}
                    >
                        <div className="p-6 h-full flex flex-col justify-between">
                            <div className="w-10 h-10 rounded-2xl bg-[#e11d48]/10 flex items-center justify-center text-[#e11d48] mb-4">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-xs uppercase mb-1">Node 0{c}</h4>
                                <div className="h-1 w-8 bg-[#e11d48] rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

const InteractiveAIChatInput = () => {
    const [showMenu, setShowMenu] = React.useState(false);
    const [focused, setFocused] = React.useState(false);

    const menuItems = [
        { icon: <Paperclip size={14} />, label: "Attach", color: "hover:text-blue-400" },
        { icon: <ImageIcon size={14} />, label: "Image", color: "hover:text-emerald-400" },
        { icon: <Globe size={14} />, label: "Search", color: "hover:text-[#e11d48]" },
        { icon: <CodeIcon size={14} />, label: "Code", color: "hover:text-amber-400" }
    ];

    return (
        <div className="w-full max-w-xl p-8">
            <div className={cn(
                "relative bg-zinc-950 border transition-all duration-500 rounded-[2.5rem] shadow-2xl",
                focused ? "border-[#e11d48]/40 shadow-[0_0_50px_rgba(225,29,72,0.1)]" : "border-white/5"
            )}>
                <div className="p-4 flex flex-col">
                    <textarea
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder="Message Neural Assistant..."
                        className="w-full bg-transparent border-none outline-none text-sm text-zinc-300 placeholder:text-zinc-700 min-h-[80px] p-4 resize-none font-medium leading-relaxed"
                    />

                    <div className="flex items-center justify-between px-4 pb-2">
                        <div className="flex items-center gap-1 relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className={cn(
                                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-all",
                                    showMenu ? "bg-[#e11d48] text-white rotate-45" : "bg-white/5 text-zinc-500 hover:text-white"
                                )}
                            >
                                <Plus size={20} />
                            </button>

                            <AnimatePresence>
                                {showMenu && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                        className="absolute bottom-full left-0 mb-4 bg-zinc-900 border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1 min-w-[120px]"
                                    >
                                        {menuItems.map((item, i) => (
                                            <button key={i} className={cn("flex items-center gap-3 px-3 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-500 transition-all", item.color)}>
                                                {item.icon} {item.label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button className="w-10 h-10 rounded-2xl bg-white text-black flex items-center justify-center hover:bg-[#e11d48] hover:text-white transition-all shadow-lg active:scale-90">
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex justify-center gap-6">
                <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">Encrypted Session</span>
                <span className="text-[9px] font-black text-zinc-700 uppercase tracking-[0.3em]">•</span>
                <span className="text-[9px] font-black text-[#e11d48] uppercase tracking-[0.3em] transition-all hover:tracking-[0.5em] cursor-pointer">Model V.4.2</span>
            </div>
        </div>
    );
};

export const COMPONENTS_LIBRARY: ComponentItem[] = [
    // --- BUTTONS ---
    {
        id: 1,
        name: "Luminous Primary",
        category: "Buttons",
        tag: "PREMIUM",
        desc: "High-impact button with a heavy rose glow and scale effect.",
        previewBg: "bg-[#09090b]",
        component: (
            <button className="px-10 py-3.5 bg-[#e11d48] rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_50px_rgba(225,29,72,0.6)] hover:-translate-y-1 transition-all active:scale-95 border border-white/10">
                Launch System
            </button>
        ),
        code: `import React from 'react';

const LuminousButton = () => {
  return (
    <button className="px-10 py-3.5 bg-[#e11d48] rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(225,29,72,0.4)] hover:shadow-[0_0_50px_rgba(225,29,72,0.6)] hover:-translate-y-1 transition-all active:scale-95 border border-white/10">
      Launch System
    </button>
  );
};

export default LuminousButton;`
    },
    {
        id: 2,
        name: "Liquid Slide Button",
        category: "Buttons",
        tag: "STYLES",
        desc: "Creative button with a sliding background effect on hover.",
        previewBg: "bg-[#0c0c0e]",
        component: (
            <button className="group relative px-8 py-3 bg-zinc-900 rounded-xl overflow-hidden">
                <div className="absolute inset-0 w-0 bg-[#e11d48] transition-all duration-500 group-hover:w-full" />
                <span className="relative z-10 text-white font-bold text-sm transition-colors group-hover:text-white flex items-center gap-2">
                    Slide Reveal <ArrowUpRight size={16} />
                </span>
            </button>
        ),
        code: `import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const LiquidSlideButton = () => {
  return (
    <button className="group relative px-8 py-3 bg-zinc-900 rounded-xl overflow-hidden">
      <div className="absolute inset-0 w-0 bg-[#e11d48] transition-all duration-500 group-hover:w-full" />
      <span className="relative z-10 text-white font-bold text-sm transition-colors group-hover:text-white flex items-center gap-2">
        Slide Reveal <ArrowUpRight size={16} />
      </span>
    </button>
  );
};

export default LiquidSlideButton;`
    },
    {
        id: 3,
        name: "Neumorphic Press",
        category: "Buttons",
        tag: "STYLES",
        desc: "Soft UI button with realistic inset shadow on click.",
        previewBg: "bg-[#0f172a]",
        component: (
            <button className="px-8 py-3 bg-slate-900 rounded-2xl text-slate-400 font-bold shadow-[5px_5px_10px_rgba(0,0,0,0.5),-5px_-5px_10px_rgba(255,255,255,0.02)] active:shadow-inset transition-all active:scale-[0.98]">
                Press Me
            </button>
        ),
        code: `import React from 'react';

const NeumorphicButton = () => {
  return (
    <button className="px-8 py-3 bg-slate-900 rounded-2xl text-slate-400 font-bold shadow-[5px_5px_10px_rgba(0,0,0,0.5),-5px_-5px_10px_rgba(255,255,255,0.02)] active:shadow-inner transition-all hover:scale-[1.02] active:scale-[0.98]">
      Press Me
    </button>
  );
};

export default NeumorphicButton;`
    },

    // --- CARDS ---
    {
        id: 4,
        name: "Glass Portfolio Card",
        category: "Cards",
        tag: "GLASS",
        desc: "Frosted card with high-gloss border and hover tilt effect simulation.",
        previewBg: "bg-[#050507]",
        component: (
            <div className="w-56 p-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] group hover:bg-white/[0.05] transition-all duration-500">
                <div className="aspect-square bg-gradient-to-br from-[#e11d48]/20 to-transparent rounded-2xl mb-4 overflow-hidden relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:scale-110 transition-transform duration-700">
                        <Cpu size={48} className="text-[#e11d48]" />
                    </div>
                </div>
                <h4 className="text-white font-black text-sm mb-1">Neural Interface</h4>
                <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Digital Product</p>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-white font-black text-xs">$2,400</span>
                    <div className="w-8 h-8 rounded-full bg-[#e11d48] flex items-center justify-center text-white"><ArrowRight size={14} /></div>
                </div>
            </div>
        ),
        code: `import React from 'react';
import { ArrowRight, Cpu } from 'lucide-react';

const GlassPortfolioCard = () => {
  return (
    <div className="w-56 p-5 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] group hover:bg-white/[0.05] transition-all duration-500">
      <div className="aspect-square bg-gradient-to-br from-[#e11d48]/20 to-transparent rounded-2xl mb-4 overflow-hidden relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:scale-110 transition-transform duration-700">
          <Cpu size={48} className="text-[#e11d48]" />
        </div>
      </div>
      <h4 className="text-white font-black text-sm mb-1">Neural Interface</h4>
      <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Digital Product</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-white font-black text-xs">$2,400</span>
        <button className="w-8 h-8 rounded-full bg-[#e11d48] flex items-center justify-center text-white hover:scale-110 transition-transform">
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default GlassPortfolioCard;`
    },
    {
        id: 5,
        name: "Testimonial Card",
        category: "Cards",
        tag: "STYLES",
        desc: "Premium quote card with floating avatar and rose accent.",
        previewBg: "bg-[#09090b]",
        component: (
            <div className="w-60 p-6 bg-zinc-950/50 border border-white/5 rounded-3xl relative">
                <Star className="text-[#e11d48] mb-4" size={16} fill="currentColor" />
                <p className="text-zinc-400 text-xs italic leading-relaxed mb-6">"The attention to detail and premium aesthetics are truly world-class."</p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e11d48] to-[#be123c]" />
                    <div>
                        <div className="text-xs font-black text-white">James Wilson</div>
                        <div className="text-[9px] text-[#e11d48] font-black uppercase">CTO at Techflow</div>
                    </div>
                </div>
            </div>
        ),
        code: `import React from 'react';
import { Star } from 'lucide-react';

const TestimonialCard = () => {
  return (
    <div className="w-60 p-6 bg-zinc-950/50 border border-white/5 rounded-3xl relative">
      <Star className="text-[#e11d48] mb-4 fill-[#e11d48]" size={16} />
      <p className="text-zinc-400 text-xs italic leading-relaxed mb-6">
        "The attention to detail and premium aesthetics are truly world-class."
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e11d48] to-[#be123c]" />
        <div>
          <div className="text-xs font-black text-white">James Wilson</div>
          <div className="text-[9px] text-[#e11d48] font-black uppercase">CTO at Techflow</div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;`
    },

    // --- FORMS ---
    {
        id: 6,
        name: "Premium Login Form",
        category: "Forms",
        tag: "FORMS",
        desc: "Mini login module with custom-styled fields and primary action.",
        previewBg: "bg-[#030303]",
        component: <InteractiveLoginForm />,
        code: `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image, Search, Code, Send, ShieldCheck, Zap } from 'lucide-react';

const InteractiveAIChatInput = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="w-full max-w-2xl bg-zinc-950 border border-white/5 rounded-[2.5rem] p-4 shadow-2xl relative group overflow-hidden">
            <div className="flex gap-1 items-center mb-2 px-2">
                <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                <div className="w-1 h-3 bg-zinc-800 rounded-full" />
                <span className="text-[8px] font-black uppercase text-zinc-700 tracking-widest ml-2">Secure AI Session</span>
            </div>

            <div className="relative flex items-end gap-3">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className={\`w-12 h-12 rounded-2xl flex items-center justify-center transition-all \${
                    isOpen ? 'bg-[#e11d48] text-white rotate-45 shadow-[0_0_20px_#e11d48]' : 'bg-zinc-900 text-zinc-600 hover:text-white hover:bg-zinc-800'
                  }\`}
                >
                    <Plus size={24} />
                </button>

                <div className="flex-1 bg-zinc-900/50 rounded-2xl border border-white/5 p-1 flex items-end">
                    <textarea 
                      className="w-full bg-transparent p-3 text-sm text-zinc-300 outline-none resize-none min-h-[48px] placeholder:text-zinc-800 font-bold" 
                      placeholder="Instruct Neural Intelligence..."
                    />
                    <button className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:bg-[#e11d48] hover:text-white transition-all m-1 shadow-xl">
                      <Send size={18} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="flex gap-3 mt-4"
                    >
                        {[
                          { icon: <Image size={18} />, label: 'Image' },
                          { icon: <Search size={18} />, label: 'Search' },
                          { icon: <Code size={18} />, label: 'Code' }
                        ].map(item => (
                            <button key={item.label} className="px-4 py-2 bg-zinc-900 border border-white/5 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase text-zinc-500 hover:text-white hover:bg-zinc-800 transition-all">
                                {item.icon} {item.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveAIChatInput;`
    },
    {
        id: 7,
        name: "Newsletter Sub",
        category: "Forms",
        tag: "FORMS",
        desc: "Minimal horizontal subscription form for footers.",
        previewBg: "bg-[#09090b]",
        component: (
            <div className="flex gap-2 p-1 bg-black border border-white/5 rounded-2xl w-72">
                <input className="flex-1 bg-transparent px-4 text-xs text-white outline-none" placeholder="Enter email..." />
                <button className="bg-[#e11d48] p-2.5 rounded-xl text-white"><ArrowRight size={16} /></button>
            </div>
        ),
        code: `<div className="flex gap-2 p-1 bg-black border border-white/5 rounded-2xl w-72">
  <input className="flex-1 bg-transparent px-4 text-xs text-white" placeholder="Enter email..." />
  <button className="bg-[#e11d48] p-2.5 rounded-xl text-white"><ArrowRight size={16} /></button>
</div>`
    },

    // --- NAVIGATION ---
    {
        id: 8,
        name: "Floating Island Nav",
        category: "Navigation",
        tag: "PREMIUM",
        desc: "A sleek, compact navigation island with glass effects.",
        previewBg: "bg-[#050507]",
        component: (
            <div className="flex items-center gap-6 px-6 py-3 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-full scale-90">
                <div className="w-2 h-2 rounded-full bg-[#e11d48] shadow-[0_0_10px_#e11d48]" />
                {['Home', 'Lab', 'Brief'].map(item => (
                    <span key={item} className="text-[10px] font-black text-zinc-500 uppercase hover:text-white cursor-pointer transition-colors">{item}</span>
                ))}
                <Search size={14} className="text-zinc-600 hover:text-white cursor-pointer" />
            </div>
        ),
        code: `<div className="flex items-center gap-6 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-full">
  <div className="w-2 h-2 rounded-full bg-[#e11d48]" />
  {['Home', 'Lab', 'Brief'].map(item => (
    <span className="text-[10px] font-black text-zinc-500 uppercase">{item}</span>
  ))}
</div>`
    },

    // --- FEEDBACK ---
    {
        id: 9,
        name: "Interactive Step Progress",
        category: "Feedback",
        tag: "STYLES",
        desc: "Visual workflow tracker with active rose highlight.",
        previewBg: "bg-[#0c0c0e]",
        component: <InteractiveStepProgress />,
        code: `<div className="flex items-center gap-4">
  {[1, 2, 3].map(i => (
    <React.Fragment key={i}>
      <div className={i === 1 ? "bg-[#e11d48]" : "bg-black"}>{i}</div>
      {i < 3 && <div className="w-8 h-px bg-white/5" />}
    </React.Fragment>
  ))}
</div>`
    },

    // --- SURFACE ---
    {
        id: 10,
        name: "Obsidian Widget",
        category: "Surface",
        tag: "STYLES",
        desc: "Deep black dashboard widget with minimal information display.",
        previewBg: "bg-[#030303]",
        component: <InteractiveMetricWidget />,
        code: `import React from 'react';

const FullWidthHeroSlider = () => {
    return (
        <div className="w-full h-[500px] bg-black relative overflow-hidden rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.9)] group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2000')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <div className="px-6 py-2 bg-[#e11d48]/10 border border-[#e11d48]/20 rounded-full text-[#e11d48] text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-bounce">
                    New Collection 2024
                </div>
                <h2 className="text-white font-[1000] text-7xl uppercase italic tracking-tighter leading-none mb-10">
                    The Pulse<br />Of Future
                </h2>
                <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#e11d48] hover:text-white transition-all shadow-2xl active:scale-95">
                    Explore Deep
                </button>
            </div>
        </div>
    );
};

export default FullWidthHeroSlider;`
    },

    // --- TYPOGRAPHY ---
    {
        id: 11,
        name: "Hero Display Title",
        category: "Typography",
        tag: "STYLES",
        desc: "Large, impactful display type with crimson text-shadow.",
        previewBg: "bg-[#09090b]",
        component: (
            <div className="text-center">
                <h1 className="text-4xl font-[1000] text-white tracking-tighter leading-none mb-2">BOLD<br />FUTURE</h1>
                <div className="h-1 w-12 bg-[#e11d48] mx-auto rounded-full" />
            </div>
        ),
        code: `import React from 'react';

const HeroDisplayTitle = () => {
  return (
    <div className="text-center group">
      <h1 className="text-6xl font-[1000] text-white tracking-tighter leading-none mb-6 group-hover:tracking-[-0.05em] transition-all duration-700">
        BOLD<br />FUTURE
      </h1>
      <div className="h-1.5 w-16 bg-[#e11d48] mx-auto rounded-full shadow-[0_0_20px_#e11d48]" />
    </div>
  );
};

export default HeroDisplayTitle;`
    },

    // Adding more to reach total 40+ as requested...
    {
        id: 12,
        name: "Ghost Input",
        category: "Inputs",
        tag: "FORMS",
        desc: "Ultra-minimal input with a single focus line.",
        previewBg: "bg-[#050507]",
        component: (
            <input className="w-48 bg-transparent border-b border-white/10 p-2 text-xs text-white focus:border-[#e11d48] outline-none transition-all" placeholder="Type here..." />
        ),
        code: `import React from 'react';

const GhostInput = () => {
  return (
    <input 
      className="w-48 bg-transparent border-b border-white/10 p-2 text-xs text-white focus:border-[#e11d48] outline-none transition-all placeholder:text-zinc-800" 
      placeholder="Type here..." 
    />
  );
};

export default GhostInput;`
    },
    {
        id: 13,
        name: "Toggle Group",
        category: "Inputs",
        tag: "UI CONTROL",
        desc: "Selection controller for multiple options.",
        previewBg: "bg-[#09090b]",
        component: (
            <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5">
                <button className="px-4 py-2 bg-[#e11d48] rounded-lg text-white text-[10px] font-black uppercase">Standard</button>
                <button className="px-4 py-2 text-zinc-600 text-[10px] font-black uppercase hover:text-zinc-400">Expert</button>
            </div>
        ),
        code: `import React, { useState } from 'react';

const ToggleGroup = () => {
  const [active, setActive] = useState('Standard');
  return (
    <div className="flex bg-zinc-950 p-1 rounded-xl border border-white/5">
      {['Standard', 'Expert'].map((mode) => (
        <button
          key={mode}
          onClick={() => setActive(mode)}
          className={\`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all \${
            active === mode ? 'bg-[#e11d48] text-white' : 'text-zinc-600 hover:text-zinc-400'
          }\`}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};

export default ToggleGroup;`
    },
    {
        id: 14,
        name: "Animated Metric",
        category: "Data Visuals",
        tag: "INDICATOR",
        desc: "Pulsing data point for real-time monitoring.",
        previewBg: "bg-[#0c0c0e]",
        component: <InteractiveMetricWidget />,
        code: `import React, { useState, useEffect } from 'react';
import { Activity, Zap } from 'lucide-react';

const AnimatedMetricWidget = () => {
  const [val, setVal] = useState(42.5);
  useEffect(() => {
    const interval = setInterval(() => {
      setVal(v => +(v + (Math.random() * 0.6 - 0.3)).toFixed(1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-6 bg-black p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
      <div className="relative">
        <div className="w-14 h-14 bg-[#e11d48]/10 rounded-2xl flex items-center justify-center text-[#e11d48]">
          <Zap size={24} className="animate-pulse" />
        </div>
      </div>
      <div>
        <div className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.2em] mb-1">CPU Load</div>
        <div className="text-2xl font-[1000] text-white tracking-tighter">{val}%</div>
      </div>
    </div>
  );
};

export default AnimatedMetricWidget;`
    },
    {
        id: 15,
        name: "Service Feature Card",
        category: "Cards",
        tag: "PREMIUM",
        desc: "High-contrast card with glass icon and subtle background blur.",
        previewBg: "bg-[#030303]",
        component: (
            <div className="w-56 p-6 bg-zinc-950 border border-white/10 rounded-3xl group cursor-pointer hover:border-[#e11d48]/40 transition-all duration-700">
                <div className="w-12 h-12 bg-[#e11d48] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(225,29,72,0.3)]">
                    <Cpu size={24} className="text-white" />
                </div>
                <h4 className="text-white font-black text-sm mb-2 group-hover:text-[#e11d48] transition-colors">Web3 Integration</h4>
                <p className="text-zinc-600 text-[11px] leading-relaxed">Secure decentralized smart contracts for modern apps.</p>
            </div>
        ),
        code: `import React from 'react';
import { Cpu } from 'lucide-react';

const Web3IntegrationCard = () => {
  return (
    <div className="w-56 p-6 bg-zinc-950 border border-white/10 rounded-3xl group cursor-pointer hover:border-[#e11d48]/40 transition-all duration-700">
      <div className="w-12 h-12 bg-[#e11d48] rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(225,29,72,0.3)] group-hover:scale-110 transition-transform">
        <Cpu size={24} className="text-white" />
      </div>
      <h4 className="text-white font-black text-sm mb-2 group-hover:text-[#e11d48] transition-colors">Web3 Integration</h4>
      <p className="text-zinc-600 text-[11px] leading-relaxed">Secure decentralized smart contracts for modern apps.</p>
    </div>
  );
};

export default Web3IntegrationCard;`
    },
    {
        id: 16,
        name: "Social Interaction Bar",
        category: "Feedback",
        tag: "UI CONTROL",
        desc: "Compact bar for likes, shares, and views.",
        previewBg: "bg-[#09090b]",
        component: (
            <div className="flex gap-4 px-6 py-3 bg-black border border-white/5 rounded-full text-zinc-700">
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Heart size={16} /> <span className="text-[10px] font-black">1.2k</span></div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Share2 size={16} /> <span className="text-[10px] font-black">240</span></div>
                <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors"><Eye size={16} /> <span className="text-[10px] font-black">12k</span></div>
            </div>
        ),
        code: `import React from 'react';
import { Heart, Share2, Eye } from 'lucide-react';

const SocialInteractionBar = () => {
  return (
    <div className="flex gap-4 px-6 py-3 bg-black border border-white/5 rounded-full text-zinc-700">
      <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group">
        <Heart size={16} className="group-hover:fill-[#e11d48] group-hover:text-[#e11d48]" /> 
        <span className="text-[10px] font-black uppercase tracking-widest">1.2k</span>
      </div>
      <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group">
        <Share2 size={16} className="group-hover:text-[#e11d48]" /> 
        <span className="text-[10px] font-black uppercase tracking-widest">240</span>
      </div>
      <div className="flex items-center gap-2 hover:text-white cursor-pointer transition-colors group">
        <Eye size={16} className="group-hover:text-[#e11d48]" /> 
        <span className="text-[10px] font-black uppercase tracking-widest">12k</span>
      </div>
    </div>
  );
};

export default SocialInteractionBar;`
    },
    {
        id: 17,
        name: "Luxe Progress Bar",
        category: "Feedback",
        tag: "INDICATOR",
        desc: "Full-width progress tracker with rose styling.",
        previewBg: "bg-[#050507]",
        component: (
            <div className="w-64 space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-zinc-700"><span>Progress</span> <span>65%</span></div>
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-[#e11d48] rounded-full shadow-[0_0_10px_#e11d48]" style={{ width: '65%' }} />
                </div>
            </div>
        ),
        code: `import React from 'react';

const LuxeProgressBar = ({ progress = 65 }) => {
  return (
    <div className="w-64 space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase text-zinc-700">
        <span>System Load</span> 
        <span className="text-[#e11d48]">{progress}%</span>
      </div>
      <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#e11d48] rounded-full shadow-[0_0_10px_#e11d48] transition-all duration-1000" 
          style={{ width: \`\${progress}%\` }} 
        />
      </div>
    </div>
  );
};

export default LuxeProgressBar;`
    },
    {
        id: 18,
        name: "Profile Header Snippet",
        category: "Surface",
        tag: "USER",
        desc: "Profile summary section with avatar and basic info.",
        previewBg: "bg-[#0c0c0e]",
        component: (
            <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-[2rem] border border-white/10 w-64 shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#e11d48] to-[#be123c] p-0.5">
                    <div className="w-full h-full bg-black rounded-full overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=rk_vip" className="w-full h-full" />
                    </div>
                </div>
                <div>
                    <h4 className="text-white font-black text-sm">Ratnesh Kumar</h4>
                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">Verified Pro</p>
                    <div className="flex gap-2 mt-2">
                        <div className="w-5 h-5 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-600"><Settings size={10} /></div>
                        <div className="w-5 h-5 rounded-lg bg-zinc-900 flex items-center justify-center text-zinc-600"><Bell size={10} /></div>
                    </div>
                </div>
            </div>
        ),
        code: `<div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-[2rem] border border-white/10 w-64 shadow-2xl">
  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#e11d48] to-[#be123c] p-0.5">
    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=rk_vip" className="w-full h-full rounded-full" />
  </div>
  <div>
    <h4 className="text-white font-black text-sm">Ratnesh Kumar</h4>
    <p className="text-[9px] text-zinc-600 font-bold uppercase">Verified Pro</p>
  </div>
</div>`
    },
    {
        id: 19,
        name: "Minimal Contact Snippet",
        category: "Forms",
        tag: "FORMS",
        desc: "Mini contact area with icons for quick actions.",
        previewBg: "bg-[#030303]",
        component: (
            <div className="w-56 p-6 bg-black border border-white/5 rounded-3xl">
                <div className="text-[10px] font-black text-[#e11d48] mb-4 uppercase tracking-widest">Connect</div>
                <div className="space-y-3">
                    <div className="flex items-center gap-3 text-white text-xs font-bold"><Mail size={14} className="text-[#e11d48]" /> hi@ratnesh.io</div>
                    <div className="flex items-center gap-3 text-white text-xs font-bold"><Smartphone size={14} className="text-[#e11d48]" /> +91 999 888 777</div>
                </div>
            </div>
        ),
        code: `import React from 'react';
import { Mail, Smartphone }s from 'lucide-react';

const MinimalContactSnippet = () => {
  const contactInfo = [
    { icon: <Mail size={14} className="text-[#e11d48]" />, label: 'hi@ratnesh.io' },
    { icon: <Smartphone size={14} className="text-[#e11d48]" />, label: '+91 999 888 777' }
  ];
  return (
    <div className="w-64 p-8 bg-black border border-white/5 rounded-[2.5rem] shadow-2xl">
      <div className="text-[10px] font-black text-[#e11d48] mb-6 uppercase tracking-[0.3em]">Connect</div>
      <div className="space-y-4">
        {contactInfo.map((item, i) => (
          <div key={i} className="flex items-center gap-4 text-white text-xs font-black uppercase tracking-widest group cursor-pointer hover:text-[#e11d48] transition-colors">
            {item.icon}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinimalContactSnippet;`
    },
    {
        id: 20,
        name: "Luxe Tab Switcher",
        category: "Navigation",
        tag: "UI CONTROL",
        desc: "Premium tab switcher with sliding indicator and glow.",
        previewBg: "bg-[#09090b]",
        component: <InteractiveTabs />,
        code: `import React, { useState } from 'react';
import { motion } from 'framer-motion';

const LuxeTabSwitcher = () => {
  const [activeTab, setActiveTab] = useState('Profile');
  const tabs = ['Profile', 'Settings', 'Security'];

  return (
    <div className="flex p-1.5 bg-zinc-950 rounded-2xl border border-white/5 relative shadow-2xl">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={\`relative z-10 px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all duration-500 \${
            activeTab === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
          }\`}
        >
          {activeTab === tab && (
            <motion.div
              layoutId="active-tab"
              className="absolute inset-0 bg-gradient-to-br from-[#e11d48] to-[#be123c] rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)]"
            />
          )}
          <span className="relative z-10">{tab}</span>
        </button>
      ))}
    </div>
  );
};

export default LuxeTabSwitcher;`
    },
    // ID 21 onwards started here... adding quickly
    {
        id: 21,
        name: "Cloud Status Card",
        category: "Surface",
        tag: "STYLES",
        desc: "Uptime indicator card with pulse and secondary info.",
        previewBg: "bg-[#050507]",
        component: (
            <div className="w-52 p-5 bg-zinc-950 border border-white/5 rounded-3xl">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black text-zinc-700 uppercase">Server Status</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="text-lg font-black text-white">All Operational</div>
                <div className="text-[9px] text-[#e11d48] font-bold mt-1 uppercase tracking-tighter">99.99% Uptime</div>
            </div>
        ),
        code: `import React from 'react';

const CloudStatusCard = () => {
  return (
    <div className="w-56 p-6 bg-zinc-950 border border-white/5 rounded-[2rem] shadow-2xl group hover:border-emerald-500/20 transition-all">
      <div className="flex justify-between items-center mb-6">
        <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">Network Status</span>
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
      </div>
      <div className="text-xl font-[1000] text-white tracking-tighter mb-2 italic">Neural Node Active</div>
      <div className="text-[10px] text-emerald-500/80 font-black uppercase tracking-widest">99.9% Net Uptime</div>
    </div>
  );
};

export default CloudStatusCard;`
    },
    {
        id: 22,
        name: "Newsletter Inline",
        category: "Forms",
        tag: "FORMS",
        desc: "Condensed email capture for mid-page insertion.",
        previewBg: "bg-[#0c0c0e]",
        component: (
            <div className="p-4 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex gap-3 w-64 shadow-2xl">
                <input className="flex-1 bg-transparent px-4 text-[11px] text-white outline-none" placeholder="Email" />
                <button className="px-5 py-2.5 bg-[#e11d48] text-white text-[10px] font-black uppercase rounded-full shadow-lg">Join</button>
            </div>
        ),
        code: `<div className="p-4 bg-zinc-900 border border-white/5 rounded-[2.5rem] flex gap-3 w-64">
  <input className="flex-1 bg-transparent px-4 text-[11px] text-white" placeholder="Email" />
  <button className="px-5 py-2.5 bg-[#e11d48] text-white text-[10px] font-black uppercase rounded-full">Join</button>
</div>`
    },
    {
        id: 23,
        name: "Glass Tag Group",
        category: "Feedback",
        tag: "GLASS",
        desc: "Row of translucent badges for meta-data information.",
        previewBg: "bg-[#030303]",
        component: (
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full text-[9px] font-bold text-white uppercase">React</span>
                <span className="px-3 py-1 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full text-[9px] font-bold text-[#e11d48] uppercase italic">Premium</span>
            </div>
        ),
        code: `import React from 'react';

const GlassTagGroup = () => {
  const tags = ['React', 'Premium', 'Next.js'];
  return (
    <div className="flex gap-2">
      {tags.map(tag => (
        <span 
          key={tag}
          className="px-3 py-1 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black text-white uppercase tracking-widest transition-all hover:bg-[#e11d48]/20 hover:border-[#e11d48]/40 cursor-default"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default GlassTagGroup;`
    },
    {
        id: 24,
        name: "Stats Grid Card",
        category: "Data Visuals",
        tag: "INDICATOR",
        desc: "High-density statistical module for dashboard grids.",
        previewBg: "bg-[#09090b]",
        component: (
            <div className="w-48 p-5 bg-black border border-white/10 rounded-3xl">
                <div className="flex items-center gap-3 mb-4 text-[#e11d48]">
                    <Activity size={18} />
                    <span className="text-[10px] font-black uppercase text-zinc-600">Growth</span>
                </div>
                <div className="text-3xl font-black text-white">+14.2%</div>
                <div className="h-1 w-full bg-zinc-900 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-[#e11d48] w-2/3" />
                </div>
            </div>
        ),
        code: `<div className="w-48 p-5 bg-black border border-white/10 rounded-3xl">
  <div className="text-3xl font-black text-white">+14.2%</div>
  <div className="h-1 w-full bg-zinc-900 rounded-full mt-4 overflow-hidden">
    <div className="h-full bg-[#e11d48] w-2/3" />
  </div>
</div>`
    },
    {
        id: 25,
        name: "Minimal Dropdown",
        category: "Navigation",
        tag: "UI CONTROL",
        desc: "Select menu snippet for context menus or filter pickers.",
        previewBg: "bg-[#050507]",
        component: (
            <div className="w-44 bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="px-4 py-2.5 bg-[#e11d48]/10 text-[#e11d48] text-[10px] font-black uppercase flex justify-between items-center">Recent Files <ChevronRight size={14} /></div>
                <div className="p-1 space-y-0.5">
                    {['Edit', 'Export', 'Duplicate'].map(opt => (
                        <div key={opt} className="px-3 py-2 text-zinc-500 text-[10px] font-bold uppercase rounded-xl hover:bg-white/5 hover:text-white transition-all cursor-pointer">{opt}</div>
                    ))}
                </div>
            </div>
        ),
        code: `import React from 'react';
import { ChevronRight } from 'lucide-react';

const MinimalDropdown = () => {
  const options = ['Edit', 'Export', 'Duplicate', 'Delete'];
  return (
    <div className="w-48 bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
      <div className="px-4 py-3 bg-[#e11d48]/10 text-[#e11d48] text-[10px] font-black uppercase tracking-widest flex justify-between items-center border-b border-white/5">
        Actions <ChevronRight size={14} />
      </div>
      <div className="p-1.5 space-y-0.5">
        {options.map(opt => (
          <button 
            key={opt} 
            className="w-full text-left px-3 py-2 text-zinc-500 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white/5 hover:text-white transition-all active:scale-95"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MinimalDropdown;`
    },
    {
        id: 26,
        name: "Card Stack Header",
        category: "Surface",
        tag: "LAYOUT",
        desc: "Visual grouping of card-like elements for depth.",
        previewBg: "bg-[#0c0c0e]",
        component: (
            <div className="relative w-48 h-32">
                <div className="absolute top-4 left-4 w-full h-full bg-zinc-950/50 border border-white/5 rounded-3xl" />
                <div className="absolute top-2 left-2 w-full h-full bg-zinc-900/50 border border-white/5 rounded-3xl" />
                <div className="absolute top-0 left-0 w-full h-full bg-black border border-white/10 rounded-3xl flex items-center justify-center text-[#e11d48] font-black text-xs uppercase tracking-widest">Master Layer</div>
            </div>
        ),
        code: `import React from 'react';

const CardStackHeader = () => {
  return (
    <div className="relative w-56 h-40 group cursor-default">
      <div className="absolute top-4 left-4 w-full h-full bg-zinc-950 border border-white/5 rounded-[2rem] group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
      <div className="absolute top-2 left-2 w-full h-full bg-zinc-900 border border-white/5 rounded-[2rem] group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-500" />
      <div className="absolute top-0 left-0 w-full h-full bg-black border border-white/10 rounded-[2rem] flex items-center justify-center shadow-2xl">
        <span className="text-[#e11d48] font-black text-[11px] uppercase tracking-[0.3em]">Master Frame</span>
      </div>
    </div>
  );
};

export default CardStackHeader;`
    },
    {
        id: 27,
        name: "Input with Addon",
        category: "Inputs",
        tag: "FORMS",
        desc: "Text field with integrated rose-themed action button.",
        previewBg: "bg-[#030303]",
        component: (
            <div className="flex bg-black border border-white/5 rounded-xl overflow-hidden w-64 h-11 items-center pr-1 focus-within:border-[#e11d48]/50 transition-all">
                <input className="flex-1 bg-transparent px-4 text-xs text-white outline-none" placeholder="Search project..." />
                <button className="bg-zinc-900 border border-white/5 h-9 px-4 rounded-lg text-white text-[10px] font-black uppercase hover:bg-zinc-800 transition-all">Go</button>
            </div>
        ),
        code: `<div className="flex bg-black border border-white/5 rounded-xl overflow-hidden w-64 h-11 items-center pr-1">
  <input className="flex-1 bg-transparent px-4 text-xs text-white outline-none" placeholder="Search..." />
  <button className="bg-zinc-900 border border-white/5 h-9 px-4 rounded-lg text-white text-[10px] font-black uppercase">Go</button>
</div>`
    },
    {
        id: 28,
        name: "Luxe Badge Small",
        category: "Feedback",
        tag: "STYLES",
        desc: "A small, high-density badge for statuses.",
        previewBg: "bg-[#09090b]",
        component: (
            <div className="flex gap-2">
                <div className="px-2 py-0.5 bg-[#e11d48]/10 text-[#e11d48] border border-[#e11d48]/20 rounded-md text-[8px] font-black uppercase tracking-widest">New Release</div>
                <div className="px-2 py-0.5 bg-zinc-900 text-zinc-500 border border-white/5 rounded-md text-[8px] font-black uppercase tracking-widest">Beta</div>
            </div>
        ),
        code: `import React from 'react';

const StatusBadgeGroup = () => {
  return (
    <div className="flex gap-2">
      <div className="px-2.5 py-1 bg-[#e11d48]/10 text-[#e11d48] border border-[#e11d48]/20 rounded-lg text-[8px] font-black uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(225,29,72,0.1)]">
        High Priority
      </div>
      <div className="px-2.5 py-1 bg-zinc-900 text-zinc-500 border border-white/5 rounded-lg text-[8px] font-black uppercase tracking-[0.2em]">
        Internal
      </div>
    </div>
  );
};

export default StatusBadgeGroup;`
    },
    {
        id: 29,
        name: "Condensed Breadcrumb",
        category: "Navigation",
        tag: "UI CONTROL",
        desc: "Path navigator for complex application structures.",
        previewBg: "bg-[#050507]",
        component: (
            <div className="flex items-center gap-2 px-4 py-2 bg-black border border-white/5 rounded-2xl scale-90">
                <span className="text-[10px] font-bold text-zinc-700 uppercase">Home</span>
                <ChevronRight size={12} className="text-zinc-800" />
                <span className="text-[10px] font-bold text-zinc-700 uppercase">Project</span>
                <ChevronRight size={12} className="text-[#e11d48]" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Details</span>
            </div>
        ),
        code: `import React from 'react';
import { ChevronRight } from 'lucide-react';

const CondensedBreadcrumb = () => {
  const items = ['Core', 'Network', 'Nodes'];
  return (
    <div className="flex items-center gap-2 px-5 py-2.5 bg-black border border-white/5 rounded-2xl">
      {items.map((item, i) => (
        <React.Fragment key={item}>
          <span className={\`text-[10px] font-black uppercase tracking-widest \${
            i === items.length - 1 ? 'text-white' : 'text-zinc-700'
          }\`}>
            {item}
          </span>
          {i < items.length - 1 && <ChevronRight size={12} className="text-[#e11d48]/40" />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CondensedBreadcrumb;`
    },
    {
        id: 30,
        name: "Modern Switch",
        category: "Inputs",
        tag: "UI CONTROL",
        desc: "Simple, high-impact boolean controller.",
        previewBg: "bg-[#0c0c0e]",
        component: <InteractiveSwitch />,
        code: `import React, { useState } from 'react';

const ModernSwitch = () => {
  const [active, setActive] = useState(true);
  return (
    <div 
      onClick={() => setActive(!active)}
      className={\`w-12 h-6 rounded-full relative transition-all duration-500 cursor-pointer \${
        active ? 'bg-[#e11d48] shadow-[0_0_20px_rgba(225,29,72,0.4)]' : 'bg-zinc-800'
      }\`}
    >
      <div className={\`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-md \${
        active ? 'right-1' : 'right-7'
      }\`} />
    </div>
  );
};

export default ModernSwitch;`
    },
    // ID 31 to 40 - Accelerating to finish the 40+ request
    {
        id: 31,
        name: "Avatar Stack",
        category: "Surface",
        tag: "USER",
        desc: "Overlapping user avatars for group displays.",
        previewBg: "bg-[#030303]",
        component: <InteractiveAvatarStack />,
        code: `import React from 'react';
import { motion } from 'framer-motion';

const InteractiveAvatarStack = () => {
  const avatars = [1, 2, 3, 4, 5];
  return (
    <div className="flex -space-x-4">
      {avatars.map(i => (
        <motion.div
            key={i}
            whileHover={{ y: -10, zIndex: 50, scale: 1.1 }}
            className="w-14 h-14 rounded-full border-[3px] border-black bg-zinc-900 overflow-hidden shadow-2xl cursor-pointer"
        >
            <img 
              src={\`https://api.dicebear.com/7.x/avataaars/svg?seed=rk_\${i}\`} 
              className="w-full h-full object-cover" 
            />
        </motion.div>
      ))}
      <div className="w-14 h-14 rounded-full border-[3px] border-black bg-gradient-to-br from-[#e11d48] to-[#be123c] flex items-center justify-center text-[11px] font-black text-white shadow-xl hover:scale-110 transition-transform cursor-pointer">
        +2.4k
      </div>
    </div>
  );
};

export default InteractiveAvatarStack;`
    },
    {
        id: 32,
        name: "Pricing Module Vertical",
        category: "Cards",
        tag: "ECOMMERCE",
        desc: "Information-dense pricing card with benefit list.",
        previewBg: "bg-[#09090b]",
        component: (
            <div className="w-60 p-8 bg-zinc-950 border border-white/5 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e11d48]/5 blur-3xl rounded-full" />
                <div className="text-[10px] font-black text-[#e11d48] uppercase tracking-widest mb-2">Enterprise</div>
                <div className="text-4xl font-black text-white mb-6">$99<span className="text-xs text-zinc-600">/mo</span></div>
                <div className="space-y-4 mb-8">
                    {[1, 2, 3].map(i => <div key={i} className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase"><CheckCircle2 className="text-[#e11d48]" size={14} /> Feature Item {i}</div>)}
                </div>
                <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase rounded-2xl hover:bg-[#e11d48] hover:text-white transition-all">Get Started</button>
            </div>
        ),
        code: `import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const PricingModuleVertical = () => {
  const features = ['Neural Integration', 'Unlimited Nodes', '24/7 Priority Support'];
  return (
    <div className="w-72 p-10 bg-zinc-950 border border-white/5 rounded-[3rem] relative overflow-hidden group shadow-[0_30px_100px_rgba(0,0,0,0.8)]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#e11d48]/5 blur-3xl rounded-full" />
        <div className="text-[11px] font-black text-[#e11d48] uppercase tracking-[0.3em] mb-4">Enterprise</div>
        <div className="text-5xl font-[1000] text-white mb-8 tracking-tighter">
          $99<span className="text-[12px] text-zinc-600 font-bold uppercase tracking-widest ml-1">/mo</span>
        </div>
        <div className="space-y-5 mb-10">
            {features.map(f => (
              <div key={f} className="flex items-center gap-3 text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                <CheckCircle2 className="text-[#e11d48]" size={16} /> 
                {f}
              </div>
            ))}
        </div>
        <button className="w-full py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-[#e11d48] hover:text-white transition-all duration-500 shadow-xl">
          Initialize Access
        </button>
    </div>
  );
};

export default PricingModuleVertical;`
    },
    {
        id: 33,
        name: "Inline Notification",
        category: "Feedback",
        tag: "FEEDBACK",
        desc: "Contextual user alert for form validation or system updates.",
        previewBg: "bg-[#050507]",
        component: (
            <div className="w-64 p-4 bg-[#e11d48]/5 border border-[#e11d48]/20 rounded-2xl flex items-start gap-3">
                <AlertCircle size={16} className="text-[#e11d48] mt-0.5" />
                <div>
                    <div className="text-xs font-black text-white">Security Check</div>
                    <div className="text-[10px] text-zinc-600 font-bold leading-relaxed mt-1">Please verify your email address to continue.</div>
                </div>
            </div>
        ),
        code: `import React from 'react';
import { AlertCircle } from 'lucide-react';

const InlineNotification = () => {
  return (
    <div className="w-80 p-5 bg-[#e11d48]/5 border border-[#e11d48]/20 rounded-[2rem] flex items-start gap-4 shadow-[0_0_30px_rgba(225,29,72,0.05)] group hover:bg-[#e11d48]/10 transition-colors">
      <div className="w-10 h-10 rounded-2xl bg-[#e11d48]/20 flex items-center justify-center text-[#e11d48] shrink-0">
        <AlertCircle size={20} />
      </div>
      <div>
        <h4 className="text-white font-black text-xs uppercase tracking-widest mb-1">Security Alert</h4>
        <p className="text-zinc-600 text-[10px] font-bold leading-relaxed uppercase tracking-tighter">
          Unusual activity detected from a new node. Please verify identity.
        </p>
      </div>
    </div>
  );
};

export default InlineNotification;`
    },
    {
        id: 34,
        name: "Compact Search Bar",
        category: "Typography",
        tag: "FORMS",
        desc: "A search field with an integrated search icon.",
        previewBg: "bg-[#0c0c0e]",
        component: (
            <div className="w-56 flex items-center gap-3 px-4 h-10 bg-zinc-950 border border-white/5 rounded-full ring-[#e11d48]/20 focus-within:ring-4 transition-all focus-within:border-[#e11d48]/50">
                <Search size={14} className="text-zinc-700" />
                <input className="bg-transparent flex-1 text-xs text-white outline-none" placeholder="Find..." />
            </div>
        ),
        code: `import React from 'react';
import { Search } from 'lucide-react';

const CompactSearchBar = () => {
  return (
    <div className="w-64 flex items-center gap-3 px-5 h-12 bg-zinc-950 border border-white/10 rounded-full focus-within:border-[#e11d48]/50 focus-within:ring-4 focus-within:ring-[#e11d48]/5 transition-all shadow-inner">
      <Search size={16} className="text-zinc-700" />
      <input 
        className="bg-transparent flex-1 text-xs text-white outline-none placeholder:text-zinc-800 font-bold uppercase tracking-widest" 
        placeholder="Search..." 
      />
    </div>
  );
};

export default CompactSearchBar;`
    },
    {
        id: 35,
        name: "Luxe Progress Circle",
        category: "Data Visuals",
        tag: "INDICATOR",
        desc: "A circle loader with a rose-colored track.",
        previewBg: "bg-[#030303]",
        component: (
            <div className="w-16 h-16 relative">
                <svg className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-900" />
                    <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="150" strokeDashoffset="75" className="text-[#e11d48]" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">50%</div>
            </div>
        ),
        code: `import React from 'react';

const LuxeProgressCircle = ({ percentage = 50 }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="w-20 h-20 relative group">
      <svg className="w-full h-full -rotate-90">
        <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="4" fill="transparent" className="text-zinc-900" />
        <circle 
          cx="40" cy="40" r={radius} 
          stroke="#e11d48" strokeWidth="4" fill="transparent" 
          strokeDasharray={circumference} 
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out shadow-[0_0_20px_#e11d48]" 
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white uppercase tracking-tighter">
        {percentage}%
      </div>
    </div>
  );
};

export default LuxeProgressCircle;`
    },
    {
        id: 36,
        name: "Icon Menu Vertical",
        category: "Navigation",
        tag: "UI CONTROL",
        desc: "A row of vertical menu icons with tooltips.",
        previewBg: "bg-[#09090b]",
        component: (
            <div className="p-2 space-y-4 bg-black border border-white/5 rounded-2xl w-12 flex flex-col items-center">
                {[Activity, Layers, User, Settings].map((Icon, i) => (
                    <Icon key={i} size={18} className={i === 0 ? "text-[#e11d48]" : "text-zinc-700 hover:text-white transition-colors cursor-pointer"} />
                ))}
            </div>
        ),
        code: `import React from 'react';
import { Activity, Layers, User, Settings } from 'lucide-react';

const VerticalIconMenu = () => {
  const icons = [Activity, Layers, User, Settings];
  return (
    <div className="p-2.5 space-y-5 bg-black border border-white/5 rounded-2xl w-14 flex flex-col items-center shadow-2xl">
      {icons.map((Icon, i) => (
        <button key={i} className="group relative">
          <Icon 
            size={20} 
            className={i === 0 ? "text-[#e11d48]" : "text-zinc-700 group-hover:text-white transition-colors"} 
          />
          {i === 0 && <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-0.5 h-3 bg-[#e11d48] rounded-full shadow-[0_0_10px_#e11d48]" />}
        </button>
      ))}
    </div>
  );
};

export default VerticalIconMenu;`
    },
    {
        id: 37,
        name: "Credit Card Snippet",
        category: "Surface",
        tag: "ECOMMERCE",
        desc: "Minimalist visual for a payment method.",
        previewBg: "bg-[#050507]",
        component: <InteractiveCreditCard />,
        code: `<div className="w-56 h-32 p-6 bg-zinc-900 border border-white/10 rounded-2xl">
  <CreditCard className="text-zinc-700 mb-6" size={24} />
  <div className="text-sm font-black text-white tracking-widest">•••• 8844</div>
</div>`
    },
    {
        id: 38,
        name: "Project Progress Bar",
        category: "Data Visuals",
        tag: "STYLES",
        desc: "A sleek progress tracker for projects.",
        previewBg: "bg-[#0c0c0e]",
        component: (
            <div className="w-64 h-2 bg-zinc-900 rounded-full overflow-hidden">
                <div className="h-full bg-[#e11d48] rounded-full" style={{ width: '40%' }} />
            </div>
        ),
        code: `<div className="w-64 h-2 bg-zinc-900 rounded-full overflow-hidden">
  <div className="h-full bg-[#e11d48] rounded-full" style={{ width: '40%' }} />
</div>`
    },
    {
        id: 39,
        name: "Simple Step Module",
        category: "Feedback",
        tag: "INDICATOR",
        desc: "A horizontal step indicator for multi-step processes.",
        previewBg: "bg-[#030303]",
        component: (
            <div className="flex items-center gap-2">
                {[1, 2, 3].map(i => <div key={i} className={`w-10 h-1 bg-${i === 1 ? '[#e11d48]' : 'zinc-900'} rounded-full`} />)}
            </div>
        ),
        code: `<div className="flex items-center gap-2">
  {[1, 2, 3].map(i => <div key={i} className={\`w-10 h-1 bg-\${i === 1 ? '[#e11d48]' : 'zinc-900'} rounded-full\`} />)}
</div>`
    },
    {
        id: 40,
        name: "Rose Gradient Reveal",
        category: "Typography",
        tag: "STYLES",
        desc: "A text element that fades into a rose gradient.",
        previewBg: "bg-[#09090b]",
        component: (
            <div className="text-3xl font-[1000] tracking-tighter bg-gradient-to-r from-zinc-800 to-[#e11d48] bg-clip-text text-transparent">
                Accelerate.
            </div>
        ),
        code: `import React from 'react';

const RoseGradientReveal = () => {
  return (
    <div className="relative group overflow-hidden py-2">
      <div className="text-5xl font-[1000] tracking-tighter bg-gradient-to-r from-zinc-800 to-[#e11d48] bg-clip-text text-transparent transition-all duration-700 group-hover:tracking-widest">
        ACCELERATE.
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#e11d48]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
    </div>
  );
};

export default RoseGradientReveal;`
    },
    {
        id: 41,
        name: "Neural Slide Carousel",
        category: "Navigation", // Or "Surface"? Let's put in "Surface" or "Navigation"
        tag: "PREMIUM",
        desc: "Smooth horizontal carousel with glass effects and rose indicators.",
        previewBg: "bg-[#050507]",
        component: <InteractiveCarouselSlider />,
        code: `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const NeuralSlideCarousel = () => {
    const [current, setCurrent] = useState(0);
    const slides = [
        { title: 'Neural Core', color: 'from-[#e11d48]' },
        { title: 'Quantum Node', color: 'from-blue-600' },
        { title: 'Cyber Frame', color: 'from-emerald-600' }
    ];

    const next = () => setCurrent((c) => (c + 1) % slides.length);
    const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

    return (
        <div className="w-full max-w-3xl aspect-[21/9] bg-zinc-950 rounded-[3rem] border border-white/5 overflow-hidden relative group shadow-2xl">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.7 }}
                    className={\`absolute inset-0 bg-gradient-to-br \${slides[current].color} to-black opacity-40\`}
                />
            </AnimatePresence>
            
            <div className="absolute inset-0 flex items-center justify-center text-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <h2 className="text-white font-[1000] text-4xl uppercase italic tracking-tighter">
                            {slides[current].title}
                        </h2>
                        <div className="h-1 w-12 bg-[#e11d48] mx-auto mt-4 rounded-full" />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
                {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)} className={\`h-1.5 transition-all duration-500 rounded-full \${i === current ? 'w-8 bg-[#e11d48]' : 'w-2 bg-zinc-800'}\`} />
                ))}
            </div>

            <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#e11d48]">
                <ChevronLeft size={24} />
            </button>
            <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-[#e11d48]">
                <ChevronRight size={24} />
            </button>
        </div>
    );
};

export default NeuralSlideCarousel;`
    },
    {
        id: 42,
        name: "3D Perspective Stack",
        category: "Cards",
        tag: "STYLES",
        desc: "Stacked card carousel with 3D depth and spring-based transitions.",
        previewBg: "bg-[#09090b]",
        component: <InteractiveStackCarousel />,
        code: `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const PerspectiveStack = () => {
    const [index, setIndex] = useState(0);
    const cards = [1, 2, 3];
    
    return (
        <div className="flex items-center justify-center h-80 relative perspective-1000 w-full">
            {cards.map((c, i) => {
                const isActive = i === index;
                const offset = (i - index + cards.length) % cards.length;
                
                return (
                    <motion.div
                        key={c}
                        onClick={() => setIndex(i)}
                        animate={{
                            scale: isActive ? 1 : 0.8 - offset * 0.1,
                            x: offset * 40,
                            z: -offset * 100,
                            opacity: 1 - offset * 0.3,
                            zIndex: 10 - offset
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className={\`absolute w-44 h-56 rounded-[2.5rem] border border-white/10 cursor-pointer overflow-hidden shadow-2xl \${
                            isActive ? 'bg-gradient-to-br from-zinc-800 to-black shadow-[0_0_50px_rgba(225,29,72,0.2)]' : 'bg-zinc-950'
                        }\`}
                    >
                        <div className="p-6 h-full flex flex-col justify-between">
                            <div className="w-10 h-10 rounded-2xl bg-[#e11d48]/10 flex items-center justify-center text-[#e11d48] mb-4">
                                <Zap size={20} />
                            </div>
                            <div>
                                <h4 className="text-white font-black text-xs uppercase mb-1 tracking-widest">Node 0\${c}</h4>
                                <div className="h-1 w-8 bg-[#e11d48] rounded-full" />
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default PerspectiveStack;`
    },
    {
        id: 43,
        name: "Cognitive AI Input",
        category: "Forms",
        tag: "PREMIUM",
        desc: "ChatGPT style input with an expandable action menu and rose accents.",
        previewBg: "bg-[#030303]",
        component: <InteractiveAIChatInput />,
        code: `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Image, Search, Code, Send } from 'lucide-react';

const CognitiveAIInput = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <div className="w-full max-w-2xl bg-zinc-950 border border-white/5 rounded-[2.5rem] p-4 shadow-2xl relative group overflow-hidden">
            <div className="flex gap-1 items-center mb-2 px-2">
                <div className="flex gap-1">
                    <div className="w-1 h-3 bg-[#e11d48] rounded-full animate-pulse" />
                    <div className="w-1 h-3 bg-zinc-800 rounded-full" />
                </div>
                <span className="text-[8px] font-black uppercase text-zinc-700 tracking-widest ml-2">Neural Interface V4</span>
            </div>

            <div className="relative flex items-end gap-3">
                <button 
                  onClick={() => setIsOpen(!isOpen)}
                  className={\`w-12 h-12 rounded-2xl flex items-center justify-center transition-all \${
                    isOpen ? 'bg-[#e11d48] text-white rotate-45 shadow-[0_0_20px_#e11d48]' : 'bg-zinc-900 text-zinc-600 hover:text-white hover:bg-zinc-800'
                  }\`}
                >
                    <Plus size={24} />
                </button>

                <div className="flex-1 bg-zinc-900/50 rounded-2xl border border-white/5 p-1 flex items-end">
                    <textarea 
                      className="w-full bg-transparent p-3 text-sm text-zinc-300 outline-none resize-none min-h-[48px] placeholder:text-zinc-800 font-bold" 
                      placeholder="Instruct Neural Intelligence..."
                    />
                    <button className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:bg-[#e11d48] hover:text-white transition-all m-1 shadow-xl">
                      <Send size={18} />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="flex gap-3 mt-4"
                    >
                        {[
                          { icon: <Image size={18} />, label: 'Assets' },
                          { icon: <Search size={18} />, label: 'Research' },
                          { icon: <Code size={18} />, label: 'Logic' }
                        ].map(item => (
                            <button key={item.label} className="px-5 py-2.5 bg-zinc-900 border border-white/5 rounded-xl flex items-center gap-2 text-[9px] font-black uppercase text-zinc-500 hover:text-white hover:bg-[#e11d48]/20 transition-all">
                                {item.icon} {item.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CognitiveAIInput;`
    },
    {
        id: 44,
        name: "Full-Width Hero Slider",
        category: "Surface",
        tag: "LAYOUT",
        desc: "High-impact carousel variant for hero sections with deep shadows.",
        previewBg: "bg-[#0c0c0e]",
        component: <InteractiveCarouselSlider />,
        code: `import React from 'react';

const FullWidthHeroSlider = () => {
    return (
        <div className="w-full h-[500px] bg-black relative overflow-hidden rounded-[3rem] border border-white/10 shadow-[0_50px_100px_rgba(0,0,0,0.9)] group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=2000')] bg-cover bg-center opacity-30 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <div className="px-6 py-2 bg-[#e11d48]/10 border border-[#e11d48]/20 rounded-full text-[#e11d48] text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-bounce">
                    New Collection 2024
                </div>
                <h2 className="text-white font-[1000] text-7xl uppercase italic tracking-tighter leading-none mb-10">
                    The Pulse<br />Of Future
                </h2>
                <button className="px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-[#e11d48] hover:text-white transition-all shadow-2xl active:scale-95">
                    Explore Deep
                </button>
            </div>
        </div>
    );
};

export default FullWidthHeroSlider;`
    }
];
