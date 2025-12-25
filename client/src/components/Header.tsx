import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollLockManager } from "@/lib/scrollLockManager";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  /* 
  // Blocking overflow causes scroll issues with Lenis
  // We disable this effect to ensure scrolling is never blocked by the menu state.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);
  */

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const scrollToSection = (href: string) => {
    const performScroll = () => {
      // Force overflow to be unset immediately before scrolling
      document.body.style.overflow = "unset";

      // Force unlock any active scroll locks (e.g. Hero intro)
      ScrollLockManager.getInstance().unlock();

      const element = document.querySelector(href);
      if (!element) return;

      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(element, { offset: -80 });
      } else {
        const offset = 80;
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    if (isMenuOpen) {
      setIsMenuOpen(false);
      // Wait for the exit animation (0.25s) 
      setTimeout(performScroll, 300);
    } else {
      performScroll();
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] bg-background/70 dark:bg-background/70 backdrop-blur-sm border-b border-border/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#home");
              }}
              className="text-xl md:text-2xl font-bold"
              data-testid="link-logo"
            >
              Mohit Kumar Dey
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors hover-elevate px-3 py-2 rounded-md"
                  data-testid={`link-nav-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 md:gap-4 z-[101]">
              {/*
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full"
                data-testid="button-theme-toggle"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              */}

              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                data-testid="button-menu-toggle"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Tray */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[99]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              className="absolute inset-x-0 top-0 bg-background/98 backdrop-blur-2xl shadow-lg"
              initial={{ y: "-100%" }}
              animate={{ y: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
              exit={{ y: "-100%", transition: { duration: 0.25, ease: "easeInOut" } }}
            >
              <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-8 p-8">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-3xl font-bold text-foreground/90 hover:text-foreground transition-colors active:scale-95"
                    data-testid={`link-mobile-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
