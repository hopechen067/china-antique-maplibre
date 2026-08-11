/**
 * Default tile config for the public tuner.
 * Basemap: EOX Sentinel-2 cloudless (public WMTS demo; follow EOX terms).
 * For other basemaps, use map-tiles.config.local.js (gitignored).
 */
window.MAP_TILE_CONFIG = {
  satellite: {
    enabled: true,
    // Note tile template order: {z}/{y}/{x} (not z/x/y)
    tiles: [
      'https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/g/{z}/{y}/{x}.jpg',
    ],
    tileSize: 256,
    maxzoom: 14,
    attribution:
      'Sentinel-2 cloudless © <a href="https://s2maps.eu">EOX</a> · modified Copernicus Sentinel data 2020',
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
  uiAttribution: '底图：EOX Sentinel-2 cloudless · 地形 DEM：AWS Terrarium',
};
