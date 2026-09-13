import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readRecord, writeRecord } from '../lib/record-storage';

await test('records accept only integers within the round count', () => {
  for (const value of [null, 'invalid', '-1', '21', '1.5', 'Infinity']) {
    assert.equal(
      readRecord(() => ({ getItem: () => value }), 'record', 20),
      0,
    );
  }
  assert.equal(
    readRecord(() => ({ getItem: () => '17' }), 'record', 20),
    17,
  );
});
await test('blocked storage and quota errors do not interrupt play', () => {
  const denied = () => {
    throw new Error('Storage denied');
  };
  assert.equal(readRecord(denied, 'record', 20), 0);
  assert.doesNotThrow(() => writeRecord(denied, 'record', 10));
  assert.doesNotThrow(() =>
    writeRecord(() => ({ setItem: denied }), 'record', 10),
  );
});
await test('valid records are persisted', () => {
  const saved = new Map<string, string>();
  writeRecord(
    () => ({
      setItem: (key, value) => {
        saved.set(key, value);
      },
    }),
    'record',
    20,
  );
  assert.equal(saved.get('record'), '20');
});
