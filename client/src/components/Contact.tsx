"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log("Form submitted:", formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section
            id="contact"
            className="relative py-16 md:py-24 lg:py-32 bg-black scroll-mt-20 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                {/* Heading */}
                <motion.h2
                    className="text-3xl md:text-4xl lg:text-5xl font-light text-white text-center mb-12 md:mb-16 italic"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    Get in touch with us
                </motion.h2>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Form Section */}
                    <motion.form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Input
                            type="text"
                            name="firstName"
                            placeholder="enter your first name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="bg-transparent border border-zinc-700 rounded-none text-white placeholder:text-zinc-500 h-12 focus:border-zinc-500"
                        />
                        <Input
                            type="text"
                            name="lastName"
                            placeholder="enter your last name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="bg-transparent border border-zinc-700 rounded-none text-white placeholder:text-zinc-500 h-12 focus:border-zinc-500"
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="enter your email address"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-transparent border border-zinc-700 rounded-none text-white placeholder:text-zinc-500 h-12 focus:border-zinc-500"
                        />
                        <Textarea
                            name="message"
                            placeholder="enter your feedback or question here"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className="bg-transparent border border-zinc-700 rounded-none text-white placeholder:text-zinc-500 resize-none focus:border-zinc-500"
                        />
                        <Button
                            type="submit"
                            variant="outline"
                            className="w-full rounded-none border-zinc-700 text-white hover:bg-zinc-800 h-12 group"
                        >
                            send
                            <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </motion.form>

                    {/* Contact Info Section */}
                    <motion.div
                        className="bg-zinc-900/80 p-8 md:p-10 space-y-8"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div>
                            <h3 className="text-white font-medium text-lg mb-2 flex items-center gap-2">
                                <MapPin className="h-5 w-5 text-zinc-400" />
                                Location
                            </h3>
                            <p className="text-cyan-400">Guwahati, Assam</p>
                        </div>

                        <div>
                            <h3 className="text-white font-medium text-lg mb-2 flex items-center gap-2">
                                <Phone className="h-5 w-5 text-zinc-400" />
                                Tell
                            </h3>
                            <a
                                href="tel:+917002765156"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                +91 700-276-5156
                            </a>
                        </div>

                        <div>
                            <h3 className="text-white font-medium text-lg mb-2 flex items-center gap-2">
                                <Mail className="h-5 w-5 text-zinc-400" />
                                Email
                            </h3>
                            <a
                                href="mailto:deymohit5@gmail.com"
                                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                deymohit5@gmail.com
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
