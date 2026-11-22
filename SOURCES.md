# Sources and conversion boundaries

## Campaign rules

The campaign's local Fallout EotE Conversion and Fallout Campaign Economy PDFs (22 November 2026, version 1.0) govern the app. These are original conversion documents, not copies of the EotE sourcebook. The user's Edge of the Empire core rulebook supplies the underlying game engine; it is not distributed here.

The app uses the approved silhouette 2 wearable-vehicle approach, integer round-up hull damage after Armour, suit Brawn/Agility replacement and training override. Removing the Force does not remove the six EotE characteristics. No SPECIAL system is introduced.

## Economic dataset

`docs/catalogue.json` contains 668 selected Fallout 4 / add-on records: 483 corroborated across two references, 184 checked in one reference and one selected base profile. Each includes a stable ID, game, source URL, item URL when available, evidence code and cross-reference when available. Source values are game base values; the campaign's 3× shop multiplier is homebrew. It is not a claim about every in-game vendor quote.

Primary reference compilation: [Independent Fallout Wiki](https://fallout.wiki/). Cross-check compilation: [Gamer Guides Fallout 4 database](https://www.gamerguides.com/fallout-4/database). Exact item/table links remain on every record; consult those rather than interpreting these home pages as item citations. Services, wages and unconfirmed estimates are in the separate economy PDF, clearly distinguished from confirmed item values.

No Fallout 4 combat stats are automatically converted into EotE weapon profiles. Artwork is original SVG linework; no Fallout or Cyberpunk game art is bundled. UI structure was informed by [Cyberpunk Stories](https://github.com/NoxAnimusVicta/Cyberpunk-Stories); its private campaign content and character were not copied.


## Interface palette

The Pip-Boy phosphor accent is RGB (20, 255, 23), #14ff17, obtained by rounding Fallout 4's documented normalized defaults (0.08, 1.0, 0.09) to 8-bit RGB. See [STEP's Pipboy INI reference](https://stepmodifications.org/wiki/Guide:Fallout4Prefs_INI/Pipboy). The lighter green glass, border and secondary-text shades are an adaptation for a readable web companion, informed by [this Fallout 4 screenshot](https://cdn.supersoluce.com/file/docs/docid_5289d3278f152fc42c00002b/elemid_4ee9faa20a2fe93d0e000010/fallout-4-023.jpg). Reference artwork is not bundled. The phone icon uses an original simple radiation trefoil in yellow (#f6cf45) on blue (#164b7a).
