const BRANCH_COUNT = 8;

export function getBranchCSSVar(index: number): string {
  return `var(--branch-${index % BRANCH_COUNT})`;
}
