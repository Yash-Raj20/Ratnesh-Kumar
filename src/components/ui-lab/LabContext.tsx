"use client";

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { COMPONENTS_LIBRARY, ComponentItem } from "@/data/components-library";

interface LabContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    activeCategory: string;
    setActiveCategory: (category: string) => void;
    activePill: string;
    setActivePill: (pill: string) => void;
    filteredComponents: ComponentItem[];
    // Pagination
    currentPage: number;
    setCurrentPage: (page: number) => void;
    itemsPerPage: number;
    paginatedComponents: ComponentItem[];
    totalPages: number;
}

const LabContext = createContext<LabContextType | undefined>(undefined);

export function LabProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Components");
    const [activePill, setActivePill] = useState("All Components");

    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const filteredComponents = useMemo(() => {
        return COMPONENTS_LIBRARY.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "All Components" || item.category === activeCategory;

            const matchesPill = activePill === "All Components" ||
                item.tag.toLowerCase().includes(activePill.toLowerCase()) ||
                item.category.toLowerCase().includes(activePill.toLowerCase());

            return matchesSearch && matchesCategory && matchesPill;
        });
    }, [searchQuery, activeCategory, activePill]);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, activeCategory, activePill]);

    const totalPages = Math.ceil(filteredComponents.length / itemsPerPage);

    const paginatedComponents = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredComponents.slice(start, start + itemsPerPage);
    }, [filteredComponents, currentPage, itemsPerPage]);

    return (
        <LabContext.Provider value={{
            searchQuery,
            setSearchQuery,
            activeCategory,
            setActiveCategory,
            activePill,
            setActivePill,
            filteredComponents,
            currentPage,
            setCurrentPage,
            itemsPerPage,
            paginatedComponents,
            totalPages
        }}>
            {children}
        </LabContext.Provider>
    );
}

export function useLab() {
    const context = useContext(LabContext);
    if (!context) {
        throw new Error("useLab must be used within a LabProvider");
    }
    return context;
}
