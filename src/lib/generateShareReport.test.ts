import { describe, expect, it } from 'vitest';
import { generateShareReport } from './generateShareReport';
import type { TeamCostResult, TimelineEstimate, UpgradePriority } from './types';

const cost: TeamCostResult = {
  currentVp: 6000,
  totalCost: 9400,
  missingVp: 3400,
  canAffordFullTeam: false,
  pokemonCosts: [
    { name: 'Sneasler', recruit: 2500, moves: 1000, nature: 500, ability: 500, stats: 200, item: 0, total: 4700 }
  ]
};

const timeline: TimelineEstimate = {
  dailyVp: 2750,
  daysNeeded: 2,
  explanation: 'At roughly 2,750 VP/day, this plan needs about 2 days.'
};

const priorities: UpgradePriority[] = [
  { name: 'Sneasler', rank: 1, score: 98, reason: 'Fake Out pressure matters.', budgetAdvice: 'Build it first.', totalCost: 4700 }
];

describe('generateShareReport', () => {
  it('creates a copyable text report with cost, timeline, and priority plan', () => {
    const report = generateShareReport(cost, priorities, timeline);

    expect(report).toContain('Pokemon Champions Team VP Plan');
    expect(report).toContain('Total cost: 9,400 VP');
    expect(report).toContain('Missing VP: 3,400 VP');
    expect(report).toContain('1. Sneasler — 4,700 VP');
    expect(report).toContain('2 days');
  });
});
