'use client';

import { useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GitBranch } from 'lucide-react';
import { Typography } from '@/components/shared';
import type { Experience } from './types';

interface ExperienceDetailProps {
  experience: Experience | null;
  color: string;
}

export default function ExperienceDetail({ experience, color }: ExperienceDetailProps) {
  const titleId = useId();

  return (
    <div className="h-full flex items-start" aria-live="polite">
      <AnimatePresence mode="wait">
        {experience ? (
          <motion.article
            key={experience.id}
            aria-labelledby={titleId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
            className="p-6"
          >
            <Typography variant="caption" style="mono" className="mb-1 block">
              {experience.name}
            </Typography>
            <Typography variant="h3" id={titleId} style="futuristic" className="mb-1">
              {experience.role}
            </Typography>
            <div className="h-1 w-12 rounded-full mb-4" style={{ backgroundColor: color }} aria-hidden="true" />
            <Typography variant="body" style="mono">
              {experience.description}
            </Typography>
          </motion.article>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className="p-6 flex flex-col items-center justify-center h-full w-full text-muted-contrast"
          >
            <GitBranch size={48} className="mb-4 opacity-30" />
            <Typography variant="body" className="text-center text-muted-contrast">
              Select an experience to see details
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
