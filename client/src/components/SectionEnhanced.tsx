import React from "react";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Cinematic Section Component
 *
 * Features:
 * - Full-height viewport sections (100vh)
 * - Snap scrolling support
 * - Full-page system integration
 * - Perfect for cinematic transitions
 */
export default function Section({
  id,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      data-fullpage-section
      className={`w-screen h-screen flex items-center justify-center snap-start relative overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
}
