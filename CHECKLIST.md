# Cross-platform maintenance checklist

- [x] Run data validation with a portable TypeScript runner.
- [x] Replace the PowerShell-only image downloader with Node (keep Windows wrapper).
- [x] Make preview runtime settings portable and project-local.
- [x] Handle unavailable or corrupt browser record storage.
- [x] Resolve lint failures, documenting justified component/framework exceptions.
- [x] Apply formatting and provide a format check.
- [x] Link the existing SVG favicon in page metadata.
- [x] Document setup and pin the package manager.
- [x] Add Linux and Windows CI checks.
- [x] Verify lint, types, data, build and local HTTP behavior on Linux.
- [x] Run the added desktop/mobile browser regression suite successfully.
  - All 8 tests pass on Linux, including navigation between all three pages.
- [x] Restore standard anchors to avoid the pinned vinext production build’s failing client-side link prefetch.
- [ ] Confirm Windows CI results on an actual Windows runner.
  - Workflow added for Linux/Windows with Node 22/24; no remote CI run has been triggered.

Publication access was confirmed during the audit. No deployment is part of this checklist until the fixes are validated.

## Verification notes

`pnpm install --frozen-lockfile`, `pnpm check`, `pnpm images:download` and the production build pass on Linux. All 59 existing fish images were retained. The updated Node preview launcher passed 65 HTTP checks covering all pages, fish images, the poster, favicon and a missing route. After system dependencies were installed and the navigation regression was fixed, all 8 browser tests passed (9.2 seconds). The navigation test also checks vinext console errors.
