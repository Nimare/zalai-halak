# Zalai halak

A simple Hungarian-language website for **Zalai halak**, a festival taking place
in **March 2027**. The site includes festival information and an interactive
fish-identification game.

Built with React, TypeScript, vinext, Vite and Tailwind CSS, with Cloudflare Workers
providing the runtime.

## Get started

Use Node.js 22.13 or newer and the project's pinned package manager, pnpm 12.4.1:

```sh
npm install --global pnpm@12.4.1
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by the development server.

## Build and preview

```sh
pnpm build
pnpm start
```

The production preview runs locally at `http://localhost:8787`. To select another
port, use `pnpm start --port 8790`.

## Test

```sh
pnpm check
```

This runs linting, TypeScript checks, fish-data and storage tests, and formatting
checks. Use `pnpm format` to apply formatting.

For desktop and mobile browser tests:

```sh
pnpm build
pnpm exec playwright install --with-deps chromium
pnpm test:e2e
```

Playwright starts its own preview on port 8791. Installing browser dependencies
on Linux may require sudo. GitHub Actions runs checks, builds and browser tests
on Linux and Windows with Node.js 22 and 24.

## Deploy

The project uses the connected Sites publishing service. After checks and the
production build pass, push the intended source state to the Sites repository,
save that version in the service, then deploy it and verify the deployment status.
Preserve the existing project configuration in `.openai/hosting.json`.

A GitHub push runs CI but does not publish the site; `pnpm start` only previews it
locally. See the [existing publishing notes](README.md#publishing) for the site's
public address and further context.

## Project layout

- `app/`: pages and application styles.
- `components/`: shared interface components.
- `data/`: fish data and supporting documentation.
- `public/`: static assets, including fish images.
- `scripts/` and `tests/`: tooling, validation and browser tests.

Keep secrets in ignored environment files. See the [detailed setup guide](README.md)
for platform notes and [CHECKLIST.md](CHECKLIST.md) for maintenance status.
