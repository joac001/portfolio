'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typography from './Typography';
import type { TextStyle } from './types';

interface TypeWriterProps {
  text: string;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  style?: TextStyle;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
  onComplete?: () => void;
}

export default function TypeWriter({
  text,
  variant = 'h2',
  style = 'mono',
  className = '',
  speed = 50,
  delay = 0,
  cursor = true,
  onComplete,
}: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const hasCalledComplete = useRef(false);

  // Derived state - no need for separate useState
  const isComplete = displayedText.length >= text.length && isTyping;

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!hasCalledComplete.current) {
      hasCalledComplete.current = true;
      onComplete?.();
    }
  }, [displayedText, text, speed, isTyping, onComplete]);

  return (
    <Typography variant={variant} style={style} className={className} aria-label={text}>
      <span aria-hidden="true">
        {displayedText}
        {cursor && (
          <motion.span
            animate={{ opacity: isComplete ? [1, 0] : 1 }}
            transition={{
              duration: 0.5,
              repeat: isComplete ? Infinity : 0,
              repeatType: 'reverse',
            }}
            className="inline-block ml-0.5 w-0.5 h-[1em] bg-primary align-middle"
          />
        )}
      </span>
    </Typography>
  );
}
