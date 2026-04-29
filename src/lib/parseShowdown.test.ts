import { describe, expect, it } from 'vitest';
import { parseShowdownPaste } from './parseShowdown';

const paste = `Sneasler @ White Herb
Ability: Unburden
Tera Type: Fighting
EVs: 252 Atk / 4 SpD / 252 Spe
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
- Knock Off`;

describe('parseShowdownPaste', () => {
  it('parses pokemon name, item, ability, nature, and moves from Showdown paste', () => {
    const team = parseShowdownPaste(paste);

    expect(team).toHaveLength(2);
    expect(team[0]).toEqual({
      name: 'Sneasler',
      item: 'White Herb',
      ability: 'Unburden',
      nature: 'Jolly',
      moves: ['Fake Out', 'Close Combat', 'Dire Claw', 'Protect']
    });
    expect(team[1]).toMatchObject({
      name: 'Incineroar',
      item: 'Sitrus Berry',
      ability: 'Intimidate',
      nature: 'Careful',
      moves: ['Fake Out', 'Parting Shot', 'Flare Blitz', 'Knock Off']
    });
  });

  it('ignores empty blocks and non-move metadata lines', () => {
    const team = parseShowdownPaste(`\n\nGarchomp\nLevel: 50\n- Earthquake\n- Protect\n`);

    expect(team).toEqual([
      {
        name: 'Garchomp',
        item: undefined,
        ability: undefined,
        nature: undefined,
        moves: ['Earthquake', 'Protect']
      }
    ]);
  });
});
