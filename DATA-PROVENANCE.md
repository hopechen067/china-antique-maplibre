# Data provenance

## Water overlay (`CHINA_WATER_DATA`)

| Path | Role |
|------|------|
| `china-antique-maplibre/tuner/assets/water-data.js` | Full-China rivers/lakes as `window.CHINA_WATER_DATA` |
| `china-antique-maplibre/tuner/assets/water-manifest.json` | Layer counts, highlight keyword groups, processing notes |

### What we know from packaging notes

Internal processing labels (not a legal source citation):

- `riverLevel1` ← hyd1-style major rivers  
- `riverLevel2` ← hyd2-style secondary rivers  
- `riverLevel3` ← screen layer from source labeled River4  
- `chinaLakes` ← China lakes (WGS84)  
- `highlightWaterSystems` ← keyword subsets (e.g. 黑河 / 石羊 / 疏勒) for narrative emphasis  

### License status

**Not under the repository MIT license.**  
Upstream dataset name, version, download URL, and redistributable license are **not fully recorded** in this repository. Until that chain is documented and cleared:

- Treat the overlay as **demo convenience data**, not open data under MIT.
- Do **not** assume you may re-publish or sublicense the GeoJSON as open data.
- For a fully open stack, replace with data you can license (e.g. self-derived OSM extracts, Natural Earth where applicable, or licensed hydrography) and update this file + `water-manifest.json`.

### Replacing the overlay

1. Produce GeoJSON FeatureCollections matching the keys in `references/water-overlay.md`.  
2. Export as `window.CHINA_WATER_DATA = { ... }` in `water-data.js` (or load async and assign before `initMap`).  
3. Refresh `water-manifest.json` counts and provenance notes.  
4. Run `node verify.mjs` and open the tuner over HTTP.

## Sample settlements

`tuner/assets/sample-sites.json` — synthetic demo points only (no real administrative claims). MIT with the rest of the project code/docs.

## Tiles

Satellite and DEM tiles are **not** shipped as files. See `tuner/map-tiles.config.example.js` and NOTICE.md.
