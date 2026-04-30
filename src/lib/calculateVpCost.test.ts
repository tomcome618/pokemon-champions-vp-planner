import { describe, expect, it } from 'vitest';
import { calculateTeamCost } from './calculateVpCost';
import type { ParsedPokemon } from './types';

const team: ParsedPokemon[] = [
  {
    name: 'Sneasler',
    item: 'White Herb',
    ability: 'Unburden',
    nature: 'Jolly',
    moves: ['Fake Out', 'Close Combat', 'Dire Claw', 'Protect']
  },
  {
    name: 'Incineroar',
    item: 'Sitrus Berry',
    ability: 'Intimidate',
    nature: 'Careful',
    moves: ['Fake Out', 'Parting Shot', 'Flare Blitz', 'Knock Off']
  }
];

describe('calculateTeamCost', () => {
  it('calculates VP cost breakdown for each pokemon and the whole team', () => {
    const result = calculateTeamCost(team, 6000);

    expect(result.totalCost).toBe(9400);
    expect(result.currentVp).toBe(6000);
    expect(result.missingVp).toBe(3400);
    expect(result.canAffordFullTeam).toBe(false);
    expect(result.pokemonCosts[0]).toEqual({
      name: 'Sneasler',
      recruit: 2500,
      moves: 1000,
      nature: 500,
      ability: 500,
      stats: 200,
      item: 0,
      total: 4700,
      alreadyOwned: false
    });
  });

  it('marks the team affordable when current VP covers the total cost', () => {
    const result = calculateTeamCost(team, 10000);

    expect(result.canAffordFullTeam).toBe(true);
    expect(result.missingVp).toBe(0);
  });

  it('uses custom VP assumptions when players override uncertain costs', () => {
    const result = calculateTeamCost(team.slice(0, 1), 0, {}, {
      recruit: 3000,
      moveChange: 100,
      nature: 700,
      ability: 800,
      statsEstimate: 50
    });

    expect(result.totalCost).toBe(4950);
    expect(result.pokemonCosts[0]).toMatchObject({
      recruit: 3000,
      moves: 400,
      nature: 700,
      ability: 800,
      stats: 50,
      total: 4950
    });
  });
});
