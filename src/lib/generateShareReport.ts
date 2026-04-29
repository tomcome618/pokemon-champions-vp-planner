import type { TeamCostResult, TimelineEstimate, UpgradePriority } from './types';

const formatVp = (value: number) => `${value.toLocaleString()} VP`;

export function generateShareReport(
  cost: TeamCostResult,
  priorities: UpgradePriority[],
  timeline: TimelineEstimate
): string {
  const costRows = cost.pokemonCosts
    .map((pokemon) => `- ${pokemon.name}: ${formatVp(pokemon.total)} (recruit ${formatVp(pokemon.recruit)}, moves ${formatVp(pokemon.moves)}, nature ${formatVp(pokemon.nature)}, ability ${formatVp(pokemon.ability)}, stats ${formatVp(pokemon.stats)})`)
    .join('\n');

  const priorityRows = priorities
    .map((priority) => `${priority.rank}. ${priority.name} — ${formatVp(priority.totalCost)}\n   Why: ${priority.reason}\n   Budget advice: ${priority.budgetAdvice}`)
    .join('\n');

  return `Pokemon Champions Team VP Plan\n\nTotal cost: ${formatVp(cost.totalCost)}\nCurrent VP: ${formatVp(cost.currentVp)}\nMissing VP: ${formatVp(cost.missingVp)}\nStatus: ${cost.canAffordFullTeam ? 'Ready to build' : 'Need more VP'}\n\nCost breakdown:\n${costRows}\n\nUpgrade priority:\n${priorityRows}\n\nTimeline:\n${timeline.explanation}\n`;
}
