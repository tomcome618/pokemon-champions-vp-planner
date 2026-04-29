import { describe, expect, it } from 'vitest';
import { calculateTeamCost } from './calculateVpCost';
import { parseOwnedPokemonList } from './ownedPokemon';
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

describe('owned Pokémon progress', () => {
  it('parses owned Pokémon names from commas, new lines, and Showdown headers', () => {
    expect(parseOwnedPokemonList('Sneasler, Incineroar\nPelipper @ Focus Sash')).toEqual([
      'sneasler',
      'incineroar',
      'pelipper'
    ]);
  });

  it('removes recruit cost for Pokémon the player already owns', () => {
    const result = calculateTeamCost(team, 0, { ownedPokemonNames: ['Sneasler'] });

    expect(result.pokemonCosts[0]).toMatchObject({
      name: 'Sneasler',
      recruit: 0,
      alreadyOwned: true,
      total: 2200
    });
    expect(result.pokemonCosts[1]).toMatchObject({
      name: 'Incineroar',
      recruit: 2500,
      alreadyOwned: false,
      total: 4700
    });
    expect(result.totalCost).toBe(6900);
  });
});
