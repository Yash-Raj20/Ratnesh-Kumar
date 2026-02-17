"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactCTA() {
    return (
        <section className="py-40 px-6 md:px-20 flex flex-col items-center justify-center text-center bg-zinc-50 dark:bg-zinc-900/30">
            <h2 className="text-4xl md:text-7xl font-heading font-medium tracking-tight mb-8">
                Have an idea?
                <br className="hidden md:block" />
                <span className="text-muted-foreground">Let's build it together.</span>
            </h2>
            <Button size="lg" className="rounded-full text-lg px-10 py-8" asChild>
                <Link href="/contact">Get in Touch</Link>
            </Button>
        </section>
    );
}
