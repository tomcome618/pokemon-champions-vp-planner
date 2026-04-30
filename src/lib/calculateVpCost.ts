import type { CostProgressInput, ParsedPokemon, PokemonCost, TeamCostResult, VpCostAssumptions } from './types';
import { isPokemonOwned } from './ownedPokemon';

export const DEFAULT_COST_ASSUMPTIONS: VpCostAssumptions = {
  recruit: 2500,
  moveChange: 250,
  nature: 500,
  ability: 500,
  statsEstimate: 200
};

const COSTS = {
  ...DEFAULT_COST_ASSUMPTIONS,
  knownFreeItems: new Set(['White Herb', 'Sitrus Berry', 'Focus Sash', 'Mental Herb', 'Leftovers'])
};

export function calculateTeamCost(
  team: ParsedPokemon[],
  currentVp: number,
  progress: CostProgressInput = {},
  assumptions: VpCostAssumptions = DEFAULT_COST_ASSUMPTIONS
): TeamCostResult {
  const pokemonCosts = team.map((pokemon) => calculatePokemonCost(pokemon, progress, assumptions));
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

function calculatePokemonCost(
  pokemon: ParsedPokemon,
  progress: CostProgressInput,
  assumptions: VpCostAssumptions
): PokemonCost {
  const alreadyOwned = isPokemonOwned(pokemon.name, progress.ownedPokemonNames);
  const recruit = alreadyOwned ? 0 : assumptions.recruit;
  const moves = pokemon.moves.length * assumptions.moveChange;
  const nature = pokemon.nature ? assumptions.nature : 0;
  const ability = pokemon.ability ? assumptions.ability : 0;
  const stats = assumptions.statsEstimate;
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
    total,
    alreadyOwned
  };
}
