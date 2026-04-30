import { describe, expect, it } from 'vitest';
import { getCostDataQualityRows, summarizeCostDataQuality } from './costDataQuality';

describe('costDataQuality', () => {
  it('lists the MVP cost categories with transparent confidence statuses and feedback prompts', () => {
    const rows = getCostDataQualityRows();

    expect(rows.map((row) => row.category)).toEqual([
      'Recruitment',
      'Move changes',
      'Nature changes',
      'Ability changes',
      'Stat tuning',
      'Held items / Mega Stones',
      'VP farming income'
    ]);
    expect(rows.find((row) => row.category === 'Recruitment')).toMatchObject({
      status: 'estimated',
      defaultVp: 2500
    });
    expect(rows.find((row) => row.category === 'Held items / Mega Stones')).toMatchObject({
      status: 'unknown',
      defaultVp: null
    });
    expect(rows.every((row) => row.feedbackPrompt.length > 0)).toBe(true);
  });

  it('summarizes confirmed, estimated, and unknown counts for the UI', () => {
    const summary = summarizeCostDataQuality(getCostDataQualityRows());

    expect(summary.confirmed).toBeGreaterThanOrEqual(1);
    expect(summary.estimated).toBeGreaterThanOrEqual(1);
    expect(summary.unknown).toBeGreaterThanOrEqual(1);
    expect(summary.warning).toContain('estimates or missing');
  });
});
