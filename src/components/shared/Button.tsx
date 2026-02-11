"use client";

import { motion } from "framer-motion";
import { TextStyle, styleClasses } from "./types";

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'filled' | 'ghost' | 'outlined';
  style?: TextStyle;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
  className?: string;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  filled: 'bg-primary text-primary-contrast hover:bg-primary/90 focus-visible:ring-primary',
  ghost: 'bg-transparent text-primary hover:bg-accent focus-visible:ring-primary',
  outlined: 'bg-transparent text-primary border border-border hover:bg-accent focus-visible:ring-primary',
};

const variantGlow: Record<NonNullable<ButtonProps['variant']>, string> = {
  filled: '0 8px 24px -6px var(--primary)',
  ghost: '0 8px 24px -6px var(--border)',
  outlined: '0 8px 24px -6px var(--border)',
};

export default function Button({
  children,
  onClick,
  variant = 'filled',
  style = 'formal',
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
  className = '',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      whileHover={disabled ? {} : { scale: 1.05, y: -2, boxShadow: variantGlow[variant] }}
      whileTap={disabled ? {} : { scale: 0.97, boxShadow: "none" }}
      transition={{
        type: "tween",
        duration: 0.15,
        ease: "easeOut",
        boxShadow: { duration: 0.35, ease: "easeOut" },
      }}
      className={`w-fit ${variantClasses[variant]} ${styleClasses[style]} uppercase text-sm md:text-base font-medium leading-relaxed px-4 py-2 md:px-6 md:py-3 rounded-lg cursor-pointer transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
}
