# Beyond the Jersey — Zidane: France 1998 → 2006

Independent sports-marketing portfolio concept by Mahmoud. No affiliation or endorsement.

## Status

Step 18 implementation follows the requested 14-section sequence, with a quick recruiter route before the full historical story. The opening uses a supplied France 1998 photograph; its photographer credit and reuse rights remain undocumented. Secondary image areas are labeled placeholders. No video assets, tracking scripts, campaign results or invented contact details are presented.

**Production QA verified on 27 September 2026:** build and TypeScript checks passed. The 15 existing browser tests and three added keyboard/image checks passed. Responsive production checks at 1440, 820, 390 and 320 pixels found no overflow, clipped headings or runtime errors. See `qa/STEP-19-PRODUCTION-QA.md` for scope and publication limitations.

## Run locally

With Node.js 20.9+ and npm available:

1. `npm ci`
2. `npm run build`
3. `npm run dev`
4. Open http://127.0.0.1:3000

`npm start` runs the production server after a successful build. Development uses `.next-dev`; production builds use `.next` so a build does not overwrite a running development server's files.

## Verification

- `node scripts/check-source.mjs` — static content and structure checks only.
- `npm run typecheck` — TypeScript verification after installation.
- `npx playwright test` — desktop, mobile, narrow viewport and reduced-motion checks, console/page errors, overflow, interactions and axe accessibility audit.
- `node scripts/step19-production-audit.mjs` — production screenshots and responsive checks on port 3001.

Browser tests are configured for installed Microsoft Edge. They start the development server automatically. For production QA, run `npm start -- --port 3001` and set `QA_BASE_URL=http://127.0.0.1:3001` before running the tests. Automated accessibility checks do not replace manual assistive-technology testing.

## Structure

- `app/page.tsx`: section composition.
- `app/layout.tsx`: metadata and document language.
- `app/globals.css`: Tailwind entry, responsive editorial design and motion preferences.
- `app/refinements.css`: hero hierarchy, era-specific layouts, campaign/social mockups and editorial measurement layout.
- `components/campaign-art.tsx`: shared campaign lockup and nine format compositions.
- `components/experience.tsx`: requested components and shared accessible controls.
- `lib/content.ts`: approved chapter copy, navigation, social storyboards and reflection.
- `tests/experience.spec.ts`: browser QA specification.

## Implemented interactions

Section index; chapter/stage anchors; native dialog previews with Escape and focus restoration; Reel storyboard dialogs; controlled carousel and view-all; source links; shirt and measurement disclosures; native chapter sharing with clipboard fallback.

## Deliberate first-version limits

- System serif/sans/mono fallbacks; Source fonts are not downloaded or bundled.
- Native scroll and complete static placeholders; no cinematic image pinning or video playback until actual media is available.
- QR block is explicitly nonfunctional until a public destination is set.
- Card downloads and retailer integration are described concepts, not working features.
- Confirmed contribution, degree, career direction and contact destinations are included; email delivery and LinkedIn account availability are not tested.
- Sources and credits are included in the page footer.

## Rights

The hero includes one supplied third-party photograph whose credit and reuse rights must be resolved before public release. No video is included. External historical references are text links. Source imagery must be licensed for each intended channel before replacement of placeholders. Garment edition and provenance must be verified; no match-worn claim is made.

