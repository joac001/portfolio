'use client';

import { useRef, useCallback, useSyncExternalStore } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { TextStyle, styleClasses } from './types';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'filled' | 'ghost' | 'outlined';
  style?: TextStyle;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  'aria-label'?: string;
  className?: string;
  magnetic?: boolean;
  magneticStrength?: number;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  filled: 'bg-primary text-primary-contrast hover:bg-primary/90 focus-visible:ring-primary',
  ghost: 'bg-transparent text-primary hover:bg-accent focus-visible:ring-primary',
  outlined:
    'bg-transparent text-primary border border-border hover:bg-accent focus-visible:ring-primary',
};

const variantGlow: Record<NonNullable<ButtonProps['variant']>, string> = {
  filled: '0 8px 24px -6px var(--primary)',
  ghost: '0 8px 24px -6px var(--border)',
  outlined: '0 8px 24px -6px var(--border)',
};

// Hook for reduced motion preference
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    callback => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false // SSR fallback
  );
}

export default function Button({
  children,
  onClick,
  variant = 'filled',
  style = 'formal',
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
  className = '',
  magnetic = false,
  magneticStrength = 0.3,
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const isMagnetic = magnetic && !disabled && !prefersReducedMotion;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current || !isMagnetic) return;

      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * magneticStrength;
      const deltaY = (e.clientY - centerY) * magneticStrength;

      x.set(deltaX);
      y.set(deltaY);
    },
    [x, y, isMagnetic, magneticStrength]
  );

  const handleMouseLeave = useCallback(() => {
    if (isMagnetic) {
      x.set(0);
      y.set(0);
    }
  }, [x, y, isMagnetic]);

  return (
    <motion.button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled || undefined}
      onMouseMove={isMagnetic ? handleMouseMove : undefined}
      onMouseLeave={isMagnetic ? handleMouseLeave : undefined}
      style={isMagnetic ? { x: springX, y: springY } : undefined}
      whileHover={
        disabled
          ? {}
          : { scale: 1.05, y: isMagnetic ? undefined : -2, boxShadow: variantGlow[variant] }
      }
      whileTap={disabled ? {} : { scale: 0.97, boxShadow: 'none' }}
      transition={{
        type: 'tween',
        duration: 0.15,
        ease: 'easeOut',
        boxShadow: { duration: 0.35, ease: 'easeOut' },
      }}
      className={`w-fit ${variantClasses[variant]} ${styleClasses[style]} uppercase text-sm md:text-base font-medium leading-relaxed px-4 py-2 md:px-6 md:py-3 rounded-lg cursor-pointer transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {children}
    </motion.button>
  );
}
