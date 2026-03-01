"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X, Check, ArrowRight, ArrowLeft,
    Monitor, Smartphone, ShoppingCart,
    Zap, Sparkles, Layers,
    Shield, Bot, CreditCard, Languages, Globe,
    Clock, Rocket, Coffee,
    FileText, PenTool, Layout, LifeBuoy,
    Search, Share2, MousePointer2,
    Code, Tablet, Server, Cpu,
    ChevronRight, Info, Star,
    SmartphoneIcon, Globe2, Briefcase,
    BookOpen, Database, BarChart3, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const STEPS = [
    { id: "type", title: "Project Type", description: "What kind of platform are we building?" },
    { id: "size", title: "Project Scale", description: "How many pages or features do you need?" },
    { id: "design", title: "Visual Identity", description: "Choosing the premium look for your brand" },
    { id: "features", title: "Core Modules", description: "Add advanced functionalities & logic" },
    { id: "content", title: "Content Asset", description: "Who handles the copywriting and media?" },
    { id: "maintenance", title: "Ongoing Support", description: "Post-launch maintenance & hosting" },
    { id: "timeline", title: "Launch Window", description: "Your desired deadline for the project" }
];

const PROJECT_TYPES = [
    {
        id: "landing",
        name: "Landing Page",
        basePrice: 5000,
        icon: Layout,
        desc: "Single-page, high-converting checkout or lead gen site",
        details: ["Mobile Responsive", "Lead Capture Form", "Modern UI", "SEO Ready"]
    },
    {
        id: "portfolio",
        name: "Portfolio",
        basePrice: 12000,
        icon: Sparkles,
        desc: "Creative showcase for creators, artists, or professionals",
        details: ["Animated Gallery", "About/Contact", "Social Links", "Resume Download"]
    },
    {
        id: "business",
        name: "Business Site",
        basePrice: 22000,
        icon: Briefcase,
        desc: "Professional multi-page corporate presence",
        details: ["Up to 5 Pages", "Service Listing", "Google Maps", "Contact CRM"]
    },
    {
        id: "ecommerce",
        name: "E-commerce",
        basePrice: 38000,
        icon: ShoppingCart,
        desc: "Full online store with payment and order tracking",
        details: ["Product Search", "Cart/Checkout", "Admin Panel", "Invoice PDF"]
    },
    {
        id: "webapp",
        name: "SaaS / Web App",
        basePrice: 60000,
        icon: Database,
        desc: "Custom logic, user dashboards, and database systems",
        details: ["User Accounts", "Data Dashboards", "API Integration", "Real-time Sync"]
    },
    {
        id: "mobile_app",
        name: "Native Mobile App",
        basePrice: 55000,
        icon: SmartphoneIcon,
        desc: "Android & iOS app for Play Store and App Store",
        details: ["Push Notifications", "Offline Mode", "Camera access", "GPS Integration"]
    },
    {
        id: "crm",
        name: "CRM / Dashboard",
        basePrice: 45000,
        icon: BarChart3,
        desc: "Internal tools to manage your business operations",
        details: ["Data Analytics", "Role-based access", "Export to CSV", "Chat Support"]
    },
    {
        id: "blog",
        name: "News / Magazine",
        basePrice: 18000,
        icon: BookOpen,
        desc: "High-performance content site with ad-spots",
        details: ["SEO Optimized", "Newsletter Popups", "Sharing Tools", "Catagories"]
    }
];

const PROJECT_SIZES = [
    { id: "small", name: "Standard", price: 0, icon: FileText, desc: "Essential pages for a solid start", details: ["3-5 Standard Pages", "Basic Forms", "SVG Icons"] },
    { id: "medium", name: "Expansion+", price: 8000, icon: Layers, desc: "More content and dynamic components", details: ["Up to 15 Pages", "Blog Section", "Dynamic Filters"] },
    { id: "enterprise", name: "Premium Flow", price: 25000, icon: Globe2, desc: "Infinite scale and heavy traffic ready", details: ["Infinite Pages", "Multi-Region", "Custom Icons", "Advanced CMS"] }
];

const DESIGN_LEVELS = [
    { id: "clean", name: "Minimalist", price: 0, icon: Layout, desc: "Clean, fast, and highly functional", details: ["Responsive Design", "Google Fonts", "Standard Icons"] },
    { id: "premium", name: "Lux Design", price: 12000, icon: Zap, desc: "Heavy animations and custom feel", details: ["GSAP Animations", "Custom Branding", "Handpicked Media"] },
    { id: "exclusive", name: "Cinematic", price: 30000, icon: Sparkles, desc: "3D interactions and creative UX", details: ["Three.js / Spline", "Parallax Effects", "SVG Morphing"] }
];

