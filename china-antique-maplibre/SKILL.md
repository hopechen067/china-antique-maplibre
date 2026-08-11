---
name: china-antique-maplibre
description: China antique parchment MapLibre map engine with configurable basemap, Terrarium hillshade, full water overlay, live tuner page, and tiered settlement extrusions for HyperFrames historical videos.
---

# china-antique-maplibre · 中国历史古卷地图引擎

Use this skill when building or tuning **antique parchment** China maps in MapLibre for HyperFrames / historical video: optional raster basemap, Terrarium hillshade, full water overlay, CSS antique grade, and tiered city extrusions.

## When to use

- Need a production MapLibre style that reads as aged parchment over real terrain.
- Need live paint/CSS tuning before locking a HyperFrames scene.
- Need China-wide rivers/lakes overlay plus optional highlight river systems.
- Need tiered settlements (`capital` / `large` / `medium` / `small` / `pass` / `station` / `ordos`).

Do **not** use the tuner page as the final render host.

## Modes

| Mode | Purpose |
|------|---------|
| **Production stack** | Embed MapLibre in HyperFrames (or your app): optional satellite/raster + `encoding: 'terrarium'` terrain + hillshade + water layers + CSS filter stack + city extrusions. Drive look from exported JSON. |
| **Tuner** | Local HTTP page under `tuner/` for interactive sliders, preset load/export, water/city toggles. |

## Workflow

1. Serve tuner: `cd tuner && python -m http.server 8765` → `http://localhost:8765/`
2. Tiles: default config uses **EOX Sentinel-2 cloudless** + Terrarium (`tuner/map-tiles.config.js`). Override with gitignored `map-tiles.config.local.js` for other sources.
3. Apply default preset [`tuner/preset-antique-default.json`](tuner/preset-antique-default.json) (same content as [`tuner/presets/antique-default.json`](tuner/presets/antique-default.json)).
4. Adjust satellite / hillshade / water / CSS / UI toggles until the look locks.
5. **Export JSON** from the tuner (copy or download).
6. **Migrate** paint + camera + CSS fields into the HyperFrames MapLibre scene (see references).
7. In production: `jumpTo` camera (or set initial camera); wait for `idle`; optionally pre-cache tiles. **Avoid `easeTo` / `flyTo`** for recorded frames (motion blur / non-deterministic timing).
8. Always set Terrarium DEM with **`encoding: 'terrarium'`**. Wrong encoding breaks hillshade/terrain.
9. Final frames render from the HyperFrames / production host — **not** from the tuner UI.

## Hard rules

- **Tiles not bundled** — MapLibre fetches DEM (and optional basemap) at runtime from **configured** URLs only.
- **Only use basemap endpoints you are allowed to use** — defaults are public demo tiles (EOX); swap via config when needed.
- **`encoding: 'terrarium'`** on the terrain source — mandatory.
- **No `easeTo` / `flyTo`** in recorded production paths; prefer `jumpTo` + `idle`.
- **Do not host final render on tuner.**
- Highlight water paint keys: `highlightRiver` / `highlightWidth` (UI: `showHighlight`). Older drafts may still say `qilianRiver` / `showQilian` — treat as aliases only when reading legacy JSON.
- **Water data** is not under MIT until provenance is cleared — see repo root `DATA-PROVENANCE.md`.

## References

- [`references/参数列表说明.md`](references/参数列表说明.md) — full parameter tables + antique v2 defaults
- [`references/tested-config.md`](references/tested-config.md) — sources, layer order, jumpTo + idle
- [`references/tuner-workflow.md`](references/tuner-workflow.md) — HTTP tuner → export → HyperFrames
- [`references/city-tier-schema.md`](references/city-tier-schema.md) — settlement tiers
- [`references/water-overlay.md`](references/water-overlay.md) — `CHINA_WATER_DATA` layers & labels
- [`schemas/map-preset.schema.json`](schemas/map-preset.schema.json)
- [`schemas/sample-sites.schema.json`](schemas/sample-sites.schema.json)
- [`tuner/`](tuner/) — live page, verify script, default preset, sample sites

## Agents

See [`agents/openai.yaml`](agents/openai.yaml) for display name / default prompt.
