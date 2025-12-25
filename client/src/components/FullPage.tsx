"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { ScrollLockManager } from "@/lib/scrollLockManager";

interface FullpageProps {
  children: React.ReactNode;
}

export default function Fullpage({ children }: FullpageProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      lerp: 0.1,
      wheelMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;
    
    // Store Lenis instance on window for Hero buttons to access
    (window as any).lenis = lenis;

    // Get scroll lock manager instance
    const manager = ScrollLockManager.getInstance();

    // Store original scrollTo before we override it
    const originalScroll = lenis.scrollTo.bind(lenis);
    
    // Always allow programmatic scrolls (from buttons, links, etc.)
    lenis.scrollTo = function (target: any, options?: any) {
      return originalScroll(target, options);
    };

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      (window as any).lenis = null;
    };
  }, []);

  // Lenis manages its own scrolling - don't block it with overflow-hidden
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="w-screen min-h-screen">
      {children}
    </div>
  );
}
