'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const LG_BREAKPOINT = 1024;

export default function MobileDrawer({ open, onClose, children }: MobileDrawerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < LG_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Block scroll on mobile when open
  useEffect(() => {
    if (open && isMobile) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open, isMobile]);

  // Focus close button when drawer opens
  useEffect(() => {
    if (open) {
      // Small delay so framer-motion renders the element first
      const timer = setTimeout(() => closeRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Focus trap + Escape key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — visual only, not interactive for assistive tech */}
          <motion.div
            key="backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Experience details"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            className="fixed right-0 top-0 z-50 h-dvh w-4/5 max-w-sm bg-background border-l border-border overflow-y-auto lg:hidden"
            onKeyDown={handleKeyDown}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute top-4 right-4 p-2 text-muted-contrast cursor-pointer bg-transparent border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            >
              <X size={20} />
            </button>
            {children}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
