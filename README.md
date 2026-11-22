# Fallout Stories

Ronin’s read-only Fallout / Edge of the Empire companion.

Live app: https://noxanimusvicta.github.io/Fallout-Stories/

GitHub Pages serves `main` from `/docs`. This is the canonical player app. Publishing a separate Sites deployment does not update GitHub Pages.

## Current interface

Ronin opens automatically with his portrait and maintained record. Tabs: Character, Talents, Inventory, Health, Assets and Journal. The talent tree is a four-column grid with vertical prerequisites. Ability dice are green diamonds; Proficiency dice are yellow hexagons. Personal Destiny is displayed against Luck, with no shared pool. Weapons and ammunition appear in Inventory. Assets contains no unowned power-armor reference sheet. There are no player editing or import controls.

The journal records the Kansas City origin and accepted westward journey. Narrator-only plans and local transcripts are never deployed.

## Run and verify

Use Node 20 or newer. No dependencies are required.

```sh
node --test tests/rules.test.js
node server.mjs
node build.mjs
```

Preview: http://127.0.0.1:4173. Build copies `docs` into `dist`; GitHub Pages uses `docs` directly.

## Release checklist

Check the current remote branch before publishing. Commit the approved app changes and push to GitHub main without force. Wait for Pages deployment, compare live asset hashes with the release, and inspect the rendered tabs. Increment asset and service-worker cache versions together. A successful HTTP response alone does not verify the deployed revision.

## iPhone and offline use

Open the live app in Safari and use Share → Add to Home Screen. The existing blue/yellow radiation icon is supplied at Apple and PWA sizes. The service worker caches the published record and reference files for offline use; online requests prefer current server content. New workers activate after completing their cache, so old installations are not held on a waiting worker. Reopen online to receive current data.

The public record is in `docs/character.json`. Keep private campaign records out of this repository and deployment. Session state is maintained by the narrator; this companion displays the published snapshot.

See SOURCES.md for provenance. Unofficial fan material, not affiliated with Bethesda or the EotE rights holders.
