import type { UpgradePriority } from './types';

export type BudgetMilestone = {
  rank: number;
  name: string;
  cumulativeCost: number;
  missingVp: number;
  affordable: boolean;
  label: string;
};

export function createBudgetMilestones(priorities: UpgradePriority[], currentVp: number): BudgetMilestone[] {
  let cumulativeCost = 0;

  return [...priorities]
    .sort((a, b) => a.rank - b.rank)
    .map((priority) => {
      cumulativeCost += priority.totalCost;
      const missingVp = Math.max(0, cumulativeCost - currentVp);
      const affordable = missingVp === 0;

      return {
        rank: priority.rank,
        name: priority.name,
        cumulativeCost,
        missingVp,
        affordable,
        label: affordable
          ? priority.rank === 1
            ? 'Build #1 now'
            : `Build through #${priority.rank} now`
          : `Save ${missingVp.toLocaleString()} VP for #${priority.rank}`
      };
    });
}
