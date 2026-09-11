export type Mode = 'beginner' | 'expert';
export type GameFish = {
  id: string;
  nameHu: string;
  category: string;
  alsoKnownAsHu?: string[];
};

export function shuffle<T>(items: readonly T[]) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[randomIndex]] = [result[randomIndex], result[index]];
  }
  return result;
}

export function fishPool<T extends GameFish>(fishes: readonly T[], mode: Mode): T[] {
  return fishes.filter(fish => fish.category === 'kezdő' || (mode === 'expert' && fish.category === 'szakértő'));
}

export function buildRounds<T extends GameFish>(fishes: readonly T[], mode: Mode): T[] {
  const pool = fishPool(fishes, mode);
  return shuffle(pool).slice(0, 20);
}

export function buildOptions<T extends GameFish>(fish: T, fishes: readonly T[], mode: Mode): string[] {
  const distractors = shuffle(fishPool(fishes, mode).filter(entry => entry.id !== fish.id)).slice(0, 3);
  return shuffle([fish, ...distractors]).map(entry => entry.nameHu);
}

export function normalizeAnswer(value: string) {
  return value.trim().toLocaleLowerCase('hu-HU').normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
}

function editDistance(left: string, right: string) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = previous[0];
    previous[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const above = previous[rightIndex];
      const cost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      previous[rightIndex] = Math.min(previous[rightIndex] + 1, previous[rightIndex - 1] + 1, diagonal + cost);
      diagonal = above;
    }
  }
  return previous[right.length];
}

export function acceptsAnswer(answer: string, fish: GameFish, fishes: readonly GameFish[]) {
  const candidate = normalizeAnswer(answer);
  if (!candidate) return false;
  const names = (entry: GameFish) => [entry.nameHu, ...(entry.alsoKnownAsHu ?? [])].map(normalizeAnswer);
  const accepted = names(fish);
  if (accepted.includes(candidate)) return true;
  // An exact name of a different fish is never an acceptable typo.
  if (fishes.some(entry => entry.id !== fish.id && names(entry).includes(candidate))) return false;
  return accepted.some(name => editDistance(candidate, name) <= (name.length >= 12 ? 2 : 1));
}
