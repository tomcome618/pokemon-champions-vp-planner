export type SeoContentSection = {
  heading: string;
  body: string;
};

export function getSeoContentSections(): SeoContentSection[] {
  return [
    {
      heading: 'What is Pokémon Champions VP?',
      body: 'VP is the planning currency players need to think about before committing to a Pokémon Champions team. A team can look ready in a Showdown paste, but the practical question is whether you can afford the recruits, move changes, nature changes, ability setup, and stat tuning needed to make that team playable.'
    },
    {
      heading: 'How this VP planner works',
      body: 'Paste a Showdown-style team or load one of the sample teams, then enter your current VP, owned Pokémon, daily missions, weekly missions, ranked battles, and win rate. The planner parses the Pokémon, estimates remaining team cost, shows missing VP, forecasts days needed, and creates a shareable link so other players can review the exact same plan.'
    },
    {
      heading: 'Best starter teams by VP budget',
      body: 'If your VP budget is tight, start with Budget Starter, Rain Core, or Tailwind Balance because they are easier to understand and usually need fewer expensive pivots. If you already own key Pokémon, the comparison table can make Sneasler Offense, Fake Out Balance, Trick Room, or Legendary Heavy cheaper than they first appear.'
    },
    {
      heading: 'Why VP costs are estimates',
      body: 'Pokémon Champions cost data can change and some categories are still community-sourced. The planner labels major data areas as confirmed, estimated, or unknown so totals are treated as planning guidance, not final official numbers. You can also edit assumptions before sharing a team if your local data differs.'
    },
    {
      heading: 'How to report wrong VP data',
      body: 'When a recruitment, move, nature, ability, stat, item, or Mega Stone value is wrong, use the feedback button to open a prefilled GitHub issue. The issue includes planner context, your shareable link, and the current report so community corrections can be traced back to the team and assumptions that produced the estimate.'
    }
  ];
}
