/** Sub-experience within a parent experience (sub-branch) */
export interface SubExperience {
  id: string;
  name: string;
  startDate: string;       // "2023-06"
  endDate?: string;        // undefined = ongoing
  description: string;
}

/** Top-level experience (branch from main) */
export interface Experience {
  id: string;
  name: string;
  role: string;
  startDate: string;       // "2022-01"
  endDate?: string;        // undefined = ongoing
  description: string;
  subExperiences?: SubExperience[];
}

/** Computed node in the tree */
export interface TreeNode {
  id: string;
  type: 'branch-start' | 'branch-end' | 'sub-branch-start' | 'sub-branch-end';
  experienceId: string;
  subExperienceId?: string;
  x: number;
  y: number;
  color: string;
}

/** Computed SVG path segment */
export interface TreePath {
  id: string;
  experienceId: string;
  subExperienceId?: string;
  d: string;               // SVG path d attribute
  color: string;
  strokeWidth: number;
  dashed?: boolean;
}

/** Label to render alongside a node */
export interface TreeLabel {
  id: string;
  experienceId: string;
  subExperienceId?: string;
  text: string;
  dateText: string;
  x: number;
  y: number;
  color: string;
}

/** Full computed layout */
export interface TreeLayout {
  nodes: TreeNode[];
  paths: TreePath[];
  labels: TreeLabel[];
  mainLine: { x: number; y1: number; y2: number };
  viewBoxWidth: number;
  viewBoxHeight: number;
}
