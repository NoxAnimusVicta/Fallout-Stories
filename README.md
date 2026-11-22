# Fallout Stories

A responsive, installable Fallout campaign companion using the agreed Edge of the Empire conversion. Inspired by the tabbed record layout of [Cyberpunk Stories](https://github.com/NoxAnimusVicta/Cyberpunk-Stories), with a new editable data model and Fallout styling.

## Features

- Multiple local character records, portraits, skills and positive narrative dice pools, talents, XP, Luck and Obligation.
- Personal wounds/strain and radiation, consumable chems, delayed RadAway, daily stimpak tracking and recorded dependence.
- Silhouette 2 power armour as a vehicle, with separate hull/system strain, five chassis profiles, Brawn/Agility substitution and the 20 XP training talent.
- Damage calculator using **ceil((personal damage − 10 × remaining Armour) / 10)**, minimum zero. Pierce below 10 cannot reduce vehicle Armour.
- Weapon cards, shared ammunition reserves, attack expenditure and capacity-limited reloads.
- Carried inventory, named storage locations and a 668-item source-linked Fallout 4 price catalogue. Shop/base prices are distinct; purchases and sales update caps.
- Journal and manually controlled story clock; JSON export/import; offline interface after an initial online visit.
- In-app quick rules and full campaign conversion/economy PDFs under About & rules.

New records are unallocated human templates, not completed legal starting characters. This is a table companion, not a character-creation validator or dice roller. Weapon combat stats, criticals, species details and remaining EotE rules are entered or resolved at the table. Catalogue weapon purchases do not invent converted combat stats.

## Run and verify

Node 20 or newer; no dependencies or build service required.

```sh
npm test
npm start
```

Open http://127.0.0.1:4173. `npm run build` copies `docs/` into `dist/` for static hosting. GitHub Pages can serve `main / docs`; all paths are relative. Sites uses `.openai/hosting.json` and `dist/`.

## Records and privacy

Records are saved in localStorage under `fallout-stories-v1`, separately on each browser/origin/device. There is no backend, account, analytics or cloud sync. Export JSON backups before clearing browser data or changing hosts. Imports are validated, added as separate records and never overwrite an existing character. Invalid existing browser data is preserved until explicit recovery/reset. Portraits are reduced to 800 px and stored locally.

The service worker caches app code and catalogue, not a server-side character record. The original campaign conversion and economy PDFs are included in the offline cache. On phones, use Add to Home Screen. Do not put private campaign data into tracked source files: everything in `docs/` is deployable.

## Mechanics notes

Thresholds and personal soak are explicit sheet fields so talents and species can be applied without guessing. Suit values affect only active powered physical checks; biological Resilience uses personal Brawn. Each penetrating hit is rounded separately; no fractional hull and no summing ineffective Auto-fire hits. Core consumption is an explicit narrative record, separate from weapon ammunition. Chem duration controls advance only the named effects; dependence timing and recovery require GM resolution.

See [SOURCES.md](SOURCES.md) for provenance. Unofficial fan material; not affiliated with Bethesda, Fantasy Flight Games or their successors.

## Install on iPhone

Open the hosted GitHub Pages app in Safari, tap Share, then Add to Home Screen. Keep Open as Web App enabled if offered. Open the Fallout Stories icon and wait for Install on iPhone to report Ready offline before disconnecting. Create or import your character inside the installed app. Export backups to Files.

The simple yellow radiation symbol on blue includes a 180 px Apple touch icon and 192/512 px PWA icons. Records stay local to the browser/installed app; no character records are committed here.
