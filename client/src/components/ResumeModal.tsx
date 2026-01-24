import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
    const [resumeUrl, setResumeUrl] = useState<string>("");
    const [resumeFileName, setResumeFileName] = useState<string>("");

    useEffect(() => {
        // Fetch the latest resume from the resume folder
        const fetchLatestResume = async () => {
            try {
                // In a production environment, you'd need a backend API to list files
                // For now, we'll use a direct path since there's only one file
                // The file name from the directory listing
                const fileName = "MOHIT KUMAR DEY_AEI_AIA+FS.pdf";
                const url = `/resume/${fileName}`;

                setResumeUrl(url);
                setResumeFileName(fileName);
            } catch (error) {
                console.error("Error loading resume:", error);
            }
        };

        if (isOpen) {
            fetchLatestResume();
        }
    }, [isOpen]);

    const handleDownload = () => {
        if (!resumeUrl) return;

        const link = document.createElement("a");
        link.href = resumeUrl;
        link.download = resumeFileName || "Mohit_Kumar_Dey_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleBackdropClick}
                >
                    <motion.div
                        className="relative w-full max-w-5xl h-[90vh] bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-sm border-b border-purple-500/20">
                            <div className="flex items-center gap-3">
                                <FileText className="w-6 h-6 text-purple-400" />
                                <h2 className="text-xl font-bold text-white">Resume</h2>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={handleDownload}
                                    className="bg-purple-500/80 hover:bg-purple-500 text-white border border-purple-400/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all duration-300"
                                    size="sm"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>

                                <Button
                                    onClick={onClose}
                                    variant="ghost"
                                    size="icon"
                                    className="text-white hover:bg-white/10 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>

                        {/* Resume Viewer */}
                        <div className="w-full h-full pt-16">
                            {resumeUrl ? (
                                <iframe
                                    src={`${resumeUrl}#toolbar=0`}
                                    className="w-full h-full border-0"
                                    title="Resume Viewer"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                                        <p className="text-white/60">Loading resume...</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
