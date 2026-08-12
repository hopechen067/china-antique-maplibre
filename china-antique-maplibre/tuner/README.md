# Tuner · antique MapLibre

Live CSS / paint tuner for **china-antique-maplibre**.

## Start

```bash
cd china-antique-maplibre/tuner
python -m http.server 8765
```

Open [http://localhost:8765/](http://localhost:8765/).

HTTP (or localhost) only — do not use `file://`.

## Tile config

| File | Role |
|------|------|
| `map-tiles.config.js` | Default public config (**satellite off**, Terrarium on) |
| `map-tiles.config.example.js` | Documented template |
| `map-tiles.config.local.js` | Optional personal overrides (**gitignored**) |

Enable a raster basemap only with tile URLs you are allowed to use. See repo root `NOTICE.md`.

## Verify assets

```bash
node verify.mjs
```

Checks for `index.html`, tile config, city assets, and default presets.
Optional local `assets/water-data.js` is validated only if present.

## Defaults

- Preset: `preset-antique-default.json` (copy: `presets/antique-default.json`)
- Sites: `assets/sample-sites.json`
- Water: **not shipped**. Optional local `assets/water-data.js` (gitignored) — see root `DATA-PROVENANCE.md` / `references/water-overlay.md`
- Public demo: GitHub Pages publishes this `tuner/` folder to the site root (`assets/…` paths stay relative)

Export JSON, then migrate into HyperFrames. Do not host final renders on this page.
