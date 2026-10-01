import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { getQuizResult } from '../lib/quiz-results';
import type { Mode } from '../lib/game-rules';

const ranges: [Mode, number, number, string, number][] = [
  ['beginner', 0, 10, 'Lápi póc', 1],
  ['beginner', 11, 15, 'Folyami géb', 2],
  ['beginner', 16, 20, 'Ponty', 3],
  ['expert', 0, 4, 'Lápi póc', 1],
  ['expert', 5, 8, 'Folyami géb', 2],
  ['expert', 9, 12, 'Ponty', 3],
  ['expert', 13, 16, 'Sügér', 4],
  ['expert', 17, 20, 'Csuka', 5],
];

for (const [mode, minimum, maximum, name, level] of ranges) {
  await test(`${mode}: ${minimum}–${maximum} points gives ${name}`, () => {
    for (let score = minimum; score <= maximum; score++) {
      const result = getQuizResult(mode, score);
      assert.equal(result.name, name, `${mode}, ${score} points`);
      assert.equal(result.level, level);
      assert.ok(result.description.length > 0);
      assert.ok(result.description.every((paragraph) => paragraph.length > 0));
      const bytes = fs.readFileSync(
        new URL(`../public${result.image}`, import.meta.url),
      );
      assert.equal(bytes.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
    }
  });
}
