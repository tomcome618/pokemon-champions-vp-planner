import type { ParsedPokemon, PokemonCost, TeamCostResult } from './types';

const COSTS = {
  recruit: 2500,
  moveChange: 250,
  nature: 500,
  ability: 500,
  statsEstimate: 200,
  knownFreeItems: new Set(['White Herb', 'Sitrus Berry', 'Focus Sash', 'Mental Herb', 'Leftovers'])
};

export function calculateTeamCost(team: ParsedPokemon[], currentVp: number): TeamCostResult {
  const pokemonCosts = team.map(calculatePokemonCost);
  const totalCost = pokemonCosts.reduce((sum, cost) => sum + cost.total, 0);
  const missingVp = Math.max(0, totalCost - currentVp);

  return {
    pokemonCosts,
    totalCost,
    currentVp,
    missingVp,
    canAffordFullTeam: missingVp === 0
  };
}

function calculatePokemonCost(pokemon: ParsedPokemon): PokemonCost {
  const recruit = COSTS.recruit;
  const moves = pokemon.moves.length * COSTS.moveChange;
  const nature = pokemon.nature ? COSTS.nature : 0;
  const ability = pokemon.ability ? COSTS.ability : 0;
  const stats = COSTS.statsEstimate;
  const item = pokemon.item && !COSTS.knownFreeItems.has(pokemon.item) ? 0 : 0;
  const total = recruit + moves + nature + ability + stats + item;

  return {
    name: pokemon.name,
    recruit,
    moves,
    nature,
    ability,
    stats,
    item,
    total
  };
}
