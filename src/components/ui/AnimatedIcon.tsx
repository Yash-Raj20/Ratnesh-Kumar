"use client";

import { motion } from "framer-motion";

interface AnimatedIconProps {
    name: string;
    isActive: boolean;
    size?: number;
    className?: string;
}

export function AnimatedIcon({ name, isActive, size = 20, className }: AnimatedIconProps) {
    const transition = {
        type: "spring" as const,
        stiffness: 300,
        damping: 15
    };

    const renderIcon = () => {
        switch (name.toLowerCase()) {
            case "home":
                return (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <motion.path
                            d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                            animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                            transition={transition}
                            style={{ transformOrigin: "center" }}
                        />
                        <motion.polyline
                            points="9 22 9 12 15 12 15 22"
                            animate={isActive ? { y: -2 } : { y: 0 }}
                            transition={transition}
                            style={{ transformOrigin: "center" }}
                        />
                    </svg>
                );
            case "briefcase":
            case "projects":
                return (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                        <motion.path
                            d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
                            animate={isActive ? { y: -3, rotate: 12 } : { y: 0, rotate: 0 }}
                            transition={transition}
                            style={{ transformOrigin: "center" }}
                        />
                    </svg>
                );
            case "book-open":
            case "blog":
                return (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <motion.path
                            d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
                            animate={isActive ? { scaleX: 0.8, x: -1 } : { scaleX: 1, x: 0 }}
                            transition={transition}
                            style={{ transformOrigin: "right" }}
                        />
                        <motion.path
                            d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                            animate={isActive ? { scaleX: 0.8, x: 1 } : { scaleX: 1, x: 0 }}
                            transition={transition}
                            style={{ transformOrigin: "left" }}
                        />
                    </svg>
                );
            case "user":
            case "about":
                return (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <motion.path
                            d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
                            animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                            transition={transition}
                            style={{ transformOrigin: "center" }}
                        />
                        <motion.circle
                            cx="12" cy="7" r="4"
                            animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                            transition={transition}
                            style={{ transformOrigin: "center" }}
                        />
                    </svg>
                );
            case "message-square":
            case "contact":
                return (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
                        <motion.path
                            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                            animate={isActive ? { scale: 1.05, rotate: -5 } : { scale: 1, rotate: 0 }}
                            transition={transition}
                            style={{ transformOrigin: "center" }}
                        />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div className="flex items-center justify-center" whileTap={{ scale: 0.9 }}>
            {renderIcon()}
        </motion.div>
    );
}
