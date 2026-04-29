import { describe, expect, it } from 'vitest';
import { prioritizeUpgrades } from './prioritizeUpgrades';
import type { PokemonCost } from './types';

const costs: PokemonCost[] = [
  { name: 'Garchomp', recruit: 2500, moves: 1000, nature: 500, ability: 500, stats: 200, item: 0, total: 4700, alreadyOwned: false },
  { name: 'Sneasler', recruit: 2500, moves: 1000, nature: 500, ability: 500, stats: 200, item: 0, total: 4700, alreadyOwned: false },
  { name: 'Pelipper', recruit: 2500, moves: 1000, nature: 500, ability: 500, stats: 200, item: 0, total: 4700, alreadyOwned: false }
];

describe('prioritizeUpgrades', () => {
  it('orders pokemon by meta role priority and explains why each one matters', () => {
    const priorities = prioritizeUpgrades(costs, 8000);

    expect(priorities.map((item) => item.name)).toEqual(['Sneasler', 'Pelipper', 'Garchomp']);
    expect(priorities[0].reason).toContain('Fake Out');
    expect(priorities[1].reason).toContain('weather');
    expect(priorities[2].budgetAdvice).toContain('delay Nature');
  });
});
