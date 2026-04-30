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
  },
  {
    id: 'tailwind-balance',
    archetype: 'Tailwind Balance',
    title: 'Whimsicott speed control into safe attackers',
    difficulty: 'Beginner',
    bestFor: 'Players who want clear speed control, flexible leads, and forgiving game plans while learning matchups.',
    notes: 'Load this when you want a familiar Tailwind shell: lead Whimsicott or Incineroar, then bring two attackers that match the opposing board.',
    paste: `Whimsicott @ Focus Sash
Ability: Prankster
Timid Nature
- Tailwind
- Moonblast
- Encore
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

Gholdengo @ Life Orb
Ability: Good as Gold
Modest Nature
- Make It Rain
- Shadow Ball
- Nasty Plot
- Protect`
  },
  {
    id: 'trick-room',
    archetype: 'Trick Room',
    title: 'Farigiraf + Ursaluna slow-room pressure',
    difficulty: 'Advanced',
    bestFor: 'Players who prefer trick room positioning, slower sweepers, and deliberate setup turns over immediate speed races.',
    notes: 'Build the setter first, then the main slow attacker. This sample is intentionally expensive because wrong natures and abilities matter a lot.',
    paste: `Farigiraf @ Mental Herb
Ability: Armor Tail
Sassy Nature
- Trick Room
- Psychic
- Helping Hand
- Protect

Ursaluna @ Flame Orb
Ability: Guts
Brave Nature
- Facade
- Headlong Rush
- Earthquake
- Protect

Torkoal @ Charcoal
Ability: Drought
Quiet Nature
- Eruption
- Heat Wave
- Earth Power
- Protect

Amoonguss @ Rocky Helmet
Ability: Regenerator
Relaxed Nature
- Spore
- Rage Powder
- Pollen Puff
- Protect`
  },
  {
    id: 'legendary-heavy',
    archetype: 'Legendary Heavy',
    title: 'High-cost restricted-style power core',
    difficulty: 'Advanced',
    bestFor: 'Players chasing a legendary-heavy team and wanting to see how expensive premium recruits and full optimization can become.',
    notes: 'Use this as a stress test for VP budgeting. It is less about being cheap and more about showing the long-term farming timeline.',
    paste: `Miraidon @ Choice Specs
Ability: Hadron Engine
Timid Nature
- Electro Drift
- Draco Meteor
- Volt Switch
- Protect

Koraidon @ Clear Amulet
Ability: Orichalcum Pulse
Jolly Nature
- Collision Course
- Dragon Claw
- Flame Charge
- Protect

Flutter Mane @ Booster Energy
Ability: Protosynthesis
Timid Nature
- Moonblast
- Shadow Ball
- Icy Wind
- Protect

Incineroar @ Sitrus Berry
Ability: Intimidate
Careful Nature
- Fake Out
- Parting Shot
- Flare Blitz
- Knock Off`
  }
];

export const feedbackLinks = {
  githubIssues: 'https://github.com/tomcome618/pokemon-champions-vp-planner/issues/new',
  redditPrompt: 'Would this VP plan help you decide what to spend VP on? What cost data is wrong or missing?'
};

export function getSampleTeamById(id: string) {
  return sampleTeams.find((team) => team.id === id);
}
