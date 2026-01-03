"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ScrollLockManager } from "@/lib/scrollLockManager";

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });

    // Lock scroll when About section comes into view
    const aboutSection = document.querySelector('[id="about"]');
    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Lock scroll for 1.2 seconds (animation duration)
            ScrollLockManager.getInstance().lock("about", 1200);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(aboutSection);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative py-16 md:py-24 lg:py-32 scroll-mt-20 overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/about_mohit.png')",
          backgroundAttachment: "fixed",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 -z-1" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        <h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16 text-white"
          data-aos="fade-up"
          data-aos-delay={150}
        >
          About Me
        </h2>

        <div className="max-w-3xl mx-auto space-y-6 text-base md:text-lg text-gray-200 leading-relaxed">
          <p data-aos="fade-up" data-aos-delay={250}>
            I am a Software Development Engineer focused on building AI-powered, scalable software solutions that solve real-world business problems. 
            I specialize in full-stack development, combining robust backend systems with modern web technologies to deliver reliable, high-performance applications.
          </p>
          <p data-aos="fade-up" data-aos-delay={350}>
            My expertise includes AI integration, intelligent automation, and backend architecture, where I design systems that streamline workflows, enhance decision-making, and improve operational efficiency. 
            I apply strong software engineering best practices to ensure clean, maintainable, and production-ready code.
          </p>
          <p data-aos="fade-up" data-aos-delay={450}>
            I enjoy working on complex technical challenges, from designing scalable system architectures and optimizing performance to implementing AI-driven features and automated workflows. 
            I thrive in collaborative environments and bring a detail-oriented, outcome-focused approach to every project, with an emphasis on building solutions that are both technically sound and business-effective.
          </p>
        </div>
      </div>
    </section>
  );
}
