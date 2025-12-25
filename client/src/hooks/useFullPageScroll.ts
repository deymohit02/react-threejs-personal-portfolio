import { useEffect, useRef, useCallback } from "react";
import Lenis from "@studio-freight/lenis";

interface FullPageScrollOptions {
  onSectionChange?: (sectionIndex: number) => void;
  lockDuration?: number;
  sections?: HTMLElement[];
}

/**
 * Hook to manage full-page cinematic scroll locking
 * - Prevents partial section views
 * - Enforces smooth section transitions
 * - Handles reverse scrolling
 * - Works seamlessly with Lenis
 */
export function useFullPageScroll(
  lenis: Lenis | null,
  options: FullPageScrollOptions = {}
) {
  const { onSectionChange, lockDuration = 1200, sections = [] } = options;

  const isLockedRef = useRef(false);
  const currentSectionRef = useRef(0);
  const lastScrollDirRef = useRef<"down" | "up" | null>(null);
  const lockTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find the current section based on scroll position
  const getCurrentSection = useCallback(() => {
    if (sections.length === 0) return 0;

    const scrollProgress = lenis?.progress ?? 0;
    const sectionIndex = Math.round(scrollProgress * (sections.length - 1));
    return Math.max(0, Math.min(sectionIndex, sections.length - 1));
  }, [lenis?.progress, sections.length, sections]);

  // Lock scroll and snap to nearest section
  const lockToSection = useCallback(
    (sectionIndex: number) => {
      if (!lenis || sections.length === 0) return;

      isLockedRef.current = true;
      currentSectionRef.current = sectionIndex;

      // Calculate scroll target
      const target = (sectionIndex / (sections.length - 1)) * 100;

      // Snap to section with smooth animation
      lenis.scrollTo(target + "%", {
        duration: lockDuration / 1000, // Convert ms to seconds
        easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out cubic
      });

      // Clear previous timeout
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);

      // Unlock after animation completes
      lockTimeoutRef.current = setTimeout(() => {
        isLockedRef.current = false;
      }, lockDuration);

      // Notify parent
      if (onSectionChange) {
        onSectionChange(sectionIndex);
      }
    },
    [lenis, sections.length, lockDuration, onSectionChange, sections]
  );

  // Handle scroll direction and locking
  const handleScroll = useCallback(() => {
    if (!lenis || sections.length === 0) return;

    const currentProgress = lenis.progress;
    const currentSection = getCurrentSection();

    // Detect scroll direction
    const prevProgress = useRef(currentProgress);
    if (currentProgress > prevProgress.current) {
      lastScrollDirRef.current = "down";
    } else if (currentProgress < prevProgress.current) {
      lastScrollDirRef.current = "up";
    }
    prevProgress.current = currentProgress;

    // Check if user has scrolled to a new section threshold
    const sectionProgress = (currentProgress * (sections.length - 1)) % 1;

    // If closer to next section (>50%), snap to it
    if (sectionProgress > 0.5 && lastScrollDirRef.current === "down") {
      lockToSection(currentSection + 1);
    }
    // If closer to previous section (<50%), snap to it
    else if (sectionProgress < 0.5 && lastScrollDirRef.current === "up") {
      lockToSection(currentSection);
    }
  }, [lenis, sections.length, getCurrentSection, lockToSection]);

  // Prevent scroll beyond bounds and lock sections
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!lenis || isLockedRef.current) {
        e.preventDefault();
        return;
      }

      const currentProgress = lenis.progress;
      const isAtStart = currentProgress < 0.01;
      const isAtEnd = currentProgress > 0.99;

      // Prevent scrolling beyond bounds
      if ((e.deltaY < 0 && isAtStart) || (e.deltaY > 0 && isAtEnd)) {
        e.preventDefault();
        return;
      }
    },
    [lenis]
  );

  // Setup listeners
  useEffect(() => {
    if (!lenis) return;

    // Attach RAF listener for scroll tracking
    const handleFrame = () => {
      handleScroll();
    };

    lenis.on("scroll", handleScroll);
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      lenis.off("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      if (lockTimeoutRef.current) clearTimeout(lockTimeoutRef.current);
    };
  }, [lenis, handleScroll, handleWheel]);

  return {
    isLocked: isLockedRef.current,
    currentSection: currentSectionRef.current,
    lockToSection,
  };
}
