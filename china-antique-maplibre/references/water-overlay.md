# Water overlay · CHINA_WATER_DATA

Full-China water overlay bundled with the tuner / skill for MapLibre layers.

**License:** not under repository MIT until upstream provenance is cleared. See root [`DATA-PROVENANCE.md`](../../DATA-PROVENANCE.md).

## Data object

Global: `window.CHINA_WATER_DATA` from `tuner/assets/water-data.js`.

Manifest metadata: `tuner/assets/water-manifest.json` (`id`: `china-water-full-v1`).

### Layers (FeatureCollections)

| Key | Geometry | Role |
|-----|----------|------|
| `riverLevel1` | LineString | Major rivers |
| `riverLevel2` | LineString | Secondary rivers |
| `riverLevel3` | LineString | Minor / screen-level rivers |
| `chinaLakes` | Polygon | Lakes |
| `highlightWaterSystems` | LineString | Narrative highlight subset (alias: legacy `qilianWaterSystems`) |

Manifest `highlightSystems` lists keyword groups used to build / document the highlight subset (e.g. 黑河, 石羊, 疏勒). Geographic river names in keywords are OK.

## MapLibre paint keys

From preset `maplibre.water`:

- Lakes: `lakeFill`, `lakeOutline`
- Rivers: `riverLevel3` → `riverLevel2` → `riverLevel1` (+ widths)
- Highlight: `highlightRiver`, `highlightWidth`

Visibility:

- `ui.showWater` — all water
- `ui.showHighlight` — highlight systems only (requires water on)

## Label rules

HTML markers (not symbol layers) for river / lake names:

| Class | Rule |
|-------|------|
| Main rivers | Short catalog of trunk names; show from lower zoom (~`3.8`) |
| Tributaries / side | `minZoom` **9.5** (≈ 20 km scale at mid-latitudes) |
| Main lakes | Named anchors (empty `name` polygons matched by centroid); show from ~`3.8` |
| Side lakes | Higher minZoom (~`6.0`); optional |

Implementation notes:

- Prefer main tier first when decluttering.
- Side river labels can respect `showHighlight` when they belong to highlight systems only — keep production rules consistent with the tuner.
- Labels use light text-shadow for readability on parchment; no heavy chips/cards.

## Antique colors (v2 defaults)

Teal parchment water (see preset):

- Lake fill `rgba(50,118,138,0.9)` / outline `rgba(90,110,105,0.8)`
- Rivers L3 / L2 / L1: `rgba(48,112,128,0.55)` → `rgba(45,110,125,0.88)` → `rgba(42,105,120,0.95)`
- Highlight: `rgba(38,100,118,1)`, width `2.4`

Tune live in the tuner; export JSON for HyperFrames.

## Counts (manifest)

Approximate feature counts are listed in `water-manifest.json` → `counts` for sanity checks after packaging.
