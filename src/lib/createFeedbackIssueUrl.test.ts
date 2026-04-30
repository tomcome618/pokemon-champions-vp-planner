import { describe, expect, it } from 'vitest';
import { createFeedbackIssueUrl } from './createFeedbackIssueUrl';

const baseUrl = 'https://github.com/tomcome618/pokemon-champions-vp-planner/issues/new';

describe('createFeedbackIssueUrl', () => {
  it('creates a prefilled GitHub issue URL with report and share link context', () => {
    const url = createFeedbackIssueUrl({
      baseUrl,
      report: 'Pokemon Champions Team VP Plan\n\nTotal cost: 18,800 VP',
      shareLink: 'https://tomcome618.github.io/pokemon-champions-vp-planner/?team=abc',
      parsedPokemonCount: 4,
      totalCost: 18800
    });

    expect(url.startsWith(`${baseUrl}?`)).toBe(true);
    const parsed = new URL(url);
    expect(parsed.searchParams.get('title')).toBe('VP data feedback: 4 Pokemon / 18,800 VP estimate');
    expect(parsed.searchParams.get('labels')).toBe('vp-data,feedback');
    expect(parsed.searchParams.get('body')).toContain('Share link: https://tomcome618.github.io/pokemon-champions-vp-planner/?team=abc');
    expect(parsed.searchParams.get('body')).toContain('Total cost: 18,800 VP');
    expect(parsed.searchParams.get('body')).toContain('What looks wrong?');
  });

  it('keeps the feedback URL valid when report or share link are empty', () => {
    const url = createFeedbackIssueUrl({
      baseUrl,
      report: '',
      shareLink: '',
      parsedPokemonCount: 0,
      totalCost: 0
    });

    const parsed = new URL(url);
    expect(parsed.searchParams.get('title')).toBe('VP data feedback: 0 Pokemon / 0 VP estimate');
    expect(parsed.searchParams.get('body')).toContain('Paste any screenshots or corrected VP values here.');
  });
});
