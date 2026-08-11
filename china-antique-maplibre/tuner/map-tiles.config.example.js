/**
 * Map tile configuration (EXAMPLE — copy to map-tiles.config.js).
 *
 * Default public builds ship map-tiles.config.js with satellite DISABLED so
 * this repo does not hard-wire a commercial map vendor's tile endpoints.
 *
 * You may only enable satellite tiles if your use is allowed by that provider
 * (official key / contract / self-hosted cache). This project grants no tile license.
 *
 * Optional override file (gitignored): map-tiles.config.local.js
 * loaded after map-tiles.config.js if present — use for personal keys.
 */
window.MAP_TILE_CONFIG = {
  /**
   * Optional raster basemap (satellite or other).
   * Leave tiles empty / enabled:false for terrain + water + CSS-only demo.
   */
  satellite: {
    enabled: false,
    // Example shape only — replace with endpoints YOU are allowed to use:
    // tiles: [
    //   'https://YOUR-LEGAL-TILE-HOST/{z}/{x}/{y}.png',
    // ],
    tiles: [],
    tileSize: 256,
    maxzoom: 18,
    attribution: '',
    // Source id used in MapLibre style (keep stable if you migrate presets)
    sourceId: 'basemapRaster',
    layerId: 'satellite',
  },

  /**
   * Terrarium-encoded DEM (required for hillshade + setTerrain).
   * encoding MUST remain 'terrarium'.
   */
  terrain: {
    enabled: true,
    tiles: [
      'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png',
      'https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png',
    ],
    tileSize: 256,
    maxzoom: 15,
    encoding: 'terrarium',
    attribution: '© AWS Terrain Tiles (Terrarium)',
    sourceId: 'terrain',
  },

  /** Short label for the on-map attribution strip */
  uiAttribution: '底图：未配置卫星 · 地形 DEM：AWS Terrarium',
};
