import { describe, expect, it } from 'vitest';
import { feedbackLinks, getSampleTeamById, sampleTeams } from './sampleTeams';
import { parseShowdownPaste } from '../lib/parseShowdown';

const archetypes = sampleTeams.map((team) => team.archetype);

describe('sampleTeams', () => {
  it('ships multiple validation-ready archetypes with parseable paste text', () => {
    expect(sampleTeams.length).toBeGreaterThanOrEqual(5);
    expect(archetypes).toContain('Sneasler Offense');
    expect(archetypes).toContain('Rain Core');
    expect(archetypes).toContain('Budget Starter');

    for (const team of sampleTeams) {
      expect(team.id).toMatch(/^[a-z0-9-]+$/);
      expect(team.bestFor.length).toBeGreaterThan(0);
      expect(team.paste).toContain('Ability:');
      expect(parseShowdownPaste(team.paste).length).toBeGreaterThanOrEqual(3);
    }
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
