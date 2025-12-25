import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, ArrowLeftRight } from "lucide-react";
import { motion } from "framer-motion";
import Canvas3D from "./Canvas3D";
import TypingText from "./TypingText";
import { ScrollLockManager } from "@/lib/scrollLockManager";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [showButtonAnimations, setShowButtonAnimations] = useState(false);

  // Lock scroll on Hero section entry
  useEffect(() => {
    const manager = ScrollLockManager.getInstance();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            manager.lock("hero", 6800);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const handleTypingComplete = () => {
    setShowButtonAnimations(true);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (!element) return;

    const lenis = (window as any).lenis;
    if (lenis) {
      const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
      lenis.scrollTo(elementTop, { duration: 1.2 });
    } else {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center bg-black justify-start scroll-mt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 -z-10" />

      {/* 3D Canvas */}
      <div className="w-full max-w-7xl h-80 md:h-96 mt-4 md:mt-16">
        <Canvas3D />
      </div>

      {/* Interaction Hint */}
      <motion.div
        className="mt-2 flex items-center gap-2 text-xs text-white/60 select-none"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Drag to rotate drone
        </motion.span>

        <motion.div
          className="flex items-center"
          animate={{ x: [-6, 6, -6] }}
          transition={{
            repeat: Infinity,
            duration: 1.6,
            ease: "easeInOut",
          }}
        >
          <ArrowLeftRight className="h-3 w-3" />
        </motion.div>
      </motion.div>

      {/* Hero Text */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-12 text-center">
        {/* Name and Title */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Mohit Kumar Dey
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-cyan-400 font-semibold">
            AI + Full Stack Developer
          </p>
        </motion.div>

        <div className="h-[60px] md:h-[80px] flex items-start justify-center">
          <TypingText
            text={`Building scalable systems and \n delivering exceptional software solutions.`}
            speed={100}
            onComplete={handleTypingComplete}
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 items-center">
          <Button
            size="lg"
            className={`w-auto min-w-[160px] inline-flex items-center justify-center gap-2
              bg-cyan-400/70 hover:bg-cyan-400/80
              backdrop-blur-md border border-cyan-300/30
              shadow-[0_0_20px_rgba(34,211,238,0.25)]
              hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]
              transition-all duration-300
              ${showButtonAnimations ? "hero-button-hire" : "opacity-0"}
            `}
            onClick={() => scrollToSection("#about")}
          >
            About Me
            {/*<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />*/}
          </Button>

          <Button
            size="lg"
            variant="outline"
            className={`w-auto min-w-[160px] inline-flex items-center justify-center gap-2
              bg-pink-400/70 hover:bg-pink-400/80
              backdrop-blur-md border border-pink-300/30
              shadow-[0_0_20px_rgba(236,72,153,0.25)]
              hover:shadow-[0_0_30px_rgba(236,72,153,0.45)]
              transition-all duration-300
              ${showButtonAnimations ? "hero-button-projects" : "opacity-0"}
            `}
            onClick={() => scrollToSection("#projects")}
          >
            Projects
            <Download className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
