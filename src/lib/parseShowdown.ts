import type { ParsedPokemon } from './types';

const METADATA_PREFIXES = ['Ability:', 'Tera Type:', 'EVs:', 'IVs:', 'Level:', 'Shiny:', 'Gender:'];

export function parseShowdownPaste(paste: string): ParsedPokemon[] {
  return paste
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map(parsePokemonBlock)
    .filter((pokemon): pokemon is ParsedPokemon => Boolean(pokemon.name));
}

function parsePokemonBlock(block: string): ParsedPokemon {
  const lines = block
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const firstLine = lines[0] ?? '';
  const [rawName, rawItem] = firstLine.split(' @ ');
  const pokemon: ParsedPokemon = {
    name: rawName.trim(),
    item: rawItem?.trim(),
    moves: []
  };

  for (const line of lines.slice(1)) {
    if (line.startsWith('- ')) {
      pokemon.moves.push(line.slice(2).trim());
      continue;
    }

    if (line.startsWith('Ability:')) {
      pokemon.ability = line.replace('Ability:', '').trim();
      continue;
    }

    if (line.endsWith(' Nature')) {
      pokemon.nature = line.replace(' Nature', '').trim();
      continue;
    }

    if (METADATA_PREFIXES.some((prefix) => line.startsWith(prefix))) {
      continue;
    }
  }

  return pokemon;
}
