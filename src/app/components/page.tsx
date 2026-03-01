"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Filters from "@/components/ui-lab/Filters";
import ComponentCard from "@/components/ui-lab/ComponentCard";
import PreviewModal from "@/components/ui-lab/PreviewModal";
import Pagination from "@/components/ui-lab/Pagination";
import { useLab } from "@/components/ui-lab/LabContext";
import { ComponentItem } from "@/data/components-library";

export default function ComponentsPage() {
    const {
        paginatedComponents,
        activePill,
        setActivePill,
        setActiveCategory
    } = useLab();

    const [selectedComponent, setSelectedComponent] = useState<ComponentItem | null>(null);
    const [showCode, setShowCode] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <>
            <Filters
                activePill={activePill}
                setActivePill={setActivePill}
                setActiveCategory={setActiveCategory}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[600px]">
                <AnimatePresence mode="popLayout" initial={false}>
                    {paginatedComponents.map((item) => (
                        <ComponentCard
                            key={item.id}
                            item={item}
                            onPreview={setSelectedComponent}
                            onCopy={handleCopy}
                        />
                    ))}
                </AnimatePresence>
            </div>

            <Pagination />

            <PreviewModal
                selectedComponent={selectedComponent}
                setSelectedComponent={setSelectedComponent}
                showCode={showCode}
                setShowCode={setShowCode}
                copied={copied}
                onCopy={handleCopy}
            />
        </>
    );
}
