"use client";

import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Github, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import smeToolImage from "@assets/generated_images/CryptoPulse_Dark.png";
import fileManagementImage from "@assets/generated_images/Olipop_Lemon.png";
import handymanImage from "@assets/generated_images/AI_Fraud_Detection.png";

const projects = [
  {
    title: "CryptoPulse",
    description: "A modern, real-time cryptocurrency tracking and analytics application.",
    image: smeToolImage,
    fullDescription:
      "A responsive crypto tracker featuring live price updates, interactive historical charts, personalized watchlists, and market news integration using the CoinGecko API.",
    technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    features: [
      "Real-time Price Tracking: Live cryptocurrency price updates via WebSocket",
      "Interactive Charts: Visualize price history with Chart.js",
      "Watchlists: Create custom watchlists to track your favorite cryptocurrencies",
      "Price Alerts: Set up notifications when prices hit your target values",
      "Dark/Light Mode: Switch between dark and light themes for comfortable viewing",
      "Responsive Design: Optimized for desktop, tablet, and mobile devices",
      "Market Analytics: View market cap, volume, 24h changes, and more",
    ],
    challenges:
      "The main challenge was creating a flexible system that could adapt to different business workflows while maintaining performance with large datasets. Solved by implementing efficient data caching strategies and modular architecture.",
    github: "https://github.com/deymohit02/crypto-market-tracker",
    live: "https://crypto-market-tracker.onrender.com/",
  },
  {
    title: "Olipop Full Stack Website",
    description: "A modern, responsive website for Olipop, a premium juice brand.",
    image: fileManagementImage,
    fullDescription:
      "A full-stack website built with Next.js, Tailwind CSS, and TypeScript. Features include a modern UI, responsive design, and a custom CMS for content management.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Shadcn UI", "PostgreSQL"],
    features: [
      "Responsive Design: Optimized for desktop, tablet, and mobile devices",
      "Modern UI: Clean, minimalist design with smooth animations",
      "Custom CMS: Manage content with a user-friendly interface",
      "Product Catalog: Display and manage products with detailed information",
      "Blog Integration: Publish and manage blog posts with a rich editor",
      "Contact Form: Easy customer communication with a built-in form",
      "SEO Optimization: Built-in SEO tools for improved search engine visibility",
    ],
    challenges:
      "The main challenge was creating a responsive design that works across all devices. Solved by using Tailwind CSS for responsive styling and a mobile-first approach.",
    github: "https://github.com/deymohit02/nextjs-parallax-web-experience",
    live: "https://nextjs-parallax-web-experience.vercel.app/",
  },
  {
    title: "Ai Enhanced Fraud Detection System",
    description: "An AI-powered fraud detection system using machine learning algorithms.",
    image: handymanImage,
    fullDescription:
      "An AI-powered fraud detection system using machine learning and natural language processing. Features include real-time fraud detection, risk scoring, and a user-friendly interface.",
    technologies: ["Python", "FastAPI", "Pandas", "SQLite", "Celery", "Machine Learning", "Natural Language Processing"],
    features: [
      "Real-time Fraud Detection: Identify fraudulent transactions in real-time using machine learning models",
      "Risk Scoring: Assign risk scores to transactions based on various factors",
      "User-Friendly Interface: A clean, intuitive interface for managing fraud detection tasks",
      "Data Analysis: Analyze transaction data to identify patterns and anomalies",
      "Report Generation: Generate reports on fraud detection activities",
      "User Management: Manage user accounts and permissions",
      "Audit Trail: Track all fraud detection activities for compliance and accountability",
    ],
    challenges:
      "The main challenge was creating a system that could handle large volumes of data efficiently while maintaining accuracy. Solved by implementing efficient data caching strategies and modular architecture. Also, the challenge was to create a user-friendly interface that is easy to use and understand.",
    github: "https://github.com/deymohit02/AI-Enhanced-Fraud-Detection",
    live: "https://fraud-detection-demo.vercel.app",
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section
      id="projects"
      className="py-16 md:py-24 lg:py-32 bg-gradient-to-b from-primary/5 to-background scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16">
          Projects
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                onClick={() => setSelectedProject(index)}
                className="relative h-36 cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center filter brightness-75"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="relative z-10 p-4 flex flex-col justify-end h-full text-white">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-sm opacity-90">{project.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject !== null && (
          <ProjectModal
            project={projects[selectedProject]}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: typeof projects[0]; onClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lock background scroll but allow modal content to scroll
  useEffect(() => {
    const originalStyle = document.body.style.cssText;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed"; // prevent scroll jump on mobile
    document.body.style.width = "100%";

    return () => {
      document.body.style.cssText = originalStyle;
    };
  }, []);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Allow scroll wheel within modal content - simplified approach
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!contentRef.current || !modalRef.current) return;
      
      // Check if the wheel event is over the modal
      const modalRect = modalRef.current.getBoundingClientRect();
      const isOverModal = 
        e.clientX >= modalRect.left &&
        e.clientX <= modalRect.right &&
        e.clientY >= modalRect.top &&
        e.clientY <= modalRect.bottom;

      if (!isOverModal) {
        // If not over modal, prevent scrolling (background is locked)
        e.preventDefault();
        return;
      }

      // If over modal, let the browser handle scrolling naturally
      // Only prevent if we're at boundaries and trying to scroll beyond
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // Only prevent if trying to scroll beyond boundaries
      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
      // Otherwise, don't prevent - let natural scrolling happen
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // Prevent scroll bleed on mobile
  useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (!contentRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const touch = e.touches[0];
      const isScrollingUp = touch.clientY > (contentRef.current.getBoundingClientRect().top + scrollTop);
      const atTop = scrollTop === 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight;

      // prevent scrolling beyond modal boundaries
      if ((atTop && isScrollingUp) || (atBottom && !isScrollingUp)) {
        e.preventDefault();
      }
    };

    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => document.removeEventListener("touchmove", handleTouchMove);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // click outside closes modal
    >
      <motion.div
        ref={modalRef}
        className="relative w-full max-w-4xl h-[80vh] bg-card border border-card-border rounded-2xl shadow-xl flex flex-col overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()} // prevent backdrop close
      >
        {/* Image */}
        <div className="relative h-1/3 w-full flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm hover:bg-background rounded-full z-10 shadow-lg"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Scrollable content */}
        <div 
          ref={contentRef}
          className="flex-1 overflow-y-auto overscroll-contain scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-2xl md:text-3xl font-bold">{project.title}</h2>
              
              {/* GitHub and Live Links */}
              <div className="flex gap-3">
                {project.github && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="gap-2"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {project.live && (
                  <Button
                    variant="default"
                    size="sm"
                    asChild
                    className="gap-2"
                  >
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                )}
              </div>
            </div>
            
            <p className="text-muted-foreground">{project.fullDescription}</p>

            <div>
              <h3 className="text-lg font-semibold mb-2">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Key Features</h3>
              <ul className="grid md:grid-cols-2 gap-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">✓</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Challenges & Solutions</h3>
              <p className="text-muted-foreground leading-relaxed">{project.challenges}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}





