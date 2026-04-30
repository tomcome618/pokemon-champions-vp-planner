import { DEFAULT_COST_ASSUMPTIONS } from './calculateVpCost';
import type { VpCostAssumptions } from './types';

export type PlannerUrlState = {
  paste: string;
  ownedInput: string;
  currentVp: number;
  rankedBattlesPerDay: number;
  winRate: number;
  completesDailyMission: boolean;
  completesWeeklyMission: boolean;
  costAssumptions: VpCostAssumptions;
};

const PARAMS = {
  team: 'team',
  owned: 'owned',
  currentVp: 'vp',
  rankedBattlesPerDay: 'battles',
  winRate: 'wr',
  completesDailyMission: 'daily',
  completesWeeklyMission: 'weekly',
  recruit: 'recruit',
  moveChange: 'move',
  nature: 'nature',
  ability: 'ability',
  statsEstimate: 'stats'
} as const;

export function encodePlannerStateToQuery(state: PlannerUrlState): string {
  const params = new URLSearchParams();
  params.set(PARAMS.team, encodeText(state.paste));
  if (state.ownedInput.trim()) {
    params.set(PARAMS.owned, encodeText(state.ownedInput));
  }
  params.set(PARAMS.currentVp, String(normalizeNumber(state.currentVp)));
  params.set(PARAMS.rankedBattlesPerDay, String(normalizeNumber(state.rankedBattlesPerDay)));
  params.set(PARAMS.winRate, String(normalizeNumber(state.winRate, 0, 100)));
  params.set(PARAMS.completesDailyMission, state.completesDailyMission ? '1' : '0');
  params.set(PARAMS.completesWeeklyMission, state.completesWeeklyMission ? '1' : '0');
  params.set(PARAMS.recruit, String(normalizeNumber(state.costAssumptions.recruit)));
  params.set(PARAMS.moveChange, String(normalizeNumber(state.costAssumptions.moveChange)));
  params.set(PARAMS.nature, String(normalizeNumber(state.costAssumptions.nature)));
  params.set(PARAMS.ability, String(normalizeNumber(state.costAssumptions.ability)));
  params.set(PARAMS.statsEstimate, String(normalizeNumber(state.costAssumptions.statsEstimate)));

  return `?${params.toString()}`;
}

export function decodePlannerStateFromQuery(query: string): PlannerUrlState | null {
  const params = new URLSearchParams(query.startsWith('?') ? query.slice(1) : query);
  const encodedTeam = params.get(PARAMS.team);
  if (!encodedTeam) return null;

  const paste = decodeText(encodedTeam);
  if (!paste) return null;

  const ownedInput = decodeText(params.get(PARAMS.owned) ?? '') ?? '';

  return {
    paste,
    ownedInput,
    currentVp: readNumber(params, PARAMS.currentVp, 0),
    rankedBattlesPerDay: readNumber(params, PARAMS.rankedBattlesPerDay, 10),
    winRate: readNumber(params, PARAMS.winRate, 50, 0, 100),
    completesDailyMission: readBoolean(params, PARAMS.completesDailyMission, true),
    completesWeeklyMission: readBoolean(params, PARAMS.completesWeeklyMission, false),
    costAssumptions: {
      recruit: readNumber(params, PARAMS.recruit, DEFAULT_COST_ASSUMPTIONS.recruit),
      moveChange: readNumber(params, PARAMS.moveChange, DEFAULT_COST_ASSUMPTIONS.moveChange),
      nature: readNumber(params, PARAMS.nature, DEFAULT_COST_ASSUMPTIONS.nature),
      ability: readNumber(params, PARAMS.ability, DEFAULT_COST_ASSUMPTIONS.ability),
      statsEstimate: readNumber(params, PARAMS.statsEstimate, DEFAULT_COST_ASSUMPTIONS.statsEstimate)
    }
  };
}

function readNumber(params: URLSearchParams, key: string, fallback: number, min = 0, max = Number.POSITIVE_INFINITY): number {
  const raw = params.get(key);
  if (raw === null) return fallback;
  return normalizeNumber(Number(raw), min, max);
}

function normalizeNumber(value: number, min = 0, max = Number.POSITIVE_INFINITY): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function readBoolean(params: URLSearchParams, key: string, fallback: boolean): boolean {
  const raw = params.get(key);
  if (raw === null) return fallback;
  return raw === '1' || raw.toLowerCase() === 'true';
}

function encodeText(value: string): string {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeText(value: string): string | null {
  if (!value) return '';
  try {
    if (!/^[A-Za-z0-9_-]+$/.test(value)) return null;
    const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const decoded = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return encodeText(decoded) === value ? decoded : null;
  } catch {
    return null;
  }
}
