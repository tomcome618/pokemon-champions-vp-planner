import { describe, expect, it } from 'vitest';
import { feedbackLinks, getSampleTeamById, sampleTeams } from './sampleTeams';
import { parseShowdownPaste } from '../lib/parseShowdown';

const archetypes = sampleTeams.map((team) => team.archetype);

describe('sampleTeams', () => {
  it('ships a broader validation-ready sample library with parseable paste text', () => {
    expect(sampleTeams.length).toBeGreaterThanOrEqual(8);
    expect(archetypes).toContain('Sneasler Offense');
    expect(archetypes).toContain('Rain Core');
    expect(archetypes).toContain('Budget Starter');
    expect(archetypes).toContain('Trick Room');
    expect(archetypes).toContain('Legendary Heavy');
    expect(archetypes).toContain('Tailwind Balance');

    const ids = new Set<string>();
    for (const team of sampleTeams) {
      expect(team.id).toMatch(/^[a-z0-9-]+$/);
      expect(ids.has(team.id)).toBe(false);
      ids.add(team.id);
      expect(team.bestFor.length).toBeGreaterThan(20);
      expect(team.notes.length).toBeGreaterThan(20);
      expect(team.paste).toContain('Ability:');
      expect(parseShowdownPaste(team.paste).length).toBeGreaterThanOrEqual(3);
    }
  });

  it('covers distinct player intents for first-time users', () => {
    const bestForText = sampleTeams.map((team) => team.bestFor).join(' ').toLowerCase();

    expect(bestForText).toContain('limited vp');
    expect(bestForText).toContain('speed control');
    expect(bestForText).toContain('trick room');
    expect(bestForText).toContain('legendary');
  });

  it('finds a sample team by id', () => {
    expect(getSampleTeamById('rain-core')?.archetype).toBe('Rain Core');
    expect(getSampleTeamById('missing-team')).toBeUndefined();
  });

  it('exposes public feedback links for validation', () => {
    expect(feedbackLinks.githubIssues).toBe('https://github.com/tomcome618/pokemon-champions-vp-planner/issues/new');
    expect(feedbackLinks.redditPrompt).toContain('Would this VP plan help');
  });
});
