# Sources and conversion boundaries

## Campaign rules

The adopted Fallout EotE Conversion v2 and Fallout Campaign Economy provide the baseline. Current accepted amendments are consolidated in docs/references/current-rules.md and docs/references/special.md and take precedence over older PDF wording. These are original conversion documents, not copies of the EotE sourcebook. The user's Edge of the Empire core rulebook supplies the underlying game engine; it is not distributed here.

The app uses the approved silhouette 2 wearable-vehicle approach, integer round-up hull damage after Armour, suit Brawn/Agility replacement and training override. Removing the Force does not remove the six EotE characteristics. SPECIAL is a doubled display of retained ratings, with the separately approved Blade Technique damage and Perception-based Piloting amendments.

## Economic dataset

`docs/catalogue.json` contains 668 selected Fallout 4 / add-on records: 483 corroborated across two references, 184 checked in one reference and one selected base profile. Each includes a stable ID, game, source URL, item URL when available, evidence code and cross-reference when available. Source values are game base values; the campaign's 3× shop multiplier is homebrew. It is not a claim about every in-game vendor quote.

Primary reference compilation: [Independent Fallout Wiki](https://fallout.wiki/). Cross-check compilation: [Gamer Guides Fallout 4 database](https://www.gamerguides.com/fallout-4/database). Exact item/table links remain on every record; consult those rather than interpreting these home pages as item citations. Services, wages and unconfirmed estimates are in the separate economy PDF, clearly distinguished from confirmed item values.

No Fallout 4 combat stats are automatically converted into EotE weapon profiles. The radiation icon is original SVG artwork with PNG derivatives. Ronin’s user-supplied portrait is preserved from the approved published record. No other companion’s character or campaign content is bundled. UI structure was informed by [Cyberpunk Stories](https://github.com/NoxAnimusVicta/Cyberpunk-Stories); its private campaign content and character were not copied.


## Interface palette

The Pip-Boy phosphor accent is RGB (20, 255, 23), #14ff17, obtained by rounding Fallout 4's documented normalized defaults (0.08, 1.0, 0.09) to 8-bit RGB. See [STEP's Pipboy INI reference](https://stepmodifications.org/wiki/Guide:Fallout4Prefs_INI/Pipboy). The lighter green glass, border and secondary-text shades are an adaptation for a readable web companion, informed by [this Fallout 4 screenshot](https://cdn.supersoluce.com/file/docs/docid_5289d3278f152fc42c00002b/elemid_4ee9faa20a2fe93d0e000010/fallout-4-023.jpg). Reference artwork is not bundled. The phone icon uses an original simple radiation trefoil in yellow (#f6cf45) on blue (#164b7a).

## Session 1 advancement and state

The supplied Standard_Galactica_Ruleset.md, XP Allocation → Session XP (lines3221–3223), establishes 5 /10–15 /20–25 XP bands and 25 maximum. This session awards 10 unrestricted XP. The source ruleset is not redistributed. Character creation remains 110 spent XP; the session award is unspent.

Weapon combat profiles are adopted EotE slugthrower profiles, with campaign-specific calibre/capacity. They are not claimed Fallout game damage conversions. The JSON weapon `cost` field means ammunition per attack, not item value; resale valuations remain pending.

Public summaries contain played events and disclosed information only. Private narrator plans, full transcripts and raw source documents remain local.
