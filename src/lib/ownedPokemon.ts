const normalizeName = (name: string) =>
  name
    .replace(/@.*$/, '')
    .replace(/\([^)]*\)/g, '')
    .trim()
    .toLowerCase();

export function parseOwnedPokemonList(input: string): string[] {
  const seen = new Set<string>();

  return input
    .split(/[\n,]+/)
    .map(normalizeName)
    .filter((name) => name.length > 0)
    .filter((name) => {
      if (seen.has(name)) return false;
      seen.add(name);
      return true;
    });
}

export function isPokemonOwned(name: string, ownedPokemonNames: string[] = []) {
  const normalized = normalizeName(name);
  return ownedPokemonNames.some((ownedName) => normalizeName(ownedName) === normalized);
}
