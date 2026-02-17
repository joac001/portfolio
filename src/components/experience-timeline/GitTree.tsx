'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/shared';
import type { TreeLayout } from './types';

interface GitTreeProps {
  layout: TreeLayout;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const PATH_DURATION = 0.6;
const PATH_BASE_DELAY = 0.8;
const NODE_BASE_DELAY = 0.3; // Relative to when its branch finishes

export default function GitTree({ layout, selectedId, onSelect }: GitTreeProps) {
  const { nodes, paths, labels, mainLine, viewBoxWidth, viewBoxHeight } = layout;

  // Track if initial animation has completed (to avoid delays on selection changes)
  const [hasInitialized, setHasInitialized] = useState(false);

  // Calculate delays for cascading animation within each experience family
  const pathDelays = useMemo(() => {
    const delays = new Map<string, number>();
    const familyEndTimes = new Map<string, number>();

    // Group paths by experienceId and calculate sequential delays
    paths.forEach(path => {
      const familyId = path.experienceId;
      const currentFamilyEnd = familyEndTimes.get(familyId) ?? PATH_BASE_DELAY;

      delays.set(path.id, currentFamilyEnd);
      familyEndTimes.set(familyId, currentFamilyEnd + PATH_DURATION);
    });

    return delays;
  }, [paths]);

  // Calculate node delays based on when their branch path finishes
  const nodeDelays = useMemo(() => {
    const delays = new Map<string, number>();

    nodes.forEach(node => {
      // Find the path that ends at this node's position
      const relatedPath = paths.find(
        p =>
          p.experienceId === node.experienceId &&
          (node.subExperienceId ? p.subExperienceId === node.subExperienceId : true)
      );

      if (relatedPath) {
        const pathDelay = pathDelays.get(relatedPath.id) ?? PATH_BASE_DELAY;
        delays.set(node.id, pathDelay + PATH_DURATION + NODE_BASE_DELAY);
      } else {
        delays.set(node.id, PATH_BASE_DELAY + NODE_BASE_DELAY);
      }
    });

    return delays;
  }, [nodes, paths, pathDelays]);

  // Calculate label delays (appear with their nodes)
  const labelDelays = useMemo(() => {
    const delays = new Map<string, number>();

    labels.forEach(label => {
      const relatedNode = nodes.find(
        n =>
          n.experienceId === label.experienceId &&
          (label.subExperienceId ? n.subExperienceId === label.subExperienceId : true)
      );

      if (relatedNode) {
        delays.set(label.id, nodeDelays.get(relatedNode.id) ?? PATH_BASE_DELAY);
      } else {
        delays.set(label.id, PATH_BASE_DELAY + PATH_DURATION);
      }
    });

    return delays;
  }, [labels, nodes, nodeDelays]);

  // Calculate max animation time to know when initial animations are done
  const maxAnimationTime = useMemo(() => {
    let max = PATH_BASE_DELAY + 1.2; // main line
    pathDelays.forEach(delay => {
      max = Math.max(max, delay + PATH_DURATION);
    });
    nodeDelays.forEach(delay => {
      max = Math.max(max, delay + 0.5);
    });
    return max;
  }, [pathDelays, nodeDelays]);

  // Set hasInitialized after all initial animations complete
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasInitialized(true);
    }, maxAnimationTime * 1000);
    return () => clearTimeout(timer);
  }, [maxAnimationTime]);

  const getOpacity = (experienceId: string, subExperienceId?: string) => {
    if (!selectedId) return 1;
    if (selectedId === experienceId || selectedId === subExperienceId) return 1;
    return 0.25;
  };

  return (
    <div className="relative" style={{ height: viewBoxHeight }}>
      {/* SVG tree */}
      <svg
        width="100%"
        height={viewBoxHeight}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="xMinYMin meet"
        role="img"
        aria-label="Career timeline shown as a git branch graph"
        className="absolute inset-0"
      >
        {/* Main vertical line - with draw animation */}
        <motion.line
          x1={mainLine.x}
          y1={mainLine.y1}
          x2={mainLine.x}
          y2={mainLine.y2}
          stroke="var(--muted-contrast)"
          strokeWidth={2}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: selectedId ? 0.4 : 0.6,
          }}
          transition={{
            pathLength: { duration: 1.2, ease: 'easeInOut' },
            opacity: { duration: 0.25, ease: 'easeOut' },
          }}
        />

        {/* Branch paths - with cascading draw animation per family */}
        {paths.map(path => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.color}
            strokeWidth={
              selectedId === path.experienceId || selectedId === path.subExperienceId
                ? 3
                : path.strokeWidth
            }
            fill="none"
            strokeLinecap="round"
            strokeDasharray={path.dashed ? '6 4' : undefined}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: getOpacity(path.experienceId, path.subExperienceId),
            }}
            transition={{
              pathLength: {
                duration: PATH_DURATION,
                ease: 'easeOut',
                delay: hasInitialized ? 0 : (pathDelays.get(path.id) ?? PATH_BASE_DELAY),
              },
              opacity: {
                duration: 0.2,
                ease: 'easeOut',
                delay: hasInitialized ? 0 : (pathDelays.get(path.id) ?? PATH_BASE_DELAY),
              },
            }}
          />
        ))}

        {/* Invisible hit areas for easier clicking */}
        {paths.map(path => (
          <path
            key={`hit-${path.id}`}
            d={path.d}
            stroke="transparent"
            strokeWidth={20}
            fill="none"
            className="cursor-pointer"
            onClick={() => onSelect(path.subExperienceId ?? path.experienceId)}
          />
        ))}

        {/* Node circles - appear after their branch draws */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={6}
            fill={node.color}
            stroke="var(--background)"
            strokeWidth={2}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: getOpacity(node.experienceId, node.subExperienceId),
            }}
            transition={{
              scale: {
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: hasInitialized ? 0 : (nodeDelays.get(node.id) ?? PATH_BASE_DELAY),
              },
              opacity: {
                duration: 0.2,
                ease: 'easeOut',
                delay: hasInitialized ? 0 : (nodeDelays.get(node.id) ?? PATH_BASE_DELAY),
              },
            }}
            className="cursor-pointer"
            onClick={() => onSelect(node.subExperienceId ?? node.experienceId)}
          />
        ))}
      </svg>

      {/* HTML labels - appear with their nodes */}
      {labels.map(label => {
        const isSelected =
          selectedId === label.experienceId || selectedId === label.subExperienceId;
        return (
          <motion.button
            key={label.id}
            type="button"
            onClick={() => onSelect(label.subExperienceId ?? label.experienceId)}
            aria-pressed={isSelected}
            aria-label={`Select ${label.text}`}
            className="absolute text-left cursor-pointer bg-transparent border-none p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-lg hover:bg-muted-contrast/10"
            style={{
              top: label.y - 10,
              left: label.x,
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: selectedId && !isSelected ? 0.25 : 1,
              x: 0,
            }}
            transition={{
              opacity: { duration: 0.2, ease: 'easeOut' },
              x: {
                duration: 0.4,
                ease: 'easeOut',
                delay: hasInitialized ? 0 : (labelDelays.get(label.id) ?? PATH_BASE_DELAY),
              },
            }}
            whileHover={{
              scale: 1.05,
            }}
          >
            <Typography
              variant="body"
              as="span"
              style="mono"
              className={`block ${isSelected ? 'font-semibold' : ''}`}
            >
              {isSelected ? `<${label.text}>` : label.text}
            </Typography>
            <Typography variant="caption" as="span" style="mono" className="block">
              {label.dateText}
            </Typography>
          </motion.button>
        );
      })}
    </div>
  );
}
