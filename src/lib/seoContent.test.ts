import { describe, expect, it } from 'vitest';
import { getSeoContentSections } from './seoContent';

describe('getSeoContentSections', () => {
  it('returns search-friendly explanation sections for first-time visitors', () => {
    const sections = getSeoContentSections();

    expect(sections).toHaveLength(5);
    expect(sections.map((section) => section.heading)).toEqual([
      'What is Pokémon Champions VP?',
      'How this VP planner works',
      'Best starter teams by VP budget',
      'Why VP costs are estimates',
      'How to report wrong VP data'
    ]);

    for (const section of sections) {
      expect(section.body.length).toBeGreaterThan(120);
      expect(section.body).toMatch(/VP|Pokémon|team|cost|planner/i);
    }
  });

  it('includes community validation and sharing language', () => {
    const body = getSeoContentSections().map((section) => section.body).join(' ');

    expect(body).toContain('shareable link');
    expect(body).toContain('GitHub issue');
    expect(body).toContain('confirmed, estimated, or unknown');
  });
});
