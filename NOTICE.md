# NOTICE — third-party components and services

This project wires several independent components. Comply with each license
and terms of service for your use case.

## Bundled / loaded at runtime

| Component | Role | Notes |
|-----------|------|--------|
| [MapLibre GL JS](https://maplibre.org/) | Map runtime | Open-source (BSD-style). Loaded from unpkg in the tuner demo. |
| [Three.js](https://threejs.org/) | Optional 3D settlement models | MIT. Loaded from unpkg in the tuner demo. |
| `han-city-3d.js` | Settlement extrusion / custom layer | Project code; MIT under root LICENSE. |

## Not bundled — fetched or configured by you

| Resource | Role | Notes |
|----------|------|--------|
| AWS Terrarium DEM tiles | Hillshade / terrain | Default demo endpoints are public Terrarium-encoded terrain-rgb style tiles. Usage is subject to AWS / tile host policies. Attribution in-map: terrain source. |
| Satellite / basemap tiles | Optional raster base | Configure only tile URLs you are allowed to use (official provider key, self-hosted cache, etc.). This repo does **not** grant a map-tile license. |
| Optional local `water-data.js` | Water overlay | **Not shipped** in this repository. If you supply your own file under `tuner/assets/`, it stays under your data terms — see DATA-PROVENANCE.md and [LICENSE-EXCEPTIONS.md](LICENSE-EXCEPTIONS.md). |

## Agent skill packaging

`china-antique-maplibre/` is structured as an agent skill (`SKILL.md` + references).
Cursor / Codex / other hosts are not dependencies of the map stack; HyperFrames
integration is documented as an optional production host.

## License scope

- Code & docs: MIT — root [LICENSE](LICENSE)
- Showcase media / third-party services / any user-supplied geodata: [LICENSE-EXCEPTIONS.md](LICENSE-EXCEPTIONS.md)
