


"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, useAnimationFrame, useMotionValue } from "framer-motion";
import * as Icons from "react-icons/si";
import { X } from "lucide-react";

/* ---------------------------------------------
   DATA (unchanged)
---------------------------------------------- */
const skills = [
  {
    name: "HTML",
    icon: Icons.SiHtml5,
    color: "#E34F26",
    description: [
      "HyperText Markup Language: the standard language to structure web content.",
      "Organizes pages with semantic elements for clarity and accessibility.",
      "Essential for SEO, ensuring search engines understand your content.",
      "Forms the backbone of responsive and well-structured interfaces.",
      "I use HTML to create maintainable, semantic code that supports all frontend layouts."
    ],
  },
  {
    name: "Tailwind CSS",
    icon: Icons.SiTailwindcss,
    color: "#06B6D4",
    description: [
      "Utility-first CSS framework that allows for rapid styling without leaving HTML.",
      "Eliminates bulky CSS files and reduces styling conflicts.",
      "Supports responsive design and consistent UI across all components.",
      "Speeds up prototyping while keeping the design scalable.",
      "I use Tailwind to build modern, consistent, and visually appealing interfaces efficiently."
    ],
  },
  {
    name: "JavaScript",
    icon: Icons.SiJavascript,
    color: "#F7DF1E",
    description: [
      "The core programming language of the web for interactive functionality.",
      "Enables dynamic content, animations, and real-time UI updates.",
      "Bridges frontend interfaces with backend data seamlessly.",
      "Powers rich user experiences with responsive interactivity.",
      "I use JavaScript to build intuitive, dynamic apps that react to user behavior in real-time."
    ],
  },
  {
    name: "TypeScript",
    icon: Icons.SiTypescript,
    color: "#3178C6",
    description: [
      "Superset of JavaScript that adds strong typing and error checking.",
      "Reduces runtime bugs and improves maintainability of large projects.",
      "Enhances developer productivity by enabling better IDE support.",
      "Makes complex applications easier to scale and maintain.",
      "I use TypeScript to build reliable, robust apps while preventing common coding mistakes."
    ],
  },
  {
    name: "React",
    icon: Icons.SiReact,
    color: "#61DAFB",
    description: [
      "Component-based library for building reusable and maintainable UI elements.",
      "Virtual DOM ensures fast rendering and smooth UI updates.",
      "Ideal for building interactive dashboards and complex interfaces.",
      "Allows for modular, testable, and scalable web applications.",
      "I use React to deliver fast, responsive, and dynamic user experiences tailored to client needs."
    ],
  },
  {
    name: "Next.js",
    icon: Icons.SiNextdotjs,
    color: "#000000",
    description: [
      "React framework supporting SSR (Server-Side Rendering) and SSG (Static Site Generation).",
      "Optimizes apps for SEO, speed, and performance out of the box.",
      "Built-in routing, API handling, and image optimization simplify development.",
      "Perfect for production-grade, high-performance web apps.",
      "I use Next.js to deliver fast, scalable, and SEO-friendly applications efficiently."
    ],
  },
  {
    name: "Python",
    icon: Icons.SiPython,
    color: "#3776AB",
    description: [
      "High-level, versatile programming language used for automation, AI, and backend services.",
      "Simplifies complex tasks like data processing and workflow automation.",
      "Supports a vast ecosystem of libraries for machine learning and web development.",
      "Reduces manual labor through scripts and automated routines.",
      "I use Python to streamline backend workflows and implement intelligent, automated solutions."
    ],
  },
  {
    name: "FastAPI",
    icon: Icons.SiFastapi,
    color: "#009688",
    description: [
      "Modern Python framework for building high-performance APIs.",
      "Auto-generates interactive API documentation for easier integration.",
      "Supports asynchronous code for faster processing and scalability.",
      "Ideal for dashboards, microservices, and internal tools.",
      "I leverage FastAPI to deliver robust, secure, and scalable backend services quickly."
    ],
  },
  {
    name: "Vite",
    icon: Icons.SiVite,
    color: "#646CFF",
    description: [
      "Next-generation frontend build tool with lightning-fast development server.",
      "Supports instant Hot Module Replacement (HMR) for rapid iteration.",
      "Modern bundler that replaces slower legacy tools.",
      "Works seamlessly with React, Vue, and TypeScript projects.",
      "I use Vite to speed up development and ensure a smooth, efficient frontend workflow."
    ],
  },
  {
    name: "Three.js",
    icon: Icons.SiThreedotjs,
    color: "#000000",
    description: [
      "JavaScript library for creating 3D graphics directly in the browser.",
      "Enables interactive scenes, product viewers, and animations.",
      "Transforms standard web pages into immersive visual experiences.",
      "Perfect for showcasing complex data or products in a compelling way.",
      "I use Three.js to craft visually stunning, interactive experiences for users."
    ],
  },
  {
    name: "Git",
    icon: Icons.SiGit,
    color: "#F05032",
    description: [
      "Version control system to track code changes and collaborate with teams.",
      "Maintains a clean history of project evolution and prevents data loss.",
      "Supports branching and merging for safe experimentation.",
      "Essential for team projects and collaborative development.",
      "I use Git to ensure code integrity, team collaboration, and smooth deployment pipelines."
    ],
  },
  {
    name: "GitHub",
    icon: Icons.SiGithub,
    color: "#181717",
    github: "https://github.com/deymohit02",
    description: [
      "Web-based platform for version control and collaborative software development.",
      "Hosts Git repositories, enabling team collaboration and project management.",
      "Supports branching, pull requests, and code review workflows.",
      "Integrates with CI/CD pipelines, issue tracking, and project boards.",
      "I use GitHub to manage code, collaborate with teams, and maintain reliable, versioned projects."
    ],
  },
  {
    name: "Figma",
    icon: Icons.SiFigma,
    color: "#F24E1E",
    description: [
      "UI/UX design tool for prototyping web and mobile applications.",
      "Supports real-time collaboration with clients and team members.",
      "Allows creation of visually consistent and user-friendly interfaces.",
      "Generates designs that can be directly translated into code.",
      "I use Figma to design intuitive and pixel-perfect interfaces before implementation."
    ],
  },
  {
    name: "API Integrations",
    icon: Icons.SiJavascript,
    color: "#8B5CF6",
    description: [
      "Connects applications to third-party services like payments, auth, and CRMs.",
      "Automates workflows and ensures seamless data exchange.",
      "Eliminates manual processes, reducing errors and increasing efficiency.",
      "Enables building more powerful, feature-rich applications.",
      "I implement API integrations to extend app functionality and improve user experience."
    ],
  },
  {
    name: "Node.js",
    icon: Icons.SiNodedotjs,
    color: "#339933",
    description: [
      "JavaScript runtime for building server-side applications.",
      "Supports real-time apps like chats, dashboards, and notifications.",
      "Enables building lightweight, scalable APIs and microservices.",
      "Perfect for event-driven and asynchronous backend processes.",
      "I use Node.js to deliver high-performance, scalable server solutions."
    ],
  },
  {
    name: "Express.js",
    icon: Icons.SiExpress,
    color: "#000000",
    description: [
      "Minimal Node.js framework for building APIs and web servers.",
      "Flexible routing and middleware allow custom backend logic.",
      "Ideal for RESTful APIs, authentication, and custom services.",
      "Reduces boilerplate code and accelerates server development.",
      "I leverage Express.js to build efficient, maintainable, and flexible backends."
    ],
  },
  {
    name: "MongoDB",
    icon: Icons.SiMongodb,
    color: "#47A248",
    description: [
      "NoSQL database for handling unstructured and flexible data.",
      "Supports scalable, document-based storage for modern apps.",
      "Handles dynamic schemas, ideal for rapidly evolving projects.",
      "Provides fast querying and aggregation for analytics and dashboards.",
      "I use MongoDB to store and retrieve data efficiently while allowing application flexibility."
    ],
  },
];

