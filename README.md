# china-antique-maplibre

Open-source **antique parchment** MapLibre stack for China historical maps and short-form video production (HyperFrames or any MapLibre host).

## Live demo

**Interactive tuner (GitHub Pages):**  
https://hopechen067.github.io/china-antique-maplibre/

Anyone can open that link in a browser (needs internet for EOX satellite + Terrarium DEM tiles). No install required.

Static screenshots (if the live map is slow to load):

- [marketing/preview-eox-china.png](marketing/preview-eox-china.png) — national view  
- [marketing/preview-eox-hexi.png](marketing/preview-eox-hexi.png) — Hexi / Qinghai style zoom  

| Item | Value |
|------|--------|
| Skill folder | `china-antique-maplibre` |
| Runtime | [MapLibre GL JS](https://maplibre.org/) |
| Default basemap | **EOX Sentinel-2 cloudless** (public demo WMTS; non-commercial terms — swap for production) |
| Terrain / hillshade | AWS Terrarium DEM tiles (runtime fetch; `encoding: 'terrarium'`) |
| Water | Full-China overlay in `tuner/assets/water-data.js` — **not MIT**; see [DATA-PROVENANCE.md](DATA-PROVENANCE.md) |
| Look | Antique CSS tuner + tiered settlement extrusions (`HanCity3D`) |
| License | [MIT](LICENSE) for project code/docs, with data & marketing exceptions |
| Hosted demo | GitHub Pages → `china-antique-maplibre/tuner` (see `.github/workflows/deploy-pages.yml`) |

## Quick start (local tuner)

For offline-ish development or private tile configs, run the tuner on your machine:

```bash
cd china-antique-maplibre/tuner

# Option A — Python 3
python -m http.server 8765

# Option B — Node
npx --yes serve -l 8765
```

Then open `http://127.0.0.1:8765/` **on the same computer** after the server starts.  
(`localhost` is not the public demo — use the [Live demo](#live-demo) link above to share with others.)

Do **not** open `index.html` as `file://` — preset fetch and water assets will break.

Optional asset check (requires Node on `PATH`):

```bash
cd china-antique-maplibre/tuner
node verify.mjs
```## Features

- **Configurable raster basemap** — default is [EOX Sentinel-2 cloudless](https://s2maps.eu) (MapLibre-style public demo; attribution + non-commercial public use). Override with `map-tiles.config.local.js` for licensed commercial imagery.
- **Terrarium hillshade + terrain** — `encoding: 'terrarium'` is mandatory.
- **China water overlay** — rivers (3 levels) + lakes + narrative highlight systems (data terms: DATA-PROVENANCE.md).
- **Antique CSS tuner** — live sepia / warm tint / vignette / paint controls; export JSON presets.
- **City tiers** — capital / large / medium / small / pass / station / ordos via `HanCity3D`.

## Configure map tiles

1. Read [NOTICE.md](NOTICE.md) (third-party ToS).
2. Default config (`map-tiles.config.js`) uses EOX Sentinel-2 cloudless + Terrarium DEM.
3. For commercial/high-res Chinese satellite, use gitignored `map-tiles.config.local.js` with a source you are allowed to use. See `map-tiles.config.example.js`.

EOX public tiles are for **non-commercial** use with attribution; they are ~10 m imagery (not street-level). This project does **not** grant rights to Gaode/Amap, Google, Mapbox, or other commercial providers.

## Marketing stills

Optional screenshots under `marketing/` (hero / features / before-after). Treat as demo media; not a free stock license (see LICENSE exceptions). Production source stills are **not** included in the public tree.

## Tiles are NOT bundled

Satellite and DEM tiles are **not** shipped. At runtime MapLibre requests only what you configure (plus default Terrarium URLs when terrain is enabled).

## Attribution & compliance

- **You** must comply with each basemap, DEM, and CDN provider’s terms for your region and use case.
- **Water data:** separate from MIT — [DATA-PROVENANCE.md](DATA-PROVENANCE.md).
- **MapLibre / Three.js:** follow their licenses when redistributing builds.

## Install as an agent skill

1. Copy `china-antique-maplibre` into your skills directory (user or project).
2. Reload agent skills so `SKILL.md` is discovered.
3. Ask the agent to apply the antique map stack / open the tuner / migrate an exported preset into HyperFrames (or your host).

## Layout

```
.
├── LICENSE
├── NOTICE.md
├── DATA-PROVENANCE.md
├── SECURITY.md
├── README.md
├── marketing/                 # optional screenshots
└── china-antique-maplibre/
    ├── SKILL.md
    ├── agents/openai.yaml
    ├── references/
    ├── schemas/
    └── tuner/                 # live HTTP tuner + presets + assets
```

## Contributing / security

- Prefer small, documented changes to preset schema, tuner UX, and references.
- Do not commit API keys or `map-tiles.config.local.js`.
- See [SECURITY.md](SECURITY.md) for reporting guidance.

## Next reads

- [`china-antique-maplibre/SKILL.md`](china-antique-maplibre/SKILL.md) — agent entry
- [`china-antique-maplibre/references/参数列表说明.md`](china-antique-maplibre/references/参数列表说明.md)
- [`china-antique-maplibre/references/tuner-workflow.md`](china-antique-maplibre/references/tuner-workflow.md)
- [`china-antique-maplibre/references/tested-config.md`](china-antique-maplibre/references/tested-config.md)
