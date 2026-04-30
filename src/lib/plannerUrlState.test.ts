import { describe, expect, it } from 'vitest';
import { DEFAULT_COST_ASSUMPTIONS } from './calculateVpCost';
import { decodePlannerStateFromQuery, encodePlannerStateToQuery, type PlannerUrlState } from './plannerUrlState';

const state: PlannerUrlState = {
  paste: 'Sneasler @ White Herb\nAbility: Unburden\nJolly Nature\n- Fake Out',
  ownedInput: 'Sneasler, Incineroar',
  currentVp: 12345,
  rankedBattlesPerDay: 8,
  winRate: 65,
  completesDailyMission: true,
  completesWeeklyMission: false,
  costAssumptions: {
    ...DEFAULT_COST_ASSUMPTIONS,
    recruit: 2400,
    moveChange: 300
  }
};

describe('planner URL state', () => {
  it('round-trips the full planner state through a compact query string', () => {
    const query = encodePlannerStateToQuery(state);

    expect(query).toContain('team=');
    expect(query).toContain('owned=');
    expect(query).not.toContain('Sneasler @ White Herb');
    expect(decodePlannerStateFromQuery(query)).toEqual(state);
  });

  it('returns null for empty or malformed shared state', () => {
    expect(decodePlannerStateFromQuery('')).toBeNull();
    expect(decodePlannerStateFromQuery('?team=not-valid-base64')).toBeNull();
    expect(decodePlannerStateFromQuery('?team=')).toBeNull();
  });

  it('normalizes missing numeric and boolean fields with safe defaults', () => {
    const query = encodePlannerStateToQuery({
      ...state,
      currentVp: Number.NaN,
      rankedBattlesPerDay: -5,
      winRate: 150,
      completesDailyMission: false,
      completesWeeklyMission: true
    });

    expect(decodePlannerStateFromQuery(query)).toMatchObject({
      currentVp: 0,
      rankedBattlesPerDay: 0,
      winRate: 100,
      completesDailyMission: false,
      completesWeeklyMission: true
    });
  });
});
