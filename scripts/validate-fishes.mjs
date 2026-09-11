import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fishFacts } from '../data/fish-facts.ts';
import { fishPool, buildRounds, buildOptions, acceptsAnswer } from '../lib/game-rules.ts';

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
    assert.ok(options.every(name => fishes.find(f => f.nameHu === name).category === 'kezdő'));
  }
  assert.deepEqual(new Set(buildRounds(fishes, 'expert').map(f => f.id)), new Set(fishes.map(f => f.id)));
}
for (const fish of fishes) {
  for (const answer of [fish.nameHu, ...(fish.alsoKnownAsHu ?? [])]) assert.ok(acceptsAnswer(answer, fish, fishes));
  assert.equal(acceptsAnswer('', fish, fishes), false);
  for (const other of fishes.filter(f => f.id !== fish.id)) assert.equal(acceptsAnswer(other.nameHu, fish, fishes), false, `${other.nameHu} incorrectly accepted for ${fish.nameHu}`);
}
assert.ok(acceptsAnswer('  vorosszarnyu keszeg ', fishes.find(f => f.id === 'vorosszarnyu-keszeg'), fishes));
assert.ok(acceptsAnswer('szivarvanyos okel', fishes.find(f => f.id === 'szivarvanyos-okle'), fishes));
console.log('Rendben: 58 táblázatsor + nyurgaponty, 59 kép és felismerési leírás; kezdő/szakértő szűrés, válaszlehetőségek, névváltozatok.');
