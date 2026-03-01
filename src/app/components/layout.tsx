"use client";

import React from "react";
import Sidebar from "@/components/ui-lab/Sidebar";
import Header from "@/components/ui-lab/Header";
import { LabProvider, useLab } from "@/components/ui-lab/LabContext";

function LabLayoutContent({ children }: { children: React.ReactNode }) {
    const {
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery
    } = useLab();

    return (
        <div className="flex h-screen text-zinc-400 overflow-hidden font-sans selection:bg-[#e11d48]/20 selection:text-[#e11d48] !cursor-auto dark"
            style={{
                background: "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 30%, rgba(255,255,255,0.05) 0%, transparent 40%), linear-gradient(120deg, #0f0e17 0%, #1a1b26 100%)"
            }}
        >
            <style jsx global>{`
                * {
                    cursor: auto !important;
                }
                .custom-cursor {
                    display: none !important;
                }
                nav.fixed, footer.fixed {
                    display: none !important;
                }
            `}</style>

            <Sidebar
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />

            <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-[#050507]">
                <Header
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar" data-lenis-prevent>
                    <div className="mx-auto pt-8">
                        {children}
                    </div>
                </div>

                {/* Crimson Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e11d48]/[0.015] blur-[150px] rounded-full -mr-[250px] -mt-[150px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#be123c]/[0.01] blur-[100px] rounded-full -ml-[150px] -mb-[100px] pointer-events-none" />
            </main>
        </div>
    );
}

export default function LabLayout({ children }: { children: React.ReactNode }) {
    return (
        <LabProvider>
            <LabLayoutContent>{children}</LabLayoutContent>
        </LabProvider>
    );
}
