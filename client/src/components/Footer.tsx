import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Github, href: "https://github.com/deymohit02", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohit-kumar-dey-8b1633291/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/flash_base_ETH", label: "Twitter" },
  { icon: Mail, href: "mailto:deymohit5@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col items-center gap-8">
          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="ghost"
                size="icon"
                className="rounded-full w-12 h-12"
                asChild
                data-testid={`button-social-${social.label.toLowerCase()}`}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} • Mohit Kumar Dey • AI + Full Stack Developer • All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
