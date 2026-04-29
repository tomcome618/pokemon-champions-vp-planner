import { describe, expect, it } from 'vitest';
import { estimateTimeline } from './estimateTimeline';

describe('estimateTimeline', () => {
  it('estimates daily income and days needed from daily missions plus ranked battles', () => {
    const result = estimateTimeline({
      missingVp: 3400,
      rankedBattlesPerDay: 10,
      winRate: 0.5,
      completesDailyMission: true,
      completesWeeklyMission: false
    });

    expect(result.dailyVp).toBe(2750);
    expect(result.daysNeeded).toBe(2);
    expect(result.explanation).toContain('2 days');
  });

  it('returns zero days when no VP is missing', () => {
    const result = estimateTimeline({
      missingVp: 0,
      rankedBattlesPerDay: 0,
      winRate: 0.5,
      completesDailyMission: false,
      completesWeeklyMission: false
    });

    expect(result.daysNeeded).toBe(0);
  });
});
