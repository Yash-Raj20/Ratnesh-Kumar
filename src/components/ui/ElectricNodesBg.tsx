"use client";

import { useEffect, useRef } from "react";

export default function ElectricNodesBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Helper to get color from CSS variable
        const getPrimaryColor = () => {
            if (typeof window === "undefined") return "rgba(100, 100, 100, 0.5)";

            const style = getComputedStyle(document.documentElement);
            // The variable might be "222.2 47.4% 11.2%" (HSL channels) or similar
            const primaryVar = style.getPropertyValue("--primary").trim();

            if (!primaryVar) return "rgba(100, 100, 100, 0.5)";

            // If it's HSL channels (space separated numbers/percentages), wrap it
            if (primaryVar.match(/^[\d.]+(\s|deg|rad|grad|turn)?\s+[\d.]+%?\s+[\d.]+%?(\s*\/\s*[\d.]+%?)?$/)) {
                return `hsl(${primaryVar})`;
            }
            return primaryVar;
        };

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update(width: number, height: number) {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw(ctx: CanvasRenderingContext2D, color: string) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
        }

        const init = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const particleCount = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 50);
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            if (!ctx || !canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const primaryColor = getPrimaryColor();
            const width = canvas.width;
            const height = canvas.height;

            // Update and draw particles
            particles.forEach((p, index) => {
                p.update(width, height);

                // Draw particle
                ctx.globalAlpha = 0.6;
                p.draw(ctx, primaryColor);

                // Connect
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = primaryColor;
                        ctx.lineWidth = 0.5;
                        ctx.globalAlpha = 1 - dist / 150; // Fade out with distance
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            init();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none"
        />
    );
}
