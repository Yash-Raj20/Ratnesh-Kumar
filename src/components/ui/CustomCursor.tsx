"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovering, setIsHovering] = useState(false);
    const [isTextHover, setIsTextHover] = useState(false);
    const [isInput, setIsInput] = useState(false);

    // Smoother spring config for premium feel
    const springConfig = { damping: 30, stiffness: 300 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const tagName = target.tagName.toLowerCase();
            const isContentEditable = target.isContentEditable;

            // Check for input elements
            const isInputField = tagName === 'input' || tagName === 'textarea' || isContentEditable;

            // Check for interactive elements
            const isLink = tagName === 'a' || target.closest('a');
            const isButton = tagName === 'button' || target.closest('button');

            // Check for text elements
            const isText = tagName === 'p' || tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4' || tagName === 'h5' || tagName === 'h6' || tagName === 'span' || tagName === 'li';

            if (isInputField) {
                setIsInput(true);
                setIsHovering(false);
                setIsTextHover(false);
            } else if (isLink || isButton) {
                setIsInput(false);
                setIsHovering(true);
                setIsTextHover(false);
            } else if (isText) {
                setIsInput(false);
                setIsTextHover(true);
                setIsHovering(false);
            } else {
                setIsInput(false);
                setIsHovering(false);
                setIsTextHover(false);
            }
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    if (isInput) return null;

    return (
        <motion.div
            className="fixed left-0 top-0 w-6 h-6 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999] hidden lg:block"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
            animate={{
                scale: isHovering ? 2.5 : isTextHover ? 1.5 : 1,
                opacity: 1
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
    );
}
