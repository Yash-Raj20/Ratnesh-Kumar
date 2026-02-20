"use client";

import React, { useEffect } from "react";
import { useMotionValue, useSpring, motion } from "framer-motion";

export const SpotlightBg = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 30, stiffness: 200 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Subtracting half of the spotlight size (300px) to center it
            mouseX.set(e.clientX - 300);
            mouseY.set(e.clientY - 300);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="pointer-events-none fixed top-0 left-0 w-[600px] h-[600px] z-30 opacity-60"
            style={{
                x: springX,
                y: springY,
                background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.08) 0%, transparent 70%)",
                willChange: "transform", // Hint to browser for GPU optimization
            }}
        />
    );
};
