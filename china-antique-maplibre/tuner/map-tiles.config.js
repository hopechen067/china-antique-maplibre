/**
 * Default tile config for the public / OSS tuner.
 * Satellite basemap is OFF — enable only with tiles you are licensed to use
 * (see map-tiles.config.example.js and root NOTICE.md).
 *
 * For personal overrides, create map-tiles.config.local.js (gitignored).
 */
window.MAP_TILE_CONFIG = {
  satellite: {
    enabled: false,
    tiles: [],
    tileSize: 256,
    maxzoom: 18,
    attribution: '',
    sourceId: 'basemapRaster',
    layerId: 'satellite',
  },
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
  uiAttribution: '底图：未配置卫星 · 地形 DEM：AWS Terrarium',
};
