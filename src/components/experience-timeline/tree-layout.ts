import type { Experience, TreeLayout, TreeNode, TreePath, TreeLabel } from './types';
import { getBranchCSSVar } from './branch-colors';

const LAYOUT = {
  mainLineX: 24,
  branchOffsetX: 60,
  subBranchOffsetX: 50,
  nodeRadius: 6,
  rowHeight: 120,
  curveRadius: 24,
  labelOffsetX: 16,
  padding: { top: 30, bottom: 40, right: 120 },
} as const;

interface TimelineEvent {
  type: 'branch-start' | 'branch-end' | 'sub-branch-start' | 'sub-branch-end';
  date: string;
  experienceId: string;
  subExperienceId?: string;
  branchColorIndex: number;
  sortPriority: number;
}

function parseDate(d: string): number {
  const [year, month] = d.split('-').map(Number);
  return year * 12 + month;
}

function formatDateRange(start: string, end?: string): string {
  const format = (d: string) => {
    const [year, month] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  };
  return end ? `${format(start)} — ${format(end)}` : `${format(start)} — Present`;
}

/**
 * Assigns horizontal slot indices to avoid overlapping branches.
 * Returns a map of experienceId -> slot number (0-based).
 */
function assignBranchSlots(experiences: Experience[]): Map<string, number> {
  const events: { date: number; type: 'start' | 'end'; id: string }[] = [];

  for (const exp of experiences) {
    events.push({ date: parseDate(exp.startDate), type: 'start', id: exp.id });
    if (exp.endDate) {
      events.push({ date: parseDate(exp.endDate), type: 'end', id: exp.id });
    }
  }

  events.sort((a, b) => {
    if (a.date !== b.date) return a.date - b.date;
    // ends before starts at the same date to free up slots
    return a.type === 'end' ? -1 : 1;
  });

  const slots = new Map<string, number>();
  const activeSlots = new Set<number>();

  for (const event of events) {
    if (event.type === 'start') {
      let slot = 0;
      while (activeSlots.has(slot)) slot++;
      slots.set(event.id, slot);
      activeSlots.add(slot);
    } else {
      const slot = slots.get(event.id)!;
      activeSlots.delete(slot);
    }
  }

  return slots;
}

/**
 * Computes the full tree layout from experience data.
 * Pure function — no React, no DOM.
 */
