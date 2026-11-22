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
- Full conversion and economy PDFs under About & rules.

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

The service worker caches app code and catalogue, not a server-side character record. PDFs are not pre-cached. On phones, use Add to Home Screen. Do not put private campaign data into tracked source files: everything in `docs/` is deployable.

## Mechanics notes

Thresholds and personal soak are explicit sheet fields so talents and species can be applied without guessing. Suit values affect only active powered physical checks; biological Resilience uses personal Brawn. Each penetrating hit is rounded separately; no fractional hull and no summing ineffective Auto-fire hits. Core consumption is an explicit narrative record, separate from weapon ammunition. Chem duration controls advance only the named effects; dependence timing and recovery require GM resolution.

See [SOURCES.md](SOURCES.md) for provenance. Unofficial fan material; not affiliated with Bethesda, Fantasy Flight Games or their successors.

