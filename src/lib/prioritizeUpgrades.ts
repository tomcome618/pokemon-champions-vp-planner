import type { PokemonCost, UpgradePriority } from './types';

type MetaProfile = {
  score: number;
  reason: string;
};

const META_PROFILES: Record<string, MetaProfile> = {
  Sneasler: { score: 100, reason: 'Fake Out pressure plus Unburden speed control make it a high-impact early investment.' },
  Incineroar: { score: 98, reason: 'Fake Out, Intimidate, and pivot support are reusable across many teams.' },
  Pelipper: { score: 90, reason: 'A weather setter that unlocks rain teams and compresses speed-control support.' },
  Whimsicott: { score: 88, reason: 'Speed control from Prankster Tailwind makes many teams easier to pilot.' },
  Garchomp: { score: 82, reason: 'Reliable spread damage and Ground pressure, but it can often run a budget spread first.' },
  Kingambit: { score: 84, reason: 'Priority and late-game cleaning are valuable, especially on balance teams.' },
  Basculegion: { score: 80, reason: 'Strong rain payoff, but it depends more on the rest of the rain core.' }
};

export function prioritizeUpgrades(costs: PokemonCost[], currentVp: number): UpgradePriority[] {
  let remainingVp = currentVp;

  return costs
    .map((cost) => {
      const profile = META_PROFILES[cost.name] ?? {
        score: 50,
        reason: 'Useful team member, but no special meta priority is configured yet.'
      };
      return {
        cost,
        score: profile.score - Math.floor(cost.total / 2000),
        reason: profile.reason
      };
    })
    .sort((a, b) => b.score - a.score)
    .map((item, index) => {
      const affordableNow = remainingVp >= item.cost.total;
      if (affordableNow) {
        remainingVp -= item.cost.total;
      }

      return {
        name: item.cost.name,
        rank: index + 1,
        score: item.score,
        reason: item.reason,
        budgetAdvice: affordableNow
          ? 'You can afford this full upgrade now; build it before less reusable pieces.'
          : 'If VP is tight, delay Nature optimization or non-core coverage moves and complete the core role first.',
        totalCost: item.cost.total
      };
    });
}
