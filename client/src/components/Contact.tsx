"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

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
            className="relative min-h-screen flex items-center py-20 bg-black overflow-hidden"
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/shape.avif"
                    alt="Background"
                    className="w-full h-full object-cover opacity-40 select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Left Column: Heading and Form */}
                    <div className="lg:col-span-7 space-y-12">
                        <motion.h2
                            className="text-5xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            Get in touch with us
                        </motion.h2>

                        <motion.form
                            onSubmit={handleSubmit}
                            className="space-y-6 max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="enter your first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="enter your last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="enter your email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors"
                                />
                                <textarea
                                    name="message"
                                    placeholder="enter your feedback or question here"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full bg-zinc-900/40 border border-zinc-800 rounded-lg px-6 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-500 transition-colors resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-black py-5 px-10 flex items-center justify-between group hover:bg-zinc-200 transition-all rounded-lg"
                            >
                                <span className="text-lg font-medium">send</span>
                                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-2" />
                            </button>
                        </motion.form>
                    </div>

                    {/* Right Column: Info Card */}
                    <div className="lg:col-span-5 pt-10 lg:pt-32">
                        <motion.div
                            className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-10 md:p-16 space-y-12"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <div className="space-y-4">
                                <h3 className="text-2xl text-white font-medium">Location</h3>
                                <p className="text-zinc-400 text-lg border-b border-zinc-800 pb-2 inline-block">
                                    Guwahati, Assam
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl text-white font-medium">Tell</h3>
                                <p className="text-zinc-400 text-lg border-b border-zinc-800 pb-2 inline-block">
                                    +91-70027-65156
                                </p>
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-2xl text-white font-medium">Email</h3>
                                <p className="text-zinc-400 text-lg border-b border-zinc-800 pb-2 inline-block">
                                    deymohit5@gmail.com
                                </p>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
