import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fishFacts } from '../data/fish-facts.ts';
import { fishPool, buildRounds, buildOptions, acceptsAnswer, beginnerConfusionGroups, beginnerDistractorWeight } from '../lib/game-rules.ts';

const data = JSON.parse(fs.readFileSync(new URL('../data/fishes.json', import.meta.url), 'utf8'));
const fishes = data.fishes;
const [header, ...lines] = fs.readFileSync(new URL('../data/species-table.tsv', import.meta.url), 'utf8').trim().split(/\r?\n/);
const fields = header.split('\t');
assert.equal(lines.length, 58);
assert.equal(fishes.length, 59);
assert.equal(new Set(fishes.map(f => f.id)).size, fishes.length);
assert.equal(new Set(fishes.map(f => f.image)).size, fishes.length);
for (const line of lines) {
  const row = Object.fromEntries(line.split('\t').map((v, i) => [fields[i], v]));
  const fish = fishes.find(f => f.number === Number(row.number));
  assert.ok(fish, `Missing table entry ${row.number}`);
  for (const [field, value] of Object.entries(row)) assert.equal(String(fish[field]), value, `${fish.id}: ${field}`);
}
for (const fish of fishes) {
  for (const field of ['origin', 'protection', 'occurrence', 'localHabitat', 'maxSize', 'category', 'tableSource', 'factSource', 'imageSource', 'author', 'license', 'licenseUrl']) {
    assert.ok(fish[field], `${fish.id}: missing ${field}`);
  }
  assert.ok(fishFacts[fish.id]?.identification, `${fish.id}: missing recognition text`);
  assert.ok(['kezdő', 'szakértő'].includes(fish.category));
  assert.ok(data.originLegend[fish.origin]);
  for (const field of ['factSource', 'imageSource', 'licenseUrl']) assert.ok(['https:', 'http:'].includes(new URL(fish[field]).protocol));
  const bytes = fs.readFileSync(new URL(`../public${fish.image}`, import.meta.url));
  assert.ok(['ffd8ff', '89504e'].includes(bytes.subarray(0, 3).toString('hex')), `${fish.id}: invalid image`);
  assert.ok(bytes.length > 1000);
}
assert.equal(fishPool(fishes, 'beginner').length, 36);
assert.equal(fishPool(fishes, 'expert').length, 59);
assert.equal(fishes.find(f => f.id === 'nyurgaponty').category, 'szakértő');
for (let run = 0; run < 25; run++) {
  const beginner = buildRounds(fishes, 'beginner');
  assert.equal(beginner.length, 20);
  assert.equal(new Set(beginner.map(f => f.id)).size, 20);
  for (const fish of beginner) {
    assert.equal(fish.category, 'kezdő');
    const options = buildOptions(fish, fishes, 'beginner');
    assert.equal(new Set(options).size, 4);
    assert.ok(options.includes(fish.nameHu));
    assert.ok(options.every(name => {
      const option = fishes.find(f => f.nameHu === name);
      return option.category === 'kezdő' || beginnerDistractorWeight(fish.id, option.id) > 1;
    }));
  }
  const expert = buildRounds(fishes, 'expert');
  assert.equal(expert.length, 20);
  assert.equal(new Set(expert.map(f => f.id)).size, 20);
  assert.ok(expert.every(f => fishPool(fishes, 'expert').some(entry => entry.id === f.id)));
}
for (const group of beginnerConfusionGroups) {
  assert.ok(group.weight > 1);
  assert.ok(group.ids.length >= 2);
  assert.equal(new Set(group.ids).size, group.ids.length);
  for (const id of group.ids) assert.ok(fishes.some(f => f.id === id), `Unknown confusion-group ID: ${id}`);
}
const karika = fishes.find(f => f.id === 'karikakeszeg');
const relatedKeszegIds = ['deverkeszeg', 'laposkeszeg', 'bagolykeszeg', 'szilvaorru-keszeg', 'vorosszarnyu-keszeg', 'jaszkeszeg'];
for (const id of relatedKeszegIds) {
  assert.ok(beginnerDistractorWeight(karika.id, id) > beginnerDistractorWeight(karika.id, 'csuka'));
  assert.equal(beginnerDistractorWeight(karika.id, id), beginnerDistractorWeight(id, karika.id));
}
// Reproducible distribution check: verify the actual sampler, not just weights.
const originalRandom = Math.random;
let seed = 20260911;
try {
  Math.random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const counts = new Map();
  const correctPositions = [0, 0, 0, 0];
  const runs = 12000;
  for (let run = 0; run < runs; run++) {
    const options = buildOptions(karika, fishes, 'beginner');
    assert.equal(new Set(options).size, 4);
    correctPositions[options.indexOf(karika.nameHu)]++;
    for (const name of options) counts.set(name, (counts.get(name) ?? 0) + 1);
  }
  for (const id of relatedKeszegIds) {
    const name = fishes.find(f => f.id === id).nameHu;
    assert.ok(counts.get(name) > counts.get('Csuka') * 2, `${name} should appear substantially more often than Csuka`);
  }
  assert.ok(correctPositions.every(count => count > runs * 0.22 && count < runs * 0.28));
  assert.ok(counts.get('Csuka') > 0, 'Unrelated beginner fish remain possible');
  assert.equal(counts.get('Simatok'), undefined, 'Unrelated expert fish stay excluded');
  console.log('Karikakeszeg distractor inclusion (%):', Object.fromEntries(
    [...relatedKeszegIds, 'csuka'].map(id => {
      const name = fishes.find(f => f.id === id).nameHu;
      return [name, Math.round((counts.get(name) ?? 0) / runs * 1000) / 10];
    }),
  ));
  // Exercise every fish, including groups currently containing only expert fish.
  for (const fish of fishes) {
    for (let run = 0; run < 100; run++) {
      const options = buildOptions(fish, fishes, 'beginner');
      assert.equal(new Set(options).size, 4);
      assert.ok(options.includes(fish.nameHu));
      assert.ok(options.every(name => {
        const option = fishes.find(f => f.nameHu === name);
        return option.id === fish.id || option.category === 'kezdő' || beginnerDistractorWeight(fish.id, option.id) > 1;
      }));
    }
  }
  for (const random of [0, 1 - Number.EPSILON]) {
    Math.random = () => random;
    assert.equal(new Set(buildOptions(karika, fishes, 'beginner')).size, 4);
    assert.deepEqual(buildOptions(karika, [], 'beginner'), [karika.nameHu]);
    const tinyPool = fishes.filter(f => ['karikakeszeg', 'deverkeszeg', 'csuka'].includes(f.id));
    assert.deepEqual(new Set(buildOptions(karika, tinyPool, 'beginner')), new Set(tinyPool.map(f => f.nameHu)));
  }
} finally {
  Math.random = originalRandom;
}
for (const fish of fishes) {
  for (const answer of [fish.nameHu, ...(fish.alsoKnownAsHu ?? [])]) assert.ok(acceptsAnswer(answer, fish, fishes));
  assert.equal(acceptsAnswer('', fish, fishes), false);
  for (const other of fishes.filter(f => f.id !== fish.id)) assert.equal(acceptsAnswer(other.nameHu, fish, fishes), false, `${other.nameHu} incorrectly accepted for ${fish.nameHu}`);
}
assert.ok(acceptsAnswer('  vorosszarnyu keszeg ', fishes.find(f => f.id === 'vorosszarnyu-keszeg'), fishes));
assert.ok(acceptsAnswer('szivarvanyos okel', fishes.find(f => f.id === 'szivarvanyos-okle'), fishes));
console.log('Rendben: 58 táblázatsor + nyurgaponty, 59 kép és felismerési leírás; kezdő/szakértő szűrés, válaszlehetőségek, névváltozatok.');
