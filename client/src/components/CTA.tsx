"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_LINK = "https://wa.me/917002765156";

export default function CTA() {
  return (
    <section
      id="contact"
      className="relative py-16 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-cyan-400/10 to-primary/10 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
        {/* TEXT CENTERED */}
        <div className="text-center space-y-4 md:space-y-6 lg:space-y-8">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            Ready to build something <br />
            <span className="text-cyan-500">fast, </span>
            <span className="text-yellow-400">modern, </span>
            and <span className="text-pink-500">efficient?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <Button
              asChild
              size="lg"
              className="
                text-base group mt-6
                bg-yellow-500 hover:bg-yellow-300
                text-black
              "
              data-testid="button-whatsapp"
            >
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Me
              </a>
            </Button>
          </motion.div>
        </div>

        {/* 3D MODELS — positioned behind the text */}
        <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
          {/* Left and Right Models placeholders */}
        </div>
      </div>
    </section>
  );
}
