import { describe, expect, it } from 'vitest';
import { createBudgetMilestones } from './createBudgetMilestones';
import type { UpgradePriority } from './types';

const priorities: UpgradePriority[] = [
  {
    name: 'Pelipper',
    rank: 1,
    score: 100,
    reason: 'Weather setter first.',
    budgetAdvice: 'Affordable now.',
    totalCost: 4200
  },
  {
    name: 'Archaludon',
    rank: 2,
    score: 90,
    reason: 'Main damage engine second.',
    budgetAdvice: 'Save next.',
    totalCost: 5200
  },
  {
    name: 'Incineroar',
    rank: 3,
    score: 70,
    reason: 'Support after core.',
    budgetAdvice: 'Later upgrade.',
    totalCost: 3800
  }
];

describe('createBudgetMilestones', () => {
  it('marks cumulative priority milestones as affordable or missing VP', () => {
    expect(createBudgetMilestones(priorities, 9500)).toEqual([
      {
        rank: 1,
        name: 'Pelipper',
        cumulativeCost: 4200,
        missingVp: 0,
        affordable: true,
        label: 'Build #1 now'
      },
      {
        rank: 2,
        name: 'Archaludon',
        cumulativeCost: 9400,
        missingVp: 0,
        affordable: true,
        label: 'Build through #2 now'
      },
      {
        rank: 3,
        name: 'Incineroar',
        cumulativeCost: 13200,
        missingVp: 3700,
        affordable: false,
        label: 'Save 3,700 VP for #3'
      }
    ]);
  });

  it('uses priority rank order even when input is not sorted', () => {
    const rows = createBudgetMilestones([priorities[2], priorities[0]], 10000);

    expect(rows.map((row) => row.name)).toEqual(['Pelipper', 'Incineroar']);
    expect(rows[1].cumulativeCost).toBe(8000);
  });
});
