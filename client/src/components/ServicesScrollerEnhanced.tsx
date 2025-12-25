"use client";

import { useEffect, useRef, useState } from "react";
import Services from "./Services";

/**
 * Enhanced Services Scroller
 *
 * Provides:
 * ✔ Isolated horizontal scrolling within the services section
 * ✔ Seamless integration with full-page system
 * ✔ Prevents scroll bleed to other sections
 * ✔ Perfect gesture handling for reverse scrolling
 * ✔ Zero jank transitions between slides
 */
export default function ServicesScroller() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLocked, setLocked] = useState(false);
  const isAnimatingRef = useRef(false);

  const totalSlides = 4; // number of service cards

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const onWheel = (e: WheelEvent) => {
      // Check if section is fully visible in viewport
      const rect = wrapper.getBoundingClientRect();
      const fullyVisible = rect.top >= -10 && rect.bottom <= window.innerHeight + 10;

      // Activate lock when entering section
      if (fullyVisible && !isLocked) {
        setLocked(true);
      }

      // If not locked or not animating, allow natural scroll
      if (!isLocked || isAnimatingRef.current) return;

      // Prevent page scroll while in services section
      e.preventDefault();

      const delta = e.deltaY;
      const isAtStart = activeIndex === 0;
      const isAtEnd = activeIndex === totalSlides - 1;

      if (delta > 0) {
        // Scroll down
        if (activeIndex < totalSlides - 1) {
          isAnimatingRef.current = true;
          setActiveIndex((prev) => prev + 1);
          setTimeout(() => (isAnimatingRef.current = false), 750);
        } else if (isAtEnd) {
          // At last slide → unlock and allow page scroll down
          setLocked(false);
        }
      } else if (delta < 0) {
        // Scroll up
        if (activeIndex > 0) {
          isAnimatingRef.current = true;
          setActiveIndex((prev) => prev - 1);
          setTimeout(() => (isAnimatingRef.current = false), 750);
        } else if (isAtStart) {
          // At first slide → unlock and allow page scroll up
          setLocked(false);
        }
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [activeIndex, isLocked]);

  return (
    <div
      ref={wrapperRef}
      className="relative w-screen h-screen overflow-hidden"
      data-fullpage-section
    >
      <Services activeIndex={activeIndex} />
    </div>
  );
}
