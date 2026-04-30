export type ParsedPokemon = {
  name: string;
  item?: string;
  ability?: string;
  nature?: string;
  moves: string[];
};

export type PokemonCost = {
  name: string;
  recruit: number;
  moves: number;
  nature: number;
  ability: number;
  stats: number;
  item: number;
  total: number;
  alreadyOwned: boolean;
};

export type CostProgressInput = {
  ownedPokemonNames?: string[];
};

export type VpCostAssumptions = {
  recruit: number;
  moveChange: number;
  nature: number;
  ability: number;
  statsEstimate: number;
};

export type TeamCostResult = {
  pokemonCosts: PokemonCost[];
  totalCost: number;
  currentVp: number;
  missingVp: number;
  canAffordFullTeam: boolean;
};

export type TimelineInput = {
  missingVp: number;
  rankedBattlesPerDay: number;
  winRate: number;
  completesDailyMission: boolean;
  completesWeeklyMission: boolean;
};

export type TimelineEstimate = {
  dailyVp: number;
  daysNeeded: number;
  explanation: string;
};

export type UpgradePriority = {
  name: string;
  rank: number;
  score: number;
  reason: string;
  budgetAdvice: string;
  totalCost: number;
};
