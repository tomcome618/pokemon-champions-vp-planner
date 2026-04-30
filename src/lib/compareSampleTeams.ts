import type { SampleTeam } from '../data/sampleTeams';
import { calculateTeamCost } from './calculateVpCost';
import { estimateTimeline } from './estimateTimeline';
import { parseShowdownPaste } from './parseShowdown';
import type { VpCostAssumptions } from './types';

export type SampleTeamComparisonOptions = {
  costAssumptions: VpCostAssumptions;
  ownedPokemonNames?: string[];
  rankedBattlesPerDay?: number;
  winRate?: number;
  completesDailyMission?: boolean;
  completesWeeklyMission?: boolean;
};

export type SampleTeamComparisonRow = {
  id: string;
  archetype: string;
  title: string;
  difficulty: SampleTeam['difficulty'];
  bestFor: string;
  pokemonCount: number;
  ownedCount: number;
  recruitVpSaved: number;
  recommendationReason: string;
  totalCost: number;
  missingVp: number;
  canAfford: boolean;
  daysNeeded: number;
};

export function compareSampleTeams(
  sampleTeams: SampleTeam[],
  currentVp: number,
  options: SampleTeamComparisonOptions
): SampleTeamComparisonRow[] {
  return sampleTeams
    .map((sample) => {
      const parsedTeam = parseShowdownPaste(sample.paste);
      const cost = calculateTeamCost(
        parsedTeam,
        currentVp,
        { ownedPokemonNames: options.ownedPokemonNames },
        options.costAssumptions
      );
      const timeline = estimateTimeline({
        missingVp: cost.missingVp,
        rankedBattlesPerDay: options.rankedBattlesPerDay ?? 10,
        winRate: options.winRate ?? 0.5,
        completesDailyMission: options.completesDailyMission ?? true,
        completesWeeklyMission: options.completesWeeklyMission ?? false
      });
      const ownedCount = cost.pokemonCosts.filter((pokemon) => pokemon.alreadyOwned).length;
      const recruitVpSaved = ownedCount * options.costAssumptions.recruit;
      const recommendationReason = ownedCount > 0
        ? `Cheapest sample for your current box: ${ownedCount}/${parsedTeam.length} owned and ${recruitVpSaved.toLocaleString()} VP recruit cost saved.`
        : 'No owned Pokémon discount yet; compare total VP, difficulty, and fit before committing.';

      return {
        id: sample.id,
        archetype: sample.archetype,
        title: sample.title,
        difficulty: sample.difficulty,
        bestFor: sample.bestFor,
        pokemonCount: parsedTeam.length,
        ownedCount,
        recruitVpSaved,
        recommendationReason,
        totalCost: cost.totalCost,
        missingVp: cost.missingVp,
        canAfford: cost.canAffordFullTeam,
        daysNeeded: timeline.daysNeeded
      };
    })
    .sort((a, b) => a.totalCost - b.totalCost || a.missingVp - b.missingVp || a.archetype.localeCompare(b.archetype));
}