/* ---------------------------------------------
   CONSTANTS
---------------------------------------------- */
const BASE_CARD_WIDTH = 180;
const GAP = 24;
const SPEED = 100; // px/sec

/* ---------------------------------------------
   SKILLS SECTION
---------------------------------------------- */
export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<typeof skills[number] | null>(null);

  return (
    <section id="skills" className="relative py-24 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-center text-4xl font-bold mb-12">Skills</h2>

        <SkillsCarousel onSelect={setActiveSkill} />
      </div>

      <AnimatePresence>
        {activeSkill && (
          <>
            <Backdrop onClose={() => setActiveSkill(null)} />
            <ExpandedSkillCard skill={activeSkill} onClose={() => setActiveSkill(null)} />
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------------------------------------
   CAROUSEL
---------------------------------------------- */
/* ---------------------------------------------
   CAROUSEL
---------------------------------------------- */
function SkillsCarousel({
  onSelect,
}: {
  onSelect: (skill: typeof skills[number]) => void;
}) {
  const shouldReduceMotion = false; // Force animations to always run
  const containerRef = useRef<HTMLDivElement>(null);
  const [totalWidth, setTotalWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(BASE_CARD_WIDTH);
  const [isPaused, setIsPaused] = useState(false);

  // Motion value for smooth, manual control of the x position
  const x = useMotionValue(0);

  // Responsive width calculation
  useEffect(() => {
    const calculateWidth = () => {
      const screenWidth = window.innerWidth;

      let scaleFactor = 1;
      if (screenWidth < 640) {
        scaleFactor = 0.8; // small phones
      } else if (screenWidth < 768) {
        scaleFactor = 0.9; // tablets
      } else if (screenWidth < 1024) {
        scaleFactor = 1; // normal
      } else {
        scaleFactor = Math.min(screenWidth / 1280, 1.2);
      }

      const newCardSize = BASE_CARD_WIDTH * scaleFactor;
      setCardWidth(newCardSize);
      // Calculate width for one set of skills for seamless loop
      setTotalWidth((newCardSize + GAP) * skills.length);
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);
    return () => window.removeEventListener("resize", calculateWidth);
  }, []);

  // Custom animation loop for precise speed control
  useAnimationFrame((t, delta) => {
    if (totalWidth === 0) return;

    if (!isPaused) {
      // Move left by (SPEED * delta_seconds)
      const moveBy = (SPEED * delta) / 1000;
      let newX = x.get() - moveBy;

      // Wrap around seamlessly
      // We have 3 sets of skills. totalWidth is the width of 1 set.
      // varying between 0 and -totalWidth covers the first set transition.
      if (newX <= -totalWidth) {
        newX = 0;
      }

      x.set(newX);
    }
  });

  // Only animate if we have calculated width
  if (totalWidth === 0) {
    return (
      <div className="relative overflow-hidden w-full">
        <div className="flex gap-6">
          {skills.map((skill, i) => (
            <SkillCard
              key={`${skill.name}-${i}`}
              skill={skill}
              onClick={() => onSelect(skill)}
              shouldReduceMotion={shouldReduceMotion}
              cardWidth={BASE_CARD_WIDTH}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.div
        ref={containerRef}
        className="flex gap-6 will-change-transform"
        style={{ x, width: "max-content" }}
      >
        {/* Duplicate array for infinite loop - 3 sets for seamless scrolling */}
        {[...skills, ...skills, ...skills].map((skill, i) => (
          <SkillCard
            key={`${skill.name}-${i}`}
            skill={skill}
            onClick={() => onSelect(skill)}
            shouldReduceMotion={shouldReduceMotion}
            cardWidth={cardWidth}
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ---------------------------------------------
   SKILL CARD
---------------------------------------------- */
function SkillCard({
  skill,
  onClick,
  shouldReduceMotion,
  cardWidth,
}: {
  skill: typeof skills[number];
  onClick: () => void;
  shouldReduceMotion: boolean;
  cardWidth: number;
}) {
  const Icon = skill.icon;

  return (
    <motion.button
      onClick={onClick}
      className="flex-shrink-0 h-[120px] rounded-xl border border-card-border bg-card flex flex-col items-center justify-center gap-3 focus:outline-none"
      style={{ color: skill.color, width: cardWidth }}
      whileHover={!shouldReduceMotion ? { scale: 1.05 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <Icon className="w-10 h-10" />
      <span className="font-medium text-sm text-foreground">{skill.name}</span>
    </motion.button>
  );
}

/* ---------------------------------------------
   EXPANDED SKILL CARD
---------------------------------------------- */
function ExpandedSkillCard({
  skill,
  onClose,
}: {
  skill: typeof skills[number];
  onClose: () => void;
}) {
  const Icon = skill.icon;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      layoutId={`skill-${skill.name}`} // single expanded layout
      className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    >
      <motion.div
        className="pointer-events-auto w-[90vw] max-w-xl rounded-2xl bg-card p-8 shadow-2xl relative"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded hover:bg-black/10"
          aria-label="Close"
        >
          <X />
        </button>

        <div className="flex items-center gap-3 mb-6" style={{ color: skill.color }}>
          <Icon className="w-12 h-12" />
          <h3 className="text-2xl font-bold">{skill.name}</h3>
        </div>

        <ul className="space-y-2 text-muted-foreground">
          {skill.description.map((line, i) => (
            <li key={i}>• {line}</li>
          ))}
        </ul>

        {skill.github && (
          <a
            href={skill.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-primary hover:underline"
          >
            GitHub Repo
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ---------------------------------------------
   BACKDROP
---------------------------------------------- */
function Backdrop({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />
  );
}
