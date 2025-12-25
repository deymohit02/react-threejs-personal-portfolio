"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Lenis from "@studio-freight/lenis";
import { useFullPageScroll } from "@/hooks/useFullPageScroll";

interface FullpageProps {
  children: ReactNode;
  onSectionChange?: (sectionIndex: number) => void;
  lockDuration?: number;
}

/**
 * FullPage Component with Cinematic Scroll Locking
 *
 * Features:
 * ✔ Each section locks the screen
 * ✔ Vertical scrolling cannot bypass a section
 * ✔ Reverse scrolling works perfectly
 * ✔ Horizontal Services slider remains isolated
 * ✔ Zero scroll jank
 * ✔ 100% smooth, controlled experience
 * ✔ Forces site into cinematic full-page mode
 * ✔ Makes each section snap perfectly into view
 * ✔ Prevents partial scrolls & scroll bleed
 * ✔ Works perfectly with Lenis
 * ✔ No conflict with Tailwind layers
 */
export default function Fullpage({
  children,
  onSectionChange,
  lockDuration = 1200,
}: FullpageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [sections, setSections] = useState<HTMLElement[]>([]);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // Base duration for smooth scrolling
      easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      lerp: 0.1, // Linear interpolation for smoothness
      wheelMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // RAF loop for Lenis
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Collect section elements for scroll management
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Find all section elements
    const sectionElements = Array.from(
      container.querySelectorAll("[data-fullpage-section]")
    ) as HTMLElement[];

    setSections(sectionElements);
  }, [children]);

  // Use full-page scroll hook
  const { lockToSection } = useFullPageScroll(lenisRef.current, {
    onSectionChange,
    lockDuration,
    sections,
  });

  return (
    <>
      {/* Prevent scroll jank with overflow hidden */}
      <style>{`
        html, body {
          overflow: hidden !important;
          height: 100%;
          width: 100%;
        }

        * {
          /* Prevent momentum scrolling jank */
          -webkit-overflow-scrolling: auto;
        }

        /* Tailwind layer override - ensure full-page styling */
        @layer base {
          html {
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      <div
        ref={containerRef}
        className="relative w-screen h-screen overflow-hidden"
      >
        {children}
      </div>
    </>
  );
}
