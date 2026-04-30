export type CostDataStatus = 'confirmed' | 'estimated' | 'unknown';

export type CostDataQualityRow = {
  category: string;
  status: CostDataStatus;
  defaultVp: number | null;
  sourceNote: string;
  feedbackPrompt: string;
};

export type CostDataQualitySummary = {
  confirmed: number;
  estimated: number;
  unknown: number;
  warning: string;
};

export function getCostDataQualityRows(): CostDataQualityRow[] {
  return [
    {
      category: 'Recruitment',
      status: 'estimated',
      defaultVp: 2500,
      sourceNote: 'Seeded from public guide/community reports; still needs player confirmation across all Pokémon.',
      feedbackPrompt: 'Tell us if permanent recruitment is not 2,500 VP for your case.'
    },
    {
      category: 'Move changes',
      status: 'estimated',
      defaultVp: 250,
      sourceNote: 'Used as a conservative MVP estimate for each move slot changed.',
      feedbackPrompt: 'Report the exact move training price if your in-game value differs.'
    },
    {
      category: 'Nature changes',
      status: 'estimated',
      defaultVp: 500,
      sourceNote: 'Modeled as one nature optimization cost when a nature appears in the paste.',
      feedbackPrompt: 'Report whether nature changes are cheaper, more expensive, or ticket-based.'
    },
    {
      category: 'Ability changes',
      status: 'estimated',
      defaultVp: 500,
      sourceNote: 'Modeled as one ability setup cost when an ability appears in the paste.',
      feedbackPrompt: 'Report ability capsule/patch style differences or Pokémon-specific exceptions.'
    },
    {
      category: 'Stat tuning',
      status: 'estimated',
      defaultVp: 200,
      sourceNote: 'Flat placeholder for stat investment tuning because exact per-spread costs are incomplete.',
      feedbackPrompt: 'Share screenshots or numbers for stat training costs by spread.'
    },
    {
      category: 'Held items / Mega Stones',
      status: 'unknown',
      defaultVp: null,
      sourceNote: 'Not yet priced in the MVP, so item and Mega Stone costs are currently excluded.',
      feedbackPrompt: 'This is the biggest missing data area: report item or Mega Stone VP prices.'
    },
    {
      category: 'VP farming income',
      status: 'confirmed',
      defaultVp: null,
      sourceNote: 'Daily, weekly, and ranked win/loss values are based on public guide data used for the planner.',
      feedbackPrompt: 'Report if daily/weekly/ranked VP rewards changed after an update.'
    }
  ];
}

export function summarizeCostDataQuality(rows: CostDataQualityRow[]): CostDataQualitySummary {
  const counts = rows.reduce(
    (acc, row) => ({
      ...acc,
      [row.status]: acc[row.status] + 1
    }),
    { confirmed: 0, estimated: 0, unknown: 0 } as Record<CostDataStatus, number>
  );

  return {
    confirmed: counts.confirmed,
    estimated: counts.estimated,
    unknown: counts.unknown,
    warning: `${counts.estimated + counts.unknown} cost categories are estimates or missing. Treat totals as planning guidance, not final official data.`
  };
}
