import type { CostDataQualityRow } from './costDataQuality';

export type FeedbackIssueUrlInput = {
  baseUrl: string;
  report: string;
  shareLink: string;
  parsedPokemonCount: number;
  totalCost: number;
  category?: CostDataQualityRow;
};

export function createFeedbackIssueUrl(input: FeedbackIssueUrlInput): string {
  const params = new URLSearchParams();
  const pokemonLabel = input.parsedPokemonCount === 1 ? 'Pokemon' : 'Pokemon';
  params.set(
    'title',
    input.category
      ? `VP data feedback: ${input.category.category}`
      : `VP data feedback: ${input.parsedPokemonCount} ${pokemonLabel} / ${input.totalCost.toLocaleString()} VP estimate`
  );
  params.set('labels', 'vp-data,feedback');
  params.set('body', buildIssueBody(input));

  return `${input.baseUrl}?${params.toString()}`;
}

function buildIssueBody(input: FeedbackIssueUrlInput): string {
  const categoryRows = input.category
    ? [
        '## Cost category',
        '',
        `Category: ${input.category.category}`,
        `Status: ${input.category.status}`,
        `Current default VP: ${input.category.defaultVp === null ? 'not priced yet' : input.category.defaultVp.toLocaleString()}`,
        `Source note: ${input.category.sourceNote}`,
        `Feedback prompt: ${input.category.feedbackPrompt}`,
        ''
      ]
    : [];

  const contextRows = [
    ...categoryRows,
    '## What looks wrong?',
    '',
    '- [ ] Recruitment cost',
    '- [ ] Move cost',
    '- [ ] Nature cost',
    '- [ ] Ability cost',
    '- [ ] Stat training estimate',
    '- [ ] Item / Mega Stone pricing',
    '- [ ] Timeline / farming assumptions',
    '',
    'Paste any screenshots or corrected VP values here.',
    '',
    '## Planner context',
    '',
    input.shareLink ? `Share link: ${input.shareLink}` : 'Share link: not provided',
    '',
    '```text',
    input.report.trim() || 'No report copied yet.',
    '```'
  ];

  return contextRows.join('\n');
}
