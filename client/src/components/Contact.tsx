"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/917002765156";

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
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
            className="relative min-h-screen flex flex-col justify-center py-20 bg-black overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/shape.avif"
                    alt="Background"
                    className="w-full h-full object-cover opacity-50 select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10 flex-grow flex flex-col justify-center">
                <div className="w-full max-w-7xl mx-auto space-y-8">
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        Get in touch
                    </motion.h2>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
                        {/* Left Column: Form */}
                        <div className="lg:col-span-6">
                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-4 w-full"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="enter your first name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900/40 border border-zinc-800 rounded px-5 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors text-sm"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="enter your last name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900/40 border border-zinc-800 rounded px-5 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors text-sm"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-zinc-900/40 border border-zinc-800 rounded px-5 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors text-sm"
                                    />
                                    <textarea
                                        name="message"
                                        placeholder="enter your feedback or question here"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows={7}
                                        className="w-full bg-zinc-900/40 border border-zinc-800 rounded px-5 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-700 transition-colors resize-none text-sm"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-white text-black py-3 px-6 flex items-center justify-between group hover:bg-zinc-200 transition-all rounded"
                                >
                                    <span className="text-sm font-medium">send</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </button>
                            </motion.form>
                        </div>

                        {/* Right Column: Info Card */}
                        <div className="lg:col-span-6 flex justify-center lg:justify-end">
                            <motion.div
                                className="bg-zinc-900/20 backdrop-blur-md border border-white/7 rounded-2xl p-8 md:p-12 space-y-10 w-full max-w-md"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                <div className="space-y-1">
                                    <h3 className="text-xl text-white font-medium">Location</h3>
                                    <p className="text-zinc-400 text-base border-b border-zinc-800 pb-1 inline-block">
                                        India
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl text-white font-medium">Tell</h3>
                                    <div className="space-y-0">
                                        <p className="text-zinc-400 text-base border-b border-zinc-800 pb-1 inline-block">
                                            +91 7002765156
                                        </p>
                                        <br />
                                        <p className="text-zinc-400 text-base border-b border-zinc-800 pb-1 inline-block">
                                            +91 7636061822
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <h3 className="text-xl text-white font-medium">Email</h3>
                                    <div className="space-y-0">
                                        <p className="text-zinc-400 text-base border-b border-zinc-800 pb-1 block w-fit">
                                            <a href="mailto:deymohit5@gmail.com">deymohit5@gmail.com</a>
                                        </p>
                                        <p className="text-zinc-400 text-base border-b border-zinc-800 pb-1 block w-fit">
                                            <a href="mailto:mohit@bitsandbrainsai.com">mohit@bitsandbrainsai.com</a>
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Branding & Floating Button */}
            <div className="relative z-10 w-full mt-auto py-10">
                <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center opacity-40">
                    <div className="text-white text-3xl font-light italic mt-4 md:mt-0" style={{ fontFamily: 'serif' }}>
                        Thanks for Choosing
                    </div>
                </div>

                {/* Floating WhatsApp Button */}
                <motion.a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fixed bottom-8 right-8 z-50 bg-zinc-800 p-4 rounded-full shadow-2xl hover:bg-zinc-700 transition-colors group"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.1 }}
                >
                    <MessageSquare className="h-6 w-6 text-white group-hover:rotate-12 transition-transform" />
                </motion.a>
            </div>
        </section>
    );
}
