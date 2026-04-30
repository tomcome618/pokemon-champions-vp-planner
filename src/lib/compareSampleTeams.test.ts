import { describe, expect, it } from 'vitest';
import { sampleTeams } from '../data/sampleTeams';
import { DEFAULT_COST_ASSUMPTIONS } from './calculateVpCost';
import { compareSampleTeams } from './compareSampleTeams';

describe('compareSampleTeams', () => {
  it('summarizes and sorts sample teams by estimated remaining VP cost', () => {
    const rows = compareSampleTeams(sampleTeams, 12_000, {
      costAssumptions: DEFAULT_COST_ASSUMPTIONS,
      ownedPokemonNames: ['Garchomp']
    });

    expect(rows).toHaveLength(sampleTeams.length);
    expect(rows[0]).toMatchObject({
      id: 'budget-starter',
      archetype: 'Budget Starter',
      pokemonCount: 3,
      totalCost: 11_600,
      missingVp: 0,
      canAfford: true
    });
    expect(rows.map((row) => row.totalCost)).toEqual([...rows.map((row) => row.totalCost)].sort((a, b) => a - b));
  });
});
