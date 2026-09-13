import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
// Invoke Node directly: no POSIX env assignments or Windows .cmd spawning.
const child = spawn(
  process.execPath,
  [
    require.resolve('wrangler/bin/wrangler.js'),
    'dev',
    '--config',
    'dist/server/wrangler.json',
    ...process.argv.slice(2),
  ],
  {
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    stdio: 'inherit',
    env: {
      ...process.env,
      WRANGLER_WRITE_LOGS: process.env.WRANGLER_WRITE_LOGS ?? 'false',
      WRANGLER_LOG_PATH: process.env.WRANGLER_LOG_PATH ?? '.wrangler/logs',
      MINIFLARE_REGISTRY_PATH:
        process.env.MINIFLARE_REGISTRY_PATH ?? '.wrangler/registry',
    },
  },
);
child.on('error', (error) => {
  console.error(error);
  process.exitCode = 1;
});
child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
for (const signal of ['SIGINT', 'SIGTERM'])
  process.on(signal, () => child.kill(signal));
