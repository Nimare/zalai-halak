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

export function fishPool<T extends GameFish>(
  fishes: readonly T[],
  mode: Mode,
): T[] {
  return fishes.filter(
    (fish) =>
      fish.category === 'kezdő' ||
      (mode === 'expert' && fish.category === 'szakértő'),
  );
}

export function buildRounds<T extends GameFish>(
  fishes: readonly T[],
  mode: Mode,
): T[] {
  const pool = fishPool(fishes, mode);
  return shuffle(pool).slice(0, 20);
}

// Quiz confusion groups, not a taxonomic classification. IDs keep these stable
// when display names change. Overlapping groups use the strongest weight.
export const beginnerConfusionGroups: readonly {
  weight: number;
  ids: readonly string[];
}[] = [
  {
    weight: 8,
    ids: ['karikakeszeg', 'deverkeszeg', 'laposkeszeg', 'bagolykeszeg'],
  },
  {
    weight: 4,
    ids: [
      'karikakeszeg',
      'deverkeszeg',
      'laposkeszeg',
      'bagolykeszeg',
      'szilvaorru-keszeg',
      'vorosszarnyu-keszeg',
      'jaszkeszeg',
      'bodorka',
    ],
  },
  { weight: 8, ids: ['bodorka', 'vorosszarnyu-keszeg', 'leanykoncer'] },
  { weight: 8, ids: ['domolyko', 'nyuldomolyko', 'jaszkeszeg'] },
  {
    weight: 4,
    ids: ['domolyko', 'nyuldomolyko', 'jaszkeszeg', 'balin', 'amur'],
  },
  { weight: 8, ids: ['kusz', 'sujtasos-kusz'] },
  {
    weight: 4,
    ids: [
      'kusz',
      'sujtasos-kusz',
      'kurta-baing',
      'furge-cselle',
      'razbora',
      'szivarvanyos-okle',
    ],
  },
  { weight: 4, ids: ['kusz', 'garda', 'balin'] },
  { weight: 8, ids: ['szeles-karasz', 'ezustkarasz'] },
  { weight: 8, ids: ['ponty', 'nyurgaponty'] },
  {
    weight: 4,
    ids: ['ponty', 'nyurgaponty', 'szeles-karasz', 'ezustkarasz', 'compo'],
  },
  {
    weight: 8,
    ids: [
      'fenekjaro-kullo',
      'halvanyfoltu-kullo',
      'homoki-kullo',
      'felpillanto-kullo',
    ],
  },
  {
    weight: 4,
    ids: [
      'marna',
      'fenekjaro-kullo',
      'halvanyfoltu-kullo',
      'homoki-kullo',
      'felpillanto-kullo',
    ],
  },
  { weight: 8, ids: ['feher-busa', 'pettyes-busa', 'busa-hibrid'] },
  { weight: 8, ids: ['vagocsik', 'torpecsik', 'reticsik', 'kovicsik'] },
  { weight: 8, ids: ['harcsa', 'torpeharcsa', 'fekete-torpeharcsa'] },
  {
    weight: 4,
    ids: ['harcsa', 'torpeharcsa', 'fekete-torpeharcsa', 'menyhal'],
  },
  { weight: 8, ids: ['sullo', 'kosullo'] },
  {
    weight: 4,
    ids: [
      'csaposuger',
      'sullo',
      'kosullo',
      'vagodurbincs',
      'szeles-durbincs',
      'selymes-durbincs',
    ],
  },
  { weight: 8, ids: ['vagodurbincs', 'szeles-durbincs', 'selymes-durbincs'] },
  { weight: 8, ids: ['folyami-geb', 'amurgeb'] },
  { weight: 4, ids: ['folyami-geb', 'amurgeb', 'botos-kolonte', 'lapi-poc'] },
  { weight: 8, ids: ['kecsege', 'simatok'] },
  { weight: 8, ids: ['paduc', 'szilvaorru-keszeg'] },
];

export function beginnerDistractorWeight(
  fishId: string,
  candidateId: string,
): number {
  let weight = 1;
  for (const group of beginnerConfusionGroups) {
    if (group.ids.includes(fishId) && group.ids.includes(candidateId)) {
      weight = Math.max(weight, group.weight);
    }
  }
  return weight;
}

export function buildOptions<T extends GameFish>(
  fish: T,
  fishes: readonly T[],
  mode: Mode,
): string[] {
  if (mode !== 'beginner') {
    const distractors = shuffle(
      fishPool(fishes, mode).filter((entry) => entry.id !== fish.id),
    ).slice(0, 3);
    return shuffle([fish, ...distractors]).map((entry) => entry.nameHu);
  }

  const candidates = fishPool(fishes, 'expert')
    .filter((entry) => entry.id !== fish.id)
    .map((entry) => ({
      entry,
      weight: beginnerDistractorWeight(fish.id, entry.id),
    }))
    // Expert names enter beginner choices only when connected to the pictured fish.
    .filter(({ entry, weight }) => entry.category === 'kezdő' || weight > 1);
  const distractors: T[] = [];
  while (distractors.length < 3 && candidates.length > 0) {
    let ticket =
      Math.random() *
      candidates.reduce((sum, candidate) => sum + candidate.weight, 0);
    let selectedIndex = candidates.length - 1;
    for (let index = 0; index < candidates.length; index += 1) {
      ticket -= candidates[index].weight;
      if (ticket < 0) {
        selectedIndex = index;
        break;
      }
    }
    // Remove each draw so the three distractors are always distinct.
    distractors.push(candidates.splice(selectedIndex, 1)[0].entry);
  }
  return shuffle([fish, ...distractors]).map((entry) => entry.nameHu);
}

export function normalizeAnswer(value: string) {
  return value
    .trim()
    .toLocaleLowerCase('hu-HU')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function editDistance(left: string, right: string) {
  const previous = Array.from(
    { length: right.length + 1 },
    (_, index) => index,
  );
  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    let diagonal = previous[0];
    previous[0] = leftIndex;
    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const above = previous[rightIndex];
      const cost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      previous[rightIndex] = Math.min(
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + 1,
        diagonal + cost,
      );
      diagonal = above;
    }
  }
  return previous[right.length];
}

export function acceptsAnswer(
  answer: string,
  fish: GameFish,
  fishes: readonly GameFish[],
) {
  const candidate = normalizeAnswer(answer);
  if (!candidate) return false;
  const names = (entry: GameFish) =>
    [entry.nameHu, ...(entry.alsoKnownAsHu ?? [])].map(normalizeAnswer);
  const accepted = names(fish);
  if (accepted.includes(candidate)) return true;
  // An exact name of a different fish is never an acceptable typo.
  if (
    fishes.some(
      (entry) => entry.id !== fish.id && names(entry).includes(candidate),
    )
  )
    return false;
  return accepted.some(
    (name) => editDistance(candidate, name) <= (name.length >= 12 ? 2 : 1),
  );
}
