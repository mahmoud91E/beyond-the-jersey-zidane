# Step 19 — Final production QA

27 September 2026. No redesign or new sections.

## Fixes
- Chapter reference links identify FIFA or UEFA.
- Placeholder captions say “No photograph in this frame”.
- Corrected obsolete no-photography statements in README and source-check output.
- Added production-server targeting and keyboard/image regression checks.

## Verification
- Next.js production build, lint and TypeScript passed.
- Tested the built production server at http://127.0.0.1:3001.
- All 15 existing browser tests passed across desktop, mobile and narrow/reduced-motion configurations. Three additional keyboard/image checks passed after correcting the tests for native dialog focus behavior, including the scrollable dialog focus stop on small screens.
- Section-scoped axe scans found no violations in tested states. This is not full accessibility certification.
- At 1440, 820, 390 and 320 pixels: no overflow, clipped headings, broken internal anchors, failed local requests or console/page errors. Hero image loaded at all sizes. Screenshots and JSON are in qa/.
- Index, chapter links, Escape/focus restoration, disclosures, carousel, activation mappings and reduced motion passed.
- Email and LinkedIn destinations match the confirmed details. LinkedIn blocked automated retrieval; account availability remains unverified. No email was sent.
- Existing historical and market links were reachable. Dates and chronology were checked against FIFA and UEFA, including 12 July 1998, Euro 2000, 2002 exit, 2004 quarter-final, 2005 return and the 2006 sequence. No date or spelling corrections were needed.
- Independent concept and no-campaign-data statements remain intact. No employment, commissioned work, athlete collaboration, real performance or validated consumer research is claimed.

## Unresolved / publish decision
Technically ready in tested Edge/Chromium configurations. Public publication remains conditional on documenting the supplied hero photograph’s source credit and reuse permission, or replacing it with a cleared image/placeholder. Secondary historical placeholders and the non-scannable QR remain clearly labeled concept material. No deployment performed. Safari, Firefox, physical devices and manual screen-reader use were not tested.

Reference spot checks included the existing linked FIFA/UEFA sources and UEFA’s 2004 quarter-final report:
https://www.uefa.com/uefaeuro/history/news/0254-0d7b2525d006-ee6773aa3e1b-1000--slick-greece-shock-euro-holders-france/
