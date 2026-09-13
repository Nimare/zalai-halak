import { readFile, mkdir, stat, writeFile, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as delay } from 'node:timers/promises';

const dataset = JSON.parse(
  await readFile(new URL('../data/fishes.json', import.meta.url), 'utf8'),
);
const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
const fishDirectory = path.join(publicDirectory, 'fish');
await mkdir(fishDirectory, { recursive: true });
let downloaded = 0;
for (const fish of dataset.fishes) {
  const destination = path.resolve(publicDirectory, `.${fish.image}`);
  const relative = path.relative(fishDirectory, destination);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative))
    throw new Error(`Invalid asset path: ${fish.id}`);
  try {
    await stat(destination);
    continue;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  let url = fish.imageDownloadUrl;
  if (!url) {
    const match = /^https:\/\/commons\.wikimedia\.org\/wiki\/File:(.+)$/.exec(
      fish.imageSource,
    );
    if (!match) throw new Error(`No reviewed download URL: ${fish.id}`);
    url = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(decodeURIComponent(match[1]))}?width=1600`;
  }
  const temporaryFile = `${destination}.download`;
  try {
    let complete = false;
    for (const seconds of [0, 5, 15, 30]) {
      if (seconds) await delay(seconds * 1000);
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'ZalaiHalak/2.0 (educational fish identification game)',
        },
        signal: AbortSignal.timeout(60000),
      });
      if (response.status === 429) {
        await response.body?.cancel();
        continue;
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${fish.id}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      const jpeg =
        bytes.length > 3 &&
        bytes.subarray(0, 3).equals(Buffer.from([255, 216, 255]));
      const png =
        bytes.length > 8 &&
        bytes
          .subarray(0, 8)
          .equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
      if (!jpeg && !png) throw new Error(`Unsupported image: ${fish.id}`);
      await writeFile(temporaryFile, bytes);
      await rename(temporaryFile, destination);
      complete = true;
      downloaded++;
      console.log(`Downloaded: ${fish.nameHu}`);
      break;
    }
    if (!complete)
      throw new Error(`Download remained rate-limited: ${fish.id}`);
  } finally {
    await rm(temporaryFile, { force: true });
  }
}
console.log(
  `Images ready; downloaded ${downloaded}, retained ${dataset.fishes.length - downloaded}.`,
);
