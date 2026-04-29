import type { TimelineEstimate, TimelineInput } from './types';

const DAILY_MISSION_VP = 500;
const WEEKLY_MISSION_VP = 9000;
const RANKED_WIN_VP = 300;
const RANKED_LOSS_VP = 150;

export function estimateTimeline(input: TimelineInput): TimelineEstimate {
  if (input.missingVp <= 0) {
    return {
      dailyVp: 0,
      daysNeeded: 0,
      explanation: 'You already have enough VP for this plan.'
    };
  }

  const clampedWinRate = Math.min(1, Math.max(0, input.winRate));
  const expectedBattleVp = input.rankedBattlesPerDay * (
    clampedWinRate * RANKED_WIN_VP + (1 - clampedWinRate) * RANKED_LOSS_VP
  );
  const dailyMissionVp = input.completesDailyMission ? DAILY_MISSION_VP : 0;
  const weeklyAsDailyVp = input.completesWeeklyMission ? WEEKLY_MISSION_VP / 7 : 0;
  const dailyVp = Math.round(expectedBattleVp + dailyMissionVp + weeklyAsDailyVp);
  const daysNeeded = dailyVp > 0 ? Math.ceil(input.missingVp / dailyVp) : Number.POSITIVE_INFINITY;

  return {
    dailyVp,
    daysNeeded,
    explanation: Number.isFinite(daysNeeded)
      ? `At roughly ${dailyVp.toLocaleString()} VP/day, this plan needs about ${daysNeeded} days.`
      : 'No daily VP income was entered, so the completion date cannot be estimated.'
  };
}
