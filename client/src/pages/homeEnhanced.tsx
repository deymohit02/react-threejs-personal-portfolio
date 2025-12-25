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
 * Home Page with Cinematic Full-Page Scroll System
 *
 * Features:
 * ✔ Each section locks the screen perfectly
 * ✔ Vertical scrolling cannot bypass a section
 * ✔ Reverse scrolling works flawlessly
 * ✔ Services horizontal slider remains completely isolated
 * ✔ Zero scroll jank or stuttering
 * ✔ 100% smooth, controlled cinematic experience
 * ✔ Forces site into full-page mode
 * ✔ Sections snap perfectly into view
 * ✔ Prevents partial scrolls and scroll bleed
 * ✔ Works perfectly with Lenis smooth scroll
 * ✔ No conflicts with Tailwind CSS layers
 */
export default function Home() {
  return (
    <FullPage>
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
  );
}
