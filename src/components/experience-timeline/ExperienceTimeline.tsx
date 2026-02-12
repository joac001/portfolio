'use client';

import { useMemo, useState } from 'react';
import { experiences } from '@/data/experiences';
import { computeTreeLayout } from './tree-layout';
import { getBranchCSSVar } from './branch-colors';
import GitTree from './GitTree';
import ExperienceDetail from './ExperienceDetail';
import MobileDrawer from './MobileDrawer';
import type { Experience } from './types';

interface ExperienceTimelineProps {
  id: string;
}

export default function ExperienceTimeline({ id }: ExperienceTimelineProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const layout = useMemo(() => computeTreeLayout(experiences), []);

  const sorted = useMemo(
    () =>
      [...experiences].sort((a, b) => {
        const da = a.startDate.split('-').map(Number);
        const db = b.startDate.split('-').map(Number);
        return da[0] * 12 + da[1] - (db[0] * 12 + db[1]);
      }),
    []
  );

  const handleSelect = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  let selected: Experience | null = null;
  let selectedColor = '';

  if (selectedId) {
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].id === selectedId) {
        selected = sorted[i];
        selectedColor = getBranchCSSVar(i);
        break;
      }
    }
  }

  return (
    <section id={id} className="flex gap-8" aria-label="Experience timeline">
      {/* Left: tree */}
      <div className="w-full lg:w-1/3">
        <GitTree layout={layout} selectedId={selectedId} onSelect={handleSelect} />
      </div>

      {/* Right: sticky detail panel (desktop) */}
      <aside className="hidden lg:flex lg:w-2/3 sticky top-4 self-start h-[calc(100dvh-2rem)] border-l border-border overflow-y-auto">
        <ExperienceDetail experience={selected} color={selectedColor} />
      </aside>

      {/* Mobile sidebar */}
      <MobileDrawer open={!!selected} onClose={() => setSelectedId(null)}>
        <ExperienceDetail experience={selected} color={selectedColor} />
      </MobileDrawer>
    </section>
  );
}