const FEATURES = [
    { id: "auth", name: "Auth Module", price: 7000, icon: Shield, desc: "Google/GitHub Login system" },
    { id: "ai", name: "AI Assistant", price: 22000, icon: Bot, desc: "Custom trained LLM Chatbot" },
    { id: "payments", name: "Pay Gate", price: 10000, icon: CreditCard, desc: "Secure cards/UPI payments" },
    { id: "seo", name: "SEO Pro", price: 4000, icon: Search, desc: "Keyword mapping & sitemaps" },
    { id: "multi", name: "Globe Lang", price: 8000, icon: Languages, desc: "English / Hindi / Global" },
    { id: "social", name: "Social Feed", price: 4000, icon: Share2, desc: "Live Instagram/X threads" }
];

const CONTENT_SERVICES = [
    { id: "user", name: "Self Service", price: 0, icon: MousePointer2, desc: "Client provides all assets" },
    { id: "ai", name: "AI-Augmented", price: 4000, icon: Bot, desc: "AI writing with human proofing" },
    { id: "pro", name: "Copy Pro", price: 12000, icon: PenTool, desc: "Industry-standard copywriting" }
];

const MAINTENANCE_PLANS = [
    { id: "none", name: "Single Launch", price: 0, icon: X, desc: "One-time build & handoff" },
    { id: "standard", name: "Care Basic", price: 6000, icon: LifeBuoy, desc: "Monthly bug fixes/server scan" },
    { id: "priority", name: "VIP Shield", price: 15000, icon: Settings, desc: "24/7 Priority + Daily backup" }
];

const TIMELINES = [
    { id: "relaxed", name: "Paced", multiplier: 0.9, icon: Coffee, desc: "12 weeks (Best for budget)" },
    { id: "normal", name: "Priority", multiplier: 1, icon: Clock, desc: "6 weeks (Most popular)" },
    { id: "express", name: "Hyperdrive", multiplier: 1.3, icon: Rocket, desc: "2 weeks (Extreme deadline)" }
];

