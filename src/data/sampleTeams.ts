export type SampleTeam = {
  id: string;
  archetype: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  bestFor: string;
  notes: string;
  paste: string;
};

export const sampleTeams: SampleTeam[] = [
  {
    id: 'sneasler-offense',
    archetype: 'Sneasler Offense',
    title: 'Sneasler + Incineroar tempo offense',
    difficulty: 'Intermediate',
    bestFor: 'Players who want immediate Fake Out pressure and fast games.',
    notes: 'Build Sneasler first, then Incineroar. The remaining slots are flexible attackers/supports.',
    paste: `Sneasler @ White Herb
Ability: Unburden
Jolly Nature
- Fake Out
- Close Combat
- Dire Claw
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Careful Nature
- Fake Out
- Parting Shot
- Flare Blitz
- Knock Off

Garchomp @ Clear Amulet
Ability: Rough Skin
Jolly Nature
- Earthquake
- Dragon Claw
- Rock Slide
- Protect

Pelipper @ Focus Sash
Ability: Drizzle
Timid Nature
- Tailwind
- Hurricane
- Weather Ball
- Protect`
  },
  {
    id: 'rain-core',
    archetype: 'Rain Core',
    title: 'Pelipper rain with fast special pressure',
    difficulty: 'Beginner',
    bestFor: 'Players who want a simple speed-control plan: set rain, Tailwind, attack.',
    notes: 'Prioritize Pelipper before rain abusers because Drizzle enables the whole plan.',
    paste: `Pelipper @ Focus Sash
Ability: Drizzle
Timid Nature
- Tailwind
- Hurricane
- Weather Ball
- Protect

Kingdra @ Mystic Water
Ability: Swift Swim
Modest Nature
- Muddy Water
- Draco Meteor
- Ice Beam
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Careful Nature
- Fake Out
- Parting Shot
- Flare Blitz
- Knock Off

Amoonguss @ Rocky Helmet
Ability: Regenerator
Bold Nature
- Spore
- Rage Powder
- Pollen Puff
- Protect`
  },
  {
    id: 'fake-out-balance',
    archetype: 'Fake Out Balance',
    title: 'Double Fake Out balance starter',
    difficulty: 'Beginner',
    bestFor: 'Players learning turns, pivots, and safe setup windows.',
    notes: 'Build the Fake Out users first because they make every later upgrade easier to pilot.',
    paste: `Incineroar @ Sitrus Berry
Ability: Intimidate
Careful Nature
- Fake Out
- Parting Shot
- Flare Blitz
- Knock Off

Sneasler @ White Herb
Ability: Unburden
Jolly Nature
- Fake Out
- Close Combat
- Dire Claw
- Protect

Amoonguss @ Rocky Helmet
Ability: Regenerator
Bold Nature
- Spore
- Rage Powder
- Pollen Puff
- Protect

Garchomp @ Clear Amulet
Ability: Rough Skin
Jolly Nature
- Earthquake
- Dragon Claw
- Rock Slide
- Protect`
  },
  {
    id: 'sun-core',
    archetype: 'Sun Core',
    title: 'Sun pressure with Fire/Grass offense',
    difficulty: 'Intermediate',
    bestFor: 'Players who like proactive weather control and explosive damage turns.',
    notes: 'Weather setter comes first; then build the strongest sun abuser available to you.',
    paste: `Ninetales @ Heat Rock
Ability: Drought
Timid Nature
- Heat Wave
- Solar Beam
- Will-O-Wisp
- Protect

Venusaur @ Life Orb
Ability: Chlorophyll
Modest Nature
- Sludge Bomb
- Giga Drain
- Earth Power
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Careful Nature
- Fake Out
- Parting Shot
- Flare Blitz
- Knock Off

Garchomp @ Clear Amulet
Ability: Rough Skin
Jolly Nature
- Earthquake
- Dragon Claw
- Rock Slide
- Protect`
  },
  {
    id: 'budget-starter',
    archetype: 'Budget Starter',
    title: 'Low-complexity starter team',
    difficulty: 'Beginner',
    bestFor: 'Players with limited VP who need a playable ladder team before optimizing details.',
    notes: 'If VP is tight, build three reliable Pokémon first and delay non-core nature/move polish.',
    paste: `Garchomp @ Clear Amulet
Ability: Rough Skin
Jolly Nature
- Earthquake
- Dragon Claw
- Rock Slide
- Protect

Pelipper @ Focus Sash
Ability: Drizzle
Timid Nature
- Tailwind
- Hurricane
- Weather Ball
- Protect

Amoonguss @ Rocky Helmet
Ability: Regenerator
Bold Nature
- Spore
- Rage Powder
- Pollen Puff
- Protect`
  }
];

export const feedbackLinks = {
  githubIssues: 'https://github.com/tomcome618/pokemon-champions-vp-planner/issues/new',
  redditPrompt: 'Would this VP plan help you decide what to spend VP on? What cost data is wrong or missing?'
};

export function getSampleTeamById(id: string) {
  return sampleTeams.find((team) => team.id === id);
}
