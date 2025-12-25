"use client";

import { useEffect, useRef, useState } from "react";
import FullPage from "@/components/FullPageEnhanced";
import Section from "@/components/SectionEnhanced";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ServicesScroller from "@/components/ServicesScrollerEnhanced";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

/**
 * Advanced Home Page Implementation
 *
 * This example shows:
 * - Section change tracking
 * - Custom animations on section change
 * - Analytics integration points
 * - Loading optimization patterns
 */
export default function HomeAdvanced() {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(
    null
  );

  const sectionNames = [
    "Hero",
    "About",
    "Services",
    "Skills",
    "Projects",
    "CTA",
    "Footer",
  ];

  // Handle section changes
  const handleSectionChange = (index: number) => {
    setCurrentSection(index);

    // Trigger section-specific animations
    triggerSectionAnimation(index);

    // Analytics integration point
    trackSectionView(sectionNames[index]);

    console.log(`✨ Entering section: ${sectionNames[index]}`);
  };

  // Trigger animations when section changes
  const triggerSectionAnimation = (index: number) => {
    const sectionId = sectionNames[index].toLowerCase();

    // Example: Add animation class to incoming section
    const section = document.getElementById(sectionId);
    if (section) {
      section.style.opacity = "0";
      setTimeout(() => {
        section.style.transition = "opacity 0.6s ease-out";
        section.style.opacity = "1";
      }, 100);
    }
  };

  // Analytics tracking
  const trackSectionView = (sectionName: string) => {
    // Example: Send to your analytics service
    if (typeof window !== "undefined" && "gtag" in window) {
      // @ts-ignore
      window.gtag?.("event", "section_view", {
        section: sectionName,
        timestamp: new Date().toISOString(),
      });
    }
  };

  // Monitor scroll direction changes
  const prevSectionRef = useRef(currentSection);
  useEffect(() => {
    if (currentSection > prevSectionRef.current) {
      setScrollDirection("down");
    } else if (currentSection < prevSectionRef.current) {
      setScrollDirection("up");
    }
    prevSectionRef.current = currentSection;
  }, [currentSection]);

  return (
    <>
      {/* Visual indicator of current section */}
      <div className="fixed bottom-8 right-8 z-50 text-white pointer-events-none">
        <div className="text-sm opacity-50">
          {currentSection + 1} / {sectionNames.length}
        </div>
        <div className="text-xs opacity-30 mt-1">
          {sectionNames[currentSection]} {scrollDirection && `(${scrollDirection})`}
        </div>
      </div>

      {/* Progress bar at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-40">
        <div
          className="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
          style={{
            width: `${((currentSection + 1) / sectionNames.length) * 100}%`,
          }}
        />
      </div>

      {/* Main full-page scroller */}
      <FullPage
        onSectionChange={handleSectionChange}
        lockDuration={1200}
      >
        {/* Hero Section */}
        <Section id="hero">
          <Hero />
        </Section>

        {/* About Section */}
        <Section id="about">
          <About />
        </Section>

        {/* Services Section with Horizontal Scroller */}
        <ServicesScroller />

        {/* Skills Section */}
        <Section id="skills">
          <Skills />
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <Projects />
        </Section>

        {/* CTA Section */}
        <Section id="cta">
          <CTA />
        </Section>

        {/* Footer Section */}
        <Section id="footer">
          <Footer />
        </Section>
      </FullPage>

      {/* Keyboard navigation (optional) */}
      <KeyboardNavigation currentSection={currentSection} totalSections={sectionNames.length} />
    </>
  );
}

/**
 * Optional: Keyboard navigation for accessibility
 */
function KeyboardNavigation({
  currentSection,
  totalSections,
}: {
  currentSection: number;
  totalSections: number;
}) {
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        // Navigate to next section
        if (currentSection < totalSections - 1) {
          document
            .getElementById(
              ["hero", "about", "services", "skills", "projects", "cta", "footer"][
                currentSection + 1
              ]
            )
            ?.scrollIntoView({ behavior: "smooth" });
        }
      } else if (e.key === "ArrowUp") {
        // Navigate to previous section
        if (currentSection > 0) {
          document
            .getElementById(
              ["hero", "about", "services", "skills", "projects", "cta", "footer"][
                currentSection - 1
              ]
            )
            ?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [currentSection, totalSections]);

  return null;
}
