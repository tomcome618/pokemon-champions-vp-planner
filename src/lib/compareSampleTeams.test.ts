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
      ownedCount: 1,
      recruitVpSaved: 2_500,
      totalCost: 11_600,
      missingVp: 0,
      canAfford: true,
      recommendationReason: 'Cheapest sample for your current box: 1/3 owned and 2,500 VP recruit cost saved.'
    });
    expect(rows.map((row) => row.totalCost)).toEqual([...rows.map((row) => row.totalCost)].sort((a, b) => a - b));
  });

  it('explains when a sample team has no owned Pokémon discount yet', () => {
    const rows = compareSampleTeams(sampleTeams, 0, {
      costAssumptions: DEFAULT_COST_ASSUMPTIONS,
      ownedPokemonNames: []
    });

    expect(rows[0]).toMatchObject({
      ownedCount: 0,
      recruitVpSaved: 0,
      recommendationReason: 'No owned Pokémon discount yet; compare total VP, difficulty, and fit before committing.'
    });
  });
});
