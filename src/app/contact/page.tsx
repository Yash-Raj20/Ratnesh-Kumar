"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Mail, MapPin, Github, Linkedin, Twitter, ArrowRight, Send,
    CheckCircle2, Coffee, HelpCircle, MessageSquare
} from "lucide-react";
import ElectricNodesBg from "@/components/ui/ElectricNodesBg";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    ...formData,
                }),
            });

            const result = await res.json();

            if (result.success) {
                setStatus('success');
                setFormData({ name: "", email: "", subject: "", message: "" });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                console.error("Web3Forms Error:", result);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
            setStatus('error');
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            title: t('contactPage.info.email.title'),
            value: "hello@ratnesh.dev",
            link: "mailto:hello@ratnesh.dev",
            description: t('contactPage.info.email.desc')
        },
        {
            icon: MapPin,
            title: t('contactPage.info.location.title'),
            value: t('contactPage.info.location.value'),
            link: null,
            description: t('contactPage.info.location.desc')
        },
        {
            icon: MessageSquare,
            title: t('contactPage.info.socials.title'),
            value: t('contactPage.info.socials.value'),
            link: "#",
            description: t('contactPage.info.socials.desc')
        }
    ];

    const socialLinks = [
        { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:bg-[#0077b5]" },
        { name: "Twitter", icon: Twitter, href: "#", color: "hover:bg-[#1DA1F2]" },
        { name: "GitHub", icon: Github, href: "#", color: "hover:bg-[#333]" },
    ];

    const timelineSteps = [
        {
            icon: MessageSquare,
            title: t('contactPage.next.steps.discovery.title'),
            desc: t('contactPage.next.steps.discovery.desc')
        },
        {
            icon: Coffee,
            title: t('contactPage.next.steps.proposal.title'),
            desc: t('contactPage.next.steps.proposal.desc')
        },
        {
            icon: CheckCircle2,
            title: t('contactPage.next.steps.kickoff.title'),
            desc: t('contactPage.next.steps.kickoff.desc')
        }
    ];

    const faqs = [
        {
            question: t('contactPage.faq.items.availability.q'),
            answer: t('contactPage.faq.items.availability.a')
        },
        {
            question: t('contactPage.faq.items.pricing.q'),
            answer: t('contactPage.faq.items.pricing.a')
        },
        {
            question: t('contactPage.faq.items.tech.q'),
            answer: t('contactPage.faq.items.tech.a')
        },
        {
            question: t('contactPage.faq.items.existing.q'),
            answer: t('contactPage.faq.items.existing.a')
        }
    ];

    return (
        <div className="min-h-screen pt-40 md:pt-60 pb-20 px-6 md:px-20 relative overflow-hidden bg-background">
            {/* Background Elements */}
            <ElectricNodesBg />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

                    {/* LEFT COLUMN: Info & Context */}
                    <div className="lg:sticky lg:top-32 space-y-16">

                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-4 flex items-center gap-2">
                                <span className="w-8 h-[2px] bg-primary"></span>
                                {t('contactPage.hero.badge')}
                            </h2>
                            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-[1.1]">
                                {t('contactPage.hero.title1')} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-500 animate-gradient-x">{t('contactPage.hero.title2')}</span>
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                                {t('contactPage.hero.description')}
                            </p>
                        </motion.div>

                        {/* Contact Cards */}
                        <div className="grid gap-6">
                            {contactInfo.map((item, index) => (
                                <motion.a
                                    key={item.title}
                                    href={item.link || "#"}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                    className={`group flex items-center gap-6 p-6 rounded-3xl bg-zinc-50/50 dark:bg-zinc-900/30 border border-border/50 hover:border-primary/50 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-all duration-300 ${!item.link && 'cursor-default'}`}
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:text-primary transition-all duration-300 shadow-sm">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-1">{item.description}</p>
                                        <div className="font-medium text-primary/80 group-hover:text-primary flex items-center gap-2">
                                            {item.value} {item.link && <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />}
                                        </div>
                                    </div>
                                </motion.a>
                            ))}
                        </div>

                        {/* Process Timeline (Quick View) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="pt-8 border-t border-border/40"
                        >
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-8">{t('contactPage.next.title')}</h3>
                            <div className="space-y-8 relative pl-2">
                                {/* Vertical Line */}
                                <div className="absolute left-[19px] top-2 bottom-4 w-[2px] bg-gradient-to-b from-primary/50 to-transparent" />

                                {timelineSteps.map((step, i) => (
                                    <div key={i} className="flex gap-6 relative">
                                        <div className="w-10 h-10 rounded-full bg-background border-2 border-primary/20 flex items-center justify-center shrink-0 z-10 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
                                            <step.icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base mb-1">{step.title}</h4>
                                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                    </div>


                    {/* RIGHT COLUMN: Form & FAQ */}
                    <div className="space-y-12">

                        {/* Glass Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="bg-zinc-50/80 dark:bg-zinc-900/40 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/20 dark:border-white/5 shadow-2xl relative overflow-hidden"
                        >
                            {/* Decorative */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-[2.5rem]" />

                            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                                {/* Access Key from Environment Variable */}
                                <input type="hidden" name="access_key" value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider pl-1 text-muted-foreground">{t('contactPage.form.name')}</label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('contactPage.form.namePlaceholder')}
                                            className="bg-background/50 border-border/50 h-14 rounded-2xl focus-visible:ring-primary/30 transition-all hover:bg-background/80"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider pl-1 text-muted-foreground">{t('contactPage.form.email')}</label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder={t('contactPage.form.emailPlaceholder')}
                                            className="bg-background/50 border-border/50 h-14 rounded-2xl focus-visible:ring-primary/30 transition-all hover:bg-background/80"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider pl-1 text-muted-foreground">{t('contactPage.form.subject')}</label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('contactPage.form.subjectPlaceholder')}
                                        className="bg-background/50 border-border/50 h-14 rounded-2xl focus-visible:ring-primary/30 transition-all hover:bg-background/80"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider pl-1 text-muted-foreground">{t('contactPage.form.message')}</label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('contactPage.form.messagePlaceholder')}
                                        className="min-h-[200px] bg-background/50 border-border/50 rounded-2xl resize-none focus-visible:ring-primary/30 transition-all hover:bg-background/80 p-5 leading-relaxed"
                                    />
                                </div>



                                <Button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    size="lg"
                                    className="w-full rounded-2xl text-lg h-14 bg-gradient-to-r from-primary to-purple-600 hover:to-primary text-white shadow-lg shadow-primary/25 transition-all duration-500 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {status === 'submitting' ? (
                                            <>{t('contactPage.form.sending')}</>
                                        ) : status === 'success' ? (
                                            <>{t('contactPage.form.success')} <CheckCircle2 className="w-5 h-5" /></>
                                        ) : (
                                            <>{t('contactPage.form.submit')} <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                        )}
                                    </span>
                                </Button>

                                {status === 'error' && (
                                    <p className="text-red-500 text-sm text-center mt-2">{t('contactPage.form.error')}</p>
                                )}
                                {status === 'success' && (
                                    <p className="text-green-500 text-sm text-center mt-2">{t('contactPage.form.successDesc')}</p>
                                )}
                            </form>
                        </motion.div>

                        {/* FAQ Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="bg-background border border-border/50 rounded-[2.5rem] p-8 md:p-10"
                        >
                            <h3 className="text-2xl font-heading font-bold mb-8 flex items-center gap-3">
                                <HelpCircle className="w-6 h-6 text-primary" />
                                {t('contactPage.faq.title')}
                            </h3>
                            <Accordion className="space-y-4">
                                {faqs.map((faq, i) => (
                                    <AccordionItem key={i} value={`item-${i}`} className="border-none bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl px-2">
                                        <AccordionTrigger className="hover:no-underline text-base font-medium px-4">{faq.question}</AccordionTrigger>
                                        <AccordionContent className="px-4 text-muted-foreground pb-4">{faq.answer}</AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>

                        {/* Socials Row */}
                        <div className="flex justify-center gap-4 py-8">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    className={`w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:text-white ${social.color}`}
                                    aria-label={social.name}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
