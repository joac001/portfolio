"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            className="relative p-2 rounded-full text-primary bg-transparent hover:bg-accent cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden"
        >
            <AnimatePresence mode="wait">
                {theme === "light" ? (
                    <motion.span
                        key="moon"
                        className="block"
                        initial={{ y: -24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -24, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        <Moon size={24} />
                    </motion.span>
                ) : (
                    <motion.span
                        key="sun"
                        className="block"
                        initial={{ y: 24, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 24, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                        <Sun size={24} />
                    </motion.span>
                )}
            </AnimatePresence>
        </button>
    );
}
