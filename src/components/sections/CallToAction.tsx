"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
    return (
        <section className="py-32 px-6 md:px-20 bg-background border-t border-border/40">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-5xl md:text-8xl font-heading font-bold mb-8 tracking-tight">
                    Let's Build <br />
                    <span className="text-gradient-premium">Something Iconic.</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                    Ready to transform your digital presence? I'm currently available for freelance projects and collaborations.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button size="lg" className="rounded-full text-lg px-10 py-8 h-auto" asChild>
                        <Link href="mailto:hello@ratnesh.dev">
                            Start a Project <ArrowRight className="ml-2 w-6 h-6" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-full text-lg px-10 py-8 h-auto" asChild>
                        <Link href="/contact">
                            <Mail className="mr-2 w-5 h-5" /> Get in Touch
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
