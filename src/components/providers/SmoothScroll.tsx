"use client";

import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

// Register ScrollTrigger globally to ensure it's available
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.raf(time * 1000);
      }
    }

    gsap.ticker.add(update);

    // Crucial for keeping ScrollTrigger in sync with Lenis during scrolls
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      gsap.ticker.lagSmoothing(500, 33); // Restore default
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      }}
    >
      {children}
    </ReactLenis>
  );
}
