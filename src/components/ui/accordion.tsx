"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const AccordionContext = React.createContext<{
    activeItem: string | undefined;
    setActiveItem: (id: string) => void;
}>({
    activeItem: undefined,
    setActiveItem: () => { },
});

const AccordionItemContext = React.createContext<{
    value: string;
    isOpen: boolean;
}>({
    value: "",
    isOpen: false,
});

const Accordion = ({
    children,
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const [activeItem, setActiveItem] = React.useState<string | undefined>(undefined);

    const toggleItem = (id: string) => {
        setActiveItem((prev) => (prev === id ? undefined : id));
    };

    return (
        <AccordionContext.Provider value={{ activeItem, setActiveItem: toggleItem }}>
            <div className={cn("space-y-4", className)} {...props}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
};

const AccordionItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, value, children, ...props }, ref) => {
    const { activeItem } = React.useContext(AccordionContext);
    const isOpen = activeItem === value;

    return (
        <AccordionItemContext.Provider value={{ value, isOpen }}>
            <div
                ref={ref}
                className={cn("border border-border/50 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/40 overflow-hidden transition-colors hover:border-primary/20", className)}
                {...props}
            >
                {children}
            </div>
        </AccordionItemContext.Provider>
    );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
    const { setActiveItem } = React.useContext(AccordionContext);
    const { value, isOpen } = React.useContext(AccordionItemContext);

    return (
        <button
            ref={ref}
            onClick={() => setActiveItem(value)}
            className={cn(
                "flex flex-1 items-center justify-between w-full py-5 px-6 font-medium transition-all [&[data-state=open]>svg]:rotate-180 text-left text-lg",
                isOpen ? "text-primary" : "text-foreground",
                className
            )}
            {...props}
        >
            {children}
            <ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform duration-300 text-muted-foreground", isOpen && "rotate-180 text-primary")} />
        </button>
    );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
    const { isOpen } = React.useContext(AccordionItemContext);

    return (
        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                    <div ref={ref} className={cn("px-6 pb-6 pt-0 text-muted-foreground leading-relaxed", className)} {...props}>
                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
