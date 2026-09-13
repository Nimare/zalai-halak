# Zalai halak

Hungarian fish-identification game and festival site, built with React, vinext,
Vite and Cloudflare Workers. See [CHECKLIST.md](CHECKLIST.md) for maintenance status.

## Linux, Windows and macOS setup

Install a standard Node.js 22 LTS (22.13 or newer) or Node.js 24 LTS distribution.
Install the pinned package manager with `npm install --global pnpm@12.4.1`.
Run these commands from the repository root in Bash, PowerShell or Command Prompt:

```text
pnpm install --frozen-lockfile
pnpm dev
```

For a production build and local Workers preview:

```text
pnpm build
pnpm start
```

The preview normally listens at `http://localhost:8787`. `pnpm start --port 8790`
selects another port. Stop it with Ctrl+C. This is a local preview, not a deployment.
Its Node launcher sets Wrangler log and registry paths inside `.wrangler/` on every
platform. Restricted sandboxes still need permission to open local sockets and
inspect network interfaces; changing paths cannot remove those OS restrictions.

Keep the tracked `.openai/hosting.json`: it identifies the existing Sites project.
Use ignored `.env` files for application secrets, never the hosting file.

## Checks and assets

```text
pnpm check
pnpm build
pnpm images:download
```

`check` runs lint, TypeScript, game/data/storage tests and formatting checks.
`pnpm format` applies formatting. Validation uses `tsx`, so it does not depend on
Node's optional built-in TypeScript support. The Node image downloader retains
existing images and downloads only missing reviewed assets. The `.ps1` file is a
compatibility wrapper; PowerShell is not required. Linux and Windows CI run checks
and builds on Node 22 and 24. Do not copy `node_modules` across operating systems;
install from the lockfile on each machine so native tools match the platform.

The component library intentionally uses ARIA roles with generic elements, so
`prefer-tag-over-role` is disabled only for `components/ui`. Other accessibility
rules remain enabled. App images use the existing local assets and explicit sizes;
`next/no-img-element` is disabled for app pages because this Workers setup does not
configure an image optimization service. Internal navigation uses standard anchors: the pinned vinext production build
throws an RSC prefetch error and fails navigation with `next/link`. The app-only
`next/no-html-link-for-pages` exception preserves reliable full-page navigation
on all operating systems.
Two localized React compiler exceptions synchronize browser records and the Embla
instance after mount; neither changes application hook ordering.

## Browser regression checks

After building, run:

```text
pnpm exec playwright install --with-deps chromium
pnpm test:e2e
```

On Linux, the dependency installation may prompt for a sudo password; run it in
an interactive terminal. Windows does not require Linux system packages. The test
suite starts and stops its own preview on port 8791 and covers desktop/mobile
navigation, assets, game completion, storage failures, expert answers and timeouts.
Browser binaries are installed separately on each machine, not committed.

## Publishing

The existing public site is https://zalai-halak-2027.gyorkimilan.chatgpt.site.
Publication uses the connected Sites service, preserving the project ID and public
audience. Push the exact source state to the Sites repository, save that version,
then deploy and verify its status. A GitHub push alone is not a Sites deployment.
The audit confirmed owner access; no publication has been performed for these fixes.