export default function ProjectEstimatorPage() {
    const [step, setStep] = useState(0);
    const [selection, setSelection] = useState({
        type: PROJECT_TYPES[0].id,
        size: PROJECT_SIZES[0].id,
        design: DESIGN_LEVELS[1].id,
        features: [] as string[],
        content: CONTENT_SERVICES[0].id,
        maintenance: MAINTENANCE_PLANS[0].id,
        timeline: TIMELINES[1].id
    });

    const breakdown = useMemo(() => {
        const typeObj = PROJECT_TYPES.find(t => t.id === selection.type)!;
        const sizeObj = PROJECT_SIZES.find(s => s.id === selection.size)!;
        const designObj = DESIGN_LEVELS.find(d => d.id === selection.design)!;
        const contentObj = CONTENT_SERVICES.find(c => c.id === selection.content)!;
        const maintenanceObj = MAINTENANCE_PLANS.find(m => m.id === selection.maintenance)!;
        const featuresList = FEATURES.filter(f => selection.features.includes(f.id));
        const featuresPrice = featuresList.reduce((acc, f) => acc + f.price, 0);
        const timelineObj = TIMELINES.find(t => t.id === selection.timeline)!;

        const subtotal = typeObj.basePrice + sizeObj.price + designObj.price + contentObj.price + maintenanceObj.price + featuresPrice;
        const total = Math.round(subtotal * timelineObj.multiplier);

        return {
            type: { name: typeObj.name, price: typeObj.basePrice },
            size: { name: sizeObj.name, price: sizeObj.price },
            design: { name: designObj.name, price: designObj.price },
            features: { count: featuresList.length, price: featuresPrice, list: featuresList },
            content: { name: contentObj.name, price: contentObj.price },
            maintenance: { name: maintenanceObj.name, price: maintenanceObj.price },
            timeline: { name: timelineObj.name, multiplier: timelineObj.multiplier },
            total
        };
    }, [selection]);

    const handleNext = () => setStep(prev => Math.min(prev + 1, STEPS.length - 1));
    const handleBack = () => setStep(prev => Math.max(prev - 1, 0));

    const toggleFeature = (id: string) => {
        setSelection(prev => ({
            ...prev,
            features: prev.features.includes(id)
                ? prev.features.filter(f => f !== id)
                : [...prev.features, id]
        }));
    };

    const sendWhatsAppQuote = () => {
        const { type, size, design, features, content, maintenance, timeline, total } = breakdown;

        const message = `🚀 *BRAND NEW ESTIMATE: ${type.name}* 🚀
━━━━━━━━━━━━━━━━━━━━
📦 *PROJECT BREAKDOWN:*
📱 *Type:* ${type.name} (₹${type.price.toLocaleString()})
📏 *Scale:* ${size.name} (+₹${size.price.toLocaleString()})
✨ *Design:* ${design.name} (+₹${design.price.toLocaleString()})
🔋 *Modules:* ${features.count} Components (+₹${features.price.toLocaleString()})
${features.list.map(f => `  • ${f.name}`).join("\n")}
✍️ *Asset Dev:* ${content.name} (+₹${content.price.toLocaleString()})
🛠️ *Protection:* ${maintenance.name} (+₹${maintenance.price.toLocaleString()})
⏳ *Delivery:* ${timeline.name} (${timeline.multiplier}x Rate)
━━━━━━━━━━━━━━━━━━━━
💰 *TOTAL ESTIMATE:* ₹${total.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━
Hey RK! I just built this custom quote on your site. Let's discuss the roadmap!`;

        window.open(`https://wa.me/9835854042?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 pt-32 pb-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto border border-white/5 rounded-[3rem] bg-zinc-950/20 backdrop-blur-xl overflow-hidden shadow-2xl">

                {/* Header Section */}
                <div className="p-8 md:p-12 border-b border-white/5 bg-gradient-to-b from-zinc-900/50 to-transparent">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <div>
                            <Link href="/" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-4 hover:gap-3 transition-all">
                                <ArrowLeft size={14} /> Back to Hub
                            </Link>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic leading-none mb-4">
                                Project Estimator
                            </h1>
                            <p className="text-zinc-500 font-medium italic max-w-lg">
                                Industrial grade estimation for high-end digital products. Built for builders.
                            </p>
                        </div>
                        <div className="flex flex-col items-center md:items-end">
                            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-1">Current Balance</div>
                            <motion.div
                                key={breakdown.total}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-5xl font-black text-primary tracking-tighter"
                            >
                                <span className="text-xl mr-1 italic">₹</span>{breakdown.total.toLocaleString()}
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row">

                    {/* Left Panel: Wizard Content */}
                    <div className="flex-1 p-8 md:p-12 border-r border-white/5 bg-zinc-950/40">
                        {/* Progress Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="space-y-1">
                                <div className="text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                    <span className="w-8 h-[2px] bg-primary" /> Step {step + 1}
                                </div>
                                <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tight">{STEPS[step].title}</h2>
                            </div>
                            <div className="flex gap-1">
                                {STEPS.map((_, i) => (
                                    <div
                                        key={i}
                                        className={cn(
                                            "h-1 rounded-full transition-all duration-500",
                                            i === step ? "w-12 bg-primary" : i < step ? "w-4 bg-primary/30" : "w-4 bg-zinc-800"
                                        )}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Step Description */}
                        <p className="text-zinc-500 text-sm italic font-medium mb-10 border-l-2 border-primary/20 pl-4">
                            {STEPS[step].description}
                        </p>

                        {/* Rendering Cards */}
                        <div className="min-h-[460px]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {renderStepContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Footer Buttons */}
                        <div className="mt-16 flex flex-col sm:flex-row gap-4">
                            {step > 0 && (
                                <button
                                    onClick={handleBack}
                                    className="px-8 py-4 rounded-2xl border border-white/10 text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <ArrowLeft size={14} /> Previous
                                </button>
                            )}

                            {step < STEPS.length - 1 ? (
                                <button
                                    onClick={handleNext}
                                    className="flex-1 px-8 py-5 rounded-2xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-primary/10"
                                >
                                    Continue <ArrowRight size={14} />
                                </button>
                            ) : (
                                <button
                                    onClick={sendWhatsAppQuote}
                                    className="flex-1 px-8 py-5 rounded-2xl bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(5,150,105,0.3)] active:scale-95 transition-all"
                                >
                                    Finalize Quote <ArrowRight size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Right Panel: Advanced Summary Sidebar */}
                    <div className="lg:w-96 p-8 md:p-12 bg-black/40 flex flex-col">
                        <div className="flex-1">
                            <div className="text-[14px] font-black uppercase tracking-widest text-zinc-500 mb-8 pb-4 border-b border-white/5 flex items-center justify-between">
                                Summary Details <span className="text-primary/40 italic">#EST-2024</span>
                            </div>

                            <div className="space-y-4">
                                <SummaryDetail label="Format" value={breakdown.type.name} price={breakdown.type.price} />
                                <SummaryDetail label="Scale" value={breakdown.size.name} price={breakdown.size.price} />
                                <SummaryDetail label="Identity" value={breakdown.design.name} price={breakdown.design.price} />
                                <SummaryDetail label="Add-ons" value={`${breakdown.features.count} Activated`} price={breakdown.features.price} />
                                <SummaryDetail label="Support" value={breakdown.maintenance.name} price={breakdown.maintenance.price} />
                                <SummaryDetail label="Speed" value={breakdown.timeline.name} multiplier={breakdown.timeline.multiplier} />
                            </div>

                            <div className="mt-12 p-6 rounded-2xl bg-zinc-900/30 border border-white/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 blur-2xl rounded-full" />
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Confidence Score</div>
                                <div className="flex items-center gap-2 mb-1">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} className={cn("fill-primary text-primary", i === 5 && "opacity-20")} />)}
                                    <span className="text-xs font-black text-primary ml-2 uppercase">92% Reliable</span>
                                </div>
                                <p className="text-[10px] text-zinc-500 font-medium italic mt-2 italic leading-relaxed">
                                    Our engine calculates based on 50+ past projects of similar scope.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/5 text-center">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-700 italic">
                                Industrial Development Agency<br />By Ratnesh Kumar
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderStepContent() {
        const itemVariants = {
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 }
        };

        switch (STEPS[step].id) {
            case "type":
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                        {PROJECT_TYPES.map(item => (
                            <CompactCard
                                key={item.id}
                                item={item}
                                isSelected={selection.type === item.id}
                                onClick={() => setSelection(prev => ({ ...prev, type: item.id }))}
                            />
                        ))}
                    </div>
                );
            case "size":
                return (
                    <div className="grid grid-cols-1 gap-4">
                        {PROJECT_SIZES.map(item => (
                            <DetailedCard
                                key={item.id}
                                item={item}
                                isSelected={selection.size === item.id}
                                onClick={() => setSelection(prev => ({ ...prev, size: item.id }))}
                            />
                        ))}
                    </div>
                );
            case "design":
                return (
                    <div className="grid grid-cols-1 gap-4">
                        {DESIGN_LEVELS.map(item => (
                            <DetailedCard
                                key={item.id}
                                item={item}
                                isSelected={selection.design === item.id}
                                onClick={() => setSelection(prev => ({ ...prev, design: item.id }))}
                                pricePrefix="+ ₹"
                            />
                        ))}
                    </div>
                );
            case "features":
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {FEATURES.map(item => (
                            <ModuleCard
                                key={item.id}
                                item={item}
                                isSelected={selection.features.includes(item.id)}
                                onClick={() => toggleFeature(item.id)}
                            />
                        ))}
                    </div>
                );
            default:
                const list = step === 4 ? CONTENT_SERVICES : step === 5 ? MAINTENANCE_PLANS : TIMELINES;
                const field = step === 4 ? "content" : step === 5 ? "maintenance" : "timeline";
                return (
                    <div className="grid grid-cols-1 gap-4">
                        {list.map((item: any) => (
                            <DetailedCard
                                key={item.id}
                                item={item}
                                isSelected={selection[field as keyof typeof selection] === item.id}
                                onClick={() => setSelection(prev => ({ ...prev, [field]: item.id }))}
                                pricePrefix={step === 6 ? "" : "+ ₹"}
                            />
                        ))}
                    </div>
                );
        }
    }
}

/* UI Helper Components */

function SummaryDetail({ label, value, price, multiplier }: { label: string, value: string | undefined, price?: number, multiplier?: number }) {
    return (
        <div className="flex flex-col gap-1 group pb-2 border-b border-white/[0.02]">
            <div className="flex items-center justify-between">
                <span className="text-[12px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-primary transition-colors">{label}</span>
                <span className="text-xs font-black italic text-zinc-300 group-hover:text-white transition-colors">{value || "---"}</span>
            </div>
            {(price !== undefined || multiplier !== undefined) && (
                <div className="flex justify-end">
                    <span className="text-[11px] font-bold text-zinc-500 italic">
                        {price !== undefined && (price > 0 ? `+ ₹${price.toLocaleString()}` : "Included")}
                        {multiplier !== undefined && `${multiplier}x Impact`}
                    </span>
                </div>
            )}
        </div>
    );
}

function CompactCard({ item, isSelected, onClick }: { item: any, isSelected: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "p-6 rounded-2xl border text-left transition-all group relative overflow-hidden flex flex-col gap-4 active:scale-[0.98]",
                isSelected
                    ? "bg-primary/5 border-primary shadow-[0_0_20px_rgba(var(--primary),0.1)]"
                    : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]"
            )}
        >
            <div className="flex items-center justify-between">
                <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    isSelected ? "bg-primary text-primary-foreground" : "bg-white/5 text-zinc-500"
                )}>
                    <item.icon size={18} />
                </div>
                {item.basePrice && (
                    <div className="text-right">
                        <div className="text-[10px] font-black uppercase text-zinc-600 mb-0.5">Base</div>
                        <div className={cn("text-sm font-black italic tracking-tighter", isSelected ? "text-primary" : "text-zinc-400")}>
                            ₹{item.basePrice.toLocaleString()}
                        </div>
                    </div>
                )}
            </div>

            <div>
                <h4 className="text-sm font-black uppercase tracking-tight italic mb-1">{item.name}</h4>
                <p className="text-[11px] text-zinc-500 font-medium leading-relaxed italic">{item.desc}</p>
            </div>

            {item.details && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.details.map((d: string) => (
                        <span key={d} className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-black uppercase tracking-widest text-zinc-600">
                            {d}
                        </span>
                    ))}
                </div>
            )}

            {isSelected && (
                <div className="absolute top-2 right-2 border-[6px] border-primary border-t-transparent border-l-transparent -rotate-45" />
            )}
        </button>
    );
}

function DetailedCard({ item, isSelected, onClick, pricePrefix = "" }: { item: any, isSelected: boolean, onClick: () => void, pricePrefix?: string }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "p-5 md:p-6 rounded-2xl border flex items-center gap-6 text-left transition-all relative overflow-hidden group active:scale-[0.99]",
                isSelected
                    ? "bg-primary/5 border-primary"
                    : "bg-white/5 border-white/5 hover:border-white/10 hover:bg-white/[0.07]"
            )}
        >
            <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all",
                isSelected ? "bg-primary/20 text-primary" : "bg-white/5 text-zinc-600"
            )}>
                <item.icon size={20} />
            </div>
            <div className="flex-1">
                <h4 className="text-sm font-black uppercase italic tracking-tight flex items-center gap-2">
                    {item.name}
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                </h4>
                <p className="text-[10px] text-zinc-500 font-medium italic mt-0.5">{item.desc}</p>
                {item.details && (
                    <div className="flex gap-4 mt-2">
                        {item.details.map((d: string) => (
                            <span key={d} className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-600">
                                <Check size={8} className="text-primary" /> {d}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="text-right">
                <span className={cn("text-lg font-black italic tracking-tighter", isSelected ? "text-primary" : "text-zinc-400")}>
                    {item.price === 0 ? "Included" : item.price !== undefined ? `${pricePrefix}${item.price.toLocaleString()}` : ""}
                    {item.multiplier && `${item.multiplier}x Rate`}
                </span>
            </div>
        </button>
    );
}

function ModuleCard({ item, isSelected, onClick }: { item: any, isSelected: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "p-4 rounded-xl border flex items-center gap-4 text-left transition-all group relative active:scale-[0.98]",
                isSelected
                    ? "bg-primary/5 border-primary"
                    : "bg-white/5 border-white/5 hover:border-white/10"
            )}
        >
            <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                isSelected ? "bg-primary/20 text-primary" : "bg-white/5 text-zinc-600"
            )}>
                <item.icon size={16} />
            </div>
            <div className="flex-1">
                <h5 className="text-[12px] font-black uppercase tracking-tight italic leading-none mb-1">{item.name}</h5>
                <p className="text-[10px] text-zinc-600 font-bold italic truncate w-32">{item.desc}</p>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-primary italic mb-1">+₹{item.price.toLocaleString()}</span>
                <div className={cn(
                    "w-4 h-4 rounded-md border flex items-center justify-center transition-all",
                    isSelected ? "bg-primary border-primary scale-100" : "border-white/10 scale-90"
                )}>
                    {isSelected && <Check size={10} className="text-primary-foreground stroke-[4px]" />}
                </div>
            </div>
        </button>
    );
}