export function computeTreeLayout(experiences: Experience[]): TreeLayout {
  const sorted = [...experiences].sort(
    (a, b) => parseDate(a.startDate) - parseDate(b.startDate)
  );

  const branchSlots = assignBranchSlots(sorted);
  const nodes: TreeNode[] = [];
  const paths: TreePath[] = [];
  const labels: TreeLabel[] = [];

  // Build timeline events
  const events: TimelineEvent[] = [];
  sorted.forEach((exp, i) => {
    events.push({
      type: 'branch-start',
      date: exp.startDate,
      experienceId: exp.id,
      branchColorIndex: i,
      sortPriority: 0,
    });

    if (exp.subExperiences) {
      exp.subExperiences.forEach((sub, si) => {
        events.push({
          type: 'sub-branch-start',
          date: sub.startDate,
          experienceId: exp.id,
          subExperienceId: sub.id,
          branchColorIndex: i + si + sorted.length,
          sortPriority: 1,
        });
        if (sub.endDate) {
          events.push({
            type: 'sub-branch-end',
            date: sub.endDate,
            experienceId: exp.id,
            subExperienceId: sub.id,
            branchColorIndex: i + si + sorted.length,
            sortPriority: 2,
          });
        }
      });
    }

    if (exp.endDate) {
      events.push({
        type: 'branch-end',
        date: exp.endDate,
        experienceId: exp.id,
        branchColorIndex: i,
        sortPriority: 3,
      });
    }
  });

  // Sort events chronologically
  events.sort((a, b) => {
    const da = parseDate(a.date);
    const db = parseDate(b.date);
    if (da !== db) return da - db;
    return a.sortPriority - b.sortPriority;
  });

  // Compute Y positions and build nodes/labels
  const nodePositions = new Map<string, { x: number; y: number }>();
  const { mainLineX, branchOffsetX, subBranchOffsetX, curveRadius, labelOffsetX, padding } = LAYOUT;

  events.forEach((event, index) => {
    const y = padding.top + index * LAYOUT.rowHeight;
    const slot = branchSlots.get(event.experienceId) ?? 0;
    const branchX = mainLineX + (slot + 1) * branchOffsetX;
    const color = getBranchCSSVar(event.branchColorIndex);

    if (event.type === 'branch-start') {
      // Node on main line where branch splits off
      const mainNode: TreeNode = {
        id: `${event.experienceId}-main-start`,
        type: 'branch-start',
        experienceId: event.experienceId,
        x: mainLineX,
        y,
        color,
      };
      nodes.push(mainNode);

      // Node at the branch position
      const branchNode: TreeNode = {
        id: `${event.experienceId}-branch-start`,
        type: 'branch-start',
        experienceId: event.experienceId,
        x: branchX,
        y: y + curveRadius * 2,
        color,
      };
      nodes.push(branchNode);
      nodePositions.set(`${event.experienceId}-start`, { x: branchX, y: y + curveRadius * 2 });

      // Branch-off curve path (main → branch)
      paths.push({
        id: `${event.experienceId}-branch-off`,
        experienceId: event.experienceId,
        d: `M ${mainLineX} ${y} C ${mainLineX} ${y + curveRadius}, ${branchX} ${y + curveRadius}, ${branchX} ${y + curveRadius * 2}`,
        color,
        strokeWidth: 2,
      });

      // Label
      labels.push({
        id: `${event.experienceId}-label`,
        experienceId: event.experienceId,
        text: sorted.find(e => e.id === event.experienceId)!.name,
        dateText: formatDateRange(
          event.date,
          sorted.find(e => e.id === event.experienceId)!.endDate
        ),
        x: branchX + labelOffsetX,
        y: y + curveRadius * 2,
        color,
      });
    }

    if (event.type === 'branch-end') {
      const startPos = nodePositions.get(`${event.experienceId}-start`);
      if (!startPos) return;

      // Vertical line from branch-start to before merge
      const mergeStartY = y - curveRadius * 2;
      if (mergeStartY > startPos.y) {
        paths.push({
          id: `${event.experienceId}-branch-vertical`,
          experienceId: event.experienceId,
          d: `M ${branchX} ${startPos.y} L ${branchX} ${mergeStartY}`,
          color,
          strokeWidth: 2,
        });
      }

      // Merge-back curve (branch → main)
      paths.push({
        id: `${event.experienceId}-merge`,
        experienceId: event.experienceId,
        d: `M ${branchX} ${mergeStartY} C ${branchX} ${mergeStartY + curveRadius}, ${mainLineX} ${mergeStartY + curveRadius}, ${mainLineX} ${y}`,
        color,
        strokeWidth: 2,
      });

      // Merge node on main line
      nodes.push({
        id: `${event.experienceId}-main-end`,
        type: 'branch-end',
        experienceId: event.experienceId,
        x: mainLineX,
        y,
        color,
      });
    }

    if (event.type === 'sub-branch-start' && event.subExperienceId) {
      const parentStart = nodePositions.get(`${event.experienceId}-start`);
      if (!parentStart) return;

      const subBranchX = branchX + subBranchOffsetX;
      const subColor = getBranchCSSVar(event.branchColorIndex);

      // Node on parent branch
      nodes.push({
        id: `${event.subExperienceId}-parent-start`,
        type: 'sub-branch-start',
        experienceId: event.experienceId,
        subExperienceId: event.subExperienceId,
        x: branchX,
        y,
        color: subColor,
      });

      // Sub-branch node
      nodes.push({
        id: `${event.subExperienceId}-branch-start`,
        type: 'sub-branch-start',
        experienceId: event.experienceId,
        subExperienceId: event.subExperienceId,
        x: subBranchX,
        y: y + curveRadius * 2,
        color: subColor,
      });
      nodePositions.set(`${event.subExperienceId}-start`, { x: subBranchX, y: y + curveRadius * 2 });

      // Sub-branch-off curve
      paths.push({
        id: `${event.subExperienceId}-sub-branch-off`,
        experienceId: event.experienceId,
        subExperienceId: event.subExperienceId,
        d: `M ${branchX} ${y} C ${branchX} ${y + curveRadius}, ${subBranchX} ${y + curveRadius}, ${subBranchX} ${y + curveRadius * 2}`,
        color: subColor,
        strokeWidth: 2,
      });

      // Sub-branch label
      const exp = sorted.find(e => e.id === event.experienceId)!;
      const sub = exp.subExperiences!.find(s => s.id === event.subExperienceId)!;
      labels.push({
        id: `${event.subExperienceId}-label`,
        experienceId: event.experienceId,
        subExperienceId: event.subExperienceId,
        text: sub.name,
        dateText: formatDateRange(sub.startDate, sub.endDate),
        x: subBranchX + labelOffsetX,
        y: y + curveRadius * 2,
        color: subColor,
      });
    }

    if (event.type === 'sub-branch-end' && event.subExperienceId) {
      const subStart = nodePositions.get(`${event.subExperienceId}-start`);
      if (!subStart) return;

      const subBranchX = subStart.x;
      const subColor = getBranchCSSVar(event.branchColorIndex);
      const mergeStartY = y - curveRadius * 2;

      // Sub-branch vertical line
      if (mergeStartY > subStart.y) {
        paths.push({
          id: `${event.subExperienceId}-sub-vertical`,
          experienceId: event.experienceId,
          subExperienceId: event.subExperienceId,
          d: `M ${subBranchX} ${subStart.y} L ${subBranchX} ${mergeStartY}`,
          color: subColor,
          strokeWidth: 2,
        });
      }

      // Sub-branch merge back to parent branch
      paths.push({
        id: `${event.subExperienceId}-sub-merge`,
        experienceId: event.experienceId,
        subExperienceId: event.subExperienceId,
        d: `M ${subBranchX} ${mergeStartY} C ${subBranchX} ${mergeStartY + curveRadius}, ${branchX} ${mergeStartY + curveRadius}, ${branchX} ${y}`,
        color: subColor,
        strokeWidth: 2,
      });

      // Merge node on parent branch
      nodes.push({
        id: `${event.subExperienceId}-parent-end`,
        type: 'sub-branch-end',
        experienceId: event.experienceId,
        subExperienceId: event.subExperienceId,
        x: branchX,
        y,
        color: subColor,
      });
    }
  });

  // Handle ongoing experiences (no endDate) — dashed line extending down
  const lastEventY = padding.top + (events.length - 1) * LAYOUT.rowHeight;
  const bottomY = lastEventY + LAYOUT.rowHeight;

  sorted.forEach((exp, i) => {
    if (!exp.endDate) {
      const slot = branchSlots.get(exp.id) ?? 0;
      const branchX = mainLineX + (slot + 1) * branchOffsetX;
      const startPos = nodePositions.get(`${exp.id}-start`);
      if (!startPos) return;

      paths.push({
        id: `${exp.id}-ongoing`,
        experienceId: exp.id,
        d: `M ${branchX} ${startPos.y} L ${branchX} ${bottomY}`,
        color: getBranchCSSVar(i),
        strokeWidth: 2,
        dashed: true,
      });
    }

    // Ongoing sub-experiences
    exp.subExperiences?.forEach((sub, si) => {
      if (!sub.endDate) {
        const subStart = nodePositions.get(`${sub.id}-start`);
        if (!subStart) return;

        paths.push({
          id: `${sub.id}-ongoing`,
          experienceId: exp.id,
          subExperienceId: sub.id,
          d: `M ${subStart.x} ${subStart.y} L ${subStart.x} ${bottomY}`,
          color: getBranchCSSVar(i + si + sorted.length),
          strokeWidth: 2,
          dashed: true,
        });
      }
    });
  });

  // Compute viewBox dimensions
  const allX = nodes.map(n => n.x);
  const maxX = Math.max(...allX, mainLineX) + LAYOUT.padding.right;
  const viewBoxHeight = bottomY + padding.bottom;

  return {
    nodes,
    paths,
    labels,
    mainLine: { x: mainLineX, y1: padding.top, y2: bottomY },
    viewBoxWidth: maxX,
    viewBoxHeight,
  };
}
