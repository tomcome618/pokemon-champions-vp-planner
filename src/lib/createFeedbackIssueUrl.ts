export type FeedbackIssueUrlInput = {
  baseUrl: string;
  report: string;
  shareLink: string;
  parsedPokemonCount: number;
  totalCost: number;
};

export function createFeedbackIssueUrl(input: FeedbackIssueUrlInput): string {
  const params = new URLSearchParams();
  const pokemonLabel = input.parsedPokemonCount === 1 ? 'Pokemon' : 'Pokemon';
  params.set(
    'title',
    `VP data feedback: ${input.parsedPokemonCount} ${pokemonLabel} / ${input.totalCost.toLocaleString()} VP estimate`
  );
  params.set('labels', 'vp-data,feedback');
  params.set('body', buildIssueBody(input));

  return `${input.baseUrl}?${params.toString()}`;
}

function buildIssueBody(input: FeedbackIssueUrlInput): string {
  const contextRows = [
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
